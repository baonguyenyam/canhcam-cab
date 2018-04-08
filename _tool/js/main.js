var data = {
	SETUP: {}
}
var objectName = ''
var pages = ['index']

$('.mainList').each(function (i, e) {
	var sortableMain = new Sortable.create(e, {
		group: {
			name: 'mainList',
			pull: "clone"
		},
		ghostClass: 'sortable-ghost',
		animation: 100
	});
})

function createList(toAdd) {
	data.SETUP[toAdd] = []
	$('.newlist').each(function (i, e) {
		var sortable = new Sortable.create(e, {
			group: {
				put: 'mainList',
				pull: false
			},
			onAdd: function (evt) {
				getlist()
			},
			onClone: function (evt) {
				getlist()
			},
			onRemove: function (evt) {
				getlist()
			},
			onAdd: function (evt) {
				getlist()
			},
			onUpdate: function (evt) {
				getlist()
			},
			onEnd: function (evt) {
				getlist()
			},
			animation: 100
		});
		$('.mainList').on('dragenter', function () {
			$('.sortable-ghost', e).remove();
		});
		function getlist() {
			$('.newlist').each(function () {
				if ($('.newlist').html().trim().length > 0) {
					$(this).addClass('cnt')
				} else {
					$(this).removeClass('cnt')
				}
			})
			var optionTexts = {
				header: [],
				body: [],
				footer: []
			};
			$(e).find(".list-group-item").each(function () {
				if ($(this).attr("data-type") === 'header') {
					optionTexts.header.push($(this).attr("data-key"))
				} else if ($(this).attr("data-type") === 'body') {
					optionTexts.body.push($(this).attr("data-key"))
				} else {
					optionTexts.footer.push($(this).attr("data-key"))
				}
			});
			data.SETUP[toAdd] = optionTexts
			// console.log(data)
		}
	})
}

$('#buttonListItemMain').click(function () {
	var toAdd = removeVietnam($('input[name=ListItemMain]').val().trim());
	if (toAdd) {
		objectName = toAdd
		$('.deview h4').html("Dự Án: "+objectName)
		$('#toDoListMain').hide()
		$('#toDoListMain')[0].reset();
		$('#toDoList').show()
		alert('Thêm dự án thành công!, hãy tiếp tục tạo page trên dự án.')
		createIndex()
	} else {
		return false
	}
});

$('#createsite').click(function (e) {
	e.preventDefault();
	var newData = data
	if (confirm("Bạn có chắc chắn tạo site ngay bây giờ?")) {
		jQuery.post("/createsite", { name: objectName, data: newData}, function (data) {
			if (data === 'done') {
				$('#toDoListMain').show()
				$('#toDoList, .deview').hide()
				$('.notedcanhcam').show()
				$('.notedcanhcam .alert').show()
				$('.createcanhcam').hide()
				$('#myTab').removeClass('cnt')
				$('#myTab, #nav-tabContent').html('')
				data = {
					SETUP: {}
				}
				objectName = ''
				pages = ['index']
			}
		});
	} else {
		return false
	}
});

function checkValue(value, arr) {
	return ($.inArray(value, arr) > -1);
}

function createIndex() {
	if (pages.length == 1) {
		var toAdd = "index";
		$('.noleft .nav-tabs').append('<li class="nav-item"><a class="nav-link" id="' + toAdd + '-tab" data-toggle="tab" href="#' + toAdd + '" role="tab" aria-controls="' + toAdd + '" aria-selected="true">' + toAdd + '.html</a></li>');
		$('.noleft #nav-tabContent').append('<div class="tab-pane fade" id="' + toAdd + '" role="tabpanel" aria-labelledby="' + toAdd + '-tab"><div class="list-group newlist"></div></div>');
		$('#toDoList')[0].reset();
		$('#' + toAdd + '-tab').trigger('click')
		createList(toAdd)
		checkTab()
	}
}

$('#button').click(function () {
	var toAdd = removeVietnam($('input[name=ListItem]').val().trim());
	if(!checkValue(toAdd, pages)) {
		if (toAdd) {
			$('.noleft .nav-tabs').append('<li class="nav-item"><a class="nav-link" id="' + toAdd + '-tab" data-toggle="tab" href="#' + toAdd + '" role="tab" aria-controls="' + toAdd + '" aria-selected="true">' + toAdd + '.html<span class="btn btn-sm btn-danger" data-id="' + toAdd + '"><i class="fa fa-close"></i></span></a></li>');
			$('.noleft #nav-tabContent').append('<div class="tab-pane fade" id="' + toAdd + '" role="tabpanel" aria-labelledby="' + toAdd + '-tab"><div class="list-group newlist"></div></div>');
			$('#toDoList')[0].reset();
			$('#' + toAdd + '-tab').trigger('click')
			createList(toAdd)
			checkTab()
			pages.push(toAdd)
		} else {
			return false
		}
	} else {
		alert('Chưa nhập tên hoặc đã tồn tại trang này!')
		$('#toDoList')[0].reset();
	}
});

$(function () {
	$('.cppicker').colorpicker();
	checkFormDisable("customCheck1", "customCheck2")
	$('#customCheck1').click(function () {
		checkFormDisable("customCheck1", "customCheck2")
	})
});

function checkFormDisable(a,b) {
	if ($('#'+a).prop("checked")) {
		$('#'+b).attr("disabled", false);
		$('#'+b).prop("checked", false);
	} else {
		$('#'+b).attr("disabled", true);
		$('#'+b).prop("checked", false);
	}
}

$('#sbm').click(function () {
	var pargam = []
	$("#settings input[type=text]").each(function () {
		var input = $(this).val()
		var inputattr = $(this).parents('.cppicker').find('.input-group-text').html()
		pargam.push(inputattr+": "+input)
	});
	alert(pargam)
})


function getData() {
	jQuery.get("/getdata", function (data) {
		if (data === 'done') {
			console.log(1)
		}
	});
}

getData()
