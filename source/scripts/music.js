var Music = function() {

	var that = this;

	this.musicPlayer = $('#music');
	this.menu = $('#music .nav-aside');
	this.menuItems = $("#global #prm-tile #music .content .nav-aside ul li");
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

	this.music = {
		controls: {
			prev: $('#main-music-player .next-prev span:first-child'),
			play: $('#main-music-player .next-prev .player'),
			next: $('#main-music-player .next-prev span:last-child')
		},
		bar: $('#main-music-player .frequence-bar .playing-progress')
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

	var song = new Audio('../assets/sounds/marvin_gaye.mp3');

	// Music player controls
	this.music.controls.prev.on('click', function(e) {
		e.preventDefault();

	});

	this.music.controls.play.on('click', function(e) {
		e.preventDefault();

		var progressMax = 300,
				trackLength = song.duration,
				currentTime = 0;

		console.log(trackLength);

		song.ontimeupdate = function() {

			if(song.currentTime == trackLength) {
				song.currentTime = 0;
			}

			var progress = (song.currentTime/trackLength*60);

			$('#main-music-player .frequence-bar .playing-progress').css('width',progress+"%");
		};

		if(!song.paused){

			$(this).find('img').attr('src', 'assets/icons/play-large.svg');
			song.pause();
		} else {

			$(this).find('img').attr('src', 'assets/icons/pause-large.svg');
			song.play();
		}
		
	});

	this.music.controls.next.on('click', function(e) {
		e.preventDefault();

	});
	
	// Drop down panel
	this.dropDown.on('click', $.proxy(this.openDropDown, this));

	// Slide in radio, favorites....
	this.musicSlides.items.on('click', $.proxy(this.slideContent, this));

	// Top nav bar
	this.navTop.items.on('click', $.proxy(this.changeMode, this));

	// Listen no click happenend since 10s on the music widget
	$('#music .main li').on('click', $.proxy(this.listenScroll, this));
};



Music.prototype.listenScroll = function(e) {
	e.preventDefault();

	console.log('Start listening');

	setTimeout(function() {
		$('#music .main').removeClass('show');
		$('#music .main').css('display','none');

		$('#music #main-music-player').addClass('show');
		$('#music #main-music-player').css('display', 'block');

		$('#music .right-list').removeClass('show');
		$('#music .right-list#fav-list').addClass('show');

		console.log('end timer');
	}, 10000);
	
};


Music.prototype.openDropDown = function(e) {
	e.preventDefault();

	$(e.target).toggleClass('active');
	this.musicPlayer.find('.drop-down').toggleClass('open');
	this.musicPlayer.find('.blur').toggleClass('show');

};

Music.prototype.changeMode = function(e) {
	e.preventDefault();

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

	if($(e.target).is('img')) {
		var clickedItemWaiting = $(e.target).parent();
	} else {
		var clickedItemWaiting = $(e.target);
	}

	var clickedItem = clickedItemWaiting.attr('href');

	var panelId = this.selectPanel(clickedItem);

	if(panelId) {

		if(panelId == "main-radio") {
			this.musicPlayer.find('.right-list').removeClass('show');
			this.musicPlayer.find('.right-list#fav-list').addClass('show');
		} else {
			this.musicPlayer.find('.right-list').removeClass('show');
			this.musicPlayer.find('.right-list#my-music-list').addClass('show');
		}

		this.musicPlayer.find('.main').removeClass('show');
		this.musicPlayer.find('.main').css('display','none');
		
		this.musicPlayer.find('#'+panelId+'').fadeIn();
		this.musicPlayer.find('#'+panelId+'').addClass('show');

		// Add active for selected panel icon
		this.menuItems.prev().removeClass('active');
		clickedItemWaiting.parent().addClass('active');
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
		case 'item-7' :
			return 'main-settings';
			break;
		default: 
			return false;
	}

}