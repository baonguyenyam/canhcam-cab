@echo off
ECHO =====================================
ECHO Welcome to the Web-App.
ECHO Copyright 2016
ECHO Build by Bao Nguyen
ECHO =====================================
ECHO Are You ready to install?!?
Pause
if exist install.lock (
    ECHO App is ready in your system. To Re-Install, please remove the 'install.lock' file and run again! Thanks.
) else (
	ECHO Install Global Modules...
	npm i gulp bower phantomjs npm-check-updates -g
	ECHO Update Bower Components...
	bower update
	ECHO Install Node Modules...
	npm install --only=dev
	npm install
	npm i sass node-sass
	rem Saved
	@echo off
	@echo v0.0.1> install.lock
    ECHO -----------------------------
    ECHO Congrats! Install Finished.
)


:begin

echo.
ECHO Please choice a selection!
ECHO 1). Run App
ECHO 2). Exit Install
ECHO 3). Quit
ECHO.

set /p op=Choice:
IF "%op%"=="1" GOTO RunApp
IF "%op%"=="2" GOTO ExitInstall
IF "%op%"=="3" GOTO Logoff

ECHO Please choice a selection!
goto begin

:RunApp
gulp
GOTO begin

:ExitInstall
@exit
GOTO begin


:Logoff
@exit
GOTO begin

:exit
@exit


