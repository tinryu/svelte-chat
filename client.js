new WOW().init();
$("#app").hide();

window.addEventListener("load", startup, false);

function startup() {
	var colorWell;
	var defaultColor = "#fff";
	colorWell = document.querySelector("#yourcolor");
	colorWell.value = defaultColor;
	colorWell.addEventListener("input", updateFirst, false);
	colorWell.select();
}

function updateFirst(event) {
	var p = document.getElementById("go"),
		keyboard = document.querySelector('.keyboard'),
		sliders = document.querySelector('.sliders'),
		wifi = document.querySelector('.wifi'),
		tint = document.querySelector('.tint'),
		label = document.querySelector('.label');

	if (p && keyboard && sliders && wifi && tint && label) {
		p.style.background = event.target.value;
		keyboard.style.color = event.target.value;
		sliders.style.color = event.target.value;
		wifi.style.color = event.target.value;
		tint.style.color = event.target.value;
		label.style.color = event.target.value;
	}
}

var listMess = new ListMess({
	target: document.getElementById('listMess'),
});

var menuUser = new MenuUser({
	target: document.getElementById('listUser'),
});

var login = new Login({
	target: document.getElementById('login'),
});