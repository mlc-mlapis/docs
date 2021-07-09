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

3. Now create a new directory by the command: `mkdir install`.

4. Install **zip** program by the command `apt install zip` (also **unzip** dependency will be installed automatically).

5. Switch to the directory where you previously downloaded the **phpMyAdmin** installation kit by the command: `cd /mnt/c/Install/phpMyAdmin`.

6. Copy `phpMyAdmin-5.1.1-english.zip` file to `/root/install` directory by the command: `cp phpMyAdmin-5.1.1-english.zip /root/install`.

7. Switch back by the command: `cd /root/install`.

8. Extract the zipped file content to the `public` subdirectory (it'll be created automatically) by the command: `unzip phpMyAdmin-5.1.1-english.zip -d public`. The name `public` has to be the same name as the chosen document root name when creating your Zerops [PHP + Apache service](/documentation/services/runtimes/php.html). You can choose a different name, of course, but it has to be used the same in both places again.

9. Delete the zipped file `phpMyAdmin-5.1.1-english.zip` by the command `rm phpMyAdmin-5.1.1-english.zip`.

10. Switch to the directory `public` by the command: `cd public`.

11. Switch to the directory `phpMyAdmin-5.1.1-english` by the command: `cd phpMyAdmin-5.1.1-english` (it's a subdirectory coming from the extracted content of the downloaded file).

12. Rename the filename `config.sample.inc.php` to `config.inc.php` by the command: `mv config.sample.inc.php config.inc.php`.

13. Open the content of the file `config.inc.php` in the VIM editor by the command: `vim config.inc.php`.

14. Press `i` on the keyboard to activate INSERT edit mode.

15. Update the line `$cfg['Servers'][$i]['host'] = 'localhost';` where instead of `localhost` value use a real **hostname** of your Zerops [MariaDB (MySQL) service](/documentation/services/databases/mariadb.html).

16. Update the line `$cfg['blowfish_secret'] = '';` where instead of the empty string value insert a random generated value of 32 characters at least.

17. Press `ESC` on the keyboard to leave INSERT edit mode.

18. Press `:wq!` to save the file and close the VIM editor.

19. Move the whole content of the current directory `phpMyAdmin-5.1.1-english` to the `public` parent directory by the command `mv * ../` (to eliminate an unnecessary directory nesting).

20. Switch to the `public` directory by the command `cd ..`.

21. Remove that unnecessary directory `phpMyAdmin-5.1.1-english` by the command `rm -r phpMyAdmin-5.1.1-english`.

22. Switch to the parent directory by the command `cd ..`.

23. Zip the content of the current directory (it contains only `public` directory + its content) by the command: `zip -r phpMyAdmin-5.1.1.zip`.

24. Copy the zipped file `phpMyAdmin-5.1.1.zip` to the download directory from the first step by the command: `cp phpMyAdmin-5.1.1.zip /mnt/c/Install`. From this directory you can upload it to the Zerops [PHP + Apache service](/documentation/services/runtimes/php.html).
