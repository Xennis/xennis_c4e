/*
 * @author       Fabian Rosenthal
 * @website      http://xennis.de
 * @design       xennis_c4e
 * @copyright    Copyright (C) 2011 Fabian Rosenthal
 */
function showArticle(article) {
	changeZindex(article);
	$(article + ":hidden").show("fold", "slow");
}

var zIndex = 3;
function changeZindex(article) {
	$(article).css({
		"opacity": "0.9",
		"z-index": zIndex++
	});
	$("article:visible").not(article).fadeTo("slow", "0.35");
}

$(document).ready(function(){

	$("header nav").hide();
	$("#style menu").hide();
	$("article").hide();

	/* #################### plugins #################### */

	/* -------------------- fullscreen background -------------------- */
	jQuery.fn.fullscreenr({width: 1680, height: 1080, bgID: "#backgroundImage img"});

	/* -------------------- zoom -------------------- */
    $("#wrap").anythingZoomer({
        expansionSize: 30,
        speedMultiplier: 1.7  	
    });

	/* #################### menu / style #################### */
	var semaphorNav = "0";
	var semaphorStyle = "0";

	$(document).mousemove(function(e){
		// show menu
		if(e.pageY < "70") {
			if($("header nav").is(":hidden") && semaphorNav == "0") {
				$("header nav").show("bounce", "fast");
			}
		} else {
			// hide menu
			if(!$("header nav").is(":hidden") && semaphorNav == "0") {
				semaphorNav = "1";				
				$("header nav").hide("normal", function() {
					semaphorNav = "0";
				});
			}
			
			// show style
			if(e.pageX > $(window).width() - 100) {
				if($("#style menu").is(":hidden") && semaphorStyle == "0") {
					$("#style menu").show("slow");
				}
			// hide style
			} else {
				if(!$("#style menu").is(":hidden") && semaphorStyle == "0") {
					semaphorStyle = "1";
					$("#style menu").hide("slow", function() {
						semaphorStyle = "0";
					});
				}
			}
		}
	});

	/* #################### menu #################### */

	/* -------------------- animation -------------------- */
	$("header nav li a").wrapInner( '<span class="out"></span>' );
			
	$("header nav li a").each(function() {
		$( '<span class="over">' +  $(this).text() + '</span>' ).appendTo( this );
	});

	$("header nav li a").hover(function() {
		$(".out",	this).stop().animate({'top':	'45px'},	200); // move down - hide
		$(".over",	this).stop().animate({'top':	'0px'},		200); // move down - show
	}, function() {
		$(".out",	this).stop().animate({'top':	'0px'},		200); // move up - show
		$(".over",	this).stop().animate({'top':	'-45px'},	200); // move up - hide
	});

	/* #################### style #################### */

	/* -------------------- positon -------------------- */
	function changePostionTop() {
		var tempTop = $(window).height() / 2 - 140;
		if(tempTop < 55) {
			tempTop = 55;	
		}
		$("#style").css({top: tempTop});
	}

	changePostionTop();
	
	$(window).resize(function() {
		changePostionTop();
	});

	/* -------------------- change color -------------------- */
	var tempColor = $("header").css("backgroundColor");

	$("#style #color1, #style #color2, #style #color3, #style #color4").hover(function(){
		changeColor(this);
	});
	
	function changeColor(selector) {
		color = $(selector).css("backgroundColor");
		if(color != tempColor) {
			tempColor = color;
			$("article a").css({"color": color});
			$("header").css({"backgroundColor": color});
			$("article h1, footer ul li, form input[type=text], form input[type=email], form input[type=url], form textarea").css({"borderColor": color});
		}
	}

	/* -------------------- change background -------------------- */
	var tempBackground = "";

	$("#style #image1").hover(function(){
		changeBackground("1", "Dietmar Meinert", "3");
	});
	$("#style #image2").hover(function(){
		changeBackground("2", "www.mx-harz.de", "2");
	});
	$("#style #image3").hover(function(){
		changeBackground("3", "Robert Babiak jun.", "2");
	});
	$("#style #image4").hover(function(){
		changeBackground("4", "Werner B.", "1");
	});

	function changeBackground(background, photographer, color) {
		if(background != tempBackground) {
			tempBackground = background;
			$("#photographer").html(photographer);
			$("#backgroundImage img").attr("src", "images/background/image" + background + ".jpg");
			changeColor("#style #color" + color);
		}
	}

	/* #################### article #################### */

	function getArticle(selector) {
		return $(selector).parent().parent();
	}

	/* -------------------- drag / resize -------------------- */
	$("article").resizable({
			maxHeight: 800,
			maxWidth: 800,
			minHeight: 200,
			minWidth: 400
	}).draggable({
		opacity: "0.35",
		containment: "#articles",
		scroll: "false",
		cancel: "menu, li, .text"
	});
	
	/* -------------------- foreground -------------------- */
	var foregroundAll = "#home, #about, #designer, #work, #contacts";
	$(foregroundAll).click(function() {
		changeZindex(this);
	});

	/* -------------------- scroll -------------------- */
	var settings = {
		maintainPosition: false,
		autoReinitialise: true
	};
	var pane = $('.text');
	pane.jScrollPane(settings);
	var contentPane = pane.data('jsp').getContentPane();

	/* -------------------- close button -------------------- */
	var closeAll = "#closeHome, #closeAbout, #closeDesigner, #closeWork, #closeContacts";
	var originalOpacity = $("article").css("opacity");

	// click button
	$(closeAll).click(function(){
		getArticle(this).hide();
	});

	// hover button
	$(closeAll).hover(function() {
		getArticle(this).animate({opacity:"0.35"});
	}, function(){
		getArticle(this).animate({opacity: originalOpacity});
	});

	/* -------------------- size button -------------------- */
	var sizeAll = "#sizeHome, #sizeAbout, #sizeDesigner, #sizeWork, #sizeContacts";	
	var originalWidth = $("article").width();
	var originalHeight = $("article").height();

	// click button
	$(sizeAll).click(function(){
		// minimise window
		if(getArticle(this).height() > "50") {
			getArticle(this).animate({width:"200px", height:"50px"});
			$(this).attr({title:"Maximize"});
		// maximize window
		} else {
			getArticle(this).animate({width:originalWidth, height:originalHeight});
			$(this).attr({title:"Minimize"});
		}
	});
});