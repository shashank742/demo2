$(document).ready(function(){
	var scrollingValue=0;
	$(".menu").click(function(event){
		event.stopPropagation();
		
	})
$(".menu-icon").click(function(event){
	event.stopPropagation();
	$(".menu-icon").toggleClass("icon-menu");
	($(".menu").css("display")=="block")?$(".menu").css("display","none"):$(".menu").css("display","block");	
	$(".cross1").toggleClass("cross11");
	$(".cross2").toggleClass("cross22");
	$(".cross3").toggleClass("cross33");
	$(".menu-icon").toggleClass("icons");
	// $(".menu-icon .cross2").css("opacity","0");
	// $(".menu-icon .cross1").css("transform","rotate(-45deg)");
	// $(".menu-icon .cross3").css("transform","rotate(45deg)");
});
$(".login-button").click(function(){
	$(".login-wrapper,.login-page").css("display","block");
	$(".menu,.icon-menu").css("display","none");
	$('body').addClass("fixedScroll");
	// scrollingValue=$(window).scrollTop()
	
	
		
	
});
$(".login-wrapper").click(function(event){
	
	$(".login-wrapper,.login-page").css("display","none");
	$(".menu,.icon-menu").css("display","block");
	$('body').removeClass("fixedScroll");
});
$(".login-page").click(function(event){
	event.stopPropagation();
})
$( window ).resize(function() {
 if($( window ).width()>767){
 	$(".menu").css("display","block");
 	$(".menu-icon").addClass("icon-menu");
 }
 else{
 	
 	$(".menu").css("display","none");
 		$(".menu-icon").removeClass("icon-menu");
 		$(".cross1").removeClass("cross11");
	$(".cross2").removeClass("cross22");
	$(".cross3").removeClass("cross33");
 }
 console.log()
});
// $("body").click(function(){				
	// $(".mob-menu").css("display","none");
	// });
	$(window).scroll(function(){
		if($('body').hasClass("fixedScroll")){
			$(window).scrollTop(scrollingValue)
		}
	})
});

