# Preparing and deploying a simple Nginx web

It is an elementary example of creating an Nginx static web server (with only a trivial `index.html` as its content) and deploying it to Zerops without any source repository to demonstrate the basic principles of using the Zerops [zcli](/documentation/cli/installation.html).

<!-- markdownlint-disable DOCSMD004 -->
::: info When using only the Windows platform
If you don't have the possibility to get any native Linux or Mac platform, or if you're not familiar with them, you will probably welcome using a standard installation of the Windows Subsystem for Linux (WSL2) according to the official procedure on [Microsoft website](https://docs.microsoft.com/windows/wsl/install-win10). You will also need to install [Node.js](https://docs.microsoft.com/windows/dev-environment/javascript/nodejs-on-wsl) on WSL2. **The reason for using WSL2 comes from issues related to unwanted file permission changes when doing this natively on the Windows platform.**
:::
<!-- markdownlint-enable DOCSMD004 -->

The following step-by-step instructions can help you to go through the process easily. It's supposed that you already created your project in Zerops GUI and an empty Nginx service (not connected to any repository). You can use a [service import](/documentation/services/static-servers/nginx.html#simple-import-example-in-the-yaml-syntax) functionality for it.

1. Open a new **Bash** / **Zsh** terminal window (coming also from the WSL2 installation). It will be open in `/home/<username>` on Linux or `/Users/<username>` on Mac directory by default.

2. Now create a new subdirectory `examples` using the command: ==`mkdir examples`== and switch to it with the command ==`cd examples`== . Here, create another new subdirectory `web` via the command ==`mkdir web`== , and again switch to it using the command ==`cd web`== . Now, you should be in the directory `/home/<username>/examples/web`.

3. Create a new empty file, named `index.html` using the command: ==`touch index.html`== .

4. Copy the following HTML code into the system clipboard (CTRL+C).

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <base href="/" />
    <meta charset="utf-8" />
    <title>Zerops Nginx Service: web</title>
  </head>
  <body>
    Hello, Zerops Nginx service ...
  </body>
</html>
```

5. Open the content of the file `index.html` in the VIM editor using the command: ==`vim index.html`== .

6. Type `:set paste` and ENTER to set the INSERT paste mode.

7. Press ==`i`== on the keyboard to activate the INSERT (paste) edit mode.

8. Right click to paste the content of the system clipboard.

9. Press ==`ESC`== on the keyboard to leave the INSERT paste mode.

10. Press ==`:wq!`== to save the file and close the VIM editor.

11. Check the permissions of the file `index.html` with the command ==`ls -l`== . It should be `-rw-r--r--` (allowing only read access except for the owner). If not, change the file permissions using the command ==`chmod 644 index.html`== .

12. Deploy the web kit prepared in this way to the Zerops [Nginx service](/documentation/services/static-servers/nginx.html) using the [Zerops zcli](/documentation/cli/installation.html) via the [deploy command](/documentation/cli/available-commands.html#deploy-project-name-service-name-space-separated-files-or-directories) ==`zcli deploy "<project name>" <service hostname> "."`== (after using the [login command](/documentation/cli/available-commands.html#login)). This command creates a zipped file from the [current directory content](/documentation/build/build-config.html#deploy-everything) first and then deploys it to Zerops via an HTTPS protocol (without triggering a build pipeline).

13. You should see the following output while the deployment process is working:

```bash
service status: SERVICE_STACK_STATUS_READY_TO_DEPLOY
creating package
working directory: /home/<username>/examples/web
packing directory: /home/<username>/examples/web
uploading package
package uploaded
deploying service
temporaryShutdown: false
service deployed
```

## Correct file permissions

If you run the command ==`ls -a -l`== on `/home/<username>/examples/web` directory, you can check correct file permissions (allow only read access to files except for the owner) of the web kit. The listing should be as follows:

```bash
drwxr-xr-x 2 <username> <username>   4096 Jul 31 14:15 .
drwxr-xr-x 3 <username> <username>   4096 Jul 31 14:15 ..
-rw-r--r-- 1 <username> <username> 317072 Jul 31 13:55 index.html
```

## Incorrect file permissions

If you use only native Windows environment to prepare the web kit (without WSL2), the listing would be as follows (read, write and execute of everything), which is incorrect:

```bash
drwxrxxrxx 2 <username> <username>   4096 Jul 31 14:15 .
drwxrxxrxx 3 <username> <username>   4096 Jul 31 14:15 ..
-rwxrwxrwx 1 <username> <username> 317072 Jul 31 13:55 index.html
```