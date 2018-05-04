@echo off
ECHO =====================================
ECHO Welcome to the Canh Cam Application. This is the products of Bao Nguyen.
ECHO Copyright 2018
ECHO Build by Canh Cam Team
ECHO =====================================
ECHO Are You ready to run?!?
Pause

:begin

echo.
ECHO Please choice a selection!
ECHO 1) Run Site Builder (8080)
ECHO 2) Chạy site đã build
ECHO 3) Chạy xây dựng components (9999)
ECHO 4) Run HTML2PUG (1234)
ECHO u) Updrage Package
ECHO q) Quit
ECHO.

set /p op=Choice:
IF "%op%"=="1" GOTO Builder
IF "%op%"=="2" GOTO dev
IF "%op%"=="3" GOTO DevPro
IF "%op%"=="4" GOTO Pug
IF "%op%"=="q" GOTO ExitInstall
IF "%op%"=="u" GOTO Updrage

ECHO Please choice a selection!
goto begin

:Builder
npm run web
GOTO begin

:dev
npm run start
GOTO begin

:Pug
npm run node
GOTO begin

:Updrage
npm run update
GOTO begin

:DevPro
npm run dev
GOTO begin

:ExitInstall
@exit
GOTO begin

:exit
@exit


