$(document).ready(function() {
	var app = new App();
});

var App = function() {

	particlesJS.load('particles-js', 'assets/particles.json', function() {
		console.log('= PARTICLES DONE =');
	});

	this.tpl = templates;
	this.widget = {};
	this.boxes = $('.box');

	// Bind cards
	this.divHeader = $('#header');
	this.divMusic = $('#music');
	this.divMusicMin = $('#music-min');

	this.divGps = $('#gps-min');
	this.divPhone = $('#phone-min');
	this.divBrowser = $('#browser-min');
	this.divEnergy = $('#energy-min');
	this.divFooter = $('#footer-min');

	this.bind();

	this.init();
};

// App initialization
App.prototype.init = function() {

	console.log('= INIT =');

	this.loadTemplates();
	this.loadDraggable();

	console.log('= INIT DONE =');

	// Initialise new classes / Call js for each widget
	
	this.widget.music = new Music(); 

};


// Bind buttons/events
App.prototype.bind = function() {
	var that = this;
	this.boxes.on('addDropped', function() {
		that.swapTiles($(this), $('.main-active'));
	});
	this.boxes.on('removeDropped', function() {
		console.log('deswap');
	});
};

// Load HBS templates
App.prototype.loadTemplates = function() {

	console.log('= LOADING TEMPLATES =');

	this.divHeader.append(this.tpl.header);

	this.divMusic.append(this.tpl.music);
	this.divMusicMin.append(this.tpl.musicMin);
	this.divGps.append(this.tpl.gps);
	this.divPhone.append(this.tpl.phone);
	this.divBrowser.append(this.tpl.browser);
	this.divEnergy.append(this.tpl.energy);
	this.divFooter.append(this.tpl.footer);

	console.log('= TEMPLATES DONE =');
};

// Load TweenMax Draggable
App.prototype.loadDraggable = function() {

	console.log('= LOADING DRAGGABLE =');

	var droppables = $(".box");
	var dropArea = $("#prm-tile");
	var dropSecond = $("#snd-tile");
	var droppablesDropped = $('.dropped');

	var overlapThreshold = "80%";
	var posX, posY;

	var mainDrag = Draggable.create(droppables, {
		bounds: window,
		onPress: function () {
			this.startX = 0;
			this.startY = 0;
			$(this.target).css('transform', 'translate3d(0px, 0, 0px)');
			if ($(this.target).hasClass('dropped')) {
				this.startX = posX;
				this.startY = posY;
				$(this.target).addClass('highlight');
			}
		},
		onDrag: function (e) {
			if (this.hitTest(dropArea, overlapThreshold)) {
				$(this.target).addClass("highlight");
			} else {
				$(this.target).removeClass("highlight");
			}
			if ($(this.target).hasClass('dropped')) {
				if (!this.hitTest(dropArea, overlapThreshold)) {
					$(this.target).addClass('deleteSample');
				} else {
					$(this.target).removeClass('deleteSample');
				}
			}
		},
		onDragEnd: function (e) {
			if (!$(this.target).hasClass("highlight")) {
				if ($(this.target).hasClass('dropped')) {
					$(this.target).removeClass('dropped').trigger('removeDropped');
				}
				$(this.target).removeClass('deleteSample');
				TweenLite.to(this.target, 0.2, {
					x: this.startX,
					y: this.startY
				})
			} else {
				posX = this.startX;
				posY = this.startY;
				$(this.target).removeClass("highlight");
				$(this.target).addClass('dropped').trigger('addDropped');
				$(this.target).removeClass('deleteSample');
			}
		}
	});

	console.log('= DRAGGABLE DONE =');

};

// Swapping tiles
App.prototype.swapTiles = function($min, $max) {
	var maxTileId = $max.attr('id');
	$('#' + maxTileId + '-min').css('transform', 'translate3d(0px, 0, 0px)');

	// Swap big tile
	var getBig= $min.attr('id').substr(0, $min.attr('id').indexOf('-'));
	getBig = '#' + getBig;
	$($max).fadeOut('fast');
	$($max).removeClass('main-active').addClass('not-active');
	$(getBig).fadeIn('fast');
	$(getBig).removeClass('not-active').addClass('main-active');

	// Hide actual min tile
	$($min).fadeOut('fast');

	// Fetch and display right content in the empty small slot
	var emptySlot = $min.parent().data('id');
	$('#' + maxTileId + '-min').appendTo($('.' + emptySlot));
	$('#' + maxTileId + '-min').css('display', 'block');

	// Move the ancient small slot (so the actual big one) to the snd-hidden
	$min.appendTo($('.snd-hidden'));
};