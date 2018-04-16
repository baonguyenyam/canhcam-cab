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
ECHO 2) Run dev (9999)
ECHO 3) Build product
ECHO 4) Build product with local
ECHO 5) Build product NOT MIN
ECHO 6) Build product with local NOT MIN
ECHO 7) Run Tool (9999)
ECHO 8) Run HTML2PUG (1234)
ECHO 9) RUN DEV TEMPLATE (9999)
ECHO u) Updrage Package
ECHO q) Quit
ECHO.

set /p op=Choice:
IF "%op%"=="1" GOTO Builder
IF "%op%"=="2" GOTO dev
IF "%op%"=="3" GOTO product
IF "%op%"=="4" GOTO productlocal
IF "%op%"=="5" GOTO productNo
IF "%op%"=="6" GOTO productNolocal
IF "%op%"=="7" GOTO Tool
IF "%op%"=="8" GOTO Pug
IF "%op%"=="9" GOTO DevPro
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

:product
npm run pro
GOTO begin

:productlocal
npm run prod
GOTO begin

:productNo
npm run pro-no
GOTO begin

:productNolocal
npm run prod-no
GOTO begin

:Tool
npm run tool
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


