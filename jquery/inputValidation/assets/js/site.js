$(document).ready(function() {

	//toggle-menu
	$(".toggle-menu").click(function() {
		$(".main-navigation").slideToggle();
	});

    //password-popup
	$(".forgot-pass").click(function() {
		$(".popup-overlay").show();
	});

	$(".close").click(function() {
		$(".popup-overlay").hide();
	});

	$(".drop-down-list").click(function() {
		$(".drop-list").slideToggle();
	});
	
	//faq-toggle
	$('.plus-img').click(function(){
    $(this).parentsUntil('.faq-listing').find('.faq-description').slideToggle();
    $(this).css({"display": "none"});
    $(this).parentsUntil('.faq-listing').find('.minus-img').css({"display": "block"});
  });
  $('.minus-img').click(function(){
    $(this).parentsUntil('.faq-listing').find('.faq-description').slideToggle();
    $('.plus-img').css({"display":"block"});
    $(this).css({"display": "none"});
  });

   //tabbing
	$("#tabs").tabs();
	$("#tabs2").tabs();
	$("#tabs3").tabs();
	$("#tabs4").tabs();
	$("#tabs5").tabs();
	$("#tabs6").tabs();

	$('#six').change(function() {
		if (this.checked)
			$('#popup-checkbox').show();
		else
			$('#popup-checkbox').hide();

	});
	
	//datepicker
	$(".date-input").datepicker();
	
	//multiple selection
	$('.multipleSelect').fastselect();
	$('.multiSelect').fastselect();

});
