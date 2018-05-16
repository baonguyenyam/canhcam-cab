function xoaTab(e, item) {
	e.preventDefault();
	var txt;
	if (confirm("Bạn có chắc chắn xóa nó?")) {
		$(item).parents('li').remove()
		var u = $(item).attr('data-id')
		var m = $(item).parents('li').attr('data-tab-name')
		deleteArrayPage(m)
		$('#' + u).remove()
		$('#myTab li:first-child > a').trigger('click')
	} else {
		return false
	}
}

function checkTab() {
	if ($('#myTab').html().trim().length > 0) {
		$('#myTab').addClass('cnt')
		$('.notedcanhcam').hide()
		$('.createcanhcam').show()
		$('.deview').show()
		$('.bleft').show()
	} else {
		$('.notedcanhcam').show()
		$('.deview').hide()
		$('.createcanhcam').hide()
		$('#myTab').removeClass('cnt')
		$('.bleft').hide()
	}
}

function createLeftMenuList() {
	jQuery.get("/data.json", function (data) {
		var parsedJSON = data;
		var total = 0
		var index = 0
		var show = ''
		for (var key in parsedJSON) {
			if (index == 0) {
				show = ' show';
			} else {
				show = ''
			}
			var count = Object.keys(parsedJSON[key]).length;
			total = + total + count
			var father = document.createElement('div');
			father.id = "cc-menu-" + key;
			father.setAttribute("data-tab-id", taoIdNgauNhien(25));
			father.innerHTML = '<div class="card"><div class="card-header" id="heading-' + key + '"><h5 class="mb-0"><button class="btn btn-link collapsed d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#collapse-' + key + '" aria-expanded="true" aria-controls="collapse-' + key + '">' + key.replace('-', ' ').toUpperCase() + ' <span class="badge badge-secondary">' + count + '</span></button></h5></div><div id="collapse-' + key + '" class="collapse' + show +'" aria-labelledby="heading-' + key + '" data-parent="#accordion"><div class="card-body"><div class="slider-items list-group mainList"></div></div></div>'
			$('#accordion').append(father)

			for (var des in parsedJSON[key]) {
				var dataKey = parsedJSON[key][des][0]
				var dataType = parsedJSON[key][des][1]
				var dataImg = parsedJSON[key][des][2]
				var dataTitle = parsedJSON[key][des][3]
				var badge = '<div class="list-group-item" data-key="' + dataKey + '" data-type="' + dataType + '"><h5><a href="/templates/index-' + dataKey.replace('/', '-') + '.html" target="_blank">' + dataTitle + '</a></h5>' + '<figure>' + '<img src="./img/layout/' + dataImg + '" alt=""></div>' +
					// '<div><iframe src="./templates/index-carousel-c-1.html" frameborder="0" onload="this.style.opacity = 1"></iframe></div>'+
					'</figure></div>'
				if (parsedJSON[key][des][4] && parsedJSON[key][des][4].length) {
					var dataHeight = parsedJSON[key][des][4]
					badge = '<div class="list-group-item" data-height="' + dataHeight + '" data-key="' + dataKey + '" data-type="' + dataType + '"><h5><a href="/templates/index-' + dataKey.replace('/', '-') + '.html" target="_blank">' + dataTitle + '</a></h5>' + '<figure>' + '<img src="./img/layout/' + dataImg + '" alt=""></div>' +
						'</figure></div>'
				}
				if (key) {
					if ($("#cc-menu-" + key).length) {
						$("#cc-menu-" + key + " .mainList").append(badge);
					}
					$('.mainList').each(function (i, e) {
						var sortableMain = new Sortable.create(e, {
							group: {
								name: 'mainList',
								pull: "clone",
								put: false
							},
							ghostClass: "canhcam-ghost",
							sort: false,
							animation: 100,
							onMove: function (evt, originalEvent) {
								$('#nav-tabContent').addClass('active')
							},
							onClone: function (evt) {
								$('#nav-tabContent').addClass('active')
							},
							onStart: function (evt) {
								$('#nav-tabContent').addClass('active')
							},
							onEnd: function (evt) {
								$('#nav-tabContent').removeClass('active')
								toggleContentReady()
							}
						});
					})
				}
			}
			index++
		}
		buildTotal(total)
	});
}

function buildTotal(params) {
	jQuery.get("/version.json", function (data) {
		var info = data;
		$('#version').html(info.version + ' ' + info.build)
		$('#accordion').append('<div class="total bg-light p-2 small">Components: <span class="text-info">' + params + '</span><br>Tập tin: <span class="text-info">' + ((params * 3) + 9) + '</span><br>Site vừa tạo: <span class="text-info justbuild"></span><br>Phiên bản: <span class="text-info">' + info.version + ' ' + info.build + '</span></div>')
	})
	jQuery.get("/justbuild.json", function (data) {
		var info = data;
		$('.justbuild').html('@SITE/' + info.sitename)
	})
}
function removeVietnam(s) {
	var r = s.toLowerCase().replace(/\s+/g, '-'),
	non_asciis = {
		'-': '[`~!@#$%^&*()_|+=?;:",.<>/]',
		'a': '[ảàạảãàáâãäåắặẳằẵấầẩẫậâă]',
		'ae': 'æ',
		'c': 'ç',
		'e': '[èéẹẽẻềệếểễê]',
		'd': '[đ]',
		'i': '[ìíîïị]',
		'n': 'ñ',
		'o': '[òóôõöộồốổỗơởợỡờớôơ]',
		'oe': 'œ',
		'u': '[ùúûűüủụưửựứừữư]',
		'y': '[ýỳỷỵỹ]'
	};
	for (var i in non_asciis) {
		r = r.replace(new RegExp(non_asciis[i], 'gi'), i);
	}
	r = r.replace(/[^\w\s]/gi, '-')
	return r
};

function taoIdNgauNhien(a) {
	var text = "";
	var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
	for (var i = 0; i < a; i++) text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}


function kiemTraTenTrang(value, arr) {
	return ($.inArray(value, arr) > -1);
}

function checkFormDisable(a, b) {
	if ($('#' + a).prop("checked")) {
		$('#' + b).attr("disabled", false);
		$('#' + b).prop("checked", false);
	} else {
		$('#' + b).attr("disabled", true);
		$('#' + b).prop("checked", false);
	}
}

function saveToData(a, b) {
	if (confirm("Bạn có chắc chắn lưu ngay bây giờ?")) {
		jQuery.post("/savedata", {
			dataColor: a,
			dataJS: b
		}, function (data) {
			if (data === 'done') {
				$('#exampleModalCenter').modal('hide')
			}
		});
	} else {
		return false
	}
}

function getDataColor() {
	jQuery.get("/getdata", function (data) {
		var e = JSON.parse(data)
		var i = 0
		for (var key in e) {
			var dataKey = key
			var dataVal = e[key]
			var badge2 = document.createElement('div');
			badge2.className = 'col-12 mt-3';
			badge2.innerHTML = '<h5>Màu Phụ</h5>' + '<hr>';
			var badge = document.createElement('div');
			badge.className = 'col-sm-6 col-lg-3';
			badge.innerHTML = '<div class="form-group">' + '<div class="input-group colorpicker-component cppicker">' + '<div class="input-group-prepend">' + '<span class="input-group-text">' + dataKey + '</span>' + '</div>' + '<input type="text" class="form-control" value="' + dataVal + '">' + '<span class="input-group-addon">' + '<i></i>' + '</span>' + '</div>' + '</div>';
			if (i == 4) {
				document.getElementById("maincolor").appendChild(badge2);
			}
			document.getElementById("maincolor").appendChild(badge);
			$('.cppicker').colorpicker();
			i++
		}
	});
}

function getDataJS() {
	jQuery.get("/getdatajs", function (data) {
		var e = JSON.parse(data)
		var i = 0
		for (var key in e) {
			if (typeof e[key] == 'number') {
				$("[data-key='" + key + "']").val(e[key])
			} else {
				if (e[key]) {
					$("[data-key='" + key + "']").prop("checked", true)
				} else {
					$("[data-key='" + key + "']").prop("checked", false)
				}
			}
			i++
		}
	});
}

function resizeFrame() {
	$('.ifthumnails').each(function () {
		$(this).removeAttr('style')
		$(this).find('iframe').removeAttr('style')
		var ge = $(this).parents('.list-group-item')
		if (ge.attr('data-height') && ge.attr('data-height').length) {
			var setH = ge.attr('data-height')
			setTimeout(() => {
				$(this).css({
					"height": setH
				})
				$(this).find('iframe').css({
					"height": setH
				})
			}, 1000);
		} else {
			setTimeout(() => {
				var abc = $(this).find('iframe').contents().height()
				$(this).css({
					"height": abc + 'px'
				})
				$(this).find('iframe').css({
					"height": abc + 'px'
				})
			}, 1000);
		}
	});
}

function toggleContentReady() {
	var exitsCom = true
	$('.newlist').each(function () {
		if ($(this).html().trim().length > 0) {
			exitsCom = false
			$(this).addClass('cnt')
		} else {
			$(this).removeClass('cnt')
		}
	})
	if (!exitsCom) {
		unSavePage()
	}
}

function addClickDel(a){
	$('#edit-' + a).css({
		"cursor": "pointer"
	})
	$('#edit-'+a).click(function () {
		setTimeout(() => {
			$('#'+a).focus().click()
		}, 100);
	})
}

function buildFormAddComponent(){
	$('#formAddComponent select').html('<option selected disabled>Vui lòng chọn</option>')
	$('#formAddComponent')[0].reset();
	$('#formAddComponent .textresult').html('...')
	jQuery.get("/data.json", function (data) {
		var lists = '',
			main = 'body'
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				var imt = Object.keys(data[key]).length
				if(key === 'header') {
					main = 'header'
				} else if (key === 'footer') {
					main = 'footer'
				} else {
					main = 'body'
				}
				lists += '<option data-comnum=' + (imt+1) + ' data-type=' + main +' data-count=' + key.charAt(0) + '-' + (imt+1) +' value=' + key + '>' + key.charAt(0).toUpperCase() + key.slice(1); + '</option>'
			}
		}
		$('#formAddComponent select').append(lists).on('change', function (e) {
			var option = $('option:selected', this).attr('data-count');
			var mopt = $('option:selected', this).attr('data-type');
			var comnum = $('option:selected', this).attr('data-comnum');
			$('#formAddComponent .textresult').html(e.target.value + '/' + option)
			$('#formAddComponent #comkey').val(option)
			$('#formAddComponent #commain').val(mopt)
			$('#formAddComponent #comnum').val(comnum)
			$('#formAddComponent #nameCompo').val(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).replace('-', ' ') + ' ' + comnum)
		})
	});
}


function unSavePage() {
	$(window).bind('beforeunload', function () {
		return 'Bạn có muốn thoát trang ngay bây giờ?';
	});
}

//////////////////////////////////////////////

$(function () {
	addClickDel('projectname')
	$('[data-toggle="tooltip"]').tooltip()
	$('#projectname').quickEdit({
		blur: false,
		checkold: true,
		space: false,
		maxLength: 50,
		showbtn: false,
		submit: function (dom, newValue) {
			var newval = removeVietnam(newValue.trim())
			objectName = newval
			dom.text(newval);
		}
	});
	checkFormDisable("customCheck1", "customCheck2")
	$('#customCheck1').click(function () {
		checkFormDisable("customCheck1", "customCheck2")
	})
	$('#addComponent').click(function (e) {
		buildFormAddComponent()
	})
	$('#preCreateSite').click(function (e) {
		location.reload();
	})
	$('.togglemenu').click(function () {
		$('#maincc').toggleClass('active')
		$(this).toggleClass('active')
		resizeFrame()
	});
	$('#tooglepc').click(function () {
		$(this).addClass('active')
		$('#toogletablet, #tooglemobile').removeClass('active')
		$('.maindev').addClass('pc').removeClass('mobile').removeClass('tablet')
		resizeFrame()
	});
	$('#tooglemobile').click(function () {
		$(this).addClass('active')
		$('#toogletablet, #tooglepc').removeClass('active')
		$('.maindev').addClass('mobile').removeClass('pc').removeClass('tablet')
		resizeFrame()
	});
	$('#toogletablet').click(function () {
		$(this).addClass('active')
		$('#tooglemobile, #tooglepc').removeClass('active')
		$('.maindev').addClass('tablet').removeClass('mobile').removeClass('pc')
		resizeFrame()
	});

	$('#noleft').on('click', '.xoatab', function (e) {
		$(this).parents('.nav-link').trigger('click')
		var item = this;
		xoaTab(e, item)
		checkTab()
	});
	$('#toDoListMain').on('keyup', function (e) {
		var keyCode = e.keyCode || e.which;
		if (keyCode === 13) {
			e.preventDefault();
			$(this).find('#buttonListItemMain').trigger('click')
			return false;
		}
	});
	$('#toDoList').on('keyup keypress', function (e) {
		var keyCode = e.keyCode || e.which;
		if (keyCode === 13) {
			e.preventDefault();
			$(this).find('#createPage').trigger('click')
			return false;
		}
	});
	$('#saveConfig').click(function () {
		var pargam = []
		var pargamJS = []
		var dataColor, dataJS;
		$("#settings input[type=text]").each(function () {
			var input = $(this).val()
			var inputattr = $(this).parents('.cppicker').find('.input-group-text').html()
			pargam.push(inputattr + ": " + input)
		});
		$("#jsf input[type=checkbox]").each(function () {
			var inputJS = $(this).prop("checked")
			var inputJSName = $(this).attr('data-key')
			pargamJS.push('"' + inputJSName + '":' + inputJS)
		});
		$("#jsf input[type=text]").each(function () {
			var inputJSText = $(this).val()
			var inputJSTextName = $(this).attr('data-key')
			pargamJS.push('"' + inputJSTextName + '":' + inputJSText)
		});
		dataColor = "$mau: (" + pargam + ")"
		dataJS = "const CANHCAM_APP = {" + pargamJS + "}"
		saveToData(dataColor.toString(), dataJS.toString())
	})
	createLeftMenuList()
	getDataColor()
	getDataJS()
})

$(window).resize(function () {
	resizeFrame()
})


