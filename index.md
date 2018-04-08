# Cánh Cam - Auto Build Website Tool
________

## Gọi APP
- Nếu là Windows thì chạy file `app.bat`
- Nếu là MacOS thì chạy lệnh `sh app.sh`

## Bước 1 
Chạy Công cụ Auto build `npm run web` => Sau đó build site tại bước 2

## Bước 2
Chạy Dev để test thử web, có thể cấu hình lại các file `concat.json` và `seo.json` trong thư mục `./src/[TÊN-DỰ-ÁN]`

________

## Chạy dự án
- `npm run web` => Chạy Công cụ Auto build 
- `npm run tool` => Xây dựng công cụ Auto Build
- `npm start` => Chạy Dev 
- `npm run pro` => Build với đường dẫn gián tiếp
- `npm run prod` => Build với đường dẫn trực tiếp
- `npm run pro-no` => Build với đường dẫn gián tiếp ko nén 
- `npm run prod-no` => Build với đường dẫn trực tiếp ko nén 

________

## Chú ý:
Khi code thư viện bạn phải tuân thủ bảng màu trong `CANHCAM-LIB\_color.sass`