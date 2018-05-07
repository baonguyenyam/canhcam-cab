key.filter = function (event) {
	var tagName = (event.target || event.srcElement).tagName;
	return !(tagName == 'SELECT' || tagName == 'TEXTAREA');
}
// Tên dự án
key('ctrl+alt+d,⌘+alt+d', function () {
	$('#toDoListMain input').focus();
	; return false
});
// Enter tên dự án
key('ctrl+alt+e,⌘+alt+e', function () {
	$('#toDoList button').click()
	$('#toDoListMain button').click()
	; return false
});
// Tên trang
key('ctrl+alt+p,⌘+alt+p', function () {
	$('#toDoList input').focus();
	; return false
});
key('ctrl+alt+l,⌘+alt+l', function () {
	$('#tooglepc').click()
	; return false
});
key('ctrl+alt+m,⌘+alt+m', function () {
	$('#tooglemobile').click()
	; return false
});
key('ctrl+alt+t,⌘+alt+t', function () {
	$('#toogletablet').click()
	; return false
});
key('ctrl+alt+n,⌘+alt+n', function () {
	$('.togglemenu').click()
	; return false
});
