# How to customize phpMyAdmin installation kit in Windows environment

If you are used to using **phpMyAdmin** for the administration of MariaDB (MySQL) databases, you will probably be interested in how to install it within the Zerops [PHP + Apache service](/documentation/services/runtimes/php.html) to administrate the Zerops [MariaDB (MySQL) service](/documentation/services/databases/mariadb.html).

We are talking here mainly about specifics related to the case when using primarily the Windows platform and if you're not familiar with Linux or Mac environment. The troubles are related to unwanted changes of files or directories permissions when editing a standard installation kit of **phpMyAdmin**, downloaded from its [official site](https://www.phpmyadmin.net).

The following step-by-step instructions can help you to go through the process easily.

<!-- markdownlint-disable DOCSMD004 -->
::: info Using Windows Subsystem for Linux (WSL2)
The prerequisite for using the following steps is to perform a standard installation of WSL2 on Windows according to the official procedure on the [Microsoft website](https://docs.microsoft.com/en-us/windows/wsl/install-win10).
:::
<!-- markdownlint-enable DOCSMD004 -->

1. Download the latest version of the **phpMyAdmin** [installation zip kit](https://www.phpmyadmin.net/downloads) and save it, for example, to `C:\Install\phpMyAdmin` directory as `phpMyAdmin-5.1.1-english.zip` for this case on your PC.

2. Open a new **Bash** command window (coming from the WSL2 installation). It will be open in `/root` directory by default.

3. Install **zip** program by the command ==`apt install zip`== (also **unzip** dependency will be installed automatically).

4. Now create a new directory by the command: ==`mkdir install`== .

5. Switch to the directory where you previously downloaded the **phpMyAdmin** installation kit by the command: ==`cd /mnt/c/Install/phpMyAdmin`== .

6. Copy `phpMyAdmin-5.1.1-english.zip` file to `/root/install` directory by the command: ==`cp phpMyAdmin-5.1.1-english.zip /root/install`== .

7. Switch back by the command: ==`cd /root/install`== .

8. Extract the zipped file content to the `public` subdirectory (it'll be created automatically) by the command: ==`unzip phpMyAdmin-5.1.1-english.zip -d public`== . The name `public` has to be the same name as the chosen document root name when creating your Zerops [PHP + Apache service](/documentation/services/runtimes/php.html). You can choose a different name, of course, but it has to be used the same in both places again.

9. Delete the zipped file `phpMyAdmin-5.1.1-english.zip` by the command ==`rm phpMyAdmin-5.1.1-english.zip`== .

10. Switch to the directory `public` by the command: ==`cd public`== .

11. Switch to the directory `phpMyAdmin-5.1.1-english` by the command: ==`cd phpMyAdmin-5.1.1-english`== (it's a subdirectory coming from the extracted content of the downloaded file).

12. Rename the filename `config.sample.inc.php` to `config.inc.php` by the command: ==`mv config.sample.inc.php config.inc.php`== .

13. Open the content of the file `config.inc.php` in the VIM editor by the command: ==`vim config.inc.php`== .

14. Press ==`i`== on the keyboard to activate INSERT edit mode.

15. Update the line `$cfg['Servers'][$i]['host'] = 'localhost';` where instead of `localhost` value use a real **hostname** of your Zerops [MariaDB (MySQL) service](/documentation/services/databases/mariadb.html).

16. Update the line `$cfg['blowfish_secret'] = '';` where instead of the empty string value insert a random generated value of 32 characters at least.

17. Press ==`ESC`== on the keyboard to leave INSERT edit mode.

18. Press ==`:wq!`== to save the file and close the VIM editor.

19. Move the whole content of the current directory `phpMyAdmin-5.1.1-english` to the `public` parent directory by the command ==`mv * ../`== (to eliminate an unnecessary directory nesting).

20. Switch to the `public` directory by the command ==`cd ..`== .

21. Remove that unnecessary directory `phpMyAdmin-5.1.1-english` by the command ==`rm -r phpMyAdmin-5.1.1-english`== .

22. Switch to the parent directory by the command ==`cd ..`== .

23. Zip the content of the current directory (it contains only `public` directory + its content) by the command: ==`zip -r phpMyAdmin-5.1.1.zip .`== .

24. Copy the zipped file `phpMyAdmin-5.1.1.zip` to the download directory from the first step by the command: ==`cp phpMyAdmin-5.1.1.zip /mnt/c/Install/phpMyAdmin`== . From this directory you can upload it to the Zerops [PHP + Apache service](/documentation/services/runtimes/php.html).

## Example of correct permissions using WSL2

```php
-rw-r--r-- 1 root root     41 June  4 00:18 babel.config.json
-rw-r--r-- 1 root root   4064 June  4 00:19 composer.json
-rw-r--r-- 1 root root 204120 June  4 00:18 composer.lock
-rw-r--r-- 1 root root   4502 June  9 13:17 config.inc.php
-rw-r--r-- 1 root root   2587 June  4 00:18 CONTRIBUTING.md
drwxr-xr-x 1 root root   4096 June  4 00:19 doc
drwxr-xr-x 1 root root   4096 June  4 00:18 examples
-rw-r--r-- 1 root root  22486 June  4 00:18 favicon.ico
-rw-r--r-- 1 root root  49416 June  4 00:18 ChangeLog
-rw-r--r-- 1 root root    413 June  4 00:18 index.php
drwxr-xr-x 1 root root   4096 June  4 00:18 js
drwxr-xr-x 1 root root   4096 June  4 00:19 libraries
-rw-r--r-- 1 root root  18092 June  4 00:18 LICENSE
-rw-r--r-- 1 root root   2252 June  4 00:19 package.json
-rw-r--r-- 1 root root   1034 June  4 00:19 print.css
-rw-r--r-- 1 root root   1520 June  4 00:18 README
-rw-r--r-- 1 root root     29 June  4 00:19 RELEASE-DATE-5.1.1
-rw-r--r-- 1 root root     26 June  4 00:19 robots.txt
drwxr-xr-x 1 root root   4096 June  4 00:19 setup
-rw-r--r-- 1 root root   1354 June  4 00:19 show_config_errors.php
drwxr-xr-x 1 root root   4096 June  4 00:19 sql
drwxr-xr-x 1 root root   4096 June  4 00:19 templates
drwxr-xr-x 1 root root   4096 June  4 00:19 themes
-rw-r--r-- 1 root root   1613 June  4 00:19 url.php
drwxr-xr-x 1 root root   4096 June  4 00:19 vendor
-rw-r--r-- 1 root root 306579 June  4 00:19 yarn.lock
```

## Incorrect permissions after direct editing in Windows

```php
-rwxrwxrwx 1 root root     41 July  8 11:51 babel.config.json
-rwxrwxrwx 1 root root   4064 July  8 11:51 composer.json
-rwxrwxrwx 1 root root 204120 July  8 11:51 composer.lock
-rwxrwxrwx 1 root root   4521 July  9 11:22 config.inc.php
-rwxrwxrwx 1 root root   2587 July  8 11:51 CONTRIBUTING.md
drwxrwxrwx 1 root root   4096 July  8 11:51 doc
drwxrwxrwx 1 root root   4096 July  8 11:51 examples
-rwxrwxrwx 1 root root  22486 July  8 11:51 favicon.ico
-rwxrwxrwx 1 root root  49416 July  8 11:51 ChangeLog
-rwxrwxrwx 1 root root    413 July  8 11:51 index.php
drwxrwxrwx 1 root root   4096 July  8 11:52 js
drwxrwxrwx 1 root root   4096 July  8 11:52 libraries
-rwxrwxrwx 1 root root  18092 July  8 11:51 LICENSE
-rwxrwxrwx 1 root root   2252 July  8 11:51 package.json
-rwxrwxrwx 1 root root   1034 July  8 11:51 print.css
-rwxrwxrwx 1 root root   1520 July  8 11:51 README
-rwxrwxrwx 1 root root     29 July  8 11:51 RELEASE-DATE-5.1.1
-rwxrwxrwx 1 root root     26 July  8 11:51 robots.txt
drwxrwxrwx 1 root root   4096 July  8 11:52 setup
-rwxrwxrwx 1 root root   1354 July  8 11:51 show_config_errors.php
drwxrwxrwx 1 root root   4096 July  8 11:52 sql
drwxrwxrwx 1 root root   4096 July  8 11:52 templates
drwxrwxrwx 1 root root   4096 July  8 11:52 themes
-rwxrwxrwx 1 root root   1613 July  8 11:51 url.php
drwxrwxrwx 1 root root   4096 July  8 11:53 vendor
-rwxrwxrwx 1 root root 306579 July  8 11:51 yarn.lock
```
