#!/bin/bash
printf "\033[1;36m=====================================\033[0m\n"
printf "\033[1;36mWelcome to the BIZ4X-Mobile Application. This is the products of 4xLabs\033[0m\n"
printf "\033[1;36mCopyright 2017\033[0m\n"
printf "\033[1;36mBuild by BIZ4X Team\033[0m\n"
printf "\033[1;36m=====================================\033[0m\n"
printf "\033[0;33mAre You ready to install?!?\033[0m\n"
read -p "Press enter to continue..." nothing
printf "\033[0;33mRemove NodeJS Modules folders...\033[0m\n"
npm run rimraf -- node_modules
printf "\033[0;33mRemove Bower Components folders...\033[0m\n"
npm run rimraf -- bower_components
printf "\033[0;33mChecking update...\033[0m\n"
ncu -u 
printf "\033[0;33mInstall Node Modules...\033[0m\n"
npm install
npm install --only=dev
npm i sass node-sass
printf "\033[1;32m-----------------------------\033[0m\n"
printf "\033[1;32mCongrats! Install Finished.\033[0m\n"

choice=""

while [ "$choice" != "q" ]
do
        echo
        echo "Please choice a selection!"
        echo "1) Run App"
        echo "2) Exit Install"
        echo "q) Quit"
        echo

        read choice

        case $choice in
            '1') npm run dev;;
            '2') exit 0;;
            'q') ;;
            *)   printf "\033[0;33mMenu item is not available, try again!\033[0m\n";;
        esac
done

exit 0
