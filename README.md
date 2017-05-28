Krypton Cougars Robotics
=====
We are the [Krypton Cougars](http://www.team2539.com), [FIRST Robotics Competition](https://www.firstinspires.org/robotics/frc) team 2539 from Palmyra, PA.

This repository holds our custom driver dashboard. It is written using [jQuery Mobile](http://jquerymobile.com/) and [pynetworktables2js](http://pynetworktables2js.readthedocs.io/en/stable/) and runs on the driver station laptop. Although the official FRC driver station is only available for Windows, this dashboard will run on any platform.

Setting up your environment:
--
**Prerequisites**

You must have [python 3](https://www.python.org/downloads/), [pip 3](https://pip.pypa.io/en/stable/installing/), and [npm](https://www.npmjs.com/get-npm) installed on your system to use this project. Consult your system's documentation for the proper way to install them.

**The simple way**

You must use a Unix-like shell, such as the Linux terminal, the Mac OS X terminal, or the Linux Subsystem on Windows to setup your environment using this method. If you are installing this on the driver station, see [Installing on the Driver Station](#windows) instead.

 1. Install [direnv](https://direnv.net/).
 2. Setup direnv for your shell as described in its documentation. If you don't know which shell you are using, the following should usually work:

    `echo -e '\neval "$(direnv hook bash)"' >> ~/.bashrc`

 3. Clone this project into a local directory

    `git clone https://github.com/FRC2539/html_dashboard.git`

 4. cd into the project

    `cd html_dashboard`

 5. Enable direnv for the repository

    `direnv allow`

 6. Enjoy your completely set-up development environment

> Note: If direnv is not available for your system and you don't want to compile it yourself, you can run `source .envrc` to setup your environment. However, you must remember to do this every time you want to use the project, whereas direnv will automatically do this whenever you are inside the repository.

**<a name="windows"></a>Installing on the Driver Station**

Complete instructions are coming soon.
 1. Clone the repository
 2. Install [nw.js](https://www.npmjs.com/package/nw) with npm and [pynetworktables2js](https://pypi.python.org/pypi/pynetworktables2js/2017.0.3) with pip
 3. Update the paths in `run.ps1` and `run.bat` to match the location of your repository
 4. Set the path of `run.bat` as the `DashboardCmdLine` in "C:\Users\Public\Documents\FRC\FRC DS Data Storage.ini"
 5. Set the dashboard to "Default" in the driver station, if it isn't already
 6. Wait for a minute until the dashboard appears. If it does not appear, try restarting the driver station

Running the dashboard
--
This is only necessary for development. On the driver station, you should allow the driver station software to automatically start the dashboard.

To see the dashboard as it will run on the driver station, you only need to run the `run.sh` script:

`./run.sh`

If you are developing, you may wish to run the dashboard in a browser with a complete set of developer tools instead of the node-webkit window. You can do this by passing the `--debug` flag to the script, which will start only the server and leave it running in your console so you can see the connection information.

`./run.sh --debug`

If you don't wish to have the dashboard blocking your console, you can start it with the `--server-only` flag instead. This will start the server without showing any output and immediately return control to the console. You can later stop the running server with the `--kill-server` flag.

```
./run.sh --server-only
# Do some things in the console
./run.sh --kill-server
```

Once the server is running, you can view the dashboard by navigating your browser to http://localhost:2539

If you make changes to the dashboard's code, you do not need to restart the server. Simply refresh the page in your browser to see the updated dashboard.
