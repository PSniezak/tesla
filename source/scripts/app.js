$(document).ready(function() {
	var app = new App();
});

var App = function() {

	particlesJS.load('particles-js', 'assets/particles.json', function() {
		console.log('= PARTICLES DONE =');
	});

	this.tpl = templates;
	this.widget = {};

	// Bind cards
	this.divHeader = $('#header');
	this.divMusic = $('#music');
	this.divGps = $('#gps');
	this.divPhone = $('#phone');
	this.divBrowser = $('#browser');
	this.divEnergy = $('#energy');
	this.divFooter = $('#footer');

	this.bind();

	this.init();
};

// App initialization
App.prototype.init = function() {

	console.log('= INIT =');

	this.loadTemplates();

	console.log('= INIT DONE =');

	// Initialise new classes / Call js for each widget
	
	this.widget.music = new Music(); 

};


// Bind buttons/events
App.prototype.bind = function() {
	
};

// Load HBS templates
App.prototype.loadTemplates = function() {

	console.log('= LOADING TEMPLATES =');

	this.divHeader.append(this.tpl.header);
	this.divMusic.append(this.tpl.music);
	this.divGps.append(this.tpl.gps);
	this.divPhone.append(this.tpl.phone);
	this.divBrowser.append(this.tpl.browser);
	this.divEnergy.append(this.tpl.energy);
	this.divFooter.append(this.tpl.footer);

	console.log('= TEMPLATES DONE =');
};