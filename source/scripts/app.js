$(document).ready(function() {
	var app = new App();
});

var App = function() {

	particlesJS.load('particles-js', 'assets/particles.json', function() {
		console.log('= PARTICLES DONE =');
	});

	this.tpl = templates;

	this.header = $('#header');
	this.music = $('#music');
	this.gps = $('#gps');
	this.phone = $('#phone');
	this.browser = $('#browser');
	this.energy = $('#energy');
	this.footer = $('#footer');

	this.bind();

	this.init();
};

// App initialization
App.prototype.init = function() {

	console.log('= INIT =');

	this.loadTemplates();

	console.log('= INIT DONE =');
};


// Bind buttons/events
App.prototype.bind = function() {
	
};

// Load HBS templates
App.prototype.loadTemplates = function() {

	console.log('= LOADING TEMPLATES =');

	this.header.append(this.tpl.header);
	this.music.append(this.tpl.music);
	this.gps.append(this.tpl.gps);
	this.phone.append(this.tpl.phone);
	this.browser.append(this.tpl.browser);
	this.energy.append(this.tpl.energy);
	this.footer.append(this.tpl.footer);

	console.log('= TEMPLATES DONE =');
};