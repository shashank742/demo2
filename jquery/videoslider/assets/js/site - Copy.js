var initialformHeight;
var formHeight;

var formFromTop;

var formtouchPoint;

var topStop;

var thisSearch;

var formbottomPadding;

var heightSubstract;

var agentdetailPaddingtop;

var clickEventResidential = ((document.ontouchstart !== null) ? 'change' : 'touchstart');

var clickEventglobal = ((document.ontouchstart !== null) ? 'mousedown' : 'touchstart');

var clickEventdetail = ((document.ontouchstart !== null) ? 'mousedown' : 'touchend');

var myslider;

var holyagentTop;
var htopStop;
var hprojectDetail;

var tagsIpScroll;

$(document).ready(function() {
	if ($('.holyday-start').length > 0) {
		var hti = setTimeout(function() {
			clickHolyday = parseInt($('.holyday-start').offset().top);
			holyagentTop = parseInt($('.holyday-start').offset().top) - parseInt($('#header').outerHeight());
			htopStop = $('#header').outerHeight();
			hlistSaleOffset = $('.list-for-sale').offset().top;

		}, 300)

	}

	var stio = setTimeout(function() {

		if ($('.agent-start').length > 0) {

			formHeight = $('.agent-form-fixed').outerHeight();

			formFromTop = $('.project_deatil_right_inner').offset().top;

			formtouchPoint = formHeight + formFromTop;

			topStop = parseInt($('#header').outerHeight());

			formbottomPadding = ($('.agent-form-fixed').outerHeight() - $('.agent-form-fixed').height()) / 2;

			//console.log($('.agent_form').css("padding-bottom"));

			heightSubstract = formbottomPadding + $('.agent_form .contact_btn').outerHeight();

			agentdetailPaddingtop = $('.agent_details').css("padding-top");

			//console.log(formHeight, formFromTop, formtouchPoint, topStop, formbottomPadding, heightSubstract, agentdetailPaddingtop)
		}
	}, 500)
	//2_08_2017
	var datepickeranytimebool = true;
	var fadeBool = false;
	var clickbool = false;
	var setFocusOut;
	
	var barOffset = ""
	try {
		barOffset = $('.agent-form-fixed .contact_btn').offset().top - ($('.search-bar-container').height() + $('header').height());
		//console.log($('.agent-form-fixed .contact_btn').offset().top, $('header').height())
		barOffset = $('.agent-form-fixed .contact_btn').offset().top + $('header').height();
	} catch (error) {

	}
	try {
		var barOffset_sec = $('.agent_form-hd-fixed h2').offset().top - ($('.search-bar-container').height() + $('header').height());
	} catch (error) {

	}
	myslider = $('.home-slider .bxslider').bxSlider({
		mode : 'fade',
		speed : 500,
		auto : 'true',
		easing : 'ease-out-in'

	});
	$(document).keydown(function(e) {
		if ($('.home-slider .bxslider').height() > $(window).scrollTop() + $('header').height() + $('.search-tab.tab-container').height()) {
			if (e.which == 39) {
				if ($(myslider).length > 0)
					myslider.goToNextSlide();
			} else if (e.which == 37) {
				if ($(myslider).length > 0)
					myslider.goToPrevSlide();
			}
			// return false;
		}
		//e.preventDefault();
		// prevent the default action (scroll / move caret)
	});
	$('.sale-slider .bxslider').bxSlider({
		minSlides : 1,
		maxSlides : 3,
		moveSlides : 3,
		slideWidth : 400
	});

	//Anoop 01_08_2017

	$('.sale-slider .bx2slider').bxSlider({
		minSlides : 1,
		maxSlides : 4,
		moveSlides : 4,
		slideWidth : 135
	});

	try {

		$('.flexslider-product').flexslider({
			animation : "slide",

			start : function() {
				// barOffset = $('.agent-form-fixed .contact_btn').offset().top - ($('.search-bar-container').height() + $('header').height());
				// barOffset_sec = $('.agent_form-hd-fixed h2').offset().top - ($('.search-bar-container').height() + $('header').height());

				//offset of agent_form-hd-fixed in holyday.html page
			}
		});

	} catch (err) {
		//console.log("flex is not applicable")
	}

	$('.promo-content .slider').bxSlider({
		mode : 'fade',
		auto : 'true',
		onSlideAfter : function($slideElement, oldIndex, newIndex) {
			$('.parallex-box').fadeOut("slow", "linear", function() {
				$('.parallex-box').css("background-image", "url(" + $slideElement.find("img").attr("src") + ")").fadeIn();
			})
		}
	});

	//28_7_17
	try {
		$users_list = $('#users_list03, #users_list04, #users_list05');
		$users_list.multiselect({
			listWidth : 400,
			addActionBox : false,
			addSearchBox : false
		});
	} catch (err) {

	}
	$("#submit_data").click(function(e) {
		var fields = $(":input").serializeArray();
		$("#results").empty().append(JSON.stringify(fields, null, "\t"));
	});

	if ($(window).width() < 768) {
		$(".mobile-search-row ul").click(function() {
			$(".search-content").addClass('open');
			$("#header").addClass('hide');
		});

		$(".search-content .close").click(function() {
			$(".search-content").removeClass('open');
			$("#header").removeClass('hide');
		});

	}

	$(".home-slider .caption-box .detail-box .top-row").on(clickEventdetail, function() {
		if ($(myslider).length > 0)
			myslider.startAuto();
		$(".home-slider .caption-box .detail-box").slideUp(400);
		$('#header').removeClass("hide-head");

		if ($(window).width() > 767) {
			$(".home-content .search-content").fadeIn(500);
		}
		if ($(window).width() < 768) {
			$(".home-content .mobile-search-row").fadeIn(600);
		}
	});

	//Display and Hide the search-content

	$(".main-menu").hover(function() {
		if ($(window).width() > 767) {
			$(this).toggleClass("new-animat");
			$(this).find('.nav-content').css("display", "block");
			$('#header .logo').addClass('active');
		}

	});

	$(".main-menu").mouseleave(function() {
		if ($(window).width() > 767) {
			$('#header .logo').removeClass('active');
		}
	});

	$("body").on(clickEventdetail, function() {
		if ($(myslider).length > 0)
			myslider.startAuto();

		if ($(window).width() > 767 && $(".home-content .search-content").css('display') == "none") {
			$(".home-content .search-content").fadeIn(500);
			$(".home-slider .caption-box .detail-box").slideUp(400);
		}

		if ($(window).width() < 768) {
			$(".home-content .mobile-search-row").fadeIn(500);
			if ($('#header').hasClass("hide-head"))
				;
			$('#header').removeClass("hide-head");
			$(".home-slider .caption-box .detail-box").slideUp(400);
		}
	})

	$('body').on(clickEventdetail, ".caption-box", function(ev) {
		ev.stopPropagation()
	})

	$(".caption-box .detail-row").on(clickEventdetail, function(ev) {
		if ($(myslider).length > 0)
			myslider.stopAuto();
		$('.mobile-search-row').fadeOut(300);
		$(".home-slider .caption-box .detail-box").slideDown();
		if ($(".home-content .search-content").css('display') == "block") {
			$(".home-content .search-content").fadeOut();
		}
		if ($(window).width() > 767) {
			clickbool = true;
		}

		if ($(window).width() < 768) {
			$('#header').addClass("hide-head");
		}

	});

	//21_july_2017

	$(".middle-row .wishlist").click(function() {
		$(this).toggleClass("active");
	});
	$(".common-box .box .img-box .wishlist").click(function() {
		$(this).toggleClass("active");
	});

	$(".location-popup .cross").click(function() {
		$(".location-popup").hide();
	});

	if ($('#back-to-top').length) {
		var scrollTrigger = 250, // px
		backToTop = function() {
			var scrollTop = $(window).scrollTop();
			if (scrollTop > scrollTrigger) {
				$('#back-to-top').addClass('show');
			} else {
				$('#back-to-top').removeClass('show');
			}
		};
		backToTop();
		$(window).on('scroll', function() {
			backToTop();
		});
		$('#back-to-top').on('click', function(e) {
			e.preventDefault();
			$('html,body').animate({
				scrollTop : 0
			}, 700);
		});
	}
	$(".dropdown-row.guests").on("click", function() {
		openguest = !openguest;
	});
	$('.go-next').click(function() {
		var selected_tab;
		var thiss = $(this);
		$('html, body').animate({
			scrollTop : $('.list-for-sale').offset().top - 65
		}, 700);
	});

	// to handle scroll of filter
	var topupdate;

	$(window).on('scroll', function() {

		var topThis = $('.search-tab.tab-container').css("top");

		//console.log(topThis, "  ==  ", topupdate)
		if (topThis != topupdate) {
			//console.log("leftThis", topThis)
			$(".search-tab .tab-content .select-filter .residentialProject .dropdown-box.clearfix").css("display", "none");
			$(".search-tab .tab-content .select-filter .residentialProject>.dropdown-row").removeClass("open");

		}

		// to add a fix class to date picker;

		//console.log("hii", topThis, topupdate);

		if (topThis > topupdate) {
			$('.daterangepicker').addClass('fix-datepicker');
			$(".search-row-fields.holidays").children('.guests').removeClass("open").find('.dropdown-box').hide();
		} else if (topThis < topupdate) {
			$('.daterangepicker').removeClass('fix-datepicker');
			$(".search-row-fields.holidays").children('.guests').removeClass("open").find('.dropdown-box').hide();
		}

		//

		topupdate = topThis

	})
	// 01_08_2017
	// Fixed the search-content on window scrolling
	try {
		if ($(window).width() > 767) {

			var navOffset = $(".search-tab").offset().top - ($('header').height());
			var Offset = $("#main-wrapper .list-for-sale").offset().top - ($('.search-tab.tab-container').height() - $('.primary-header').height());
			$(window).bind('scroll', function() {
				//console.log("jjj kkk")
				if ($(window).scrollTop() > navOffset) {
					//console.log("if")
					$('#header').addClass('fix');
					$('#main-wrapper').addClass('fix-row');

					$(".search-row-fields").removeClass("slideOpen");
					$(".search-row-fields.holidays").children('.guests').removeClass("open").find('.dropdown-box').hide();
					$(".search-row").removeClass("active");
					$(".home-content .search-content h1").css("display", "none");

					//$(".search-tab .tab-content .select-filter .residentialProject .dropdown-box.clearfix").css("display", "none");

					var topThis = $('.search-tab.tab-container').css("top");
					//console.log("leftThis", topThis)

					//$(".search-tab .tab-content .select-filter .residentialProject .increase-num-wrap").removeClass("open");

					//$(".home-content .search-content").fadeIn(500)

					//$('.detail-box').slideUp(300);
					fadeBool = true;
					if (input_click_bool) {
						$(".search-row-fields").addClass("slideOpen");

					}
					if (openguest) {
						$(".search-row-fields.holidays").children('.guests').addClass("open").find('.dropdown-box').show();
					}
					// if($(".tab-1").find(".search-row.active")){
					// //alert(1)
					// $(".search-row-fields").addClass("slideOpen");
					// }

				} else {
					input_click_bool = false;
					openguest = false;
					fadeBool = false;
					$('#header').removeClass('fix');
					$('#main-wrapper').removeClass('fix-row');
					$(".home-content .search-content h1").css("display", "block");
					$(".tab-content").find(".sbOptions").css("display", "none");
					$(".tab-content").find(".sbToggle").removeClass("sbToggleOpen");
					//console.log(clickbool);
					if (clickbool && $(".search-content")[0].style.display != "none") {
						//$(".home-slider .detail-box").slideUp();
					}
				}

				if ($(window).scrollTop() > Offset) {

					//$(".home-content .search-content ").fadeIn();
					//$(".home-slider .detail-box").slideUp();
					//  $(".home-content .search-content h1").css("display","block");
				}

			});
		}
	} catch (err) {

	}

	// detail box mobile view //

	//mCustomScrollbar plugin calling

	$(".horizontal-scroll-content").mCustomScrollbar({
		horizontalScroll : true,
		// mouseWheelPixels: 500,
		// scrollInertia: 0,

		advanced : {
			autoExpandHorizontalScroll : true
		}
	});

	$(".language-CustomScrollbar").mCustomScrollbar({
		scrollInertia : 0,
		//autoDraggerLength: false,
		mouseWheel : {
			preventDefault : true
		},
		mouseWheelPixels : 18,
		scrollButtons : {
			enable : true
		}
	});

	//plugin for scrollbar on search box

	//Anoop 01_08_2017

	// $(".dropdown-row .dropdown-box").mCustomScrollbar({
	// scrollButtons : {
	// enable : true
	// }
	// });

	//Anoop 01_08_2017

	//Anoop 01_08_2017

	$(".price_list").mCustomScrollbar({
		scrollInertia : 0,
		// autoDraggerLength: false,
		mouseWheel : {
			preve