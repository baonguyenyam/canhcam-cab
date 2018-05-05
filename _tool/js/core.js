function deleteTodoItem(e, item) {
	e.preventDefault();
	var txt;
	if (confirm("Bạn có chắc chắn xóa nó?")) {
		$(item).parents('li').remove()
		var u = $(item).attr('data-id')
		$('#' + u).remove()
		$('#myTab li:first-child > a').trigger('click')
	} else {
		return false
	}
}
$(function () {
	$('#noleft').on('click', '.btn-danger', function (e) {
		var item = this;
		deleteTodoItem(e, item)
		checkTab()
	});
})

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
$('#toDoList, #toDoListMain').on('keyup keypress', function (e) {
	var keyCode = e.keyCode || e.which;
	if (keyCode === 13) {
		e.preventDefault();
		$(this).find('button').trigger('click')
		return false;
	}
});

function removeVietnam(s) {
	var r = s.toLowerCase().replace(/\s+/g, '-');
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
	for (i in non_asciis) {
		r = r.replace(new RegExp(non_asciis[i], 'gi'), i);
	}
	r = r.replace(/[^\w\s]/gi, '-')
	return r
};

function getJSONFile(url) {
	var resp = '';
	var xmlHttp = new XMLHttpRequest();
	if (xmlHttp != null) {
		xmlHttp.open("GET", url, false);
		xmlHttp.send(null);
		resp = xmlHttp.responseText;
	}
	return resp;
}

function getAllLocations() {
	jQuery.get("./data.json", function (data) {
		var parsedJSON = data;
		for (var key in parsedJSON) {
			var father = document.createElement('div');
			father.id = "cc-menu-" + key;
			father.innerHTML = '<div class="card"><div class="card-header" id="heading-' + key + '"><h5 class="mb-0"><button class="btn btn-link collapsed" data-toggle="collapse" data-target="#collapse-' + key +'" aria-expanded="true" aria-controls="collapse-' + key+'">'+key.toUpperCase()+'</button></h5></div><div id="collapse-' + key+'" class="collapse" aria-labelledby="heading-' + key+'" data-parent="#accordion"><div class="card-body"><div class="slider-items list-group mainList"></div></div></div>'
			document.getElementById('accordion').appendChild(father);

		}
		for (var key in parsedJSON) {
			var index = 0
			for (var des in parsedJSON[key]) {
				var dataKey = parsedJSON[key][des][0]
				var dataType = parsedJSON[key][des][1]
				var dataImg = parsedJSON[key][des][2]
				var dataTitle = parsedJSON[key][des][3]
				var badge = '<div class="list-group-item" data-key="' + dataKey + '" data-type="' + dataType + '"><h5>' + dataTitle + '</h5>' + '<figure>' + '<img src="./img/layout/' + dataImg + '" alt=""></div>' +
					// '<div><iframe src="./templates/index-carousel-c-1.html" frameborder="0" onload="this.style.opacity = 1"></iframe></div>'+
					'</figure></div>'
				if (key) {
					if ($("#cc-menu-" + key).length){
						$("#cc-menu-"+ key +" .mainList").append(badge);
					}
					$('.mainList').each(function (i, e) {
						var sortableMain = new Sortable.create(e, {
							group: {
								name: 'mainList',
								pull: "clone",
							},
							sort: false,
							animation: 100
						});
					})
				}
				index++
			}
		}

	});
}
getAllLocations()
