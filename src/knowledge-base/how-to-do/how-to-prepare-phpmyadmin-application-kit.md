# Preparing and deploying phpMyAdmin application kit

If you are used to using **phpMyAdmin** for the administration of MariaDB (MySQL) databases, you will probably be interested in how to install it within the Zerops [PHP service](/documentation/services/runtimes/php.html) to administrate the Zerops [MariaDB (MySQL) service](/documentation/services/databases/mariadb.html).

<!-- markdownlint-disable DOCSMD004 -->
::: info When using only the Windows platform
if you don't have the possibility to get any native Linux or Mac platform, or if you're not familiar with them, you will probably welcome using a standard installation of the Windows Subsystem for Linux (WSL2) according to the official procedure on [Microsoft website](https://docs.microsoft.com/windows/wsl/install-win10). You will also need to install [Node.js](https://docs.microsoft.com/windows/dev-environment/javascript/nodejs-on-wsl) on WSL2. **The reason for using WSL2 comes from issues related to unwanted file permission changes when doing this natively on the Windows platform.**
:::
<!-- markdownlint-enable DOCSMD004 -->

The following step-by-step instructions can help you to go through the process easily. It's supposed that you already created your project in Zerops GUI and an empty PHP service (not connected to any repository).

1. Open a new **Bash** / **Zsh** terminal window (coming also from the WSL2 installation). It will be open in `/home/<username>` on Linux or `/Users/<username>` on Mac directory by default.

2. Install **curl** program using the command ==`sudo apt install curl`== on Linux or ==`brew install curl`== on Mac if you didn't do so before.

3. Install **unzip** program using the command ==`sudo apt install unzip`== on Linux or ==`brew install unzip`== on Mac if necessary.

4. Now create a new subdirectory `install` using the command: ==`mkdir install`== and switch to it with the command ==`cd install`== . Here, create another new subdirectory `phpMyAdmin` via the command ==`mkdir phpMyAdmin`== , and again switch to it using the command ==`cd phpMyAdmin`== . Now, you should be in the directory `/home/<username>/install/phpMyAdmin`.

5. Download the latest version of the **phpMyAdmin** [zip kit](https://www.phpmyadmin.net/downloads) via the command ==`curl https://files.phpmyadmin.net/phpMyAdmin/5.1.1/phpMyAdmin-5.1.1-english.zip -o phpMyAdmin-5.1.1-english.zip`== .

6. Extract the zipped file content to the `public` subdirectory (it'll be created automatically) using the command: ==`unzip phpMyAdmin-5.1.1-english.zip -d public`== . The name `public` has to be the same name as the chosen [document root](/documentation/services/runtimes/php.html#project-code-root-and-document-root) name when creating your Zerops [PHP service](/documentation/services/runtimes/php.html). You can choose a different name, of course, but the same one has to be used in both places.

7. Delete the zipped file `phpMyAdmin-5.1.1-english.zip` with the command ==`rm phpMyAdmin-5.1.1-english.zip`== .

8. Switch to the directory `public` using the command: ==`cd public`== .

9. Switch to the directory `phpMyAdmin-5.1.1-english` using the command: ==`cd phpMyAdmin-5.1.1-english`== (it's a subdirectory coming from the extracted content of the downloaded file).

10. Rename the filename `config.sample.inc.php` to `config.inc.php` with the command: ==`mv config.sample.inc.php config.inc.php`== .

11. Open the content of the file `config.inc.php` in the VIM editor using the command: ==`vim config.inc.php`== .

12. Press ==`i`== on the keyboard to activate the INSERT edit mode.

13. Update the line `$cfg['Servers'][$i]['host'] = 'localhost';` – instead of `localhost` value use a real **hostname** of your Zerops [MariaDB (MySQL) service](/documentation/services/databases/mariadb.html).

14. Update the line `$cfg['blowfish_secret'] = '';` – instead of the empty string value insert a randomly generated value of 32 characters at least.

15. Press ==`ESC`== on the keyboard to leave the INSERT edit mode.

16. Press ==`:wq!`== to save the file and close the VIM editor.

17. Move the entire content of the current directory `phpMyAdmin-5.1.1-english` to the `public` parent directory with the command ==`mv * ../`== (to eliminate unnecessary directory nesting).

18. Switch back to the `public` directory with the command ==`cd ..`== .

19. Remove that unnecessary directory `phpMyAdmin-5.1.1-english` with the command ==`rm -r phpMyAdmin-5.1.1-english`== .

20. Switch to the parent directory using the command ==`cd ..`== .

21. Deploy the application kit prepared in this way to the Zerops [PHP service](/documentation/services/runtimes/php.html) using the [Zerops zcli](/documentation/cli/installation.html) with the [deploy command](/documentation/cli/available-commands.html#deploy-project-name-service-name-space-separated-files-or-directories) ==`zcli deploy "<project name>" <service hostname> "."`== (after using the [login command](/documentation/cli/available-commands.html#login)). This command creates a zipped file from the [current directory content](/documentation/build/build-config.html#deploy-everything) first and then deploys it to Zerops via an HTTPS protocol (without triggering a build pipeline).

22. You should see the following output while the deployment process is working:

```bash
service status: SERVICE_STACK_STATUS_READY_TO_DEPLOY
creating package
working directory: /home/<username>/install/phpMyAdmin
packing directory: /home/<username>/install/phpMyAdmin
uploading package
package uploaded
deploying service
temporaryShutdown: false
service deployed
```

## Correct file permissions

If you run the command ==`ls -a -l`== on `/home/<username>/install/phpMyAdmin/public` directory, you can check correct files permissions (allow only read access except for the owner) of the **phpMyAdmin** application kit. The listing should be as follows:

```bash
drwxr-xr-x 11 <username> <username>   4096 Jul 31 10:32 .
drwxr-xr-x  3 <username> <username>   4096 Jul 31 10:27 ..
-rw-r--r--  1 <username> <username>   2587 Jun  4 00:18 CONTRIBUTING.md
-rw-r--r--  1 <username> <username>  49416 Jun  4 00:18 ChangeLog
-rw-r--r--  1 <username> <username>  18092 Jun  4 00:18 LICENSE
-rw-r--r--  1 <username> <username>   1520 Jun  4 00:18 README
-rw-r--r--  1 <username> <username>     29 Jun  4 00:19 RELEASE-DATE-5.1.1
-rw-r--r--  1 <username> <username>     41 Jun  4 00:18 babel.config.json
-rw-r--r--  1 <username> <username>   4064 Jun  4 00:19 composer.json
-rw-r--r--  1 <username> <username> 204120 Jun  4 00:18 composer.lock
-rw-r--r--  1 <username> <username>   4502 Jul 31 10:32 config.inc.php
drwxr-xr-x  3 <username> <username>   4096 Jun  4 00:19 doc
drwxr-xr-x  2 <username> <username>   4096 Jun  4 00:18 examples
-rw-r--r--  1 <username> <username>  22486 Jun  4 00:18 favicon.ico
-rw-r--r--  1 <username> <username>    413 Jun  4 00:18 index.php
drwxr-xr-x  5 <username> <username>   4096 Jun  4 00:18 js
drwxr-xr-x  5 <username> <username>   4096 Jun  4 00:19 libraries
-rw-r--r--  1 <username> <username>   2252 Jun  4 00:19 package.json
-rw-r--r--  1 <username> <username>   1034 Jun  4 00:19 print.css
-rw-r--r--  1 <username> <username>     26 Jun  4 00:19 robots.txt
drwxr-xr-x  3 <username> <username>   4096 Jun  4 00:19 setup
-rw-r--r--  1 <username> <username>   1354 Jun  4 00:19 show_config_errors.php
drwxr-xr-x  2 <username> <username>   4096 Jun  4 00:19 sql
drwxr-xr-x 25 <username> <username>   4096 Jun  4 00:19 templates
drwxr-xr-x  5 <username> <username>   4096 Jun  4 00:19 themes
-rw-r--r--  1 <username> <username>   1613 Jun  4 00:19 url.php
drwxr-xr-x 17 <username> <username>   4096 Jun  4 00:19 vendor
-rw-r--r--  1 <username> <username> 306579 Jun  4 00:19 yarn.lock
```

## Incorrect file permissions

If you use only the Windows environment to prepare the **phpMyAdmin** application kit (without WSL2), the listing should be as follows (read, write and execute of everything), which is incorrect:

```bash
drwxrwxrwx 11 <username> <username>   4096 Jul 31 10:32 .
drwxrwxrwx  3 <username> <username>   4096 Jul 31 10:27 ..
-rwxrwxrwx  1 <username> <username>   2587 Jun  4 00:18 CONTRIBUTING.md
-rwxrwxrwx  1 <username> <username>  49416 Jun  4 00:18 ChangeLog
-rwxrwxrwx  1 <username> <username>  18092 Jun  4 00:18 LICENSE
-rwxrwxrwx  1 <username> <username>   1520 Jun  4 00:18 README
-rwxrwxrwx  1 <username> <username>     29 Jun  4 00:19 RELEASE-DATE-5.1.1
-rwxrwxrwx  1 <username> <username>     41 Jun  4 00:18 babel.config.json
-rwxrwxrwx  1 <username> <username>   4064 Jun  4 00:19 composer.json
-rwxrwxrwx  1 <username> <username> 204120 Jun  4 00:18 composer.lock
-rwxrwxrwx  1 <username> <username>   4502 Jul 31 10:32 config.inc.php
drwxrwxrwx  3 <username> <username>   4096 Jun  4 00:19 doc
drwxrwxrwx  2 <username> <username>   4096 Jun  4 00:18 examples
-rwxrwxrwx  1 <username> <username>  22486 Jun  4 00:18 favicon.ico
-rwxrwxrwx  1 <username> <username>    413 Jun  4 00:18 index.php
drwxrwxrwx  5 <username> <username>   4096 Jun  4 00:18 js
drwxrwxrwx  5 <username> <username>   4096 Jun  4 00:19 libraries
-rwxrwxrwx  1 <username> <username>   2252 Jun  4 00:19 package.json
-rwxrwxrwx  1 <username> <username>   1034 Jun  4 00:19 print.css
-rwxrwxrwx  1 <username> <username>     26 Jun  4 00:19 robots.txt
drwxrwxrwx  3 <username> <username>   4096 Jun  4 00:19 setup
-rwxrwxrwx  1 <username> <username>   1354 Jun  4 00:19 show_config_errors.php
drwxrwxrwx  2 <username> <username>   4096 Jun  4 00:19 sql
drwxrwxrwx 25 <username> <username>   4096 Jun  4 00:19 templates
drwxrwxrwx  5 <username> <username>   4096 Jun  4 00:19 themes
-rwxrwxrwx  1 <username> <username>   1613 Jun  4 00:19 url.php
drwxrwxrwx 17 <username> <username>   4096 Jun  4 00:19 vendor
-rwxrwxrwx  1 <username> <username> 306579 Jun  4 00:19 yarn.lock
```

<!-- markdownlint-disable DOCSMD004 -->
::: warning Wrong permissions warning
If the permissions are set to allow more than only read access for all except the owner in the **phpMyAdmin** application kit, the error message **`Wrong permissions on configuration file, should not be world-writable!`** will be shown when trying to run **phpMyAdmin**.

![phpMyAdmin](./images/phpMyAdmin-Error.png "phpMyAdmin Login")

:::
<!-- markdownlint-enable DOCSMD004 -->
