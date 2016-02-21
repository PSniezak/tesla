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

	this.divGps = $('#gps');
	this.divGpsMin = $('#gps-min');

	this.divPhone = $('#phone');
	this.divPhoneMin = $('#phone-min');

	this.divBrowser = $('#browser');
	this.divBrowserMin = $('#browser-min');

	this.divEnergy = $('#energy');
	this.divEnergyMin = $('#energy-min');

	this.divFooter = $('#footer');

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
	this.widget.gps = new Gps();

};


// Bind buttons/events
App.prototype.bind = function() {
	var that = this;

	this.boxes.on('addDropped', function() {
		that.swapTiles($(this), $('.main-active'));
	});

	this.boxes.on('dragging', function() {
		that.dragAnim($(this));
	});

	this.boxes.on('removeDragging', function() {
		that.dragAnimRemove($(this));
	});

	this.boxes.on('highlighted', function() {
		that.prepareDrop($(this), $('.main-active'));
	});

	//this.boxes.on('removeDropped', function() {
	//	console.log('deswap');
	//});
};

// Load HBS templates
App.prototype.loadTemplates = function() {

	console.log('= LOADING TEMPLATES =');

	this.divHeader.append(this.tpl.header);

	this.divMusic.append(this.tpl.music);
	this.divMusicMin.append(this.tpl.musicMin);

	this.divGps.append(this.tpl.gps);
	this.divGpsMin.append(this.tpl.gpsMin);

	this.divPhone.append(this.tpl.phone);
	this.divPhoneMin.append(this.tpl.phoneMin);

	this.divBrowser.append(this.tpl.browser);
	this.divBrowserMin.append(this.tpl.browserMin);

	this.divEnergy.append(this.tpl.energy);
	this.divEnergyMin.append(this.tpl.energyMin);

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
		onClick: function() {
			$(this.target).removeClass("highlight").trigger('removeDragging');
		},
		onPress: function () {
			$(this.target).trigger('dragging');
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
				$(this.target).addClass("highlight").trigger('highlighted');
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
			$(this.target).trigger('removeDragging');
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

				TweenLite.to(this.target, 0.2, {
					x: this.startX,
					y: this.startY
				})
				$(this.target).removeClass("highlight").trigger('removeDragging');
				$(this.target).addClass('dropped').trigger('addDropped');
				$(this.target).removeClass('deleteSample');
			}
		}
	});

	console.log('= DRAGGABLE DONE =');

};

// Swapping tiles
App.prototype.swapTiles = function($min, $max) {
	$('#overlay-main').css('opacity', 0);
	$('#overlay-main').css('display', 'none');

	var maxTileId = $max.attr('id');
	var $maxTileIdMin = $('#' + maxTileId + '-min');
	$maxTileIdMin.css('transform', 'translate3d(0px, 0, 0px)');

	// Swap big tile
	var getBig= $min.attr('id').substr(0, $min.attr('id').indexOf('-'));
	getBig = '#' + getBig;
	$($max).fadeOut('fast', function() {
		$(getBig).fadeIn('fast');
	});
	setTimeout(function() {
		$($max).removeClass('main-active').addClass('not-active');
		$(getBig).removeClass('not-active').addClass('main-active');
	}, 500);

	// Hide actual min tile
	$($min).fadeOut('fast');

	// Fetch and display right content in the empty small slot
	var emptySlot = $min.parent().data('id');
	$maxTileIdMin.appendTo($('.' + emptySlot));
	$maxTileIdMin.fadeIn('fast');

	// Move the ancient small slot (so the actual big one) to the snd-hidden
	$min.appendTo($('.snd-hidden'));
};

// Add a filter to the dragged element
App.prototype.dragAnim = function($tile) {
	var filterVal = 'blur(2px)';
	$tile.css('filter',filterVal).css('webkitFilter',filterVal);
};

// Remove the filter from a dragged element
App.prototype.dragAnimRemove = function($tile) {
	var filterVal = '';
	$tile.css('filter',filterVal).css('webkitFilter',filterVal);
	console.log('salut');
};

// Highlight both the dragged tile and the main container to prepare dropped
App.prototype.prepareDrop = function($tile, $main) {
	// Faire apparaitre une grosse div noir en overlay
	$('#overlay-main').css('display', 'block');
	$('#overlay-main').css('opacity', 1);
};