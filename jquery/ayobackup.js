//import { setTimeout } from "timers";

var initialformHeight;

var formHeight;

var formstopPoint;

var sideupR;

var formFromTop;

var windowscrollTop2;

var formtouchPoint;

var horScroll;

var calculaterPopup;

var signinCustomscrollbar;

var topStop;

var registerAs;

var M_agentlive;

var thisSearch;

var formbottomPadding;

var heightSubstract;

var agentdetailPaddingtop;

var clickEventResidential = ((document.ontouchstart !== null) ? 'change' : 'touchstart');

var clickEventglobal = ((document.ontouchstart !== null) ? 'mousedown' : 'touchstart');

var eventClickTouchGlobal = ((document.ontouchstart !== null) ? 'click' : 'touchstart');

var clickEventdetail = ((document.ontouchstart !== null) ? 'mousedown' : 'touchend');

var clickTouchendEvent = ((document.ontouchstart !== null) ? 'click' : 'touchend');

var myslider;


var holyagentTop;
var htopStop;
var hprojectDetail;
var tagsIpScroll;
var hasFlash = false;
var holydayAgentPaddingtop;
var sliderdata = "play";
var headerHeight;
var videojs_object;
var slider_settime;

function loadPage(page, yes){
	if(yes){
		window.location.href = site_url+page;			
	}else{
		return false;
	}	   		
}

var events_defination = function() {
	clickEventResidential = ((document.ontouchstart !== null) ? 'change' : 'touchstart');
	clickEventglobal = ((document.ontouchstart !== null) ? 'mousedown' : 'touchstart');
	eventClickTouchGlobal = ((document.ontouchstart !== null) ? 'click' : 'touchstart');
	clickEventdetail = ((document.ontouchstart !== null) ? 'mousedown' : 'touchend');
	clickTouchendEvent = ((document.ontouchstart !== null) ? 'click' : 'touchend');
};

$(document).ready(function() { 
	
	if ($(window).width() < 767) {
		$('.label_check').click(function() {
			$('.register-as').addClass('slideup');
		});
	}

/*append button start*/
// var $input = $('<input type="button" value="new button" class="dynamic_btn" />');
 // $input.appendTo($("body"));
// $('.dynamic_btn').click(function(){
// 	
	 // window.location.href='dashboard_banner.html';
// })

/*append button end*/
try{
$('.flexdatalist').flexdatalist({
     minLength: 1,
     searchByWord: true,
    valuesSeparator:",",
    allowDuplicateValues:false,
    //relatives: '.flexdatalist-alias'
    
});
}catch(rrr){}

var setFocus=1;

$('.flexdatalist-alias').on('input',function(){
	
	
	var inputdata=$(".flexdatalist-alias").val();
	
	
		$.ajax({
        url: site_url+"listings/ajax_get_suggestion",
         data: {
			
				'search':$(".flexdatalist-alias").val(),
				'operation_type':$("#tab").val(),
        	},
        
        dataType: "json",
        success: function(data) {
        	setFocus=1;
        	$('.flexdatalist').flexdatalist('data', data);
        	$('.flexdatalist-alias').focus();
			   abc(data);
			  console.log(data)
			   $('.item').each(function(){
			   	
			   })
			
        }
  
   });
		 
});

$('body').click(function(e){
	if(e.target){
		setFocus=0;
		// $('.flexdatalist-alias').blur();
		// $('ul.flexdatalist-results').remove('ul.flexdatalist-results');
		// $('ul.flexdatalist-results').empty();
		
		}
});



function abc(data){
	
	$('input.flexdatalist').on('after:flexdatalist.data', function(event, data ,set, options) {
      if(setFocus==1){
      	
      	
      	$('.flexdatalist-alias').focus();
     	$('.flexdatalist').flexdatalist('data', data);
       
        var t= setTimeout(function(){
         	 if(data.length>0){
					 setFocus=0;
                      clearTimeout(t)
                      }
         },1000)
				

			//flexdatalist-results
     }
      
});

}



placeHolder();
function placeHolder(){
	
$(".flexdatalist-multiple.flex0 li").eq(0).find('input').attr('placeholder','Enter Landmark,Location or Project');
$(".flexdatalist-multiple.flex0 li").eq(1).find('input').attr('placeholder','');
}
$("body").on("mousedown","#flex0-results .item",function(){
$(".flexdatalist-multiple.flex0 li").find('input').attr('placeholder','');
})

$('.optWrapper >.options').mCustomScrollbar({
		scrollInertia : 0,
		mouseWheel : {
			preventDefault : true
		},
		mouseWheelPixels : 18,
		scrollButtons : {
			enable : true
		}
	});
//$(".input-container.flexdatalist-multiple-value").eq(0).find('.flexdatalist-alias').attr('placeholder','Enter Landmark,Location or Project');

$(".tab-col .search-field input").on('keydown', function(event) {
	
	
 
 if (event.keyCode == 8) {
 setTimeout(function(){
  		$(".flex-tag-list").mCustomScrollbar("update");
  		$('.input-container #flex0').focus();
  		$('.input-container #flex1').focus();
  		$('.input-container #flex2').focus();
  		$('.input-container #flex3').focus();
		setTimeout(function() {
        $('.input-container #flex0').focus();
  		$('.input-container #flex1').focus();
  		$('.input-container #flex2').focus();
  		$('.input-container #flex3').focus();
    }, 2);
  	},10);
  }
	})







$('input.flexdatalist').on('change:flexdatalist', function(event, set, options) {
	
	
	// var time=setTimeout(function(){
		// var indexes=$('.search-tab li').find('a.active').parent().index()
	// $('.input-container #flex'+indexes).focus();
	// $('.flexdatalist-alias').focus();
	// console.log('dddddd')
	// clearTimeout(time);
	// },1000)
	

if(($('.flexdatalist').flexdatalist('value').length)>=1){
	
	$('.mCSB_buttonRight').trigger('click');
	$('.mCSB_buttonRight').click(function(){
	setTimeout(function(){
		
	$(".flex-tag-list").mCustomScrollbar("scrollTo",'#flex0');	

	$('.input-container #flex0').focus();
	$('.input-container #flex1').focus();
	$('.input-container #flex2').focus();
	$('.input-container #flex3').focus();


	setTimeout(function() {
	$('.input-container #flex0').focus();
	$('.input-container #flex1').focus();
	$('.input-container #flex2').focus();
	$('.input-container #flex3').focus();


}, 2);
	
	},200);
});	
	
}
if(($('.flexdatalist').flexdatalist('value').length)==0){
	//$('.flexdatalist-alias').attr('placeholder','Enter Landmark,Location or Project');
}


$('.fdl-remove').click(function(){
	
	placeHolder()
  	setTimeout(function(){
  		$(".flex-tag-list").mCustomScrollbar("update");
  		$('.input-container #flex0').focus();
  		$('.input-container #flex1').focus();
  		$('.input-container #flex2').focus();
  		$('.input-container #flex3').focus();
		setTimeout(function() {
        $('.input-container #flex0').focus();
  		$('.input-container #flex1').focus();
  		$('.input-container #flex2').focus();
  		$('.input-container #flex3').focus();
    }, 2);
  	},10)

  });
	
});

$('input.flexdatalist').on('select:flexdatalist', function(event, set, options) {
	
	
	console.log($('.item.active'))
	
	// var indexes=$('.search-tab li').find('a.active').parent().index()
// 	
	 // // $('.input-container #flex'+indexes).focus();
	// // $('.flexdatalist-alias').focus();
// 
// 	
	// if(indexes==0){
		// $('.input-container #flex0').focus();
		// console.log($('.input-container #flex'+indexes))
	// }
	// if(indexes==1){
		// $('.input-container #flex1').focus();
	// }
	// if(indexes==2){
		// $('.input-container #flex2').focus();
	// }
	//alert()
	
	// 
  		// $('.input-container #flex1').focus();
  		// $('.input-container #flex2').focus();
  		// $('.input-container #flex3').focus();

$('.mCSB_buttonRight').trigger('click');

var	str=$('.flexdatalist-multiple.flex0').find('li.value:last').find('span').first().text();
	if (str.indexOf(',') > -1){
		$('.flexdatalist-multiple.flex0').find('li.value:last').find('span').first().text(str.substring(0, str.indexOf(',')))
		$('.flexdatalist-multiple.flex0').find('li.value:last').append('<input type="hidden" name="search_str[]" class="search_str" value="'+str.substring(0, str.indexOf(','))+'">');
	}else{
		$('.flexdatalist-multiple.flex0').find('li.value:last').append('<input type="hidden" name="search_str[]" class="search_str" value="'+str+'">');
	}

$('.mCSB_buttonRight').click(function(){
	setTimeout(function(){
		
	$(".flex-tag-list").mCustomScrollbar("scrollTo",'#flex0');	

	$('.input-container #flex0').focus();
	$('.input-container #flex1').focus();
	$('.input-container #flex2').focus();
	$('.input-container #flex3').focus();
	setTimeout(function() {
	$('.input-container #flex0').focus();
	$('.input-container #flex1').focus();
	$('.input-container #flex2').focus();
	$('.input-container #flex3').focus();
}, 2);
	
	},200);
});	


});



	
	var datepickeranytimebool = true;
	var fadeBool = false;
	var clickbool = false;
	var setFocusOut;

	var barOffset = ""
	try {
		barOffset = $('.agent-form-fixed .contact_btn').offset().top - ($('.search-bar-container').height() + $('header').height());
		barOffset = $('.agent-form-fixed .contact_btn').offset().top + $('header').height();
	} catch (error) {

	}
	try {
		var barOffset_sec = $('.agent_form-hd-fixed h2').offset().top - ($('.search-bar-container').height() + $('header').height());
	} catch (error) {

	}
	var c = 0;
	var i = 0;
	var len,flag;
	var first;

	if ($(".video-head").parent(".home-slider").attr("class") == "home-slider") {

		videojs_object = videojs('my-video', {});
		console.log(videojs_object);
		videojs_object.on('ended', function() {
                  //  alert()
			if ($(".bx-wrapper .bxslider >li").eq(c).children().prop("tagName") == "VIDEO") {

				myslider.goToNextSlide();

				if ($(".home-slider .caption-box .detail-box").css("display") == "block") {

					if ($(".home-slider .caption-box .detail-box").hasClass("box-active")) {
						
						sliderdata = "play";
						dem();
						$(".home-slider .caption-box .detail-box").removeClass("box-active");
					}
					$(".home-slider .caption-box .detail-box").slideUp();
					$(".home-content .search-content").fadeIn(500);
				}
			}
		});
	};
	
	myslider = $('.home-slider .bxslider').bxSlider({
		mode : 'fade',
		speed : 500,
		auto : false,
		controls : false,
		easing : 'ease-out-in',
		autoStart : false,
		onSliderLoad : function(currentIndex) {
			dem();
			$('.home-slider .bxslider').children().eq(currentIndex + 1).addClass('active-slide');

		},
		onSlideBefore : function(currentSlide, currentIndex, totalSlides, currentSlideHtmlObject) {
			c = myslider.getCurrentSlide();
			dem();
			first=$('#my-video_html5_api').attr('src');
		},
		
  onSlideAfter: function($slideElement){
  	
  	
  	if(flag==1){
  		
  		if(!($($('#my-video_html5_api').parent()).hasClass('vjs-ended'))){
  			var second=$('#my-video_html5_api').attr('src');
  			if(first==second){
  			 $(($('#my-video_html5_api').parent())).addClass('vjs-ended vjs-paused');
               $(($('#my-video_html5_api').parent())).removeClass('vjs-playing');
               $('#my-video_html5_api').attr('src',"")
  			}
               
               flag=0;
  	}
  	}
  	
  	//
  	
  	
    $('.home-slider .bxslider').children().removeClass('active-slide');
    $slideElement.addClass('active-slide');
  }
	});


function supportsVideoType(type) {
  let video;

  // Allow user to create shortcuts, i.e. just "webm"
  let formats = {
    ogg: 'video/ogg; codecs="theora"',
    h264: 'video/mp4; codecs="avc1.42E01E"',
    webm: 'video/webm; codecs="vp8, vorbis"',
    vp9: 'video/webm; codecs="vp9"',
    hls: 'application/x-mpegURL; codecs="avc1.42E01E"'
  };

  if(!video) {
    video = document.createElement('video')
  }

  return video.canPlayType(formats[type] || type);
}

// Usage
if(supportsVideoType('h264') === "probably") {
  // Set the video to webm
 
 
}
else {
  // Set the video to mpeg or mp4
 
   hasFlash = true;
  
}

	function dem() {
		
		if ($(".bx-wrapper .bxslider >li").eq(c).children().prop("tagName") == "IMG") {
			//alert()
			console.log($('.vid').parent().css('display'));
			
			
			
			clearTimeout(slider_settime)
			if (sliderdata == "play") {
				// //console.log($('video').parent());



				slider_settime = setTimeout(function() {
					myslider.goToNextSlide();
				}, 4000)
			}
		} else {

			if ($(window).width() < 768) {

				$(".home-slider .bxslider >li").eq(c).css("background", "none");
			}
			clearTimeout(slider_settime);
			var source = $(".home-slider .bx-wrapper .bxslider >li").eq(c).children().attr("src");
			videojs_object.src(source);
			if(hasFlash){
					
					setTimeout(function() {				
				myslider.goToNextSlide();
				
			}, 2000)
					
					
					
				}

		}

	}


	$(".home-slider .bx-pager-item").click(function() {
		flag=1;
		clearTimeout(slider_settime);
		dem();
	})
	$(document).keydown(function(e) {
		if ($('.home-slider .bxslider').height() > $(window).scrollTop() + $('header').height() + $('.search-tab.tab-container').height()) {
			if (e.which == 39) {
				if ($(myslider).length > 0)
					myslider.goToNextSlide();
			} else if (e.which == 37) {
				if ($(myslider).length > 0)
					myslider.goToPrevSlide();
			}
		}
	});
	$('.sale-slider .bxslider').bxSlider({
		mode : 'horizontal',
		minSlides : 1,
		maxSlides : 3,
		moveSlides : 3,
		slideWidth : 400,
		swipeThreshold : 50,
		preventDefaultSwipeY : !1,
		oneToOneTouch : !1,
		preventDefaultSwipeX : !1
	});

	$('.agent-slider .bxslider').bxSlider({

		minSlides : 1,
		maxSlides : 3,
		moveSlides : 3,

	});

	var windowsize = $(window).width();
	if (windowsize < 767) {
		$('.sale-slider .bx2slider').bxSlider({
			minSlides : 2,
			maxSlides : 4,
			moveSlides : 2,
			slideWidth : 110,
			swipeThreshold : 50,
			preventDefaultSwipeY : !1,
			oneToOneTouch : !1,
			preventDefaultSwipeX : !1
		});

	} else {
		$('.sale-slider .bx2slider').bxSlider({
			minSlides : 2,
			maxSlides : 4,
			moveSlides : 2,
			slideWidth : 135,
			swipeThreshold : 50,
			preventDefaultSwipeY : !1,
			oneToOneTouch : !1,
			preventDefaultSwipeX : !1
		});
	}

	try {

		$('.flexslider-product').flexslider({
			animation : "slide",
			start : function() {
			}
		});

	} catch (err) {
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

	try {
		$users_list = $('#users_list03, #users_list04, #users_list05, #users_list02 ');
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

	/*$(".mobile-search-row ul").click(function() {
		if ($(window).width() < 768) {
			$(".search-content").addClass('open');
			$("#header").addClass('hide');

		}
	});*/
	
	$(".mobile-search-row .home-search-box").click(function() {
		if ($(window).width() < 768) {
			$(".search-content").addClass('open');
			$("#header").addClass('hide');

		}
	});

	$(".search-content .close").click(function() {
		if ($(window).width() < 768) {
			$(".search-content").removeClass('open');
			$("#header").removeClass('hide');
			$('.filter-hide').removeClass('filter-hide');
		}
	});


	$(".home-slider .caption-box .detail-box .top-row").on(clickEventdetail, function() {
		
		//myslider.startAuto();
		
		if ($(".home-slider .caption-box .detail-box").hasClass("box-active")) {
			sliderdata = "play";
			dem();
			$(".home-slider .caption-box .detail-box").removeClass("box-active");
		}
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
		//myslider.startAuto();
		if ($(myslider).length > 0) {
			$(".home-slider .caption-box .detail-box").slideUp();

		}
		if ($(".home-slider .caption-box .detail-box").hasClass("box-active")) {

			if ($(".bx-wrapper .bxslider >li").eq(c).children().prop("tagName") == "IMG") {
				sliderdata = "play";
				dem();
			}
			$(".home-slider .caption-box .detail-box").removeClass("box-active");
		}

		if ($(window).width() > 767 && $(".home-content .search-content").css('display') == "none") {
			$(".home-content .search-content").fadeIn(500);
			$(".home-slider .caption-box .detail-box").slideUp(400);
		}

		if ($(window).width() < 768) {

			$(".home-content .mobile-search-row").delay(30).fadeIn(500);
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
		if ($(myslider).length > 0) {
			
			clearTimeout(slider_settime)
			sliderdata = "stop";
		
		}
		$(".home-slider .caption-box .detail-box").slideDown().addClass("box-active");

		$('.mobile-search-row').fadeOut(300);
		$(".home-slider .caption-box .detail-box").slideDown();
		if ($(".home-content .search-content").css('display') == "block") {
			if ($(window).width() > 767) {
				$(".home-content .search-content").fadeOut();
			}
		}
		if ($(window).width() > 767) {
			clickbool = true;
		}

		if ($(window).width() < 768) {
			$('#header').addClass("hide-head");
		}

	});


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
			}, 700, function() {
				$('.product-detail .project_deatil_right .agent_form').css("display", 'block');
				$('.product-detail .project_deatil_right  .agent_details').css('padding-top', 24 + 'px')
			});
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

		if (topThis != topupdate) {
			$(".search-tab .tab-content .select-filter .residentialProject .dropdown-box.clearfix").css("display", "none");
			$(".search-tab .tab-content .select-filter .residentialProject>.dropdown-row").removeClass("open");

		}
		// to add a fix class to date picker;


		if (topThis > topupdate) {
			$('.daterangepicker').addClass('fix-datepicker');
			$(".search-row-fields.holidays").children('.guests').removeClass("open").find('.dropdown-box').hide();
		} else if (topThis < topupdate) {
			$('.daterangepicker').removeClass('fix-datepicker');
			$(".search-row-fields.holidays").children('.guests').removeClass("open").find('.dropdown-box').hide();
		}
		topupdate = topThis
	})
	// Fixed the search-content on window scrolling
	try {
		if ($(window).width() > 767) {

			var navOffset = $(".search-tab").offset().top - ($('header').height());
			var Offset = $("#main-wrapper .list-for-sale").offset().top - ($('.search-tab.tab-container').height() - $('.primary-header').height());
			$(window).bind('scroll', function() {
				if ($(window).scrollTop() > navOffset) {
					$('#header').addClass('fix');
					$('#main-wrapper').addClass('fix-row');

					$(".search-row-fields").removeClass("slideOpen");
					$(".search-row").removeClass("active");
					$(".home-content .search-content h1").css("display", "none");


					var topThis = $('.search-tab.tab-container').css("top");
							fadeBool = true;
					if (input_click_bool) {
						$(".search-row-fields").addClass("slideOpen");

					}
					if (openguest) {

					}

				} else {
					input_click_bool = false;
					openguest = false;
					fadeBool = false;
					$('#header').removeClass('fix');
					$('#main-wrapper').removeClass('fix-row');
					$(".home-content .search-content h1").css("display", "block");
					$(".tab-content").find(".sbOptions").css("display", "none");
					$(".tab-content").find(".sbToggle").removeClass("sbToggleOpen");
					if (clickbool && $(".search-content")[0].style.display != "none") {
					}
				}
				if ($(window).scrollTop() > Offset) {
				}
			});
		}
	} catch (err) {

	}

	// detail box mobile view //

	$(".horizontal-scroll-content").mCustomScrollbar({
		horizontalScroll : true,
		advanced : {
			autoExpandHorizontalScroll : true
		}
	});

	$(".language-CustomScrollbar").mCustomScrollbar({
		scrollInertia : 0,
		mouseWheel : {
			preventDefault : true
		},
		mouseWheelPixels : 18,
		scrollButtons : {
			enable : true
		}
	});

	var setg2 = setTimeout(function() {

		$(" .global-dropdown .choose-location .select-row .selectboxit-options").mCustomScrollbar({
			scrollInertia : 0,
			mouseWheel : {
				preventDefault : true
			},
			mouseWheelPixels : 18,
			scrollButtons : {
				enable : true
			}
		});
	}, 1500)

	signinCustomscrollbar = $(".signin-CustomScrollbar").mCustomScrollbar({
		scrollInertia : 0,
		mouseWheel : {
			preventDefault : true
		},
		mouseWheelPixels : 18,
		scrollButtons : {
			enable : true
		},
		advanced : {
			updateOnBrowserResize : true,
			updateOnContentResize : true
		}
	});


	$(".price_list").mCustomScrollbar({
		scrollInertia : 0,
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
	$(".residentialProject .dropdown-box, .dropdown-row.bed-row .dropdown-box, .dropdown-row.lifestyle-row .dropdown-box, .dropdown-row.post-by .dropdown-box, .dropdown-row.constract-drop .dropdown-box").mCustomScrollbar({
		scrollInertia : 0,
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
		mouseWheel : {
			preventDefault : true
		},
		mouseWheelPixels : 18,
		scrollButtons : {
			enable : true
		}
	});
	//toggle side bar

	$(".side-menu ul .expend").on(eventClickTouchGlobal, function() {
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
	$(".toggle-bar").on(eventClickTouchGlobal, function(ev) {

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
	$('body').on(eventClickTouchGlobal, '.side-menu', function(ev) {
		ev.stopPropagation();
	})
	$('body').on(eventClickTouchGlobal, '.main-menu', function(ev) {
		ev.stopPropagation();
		// to close side-menu in desktop
		if ($(window).width() > 767) {
			$('.toggle-bar').removeClass("active");
			$('#main-wrapper #header').removeClass('open-left-anim');
			$('.side-menu').removeClass('open');
			$(".side-menu ul .expend").removeClass("active");
			$(".side-menu ul .expend").find(".sub-label").slideUp();
			$('.right-header .open').removeClass('open');
		}
	})
	//main-menu end

	// to close left option bar anywhere on body
	var sidebarClose = function() {
		$('.toggle-bar').removeClass("active");
		$('#main-wrapper #header').removeClass('open-left-anim');
		$('.side-menu').removeClass('open');
		$(".side-menu ul .expend").removeClass("active");
		$(".side-menu ul .expend").find(".sub-label").slideUp();

		// right menu

		$('.hamburger').removeClass('is-active');
		$('#main-wrapper #header').removeClass('open-right-anim');
		$('.left-header .main-menu').removeClass('open');
		$(".main-expend").removeClass("active");
		$(".main-expend").find(".nav-content").slideUp();
	}

	$(document).on(eventClickTouchGlobal, 'body', function() {
		sidebarClose();
	});

	// right bar mobile
	$(".main-menu .main-expend").on(eventClickTouchGlobal, function(ev) {

		if ($(window).width() < 768) {
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
		}
	});

	$(".toggle-bar-right2").on(eventClickTouchGlobal, function(ev) {
		if ($(window).width() < 768) {
			$('.hamburger').toggleClass('is-active');
			$('#main-wrapper #header').toggleClass('open-right-anim');
			$('.left-header .main-menu').toggleClass('open');
			$(".main-expend").removeClass("active");
			$(".main-expend").find(".nav-content").slideUp();
			$('.right-header .open').removeClass('open');
			ev.stopPropagation()

		}
	});

	$(".toggle-bar").on(eventClickTouchGlobal, function(ev) {
		if ($(window).width() < 768) {
			$('.hamburger').toggleClass('is-active');
			ev.stopPropagation()

		}
	});

	// radio and checkbox
	function setupLabel() {
		if ($('.label_check input').length) {
			$('.label_check').removeClass('c_on');
			$('.label_check input:checked').parent('label').addClass('c_on');
		}
		;
		if ($('.label_radio input').length) {
			$('.label_radio').removeClass('r_on');
			$('.label_radio input:checked').parent('label').addClass('r_on');

		}
		;
	};

	$('.label_radio').click(function() {
		setupLabel();
	});
	$('.label_check').click(function() {
		setupLabel();
	});
	setupLabel();

	//****************Pricing*************
	var bool1 = true;
	var bool2 = true
	var value1, value2;
	var value3;
	var min = 'Min', max = 'Max';
	$('.range-row .min-box ul li').on('click', function() {

		$('.range-row .min-box .price-select-active').removeClass('price-select-active');
		$(this).addClass('price-select-active');
		$('.range-row .min-box .selectboxit-focus').removeClass('selectboxit-focus')
		$(this).addClass('selectboxit-focus');

		min = $(this).text();
		$(this).closest('.dropdown-row').children('.dropdown-value').text(min + '-' + max).append("<em><b>&nbsp;</b></em>");
		$(this).closest('.dropdown-row').children(".dropdown-box").find('.min-max').find('.Min').text($(this).text());

		if ($(this).index() == 0) {
		} else {
			// hide show management of max elements when a min value is selected
			$(this).parents(".min-max-range").find('.max-box').find('ul').find('li').hide();
			$(this).parents(".min-max-range").find('.max-box').find('ul').find('li').eq(0).show();
			$(this).parents(".min-max-range").find('.max-box').find('ul').find('li').eq($(this).index()).nextAll('li').show();
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

		$(".dropdown-row").removeClass("open");
		$(".dropdown-box").slideUp();

		$(this).closest('.dropdown-row').children('.dropdown-value').text(min + '-' + max).append("<em><b>&nbsp;</b></em>");
		$(this).closest('.dropdown-row').children(".dropdown-box").find('.min-max').find('.Max').text($(this).text());
		if ($(this).index() == 0) {
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

	// Posted By dropdown section
	$('.post-row.post-by .dropdown-box ul label, .dropdown-row.lifestyle-row  ul label').on('click', function() {

		var len = $(this).parents('ul').find('.c_on').length

		if (len == 1) {

			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).parents('ul').find('.c_on').eq(0).text()).append('<em><b>&nbsp;</b></em>');
		} else if (len == $(this).closest('ul').children('li').length) {

			$(this).closest('.dropdown-row').children('.dropdown-value').text('All').append('<em><b>&nbsp;</b></em>');
		} else if (len == 0) {

			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).closest('.dropdown-row').attr('default-text')).append('<em><b>&nbsp;</b></em>');
		} else if (len != $(this).parents('ul').children('li').length) {

			$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).parents('ul').find('.c_on').length + ' Selected').append("<em><b>&nbsp;</b></em>");
		}
	});


	$('.increase-num-wrap .anytext').click(function() {
		$(this).closest('.dropdown-row').children('.dropdown-value').text($(this).text()).append('<em><b>&nbsp;</b></em>');
		$(this).closest('.dropdown-row').children('.dropdown-box').slideUp();
		$(this).closest('.dropdown-row').removeClass('open');
		$(this).siblings("li").find("label").removeClass("c_on");
		$(this).siblings("li").find('input:checked').attr("checked", false);
	})
	
	
	// new code // for tags input //
	var st = setTimeout(function() {

		tagsIpScroll = $(".flex-tag-list").mCustomScrollbar({
			axis : "x",
			scrollTo:'#flex0',
			advanced : {
				 updateOnContentResize: true,
                  
				autoExpandHorizontalScroll : true //optional (remove or set to false for non-dynamic/static elements)
			},
			scrollInertia : 0,
			mouseWheel : {
				preventDefault : true
			},
			mouseWheelPixels : 18,
			scrollButtons : {
				enable : true
			}
		});
		
		//

	}, 10)
	// add index //
	// var indexTags = function(elem) {
		// thisSearch = $(elem).closest('.tab-col').find('.search-field .bootstrap-tagsinput .mCSB_container .label-info');
		// currentElem = $(elem).closest('.tab-col').find('.search-field .bootstrap-tagsinput').children('.label-info');
		// thisSearch.each(function(id, elem) {
			// if ($(currentElem).text().trim() == $(elem).text().trim()) {
				// currentElem.remove()
				// currentElem = '';
			// } else {
// 
			// }
		// })
// 
		// $('.tab-content .tab-col .search-field .bootstrap-tagsinput .mCSB_container input').before(currentElem);
		// $('.tab-content .tab-col .search-field .bootstrap-tagsinput input').attr("placeholder", "Add Places")
		// $('.tab-content .tab-col .search-field .bootstrap-tagsinput .mCSB_container input').addClass('input-hold');
		// setfocus = setTimeout(function() {
			// if ($('.input-hold')[elem.closest('.tab-col').index()]) {
				// $('.input-hold')[elem.closest('.tab-col').index()].focus();
			// }
		// }, 200)
	// }
	// remove tags //
	// var M_tagsremoveIndex = function(elem, curIdx) {
// 
		// elem.closest(".tab-col").siblings().each(function(ind, el) {
			// $(el).find(".search-field .label-info").eq(curIdx).remove();
		// })
		// elem.parent().remove();
		// if ($(".tab-1").find(".tags-default .label-info").length == 0) {
			// $(".tab-col .search-field .bootstrap-tagsinput input").attr("placeholder", "Enter Landmark, Location Or Project");
			// $(".tab-3 .bootstrap-tagsinput input").attr("placeholder", "Enter Landmark or Location");
			// $(".tab-col .search-field .bootstrap-tagsinput input").removeClass('input-hold');
		// }
		// $(tagsIpScroll).mCustomScrollbar("update");
	// }
	// ends //

	// backspace index //
	// var backspaceIndex = function(elem, ev) {
// 
		// if (ev.keyCode == 8) {
			// //alert()
			// if ($(ev.target).val() == '') {
// 				
				// // code here for back space button future reference
				// var crumbs = $(elem.closest('.tab-col').find('.search-field .bootstrap-tagsinput .label-info'));
				// var newcrumbs = crumbs.slice(0, -1);
// 				
				// //var newformed = backtags.get().splice(-1, 1);
				// $('.tab-col .search-field .bootstrap-tagsinput .mCSB_container .label-info').remove()
				// $('.tab-col .search-field .bootstrap-tagsinput .mCSB_container').prepend(newcrumbs);
// 
				// if ($(".tab-1").find(".tags-default .label-info").length == 0) {
					// $(".tab-col .search-field .bootstrap-tagsinput input").attr("placeholder", "Enter Landmark, Location Or Project");
					// $(".tab-3 .bootstrap-tagsinput input").attr("placeholder", "Enter Landmark or Location");
					// $(".tab-col .search-field .bootstrap-tagsinput input").removeClass('input-hold');
				// }
				// $(tagsIpScroll).mCustomScrollbar("update");
				// var setfocusr = setTimeout(function() {
					// if ($('.input-hold')[elem.closest('.tab-col').index()]) {
						// $('.input-hold')[elem.closest('.tab-col').index()].focus();
					// }
				// }, 50)
				// ev.preventDefault();
			// } else {
				// //do text back here
			// }
		// }
	// }
	// ends //

	// $('.search-field input').on('itemAdded', function(event) {
// 		
		// indexTags($(this));
// 		
// 	
	// });
	
// $('.tab-col .search-field input').tagging(countries);
// $('.bootstrap-tagsinput').find('.tagging_ul').first().hide();
// $('.bootstrap-tagsinput').find('.tagging_ul .tagging_new_input').first().hide();


		
		
	
	// $('body').on(clickEventglobal, '.tab-col .label-info span', function(event) {
// 
		// var curIndx = $(this).parent().index();
// 
		// M_tagsremoveIndex($(this), curIndx);
// 
	// })
	// $(".tab-col .search-field input").on('keydown', function(event) {
// 
        // backspaceIndex($(this), event);
//         
// 
	// })
	// listing page starts //

	var backspaceListing = function(elem, ev) {
		if (ev.keyCode == 8) {
			if ($(ev.target).val() == '') {
				// code here for back space button future reference
				var crumbsI = $(elem.closest('.search-form').find('.bootstrap-tagsinput .label-info'));
				var newcrumbsI = crumbsI.slice(0, -1);
				$('.search-form').find('.bootstrap-tagsinput .label-info').remove()
				$('.search-form .bootstrap-tagsinput .mCSB_container').prepend(newcrumbsI);

				if ($(".search-form").find(".tags-default .label-info").length == 0) {
					$(".search-form .tags-default .bootstrap-tagsinput input").attr("placeholder", "Enter Landmark, Location Or Project");
					$(".search-form .tags-default .bootstrap-tagsinput input").removeClass('input-hold');
				}
				$(tagsIpScroll).mCustomScrollbar("update");
				var setfocusl = setTimeout(function() {

					$('.input-hold').focus();

				}, 50)
				ev.preventDefault();
			} else {
				//do text back
			}

		}
	}
	var updateListingScroll = function(thiEL) {
		var thisSea = $(thiEL).closest('.listing-page').find('.search-form .bootstrap-tagsinput .mCSB_container .label-info');
		var currentElem = $(thiEL).closest('.listing-page').find('.search-form .bootstrap-tagsinput').children('.label-info');

		thisSea.each(function(id, elem) {
			if ($(currentElem).text().trim() == $(elem).text().trim()) {
				currentElem.remove()
				currentElem = '';
			} else {

			}
		})

		$('.listing-page .search-form .bootstrap-tagsinput .mCSB_container input').before(currentElem);
		$('.listing-page .select-menu .bootstrap-tagsinput .mCSB_container input').attr('placeholder', "Add Places")
		$('.listing-page .select-menu .tags-default input').addClass('input-hold');
		var stout = setTimeout(function() {
			$('.listing-page .select-menu .bootstrap-tagsinput .mCSB_container input').focus().attr('placeholder', "Add Places")

		}, 200)

	}
	var M_funListRemove = function(thi) {
		$(tagsIpScroll).mCustomScrollbar("update");
		$(thi).parent().remove();
		if ($('.listing-page .select-menu .tags-default .label-info').length == 0) {
			$('.listing-page .select-menu .tags-default input').attr("placeholder", "Enter Landmark, Location Or Project");
			$('.listing-page .select-menu .tags-default input').removeClass('input-hold');
		}
	}

	$(".listing-page .search-form .tags-default input").on('keydown', function(event) {

		backspaceListing($(this), event);

	})

	$('.listing-page .search-form input').on('itemAdded', function(event) {

		updateListingScroll($(this))
	});

	$('body').on(clickEventglobal, '.listing-page .label-info span', function() {

		M_funListRemove($(this))
	})
	// to remove on backspace
	var input_click_bool = false;
	var opened_slidebar = "yes";
	var openguest = false;
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

	$('body').on('click','.more-map-btn',function(e) {
		
		
		$('.listing-wrap').toggleClass('listing-wrap-open');
		if ($(this).parents().hasClass("listing-wrap-open")) {
			$(this).text('more list');
		} else {
			$(this).text('more map');
		}   
	});

	//For Tabbing 
	$('.tab-row a').click(function(e) {

setTimeout(function(){
  		$(".flex-tag-list").mCustomScrollbar("update");
  		$('.input-container #flex0').focus();
  		$('.input-container #flex1').focus();
  		$('.input-container #flex2').focus();
  		$('.input-container #flex3').focus();
		setTimeout(function() {
        $('.input-container #flex0').focus();
        $('.input-container #flex1').focus();
  		$('.input-container #flex2').focus();
  		$('.input-container #flex3').focus();
    }, 2);
  	},10);
		e.preventDefault();
		$(this).closest('.home-content').find('.tab-row').siblings('.tab-content').find('.tab-row-select').find('.selectboxit-text').text($(this).text()).attr("data-val", $(this).text());
		$('.tab-row li').find('.active').removeClass('active');
		var index = $(this).parent().index();

		$('.search-tab .tab-row li').eq(index).find('a').addClass('active');

		$(this).addClass('active');
		//$(this).addClass('active22');
		
		// custom code to return false
		return false;
		
		$(this).closest('.home-content').find('.tab-container').children('.tab-content').children().hide();
		// to set value in  selectboxit-text when searchbar become sticky
		$(this).closest('.home-content').find('.search-tab').find('.tab-row-select .selectboxit-text').text($(this).parent().text().trim())
		// end

		//when a tab changes the previous one should be clearall start
		$('.search-row-fields .clear-btn').click();
		$("ul.selectboxit-options").slideUp();
		//  end
		
		$(this).closest('.home-content').find('.tab-container').children('.tab-content').children().eq(index).show();
		$(this).closest('.home-content').find(".search-tab").children(".tab-content").find(".select-filter ").find(".slideOpen").find(".dropdown-box").find('.c_on').removeClass("c_on");
		$(this).closest('.home-content').find(".search-tab").children(".tab-content").find(".slideOpen").children().each(function() {
		});
		if (datepickeranytimebool) {


			if ($(this).hasClass("tab3 active")) {
				$(".search-row-wrap.anytime span").text(" ");
				$(".search-row-wrap.anytime span.dateinput-start").text("Anytime");
				$(".cross-btn-cal").css("display", "none");
			}
			datepickeranytimebool = false;
		}

	});


	$('body').on(clickEventglobal, '.guest-sib', function() {

		calculaterPopup("close");

		$(this).find('.dropdown-box').slideToggle();
		if ($(this).hasClass('open')) {
			$(this).removeClass('open');
		} else {
			$(this).addClass('open');
		}

	})
	$('body').on(clickEventglobal, '.guest-sib .dropdown-box,.guest-sib ', function(ev) {

		ev.stopPropagation();
	})

	$('body').on(clickEventglobal, function(ev) {


		$(this).find('.guest-sib .dropdown-box').slideUp();
		$(this).find('.guest-sib').removeClass('open')
	})
	$('body').on('click', ".dropdown-row", function(event) {
		// a check to avoid click on advance search block dropdown row

		event.preventDefault();
		if ($(this).hasClass("open")) {

			$(this).parents(".tab-content ,.search-bar-container").find("*").removeClass("open");
			$(this).find(".dropdown-box").slideUp("fast", function() {
			});
			$('.dropdown-row.guests').removeClass('open');
			$('.listing-page .bed-advance').closest('.dropdown-baths').addClass('dropdown-baths_active');
		} else {

			$(this).siblings().find(".dropdown-box").slideUp("fast", function() {
			});
			$(this).parents('.select-menu').find(".dropdown-box").slideUp("fast", function() {
			});
			$(this).children(".dropdown-box").slideDown("fast", function() {
			});
			$('.dropdown-row.guests').addClass('open');
			$('.listing-page  .bed-advance').closest('.dropdown-baths').removeClass('dropdown-baths_active');
			$(this).addClass("open").parents(".tab-content ,.search-bar-container").find("*").not($(this)).removeClass("open");
		}

		if ($(window).width() < 768) {
			if ($(this).parent().hasClass('residentialProject')) {
				$('.search-row-fields .dropdown-box').slideUp(300);
			} else {
				$('.residentialProject .dropdown-box').slideUp(300);
			}
		}
		$(this).parent("")

	})
	var DropDownStatus = false;
	$(".dropdown-box").click(function(event) {

		// for listing page//

		if ($(event.target.closest('.dropdown-box')).hasClass('bed-advance')) {
			$('.bed-advance').slideUp(300);

			$('.bed-advance').closest('.dropdown-baths').removeClass('dropdown-baths_active');
		}
		// ends //
		// close on outside click
		if ($('.bed-advance').height() > 50) {
			$('.bed-advance').slideUp(300);
			$('.bed-advance').closest('.dropdown-baths').removeClass('dropdown-baths_active');
		}
		// ends
		event.stopPropagation();

	});

	$(".search-prop-blk").on("click", function() {
		$(this).addClass('sh-contain-open')
		$(this).next(".search-bar-container").addClass("on");
		$('.tab-row-wrap .filter-blk ').addClass('filter-hide');
	});
	$(".close").on("click", function() {
		$('.sh-contain-open').removeClass('sh-contain-open')
		$(".search-bar-container").removeClass("on");
	})

	// 26_7_2017 // popup> chose location >> to manage closing of popup on same popup click
	$('.global-dropdown,.custom-form li label').on('click', function(event) {
	})

	$('.global-dropdown').on('click', function(event) {
		if (event.target.className == 'sbFocus') {
			$('.makeActive').removeClass('makeActive');
			event.target.setAttribute('class', 'makeActive');
		}
		event.stopPropagation();

	})

	//11_08_2017 guest section in Holidays Tab//  holyday-tab>guest
	var adult_old = parseInt($('.adults').find("span.quntity-input").eq(0).text());

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


		if (infants_old >= 1) {
			$(".dropdown-row .add-guest").text(adult_old + children_old + " " + "Guests" + "," + infants_old + "infants");
		} else {
			$(".dropdown-row .add-guest").text(adult_old + children_old + " " + "Guests");
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
		if (infants_old >= 1) {
			$(".dropdown-row .add-guest").text(adult_old + children_old + " " + "Guests" + "," + infants_old + "infants");
		} else {
			$(".dropdown-row .add-guest").text(adult_old + children_old + " " + "Guests");
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

		if (infants_old >= 1) {
			$(".dropdown-row .add-guest").text(adult_old + children_old + " " + "Guests" + "," + infants_old + "infants");
		} else {
			$(".dropdown-row .add-guest").text(adult_old + children_old + " " + "Guests");
		}
	});

	//clear- on Guest section in Holidays tab 

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


	var doubleClickBuy = true;

	if ($(".selectboxinit").length > 0) {
		selectBox = $(".select.selectboxinit").selectBoxIt({
			showEffect : "slideDown",
			hideEffect : "slideUp",
			hideEffectSpeed : 200,
			showEffectSpeed : 200
		}).change(function() {

			$('.tab-row li').eq(this.selectedIndex).find('a').trigger('click');

			$('.selectboxit-options.selectboxit-list').slideUp(10);
			$('.selectboxit-open').removeClass('selectboxit-open');

		});

	}


	if ($(".selectThis").length > 0) {
		selectBox = $(".selectThis").selectBoxIt({
			showEffect : "slideDown",
			hideEffect : "slideUp",
			hideEffectSpeed : 200,
			showEffectSpeed : 200
		})
	}

	$(window).on("load", function() {

		$('.tab-row-select .selectboxit-text').text($('.select-row.tab-row-select select').children().first().text());
	})
	//to change the tab when clicked on selectbox buy/ rent

	if ($(window).width() >= 768) {

		// for tabbing in sale and holyday popup

		$('.tabing_list li a').on('click', function() {
			$(this).closest('ul').find('li').removeClass("active");
			$(this).parent().addClass("active");
			var index = $(this).parent().index();
			$(this).closest('.overveiw_section_inner').next().find('.tab_content_inner').removeClass("active");
			$(this).closest('.overveiw_section_inner').next().find('.tab_content_inner').eq(index).addClass("active");

		})

	}

	// started here energy section

	$("body").on(clickEventglobal, '.feature_section_list li', function() {
		// for product  Detail page //

		if ($('.product_detail-page').length > 0) {
			if ($('.energy_balance_box').css('display') == "none") {
				energyGlobalProduct("attatch")
			} else if ($('.energy_balance_box').css('display') == "block") {
				energyGlobalProduct("dont-attatch")
			}
		}
		//  for listing page //
		if ($('.listing-page').length > 0) {

			if ($('.energy_balance_box').css('display') == "none") {
				energyGlobalListing("attatch")
			} else if ($('.energy_balance_box').css('display') == "block") {
				energyGlobalListing("dont-attatch")
			}
		}
	})
	var energyGlobalProduct = function(step) {

		var energyOffsetProduct = $('.energy_balance').offset().top;
		var energyHead = ($('#header').height() + $('.search-bar-container.search-bar-container-02').height());

		if ($(window).width() < 768) {
			energyHead = parseInt($('#header').height()) + 8;
		}


		if (step == "attatch") {
			$(".energy_balance_box").slideDown(500, "linear");
			$(".feature_section_list li a").fadeOut();

			$('body, html').animate({
				scrollTop : energyOffsetProduct - energyHead
			}, 500)

		} else if (step == "dont-attatch") {
			$(".energy_balance_box").slideUp(500, "linear");
			$(".feature_section_list li a").fadeIn();
		}

	}
	// listing starts //
	var energyGlobalListing = function(step) {

		var energyOffsetListing = $('.energy_balance').offset().top;
		var energyHead = $('.search-bar-container.search-bar-container-02').outerHeight();

		if (step == "attatch") {
			$(".energy_balance_box").slideDown(500, "linear");
			$(".feature_section_list li a").fadeOut();

			$('body, html').animate({
				scrollTop : energyOffsetListing - energyHead
			}, 500)

		} else if (step == "dont-attatch") {
			$(".energy_balance_box").slideUp(500, "linear");
			$(".feature_section_list li a").fadeIn();
		}

	}
	// ended energy section
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


	$(".search-field input").click(function(event) {
		$(".select-row").find(".dropdown-row").find(".dropdown-box").slideUp("fast");
		$(this).parents(".tab-content").find("*").removeClass("open");
		$(".search-row-fields").addClass("slideOpen");
		$(".search-row").addClass("active");
		event.stopPropagation();

		$('.tab-3 .dropdown-row.guests .dropdown-box').slideUp(300);

	});


	$('.tab_drawer_heading').click(function(e) {
		if ($(window).width() <= 767) {
			$(this).next().slideToggle();
		}
	});

	$(".signin-popup .close").click(function() {
		$("body").removeClass("remove-scrll");
	});
	$(".mobile-search-row").click(function() {
		if ($(window).width() <= 767) {
			$("body").addClass("remove-scrll");
		}
	});
	$(".search-prop-blk form").click(function() {
		if ($(window).width() <= 767) {
			$("body").addClass("remove-scrll");
		}
	});
	$(".search-content .close").click(function() {
		$("body").removeClass("remove-scrll");
	});

	$('.toolbar-left .select-menu li .buy-row  li a,.toolbar-left .select-menu li .bed-row  li a').click(function() {
		$('.toolbar-left .select-menu li .buy-row  li a.active,.toolbar-left .select-menu li .bed-row  li a.active').removeClass('active');
		$(this).addClass('active');
		$(this).closest('.buy-row').children('.dropdown-value').text($(this).parent('li').find('a').text()).append('<em><b>&nbsp;</b></em>');
		$(this).closest('.bed-row').children('.dropdown-value').text($(this).parent('li').find('a').text()).append('<em><b>&nbsp;</b></em>');
	})
	//clear-btn all dropdown-row 

	$(".tab-content .clear-btn").click(function(event) {
		event.stopPropagation();

		$(this).parents(".tab-content").find(".search-row-fields").find('input:checked').attr("checked", false);
		setupLabel();
		$(this).parents(".tab-content").find(".search-row-fields").children().each(function() {

			$(this).find(".dropdown-value").text($(this).attr("default-text")).append("<em><b>&nbsp;</b></em>")
		});

		// status-row in tab 4 reset

		$('.tab-4 .status-row .selectboxit-text').text($('.tab-4 .status-row .select').find('option').eq(0).text());
		$('.tab-4 .status-row .selectboxit-options .selectboxit-selected').removeClass('selectboxit-selected');
		$('.tab-4 .status-row .selectboxit-options .selectboxit-focus').removeClass('selectboxit-focus');

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
		$('.range-box.min-max-range .max-box').find('ul').find('li').show();
		$('.range-box.min-max-range .min-box').find('ul').find('li').show();
		min = 'Min', max = 'Max';

		// to clear bed value

		$('.advance-box').closest('.dropdown-row').find('.dropdown-value').get(0).firstChild.nodeValue = $('.advance-box').closest('.dropdown-row').attr('default-text').trim();
		$('.advance-box').closest('.dropdown-row').find('.dropdown-box .active').removeClass('active');
	});
	// clear all for listing page

	$(".clear-all.clear-btn").click(function(event) {


		event.stopPropagation();
		// checked false//
		$(this).parents(".search-bar-container").find('input:checked').attr("checked", false);
		// ends//

		$(this).parents(".search-bar-container").find('*').removeClass('c_on');

		resetResidentialProject();

		// to fill the default text on listing page
		$(this).parents(".search-bar-container").find('.dropdown-row .dropdown-value').each(function(index, elem) {
			$(this).text($(this).attr('default-text')).append('<em><b>&nbsp;</b></em>')
			$(this).next().find('.active').removeClass('active');
		})
		// select box it default text
		$(this).closest('.search-bar-container').find(".toolbar-left .advance-search .selectboxit-container").each(function(ind, elem) {
			$(this).find('.selectboxit-text').text($(this).find('li:first-child').text().trim())
		})
		// ends

		// to clear the input val
		$(this).closest('.search-bar-container').find(".toolbar-left .advance-search input:text, .toolbar-left .advance-search textarea").val('')

		// to close the class of baths in advance search row
		$(this).closest('.search-bar-container').find(".toolbar-left .advance-search .dropdown-baths_active").removeClass('dropdown-baths_active');

		// to slide up the dropdown-box
		$(this).closest(".search-bar-container").find('.dropdown-box').slideUp(300);
		$(this).closest(".search-bar-container").find('.dropdown-row').removeClass('open');

		// min max group

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
		// ends

	})
	
	
	$(document).on('click', function(e) {

		if ($(e.target).closest(".search-row-fields").length === 0) {
			$(".search-row-fields").removeClass("slideOpen");
			$(".search-row").removeClass("active");
			input_click_bool = false;
		}
		;

		if ($(e.target).closest(".dropdown-row").length === 0) {
			$(".dropdown-row").removeClass("open");
			$(".dropdown-box").slideUp();
		}
		;
		if ($(e.target).closest(".right-header ul > li").length === 0) {
			$(".right-header ul > li").removeClass("open");
		}
		;

		if ($(window).width() > 767) { 

		} else {

		}

	});


	$('.slider-tab-row').children().not($('.slider-tab-row .slider-tab-content:first-child')).hide();
	$(".flexslider-wrap").find(".slider-tab-content.common-box:first-child").addClass("current_common_box");
	$(".slider-tab-links li").click(function(e) {
		if ($(this).index() != $(this).closest(".flexslider-wrap").find(".common-box.current_common_box").index()) {
			$(".current_common_box").removeClass("current_common_box");
			$(this).closest(".flexslider-wrap").find(".common-box").hide();
			$(this).closest(".flexslider-wrap").find(".common-box").eq($(this).index()).show()
		}
	});


	$(".flexslider-wrap .wishlist").click(function() {
		$(this).toggleClass("active");
	});

	$(".search-row-wrap.anytime").on(eventClickTouchGlobal, function(e) {
		// to close the left menubar//
		$('.toggle-bar').removeClass("active");
		$('#main-wrapper #header').removeClass('open-left-anim');
		$('.side-menu').removeClass('open');
		$(".side-menu ul .expend").removeClass("active");
		$(".side-menu ul .expend").find(".sub-label").slideUp();
		// ends//
		$('.right-header .open').removeClass('open');
	});


	$(document).on("click", 'body', function(ev) {

		if ($(".search-row-wrap.anytime .dateinput-start").text().trim() == "Check In" && $(".search-row-wrap.anytime .dateinput-end").text().trim() == "Check Out") {
			$(".search-row-wrap.anytime").addClass('arrangWidth');
			$(".search-row-wrap.anytime span").text(" ");
			$(".search-row-wrap.anytime span").removeClass("active-offer");
			$(".search-row-wrap.anytime .dateinput-start").text("Anytime");
			$(".cross-btn-cal").css("display", "none");
		} else {
			$(".search-row-wrap.anytime span").removeClass("active-offer");

		}

	})
	
	// to stop the bubbling of click event on daterangepicker

	$(document).on("click", 'body .anytime, .daterangepicker ', function(event) {
		event.stopPropagation();
	})


	$(".calculator_popup").click(function(event) {
		event.stopPropagation();
	})
	$(".inner-detail-popup").click(function(event) {
		event.stopPropagation();
	})

	var ajaxInterval = '';
	$(window).load(function() {

		//resetResidentialProject();

		$('.select-row .checklist li').on(clickEventResidential, function(eve) {

			$(this).toggleClass('checked');

            


         // console.log("hello", $(this).find('input').is(':checked'))


			if ($(this).hasClass('optgroup')) {

				var cureentIndex = ($(this).nextAll('.optgroup').index() == -1) ? $(this).nextAll('li').addClass('checked') : $(this).nextAll('.optgroup').prevAll('li').addClass('checked');
				if ($(this).nextAll('.optgroup').index() == -1) {
					$(this).addClass('checked')
					$(this).find('input').prop('checked',true);
				}
				$(this).nextAll('.optgroup').prevAll('li').addClass('checked');
				$(this).nextAll('.optgroup').prevAll('li').find('input').prop('checked',true);
                

				$(this).prevAll('li').removeClass('checked');
				$(this).prevAll('li').find('input').prop('checked',false);
                

				$(this).nextAll('.optgroup').removeClass('checked');
				$(this).nextAll('.optgroup').find('input').prop('checked',false);
                

				$(this).nextAll('.optgroup').nextAll('li').removeClass('checked');
                $(this).nextAll('.optgroup').nextAll('li').find('input').prop('checked',false);


				$(this).closest('.increase-num-wrap').find('.dropdown-value').text($(this).text()).append('<em><b>&nbsp;</b></em>');
				// hide the element and to show the list of current
				$(this).closest('.checklist').find('li').not('.optgroup').hide();
				$(this).nextUntil($('.optgroup'), "li").show(0);
			}
			if (!$(this).hasClass('optgroup')) {

				$(this).prevAll('.optgroup').prevAll('li').removeClass('checked');
				$(this).prevAll('.optgroup').prevAll('li').find('input').prop('checked',false);


				$(this).nextAll('.optgroup').removeClass('checked');
				$(this).nextAll('.optgroup').find('input').prop('checked',false);


				$(this).nextAll('.optgroup').nextAll('li').removeClass('checked');
				$(this).nextAll('.optgroup').nextAll('li').find('input').prop('checked',false);


				// to calculate length of checked input in current element
				var checkedLen = $(this).parents('.select-row').find('.checklist li.checked').not($(this).prevAll('.optgroup')).length;

				var nextOptGroupIndex = ($(this).nextAll('.optgroup').index() == -1) ? $(this).parent('.checklist').children('li').length : $(this).nextAll('.optgroup').index();
				if (checkedLen == ((nextOptGroupIndex - $(this).prevAll('.optgroup').index()) - 1)) {

					$(this).closest('.increase-num-wrap').find('.dropdown-value').text($(this).prevAll('.optgroup').first().text()).append('<em><b>&nbsp;</b></em>');
					$(this).prevAll('.optgroup').not($(this).prevAll('.optgroup').prevAll('.optgroup')).addClass('checked');
					$(this).prevAll('.optgroup').not($(this).prevAll('.optgroup').prevAll('.optgroup')).find('input').prop('checked',true);


				} else if (checkedLen != ((nextOptGroupIndex - $(this).prevAll('.optgroup').index()) - 1)) {
					$(this).prevAll('.optgroup').removeClass('checked');
					$(this).prevAll('.optgroup').find('input').prop('checked',false);
                    


					if (checkedLen == 0) {
						$(this).closest('.increase-num-wrap').find('.dropdown-value').text('Residential Project').append('<em><b>&nbsp;</b></em>');
					} else if (checkedLen == 1) {
						$(this).closest('.increase-num-wrap').find('.dropdown-value').text($(this).find('label').text()).append('<em><b>&nbsp;</b></em>');
					} else if (checkedLen > 1) {
						$(this).closest('.increase-num-wrap').find('.dropdown-value').text(checkedLen + " Selected").append('<em><b>&nbsp;</b></em>');
					}

				}
			}

		   clearTimeout(ajaxInterval); // 
		   ajaxInterval = setTimeout(function(){
			submitListingSearchForm();
		   },500);
				
		});

	

		try {
			var contantOffset = $('.content').offset().top;

		} catch (err) {

		}

		// global variables
		var thresholdDetailbox;

		if ($('.home-slider .caption-box .detail-box').length > 0) {

			var setTimeVar = setTimeout(function() {

			}, 1500)

		}

		var lastScrollTop = 0;
		var scrollDerection;
		$(window).on('scroll', function(event) {
			// function activated on listing page to add a class when index page offset is zero

			var thisscrollTop = $(this).scrollTop();
			if (thisscrollTop > lastScrollTop) {
				// downscroll code
				scrollDerection = "downscroll";

			} else {
				// upscroll code
				scrollDerection = "upscroll"
			}

			L_topset();

			// for mobile - to make search bar display: block

			M_searchbar()

			if ($('.agent-start').length > 0) {
				M_agentlive(scrollDerection);
			}

			if ($('.home-slider .caption-box .detail-box').length > 0) {

				thresholdDetailbox = $('.home-slider').offset().top + $('.home-slider').height() - $('.primary-header').outerHeight() + $('.search-tab').outerHeight() - 100;


				if ($(window).width() < 768)
					thresholdDetailbox = $('.home-slider').offset().top + $('.home-slider').height() - $('.primary-header').outerHeight();

				M_detailboxMobile(thresholdDetailbox, scrollDerection)
			}

			lastScrollTop = thisscrollTop;


			if ($('.holyday-start').length > 0) {
				holydayStart()
			}

		});

		//to close agent_form on body click 16_08_2017
		$("body").on("click", function() {
			if ($(window).scrollTop() > barOffset) {
			}
		})
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
		} catch (err) {

		}
	}

	var topBasic;
	$(window).on('scroll', function() {
		try {

			var top = $('.search-tab.tab-container').position().top;
			if (top > topBasic) {
				$('.selectboxit-options.selectboxit-list').slideUp(0);
				$('.selectboxit-container .selectboxit.selectboxit-btn').removeClass('selectboxit-open');
			}
			topBasic = top;
		} catch (err) {
		}
	})
	//
	// to hide the globe when click on other siblings on the same level //
	$('body').on(eventClickTouchGlobal, ".right-header>ul>li", function(event) {

		sidebarClose();

		if ($(this).hasClass("open")) {


			$(this).removeClass('open')
		} else {
			$('.right-header .open').removeClass('open');
			$(this).addClass('open')
		}

		event.stopPropagation();

	});

	$('body').on(eventClickTouchGlobal, function(event) {
		$('.right-header .open').removeClass('open');

	})
	$('body').on(eventClickTouchGlobal, '.global-dropdown', function(event) {

		event.stopPropagation()

	})

	$('body').on('click', '.signin-dropdown', function(event) {
		event.stopPropagation();
	})
	// end//
	// to slide up the guest bar //

	$('body').on(clickEventglobal, '.search-row-wrap.anytime, .submit-search', function(ev) {
		$(".dropdown-row").removeClass("open");
		$(".dropdown-box").slideUp();
	})
	// end this //

	// flex slider on listing page
	var bxListing;

	var listingRootScrltop;

	$('body').on('click', '.listing-page .box .detail-box', function(e) {
		listingRootScrltop = $(window).scrollTop();

		$('html, body').animate({
			scrollTop : 0
		}, 0)

		if ($(window).width() > 767) {
			$("." + $(this).attr("data-id")).addClass("active");
			$(".lightbox, .prop-details-popup, .listing-page-popup").addClass("active");
			e.stopPropagation();
			//  end

			// to close the active right hrader list

			$('.right-header>ul>li').removeClass('open')

			try {
				setTimeout(function() {
					var new_obj = $(".inner-detail-popup.active").children()

					new_obj.find('.flexslider-listing').flexslider({
						animation : "slide"
					});
					// make bx slider if this not made allready in listing page
					if (new_obj.find('.bxslider555').children().hasClass('bx-clone') == false) {
						bxListing = new_obj.find('.bxslider555').bxSlider({
							minSlides : 3,
							maxSlides : 3,
							moveSlides : 3,
							slideWidth : 400
						});
					}
				}, 200)

			} catch (err) {
			}
		}
	})
	// to stop closing home page slider tag on click of dots
	$('body').on(clickEventglobal, '.bx-pager.bx-default-pager a', function(event) {
		event.stopPropagation()
	})

	$('body').on(clickEventglobal, '.financing label', function() {
		var setF = setTimeout(function() {
			$('.finance-terms').toggleClass('active');
			$('.finance-terms').slideToggle(500, function() {
				if ($('.finance-terms').hasClass('active')) {
					$('.financing input').prop('checked', true);
				} else {
					$('.financing input').prop('checked', false);
				}
			});
		}, 50)

	})
	// temp click on project under prog
	$('.dropdown-number li').on('click', function() {
		$(this).closest('.dropdown-row').find('.dropdown-value').get(0).firstChild.nodeValue = $(this).text().trim()
		$(this).closest('.dropdown-row').removeClass('open');
		$(this).closest('.dropdown-number').slideUp(300);
		$(this).closest('.dropdown-row').find('.constract-active').removeClass('constract-active');
		$(this).addClass('constract-active');
	})
	// mobile index tabbing
	// ends
	// listing page
	$(".dropdown-baths").click(function(event) {
		event.preventDefault()
		if ($(this).parents(".dropdown-row").hasClass("open") && $(this).hasClass("dropdown-baths_active")) {
			$(this).find(".dropdown-box").slideUp("fast");
			$(this).removeClass("dropdown-baths_active");
		} else {
			$(this).addClass("dropdown-baths_active");
			$(this).find(".dropdown-box").slideDown("fast");
		}

	});

	$(".prop-details-popup .close-value").click(function() {
		$(".lightbox, .prop-details-popup .inner-detail-popup,.listing-page-popup").removeClass("active");
		$('body, html').animate({
			scrollTop : listingRootScrltop
		}, 0)
	});

	$('body').on('click', '.lightbox', function() {
		$('body, html').animate({
			scrollTop : listingRootScrltop
		}, 0)
	})

	$(".signin-box").click(function() {
		$("body").addClass("active-signin");
		$("body").addClass("active");
		$(".signin-popup , .lightbox").addClass("active");
	});


	$(".lightbox, .signin-popup .close").click(function() {
		$("body").removeClass("remove-scrll");
		$(".lightbox, .prop-details-popup .inner-detail-popup, .listing-page-popup , body, .signin-popup").removeClass("active");
		$('body').removeClass('active-signin');
		sideupR();
		$('.signin-popup .signin-detail .group input').val('')
	});


	$('body').on(clickEventglobal, '.advance-box li', function() {

		$(this).closest('.dropdown-row').find('.dropdown-box').slideUp(300);
		$(this).closest('.dropdown-row').removeClass('open');

		$(this).closest('.tab-col .dropdown-row').find('.dropdown-box .active').removeClass('active');
		$(this).find('a').addClass('active');
		$(this).closest('.tab-col .dropdown-row').find('.dropdown-value').get(0).firstChild.nodeValue = $(this).text().trim();

	})

	// listing page more button
	$('body').on(clickEventglobal, '.guest_house_left .more-text', function() {

		var heightAnim = $(this).closest('.guest_house_left').find('.exp-repo .exp-subtext p').height()
	
		if ($(this).closest('.guest_house_left').find('.exp-repo .exp-subtext').hasClass('expo-anim')) {

			$(this).get(0).firstChild.nodeValue = "less"

			var thiselem = $(this)[0];

			$(this).closest('.guest_house_left').find('.exp-repo .exp-subtext').removeClass('opacity-anim');
			$(this).closest('.guest_house_left').find('.exp-repo .exp-subtext').animate({
				"height" : heightAnim + 'px'
			}, 300, function() {
				$(this).closest('.guest_house_left').find('.exp-repo .exp-subtext').removeClass('expo-anim');
				thiselem.lastChild.nodeValue = "Less"

			})
		}

		var thiselem = $(this)[0];

		if (!$(this).closest('.guest_house_left').find('.exp-repo .exp-subtext').hasClass('expo-anim')) {
			$(this).closest('.guest_house_left').find('.exp-repo .exp-subtext').animate({
				"height" : '49px'
			}, 300, function() {
				$(this).closest('.guest_house_left').find('.exp-repo .exp-subtext').addClass('expo-anim');
				$(this).closest('.guest_house_left').find('.exp-repo .exp-subtext').addClass('opacity-anim');
				thiselem.lastChild.nodeValue = "More"

			})
		}

	})
	// agent click //
	$('body').on('click', '.project_deatil_right.down-anim .agent-form-fixed h2', function(ev) {
		if ($(window).width() > 991) {
			$('.agent_form').slideToggle();
			$(this).toggleClass('agent-open');
			ev.stopPropagation();
		}
	})
	$('body').on('click', '.project_deatil_right.down-anim .agent_form', function(ev) {

		ev.stopPropagation();
	})

	$('body').on('click', function() {
		if ($(window).width() > 991) {
			$('.project_deatil_right.down-anim .agent_form').slideUp();
			$('.project_deatil_right.down-anim .agent-form-fixed h2').removeClass('agent-open');
		}
	})

	$('body').on('click', '.project_deatil_right.up-anim .agent-form-fixed h2', function() {
		if ($(window).width() > 991) {
			$('body,html').animate({
				scrollTop : $('.project_deatil_right').offset().top - ($('#header').outerHeight() + $('.search-bar-container').outerHeight())
			});
		}
	})
	$('body').on('click', '.holyday-start .agent-form-fixed h2', function() {
		if ($(window).width() > 991) {
			var topholy = clickHolyday - parseInt($('#header').outerHeight()) - parseInt($('.search-bar-container').outerHeight());
			$('body,html').animate({
				scrollTop : topholy
			});
		}
	})
	// map tab management  page detail
	$('body').on('click', '.map-tab-nav li:last-child a', function() {
		$(this).closest('.front-tab').css("display", "none");
		$(this).closest('.front-tab').siblings('.front-tab').css("display", "block");
	})
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

		} catch (err) {

		}
	}

	var L_topset = function() {

		if ($('.search-bar-container.search-bar-container-02')) {
			if ($(window).scrollTop() <= 0) {

				$('.search-bar-container.search-bar-container-02').removeClass('head-reradius');
			} else {

				$('.search-bar-container.search-bar-container-02').addClass('head-reradius');
			}
		}
	}
	var M_searchbar = function() {
		if ($(window).width() < 768) {
		}
	}
	M_agentlive = function(scrollDir) {
		
		console.log("hiiii kppp", $(window).width());
		
		if ($(window).width() > 991) {
			windowscrollTop = $(window).scrollTop();

			windowscrollTop2 = windowscrollTop;

			formstopPoint = formtouchPoint - topStop - heightSubstract;

	
			if (formstopPoint > windowscrollTop && scrollDir == "downscroll") {

			}

			if (formstopPoint < windowscrollTop && scrollDir == "downscroll") {
				$('.agent-form-fixed').css({
					"position" : "fixed",
					top : topStop
				})
				if ($('.project_deatil_right.detail-page').hasClass('up-anim')) {
					$('.agent_form').css({
						"display" : "none"
					});
				}

				$('.project_deatil_right.detail-page').removeClass('down-anim');
				$('.project_deatil_right.detail-page').removeClass('up-anim');
				$('.project_deatil_right.detail-page').addClass('down-anim');

			}
			if (formstopPoint > windowscrollTop && scrollDir == "upscroll") {

				$('.agent-form-fixed').css({
					"position" : "static"
				})

				$('.agent_details').css({
					"padding-top" : agentdetailPaddingtop
				});

				$('.project_deatil_right .agent-form-fixed h2').removeClass('agent-open');

				// add some classess //
				if ($('.project_deatil_right.detail-page').hasClass('down-anim')) {
					$('.agent_form').css("display", "block");
				}
				// adjust classess
				$('.project_deatil_right.detail-page').removeClass('down-anim');
				$('.project_deatil_right.detail-page').removeClass('up-anim');
				$('.project_deatil_right.detail-page').addClass('up-anim');

				// padding management to fill gap created by fix class

				$('.agent-form-fixed .agent_form').css({
					"display" : "block"
				});

			}
			var statusAgentform = $('.agent_form').css("display");

			if (statusAgentform == "block") {

			} else if (statusAgentform == "none") {
				$('.agent_details').css({
					"padding-top" : formHeight + "px"
				});
			}
		}
	}
	var M_detailboxMobile = function(holdpt, scrDir) {

		if ($(window).scrollTop() > holdpt && scrDir == "downscroll") {
			$(".home-content .search-content").fadeIn(500);

			$('.caption-box .detail-box').slideUp(300, function() {
				if ($(window).width() < 768) {
					if ($(myslider).length > 0) {
						if ($(myslider).length > 0) {
							$(".home-slider .caption-box .detail-box").slideUp();

						}
						if ($(".home-slider .caption-box .detail-box").hasClass("box-active")) {
							sliderdata = "play";
							dem();
							$(".home-slider .caption-box .detail-box").removeClass("box-active");
						}
					}
					//myslider.startAuto();

					$('.mobile-search-row').fadeIn(300);
					if ($('#header').hasClass("hide-head"))
						$('#header').removeClass("hide-head");

				}
			});
		} else if ($(window).scrollTop() <= 10 && scrDir == "upscroll") {
			if ($(myslider).length > 0) {
				if ($(myslider).length > 0) {
					$(".home-slider .caption-box .detail-box").slideUp();

				}
				if ($(".home-slider .caption-box .detail-box").hasClass("box-active")) {
					sliderdata = "play";
					dem();
					$(".home-slider .caption-box .detail-box").removeClass("box-active");
				}
			}
			//myslider.startAuto();

			$('.caption-box .detail-box').slideUp(300, function() {

				$(".home-content .search-content").fadeIn(500);
				if ($(window).width() < 768) {

					$('.mobile-search-row').fadeIn(300);

					if ($('#header').hasClass("hide-head"))
						$('#header').removeClass("hide-head");

				}

			});

		}
	}
	var holydayStart = function() {
		var windowsTop = $(window).scrollTop();

		var paddingtoAgent = $('.list-for-sale.list-for-sale1').offset().top - $('.project_deatil_right.holyday-start').offset().top
		var agentTp = $('.project_deatil_right.holyday-start').offset().top
		if (holyagentTop < windowsTop) {
			$('.holyday-start .agent-form-fixed h2').css({
				top : htopStop + 'px',
				position : "fixed"

			})

			$('.holyday-start').addClass('holyday-st-fix');
		} else if (holyagentTop > windowsTop) {
			$('.holyday-start .agent-form-fixed h2').css({

				position : "static"

			})

			$('.holyday-start').removeClass('holyday-st-fix');

		}
		// to set fix the agent //
		if (holyagentTop < windowsTop) {

		} else if (holyagentTop > windowsTop && agentTp > windowsTop) {

			$('.holyday-start .agent_form').css({
				position : "static",
				paddingTop : holydayAgentPaddingtop
			})
		}

		var topPaddingLimit = agentTp + headerHeight;
		var lowerPaddingLimit = hlistSaleOffset;

		var wHeightt = $(window).outerHeight();
		var headerHh = $('#header').outerHeight();
		var sbarHeight = $('.search-bar-container.search-bar-container-02').outerHeight();
		var paddingCal = lowerPaddingLimit - topPaddingLimit - wHeightt + headerHh + sbarHeight;

		if (holyagentTop > windowsTop && windowsTop + $(window).outerHeight() < hlistSaleOffset) {

		}

		if (windowsTop + $(window).outerHeight() > hlistSaleOffset) {

			$('.holyday-start .agent_form').css({
				paddingTop : paddingCal + "px",
				position : "absolute"
			})
		} else if (windowsTop + $(window).outerHeight() < hlistSaleOffset && agentTp < windowsTop) {
			$('.holyday-start .agent_form').css({
				top : htopStop + 'px',
				position : "fixed",
				paddingTop : holydayAgentPaddingtop
			})
		}
	}
	
	/// here new code of other readydocument  start 
	$('body').on('click', '.tab-row a', function() {
		$('.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar, .mCSB_draggerRail').hide();
		var linet = setTimeout(function() {
			$('.mCSB_scrollTools .mCSB_dragger .mCSB_dragger_bar, .mCSB_draggerRail').show();
		}, 55)
	})
	
    
    	// single time variable calculation //
	var stOne = setTimeout(function() {
		formHeight = $('.agent-form-fixed').outerHeight();
		agentdetailPaddingtop = $('.agent_details').css("padding-top");
		initialproAgentPadding = agentdetailPaddingtop;
	}, 500);

	// Start Video slider JS

	$(".vjs-waiting").css({
		"visibility" : "hidden",
		"background" : "transparent"
	});
	$(".vjs-loading-spinner").css("display", "none !important");

	/*captions display*/

	$(window).on('resize load', function() {
		
		$('.caption-box').click(function() {
			if (($('.detail-box').css('display')) == 'block') {

				$('.bx-controls-direction').css('display', 'none');
			} else if (($('.detail-box').css('display')) == 'block') {

				$('.bx-controls-direction').css('display', 'block');
			}
		});
		$('body').click(function() {

			if (($('.detail-box').css('display')) == 'block') {
				$('.bx-controls-direction').css('display', 'block');
			}
		});
		$(window).scroll(function() {
			if (($('.detail-box').css('display')) == 'block') {
				$('.bx-controls-direction').css('display', 'block');
			}
		});

	});

	var i = 0, len, thiss, videosHref;
	
    try{
	videojs.registerPlugin('examplePlugin', examplePlugin);
	} catch(err) {}
	function examplePlugin(options) {
		thiss = this;
		if (options.customClass) {
			this.addClass(options.customClass);
		}
		videosHref = ['assets/videos/lcle77454cac1vj_80a2eaaf_720p.mp4', 'assets/videos/dock.mp4', 'http://techslides.com/demos/sample-videos/small.mp4'];
		len = videosHref.length;
		this.src(videosHref[i]);
		this.on('ended', function() {
			
			i++;
			if (len == i) {

				i = 0;
			}
			myslider.goToNextSlide();
			this.src(videosHref[i]);
			this.play();
		});
	}
    try{
	videojs('my-video', {
		plugins : {

			examplePlugin : {
				customClass : 'example-class',
			}
		}
	});
	} catch(err){
		
	}
	// End video slider JS	
	$('.make_offer_btn').click(function() {
		$(".overlay2").fadeIn(500);
		$('body').addClass('scroll-hide');
	});
	
	$('.close-box2').click(function() {
		$(".overlay2").fadeOut(500);
		$('body').removeClass('scroll-hide');
	});
	
	$('.tab-btns li').click(function() {
		$(this).addClass('active');
		$(this).siblings('li').removeClass('active');
	});
	





}); //doc end //


// variable for scroll movement in holyday and product detail are defined  here //

var agentHolydayVariables;
var agentProductVariables;
var initialproAgentPadding;
var agentchnageTomobile;


$(window).ready(function() {
	$('body').on('click', '.contactBook .mail-btn', function() {
		if ($(window).width() < 992) {
			$('.project_deatil_right_inner .agent-form-fixed').addClass('open');
		}
	})

	$('body').on('click', '.contactBook .cl-btn', function() {
		if ($(window).width() < 992) {
			$('.slide-downsm.call-wrap').addClass('open');
		}
	})

	$('body').on('click', '.call-details .cancel-call', function() {
		if ($(window).width() < 992) {
			$('.slide-downsm.call-wrap').removeClass('open');
		}
	})

	$('body').on(eventClickTouchGlobal, '.agent-form-fixed.slide-downsm .close-box', function() {
		if ($(window).width() < 992) {
			$('.agent-form-fixed.slide-downsm').removeClass('open');
		}
	})
	agentHolydayVariables = function() {
		if ($('.holyday-start').length > 0) {
			var hti = setTimeout(function() {
				clickHolyday = parseInt($('.holyday-start').offset().top);
				holyagentTop = parseInt($('.holyday-start').offset().top) - parseInt($('#header').outerHeight());
				htopStop = $('#header').outerHeight();
				hlistSaleOffset = $('.list-for-sale.list-for-sale1').offset().top;
				headerHeight = $('.holyday-start .agent-form-fixed h2').outerHeight();

				holydayAgentPaddingtop = $('.holyday-start .agent_form').css('padding-top');

			}, 300)

		}
	}
	agentHolydayVariables()

	agentProductVariables = function() {
		var stio = setTimeout(function() {

			if ($('.agent-start').length > 0) {

				formFromTop = $('.project_deatil_right_inner').offset().top;

				formtouchPoint = formHeight + formFromTop;

				topStop = parseInt($('#header').outerHeight());

				formbottomPadding = ($('.agent-form-fixed').outerHeight() - $('.agent-form-fixed').height()) / 2;

				heightSubstract = formbottomPadding + $('.agent_form .contact_btn').outerHeight();

				M_agentlive("downscroll");
			}
		}, 500)

	}
	agentProductVariables()

	agentchnageTomobile = function() {


		if ($(window).width() <= 991) {
			
			console.log("KKKKK")
			
			$('.project_deatil_right.down-anim').removeClass('down-anim');
			$('.agent-form-fixed').css({
				top : 100 + "%"
			})

			$('.agent-form-fixed .agent_form').css({
				"display" : "block"
			})

			$('.project_deatil_right_inner .agent_details').css({
				paddingTop : initialproAgentPadding
			})
		}

		if ($(window).width() > 991 && formstopPoint < windowscrollTop2) {

			$('.project_deatil_right_inner .agent_details').css({
				paddingTop : formHeight + "px"
			})
			$('.agent-form-fixed .agent_form').css({
				"display" : "none"
			});

			$('.agent-form-fixed h2.agent-open').removeClass('agent-open');

			$('.project_deatil_right.down-anim').addClass('down-anim');
		}
		
		
		if ($(window).width() > 991 && formstopPoint > windowscrollTop2) {
			$('.project_deatil_right_inner .agent_details').css({
				paddingTop : initialproAgentPadding
			})
			$('.agent-form-fixed .agent_form').css({
				"display" : "block"
			});
			M_agentlive("upscroll")
		}

	}

	$(".hor-scroll").mCustomScrollbar({
		horizontalScroll : true,
		scrollbarPosition : "outside"
	});

	$('.listing-page .tab-row a').click(function(e) {

		//var indList = $(this).parent().index();

		//$('.listing-page .tab-content .tab-col').hide();
		//$('.listing-page .tab-content .tab-col').eq(indList).show();

	})

	var productCalculaterPageSet = function() {
		var padingCalculator = parseInt($('#main-wrapper .project_deatil').css('paddingTop'));
		var offsetCalculator = $('#main-wrapper .project_deatil').offset().top;
		var topClaculator = parseInt($('header').outerHeight() + $('.search-bar-container.search-bar-container-02').outerHeight());
		var effectiveCalTop = topClaculator - padingCalculator;

		var productCalOffset = parseInt($('#main-wrapper .project_deatil').offset().top);

		if ($(window).width() < 768) {
			productCalOffset = parseInt($('#main-wrapper .guest_house_right').offset().top);
			effectiveCalTop = parseInt($('header').outerHeight()) - 5;

		}

		$("html, body").stop().animate({

			scrollTop : productCalOffset - effectiveCalTop
		}, 500);
	}
	var listingCalculaterPageSet = function() {
		$("html, body").stop().animate({
			scrollTop : $('.inner-detail-popup .project_deatil').offset().top - parseInt($('.inner-detail-popup .search-bar-container').outerHeight())
		}, 500);
	}
	// for calculater section //
	calculaterPopup = function(stepOn, calEl) {
		if (stepOn == "open") {
			$(".calculator_popup").slideToggle(200);
			$('.dropdown-row .dropdown-box').slideUp(200);
			if ($('.product_detail-wrap').length > 0) {
				productCalculaterPageSet();
			}
			if ($('.listing-page').length > 0) {
				listingCalculaterPageSet();
			}
			$('body').addClass('cal-active');
		} else if (stepOn == "close") {
			$(".calculator_popup").slideUp(200);
			$(".calculator_section .mo_cal").removeClass("cal-open");
			$('body').removeClass('cal-active');
		}

	}
	$(".calculator_section .mo_cal").on(clickEventglobal, function(event) {
		event.stopPropagation();
		var calElem = $(this);
		if ($(this).hasClass('cal-open')) {
			$(this).removeClass('cal-open');
			calculaterPopup("close", calElem);

		} else if (!$(this).hasClass('cal-open')) {
			$(this).addClass('cal-open');
			calculaterPopup("open", calElem);
		}

	});

	$('body').on(clickEventglobal, function(ev) {
		calculaterPopup("close")
	})

	$('body').on(clickEventglobal, '.calculator_popup', function(event) {
		event.stopPropagation();
	})
	// for calculater section ends //

	// sign in popup starts //
	$('body').on('mousedown', '.signin-detail .label_check', function() {
		if ($(window).width() > 767) {
			var setlabel = setTimeout(function() {
				registerAsdesktop();
			}, 50)
		}
		if ($(window).width() < 768) {
			var setlabel2 = setTimeout(function() {
				registerAsMobile();
			}, 50)
		}
	})
	registerAsMobile = function() {
		var heightsignHeader = $('.head-row').outerHeight(true);
		var heightregisterPre = $('.signin-detail .registerPre').outerHeight(true) * $('.signin-detail .registerPre').length;
		var paddingTopSighHead = $('.signin-detail').css('padding-top');
		var totalAnimatesign = parseInt(heightsignHeader) + parseInt(heightregisterPre);
		if ($('.signin-popup .register-as').css("display") == "none") {
			sidedownR(totalAnimatesign);
		} else if (($('.signin-popup .register-as').css("display") == "block")) {
			sideupR(totalAnimatesign);
		}
	}
	var registerAsdesktop = function() {
		$('.signin-popup  .signin-detail .register-as').slideToggle(300, function() {
			if ($('.signin-popup  .signin-detail .register-as').css('display') == 'none') {
				$('.signin-detail .label_check').removeClass('c_on');
			} else {
				$('.signin-detail .label_check').addClass('c_on');
			}
		})
	}
	sideupR = function(totalAnimate2) {
		$('.signin-popup .custom-form .label_check').removeClass('c_on');
		$('.signin-popup .mCSB_container').animate({
			"top" : 0 + "px"
		}, 500, function() {
			$('.signin-popup  .signin-detail .register-as').slideUp(300, function() {
				$(signinCustomscrollbar).mCustomScrollbar('update');
			})
		});
	}
	var sidedownR = function(totalAnimate1) {
		$('.signin-popup .custom-form .label_check').addClass('c_on');
		var totalAnimate2 = totalAnimate1 + 9;
		$('.signin-popup  .signin-detail .register-as').slideDown(300, function() {
			$('.signin-popup .mCSB_container').animate({
				"top" : -totalAnimate2 + "px"
			}, 500, function() {
				$(signinCustomscrollbar).mCustomScrollbar('update');
			});
		});
	}

	$(".signin-dropdown .register-as li").on(clickEventdetail, function() {

		$(".signin-dropdown .register-as li").removeClass("active");
		$(this).addClass("active");
	});
	$('body').on('click', '.slider-tab-links-wrap', function() {
		sliderTablinksReposition($(this))
	});
	var sliderTablinksReposition = function(sElm) {
		var linksHead = parseInt($('.search-bar-container.search-bar-container-02'))
		var movetoBody = parseInt(sElm.offset().top) - parseInt($('.search-bar-container.search-bar-container-02').height()) - parseInt($('#header').height());
		$("html, body").animate({
			scrollTop : 0 + 'px'
		}, 800);
	}
	//remove mobile keypad on click outside
	$('body').on('touchstart', function(e) {
		if ($(window).width() < 768) {
			$('input').blur();
		}
	})
	//close dropdown in listing page //
	$('body').on('touchstart', function(e) {
		var stl = setTimeout(function() {
			if ($('.listing-page').length > 0)
				selectBox.selectBoxIt('refresh');
		}, 50)
	});
	$('body').on('touchstart', '.filter-blk', function(e) {
		if ($('.listing-page').length > 0)
			e.stopPropagation();
	})
	$('body').on('touchstart', 'input', function(e) {
		e.stopPropagation();
	})
	//remove mobile keypad on click outside end
	// for mobile
	$('body').on('touchstart', '.search-content, .dropdown-row.clear-row', function() {
		if ($(window).width() < 768) {
			$(".dropdown-row").removeClass("open");
			$(".dropdown-box").slideUp();

		}

	});
	$('body').on('touchstart', '.search-content .tab-content', function(e) {
		if ($(window).width() < 768) {
			e.stopPropagation();
		}

	});


	datepickerMscroll();
});


// document ready end here

var datepickerMscroll = function() {

	if ($(window).width() < 768) {

		$('#datepicker').mCustomScrollbar({});

	}

}

$(window).resize(function() {
	events_defination();
	datepickerMscroll();

    

	if ($(".product-detail .product_detail-wrap").length > 0) {
		agentProductVariables();
		agentchnageTomobile();
	}

try{
	agentHolydayVariables();
}catch(trr){}

}); 

function setLatLon(lat, lon){
	
	setTimeout(function(){ 
	
		
		if(lat && lon){
			//$('.flexdatalist-multiple.flex0').find('li.value:last').append('<input type="hidden" name="lat[]" class="lat" value="'+lat+'">');
			//$('.flexdatalist-multiple.flex0').find('li.value:last').append('<input type="hidden" name="lon[]" class="lon" value="'+lon+'">');
			$('.flexdatalist-multiple.flex0').find('li.value:last').append('<input type="hidden" name="lat_lon[]" class="lat_lon" value="'+lat+'_'+lon+'">');
		}
	}, 100);	
}
