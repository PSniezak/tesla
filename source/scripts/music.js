var Music = function() {

	var that = this;

	this.musicPlayer = $('#music');
	this.menu = $('#music .nav-aside');
	this.menuItems = this.menu.find('a');
	this.mains = {
		radio: $('#radio')
	};

	this.init();

};

Music.prototype.init = function() {
	
	this.bind();

};

Music.prototype.bind = function() {
	
	this.menuItems.on('click', $.proxy(this.navMenu, this));

};

Music.prototype.navMenu = function(e) {
	e.preventDefault();
	e.stopPropagation();

	var clickedItem = $(e.target).parent().attr('href');

};