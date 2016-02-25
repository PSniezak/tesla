var Footer = function() {

	var that = this;

	this.footer = $('#footer');
	this.footer.controls = {
		plus: this.footer.find('.plus'),
		less: this.footer.find('.less')
	};



	$('.slider-input').on('change input', function() {

		var context = $(this).parent().parent(),
				sliderFill = $(this).parent().find('.slider-track .slider-level'),
				sliderRound = $(this).parent().find('.slider-track .slider-thumb'),
				variable = $(this).parent().find('.slider-output');

		if(context.attr('class') == 'sound'){
			variable.html("VOL "+Math.round((this.value)));
			sliderRound.css('left',(this.value)*3.1+"%");
			sliderFill.css('width',(this.value)*3.1+"%");
		} else {

			variable.html(this.value+"°F");
			sliderRound.css('left',this.value+"%");
			sliderFill.css('width',this.value+"%");
		}

  });
	

	this.init();
}

Footer.prototype.init = function() {
	
	this.bind();
};

Footer.prototype.bind = function() {
	
	this.footer.controls.plus.on('click', $.proxy(this.up, this));
	this.footer.controls.less.on('click', $.proxy(this.down, this));

	var count = 0,
			count2 = 0;

	$('#footer .seat1').on('click', function(e) {
		e.preventDefault();

		count++;

		if(count < 4) {
			$(this).parent().find('.seat-' + count).css('background-color', 'rgba(249, 249, 249, 0.8)');
		} else {
			count = 0;
			$(this).siblings('.seats').css('background-color', 'rgba(249, 249, 249, 0)');
		}

	});

	$('#footer .seat2').on('click', function(e) {
		e.preventDefault();

		count2++;

		if(count2 < 4) {
			$(this).parent().find('.seat-' + count2).css('background-color', 'rgba(249, 249, 249, 0.8)');
		} else {
			count2 = 0;
			$(this).siblings('.seats').css('background-color', 'rgba(249, 249, 249, 0)');
		}

	});

};


Footer.prototype.up = function(e) {
	e.preventDefault();


	var context = $(e.target).parent(),
				sliderFill = $(e.target).parent().find('.slider-track .slider-level'),
				sliderRound = $(e.target).parent().find('.slider-track .slider-thumb'),
				variable = $(e.target).parent().find('.slider-output');

	if($(e.target).parent().attr('class') == 'sound') {
		var input = $(e.target).parent().find('.slider-input'),
				value = input.val();

		input.get(0).stepUp();

		variable.html("VOL "+input.val());
		sliderRound.css('left',(value)*3.1+"%");
		sliderFill.css('width',(value)*3.1+"%");
	} else {
		
		var input = $(e.target).parent().find('.slider-input'),
				value = input.val();

		input.get(0).stepUp();

		variable.html(input.val()+"°F");
		sliderRound.css('left',input.val()+"%");
		sliderFill.css('width',input.val()+"%");
	}
	 
};

Footer.prototype.down = function(e) {
	e.preventDefault();

	var context = $(e.target).parent(),
				sliderFill = $(e.target).parent().find('.slider-track .slider-level'),
				sliderRound = $(e.target).parent().find('.slider-track .slider-thumb'),
				variable = $(e.target).parent().find('.slider-output');

	if($(e.target).parent().attr('class') == 'sound') {
		var input = $(e.target).parent().find('.slider-input'),
				value = input.val();

		input.get(0).stepDown();

		variable.html("VOL "+input.val());
		sliderRound.css('left',(value)*3.1+"%");
		sliderFill.css('width',(value)*3.1+"%");
	} else {
		var input = $(e.target).parent().find('.slider-input'),
				value = input.val();

		input.get(0).stepDown();

		variable.html(input.val()+"°F");
		sliderRound.css('left',input.val()+"%");
		sliderFill.css('width',input.val()+"%");
	}
};