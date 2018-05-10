// Instance the tour
function showTour() {
	var tour = new Tour({
		steps: [
			{
				element: "#accordion",
				placement: "bottom",
				title: "Thư viện components",
				content: "Kéo thả các components dưới đây vago màn hình bên phải."
			},
			{
				element: "#index-tab",
				placement: "right",
				title: "Trang & Contents",
				content: "Bạn có thể thêm/sửa/xóa trang và dàn layout cho trang"
			},
			{
				element: "#toDoList input",
				placement: "top",
				title: "Tạo trang mới",
				content: "Bạn có thể thêm/sửa/xóa trang và dàn layout cho trang"
			},
			{
				element: "#tooglepc",
				placement: "top",
				title: "Chế độ test",
				content: "Chuyển đổi qua lại giữa các chế độ test"
			},
			{
				element: "#nav-tabContent",
				placement: "top",
				title: "Layout chính",
				content: "Màn hình preview hoạt động/hiển thị của components"
			},
			{
				element: "#createSite",
				placement: "bottom",
				title: "Tạo Site",
				content: "Hoàn tất dự án"
			}
		]
	});

	// Initialize the tour
	tour.init();

	tour.start();
	$('#retour').click(function(){
		tour.restart();
	})
}

