
// if(!$(this).val().match(/^[a-zA-Z]+$/))
// if(!$(this).val().match(/^[\w-.+]+\@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/))



( function($) {
		$.fn.requiredFields = function() {
      var checkInput;
			// $(".onlyString").on("keydown", function(event) {
				// $("#id").html(event.type + ": " + event.which);
			// });
// $("input").attr("required", "required");
			$("form .inputField").focusin(function() {
				
				$(this).css("border", "1px solid black").siblings("span").remove();

			});
			$("form .inputField").focusout(function() {
			checkInput=($(this).val() == "");
			
				($(this).val() == "")?$(this).css("border", "1px solid red").after("<span>fill it</span>").siblings("span").css("color","red"):"";

			});
			
			
			
			
			

			$("form .onlyString").focusout(function() {
				var text = $(this).val();
				// alert(text.length)

				(!$(this).val().match(/^[a-zA-Z]+$/)&& !($(this).val() == ""))?$(this).css("border", "1px solid red").after("<span>Enter String only</span>").siblings("span").css("color","red"):"";

				// if((text=="")||(!isNaN(text))){$(this).closest("div").append("<span>only string</span>").find("span").css("color","red")}else{$(this).siblings("span").remove();}
				//($(this).val()=="")?$(this).closest("div").append("<span>This field is required</span>").find("span").css("color","red"):$(this).siblings("span").remove();
			})
			
			
			$("form .onlyNum").focusout(function() {
                  	var num = $(this).val();
				(isNaN(num)) ? $(this).css("border", "1px solid red").after("<span>Enter number only</span>").siblings("span").css("color", "red") : "";

			})
			
			
			$("form .email").focusout(function() {
				// $("[title*='hello']")
                     (!$(this).val().match(/^[\w-.+]+\@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/)&& !($(this).val() == ""))?$(this).css("border", "1px solid red").after("<span>Enter Email only</span>").siblings("span").css("color","red"):"";
				// ($(this).val() == "") ? $(this).closest("div").append("<span>Enter email address</span>").find("span").css("color", "red") : "";
			})

			$("form .select").on("change", function() {
				$("form .select").siblings("span").remove();
			});
			
			
			$("form .age").focusout(function(){
				
		
				var age=$(this).val();
				
				
				 (((age<17) || (age>71)) && !($(this).val() == "") )? $(this).css("border", "1px solid red").after("<span>Enter age between 17-70</span>").siblings("span").css("color", "red") : "";
				})
				
				$("form .phoneNum").focusout(function(){
				
		
				var num=$(this).val();
				
				
				 (((num<=99999999) || (num>999999999)) && !($(this).val() == "") )? $(this).css("border", "1px solid red").after("<span>Enter valid mobile number</span>").siblings("span").css("color", "red") : "";
				})
		
			//
			// ($(this).index()==0)?$(this).closest("div").append("<span>need to select one</span>").find("span").css("color","red"):$(this).closest("div").find("span").remove();
			// return false;
			//
			// });
			// $(".selectionBox select").on("change",function(){
			//
			// ($(this).index()==0)?$(this).closest("div").append("<span>need to select one</span>").find("span").css("color","red"):$(this).closest("div").find("span").remove();
			//
			// })
			// $(".selectionBox select option").on("click","select",function(){
			// ($(this).index()==0)?$(this).closest("div").append("<span>need to select one</span>").find("span").css("color","red"):$(this).closest("div").find("span").remove();
			//
			// })

			// $(".submitButton").click(function(){
			// ($(".selectionBox select option").index==0)?
			// })

			$("form .submitButton").click(function() {
				$("form .inputField").trigger("focusin");
$("form .select").siblings("span").remove();


				if (($(".select").prop('selectedIndex') == 0)) {
					
					$(".select").after("<span>need to select one</span>").siblings("span").css("color", "red");
				
                     $("form .inputField").trigger("focusout");
					
					
					return false;

				}

else{
	
$("form .inputField").trigger("focusout");

if(checkInput){
	return false;
}
}
			});

		};

	}(jQuery));
