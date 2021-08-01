# PHP

[[toc]]

## Adding the PHP Service in Zerops

### Version to choose

You can currently choose a PHP engine **v8.0**, **v7.4**, or **v7.3**. The chosen version of it **can't be changed afterward**. Switching must be done manually by creating a new service with another version and migrating project code using a new [deploy](/documentation/deploy/how-deploy-works.html) or [build & deploy](/documentation/build/how-zerops-build-works.html) process.

Along with the choice of the engine, you can also choose between two host web servers in which it can run. It's either **Apache v2.4** or **Nginx v1.18**. There are specific configuration differences between both that need to be perceived and respected. These will always be listed and explained below.

### Hostname and port

Choose a short and descriptive URL-friendly name, for example, **php**. The following rules apply:

* maximum length **==25==** characters,
* only lowercase ASCII letters **==a-z==** and numbers **==0-9==**,
* **==has to be unique==** in relation to other existing project hostnames,
* the hostname **==can't be changed==** later.

The port will automatically be set to the value of **==80==** and can't be changed.

### Project code root and Document root

The **project code** will always be placed in ==**/var/www**== folder, regardless of which [deployment variant](#deployment-variants-how-to-deliver-the-project-code) you choose. Another thing is where you place the so-called **document root** (usual location of the ==index.php== or ==index.html== file), which is the user configuration setting. You can place it, for example, in a subdirectory like **public** (optional name) or keep it identical with the project code root.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Recommendation
Using a subdirectory like ==**/var/www/public**== for a document root is always a good idea. This allows you to use the code root directory for the project's overhead stuff and improve the readability of the directory structure so.
:::
<!-- markdownlint-enable DOCSMD004 -->

#### Setting PHP/Apache document root

You set it through a separate input.

![PHP+Apache](./images/PHP-Apache-Document-Root.png "Document root")

#### Setting PHP/Nginx document root

You set it through a project Nginx configuration file at the following part. More on how this config looks and means, see the section [Default Nginx config](#default-nginx-config).

```nginx
# Be sure that you set up a correct document root!
root /var/www/public;
```

### Default Nginx config

![PHP+Nginx](./images/PHP-Nginx-Document-Root.png "Document root")

* You can change the default config (with the pre-defined content specific for each PHP engine version) as you want if you respect correct syntax and valid paths with one exception. **==Don't modify port 80==** at the marked point <span style="background-color: #ff8080">&nbsp;[**1**]&nbsp;</span>. Otherwise, you will break the project.

* Defined separated **document root** as a subdirectory like **public** `/var/www/public` (optional name) or keeping it identical with the **project code root** `/var/www` at the marked point <span style="background-color: #ffff00">&nbsp;[**2**]&nbsp;</span>.

* Which file (`index.php` here) at the marked point <span style="background-color: #00ff40">&nbsp;[**3**]&nbsp;</span> is used for serving a **document root content**.

* The location defined at the marked point <span style="background-color: #00ffff">&nbsp;[**4**]&nbsp;</span> blocks access to any `*.php` file for external requests (case insensitive) using the directive **internal** at the marked point <span style="background-color: #00ffff">&nbsp;[**5**]&nbsp;</span>. Any try to access leads to a **404 Not Found** response then. If you would like to allow external access to `*.php` files in a subdirectory, for example, the `app`, you need to add a new location:

```nginx
location ^~ /app/ {
   fastcgi_pass unix:/var/run/php/php7.4-fpm.sock;
   fastcgi_split_path_info ^(.+\.php)(/.*)$;
   include fastcgi_params;

   fastcgi_param SCRIPT_FILENAME $realpath_root$fastcgi_script_name;
   fastcgi_param DOCUMENT_ROOT $realpath_root;
}
```

* Ensure that used **storage log paths** at the marked point <span style="background-color: #8000ff; color: white">&nbsp;[**6**]&nbsp;</span> for **access_log** and **error_log** are correct.

### Deployment variants how to deliver the project code

You have **two ways** how you can deliver your project code to the service. Either a direct connection to a [GitHub](/documentation/github/github-integration.html) or [GitLab](/documentation/gitlab/gitlab-integration.html) repository or using the Zerops [zcli](/documentation/cli/installation.html) command-line client.

<!-- markdownlint-disable DOCSMD004 -->
::: tip Delivering code via drag & drop
The last additional way is using a drag & drop operation in the Zerops GUI to transfer a zipped file of a project code. This one is not preferred because of several reasons
:::
<!-- markdownlint-enable DOCSMD004 -->