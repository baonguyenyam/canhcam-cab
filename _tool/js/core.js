
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
	} else {
		$('.notedcanhcam').show()
		$('.deview').hide()
		$('.createcanhcam').hide()
		$('#myTab').removeClass('cnt')
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
	non_asciis = { '-': '[~!@#$%^&*()_+|}{":?><`=\][\/\';/.,}]', 'a': '[ảàạảãàáâãäåắặẳằẵấầẩẫậâă]', 'ae': 'æ', 'c': 'ç', 'e': '[èéẹẽẻềệếểễê]', 'd': '[đ]', 'i': '[ìíîïị]', 'n': 'ñ', 'o': '[òóôõöộồốổỗơởợỡờớôơ]', 'oe': 'œ', 'u': '[ùúûűüủụưửựứừữư]', 'y': '[ýỳỷỵỹ]' };
	for (i in non_asciis) { r = r.replace(new RegExp(non_asciis[i], 'g'), i); }
	return r;
};
