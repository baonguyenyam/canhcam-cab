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
        echo "1) Chạy Site Builder (8080)"
        echo "2) Chạy site hoàn chỉnh (9999)"
        echo "3) Build product"
        echo "4) Build product with local"
        echo "5) Build product NOT MIN"
        echo "6) Build product with local NOT MIN"
        echo "7) AAAAAAAAAAA"
        echo "8) Run HTML2PUG (1234)"
        echo "9) Chạy xây dựng components (9999)"
        echo "u) Updrage Package"
        echo "q) Quit"
		echo "\n"
        echo

        read choice

        case $choice in
            '1') npm run web;;
            '2') npm run start;;
            '3') npm run pro;;
            '4') npm run prod;;
            '5') npm run pro-no;;
            '6') npm run prod-no;;
            '7') aaaaaaaaaa;;
            '8') npm run node;;
            '9') npm run dev;;
            'u') npm run update;;
            'q') ;;
            *)   printf "\033[0;33mMenu item is not available, try again!\033[0m\n";;
        esac
done

exit 0
