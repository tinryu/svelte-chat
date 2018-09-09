new WOW().init();
$( "#app" ).hide();
var listMess = new ListMess({
	target: document.getElementById('listMess'),
});

var menuUser = new MenuUser({
	target: document.getElementById('listUser'),
});

var login = new Login({
	target: document.getElementById('login'),
});

