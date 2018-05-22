var dab = {
	SETUP: {},
	objectName: '',
	pagesLists: ['index'],
	modeSwitch: 'dev'
}

function toggleDAB() {
	$('#accordion-dab').addClass('active')
	$('#accordion, #addComponent, #stCssJS, .notedcanhcam').hide()
	$('#toDoList, .bleft, .deview, #addElements, #layoutmode').show()
	createLeftMenuListDAB()
	taoTrangIndexDAB()
}

function createPageBuilderDAB(toAdd) {
	dab.SETUP[toAdd] = []
}

function modeEdit() {
	dab.modeSwitch = 'edit'
	clearAllFrame(dab.modeSwitch)
	$('#nav-tabContent .tab-pane.active').each(function (i, e) {
		var fcnt = $(this).find('iframe.frameNewlist').contents()
		var getcnt = fcnt.find("#listWithHandle").html()
		var clone = $(this).find('iframe.frameEdit').contents()
		clone.find("body").html(getcnt)
	})
	$('#editContentModal').on('hide.bs.modal', function (e) {
		$('#editContentModal .modal-body').html('')
	})
	$('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		if (dab.modeSwitch === 'edit') {
			$('#nav-tabContent .tab-pane.active').each(function (i, e) {
				var fcnt = $(this).find('iframe.frameNewlist').contents()
				var getcnt = fcnt.find("#listWithHandle").html()
				var clone = $(this).find('iframe.frameEdit').contents()
				clone.find("body").html(getcnt)
			})
			reFrame()
		}
	})
	reFrame()
}

// function callEditBtn(el) {
// 	$('#nav-tabContent .tab-pane.active').find('iframe.frameEdit').contents().find('body').each(function () {
// 		var e = $(this)
// 		$(this).find('.dab-item-remove').each(function () {
// 			var u = $(this)
// 			u.click(function(){
// 				var item = u.attr('data-id')
// 				var getval = $(e).find('#' + item)
// 				var getCNT = getval.attr('data-content')
// 				$('#editContentModal .modal-body').html('<textarea name="editor" id="editor" rows="10" cols="80"></textarea>')
// 				$('#editContentModal #editor').val(unescape(getCNT))
// 				CKEDITOR.replace('editor')
// 				modalEdit($(e), item, el)
// 				$('#editContentModal').modal('show')
// 			})
// 		})
// 	})

// }

// function modalEdit(el, item, u) {
// 	$('#editContentModal #saveIt').click(function () {
// 		var content = CKEDITOR.instances.editor.getData()
// 		$(el).find('#' + item).attr('data-content', escape(content))
// 		$(el).find('#' + item).html(content)
// 		$(el).find('#' + item).append('<span class="dab-item-remove btn btn-sm btn-danger js-remove" data-id="' + item+'"><i class="fa fa-times"></i></span>')
// 		$('#editContentModal').modal('hide')
// 		var e = $(u).contents().find('body').html()
// 		$(u).closest('.tab-pane').find('.frameNewlist').contents().find('#listWithHandle').html(e)
// 	})
// }

function clearAllFrame(params) {
	if (params === 'dev'){
		$('#nav-tabContent .tab-pane').each(function (i, e) {
			var clone = $(this).find('iframe.frameEdit').contents()
			clone.find("body").html('')
		})
		$('#nav-tabContent .tab-pane').each(function (i, e) {
			var clone = $(this).find('iframe.framePreview').contents()
			clone.find("body").html('')
		})
	} else if (params === 'preview') {
		$('#nav-tabContent .tab-pane').each(function (i, e) {
			var clone = $(this).find('iframe.frameEdit').contents()
			clone.find("body").html('')
		})
	} else {
		$('#nav-tabContent .tab-pane').each(function (i, e) {
			var clone = $(this).find('iframe.framePreview').contents()
			clone.find("body").html('')
		})
	}
}


function modeDev() {
	dab.modeSwitch = 'dev'
	clearAllFrame(dab.modeSwitch)
	reFrame()
}

function modePreview() {
	dab.modeSwitch = 'preview'
	clearAllFrame(dab.modeSwitch)
	$('#nav-tabContent .tab-pane').each(function (i, e) {
		var fcnt = $(this).find('iframe.frameNewlist').contents()
		var getcnt = fcnt.find("#listWithHandle").html()
		var itemsToRemove = ['.dab-item-remove']
		var attrToRemove = ['data-title', 'data-content', 'data-key', 'data-dab', 'draggable']
		var classToRemove = ['dab-item-gird', 'dab-item-col']
		var clone = $(this).find('iframe.framePreview').contents()
		clone.find("body").html(getcnt)
		for (var key in itemsToRemove) {
			if (itemsToRemove.hasOwnProperty(key)) {
				var element = itemsToRemove[key];
				clone.find(element).remove()
			}
		}
		for (var key in attrToRemove) {
			if (attrToRemove.hasOwnProperty(key)) {
				var element = attrToRemove[key];
				clone.find('[' + element + ']').removeAttr(element)
			}
		}
		for (var key in classToRemove) {
			if (classToRemove.hasOwnProperty(key)) {
				var element = classToRemove[key];
				clone.find('.' + element).removeClass(element)
			}
		}
		clone.find('*[id^="dab-item-"]').removeAttr('id')
		
		$(clone).find('.dab-item').each(function () {
			var child = $(this).children()
			if ($(child).parent().is(".dab-item")) {
				$(child).unwrap();
			}
		})
	})
	$('#myTab a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		reFrame()
	})
	reFrame()
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
			$('#' + toAdd).append('<iframe src="/views/mode.html" class="framePreview d-none"></iframe>')
			$('#' + toAdd).append('<iframe src="/views/edit.html" class="frameEdit d-none"></iframe>')
			$('#' + toAdd + '-tab').trigger('click')
			$('#toogledev').trigger('click')
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
	var getid = taoIdNgauNhien(10)
	$(itemEl).attr('id', 'dab-item-' + getid)
	if (gnum === 'gird' || gnum === 'row') {
		$(itemEl).find('.container, .container-fluid').each(function (i, e) {
			// var getid = taoIdNgauNhien(10)
			// $(this).attr('id', 'dab-item-' + getid)
			$(itemEl).find('.container').addClass('dab-item-gird').attr('data-title', '.container')
			$(itemEl).find('.container-fluid').addClass('dab-item-gird').attr('data-title', '.container-fluid')
			frameChild(iframe, getid)
			$(this).append('<span class="dab-item-remove btn btn-sm btn-danger js-remove-child" data-id="dab-item-' + getid +'"><i class="fa fa-times"></i></span>')
		})
		$(itemEl).find('.row').each(function (i, e) {
			$(this).find('div').each(function (i, e) {
				// var getid = taoIdNgauNhien(10)
				// $(this).attr('id', 'dab-item-' + getid)
				$(this).addClass('dab-item-col').attr('data-title','.col')
				frameChild(iframe, getid)
				$(this).append('<span class="dab-item-remove btn btn-sm btn-danger js-remove-child" data-id="dab-item-' + getid +'"><i class="fa fa-times"></i></span>')
			})
		})
	} else {
		$(itemEl).append('<span class="dab-item-remove btn btn-sm btn-danger js-remove" data-id="dab-item-' + getid +'"><i class="fa fa-times"></i></span>')
	}
}

function frameChild(iframe, getid) {
	var doc2 = iframe.contentDocument,
		list2 = doc2.getElementById('dab-item-' + getid);
	var sortableElm = new Sortable.create(list2, {
		ghostClass: "canhcam-ghost",
		group: {
			name: 'chilsList',
			put: ['mainList', 'chilsList'],
			pull: false
		},
		onMove: function (evt, originalEvent) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("body").addClass('active')
			$('.accordion').addClass('remove')
		},
		onStart: function (evt) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("body").addClass('active')
			$('.accordion').addClass('remove')
		},
		onClone: function (evt) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("body").addClass('active')
			$('.accordion').addClass('remove')
		},
		onEnd: function (evt) {
			$('#nav-tabContent').removeClass('active')
			$(iframe).contents().find("body").removeClass('active')
			$('.accordion').removeClass('remove')
			toggleContentReadyDAB(iframe)
			reFrame()
		},
		onAdd: function (evt) {
			toggleContentReadyDAB(iframe)
			reFrame()
			turnOnDND(evt, iframe)
		},
		animation: 100,
		filter: '.dab-item-remove',
		onFilter: function (evt) {
			if (confirm("Bạn có chắc chắn xóa nó?")) {
				$(evt.item).closest('.dab-item').remove()
				toggleContentReadyDAB(iframe)
				reFrame()
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
			put: ['mainList', 'chilsList'],
			pull: false
		},
		onMove: function (evt, originalEvent) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("body").addClass('active')
			$('.accordion').addClass('remove')
		},
		onStart: function (evt) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("body").addClass('active')
			$('.accordion').addClass('remove')
		},
		onClone: function (evt) {
			$('#nav-tabContent').addClass('active')
			$(iframe).contents().find("body").addClass('active')
			$('.accordion').addClass('remove')
		},
		onAdd: function (evt) {
			toggleContentReadyDAB(iframe)
			reFrame()
			turnOnDND(evt, iframe)
		},
		onEnd: function (evt) {
			$('#nav-tabContent').removeClass('active')
			$(iframe).contents().find("body").removeClass('active')
			$('.accordion').removeClass('remove')
			toggleContentReadyDAB(iframe)
			reFrame()
		},
		animation: 100,
		filter: '.dab-item-remove',
		onFilter: function (evt) {
			if (confirm("Bạn có chắc chắn xóa nó?")) {
				$(evt.item).closest('.dab-item').remove()
				toggleContentReadyDAB(iframe)
				reFrame()
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
		$('#' + toAdd).append('<iframe src="/views/mode.html" class="framePreview d-none"></iframe>')
		$('#' + toAdd).append('<iframe src="/views/edit.html" class="frameEdit d-none"></iframe>')
		createPageBuilderDAB(toAdd)
		checkTab()
	}
}

function reFrame() {
	$('.frameNewlist, .framePreview, .frameEdit').each(function (i, e) {
		$('body').removeClass('pace-done').addClass('pace-running')
		$('.pace').removeClass('pace-inactive')
		$(this).removeAttr('style')
		setTimeout(() => {
			var abc = $(this).contents().height()
			$(this).css({
				"height": abc + 'px',
				"min-height": abc + 'px',
			})
			loadingPage()
		}, 1000);
	})
}

function toggleContentReadyDAB(iframe) {
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
			total = + total + count
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
								$('#nav-tabContent iframe.frameNewlist').contents().find("body").addClass('active')
							},
							onClone: function (evt) {
								$('#nav-tabContent').addClass('active')
								$('#nav-tabContent iframe.frameNewlist').contents().find("body").addClass('active')
							},
							onStart: function (evt) {
								$('#nav-tabContent').addClass('active')
								$('#nav-tabContent iframe.frameNewlist').contents().find("body").addClass('active')
							},
							onEnd: function (evt) {
								$('#nav-tabContent').removeClass('active')
								$('#nav-tabContent iframe.frameNewlist').contents().find("body").removeClass('active')
							}
						});
					})
				}
			}
			index++
		}
		buildTotalDAB(total)
	})
}

function buildTotalDAB(params) {
	jQuery.get("/version.json", function (data) {
		var info = data;
		$('#version').html(info.version + ' ' + info.build)
		$('#accordion-dab').append('<div class="total p-2 small">S&#x1ED1; th&#xE0;nh ph&#x1EA7;n: <span class="text-info">' + params + '</span><br>Phi&#xEA;n b&#x1EA3;n: <span class="text-info">' + info.version + ' ' + info.build + '</span><br>Phi&#xEA;n b&#x1EA3;n Bootstrap: <span class="text-info">' + info.bootstrap + '</span><br>T&#xE1;c gi&#x1EA3;: <span class="text-info">B&#x1EA3;o Nguy&#xEA;n</span></div>')
		$('#logopage .text-success').html('DAB')
		var memories = $('.memory').attr('data-memory').split(";")
		$('#accordion-dab .total').append('<br>Bộ nhớ sử dụng: <span class="text-info">' + parseInt(memories[1]).toFixed(0) + 'MB</span>')
		$('#accordion-dab .total').append('<br>Platform: <span class="text-info">' + memories[3].charAt(0).toUpperCase() + memories[3].slice(1) + '</span>')
		$('#accordion-dab .total').append('<br>Node: <span class="text-info">v' + memories[4] + '</span>')
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
