( function($, Drupal) {
		// I want some code to run on page load, so I use Drupal.behaviors
		Drupal.behaviors.site = {
			attach : function() {// Opening of Attach function


				$(".nchapter-listing-page .right-content").mCustomScrollbar({
					scrollButtons : {
						enable : true
					}
				});
				
				$(".altcoin-section-list").mCustomScrollbar({
					scrollButtons : {
						enable : true
					}
				});
				
				$(".tab-detail").mCustomScrollbar({
					scrollButtons : {
						enable : true
					}
				});
				
				$(".tab-team").mCustomScrollbar({
					scrollButtons : {
						enable : true
					}
				});
				
				$(".tab-links").mCustomScrollbar({
					scrollButtons : {
						enable : true
					}
				});
				
				$(".pera-wrap").mCustomScrollbar({
					scrollButtons : {
						enable : true
					}
				});
				
				if ($(window).width() > 767) {
					//Main Scroll
					$(".cryptomaniaks_cpt").mCustomScrollbar({
						axis : "x",
						mouseWheel : false,
						advanced : {
							autoExpandHorizontalScroll : true,

						},
						callbacks : {
							onInit : function() {
								$('body').find('.mCustomScrollbar._mCS_1').append("<a class='leftMoment slide'></a><a class='rightMoment slide'></a>")

							}
						}
					});
				
					//bottom scroll
					console.log($(".nchapter-pager .my-item-list"));
					$(".nchapter-pager .my-item-list").mCustomScrollbar({
						axis : "x",
						
						mouseWheel : false,
						advanced : {
							autoExpandHorizontalScroll : true,

						}
						
					});
				};
				
				jQuery('.menu-btn').off("click");
				jQuery('.menu-btn').click(function() {
					if (jQuery(window).width() < 768) {
						jQuery(this).toggleClass('active');
						//jQuery('#main-menu').toggleClass('menu-open');
						jQuery("#header #main-menu-links").slideToggle();
						
					}
				});

		   // Start Menu Block --------------------------------------------------
				var m_title = jQuery('.dynamic-title').text();			

				var $i = 1;
				jQuery('.view-cryptomaniaks-menu .my-item-list ul li').each(function() {

					var m_data = jQuery('.view-cryptomaniaks-menu .my-item-list ul .views-row-' + $i + ' div span .menu_list span strong').text();
					                    
					if (m_data.trim() == m_title.trim()) {
						jQuery('.view-cryptomaniaks-menu .my-item-list ul .views-row-' + $i).addClass('active-menu');
					}
					$i++;
				});

			// End of Menu Block ------------------------------------------------

			//******************* Next Button ******************************************

				
				var arr;
				
				jQuery('.page-normalchapter .nchapter-pager .item-list ul li a').click(function() {
				
$("body").removeClass("active-menu");
					console.log(jQuery(this).attr('href'));
					//Set the string as a variable
					var filePath = jQuery(this).attr('href');

					//Split the string into an array by splitting it at the '\' character
					arr = filePath.split('=');

					//Get the value for the last item in the array
					var finals = arr[arr.length - 1];
					//console.log(finals)

					var f_inc = parseInt(finals) + 1;
					//console.log(f_inc);
					
					var url = arr[arr.length - 2] + '=' + finals;
					// console.log(url);
					var clicked_object = $(this);

					// jQuery(this).ajaxComplete(function () {
					//
					// jQuery('.view-normal-chapter-listing .nchpater-nbutton span a').attr('href','&&&');
					// });
					//$(document).bind(ajaxComplete);
					$(document).ajaxComplete(function(event, xhr, settings) {
						
						console.log(xhr);
						console.log(settings)
						console.log(event)
						if ((clicked_object.parents('ul').children().length - 1) == (clicked_object.parent('li').index())) {
							$('.nchpater-nbutton').children('.field-content').children('a').attr("href", $("body").find(".home_page").attr("data_attr")).text('Main Menu');
						}
						$(document).off('ajaxComplete');
					});
				
				});

				$(".nchpater-nbutton .field-content a").click(function(e) {
					

					var thiss = $(this)
					if ($('body').find('.pager-current').next().children().prop("tagName") == "A") {
						e.preventDefault();

						$('body').find('.pager-current').next().children().trigger('click');
						
					} else {

					}
					

				})
			//*********************End of Next Button***********************

				//******************** Bitcoin section And AltCoinChapters *************************

				if (jQuery('.page-normalchapter .nchapter-listing-page .left-content .field-content').is(':empty')) {

					jQuery('.page-normalchapter .nchapter-listing-page').addClass('left-content-empty');

				}

				if (jQuery('.page-normalchapter .nchapter-listing-page .right-content .field-content').is(':empty')) {

					jQuery('.page-normalchapter .nchapter-listing-page').addClass('right-content-empty');
				}
                    
               // AltCoinChpaters
                if(jQuery('.node-type-altcoin-chapter #main-wrapper .altcoin_content .left-content').is(':empty')){    					
				       jQuery('.node-type-altcoin-chapter #main-wrapper .altcoin_content').addClass('left-content-empty');
				   }
				   
				if(jQuery('.node-type-altcoin-chapter #main-wrapper .altcoin_content .right-content').is(':empty')){
				       jQuery('.node-type-altcoin-chapter #main-wrapper .altcoin_content').addClass('right-content-empty');				   
				   }       
                    
                    
				//********************* End of Bitcoin section ********************
				
				//***************** Home page Class ********************
				   
				    if(jQuery('.page-gettingstarted #block-system-main').find('div').hasClass('view-id-cryptomaniaks_chapters view-display-id-page')) {
						  jQuery('body').addClass('bheader_mobile');
					}
				
                //******************* End of Home page Class *************************
                
                
                //******************* Normal chapter video section **********************
                
                 var v_data = jQuery('.page-normalchapter .nchapter-listing-page .left-content div.watch-video-content').html();          
                                               
                 jQuery('.page-normalchapter .nchapter-listing-page .left-content .watch_video a').append('<div class="watch-video-content">'+v_data+'</div>');                
                                   
                 jQuery('.page-normalchapter .nchapter-listing-page .left-content .video-wrapper > div:nth-child(2)').remove();
                 
                 jQuery(".page-normalchapter .nchapter-listing-page .left-content .watch_video a").one('click',function(){					
					 jQuery('.page-normalchapter .nchapter-listing-page .left-content .video-wrapper .watch_video a > div').hide();
					 jQuery('.page-normalchapter .nchapter-listing-page .left-content .video-wrapper .watch_video a > div:nth-child(1)').show();					 					 					 					 
				 });                 
                 
                 
                  // var neo_data = jQuery('.altcoin-watch-video .views-field-field-watch-video div.watch-video-content').html();
//                  
                  // jQuery('.altcoin-watch-video .views-field-field-watch-video .watch_video a').append('<div class="watch-video-content">'+neo_data+'</div>');
// 
                  // jQuery('.altcoin-watch-video .views-field-field-watch-video .watch_video > .watch-video-content').remove(); 
//                  
                 // jQuery(".altcoin-watch-video .views-field-field-watch-video .watch_video a").one('click',function(){					
					  // jQuery('.altcoin-watch-video .views-field-field-watch-video .video-wrapper .watch_video a > div').hide();
					  // jQuery('.altcoin-watch-video .views-field-field-watch-video .video-wrapper .watch_video a > div:nth-child(1)').show();					 					 					 					 
				  // });
//                  
                  // jQuery('.nchapter-pager a.altcoin_popup').one('click',function(){					
					 // jQuery('.altcoin-watch-video .views-field-field-watch-video .video-wrapper .watch_video a > div').remove();
					  // jQuery('.altcoin-watch-video .views-field-field-watch-video .watch_video a').append('<div class="watch-video-content">'+neo_data+'</div>');
				  // });
				 
				 
                
                //******************* End of Normal chapter video section *****************
                
                
                //************************ Pager single content revome button ****************
                
                   if(jQuery('.nchapter-listing-page .nchapter-pager > div').hasClass('item-list')){			     
					   }
					   else{						   
						    jQuery('.nchapter-listing-page .nchpater-nbutton').remove();
					   }
                
                //************************ End of Pager single content revome button ***********
               
               // //********* Altcoins Popup page ******************************** 
                // jQuery('.node-type-altcoin-chapter .footer_outer .footer-altcoin-link .altcoin_popup').one("click", function(){					
					// //alert()
					// console.log(jQuery(this).text());
// 					
					// if(jQuery(this).text() == 'Open list of Altcoins'){						 
						  // jQuery(this).text('Close list of Altcoins');
						  // jQuery('body').addClass('altcoin_pop');
						  // jQuery('.node-type-altcoin-chapter #cboxOverlay').show();
						   // jQuery('.node-type-altcoin-chapter #colorbox').show();
					 // }
					 // else{
						   // jQuery(this).text('Open list of Altcoins');
						   // jQuery('body').removeClass('altcoin_pop');
						   // jQuery('.node-type-altcoin-chapter #cboxOverlay').hide();
						   // jQuery('.node-type-altcoin-chapter #colorbox').hide();
// 						   							 
						 // }	
				  // });
				  // jQuery('.node-type-altcoin-chapter #colorbox #cboxContent #cboxClose').click(function(){
// 
					  // jQuery('.node-type-altcoin-chapter .footer_outer .footer-altcoin-link .altcoin_popup').text('Open list of Altcoins');
					  // jQuery('body').removeClass('altcoin_pop');		
// 					  
				   // });
                // //********* End of Altcoins Popup page ***************************
//                 
                
                //************ Menu Slider Block ***************************
               
               /* Used in custom.js file
                jQuery('.nchapter-pager .menu-btn-2').click(function(){
					
					if(jQuery('.nchapter-pager .menu-btn-2 > strong').text() == 'MENU'){						 
						  jQuery('.nchapter-pager .menu-btn-2 > strong').text('CLOSE');						  
					 }
					 else{
						   jQuery('.nchapter-pager .menu-btn-2 > strong').text('MENU');						   							 
						 }	
					
				 });
                
                 */
                 
                
                //************ End of Menu Slider Block ***************************
                
                
                //************ Quick Tab Altcoin page ***************************
                  // var $i = 0;
                  // jQuery('#block-quicktabs-neo-altcoin #quicktabs-container-neo_altcoin').each(function(){
// 					  
// 					  
					  // console.log('shdbs')
					  // // if(jQuery('#quicktabs-tabpage-neo_altcoin-'+$i+' .view-id-altcoin .field-content').is(':empty')){
// // 						
						 // // //console.log(); 
						 // // //alert($i); 
// // 						  
						// // }
// 					  
					 // });
                
                //************ End of Quick Tab Altcoin page **********************
                
                
                

                
			} // Closing of Attach function
		};
		
		// $(document).ready(function(){
// 			
			// $("iframe").attr("allowfullscreen","allowfullscreen");
		// });
	}(jQuery, Drupal));
	
