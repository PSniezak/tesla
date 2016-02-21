var Gps = function() {

	var that = this;

	this.gps = $('#gps');
	this.menu = $('#gps .nav-aside');
	this.menuItems = this.menu.find('a');
	this.navTop = {
		nav: this.gps.find('.nav-top'),
		items: this.gps.find('.nav-top li')
	}

	// Init app
	this.init();

};

Gps.prototype.init = function() {
	
	this.bind();

	if(this.gps.find('#main-navigation').hasClass('show')){
		this.gps.find('.right-list').removeClass('show');
		this.gps.find('#main-navigation').css('width','100%');
	}

};


/*
* @Action : Bind click events
*
*/ 

Gps.prototype.bind = function() {
	
	this.menuItems.on('click', $.proxy(this.navMenu, this));

};


/*
* @Action : Handle panel switching in gps 
*	@Param : e
*
*/ 

Gps.prototype.navMenu = function(e) {
	e.preventDefault();
	e.stopPropagation();

	var clickedItem = $(e.target).parent().attr('href');

	var panelId = this.selectPanel(clickedItem);

	if(panelId) {

		if(panelId === 'main-navigation') {
			this.gps.find('.right-list').removeClass('show');
			this.gps.find('#'+panelId+'').css('width', '100%');
		} else {
			this.gps.find('.right-list').addClass('show');
		}

		this.gps.find('.main').removeClass('show');
		this.gps.find('#'+panelId+'').addClass('show');

		// Add active for selected panel icon
		this.menuItems.parent().removeClass('active');
		$(e.target).parent().parent().addClass('active');
	}

};


/*
*	@Action : Return the matching id
*	@Param : The clicked menu item
*	@Return : the id of matching panel
*
*/ 

Gps.prototype.selectPanel = function(elem) {

	switch(elem) {
		case 'item-1':
			return 'main-navigation';
			break; 
		case 'item-2' :
			return 'main-favorites';
			break;
		case 'item-3' :
			return 'main-search';
			break;
		case 'item-4' :
			return 'main-pointofinterest';
			break;
		case 'item-5' :
			return 'main-settings';
			break;
		default: 
			return false;
	}

}