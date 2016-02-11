var App = function() {

	// Template file
	this.tpl = templates;

	// Bind divs
	this.music = $('#music'),
	this.gps = $('#gps'),
	this.phone = $('#phone');
	this.browser = $('#browser');
	this.energy = $('#energy');

	this.bind();

	// Init app
	this.init();
}

App.prototype.init = function() {

	console.log('========== INIT ========');
	
	var that = this;

	this.loadTemplates();
};


// Bind buttons / events
App.prototype.bind = function() {
	
};

App.prototype.loadTemplates = function() {

	console.log('========== LOADING TEMPLATES =========');
	
	this.music.append(this.tpl.music);
	this.gps.append(this.tpl.gps);
	this.phone.append(this.tpl.phone);
	this.browser.append(this.tpl.browser);
	this.energy.append(this.tpl.energy);

};

// $(document).ready(function() {
//     //
//     $('#music').append(templates.music);
// });