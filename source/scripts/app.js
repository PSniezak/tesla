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
	this.divWarning = $('#warning');

	this.bind();

	this.init();
};

// App initialization
App.prototype.init = function() {

	console.log('= INIT =');

	var audioBG = new Audio('assets/sounds/bg-main.mp3');
	audioBG.play();

	setTimeout(function() {
		var vol = 1;
		var interval = 50;

		var fadeout = setInterval(
			function() {
				if (vol >= 0) {
					vol -= 0.05;
					audioBG.volume = vol;
				}
				else {
					clearInterval(fadeout);
					audioBG.pause();
				}
			}, interval);
	}, 5600);

	this.loader();
	this.loadTemplates();
	this.loadDraggable();
	//this.loadSortable();

	console.log('= INIT DONE =');

	$(window).load(function(){
		setTimeout(function() {
			$('#borders').fadeIn('slow');
			$('#global').fadeIn('slow');
		}, 5600); //5600
	});

	// Initialise new classes / Call js for each widget
	
	this.widget.music = new Music(); 
	this.widget.gps = new Gps();
	this.widget.phone = new Phone();
	this.widget.footer = new Footer();

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

	$(document).keydown(function(e) {
		if (e.keyCode == 87) {
			var audioInit = new Audio('assets/sounds/collision.mp3');
			audioInit.play();
			$('.shadowing').fadeIn('fast');
		}
	});

	$(window).on('click-input', function() {
		$('#gif-browser').fadeIn('fast');

		setTimeout(function() {
			$('#gif-browser > video').get(0).play();

			$('#gif-browser > video').on('ended', function() {
				$('#input-browser').val('HTTP://EN.WIKIPEDIA.ORG/WIKI/NEM');
				$('.browser-list').css('display', 'none');
				$('#search-done').css('display', 'block');
				$('#gif-browser').fadeOut('fast');
			});
		}, 400);
	});

	$(window).on('search-gps', function() {
		$('#gif-gps').fadeIn('fast');

		setTimeout(function() {
			$('#gif-gps > video').get(0).play();

			$('#gif-gps > video').on('ended', function() {
				var audioGPS = new Audio('assets/sounds/targetgps.mp3');
				audioGPS.play();

				$('#gps-min .bg').attr('src', 'assets/images/map-min.png');
				$('#gps .bg').attr('src', 'assets/images/map.png');

				$('.nav-informations img').show();
				$('.nav-informations p').show();
				$('#gif-gps').fadeOut('fast');
			});
		}, 400);
	});

	$()

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
	this.divWarning.append(this.tpl.warning);

	console.log('= TEMPLATES DONE =');
};

// Load TweenMax Draggable
App.prototype.loadDraggable = function() {

	console.log('= LOADING DRAGGABLE =');

	var droppables = $(".box");
	var dropArea = $("#prm-tile");
	var dropSecond = $(".snd");
	var droppablesDropped = $('.dropped');

	var overlapThreshold = "80%";
	var overlapThresholdBoxes = "50%";
	var posX, posY;

	var mainDrag = Draggable.create(droppables, {
		bounds: window,
		onDrag: function (e) {
			$(this.target).trigger('dragging');
			this.startX = 0;
			this.startY = 0;
			if ($(this.target).hasClass('dropped')) {
				this.startX = posX;
				this.startY = posY;
				$(this.target).addClass('highlight');
			}

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
		$(getBig).fadeIn('slow');
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
	$maxTileIdMin.fadeIn('slow');

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
};

// Highlight both the dragged tile and the main container to prepare dropped
App.prototype.prepareDrop = function($tile, $main) {
	$('#overlay-main').css('display', 'block');
	$('#overlay-main').css('opacity', 1);
};

// Loader
App.prototype.loader = function() {
	// Percentage Increment Animation
	//setTimeout(function() {
	//	$('#loading-percent').fadeIn('fast', function() {
	//		setTimeout(function() {
	//			var PercentageID = $("#loading-percent"),
	//				start = 1,
	//				end = 100,
	//				durataion = 2000;
	//			animateValue(PercentageID, start, end, durataion);
    //
	//			function animateValue(id, start, end, duration) {
    //
	//				var range = end - start,
	//					current = start,
	//					increment = end > start? 1 : -1,
	//					stepTime = Math.abs(Math.floor(duration / range)),
	//					obj = $(id);
    //
	//				var timer = setInterval(function() {
	//					current += increment;
	//					$(obj).text(current + "%");
	//					//obj.innerHTML = current;
	//					if (current == end) {
	//						clearInterval(timer);
	//					}
	//				}, stepTime);
	//			}
    //
	//			setTimeout(function() {
	//				$('#loading').fadeOut('slow');
	//			}, 2000);
	//		}, 100);
	//	});
	//}, 1600);

	setTimeout(function(){
		$("#loading-content").shuffleLetters({
			"text": 'INITIALIAZING'
		});

		setTimeout(function() {
			var audioInit = new Audio('assets/sounds/initializing.mp3');
			audioInit.play();
		}, 800);

		setTimeout(function(){

			// Shuffle the container with custom text
			$("#loading-content").shuffleLetters({
				"text": 'TARS IS REBOOTING'
			});

			setTimeout(function() {
				var audioInit = new Audio('assets/sounds/rebooting.mp3');
				audioInit.play();
			}, 800);

			setTimeout(function(){
				$("#loading-content").fadeOut();
				$('#loading').remove();

				setTimeout(function() {
					var audioInit = new Audio('assets/sounds/welcome.mp3');
					audioInit.play();
				}, 400);
			},2600);
		},2300);
	},600);
};

//App.prototype.loadSortable = function() {
//	console.log('= LOADING SORTABLE =');
//	$('.sortable-container').sortable({
//
//		// axis: x or y
//		axis: 'x',
//
//		// container
//		containment: 'parent',
//
//		// animation speed
//		animation: 150,
//	});
//	console.log('= SORTABLE DONE =');
//};