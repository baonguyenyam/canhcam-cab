var dab = {
	SETUP: {},
	objectName: '',
	pagesLists: ['index'],
}

function toggleDAB() {
	$('#accordion-dab').addClass('active')
	$('#accordion, #addComponent, #stCssJS, .notedcanhcam').hide()
	$('#toDoList, .bleft, .deview, #addElements').show()
	createLeftMenuListDAB()
	taoTrangIndexDAB()
}

function createPageBuilderDAB(toAdd) {
	dab.SETUP[toAdd] = []
	$('.frameNewlist').each(function (i, e) {
	})
}

function checkReadyTabDAB(toAdd) {
	if (!kiemTraTenTrang(toAdd, dab.pagesLists)) {
		if (toAdd) {
			var iframe = document.createElement('iframe');
			iframe.src = '/views/iframe.html';
			iframe.width = '100%';
			iframe.className = 'frameNewlist';
			iframe.onload = function () {
				taoIframe(iframe)
			};
			$('.noleft .nav-tabs').append('<li class="nav-item page-tab" data-tab-name="' + toAdd + '" data-tab-id="' + taoIdNgauNhien(10) + '"><a class="nav-link" id="' + toAdd + '-tab" data-toggle="tab" href="#' + toAdd + '" role="tab" aria-controls="' + toAdd + '" aria-selected="true"><i class="fa fa-file mr-2"></i><abbr data-original-title="Edit" class="name-tab">' + toAdd + '</abbr>.html<span class="btn btn-sm btn-danger xoatab" data-id="' + toAdd + '"><i class="fa fa-close"></i></span></a></li>');
			$('.noleft #nav-tabContent').append('<div class="tab-pane fade" id="' + toAdd + '" role="tabpanel" aria-labelledby="' + toAdd + '-tab"></div>');
			$('#toDoList')[0].reset();
			$('#' + toAdd).html(iframe)
			$('#' + toAdd + '-tab').trigger('click')
			createPageBuilderDAB(toAdd)
			checkTab()
			dab.pagesLists.push(toAdd)
			$('#myTab .page-tab .nav-link .name-tab').quickEdit({
				blur: false,
				checkold: true,
				space: false,
				maxLength: 50,
				showbtn: false,
				submit: function (dom, newValue) {
					var newval = removeVietnam(newValue.trim())
					if (!kiemTraTenTrang(newval, dab.pagesLists)) {
						dom.text(newval);
						var valname = $(dom).parents('.nav-item').attr('data-tab-name')
						$(dom).parents('.nav-item').attr('data-tab-name', newval)
						$(dom).parents('.nav-link').attr({
							'id': newval + "-tab",
							'aria-controls': newval,
							'href': "#" + newval
						})
						$('#nav-tabContent').find('#' + valname).attr({
							'id': newval,
							'aria-labelledby': newval + "-tab",
						})
						changePageName(newval, valname)
					} else {
						dom.text(dom.innerText);
					}
				}
			});
		} else {
			return false
		}
	} else {
		alert('Chưa nhập tên hoặc đã tồn tại trang này!')
		$('#toDoList')[0].reset();
	}

}

function turnOnDND(evt, iframe) {
	var itemEl = evt.item
	var gcont = unescape($(itemEl).attr('data-content'))
	var gnum = $(itemEl).attr('data-key')
	$(itemEl).html(gcont)
	if (gnum === 'gird' || gnum === 'row') {
		$(itemEl).find('.container, .container-fluid, .col').each(function (i, e) {
			var getid = taoIdNgauNhien(10)
			$(this).attr('id', 'dab-item-' + getid)
			$(itemEl).find('.container').addClass('dab-item-gird').attr('data-title', '.container')
			$(itemEl).find('.container-fluid').addClass('dab-item-gird').attr('data-title', '.container-fluid')
			$(itemEl).find('.col').addClass('dab-item-col').attr('data-title','.col')
			frameChild(iframe, getid)
			$(this).append('<span class="dab-item-remove btn btn-sm btn-danger js-remove-child" data-id="fg"><i class="fa fa-times"></i></span>')
		})
	} else {
		$(itemEl).append('<span class="dab-item-remove btn btn-sm btn-danger js-remove" data-id="fg"><i class="fa fa-times"></i></span>')
	}
}

function frameChild(iframe, getid) {
	var doc2 = iframe.contentDocument,
		list2 = doc2.getElementById('dab-item-' + getid);
	var sortableElm = new Sortable.create(list2, {
		ghostClass: "canhcam-ghost",
		group: {
			name: 'chilsList',
			put: ['mainList', 'chilsList']
		},
		onMove: function (evt, originalEvent) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("#listWithHandle").addClass('active')
			$('.accordion').addClass('remove')
		},
		onStart: function (evt) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("#listWithHandle").addClass('active')
			$('.accordion').addClass('remove')
		},
		onClone: function (evt) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("#listWithHandle").addClass('active')
			$('.accordion').addClass('remove')
		},
		onEnd: function (evt) {
			$('#nav-tabContent').removeClass('active')
			$(iframe).contents().find("#listWithHandle").removeClass('active')
			$('.accordion').removeClass('remove')
			toggleContentReadyDAB(iframe)
		},
		onAdd: function (evt) {
			toggleContentReadyDAB(iframe)
			turnOnDND(evt, iframe)
		},
		animation: 100,
		filter: '.js-remove-child',
		onFilter: function (evt) {
			if (confirm("Bạn có chắc chắn xóa nó?")) {
				var el = sortableElm.closest(evt.item);
				$(el).parents('.dab-item').remove()
				toggleContentReadyDAB(iframe)
			} else {
				return false
			}
		}
	})
}

function taoIframe(iframe) {
	var doc = iframe.contentDocument,
		list = doc.getElementById('listWithHandle');
	var sortableIframe = new Sortable.create(list, {
		ghostClass: "canhcam-ghost",
		group: {
			name: 'chilsList',
			put: ['mainList', 'chilsList']
		},
		onMove: function (evt, originalEvent) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("#listWithHandle").addClass('active')
			$('.accordion').addClass('remove')
		},
		onStart: function (evt) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("#listWithHandle").addClass('active')
			$('.accordion').addClass('remove')
		},
		onClone: function (evt) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("#listWithHandle").addClass('active')
			$('.accordion').addClass('remove')
		},
		onAdd: function (evt) {
			toggleContentReadyDAB(iframe)
			turnOnDND(evt, iframe)
		},
		onEnd: function (evt) {
			$('#nav-tabContent').removeClass('active')
			$(iframe).contents().find("#listWithHandle").removeClass('active')
			$('.accordion').removeClass('remove')
			toggleContentReadyDAB(iframe)
		},
		animation: 100,
		filter: '.js-remove',
		onFilter: function (evt) {
			if (confirm("Bạn có chắc chắn xóa nó?")) {
				var el = sortableIframe.closest(evt.item);
				el && el.parentNode.removeChild(el);
				toggleContentReadyDAB(iframe)
			} else {
				return false
			}
		}
	});
	$('.mainList').on('dragenter', function () {
		$('.sortable-ghost', list).remove();
	});
}


function taoTrangIndexDAB() {
	if (dab.pagesLists.length == 1) {
		var toAdd = "index";

		var iframe = document.createElement('iframe');
		iframe.src = '/views/iframe.html';
		iframe.width = '100%';
		iframe.className = 'frameNewlist';
		iframe.onload = function () {
			taoIframe(iframe)
		};

		$('.noleft .nav-tabs').append('<li class="nav-item" data-tab-id="' + taoIdNgauNhien(10) + '"><a class="nav-link" id="' + toAdd + '-tab" data-toggle="tab" href="#' + toAdd + '" role="tab" aria-controls="' + toAdd + '" aria-selected="true"><i class="fa fa-file mr-2"></i>' + toAdd + '.html</a></li>');
		$('.noleft #nav-tabContent').append('<div class="tab-pane fade" id="' + toAdd + '" role="tabpanel" aria-labelledby="' + toAdd + '-tab"></div>');
		$('#toDoList')[0].reset();
		$('#' + toAdd + '-tab').trigger('click')
		$('#' + toAdd).html(iframe)
		createPageBuilderDAB(toAdd)
		checkTab()
	}
}


function toggleContentReadyDAB(iframe) {
	$('.frameNewlist').each(function (i, e) {
		$('body').removeClass('pace-done').addClass('pace-running')
		$('.pace').removeClass('pace-inactive')
		$(this).removeAttr('style')
		setTimeout(() => {
			var abc = $(this).contents().height()
			$(this).css({
				"height": abc + 'px'
			})
			loadingPage()
		}, 1000);
	})
	var exitsCom = true
	$('.frameNewlist').each(function () {
		if ($(this).contents().find("#listWithHandle").html().trim().length > 0) {
			exitsCom = false
			$(this).contents().find("#listWithHandle").addClass('cnt')
		} else {
			$(this).contents().find("#listWithHandle").removeClass('cnt')
		}
	})
	if (!exitsCom) {
		unSavePage()
	}
}

function createLeftMenuListDAB() {
	jQuery.get("/data-dab.json", function (data) {
		var parsedJSON = data;
		var total = 0
		var index = 0
		var show = ''
		var collapsed = 'collapsed'
		for (var key in parsedJSON) {
			// Dòng này bật sẽ tự động bật menu đầu tiên ra 
			if (index == 0) {
				show = ' show';
				collapsed = ''
			} else {
				show = ''
				collapsed = ' collapsed';
			}
			var count = Object.keys(parsedJSON[key]).length;
			var father = document.createElement('div');
			father.id = "cc-menu-dab-" + key;
			father.setAttribute("data-tab-id", taoIdNgauNhien(25));
			father.innerHTML = '<div class="card"><div class="card-header" id="heading-dab-' + key + '"><h5 class="mb-0"><button class="btn btn-link ' + collapsed + ' d-flex justify-content-between align-items-center" data-toggle="collapse" data-target="#collapse-dab-' + key + '" aria-expanded="true" aria-controls="collapse-dab-' + key + '">' + key.replace('-', ' ').toUpperCase() + ' <span class="badge badge-secondary">' + count + '</span></button></h5></div><div id="collapse-dab-' + key + '" class="collapse' + show + '" aria-labelledby="heading-dab-' + key + '" data-parent="#accordion-dab"><div class="card-body"><div class="slider-items list-group mainList"></div></div></div>';
			$('#accordion-dab').append(father)
			for (var des in parsedJSON[key]) {
				var dataKey = parsedJSON[key][des][0]
				var dataContent = parsedJSON[key][des][1]
				var badge = '<div class="dab-item" data-dab="true" data-key=' + key + ' data-content=' + escape(dataContent) + '>' + dataKey + '</div>';
				if (key) {
					if ($("#cc-menu-dab-" + key).length) {
						$("#cc-menu-dab-" + key + " .mainList").append(badge);
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
								$('#nav-tabContent iframe').contents().find("#listWithHandle").addClass('active')
							},
							onClone: function (evt) {
								$('#nav-tabContent').addClass('active')
								$('#nav-tabContent iframe').contents().find("#listWithHandle").addClass('active')
							},
							onStart: function (evt) {
								$('#nav-tabContent').addClass('active')
								$('#nav-tabContent iframe').contents().find("#listWithHandle").addClass('active')
							},
							onEnd: function (evt) {
								$('#nav-tabContent').removeClass('active')
								$('#nav-tabContent iframe').contents().find("#listWithHandle").removeClass('active')
							}
						});
					})
				}
			}
			index++
		}
	})
}


function buildFormAddComponentDAB() {
	$('#formAddComponentDAB select').html('<option selected disabled>Vui lòng chọn</option>')
	$('#formAddComponentDAB')[0].reset();
	$('#formAddComponentDAB .textresult').html('...')
	jQuery.get("/data-dab.json", function (data) {
		var lists = '';
		for (var key in data) {
			if (data.hasOwnProperty(key)) {
				var imt = Object.keys(data[key]).length
				lists += '<option data-comnum=' + (imt + 1) + ' data-count=' + key.charAt(0) + '-' + (imt + 1) + ' value=' + key + '>' + key.charAt(0).toUpperCase() + key.slice(1); + '</option>'
			}
		}
		$('#formAddComponentDAB select').append(lists).on('change', function (e) {
			var option = $('option:selected', this).attr('data-count');
			var mopt = $('option:selected', this).attr('data-type');
			var comnum = $('option:selected', this).attr('data-comnum');
			$('#formAddComponentDAB .textresult').html(e.target.value + '/' + option)
			$('#formAddComponentDAB #comkeyElm').val(option)
			$('#formAddComponentDAB #commainElm').val(mopt)
			$('#formAddComponentDAB #comnumElm').val(comnum)
			$('#formAddComponentDAB #nameCompoElm').val(e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).replace('-', ' ') + ' ' + comnum)
		})
	});
}