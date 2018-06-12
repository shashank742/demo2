$(document).ready(function() {
	//2_08_2017
	var datepickeranytimebool = true;
	var fadeBool = false;
	var clickbool = false;
	try {
		var barOffset = $('.agent-form-fixed .contact_btn').offset().top - ($('.search-bar-container').height() + $('header').height());
		console.log($('.agent-form-fixed .contact_btn').offset().top, $('header').height())
		barOffset = $('.agent-form-fixed .contact_btn').offset().top + $('header').height();
	} catch(error) {

	}
	try {
		var barOffset_sec = $('.agent_form-hd-fixed h2').offset().top - ($('.search-bar-container').height() + $('header').height());
	} catch(error) {

	}
	var myslider = $('.home-slider .bxslider').bxSlider({
		mode : 'fade',
		auto : 'true',
	});
	$(document).keydown(function(e) {
		if ($('.home-slider .bxslider').height() > $(window).scrollTop() + $('header').height() + $('.search-tab.tab-container').height()) {
			if (e.which == 39) {
				myslider.goToNextSlide();
			} else if (e.which == 37) {
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
		moveSlides : 3
	});

	//Anoop 01_08_2017

	$('.sale-slider .bx2slider').bxSlider({
		minSlides : 1,
		maxSlides : 4,
		moveSlides : 3,
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

	} catch(err) {
		console.log("flex is not applicable")
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
	} catch(err) {

	}
	$("#submit_data").click(function(e) {
		var fields = $(":input").serializeArray();
		$("#results").empty().append(JSON.stringify(fields, null, "\t"));
	});

	if ($(window).width() < 768) {
		$(".mobile-search-row").click(function() {
			$(".search-content").addClass('open');
			$("#header").addClass('hide');
		});

		$(".search-content .close").click(function() {
			$(".search-content").removeClass('open');
			$("#header").removeClass('hide');
		});

		//@###

		$(".caption-box .detail-row").click(function() {
			$(".home-slider .detail-box").slideDown();
			$(".home-content .mobile-search-row").hide();
			myslider.stopAuto();

		});
		$(".home-slider .detail-box .top-row").click(function() {
			$(".home-content .mobile-search-row").show();
			myslider.startAuto();
			$(".home-slider .detail-box").slideUp();
			$('.home-slider .bxslider').bxSlider({
				auto : 'false'
			});
		});

		//14_july_2017

		//14_july_2017
	}
	// 2_08_2017
	//Display and Hide the search-content

	if ($(window).width() > 767) {
		// Toggle class menue to hover
		$(".main-menu").hover(function() {

			$(this).toggleClass("new-animat");

		});

		$(".caption-box .detail-row").click(function() {

			if (!fadeBool) {
				$(".home-content .search-content").fadeOut();
			}
			$(".home-slider .detail-box").slideDown();
			myslider.stopAuto();
			clickbool = true;
		});
		$(".home-slider .detail-box .top-row").click(function() {
			//alert(2)
			$(".home-content .search-content").fadeIn();
			myslider.startAuto();
			$(".home-slider .detail-box").slideUp();
			$('.home-slider .bxslider').bxSlider({
				auto : 'false'
			});
		});

		//21_july_2017
		//Mega menu fadeIn and fadeOut
		var bool = true;
		$(".main-menu > li").hover(function() {
			// $('.nav-content', this).fadeIn('slow');
			// bool = false;

		}, function() {
			//$('.nav-content', this).hide();
			$('#header').find(".primary-header").find('.logo').removeClass('active');
		})
		$(".main-menu > li a").hover(function() {
			if (bool) {
				//$('.nav-content', $(this).parent('li')).fadeIn('slow');
				$('#header').find(".primary-header").find('.logo').addClass('active');
			} else {
				//$('.nav-content', $(this).parent('li')).show();
				$('#header').find(".primary-header").find('.logo').addClass('active');
			}
		});
	}
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
			console.log("leftThis", topThis)
			$(".search-tab .tab-content .select-filter .residentialProject .dropdown-box.clearfix").css("display", "none");
			$(".search-tab .tab-content .select-filter .residentialProject>.dropdown-row").removeClass("open");

		}

		// to add a fix class to date picker;

		//console.log("hii", topThis, topupdate)

		if (topThis > topupdate) {
			$('.daterangepicker').addClass('fix-datepicker')
		} else if (topThis < topupdate) {
			$('.daterangepicker').removeClass('fix-datepicker')
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
					$(".home-content .search-content").fadeIn();
					fadeBool = true;
					if (input_click_bool) {
						$(".search-row-fields").addClass("slideOpen");

					}
					// if($(".tab-1").find(".search-row.active")){
					// //alert(1)
					// $(".search-row-fields").addClass("slideOpen");
					// }

				} else {
					input_click_bool = false;

					fadeBool = false;
					$('#header').removeClass('fix');
					$('#main-wrapper').removeClass('fix-row');
					$(".home-content .search-content h1").css("display", "block");
					$(".tab-content").find(".sbOptions").css("display", "none");
					$(".tab-content").find(".sbToggle").removeClass("sbToggleOpen");
					//console.log(clickbool);
					if (clickbool && $(".search-content")[0].style.display != "none") {
						$(".home-slider .detail-box").slideUp();
					}
				}

				if ($(window).scrollTop() > Offset) {

					$(".home-content .search-content ").fadeIn();
					$(".home-slider .detail-box").slideUp();
					//  $(".home-content .search-content h1").css("display","block");
				}

			});
		}
	} catch(err) {

	}

	// detail box mobile view //

	$(window).on('scroll', function() {

		try {
			if ($(window).width() < 768) {
				$(".home-slider .detail-box").slideUp();
			}
		} catch(err) {

		}
	})
	//mCustomScrollbar plugin calling

	$(".horizontal-scroll-content").mCustomScrollbar({
		horizontalScroll : true,
		// mouseWheelPixels: 500,
		// scrollInertia: 0,

		advanced : {
			autoExpandHorizontalScroll : true
		}
	});

	$(".vertical-scroll-content").mCustomScrollbar({
		scrollInertia : 0,
		//autoDraggerLength: false,
		mouseWheel : {
			preventDefault : true
		},
		mouseWheelPixels : 15,
		scrollButtons : {
			enable : true
		}
	});

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
			preventDefault : true
		},
		click : {
			preventDefault : false
		},
		mouseWheelPixels : 10,
		scrollButtons : {
			enable : true
		}
	});

	$(".price_list_02").mCustomScrollbar({
		scrollInertia : 0,
		//autoDraggerLength: false,
		mouseWheel : {
			preventDefault : true
		},
		mouseWheelPixels : 10,
		scrollButtons : {
			enable : true
		}
	});

	$(".dropdown-box-scroll").mCustomScrollbar({
		scrollInertia : 0,
		//autoDraggerLength: false,
		mouseWheel : {
			preventDefault : true
		},
		mouseWheelPixels : 10,
		scrollButtons : {
			enable : true
		}
	});
	$(".dropdown-box.advance-search-blk").mCustomScrollbar({
		scrollInertia : 0,
		//autoDraggerLength: false,
		mouseWheel : {
			preventDefault : true
		},
		mouseWheelPixels : 10,
		scrollButtons : {
			enable : true
		}
	});

	//Anoop 01_08_2017

	// 26_7_2017
	//Add and remove the Custom Scrollbar in index.html page

	if ($("body").hasClass("indexBody")) {
		if ($('.search-row-fields .lifestyle-row ul li').length / 2 <= 9) {
			$(".search-row-fields .lifestyle-row .dropdown-box").mCustomScrollbar("destroy");
		} else {
			$("search-row-fields .lifestyle-row .dropdown-box").mCustomScrollbar("update");
		}

		if ($('.search-row-fields .bedroom-row.increase-num-wrap ul li').length / 2 <= 11) {
			$(".search-row-fields .bedroom-row.increase-num-wrap .dropdown-box").mCustomScrollbar("destroy");
		} else {
			$("search-row-fields .bedroom-row.increase-num-wrap .dropdown-box").mCustomScrollbar("update");
		}
		if ($('.search-row-fields .post-row.post-by ul li').length / 2 <= 9) {
			$(".search-row-fields .post-row.post-by .dropdown-box").mCustomScrollbar("destroy");
		} else {
			$("search-row-fields .post-row.post-by .dropdown-box").mCustomScrollbar("update");
		}
		if (($('.search-row-fields .range-row .min-box ul li').length / 2 <= 9) && ($('.search-row-fields .range-row .max-box ul li').length / 2 <= 9)) {
			$(".search-row-fields .range-row .dropdown-box").mCustomScrollbar("destroy");
		} else {
			$("search-row-fields .range-row .dropdown-box").mCustomScrollbar("update");
		}
	}	// 26_7_2017

	//toggle side bar

	$(".side-menu ul .expend").click(function() {
		var hasActive = $(this).hasClass("active")
		if (!hasActive) {
			$(this).addClass("active");
		}
		if (hasActive) {
			$(this).removeClass("active");
		}

		if (true) {
			$(this).find(".sub-label").slideToggle();

			$(this).siblings("li").removeClass("active").find(".sub-label").slideUp();
		}
	});

	//side bar
	$(".toggle-bar").click(function(ev) {
		$(this).toggleClass("active");
		$('#main-wrapper #header').toggleClass('open-left-anim');
		$('.side-menu').toggleClass('open');
		$(".side-menu ul .expend").removeClass("active");
		$(".side-menu ul .expend").find(".sub-label").slideUp();
		// to remove class of globe
		$('.right-header .open').removeClass('open');
		// ends

		// to remove class to search bar bottom element//
		$(".search-row-fields").removeClass("slideOpen");
		$(".search-row").removeClass("active");
		// ends//

		ev.stopPropagation();
	});
	// end//

	// to stop bubbling of click on side-menu

	$('body').on('click', '.side-menu', function(ev) {
		ev.stopPropagation();
	})
	//end

	// to close left option bar anywhere on body

	$(document).on('click', 'body', function() {

		$('.toggle-bar').removeClass("active");
		$('#main-wrapper #header').removeClass('open-left-anim');
		$('.side-menu').removeClass('open');
		$(".side-menu ul .expend").removeClass("active");
		$(".side-menu ul .expend").find(".sub-label").slideUp();

	})
	//

	// right bar mobile

	$(".main-menu .main-expend").click(function() {

		var hasActive = $(this).hasClass("active")
		if (!hasActive) {
			$(this).addClass("active");
		}
		if (hasActive) {
			$(this).removeClass("active");
		}
		if (true) {
			$(this).find(".nav-content").slideToggle(500);
			$(this).siblings("li").removeClass("active").find(".nav-content").slideUp(500);
		}
	});

	$(".toggle-bar-right").click(function() {
		//$(this).toggleClass("is-active");
		$('.hamburger').toggleClass('is-active');
		$('#main-wrapper #header').toggleClass('open-right-anim');
		$('.left-header .main-menu').toggleClass('open');
		$(".main-expend").removeClass("active");
		$(".main-expend").find(".nav-content").slideUp();
	});

	/*============ Neeraj 071717  ==========*/

	// $('.select').select2();

	/*============ Neeraj 071717  ==========*/

	// radio and checkbox
	function setupLabel() {
		if ($('.label_check input').length) {
			$('.label_check').removeClass('c_on');
			$('.label_check input:checked').parent('label').addClass('c_on');
		};
		if ($('.label_radio input').length) {
			$('.label_radio').removeClass('r_on');
			$('.label_radio input:checked').parent('label').addClass('r_on');

		};
	};
	// 19_7_2017

	$('.label_radio').click(function() {
		setupLabel();
	});
	$('.label_check').click(function() {
		setupLabel();
	});
	setupLabel();

	//01_08_2017
	//****************Pricing*************
	var bool1 = true;
	var bool2 = true
	var value1, value2;
	var value3;
	var min = 'Min', max = 'Max';
	$('.range-row .min-box ul li').on('click', function() {

		$('.range-row .min-box .price-select-active').removeClass('price-select-active');
		$(this).addClass('price-select-active');
		//console.log($(this).index())
		// to heighlight the current li
		$('.range-row .min-box .selectboxit-focus').removeClass('selectboxit-focus')
		$(this).addClass('selectboxit-focus');

		min = $(this).text();
		$(this).closest('.dropdown-row').children('.dropdown-value').text(min + '-' + max).append("<em><b>&nbsp;</b></em>");
		$(this).closest('.dropdown-row').children(".dropdown-box").find('.min-max').find('.Min').text($(this).text());

		if ($(this).index() == 0) {
			//$(".max-box ul li").hide();
		} else {
			//console.log($(this).index())
			// hide show management of max elements when a min value is selected
			$(this).parents(".min-max-range").find('.max-box').find('ul').find('li').hide();
			$(this).parents(".min-max-range").find('.max-box').find('ul').find('li').eq(0).show();
			$(this).parents(".min-max-range").find('.max-box').find('ul').find('li').eq($(this).index()).nextAll('li').show();
			//$('.max-box').find('ul').find('li').eq($(this).index()).nextAll('li').show();
		}
	});

	// show all when clicked on min text ie reset the max
	$('.range-row .min-box ul li:first-child').on('click', function() {
		$('.max-box').find('ul').find('li').show();
	})
	// ends
	$('.range-row .max-box ul li').on('click', function() {

		// to heighlight the current li
		$('.range-row .max-box .selectboxit-focus').removeClass('selectboxit-focus')
		$(this).addClass('selectboxit-focus');
		// end this
		$('.range-row .max-box .price-select-active').removeClass('price-select-active');
		$(this).addClass('price-select-active');
		max = $(this).text();
		//$(".search-row-fields").removeClass("slideOpen");
		//$(".min-max-range").slideUp("fast");
		console.log("index", $('.range-row .min-max .Min').text().trim());
		//$('.min-box').find('ul').find('li')

		if ($(this).index() != 0 && $('.range-row .min-max .Min').text().trim() != 'Min') {

			$(".dropdown-row").removeClass("open");
			$(".dropdown-box").slideUp();
		}

		$(this).closest('.dropdown-row').children('.dropdown-value').text(min + '-' + max).append("<em><b>&nbsp;</b></em>");
		$(this).closest('.dropdown-row').children(".dropdown-box").find('.min-max').find('.Max').text($(this).text());
		if ($(this).index() == 0) {
			//$(".min-box ul li").hide();
		} else {

			// to hide next  elements//
			$(this).parents(".min-max-range").find('.min-box').find('ul').find('li').hide();
			// to show the previous elements//
			$(this).parents(".min-max-range").find('.min-box').find('ul').find('li').eq($(this).index()).prevAll('li').show();
			// to show the list tag//
			$(this).parents(".min-max-range").find('.min-box').find('ul').find('li').eq(0).show();
			// end//
		}

	});
	// show all when clicked on max text ie.. reset the min
	$('.range-row .max-box ul li:first-child').on('click', function(event) {
		$('.min-box').find('ul').find('li').show();
		event.stopPropagation()
	})
	// ends
	// 20_7_2017

	//28_7_17
	// Posted By dropdown section
	$('.post-row.post-by  input,.dropdown-row.lifestyle-row  input').on('change', function() {
		if ($(this).parents('ul').find('.c_on').length == 1) {
			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).parents('ul').find('.c_on').eq(0).text()).append('<em><b>&nbsp;</b></em>');
		} else if ($(this).parents('ul').find('.c_on').length == $(this).parents('ul').children('li').length) {
			$(this).closest('.dropdown-row').children('.dropdown-value').text('All').append('<em><b>&nbsp;</b></em>');
		} else if ($(this).parents('ul').find('.c_on').length == 0) {
			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).closest('.dropdown-row').attr('default-text')).append('<em><b>&nbsp;</b></em>');
		} else if ($(this).parents('ul').find('.c_on').length != $(this).parents('ul').children('li').length) {
			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).parents('ul').find('.c_on').length + ' Selected').append("<em><b>&nbsp;</b></em>");
		}
	});

	//Beds and Lifestyle dropdown section

	$('.increase-num-wrap  input').on('change', function() {
		if ($(this).parents('ul').find('.c_on').length == 1) {
			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).parents('ul').find('.c_on').eq(0).text()).append('<em><b>&nbsp;</b></em>');
		} else if ($(this).parents('ul').find('.c_on').length == 2) {
			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).parents('ul').find('.c_on').eq(0).text().split("B")[0] + ',' + $(this).parents('ul').find('.c_on').eq(1).text()).append('<em><b>&nbsp;</b></em>');
		} else if ($(this).parents('ul').find('.c_on').length > 2) {
			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).parents('ul').find('.c_on').eq(0).text().split("B")[0] + ',' + $(this).parents('ul').find('.c_on').eq(1).text() + '+').append('<em><b>&nbsp;</b></em>');
		} else {
			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).closest('.dropdown-row').attr('default-text')).append('<em><b>&nbsp;</b></em>');
		}
		var selected_input = [];
		$(this).parents('ul').find('.c_on').each(function(key, val) {
			selected_input.push($(this).children('input').attr('value'))
		});
		$(this).closest('.increase-num-wrap').children('input').val(selected_input);
	});
	//	03_08_2017

	//tab-1
	//Click in Beds>any dropdown section //\\A

	$('.increase-num-wrap .anytext').click(function() {
		$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).text()).append('<em><b>&nbsp;</b></em>');
		$(this).closest('.dropdown-row').children('.dropdown-box').slideUp();
		$(this).closest('.dropdown-row').removeClass('open');
		$(this).siblings("li").find("label").removeClass("c_on");
		$(this).siblings("li").find('input:checked').attr("checked", false);
	})
	//	03_08_2017

	//******** search-field placeholder************	//\\A
	$(document).on('keypress focusout', '.bootstrap-tagsinput input', function(e) {
		$(".focus-input").removeClass("focus-input")
		$(this).addClass("focus-input")
		if ((e.which == 13 || e.type == "focusout") && $(this).hasClass("focus-input")) {
			if ($(".search-field .bootstrap-tagsinput").children("span").length) {
				$(this).attr("placeholder", "Add Places");
				$(".search-field .bootstrap-tagsinput").addClass("tagsInput");
			}

		}
	});

	$('input').on('itemRemoved', function(event) {
		$(".tags-default").each(function(index, elem) {
			if ($(elem).find("span.label").length == 0) {
				$(elem).find("input").attr("placeholder", "Enter Landmark, Location Or Project");
				$(".search-field .bootstrap-tagsinput").removeClass("tagsInput");
			}

		})
	});

	$('input').on('itemAdded', function(event) {

		//alert("added")
		//$('input').tagsinput('refresh');
		//$('input').tagsinput('add', 'some, tag');

		var obj = {};
		var compBase = 0;
		var item;

		// var obj= $(".tagsip input").length;

		//console.log((obj))

		//console.log($(".tagsip"))

		$('.tags-default').each(function(index, val) {

			var length = $(val).find(".label-info").length;
			//console.log("kkk", length);

			if (length > compBase) {
				//console.log("inside alert")
				compBase = length;
				obj.len = length;
				mainObj = $(val).find('.label-info');

			}

		})
		//console.log(mainObj, "mainObj")
		var targerElements = $('.bootstrap-tagsinput').not('.focus')
		//console.log("targerElements", targerElements)

		$(targerElements).each(function(index, val) {
			//$(this).remove('.label-info');
			for (var i = 0; i < mainObj.length; i++) {
				//$(this).append(mainObj[i]);

			};

		})
	});

	// to make active class > globe> li

	// $(document).on('keypress focusout', '.bootstrap-tagsinput input', function(e) {
	//
	// if ((e.which == 13)) {
	//
	// if ($(".search-field .bootstrap-tagsinput").children("span").length) {
	//
	//
	// }
	//
	// }
	//
	//
	// })

	//3_08_2017 //\\A
	var input_click_bool = false;
	var opened_slidebar = "yes";
	$(".search-field input").click(function(event) {

		// to remove class from right header list if its open
		$('.right-header li').removeClass('open');
		// end this
		// to slide left the side-menu//
		$('.toggle-bar').removeClass("active");
		$('#main-wrapper #header').removeClass('open-left-anim');
		$('.side-menu').removeClass('open');
		$(".side-menu ul .expend").removeClass("active");
		$(".side-menu ul .expend").find(".sub-label").slideUp();
		// ends//

		$(".select-row").parent(".search-row").siblings(".search-row-fields").children(".dropdown-row").find(".dropdown-box").slideUp("fast");
		$(".select-row").find(".dropdown-row").find(".dropdown-box").slideUp("fast");
		$(this).parents(".tab-content").find("*").removeClass("open");
		$(".search-row-fields").addClass("slideOpen");
		$(".search-row").addClass("active");
		event.stopPropagation();
		if ($(window).scrollTop() > navOffset) {
			input_click_bool = true;
		}
	});

	$('.more-map-btn').click(function() {
		$('.listing-wrap').toggleClass('listing-wrap-open');
		if ($(this).parents().hasClass("listing-wrap-open")) {
			$(this).text('more list');
		} else {
			$(this).text('more map');
		}
	});

	// 2_08_2017
	//For Tabbing

	$('.tab-row a').click(function(e) {
		e.preventDefault();
		$(this).parents('.tab-row').siblings('.tab-content').find('.tab-row-select').find('.sbSelector').text($(this).text());
		$(this).closest('ul').find('.active').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.tab-container').children('.tab-content').children().hide();
		var index = $(this).parent().index();
		// to set value in  selectboxit-text when searchbar become sticky
		$(this).parents('.search-tab').find('.tab-row-select .selectboxit-text').text($(this).parent().text().trim())
		// end

		//when a tab changes the previous one should be clearall start
		//console.log( $('.search-row-fields .clear-btn'))
		$('.search-row-fields .clear-btn').click()

		//  end
		$(this).closest('.tab-container').children('.tab-content').children().eq(index).show();
		//	$(this).parents(".tab-content").find(".slideOpen").find('input:checked').attr("checked", false);
		//	$(this).parents(".search-tab").children(".tab-content").find(".select-filter ").find(".slideOpen").find(".dropdown-box").find('input:checked').attr("checked", false);
		$(this).parents(".search-tab").children(".tab-content").find(".select-filter ").find(".slideOpen").find(".dropdown-box").find('.c_on').removeClass("c_on");
		$(this).parents(".search-tab").children(".tab-content").find(".slideOpen").children().each(function() {
			$(this).find(".dropdown-value").text($(this).attr("default-text")).append("<em><b>&nbsp;</b></em>")
		});
		//@### 4aug2017
		if (datepickeranytimebool) {

			//console.log("hiiii")

			if ($(this).hasClass("tab3 active")) {
				$(".search-row-wrap.anytime span").text(" ");
				$(".search-row-wrap.anytime span.dateinput-start").text("Anytime");
				$(".cross-btn-cal").css("display", "none");
			}
			datepickeranytimebool = false;
		}
		// if($(this).text()=="Holidays"){
		// //console.log($(".tab-content .tab-3 .select-filter .search-row-fields.holidays .guests .dropdown-value"))
		// $(".tab-content .tab-3 .select-filter .search-row-fields.holidays .guests").firstChild().remove().attr("style").css("display","block !important");
		// }

	});

	//dropdown-row
	//	31_07_2017
	$(".dropdown-row").click(function(event) {
		event.preventDefault();
		//event.stopPropagation();
		if ($(this).hasClass("open")) {
			$(this).parents(".tab-content ,.search-bar-container").find("*").removeClass("open");
			$(this).find(".dropdown-box").slideUp("fast");
		} else {
			$(this).siblings().find(".dropdown-box").slideUp("fast");
			$(this).parents('.select-menu').find(".dropdown-box").slideUp("fast");
			$(this).children(".dropdown-box").slideDown("fast");
			$(this).addClass("open").parents(".tab-content ,.search-bar-container").find("*").not($(this)).removeClass("open");
		}
		$(this).parent("")

	})
	// 18_july_2017
	var DropDownStatus = true;
	$(".dropdown-box").click(function(event) {
		//console.log("status=" + DropDownStatus);

		if (DropDownStatus) {
			$(this).find(".dropdown-box").slideUp("fast");
			$(this).find(".dropdown-baths").removeClass("dropdown-baths_active");
		}

		//alert($(event.target).attr("class"))

		//alert(event.currentTarget.className)
		//DropDownStatus = true;

		event.stopPropagation();

	});

	$(".dropdown-box.custom-form,.advance-search-blk .dropdown-value").click(function(event) {
		DropDownStatus = false;
		console.log("from inside");
		//event.stopPropagation();
		setTimeout(function() {
			DropDownStatus = true;
		}, 200);
	})
	//17_july_2017
	$(".search-prop-blk").on("click", function() {
		$(this).next(".search-bar-container").addClass("on");
	});
	$(".toggle-btn").on("click", function() {
		$(this).closest(".select-menu").closest(".search-bar-container").removeClass("on");
	})
	//17_july_2017

	// 26_7_2017

	// 26_7_2017 // popup> chose location >> to manage closing of popup on same popup click
	$('.global-dropdown,.custom-form li label').on('click', function(event) {
		//event.stopPropagation();
	})

	$('.global-dropdown').on('click', function(event) {
		if (event.target.className == 'sbFocus') {
			$('.makeActive').removeClass('makeActive');
			event.target.setAttribute('class', 'makeActive');
		}
		event.stopPropagation();

	})
	// 26_7_2017

	//range picker 2_08_2017
	$('.search-row-wrap.anytime').daterangepicker({
		//autoUpdateInput: false,
		minDate : moment().startOf('day'),
		"autoApply" : true,
		showCustomRangeLabel : true
	});

	//11_08_2017 guest section in Holidays Tab//  holyday-tab>guest
	var adult_old = parseInt($('.adults').find("span.quntity-input").text());
	var children_old = parseInt($('.children').find("span.quntity-input").text());
	var infants_old = parseInt($('.infants').find("span.quntity-input").text());
	$('.adults .ddd').click(function() {
		if ($(this).text() == "+") {
			adult_old = parseInt(adult_old) + 1;
			if (adult_old > 1) {
				$(this).parent().siblings(".sp-minus").removeClass("disable");
			}
		} else {
			if (!($(this).parent().hasClass("disable"))) {
				adult_old = parseInt(adult_old) - 1;
				if (adult_old == 1) {
					$(this).parent().addClass("disable");
				}
			}
		}
		$(this).closest(".adults").find(".quntity-input").text(adult_old);

		// if(infants_old==1){
		// $(".search-row-fields .search-row-wrap.guests .add-guest").text(adult_old+children_old+" "+"Guests"+","+infants_old+"infant");
		// }
		// else

		if (infants_old >= 1) {
			$(".search-row-fields .search-row-wrap.guests .add-guest").text(adult_old + children_old + " " + "Guests" + "," + infants_old + "infants");
		} else {
			$(".search-row-fields .search-row-wrap.guests .add-guest").text(adult_old + children_old + " " + "Guests");
		}
	});
	$('.children .ddd').click(function() {
		if ($(this).text() == "+") {
			children_old = parseInt(children_old) + 1;

			if (children_old > 0) {
				$(this).parent().siblings(".sp-minus").removeClass("disable");
			}
		} else {
			if (!($(this).parent().hasClass("disable"))) {
				children_old = parseInt(children_old) - 1;
				if (children_old == 0) {
					$(this).parent().addClass("disable");
				}
			}
		}
		$(this).closest(".children").find(".quntity-input").text(children_old);
		if (infants_old == 1) {
			$(".search-row-fields .search-row-wrap.guests .add-guest").text(adult_old + children_old + " " + "Guests" + "," + infants_old + "infant");
		} else if (infants_old > 1) {
			$(".search-row-fields .search-row-wrap.guests .add-guest").text(adult_old + children_old + " " + "Guests" + "," + infants_old + "infants");
		} else {
			$(".search-row-fields .search-row-wrap.guests .add-guest").text(adult_old + children_old + " " + "Guests");
		}
	});
	$('.infants .ddd').click(function() {
		if ($(this).text() == "+") {
			infants_old = parseInt(infants_old) + 1;

			if (infants_old > 0) {
				$(this).parent().siblings(".sp-minus").removeClass("disable");
			}
		} else {
			if (!($(this).parent().hasClass("disable"))) {
				infants_old = parseInt(infants_old) - 1;
				if (infants_old == 0) {
					$(this).parent().addClass("disable");
				}
			}
		}
		$(this).closest(".infants").find(".quntity-input").text(infants_old);
		if (infants_old == 1)
			$(".search-row-fields .search-row-wrap.guests .add-guest").text(adult_old + children_old + " " + "Guests" + " " + ", " + infants_old + " " + "infant");
		if (infants_old > 1)
			$(".search-row-fields .search-row-wrap.guests .add-guest").text(adult_old + children_old + " " + "Guests" + " " + ", " + infants_old + " " + "infants");
		if (infants_old == 0)
			$(".search-row-fields .search-row-wrap.guests .add-guest").text(adult_old + children_old + " " + "Guests" + "");
	});

	//clear- on Guest section in Holidays tab 11_08_2017

	$(".quality-clear a").click(function() {
		$(this).parent(".quality-clear").siblings(".sp-quantity.adults").find(".quntity-input").text($(this).parent(".quality-clear").siblings(".sp-quantity.adults").find(".quntity-input").attr("default-text"));
		$(this).parent(".quality-clear").siblings(".sp-quantity.children").find(".quntity-input").text($(this).parent(".quality-clear").siblings(".sp-quantity.children").find(".quntity-input").attr("default-text"));
		$(this).parent(".quality-clear").siblings(".sp-quantity.infants").find(".quntity-input").text($(this).parent(".quality-clear").siblings(".sp-quantity.infants").find(".quntity-input").attr("default-text"));
		adult_old = parseInt($('.adults').find("span.quntity-input").attr("default-text"));
		children_old = parseInt($('.children').find("span.quntity-input").attr("default-text"));
		infants_old = parseInt($('.infants').find("span.quntity-input").attr("default-text"));
		$(this).parent(".quality-clear").parent(".dropdown-box").parent(".guests ").children(".add-guest").text($(this).parent(".quality-clear").parent(".dropdown-box").parent(".guests ").children(".add-guest").attr("default-text"));
		$(this).parents(".dropdown-box").children(".sp-quantity").find(".sp-minus").addClass("disable");
	})
	// 18_july_2017

	$(".signin-dropdown .register-as li").click(function() {
		$(".signin-dropdown .register-as li").removeClass("active");
		$(this).addClass("active");
	});

	//signin or new account box
	$(".signin-dropdown .head-row a.signin-btn").click(function() {
		$(".signin-dropdown .head-row a").removeClass("active");
		$(this).addClass("active");
		$(".newaccount-wrap").hide();
		$(".signin-wrap").show();
	});

	$(".signin-dropdown .head-row a.newacc-btn").click(function() {
		$(".signin-dropdown .head-row a").removeClass("active");
		$(this).addClass("active");
		$(".signin-wrap").hide();
		$(".newaccount-wrap").show();
	});

	/*============ select box plugin ==========*/

	//console.log(!$('.product-detail'))

	if ($(".select").length) {

		selectBox = $(".select").selectBoxIt({
			showEffect : "slideDown",
			hideEffect : "slideUp",
			hideEffectSpeed : 200,
			showEffectSpeed : 200
		});
	}

	// "destroy" : function(ev) {
	// ev.preventDefault();
	// ev.stopPropagation();
	// }
	$(window).on("load", function() {

		$('.tab-row-select .selectboxit-text').text($('.select-row.tab-row-select select').children().first().text());
	})

	$(document).on('change', '.tab-row-select .select', function(event) {
		event.preventDefault();
		event.stopPropagation();
		//$('.search-row-fields .clear-btn').trigger('click');
		var element;
		var thisElem = $(this).children(":selected").attr("value");
		$(this).siblings("span").find(".selectboxit-option").each(function(index, elem) {
			if (thisElem == $(elem).text()) {

				element = elem;
				$('.tab-row-select .selectboxit-text').text($(elem).text()).attr('data-val', $(elem).text());

			}

		})
		// console.log($(element).find("a").parent('li').index())

		$('.tab-row li').eq($(element).find("a").parent('li').index()).find('a').trigger('click');

		//$("body").trigger("click")

		//console.log("hello")

		$('.selectboxit-options').slideUp()

		// to clear all beside residensial

		// ends

	});

	//For calculator
	$(".mo_cal").click(function(event) {
		event.stopPropagation();
		$(".calculator_popup").toggle();
	});

	//For tabbing 2

	if ($(window).width() >= 768) {

		$(".tabing_list li").click(function() {
			$(".tabing_list li").removeClass("active");
			$(this).addClass("active");
			var indexValue = $(this).index();
			$(".tab_content .tab_content_inner").removeClass("active");
			$(".tab_content .tab_content_inner").eq(indexValue).addClass("active");
		});

		// on click of energy balance
		$(".feature_section_list li").click(function() {

			console.log("kkkkk")

			$(".energy_balance_box").slideToggle(500, "linear");
			$(".feature_section_list li a").fadeToggle();

		})
	}

	$(".signin-box").click(function() {
		$(".signin-popup , .lightbox").addClass("active");
	});

	$(".signin-popup .close , .lightbox ").click(function() {
		$(".signin-popup , .lightbox").removeClass("active");
	})
	//31_07_2017
	//Add and remove class on signIn section

	$(".input-ag input").on({
		click : function() {
			$(this).parent('.input-ag').addClass("signin");
		},
		blur : function() {
			if ($(this).length == 0 && $(this) == null) {
				$(this).parent('.input-ag').addClass("signin");
			}
		},
		onfocus : function() {
			$(this).parent('.input-ag').addClass("signin");
		}
	});

	// 16_08_2017
	var temp = false;
	$("body").on("mouseenter", ".openIconContainer .icon-down", function() {
		$(this).removeClass('rotate');
		// temp = true
		if (!($(this).hasClass('rotate'))) {

			$(this).addClass('rotate');
			$('.agent_form').slideDown(500);
		}
	});

	$('.openIconContainer .icon-down').click(function(event) {
		event.stopPropagation();
		if ($(this).hasClass('rotate')) {
			$(this).removeClass('rotate');
			$('.agent_form').slideUp(500);
		}
	});

	$(".agent-form-fixed").click(function(event) {
		event.stopPropagation();
	})
	$(".agent-form-fixed h2").click(function() {
		var top = $(this).offset().top;
		var height = $(".primary-header.clearfix").height() + $(".toolbar-left").height();
		//console.log(height);
		$('html, body').animate({
			'scrollTop' : top - height
		});
	})
	//Anoop
	$(".search-field input").click(function(event) {
		$(".select-row").find(".dropdown-row").find(".dropdown-box").slideUp("fast");
		$(this).parents(".tab-content").find("*").removeClass("open");
		$(".search-row-fields").addClass("slideOpen");
		$(".search-row").addClass("active");
		event.stopPropagation();
	});

	//Anoop
	// Accordian

	if ($(window).width() <= 767) {
		$('.tab_drawer_heading').click(function(e) {
			$(this).next().slideToggle();
			$(this).next().siblings(".tab_content_inner").slideUp();
		})
		$(".signin-box").click(function() {
			$("body").addClass("remove-scrll");
		});
		$(".lightbox").click(function() {
			$("body").removeClass("remove-scrll");
		});
		$(".signin-popup .close").click(function() {
			$("body").removeClass("remove-scrll");
		});
		$(".mobile-search-row").click(function() {
			$("body").addClass("remove-scrll");
		});
		$(".search-content .close").click(function() {
			$("body").removeClass("remove-scrll");
		});
	}
	//  2_08_2017
	$('.toolbar-left .select-menu li .buy-row  li a,.toolbar-left .select-menu li .bed-row  li a').click(function() {
		$('.toolbar-left .select-menu li .buy-row  li a.active,.toolbar-left .select-menu li .bed-row  li a.active').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.buy-row').children('.dropdown-value').text($(this).parent('li').find('a').text()).append('<em><b>&nbsp;</b></em>');
		$(this).closest('.bed-row').children('.dropdown-value').text($(this).parent('li').find('a').text()).append('<em><b>&nbsp;</b></em>');
		//$(this).parents(".dropdown-box").slideUp();
		//$(this).parents(".dropdown-row").removeClass('open');
	})
	//  2_08_2017
	// 28_7_2017
	$('.select-menu li .post-row input').on('change', function() {
		if ($(this).parents('ul.dropped').find('.c_on').length == 1) {
			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).parents('ul.dropped').find('.c_on').eq(0).text()).append('<em><b>&nbsp;</b></em>');
		} else if ($(this).parents('ul.dropped').find('.c_on').length == $(this).parents('ul.dropped').children('li').length) {
			$(this).closest('.dropdown-row').children('.dropdown-value').text('All').append('<em><b>&nbsp;</b></em>');
		} else if ($(this).parents('ul.dropped').find('.c_on').length == 0) {
			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).closest('.dropdown-row').attr('default-text')).append('<em><b>&nbsp;</b></em>');
		} else if ($(this).parents('ul.dropped').find('.c_on').length != $(this).parents('ul.dropped').children('li').length) {
			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).parents('ul.dropped').find('.c_on').length + ' Selected').append('<em><b>&nbsp;</b></em>');
		}

	});

	/***********clear-btn all dropdown-row *************/
	
	
	
	$(".tab-content .clear-btn").click(function(event) {
		event.stopPropagation();

		$(this).parents(".tab-content").find(".search-row-fields").find('input:checked').attr("checked", false);
		setupLabel();
		$(this).parents(".tab-content").find(".search-row-fields").children().each(function() {
			
			$(this).find(".dropdown-value").text($(this).attr("default-text")).append("<em><b>&nbsp;</b></em>")
		});

		$(".min-max .Min").text("Min");
		$(".min-max .Max").text("Max");

		$(".dropdown-row").removeClass("open");
		$(".dropdown-box").slideUp();

		// to reset the min-max drop down
		$('.range-row .price-select-active').removeClass('price-select-active');

		// to heighlight the current li
		$('.range-row  .selectboxit-focus').removeClass('selectboxit-focus')
		// to clear the min max value//
		$('.range-box.min-max-range .min-max .Min').text("Min");
		$('.range-box.min-max-range .min-max .Max').text("Max");
		// $('.range-box.min-max-range .dropdown-value').text("Any price");
		$('.range-box.min-max-range .max-box').find('ul').find('li').show();
		$('.range-box.min-max-range .min-box').find('ul').find('li').show();
		min = 'Min', max = 'Max';

	});

	// ******************  remove slideopen on click of range drop down

	//28_7_17
	/************************some close content at document click***************************/
	$(document).on('click', function(e) {

		if ($(e.target).closest(".search-row-fields").length === 0) {
			//alert(555;)
			$(".search-row-fields").removeClass("slideOpen");
			$(".search-row").removeClass("active");
			input_click_bool = false;
		};

		if ($(e.target).closest(".dropdown-row").length === 0) {
			$(".dropdown-row").removeClass("open");
			$(".dropdown-box").slideUp();
		};
		if ($(e.target).closest(".right-header ul > li").length === 0) {
			$(".right-header ul > li").removeClass("open");
		};

		if ($(window).width() > 767) {
			if ($(e.target).closest(".caption-box").length === 0) {
				$(".home-slider .detail-box").slideUp(function() {
					$(".home-content .search-content").fadeIn();
					myslider.startAuto();
				});
			};

		} else {
			if ($(e.target).closest(".caption-box").length === 0) {
				$(".home-content .mobile-search-row").show();
				$(".home-slider .detail-box").slideUp(function() {
					myslider.startAuto();
				});
			};
		}

	});

	/*
	* product-details.html js
	*
	*/
	/************Hide all slider-tab-row contect but not first child**************/

	$('.slider-tab-row').children().not($('.slider-tab-row .slider-tab-content:first-child')).hide();
	$(".flexslider-wrap").find(".slider-tab-content.common-box").eq(0).addClass("current_common_box");

	$(".slider-tab-links li").click(function(e) {
		if ($(this).index() != $(this).closest(".flexslider-wrap").find(".common-box.current_common_box").index()) {
			$(".current_common_box").removeClass("current_common_box");
			$(this).closest(".flexslider-wrap").find(".common-box").hide();
			$(this).closest(".flexslider-wrap").find(".common-box").eq($(this).index()).show()
		}
	});

	//Neeraj 08-02-17

	$(".flexslider-wrap .wishlist").click(function() {
		$(this).toggleClass("active");
	});

	//Neeraj 08-02-17
	//#@@@ 9aug2017
	// $('.active').removeClass('.active');

	$(".search-row-wrap.anytime").click(function(e) {

		// to close the left menubar//
		$('.toggle-bar').removeClass("active");
		$('#main-wrapper #header').removeClass('open-left-anim');
		$('.side-menu').removeClass('open');
		$(".side-menu ul .expend").removeClass("active");
		$(".side-menu ul .expend").find(".sub-label").slideUp();
		// ends//

		e.stopPropagation();
		$('.right-header  .open').removeClass('open');

		if ($('.dateinput-start').text() == "Anytime" && $(".daterangepickerinput__arrow").text() == " " && $(".dateinput-end").text() == " ") {
			//console.log("click");
			$('.dateinput-start').text("Check In");
			$('.dateinput-start').addClass("active-offer");
			$('.daterangepickerinput__arrow').text(" - ");
			$('.dateinput-end').text("Check Out");
			//$(".cross-btn-cal").css("display", "block");
		}
	})
	$('.search-row-wrap.anytime span').on('click', function() {
		if ($('.dateinput-start').text() != "Anytime" && $(".dateinput-end").text() != " ") {
			$('.active-offer').removeClass("active-offer");
			$(this).addClass("active-offer");
		}
	});
	//#@@@ 29aug start
	$(".cross-btn-cal").click(function(event) {
		event.stopPropagation();
		$(".search-row-wrap.anytime .dateinput-start").text("Check In").removeClass("active-offer");
		$(".search-row-wrap.anytime .dateinput-end").text("Check Out").removeClass("active-offer");
		$(".daterangepickerinput__arrow").text("-");
		$('.search-row-wrap.anytime').daterangepicker({
			minDate : moment().startOf('day'),
			"autoApply" : true,
			showCustomRangeLabel : true
		});
	});

	//#@@@ 29aug end

	//14_08_2017 on body click to close the calculator_popup
	$(document).on("click", 'body', function(ev) {

		//$(".daterangepicker").daterangepicker().clickApply();
		//$(".daterangepicker").css({"display": "none"});
		if ($(".search-row-wrap.anytime .dateinput-start").text().trim() == "Check In" && $(".search-row-wrap.anytime .dateinput-end").text().trim() == "Check Out") {
			$(".search-row-wrap.anytime span").text(" ");
			$(".search-row-wrap.anytime span").removeClass("active-offer");
			$(".search-row-wrap.anytime .dateinput-start").text("Anytime");
			$(".cross-btn-cal").css("display", "none");
		} else {
			$(".search-row-wrap.anytime span").removeClass("active-offer");

		}

		$(".calculator_section .calculator_popup").css("display", "none");
	})
	// to stop the bubbling of click event on daterangepicker

	$(document).on("click", 'body .anytime, .daterangepicker ', function(event) {
		event.stopPropagation();
	})
	//////************

	// $(window).on('scroll', function(){
	// $(".daterangepicker").css({"display": "none"});
	// })

	$(".calculator_popup").click(function(event) {
		event.stopPropagation();
	})
	$(".inner-detail-popup").click(function(event) {
		event.stopPropagation();
	})
	/***********clear-btn all dropdown-row *************/

	// 28_7_2017

	// document.ready function close

	/*============ Neeraj 071717  ==========*/

	$(window).load(function() {

		// var barOffset = 0;
		// var barOffset_sec = 0;
		resetResidentialProject();
		$('.select-row .checklist li').on('change', function(event) {

			console.log("hii check")

			//alert(0)
			$(this).toggleClass('checked');
			if ($(this).hasClass('optgroup')) {
				var cureentIndex = ($(this).nextAll('.optgroup').index() == -1) ? $(this).nextAll('li').addClass('checked') : $(this).nextAll('.optgroup').prevAll('li').addClass('checked');
				if ($(this).nextAll('.optgroup').index() == -1) {
					$(this).addClass('checked')
				}
				$(this).nextAll('.optgroup').prevAll('li').addClass('checked');
				$(this).prevAll('li').removeClass('checked');
				$(this).nextAll('.optgroup').removeClass('checked');
				$(this).nextAll('.optgroup').nextAll('li').removeClass('checked');
				$(this).closest('.increase-num-wrap').find('.dropdown-value').text($(this).text()).append('<em><b>&nbsp;</b></em>');
				$(this).siblings($(this).siblings('.checked ,.optgroup')).show().not($(this).siblings('.checked ,.optgroup')).hide();
			} else {

				$(this).prevAll('.optgroup').prevAll('li').removeClass('checked');
				$(this).nextAll('.optgroup').removeClass('checked');
				$(this).nextAll('.optgroup').nextAll('li').removeClass('checked');
				// to calculate length of checked input in current element
				var checkedLen = $(this).parents('.select-row').find('.checklist li.checked').not($(this).prevAll('.optgroup')).length;

				//console.log(checkedLen)

				var nextOptGroupIndex = ($(this).nextAll('.optgroup').index() == -1) ? $(this).parent('.checklist').children('li').length : $(this).nextAll('.optgroup').index();
				if (checkedLen == ((nextOptGroupIndex - $(this).prevAll('.optgroup').index()) - 1)) {

					$(this).closest('.increase-num-wrap').find('.dropdown-value').text($(this).prevAll('.optgroup').first().text()).append('<em><b>&nbsp;</b></em>');
					$(this).prevAll('.optgroup').not($(this).prevAll('.optgroup').prevAll('.optgroup')).addClass('checked');

					//console.log("hiiii if")

				} else if (checkedLen != ((nextOptGroupIndex - $(this).prevAll('.optgroup').index()) - 1)) {
					console.log("hiiii else")
					$(this).prevAll('.optgroup').removeClass('checked');
					if (checkedLen == 0) {
						$(this).closest('.increase-num-wrap').find('.dropdown-value').text('Residential Project').append('<em><b>&nbsp;</b></em>');
					} else if (checkedLen == 1) {
						$(this).closest('.increase-num-wrap').find('.dropdown-value').text($(this).find('label').text()).append('<em><b>&nbsp;</b></em>');
					} else if (checkedLen > 1) {
						$(this).closest('.increase-num-wrap').find('.dropdown-value').text(checkedLen + " Selected").append('<em><b>&nbsp;</b></em>');
						console.log(checkedLen, "else", $(this).closest('.increase-num-wrap').find('.dropdown-value'))
					}

				}
			}

		});
		// Product_detail_P
		//16_08_2017
		try {
			var contantOffset = $('.content').offset().top;

		} catch(err) {

		}
		$(window).on('scroll', function() {
			//barOffset = $('.agent-form-fixed .contact_btn').offset().top + $('header').height() + $('.search-bar-container').height();
			//console.log($(window).scrollTop(), barOffset);
			if (barOffset) {
				if ($(window).scrollTop() > barOffset) {
					//console.log($(window).scrollTop(), barOffset);
					$('.detail-page .agent-form-fixed').addClass('show')
					if ($('.detail-page  .agent-form-fixed').hasClass('show') && $(".agent_form").css("display") == "block") {
						$(".detail-page  agent_form").css("display", "block");
					}
					if (temp) {
						$(".detail-page .agent_form").css("display", "none");
						temp = false;
					}
				} else {

					$('.detail-page .agent-form-fixed').removeClass('show');
					$('.detail-page .agent_form-hd-fixed .agent_form').css("display", "block");
					temp = true;
				}
				if ($(window).scrollTop() < barOffset && contantOffset < $(window).scrollTop()) {
					$('.detail-page .agent_form').slideDown(0);

				}
				// agent form fixed on window scroll in holiday html page
				if ($(window).scrollTop() > barOffset_sec) {
					var h3offset = $(".heading-row").offset().top - ($('.detail-page .agent_form-hd-fixed').height() + barOffset_sec );
					$('.detail-page .agent_form-hd-fixed').addClass('show');
					$('.detail-page .agent_form-hd-fixed').removeClass('ksp');
					if ($(window).scrollTop() > (barOffset_sec + h3offset )) {
						$('.detail-page .agent_form-hd-fixed').removeClass('show');
						$('.detail-page .agent_form-hd-fixed').addClass('ksp');

					}

				} else {
					$('.detail-page .agent_form-hd-fixed').removeClass('show');

				}
			}
		});

		//to close agent_form on body click 16_08_2017
		$("body").on("click", function() {
			if ($(window).scrollTop() > barOffset) {
				$('.agent_form').slideUp(500);
			}
		})
		//16_08_2017
	})
	function resetResidentialProject() {
		try {

			$('.residentialProject').find('ul.checklist').find('li').removeClass("checked");
			$('.residentialProject').find('ul.checklist').find('li').not($('.residentialProject').find('ul.checklist').find('li').nextAll('.optgroup').nextAll('li')).addClass('checked');
			$('.residentialProject').find('ul.checklist').find('li').not($('.residentialProject').find('ul.checklist').find('li').nextAll('.optgroup')).hide();
			$('.residentialProject').find('ul.checklist').find('li.optgroup').show();
			$('.residentialProject').find('ul.checklist').find('li.checked').show();
			$('.residentialProject').each(function(key, val) {
				$(this).find('ul.checklist').find('li.optgroup').not($(this).find('ul.checklist').find('li.optgroup').eq(0)).removeClass('checked');
			})
		} catch(err) {

		}
	}

	// 4 sep 2017 onward
	var topBasic;
	$(window).on('scroll', function() {
		try {

			var top = $('.search-tab.tab-container').position().top;
			if (top > topBasic) {
				$('.selectboxit-options.selectboxit-list').slideUp(0);
				$('.selectboxit-container .selectboxit.selectboxit-btn').removeClass('selectboxit-open');
			}
			topBasic = top;
		} catch(err) {
			//console.log("search-tab.tab-container not found")
		}
	})
	//
	// to hide the globe when click on other siblings on the same level //
	$(".right-header>ul>li").click(function(event) {
		if ($(this).hasClass("open")) {
			$(this).removeClass('open')
		} else {
			$('.right-header .open').removeClass('open');
			$(this).addClass('open')
		}
	});
	// end//
	// to slide up the guest bar //
	$('body').on('mousedown', '.search-row-wrap.anytime, .submit-search', function(ev) {
		$(".dropdown-row").removeClass("open");
		$(".dropdown-box").slideUp();
	})
	// end this //

	// flex slider on listing page
	var bxListing;
	$('body').on('mousedown', '.box .detail-box', function() {
		try {
			setTimeout(function() {
				$('.flexslider-listing').flexslider({
					animation : "slide",
					start : function() {
						console.log("jjjj")
						// barOffset = $('.agent-form-fixed .contact_btn').offset().top - ($('.search-bar-container').height() + $('header').height());
						// barOffset_sec = $('.agent_form-hd-fixed h2').offset().top - ($('.search-bar-container').height() + $('header').height());

						//offset of agent_form-hd-fixed in holyday.html page
					}
				});

				bxListing = $('.sale-slider .bxslider555').bxSlider({
					minSlides : 3,
					maxSlides : 3,
					useCSS : false,
					moveSlides : 3
					// AUTO
					// ends//
				});

			}, 200)

		} catch(err) {
			console.log('flexslider class is not found');
		}
	})
	// ends//
	//ends here
	// to stop closing home page slider tag on click of dots
	$('body').on('click', '.bx-pager.bx-default-pager a', function(event) {
		event.stopPropagation()

	})
	// ends//

	// to finance terms show hide management
	$('body').on('mousedown', '.financing', function() {
		$('.finance-terms').slideToggle(500)
	})
});
// define functions to reset the resedential projects
function resetResidentialProject() {

	try {

		$('.residentialProject').find('ul.checklist').find('li').removeClass("checked");
		$('.residentialProject').find('ul.checklist').find('li').not($('.residentialProject').find('ul.checklist').find('li').nextAll('.optgroup').nextAll('li')).addClass('checked');
		$('.residentialProject').find('ul.checklist').find('li').not($('.residentialProject').find('ul.checklist').find('li').nextAll('.optgroup')).hide();
		$('.residentialProject').find('ul.checklist').find('li.optgroup').show();
		$('.residentialProject').find('ul.checklist').find('li.checked').show();
		$('.residentialProject').each(function(key, val) {
			$(this).find('ul.checklist').find('li.optgroup').not($(this).find('ul.checklist').find('li.optgroup').eq(0)).removeClass('checked');
		})
		//$('.residentialProject .dropdown-value').text($('.residentialProject .optgroup').first().text());

	} catch(err) {

	}
}
