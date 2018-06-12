( function($, Drupal) {
		// I want some code to run on page load, so I use Drupal.behaviors
		Drupal.behaviors.custom = {
			attach : function() {
                var id;
				var liWidth = 0;
				
				liWidth = ($(window).width() * 30) / 100;				
				var liLength = $(".cryptomaniaks_listing li").length;
				slideTime = liLength * 1000;
				console.log(slideTime)
				var totalLiWidth = liLength * Math.round(liWidth);
				slidingWidth = totalLiWidth - $(window).width();
			if ($(window).width() > 767) {
				$(".cryptomaniaks_listing li").css("width", liWidth)
				$("body").on("mouseenter",".slide", function(event) {
					event.stopPropagation();
					event.preventDefault();										
					console.log(event.pageX)
				 if (event.pageX < 100) {
				 	 $("#mCSB_1_container").animate({left: 0},slideTime);
               
					 }										
					if (event.pageX > ($(window).width()-100)) {
						
						  $("#mCSB_1_container").animate({left: -slidingWidth},slideTime);
					}
					
					
				});
				$("body").on("mouseout",".slide", function(event) {
						 $("#mCSB_1_container").stop();
				});
			}

				
		if ($(window).width() < 768) {
			
			var tLiWidth = liLength * Math.round($(window).width());
			var slideWidth = tLiWidth - $(window).width();
					$(".cryptomaniaks_listing li").css("width", $(window).width())
					var mobWidth=0;
					 var lastY;
					 var lastX;
var currentY;
var currentX;
var bool=false;
// reset touch position on touchstart
$('.chapter_background').bind('touchstart', function (e){
	e.stopPropagation();
	// e.preventDefault();
	bool=true;
    var currentX = e.originalEvent.touches[0].clientX;
    lastY = e.originalEvent.touches[0].clientY;
    lastX = currentX;
   
});
// get movement and scroll the same way
$('.chapter_background').bind('touchmove', function (e){
	e.stopPropagation();
	if(bool){
		bool=false;
    var currentX = e.originalEvent.touches[0].clientX;
      currentY = e.originalEvent.touches[0].clientY;
      //console.log(lastY+" "+currentY)
    if(lastX > currentX ){
    	console.log(slideWidth)
    	console.log($("#mCSB_1_container").css("left"))
    	//alert(parseInt($("#mCSB_1_container").css("left")))
    	if(parseInt($("#mCSB_1_container").css("left"))>-slideWidth){
    	console.log($("#mCSB_1_container").css("left"))
    	// if($("#mCSB_1_container").css("left")>=-slideWidth){
    	
    	
    	mobWidth =mobWidth + $(window).width();
    	$("#mCSB_1_container").animate({left:-mobWidth },500);
    	}
    	// }
    }else{
    	if(parseInt($("#mCSB_1_container").css("left"))<0){
    mobWidth =	mobWidth - $(window).width();
    	$("#mCSB_1_container").animate({left:-mobWidth },500);
    }
    }
    }
    // delta = currentY - lastY;
// this.scrollTop += delta * -1;
// lastY = currentY;

});
					
					
				}
				$(window).resize(function(){
					if ($(window).width() < 768) {
					$(".cryptomaniaks_listing li").css("width", $(window).width())
				}
				})
 // $( ".chapter_background a" ).on("touchmove",function(event,direction){
 	// console.log(event)
 	// console.log(direction)
 	// console.log("swef")
					 	// //alert()
// 					 	
					 // });
					
					 
				 

			}
		};
	}(jQuery, Drupal));
