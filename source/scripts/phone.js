var Phone = function() {

	var that = this;

	this.phone = $('#phone-min');
	this.phone.panels = this.phone.find('.main');
	this.phone.gi = this.phone.find('.gi');
	this.phone.call = this.phone.find('#main-calling');
	this.phone.history = this.phone.find('#main-history');
	this.phone.call.hangout = this.phone.find('.hangout');
	this.phone.call.hangoutRecap = this.phone.find('.end-call');

	this.init();
};

Phone.prototype.init = function() {
	
	this.bind();
};

Phone.prototype.bind = function() {
	
	this.phone.gi.on('click', $.proxy(this.call, this));

	// Hang out the call
	this.phone.call.hangout.on('click', $.proxy(this.hangout, this));
	
	this.phone.call.hangoutRecap.on('click', $.proxy(this.showRecap, this));
};

Phone.prototype.hangoutRecap = function() {
	

};


Phone.prototype.hangout = function(e) {
	e.preventDefault();

	this.phone.call.hangoutRecap.fadeIn();

	setTimeout(function() {

		$('#phone-min .end-call').fadeOut();

		$('#phone-min .main').removeClass('show');
		$('#phone-min .main').css('display','none');
		$('#phone-min .main').css('width','100%');

		$('#phone-min #main-history').fadeIn();
		$('#phone-min #main-history').addClass('show');

	}, 3000);
};


Phone.prototype.call = function(e) {
	e.preventDefault();

	var audioInit = new Audio('assets/sounds/calling.mp3');
	audioInit.play();
	
	this.phone.panels.removeClass('show');
	
	
	this.phone.call.fadeIn();
	this.phone.call.addClass('show');
};