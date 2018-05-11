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

// Check dự án đã tồn tại
function getExitsProject() {
	jQuery.get("/getreadysite", function (data) {

		var substringMatcher = function (strs) {
			return function findMatches(q, cb) {
				var matches, substringRegex;
				matches = [];
				substringRegex = new RegExp(q, 'i');
				$.each(strs, function (i, str) {
					if (substringRegex.test(str)) {
						matches.push(str);
					}
				});
				cb(matches);
			};
		};

		var getExitsProject = data

		$('#typeahead').typeahead({
			hint: true,
			highlight: true,
			minLength: 1
		}, {
				name: 'getExitsProject',
				source: substringMatcher(getExitsProject)
			});
	});

}

getExitsProject()
