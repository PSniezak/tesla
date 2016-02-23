var Footer = function() {

	var that = this;

	this.footer = $('#footer');
	this.footer.controls = {
		low: this.footer.find('.temperature-low'),
		up: this.footer.find('.temperature-up')
	};
	this.footer.temperature = this.footer.find('span.temperature');

	this.init();
}

Footer.prototype.init = function() {
	
	this.bind();
};

Footer.prototype.bind = function() {
	
	this.footer.controls.low.on('click', $.proxy(this.temperatureLow, this));
	this.footer.controls.up.on('click', $.proxy(this.temperatureUp, this));

};

Footer.prototype.temperatureLow = function(e) {
	e.preventDefault();

	var temperature = parseFloat(this.footer.temperature.html());

	if(temperature > 0) {
		this.footer.temperature.html(temperature-1+'°F');
	}
};

Footer.prototype.temperatureUp = function(e) {
	e.preventDefault();

	var temperature = parseFloat(this.footer.temperature.html());

	if(temperature < 110) {
		this.footer.temperature.html(temperature+1+'°F');
	}
};