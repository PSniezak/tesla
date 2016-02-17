var Music = function() {

	var that = this;

	this.musicPlayer = $('#music');
	this.menu = $('#music .nav-aside');
	this.menuItems = this.menu.find('a');
	this.navTop = {
		nav: this.musicPlayer.find('.nav-top'),
		items: this.musicPlayer.find('.nav-top li')
	}
	this.dropDown = this.musicPlayer.find('.phone-drop');

	this.radio = {
		player: $('.radio-player'),
		controls: {
			prev: $('.radio-player .next-prev span:first-child'),
			next: $('.radio-player .next-prev span:last-child')
		},
		frequence: $('.radio-player .frequence-number'),
		cursor: $('.radio-player .cursor')
	};

	this.musicSlides = {
		nav: this.musicPlayer.find('.nav-top.slide'),
		items: this.musicPlayer.find('.nav-top.slide li')
	}

	// Init app
	this.init();

};

Music.prototype.init = function() {
	
	this.bind();

};


/*
* @Action : Bind click events
*
*/ 

Music.prototype.bind = function() {
	
	this.menuItems.on('click', $.proxy(this.navMenu, this));

	// Radio controls
	this.radio.controls.prev.on('click', $.proxy(this.frequenceRadio, this, 'prev'));
	this.radio.controls.next.on('click', $.proxy(this.frequenceRadio, this, 'next'));
	
	// Drop down panel
	this.dropDown.on('click', $.proxy(this.openDropDown, this));

	// Slide in radio, favorites....
	this.musicSlides.items.on('click', $.proxy(this.slideContent, this));

	// Top nav bar
	this.navTop.items.on('click', $.proxy(this.changeMode, this));

};

// 
// CELLE CI NE SERT A RIEN POUR L'INSTANT FUTUR SLIDE DAN FAVORITES OU RADIO PAR EXEMPLE
// OKAY MEC
// 
Music.prototype.slideContent = function(e) {
	e.preventDefault();

	var list = $('.slide-container .open'),
			next = $('.slide-container ul:nth-child('+ Math.floor(Math.random() * 3 + 1)+')');

	$('.slide-container').find('ul').removeClass('open');
	next.addClass('open');
	
};


Music.prototype.openDropDown = function(e) {
	e.preventDefault();

	$(e.target).toggleClass('active');
	this.musicPlayer.find('.drop-down').toggleClass('open');
};

Music.prototype.changeMode = function(e) {
	e.preventDefault();

	console.log($(e.target));
	this.navTop.items.find('a').removeClass('active');
	$(e.target).addClass('active');

};


Music.prototype.frequenceRadio = function(attr, e) {
	e.preventDefault();

	// Moove cursor on the left
	var currentValue = parseInt(this.radio.cursor.css('right')),
			currentFrequence = parseFloat(this.radio.frequence.html());
	
	if(attr == "prev") {
		if(currentValue < 328) {
			this.radio.cursor.css('right', currentValue+10+'px');	
			this.radio.frequence.html(currentFrequence - 0.5);
		}
	}

	if(attr == "next") {

		if(currentValue > -22) {
			this.radio.cursor.css('right', currentValue-10+'px');	
			this.radio.frequence.html(currentFrequence + 0.5);
		}
	}

};

/*
* @Action : Handle panel switching in music 
*	@Param : e
*
*/ 

Music.prototype.navMenu = function(e) {
	e.preventDefault();
	e.stopPropagation();

	var clickedItem = $(e.target).parent().attr('href');

	var panelId = this.selectPanel(clickedItem);

	if(panelId) {
		this.musicPlayer.find('.main').removeClass('show');
		this.musicPlayer.find('#'+panelId+'').addClass('show');

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

Music.prototype.selectPanel = function(elem) {

	switch(elem) {
		case 'item-1':
			return 'main-radio';
			break; 
		case 'item-2' :
			return 'main-internet';
			break;
		case 'item-3' :
			return 'main-my-music';
			break;
		case 'item-4' :
			return 'main-favorite';
			break;
		case 'item-5' :
			return 'main-playlist';
			break;
		case 'item-6' :
			return 'main-history';
			break;
		default: 
			return false;
	}

}