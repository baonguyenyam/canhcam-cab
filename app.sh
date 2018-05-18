#!/bin/bash
printf "\n"
printf "\n"
printf "\n"
printf "\033[1;36m=====================================\033[0m\n"
printf "\033[1;36mWelcome to the Canh Cam Application. This is the products of Bao Nguyen\033[0m\n"
printf "\033[1;36mCopyright 2018\033[0m\n"
printf "\033[1;36mBuild by Canh Cam Team\033[0m\n"
printf "\033[1;36m=====================================\033[0m\n"
printf "\033[0;33mAre You ready to run?!?\033[0m\n"

choice=""

while [ "$choice" != "q" ]
do
        echo
        echo "Please choice a selection!"
        echo "1) Chạy CAB (8080)"
        echo "2) Chạy site đã build"
        echo "3) Chạy xây dựng components (9999)"
        echo "4) Run HTML2PUG (1234)"
        echo "p) Chạy Production CAB"
        echo "d) Chạy Dev CAB"
        echo "u) Updrage Package"
        echo "q) Quit"
		echo "\n"
        echo

        read choice

        case $choice in
            '1') npm run web;;
            '2') npm run start;;
            '3') npm run dev;;
            '4') npm run node;;
            'p') npm run index;;
            'd') node index.js;;
            'u') npm run update;;
            'q') ;;
            *)   printf "\033[0;33mMenu item is not available, try again!\033[0m\n";;
        esac
done

exit 0
