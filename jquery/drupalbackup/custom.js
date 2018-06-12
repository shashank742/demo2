jQuery(document).ready(function() {

	// ( function(jQuery, Drupal) {
	// // I want some code to run on page load, so I use Drupal.behaviors
	//
	// Drupal.behaviors.custom = {
	// attach : function() {
	//

	var id;
	var liWidth = 0;
	var windowWidth = jQuery(window).width();
	Math.ceil(windowWidth)
	liWidth = (jQuery(window).width() * 30) / 100;
	Math.ceil(liWidth)
	var liLength = jQuery(".cryptomaniaks_listing li").length;
	var liLengths = jQuery(".crypto_listing li").length;
	var slideTime = 1;

	var totalLiWidth = liLength * liWidth;
	var totalLiWidths = liLengths * liWidth;
	//console.log(totalLiWidth);

	slidingWidths = totalLiWidths - windowWidth;
	slidingWidth = totalLiWidth - windowWidth;
	jQuery(jQuery((jQuery('.node-type-altcoin-chapter #page-wrapper #main-wrapper')).find('.quicktabs-tab-block-views-delta-altcoin-video-block')).parent()).addClass('video_parent');
	jQuery(jQuery((jQuery('.node-type-altcoin-chapter #page-wrapper #main-wrapper')).find('.quicktabs-tab-block-views-delta-altcoin-description-block')).parent()).addClass('description_parent');




	




	// if(jQuery(".view-normal-chapter-listing").find(".item-list")){
	// alert()
	// }

	// var $i = -1,$k=0;
	// jQuery('#block-quicktabs-neo-altcoin #quicktabs-container-neo_altcoin .quicktabs-tabpage ').each(function(){
	//
	//
	// $i++;
	//
	// if(jQuery('#quicktabs-tabpage-neo_altcoin-'+$i+' .view-id-altcoin .field-content').is(':empty')){
	//
	//
	// jQuery(jQuery('#quicktabs-tab-neo_altcoin-'+$i+' ')).parent().hide();
	// jQuery(jQuery('#quicktabs-tabpage-neo_altcoin-'+$i+' ')).addClass('quicktabs-hide');
	//
	//
	// //
	//
	//
	// }
	// else {
	// var display=(jQuery(jQuery('#quicktabs-tab-neo_altcoin-'+$i+' ')).parent()).css('display');
	//
	//
	// if(display!='none'){
	//
	// jQuery((jQuery(jQuery('#quicktabs-tab-neo_altcoin-'+$i+' ')).parent())).addClass('list_item'+$k+' ');
	// jQuery(jQuery('.list_item0')).addClass('active');
	// $k++;
	//
	// if(jQuery((jQuery(jQuery('#quicktabs-tab-neo_altcoin-'+$i+' ')).parent())).hasClass('list_item0')){
	// //
	// jQuery(jQuery('#quicktabs-tabpage-neo_altcoin-'+$i+' ')).removeClass('quicktabs-hide');
	// }
	//
	//
	//
	// }
	//
	// }
	//
	//
	//
	// });

	if (jQuery(window).width() > 767) {
		
		
		jQuery(document).ajaxSuccess(function(){	
	jQuery(".crypto_listing li").css("width", liWidth)
})
		jQuery(".cryptomaniaks_listing li").css("width", liWidth)
		jQuery(".crypto_listing li").css("width", liWidth)
		jQuery("body").on("mouseenter", ".slide", function(event) {
			event.stopPropagation();
			event.preventDefault();
			//console.log(event.pageX)
			if (event.pageX < 100) {
				slideTime = 1;
				slideTime = Math.round(-(parseInt(jQuery("#mCSB_1_container").css("left")) / Math.ceil(slidingWidth / liLength)))
				slideTime = slideTime * 1000;
				jQuery("#mCSB_1_container").animate({
					left : 0
				}, slideTime);
			}
			if (event.pageX > (jQuery(window).width() - 100)) {
				var less = Math.round(-(parseInt(jQuery("#mCSB_1_container").css("left")) / Math.ceil(slidingWidth / liLength)));
				slideTime = (liLength - less) * 1000;
				jQuery("#mCSB_1_container").animate({
					left : -slidingWidth
				}, slideTime);
			}

		});
		jQuery("body").off("mouseenter", ".slides");
		jQuery("body").on("mouseenter", ".slides", function(event) {

			event.stopPropagation();
			event.preventDefault();

			if (event.pageX < 100) {

				slideTime = 1;
				slideTime = Math.round(-(parseInt(jQuery(".menu_slider_block .mCSB_container").css("left")) / Math.round(slidingWidths / liLengths)))
				slideTime = slideTime * 1000;
				jQuery(".menu_slider_block .mCSB_container").animate({
					left : 0
				}, slideTime);
			}
			if (event.pageX > (jQuery(window).width() - 100)) {
				var less = Math.round(-(parseInt(jQuery(".menu_slider_block .mCSB_container").css("left")) / Math.round(slidingWidths / liLengths)));
				slideTime = (liLengths - less) * 1000;
				jQuery(".menu_slider_block .mCSB_container").animate({
					left : -slidingWidths
				}, slideTime);
			}

		});
		jQuery("body").on("mouseout", ".slide", function(event) {
			jQuery("#mCSB_1_container").stop();
		});
		jQuery("body").on("mouseout", ".slides", function(event) {
			jQuery(".menu_slider_block .mCSB_container").stop();
		});

		/*---------MenuButton Start---------*/

		jQuery("body").on("click", ".menu-btn-2", function(e) {

			e.preventDefault();

			jQuery(this).toggleClass("active");
			jQuery('body').toggleClass("active-menu");
			if (parseInt(jQuery(".nchapter-pager .menu_slider_block").css("top")) != -230) {
				jQuery(".nchapter-pager .menu_slider_block").animate({
					top : "-230px"					
				}, "slow");
				jQuery(".nchapter-pager .menu_slider_block").css("opacity" , "1")
			} else {
				jQuery(".nchapter-pager .menu_slider_block").animate({
					top : "80px"
				}, "slow",function(){
					jQuery(".nchapter-pager .menu_slider_block").css("opacity" , "0")
				});
					
			}

			if (jQuery('.nchapter-pager .menu-btn-2 > strong').text() == 'MENU') {
				jQuery('.nchapter-pager .menu-btn-2 > strong').text('CLOSE');
			} else {
				jQuery('.nchapter-pager .menu-btn-2 > strong').text('MENU');
			}

			if (jQuery(jQuery('body')).hasClass("altcoin_pop")) {

				jQuery('body').removeClass('altcoin_pop');
				jQuery('.node-type-altcoin-chapter #cboxOverlay').hide();
				jQuery('.node-type-altcoin-chapter #colorbox').hide();
				jQuery('.node-type-altcoin-chapter .footer_outer .footer-altcoin-link .altcoin_popup').text('Open list of Altcoins');
			}

			if ((jQuery(".menu-btn-2")).hasClass('active')) {
				 
				
				
				//console.log(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .leftMoment.slides').css('display'));
				(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .leftMoment.slides')).css('display', 'block');
				(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .rightMoment.slides')).css('display', 'block');
			} else {
				(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .leftMoment.slides')).css('display', 'none');
				(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .rightMoment.slides')).css('display', 'none');
			}

		});

		/*---------MenuButton End---------*/

		//********* Altcoins Popup page ********************************

		jQuery('.node-type-altcoin-chapter .footer_outer .footer-altcoin-link .altcoin_popup').on("click", function() {

			if (jQuery(this).text() == 'Open list of Altcoins') {
				jQuery(this).text('Close list of Altcoins');
				jQuery('body').addClass('altcoin_pop');
				jQuery('.node-type-altcoin-chapter #cboxOverlay').show();
				jQuery('.node-type-altcoin-chapter #colorbox').show();
			} else {
				jQuery(this).text('Open list of Altcoins');
				jQuery('body').removeClass('altcoin_pop');
				jQuery('.node-type-altcoin-chapter #cboxOverlay').hide();
				jQuery('.node-type-altcoin-chapter #colorbox').hide();

			}

			if (jQuery(jQuery('body')).hasClass("active-menu")) {
				if (parseInt(jQuery(".nchapter-pager .menu_slider_block").css("top")) == -230) {
					jQuery(".nchapter-pager .menu_slider_block").animate({
						top : "80px"
					}, "slow");
					jQuery('.nchapter-pager .menu-btn-2 > strong').text('MENU');
					jQuery('body').removeClass('active-menu');
					jQuery(jQuery(".menu-btn-2")).removeClass("active");
					(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .leftMoment.slides')).css('display', 'none');
					(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .rightMoment.slides')).css('display', 'none');
				}
			}

		});

		jQuery('.node-type-altcoin-chapter #colorbox #cboxContent #cboxClose').click(function() {

			jQuery('.node-type-altcoin-chapter .footer_outer .footer-altcoin-link .altcoin_popup').text('Open list of Altcoins');
			jQuery('body').removeClass('altcoin_pop');
			jQuery('.altcoin-watch-video .views-field-field-watch-video .video-wrapper .watch_video a > div.watch-video-content').show();

		});

		var a = setInterval(function() {
			if (document.getElementById("cboxClose")) {
				clearInterval(a);
				document.getElementById("cboxClose").addEventListener("click", function() {
					jQuery('.node-type-altcoin-chapter .footer_outer .footer-altcoin-link .altcoin_popup').text('Open list of Altcoins');
					jQuery('body').removeClass('altcoin_pop');
					jQuery('.altcoin-watch-video .views-field-field-watch-video .video-wrapper .watch_video a > div.watch-video-content').show();
				});
			}
		}, 1000);

		//********* End of Altcoins Popup page ***************************

		/*-----------SearchFocusStart--------------*/
       /*
		 jQuery("body").on("keyup focusout", '.form-item.form-type-textfield #edit-title', function(e) {
		
		 var valueText = jQuery(this).val().length;
	
		 if (jQuery(this).val().length > 0) {
	
		 setTimeout(function() {
		  jQuery("#edit-title").focus();
		   jQuery("#edit-title")[0].setSelectionRange(valueText, valueText);
		  }, 1);
		
		 }
		
		if (jQuery(this).val().length == 0) {
		  setTimeout(function() {
		    jQuery("#edit-title").focus();
		   }, 1);
		  }
		 });
         
         */
		/*-----------SearchFocusEnd--------------*/

		/*-----------OverlayStart--------------*/

		jQuery('.menu_overlay').on('click touchstart', function(e) {
			if ((jQuery(jQuery('.menu-btn-2')).hasClass('active'))) {

				e.preventDefault();
				e.stopPropagation();

				// setTimeout(function(){

				if (parseInt(jQuery(".nchapter-pager .menu_slider_block").css("top")) == -230) {
					jQuery(".nchapter-pager .menu_slider_block").animate({
						top : "80px"
					}, "slow");
					jQuery('.nchapter-pager .menu-btn-2 > strong').text('MENU');
					jQuery('body').removeClass('active-menu');
					jQuery(jQuery(".menu-btn-2")).removeClass("active");
					(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .leftMoment.slides')).css('display', 'none');
					(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .rightMoment.slides')).css('display', 'none');
				}
			}
		});

		/*-----------OverlayEnd--------------*/

		/*-----------------------TabActivityStart----------------------*/

		/*---------------------------TabActivityEnd----------*/

	}

	/*End for size>768*/

	/*----------------Tabbing Activity Start--------------*/

	var $i = -1, $k = 0;
	jQuery('#block-quicktabs-neo-altcoin #quicktabs-container-neo_altcoin .quicktabs-tabpage ').each(function() {

		$i++;

		if ((jQuery('#quicktabs-tabpage-neo_altcoin-' + $i + ' .view-id-altcoin .blocks_quick_tabs .field-content').is(':empty')) || (jQuery('#quicktabs-tabpage-neo_altcoin-' + $i + ' .view-id-altcoin .views-field-field-watch-video .field-content').is(':empty'))) {

			jQuery(jQuery('#quicktabs-tab-neo_altcoin-' + $i + ' ')).parent().hide();
			jQuery(jQuery('#quicktabs-tabpage-neo_altcoin-' + $i + ' ')).addClass('quicktabs-hide');

		} else {
			var display = (jQuery(jQuery('#quicktabs-tab-neo_altcoin-' + $i + ' ')).parent()).css('display');

			if (display != 'none') {

				jQuery((jQuery(jQuery('#quicktabs-tab-neo_altcoin-' + $i + ' ')).parent())).addClass('list_item' + $k + ' ');
				jQuery(jQuery('.list_item0')).addClass('active');
				$k++;

				if (jQuery((jQuery(jQuery('#quicktabs-tab-neo_altcoin-' + $i + ' ')).parent())).hasClass('list_item0')) {
					//
					jQuery(jQuery('#quicktabs-tabpage-neo_altcoin-' + $i + ' ')).removeClass('quicktabs-hide');
				}

			}

		}

	});

	var neo_data = jQuery('.altcoin-watch-video .views-field-field-watch-video div.watch-video-content').html();

	jQuery('.altcoin-watch-video .views-field-field-watch-video .watch_video a').append('<div class="watch-video-content">' + neo_data + '</div>');

	jQuery('.altcoin-watch-video .views-field-field-watch-video .watch_video > .watch-video-content').remove();

	jQuery(".altcoin-watch-video .views-field-field-watch-video .watch_video a").one('click', function() {
		jQuery('.altcoin-watch-video .views-field-field-watch-video .video-wrapper .watch_video a > div').hide();
		jQuery('.altcoin-watch-video .views-field-field-watch-video .video-wrapper .watch_video a > div:nth-child(1)').show();
	});

	jQuery('.nchapter-pager a.altcoin_popup').one('click', function() {
		jQuery('.altcoin-watch-video .views-field-field-watch-video .video-wrapper .watch_video a > div').remove();
		jQuery('.altcoin-watch-video .views-field-field-watch-video .watch_video a').append('<div class="watch-video-content">' + neo_data + '</div>');
	});

	/*----------------Tabbing Activity End--------------*/

	if (jQuery(window).width() < 768) {

		var tLiWidth = liLength * Math.round(jQuery(window).width());
		var slideWidth = tLiWidth - jQuery(window).width();
		jQuery(".cryptomaniaks_listing li").css("width", jQuery(window).width())
		var mobWidth = 0;
		var lastY;
		var c = 1;
		var lastX;
		var currentY;
		var currentX;
		var bool = false;
		var flag = false;

		jQuery(jQuery('#quicktabs-tabpage-neo_altcoin-0')).addClass('quicktabs-hide');

		/*---------------------------MenuButton Start-----------------*/

		jQuery("body").on("click", ".menu-btn-2", function(e) {

			e.preventDefault();

			jQuery(this).toggleClass("active");
			jQuery('body').toggleClass("active-menu");
			if (parseInt(jQuery(".nchapter-pager .menu_slider_block").css("top")) != -350) {
				jQuery(".nchapter-pager .menu_slider_block").animate({
					top : "-350px"
				}, "slow");
			} else {
				jQuery(".nchapter-pager .menu_slider_block").animate({
					top : "80px"
				}, "slow");
			}

			if (jQuery('.nchapter-pager .menu-btn-2 > strong').text() == 'MENU') {
				jQuery('.nchapter-pager .menu-btn-2 > strong').text('CLOSE');
			} else {
				jQuery('.nchapter-pager .menu-btn-2 > strong').text('MENU');
			}

			if (jQuery(jQuery('body')).hasClass("altcoin_pop")) {

				jQuery('body').removeClass('altcoin_pop');
				jQuery('.node-type-altcoin-chapter #cboxOverlay').hide();
				jQuery('.node-type-altcoin-chapter #colorbox').hide();
				jQuery('.node-type-altcoin-chapter .footer_outer .footer-altcoin-link .altcoin_popup').text('Open list of Altcoins');
			}

			if ((jQuery(".menu-btn-2")).hasClass('active')) {
				//console.log(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .leftMoment.slides').css('display'));
				(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .leftMoment.slides')).css('display', 'block');
				(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .rightMoment.slides')).css('display', 'block');
			} else {
				(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .leftMoment.slides')).css('display', 'none');
				(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .rightMoment.slides')).css('display', 'none');
			}

		});

		/*---------------Menu Button End---------------*/

		/*-----------OverlayStart--------------*/
		jQuery('.menu_overlay').on('click touchstart', function(e) {
			if ((jQuery(jQuery('.menu-btn-2')).hasClass('active'))) {

				e.preventDefault();
				e.stopPropagation();

				// setTimeout(function(){

				if (parseInt(jQuery(".nchapter-pager .menu_slider_block").css("top")) == -350) {
					jQuery(".nchapter-pager .menu_slider_block").animate({
						top : "80px"
					}, "slow");
					jQuery('.nchapter-pager .menu-btn-2 > strong').text('MENU');
					jQuery('body').removeClass('active-menu');
					jQuery(jQuery(".menu-btn-2")).removeClass("active");
					(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .leftMoment.slides')).css('display', 'none');
					(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .rightMoment.slides')).css('display', 'none');
				}
			}
		});
		/*---------OverlayEnd------------------*/

		//********* Altcoins Popup page ********************************
		jQuery('.node-type-altcoin-chapter .footer_outer .footer-altcoin-link .altcoin_popup').on("click", function() {
			//alert()
			//console.log(jQuery(this).text());

			if (jQuery(this).text() == 'Open list of Altcoins') {
				jQuery(this).text('Close list of Altcoins');
				jQuery('body').addClass('altcoin_pop');
				jQuery('.node-type-altcoin-chapter #cboxOverlay').show();
				jQuery('.node-type-altcoin-chapter #colorbox').show();
			} else {
				jQuery(this).text('Open list of Altcoins');
				jQuery('body').removeClass('altcoin_pop');
				jQuery('.node-type-altcoin-chapter #cboxOverlay').hide();
				jQuery('.node-type-altcoin-chapter #colorbox').hide();

			}

			if (jQuery(jQuery('body')).hasClass("active-menu")) {
				if (parseInt(jQuery(".nchapter-pager .menu_slider_block").css("top")) == -350) {
					jQuery(".nchapter-pager .menu_slider_block").animate({
						top : "80px"
					}, "slow");
					jQuery('.nchapter-pager .menu-btn-2 > strong').text('MENU');
					jQuery('body').removeClass('active-menu');
					jQuery(jQuery(".menu-btn-2")).removeClass("active");
					(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .leftMoment.slides')).css('display', 'none');
					(jQuery('.node-type-altcoin-chapter .main-background .footer_outer .menu_slider_block  .rightMoment.slides')).css('display', 'none');
				}
			}

		});

		jQuery('.node-type-altcoin-chapter #colorbox #cboxContent #cboxClose').click(function() {

			jQuery('.node-type-altcoin-chapter .footer_outer .footer-altcoin-link .altcoin_popup').text('Open list of Altcoins');
			jQuery('body').removeClass('altcoin_pop');
			jQuery('.altcoin-watch-video .views-field-field-watch-video .video-wrapper .watch_video a > div.watch-video-content').show();

		});

		var a = setInterval(function() {
			if (document.getElementById("cboxClose")) {
				clearInterval(a);
				document.getElementById("cboxClose").addEventListener("click", function() {
					jQuery('.node-type-altcoin-chapter .footer_outer .footer-altcoin-link .altcoin_popup').text('Open list of Altcoins');
					jQuery('body').removeClass('altcoin_pop');
					jQuery('.altcoin-watch-video .views-field-field-watch-video .video-wrapper .watch_video a > div.watch-video-content').show();
				});
			}
		}, 1000);

		//********* End of Altcoins Popup page ***************************

		/*-----------SearchFocusStart--------------*/
       
       /*
		 jQuery("body").on("keyup focusout ", '.form-item.form-type-textfield #edit-title', function(e) {
		
		 var valueText = jQuery(this).val().length;
		
		 if (jQuery(this).val().length > 0) {
		
		 setTimeout(function() {
		 jQuery("#edit-title").focus();
		 jQuery("#edit-title")[0].setSelectionRange(valueText, valueText);
		 }, 1);
		
		 }
		
		 if (jQuery(this).val().length == 0) {
		 setTimeout(function() {
		 jQuery("#edit-title").focus();
		 		 
		 }, 10);
		 
		 }
		 });
		 
		 */
		 
		 
		 

		/*-----------SearchFocusEnd--------------*/

	}
	jQuery(window).resize(function() {
		if (jQuery(window).width() > 767) {
			
	
	 windowWidth = jQuery(window).width();
	Math.ceil(windowWidth)
	liWidth = (jQuery(window).width() * 30) / 100;
	
	Math.ceil(liWidth)
	 liLength = jQuery(".cryptomaniaks_listing li").length;
	 liLengths = jQuery(".crypto_listing li").length;
	 slideTime = 1;

	 totalLiWidth = liLength * liWidth;
	 totalLiWidths = liLengths * liWidth;
	//console.log(totalLiWidth);

	slidingWidths = totalLiWidths - windowWidth;
	slidingWidth = totalLiWidth - windowWidth;
	jQuery(".cryptomaniaks_listing li").css("width", liWidth)
		jQuery(".crypto_listing li").css("width", liWidth)
		}
	

		if (jQuery(window).width() < 768) {
			jQuery(".cryptomaniaks_listing li").css("width", jQuery(window).width());
			

		}
jQuery(".cryptomaniaks_listing li").css("width", liWidth);
		jQuery(".crypto_listing li").css("width", liWidth);
	});
	// jQuery("body").mouseenter(function(e){
	// console.log(e.target);
	// })
	// jQuery("body").on("click", ".altcoin_menu", function() {
		// setTimeout(function() {
			// console.log(jQuery("#mCSB_2_scrollbar_horizontal"));
// 
			// jQuery("#mCSB_2_dragger_horizontal").css({
				// "width" : "311px",
				// "max-width" : "1866px"
			// });
			// setTimeout(function() {
				// jQuery("#mCSB_2_scrollbar_horizontal").css({
					// "display" : "block !important"
				// });
			// }, 100);
		// }, 3000);
// 
	// })
	

	
});
// };
// }(jQuery, Drupal));
