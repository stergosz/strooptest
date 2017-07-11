(function ($, window, document, undefined) {
    'use strict';

    var test_trials = 0,
    	test_errors = 0,
    	interval = 2200,
    	startTime = 0,
    	foundColor = false;

    var dom_test_trials = $(".test_trials"),
    	dom_test_errors = $(".test_errors"),
    	progress_bar = $("#progress_bar .progress-bar"),
    	guess_word = $("#guess_word"),
    	_timer = $(".timer");



    dom_test_trials.html(test_trials);
    dom_test_errors.html(test_errors);

    function getRandomNumber(max) {
    	var min = 1;
	    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	function getColor(rand){
		var color = '';

		if (rand == 1){
			color = 'red';
		}else if (rand == 2){
			color = 'orange';
		}else if (rand == 3){
			color = 'yellow';
		}else if (rand == 4){
			color = 'green';
		}else if (rand == 5){
			color = 'blue';
		}else if (rand == 6){
			color = 'purple';
		}

		return color;
	}

	function getColorByKeyCode(rand){
		var color = '';

		if (rand == 82){
			color = 'red';
		}else if (rand == 79){
			color = 'orange';
		}else if (rand == 89){
			color = 'yellow';
		}else if (rand == 71){
			color = 'green';
		}else if (rand == 66){
			color = 'blue';
		}else if (rand == 80){
			color = 'purple';
		}

		return color;
	}

	
	function getClassColorByName(color_name){
		var color = '';

		if (color_name == 'red'){
			color = 'c1';
		}else if (color_name == 'orange'){
			color = 'c2';
		}else if (color_name == 'yellow'){
			color = 'c3';
		}else if (color_name == 'green'){
			color = 'c4';
		}else if (color_name == 'blue'){
			color = 'c5';
		}else if (color_name == 'purple'){
			color = 'c6';
		}

		return color;
	}



	var timer = null;
	var running = false;

	var timerInterval = null;

    function tick() {
    	console.log("inside");

        start();
    };

    function start() {
    	foundColor = false;
    	//startProgressBar();
    	restartprogressBar();

		var rand = getRandomNumber(6);
		var rand2 = getRandomNumber(6);
		var color = getColor(rand);
		console.log("next color: " + color + " at time : " + _timer.html());
		guess_word.html(color);
		guess_word.removeClass("c1 c2 c3 c4 c5 c6");
		guess_word.addClass("c" + rand2);
		guess_word.attr("data-bg-color", "c" + rand2);

        timer = setTimeout(tick, interval);
    	// restartprogressBar();
    	// restartprogressBar();
    	//stopProgressBar();
    };

    function stop() {
    	console.log("stopped");
		//stopProgressBar();
		stopProgressBar();

		guess_word.html("");
		// _timer.html("0.000 s");

        clearTimeout(timer);
    };

    function startProgressBar(){
    	progress_bar.css({
    		width: "100%"
    	}, interval);
    	progress_bar
    }

    function stopProgressBar(){
    	progress_bar.removeClass('animation');
    }

    function restartprogressBar() {
	    progress_bar.removeClass('animation');
	    progress_bar.width('100%');
	    progress_bar.addClass('animation');
	};

	$('#start_test').on("click", function(){

		if (running)
			return false;

		startTime = Date.now();

    	timerInterval = setInterval(function() {
		    var elapsedTime = Date.now() - startTime;
		    _timer.html((elapsedTime / 1000).toFixed(3));
		}, 100);

		$(this).addClass("disabled");
		$("#end_test").removeClass("disabled");

    	running = true;
		start();

		return false;
	});

	$('#end_test').on("click", function(){
		if (!running)
			return false;

		running = false;
		clearInterval(timerInterval);

		$(this).addClass("disabled");
		$("#start_test").removeClass("disabled");
		stop();

		guess_word.html("CLICK START TEST");
		guess_word.removeClass("c1 c2 c3 c4 c5 c6");

		return false;
	});

/*	$(".answers .answer").on("click", function(){
		if (!running)
			return false;

		if (foundColor)
			return false;


		var answer = $(this).attr("data-answer");
		var ClassColorByName = getClassColorByName(answer);

		var guess_word_bg_color = guess_word.attr("data-bg-color");

		if (guess_word_bg_color == ClassColorByName){
			dom_test_trials.html(parseInt(dom_test_trials.html(), 10)+1);
			foundColor = true;
			guess_word.removeClass("incorrect_val");
			guess_word.addClass("correct_val");
		}else{
			dom_test_errors.html(parseInt(dom_test_errors.html(), 10)+1);
			guess_word.removeClass("correct_val");
			guess_word.addClass("incorrect_val");
		}
		stop();
		start();

	});*/

	$(document).keydown(function(e) {
		var x = e.keyCode;
		var tag = e.target.tagName.toLowerCase();
		if (tag == 'input'){
			return;
		}
		if(x == 82 || x == 79 || x == 89 || x == 71 || x == 66 || x == 80) {
			if (!running)
			return false;

			if (foundColor)
				return false;


			var answer = getColorByKeyCode(x);
			var ClassColorByName = getClassColorByName(answer);

			var guess_word_bg_color = guess_word.attr("data-bg-color");

			if (guess_word_bg_color == ClassColorByName){
				dom_test_trials.html(parseInt(dom_test_trials.html(), 10)+1);
				foundColor = true;
				guess_word.removeClass("incorrect_val");
				guess_word.addClass("correct_val");
			}else{
				dom_test_errors.html(parseInt(dom_test_errors.html(), 10)+1);
				guess_word.removeClass("correct_val");
				guess_word.addClass("incorrect_val");
			}
			stop();
			start();
		}
		e.preventDefault();
	});

	$(".delay_save_btn").on("click", function(){

		var delay = $(this).prev().val();

		$(".animation").css("animation-duration", delay+"ms");
		interval = delay;

		return false;
	});

})(jQuery, window, document);