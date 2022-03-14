# Preparing and deploying Adminer application kit

If you are used to using **Adminer** for the administration of MariaDB (MySQL) databases, you will probably be interested in how to install it within the Zerops [PHP service](/documentation/services/runtimes/php.html) to administrate the Zerops [MariaDB (MySQL) service](/documentation/services/databases/mariadb.html).

<!-- markdownlint-disable DOCSMD004 -->
::: tip When only using the Windows platform
If you can't get a native Linux or Mac platform, or if you're not familiar with them, you will probably welcome using standard installation of the Windows Subsystem for Linux (WSL2) according to the official procedure on [Microsoft website](https://docs.microsoft.com/windows/wsl/install-win10). You will also need to install [Node.js](https://docs.microsoft.com/windows/dev-environment/javascript/nodejs-on-wsl) on WSL2. **The reason for using WSL2 comes from issues related to unwanted file permission changes when doing this natively on the Windows platform.**
:::
<!-- markdownlint-enable DOCSMD004 -->

The following step-by-step instructions can help you through the process with ease. It's assumed that you have already created your project in Zerops GUI and an empty PHP service (not connected to any repository). You can use a [service import](/documentation/services/runtimes/php.html#simple-import-example-in-the-yaml-syntax) functionality for it.

1. Open a new **Bash** / **Zsh** terminal window (also from the WSL2 installation). It will be open in `/home/<username>` on Linux or `/Users/<username>` on Mac directory by default.

2. Install **curl** program using the command ==`sudo apt install curl`== on Linux or ==`brew install curl`== on Mac if you didn't do so before.

3. Now create a new subdirectory `install` using the command: ==`mkdir install`== and switch to it with the command ==`cd install`== . Here, create another new subdirectory `adminer` via the command ==`mkdir adminer`== , and again switch to it using the command ==`cd adminer`== . Now, you should be in the directory `/home/<username>/install/adminer`.

4. Create a `public` subdirectory using the command ==`mkdir public`== . The name `public` has to be the same name as a chosen [document root](/documentation/services/runtimes/php.html#project-code-root-and-document-root) name when creating your Zerops [PHP service](/documentation/services/runtimes/php.html). You can choose a different name, of course, but it has to be the same in both places.

5. Switch to the created directory `public` with the command: ==`cd public`== .

6. Download the latest version of the **Adminer** [PHP file](https://www.adminer.org/en) using the command ==`curl https://github.com/vrana/adminer/releases/download/v4.8.1/adminer-4.8.1-en.php -L -o index.php`== .

7. Check the permissions of the file `index.php` with the command ==`ls -l`== . It should be `-rw-r--r--` (allowing only read access except for the owner). If not, change the file permissions using the command ==`chmod 644 index.php`== .

8. Switch back to the parent directory with the command ==`cd ..`== .

9. Deploy the application kit prepared in this way to the Zerops [PHP service](/documentation/services/runtimes/php.html) using the [Zerops zcli](/documentation/cli/installation.html) via the [deploy command](/documentation/cli/available-commands.html#deploy-project-name-service-name-space-separated-files-or-directories) ==`zcli deploy "<project name>" <service hostname> "."`== (after using the [login command](/documentation/cli/available-commands.html#login)). This command creates a zipped file from the [current directory content](/documentation/build/build-config.html#deploy-everything) first and then deploys it to Zerops via an HTTPS protocol (without triggering a build pipeline).

10. You should see the following output while the deployment process is working:

```bash
service status: SERVICE_STACK_STATUS_READY_TO_DEPLOY
creating package
working directory: /home/<username>/install/adminer
packing directory: /home/<username>/install/adminer
uploading package
package uploaded
deploying service
temporaryShutdown: false
service deployed
```

## Correct file permissions

If you run the command ==`ls -a -l`== on `/home/<username>/install/adminer/public` directory, you can check that file permissions are correct (allow only read access to files except for the owner) for the **Adminer** application kit. The listing should be as follows:

```bash
drwxr-xr-x 2 <username> <username>   4096 Jul 31 14:15 .
drwxr-xr-x 3 <username> <username>   4096 Jul 31 14:15 ..
-rw-r--r-- 1 <username> <username> 317072 Jul 31 13:55 index.php
```

## Incorrect file permissions

If you only use a native Windows environment to prepare the **Adminer** application kit (without WSL2), the listing would be as follows (read, write and execute of everything), which is incorrect:

```bash
drwxrxxrxx 2 <username> <username>   4096 Jul 31 14:15 .
drwxrxxrxx 3 <username> <username>   4096 Jul 31 14:15 ..
-rwxrwxrwx 1 <username> <username> 317072 Jul 31 13:55 index.php
```
