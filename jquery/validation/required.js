// document.form.element()
( function($) {
		$.fn.requiredFields = function(params) {
			var input=true;
			var defaults={
				validate:{
						stringOnly:{
							checkInput:"stringOnly",
							onlyString:"stringOnly",
							fun:["checkInput","onlyString"]
						},
						numberOnly:{
							checkInput:"numberOnly",
							onlyNum:"numberOnly",
							fun:["checkInput","onlyNum"]							
						},
						phoneNumber:{
							checkInput:"phoneNumber",
							onlyNum:"phoneNumber",
							phoneNum:"phoneNumber",	
							fun:["checkInput","onlyNum","phoneNum"]
						},
						age:{
							checkInput:"age",
							onlyNum:"age",
							validAge:"age",
							fun:["checkInput","onlyNum","validAge"]
						},
						email:{
							checkInput:"email",
							validEmail:"email",
							fun:["checkInput","validEmail"]
						},
						selectGender:{
							gender:"selectGender",
							fun:["checkInput"]
						},
						resetInput:{
							input:"resetInput",
							fun:["resetInput"]
						},
						resetSelect:{
							select:"resetSelect",
							fun:["resetSelect"]
						}
					}
					
       
          
         
         };
       
        var obj1 = JSON.stringify(defaults);         
        var  obj= $.parseJSON(obj1);
        console.log(typeof obj)
       var sha=  obj.validate.stringOnly.fun[0]
       console.log( eval(sha))
        
        
          var options = $.extend({},defaults,params);			  
    $("form").css("background",options.bg);
     $("form .inputField").css("color",options.inputColor);
     $("form div").css("color",options.divColor);            
			var formLength=document.forms[0].elements.length;			
			$("form .submitButton").click(submit);
			function submit(){
				for(var i=0; i<formLength; i++){								
				var tags=document.forms[0].elements[i].nodeName;
				// alert(typeof tags)
				if(tags=="INPUT"){
				//console.log($("input").hasClass(options.validate.stringOnly.onlyString))
					 if($("input").hasClass(options.validate.resetInput.input)){
					 $("form").children(".wrapper").eq(i).find('input').focusin()			
				     $("form").children(".wrapper").eq(i).find('input').focusout()										
					 }					
				}
				if(tags=="SELECT"){
				//console.log($("input").hasClass(options.validate.stringOnly.onlyString))
					 if($("select").hasClass(options.validate.resetSelect.select)){
					  $("form").children(".wrapper").eq(i).find('select').focusin()		
				     $("form").children(".wrapper").eq(i).find('select').focusout()							 					
					 }					
				}						
			}	
			if($("form").find(".error").text()){				   
					 	 return false;
					 }						 	
			}								
			if(options.validate.stringOnly){
			
				$("."+ options.validate.stringOnly.checkInput).focusout(checkInput)	
				$("."+ options.validate.stringOnly.onlyString).focusout(onlyString)	
			}		
			if(options.validate.phoneNumber){
				
					$("."+ options.validate.phoneNumber.checkInput).focusout(checkInput)
					$("."+ options.validate.phoneNumber.onlyNum).focusout(onlyNum)
					$("."+ options.validate.phoneNumber.phoneNum).focusout(phoneNum)
			}
				if(options.validate.age){
					$("."+ options.validate.age.checkInput).focusout(checkInput)
					$("."+ options.validate.age.onlyNum).focusout(onlyNum)
					$("."+ options.validate.age.validAge).focusout(validAge)
				}								
				if(options.validate.email){
					
						$("."+ options.validate.email.validEmail).focusout(email)
					$("."+ options.validate.email.checkInput).focusout(checkInput)			
				}				
				if(options.validate.selectGender){
					$("."+ options.validate.selectGender.gender).focusout(gender)
				}				
				if(options.validate.resetInput){
					$("."+ options.validate.resetInput.input).focusin(resetInput)
				}				
				if(options.validate.resetSelect){
					$("."+ options.validate.resetSelect.select).focusin(resetSelect)
				}
				
				
			
   
			
			
			
			
			// var checkInput, onlyString, onlyNum, email, validAge, phoneNum, selection;
			var bool=true;
			
			
			
			function resetInput() {
				
				$(this).css("border", "1px solid black").siblings(".error").remove();
			};
			var is
			function checkInput() {
				checkInput = ($("input").val() == " ");
				($(this).val() == "") ? $(this).css("border", "1px solid red").after("<span class='error' >fill it</span>") : "";
				$("form").find(".error").css("color","red");
			};
		
			function onlyString() {
				var text = $(this).val();
				// onlyString = !$("input").val().match(/^[a-zA-Z]+$/);
				(!$(this).val().match(/^[a-zA-Z]+$/) && !($(this).val() == "")) ? $(this).css("border", "1px solid red").after("<span class='error'>Enter String only</span>") : "";
				$("form").find(".error").css("color","red");
			}
		
			function onlyNum() {
				
				var num = $(this).val();
				// onlyNum = (isNaN(num));
				bool=(isNaN(num));
				
				(bool) ? $(this).css("border", "1px solid red").after("<span class='error'>Enter number only</span>") : "";
				$("form").find(".error").css("color","red");
				
				
			}
			
			function email() {
				// email = (!$("input").val().match(/^[\w-.+]+\@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/) && !($(this).val() == ""));
				(!$(this).val().match(/^[\w-.+]+\@[a-zA-Z0-9.-]+.[a-zA-z0-9]{2,4}$/) && !($(this).val() == "")) ? $(this).css("border", "1px solid red").after("<span class='error'>Enter Email only</span>") : "";
				$("form").find(".error").css("color","red");
			}
			// $("form .select").on("change", function() {
				// //$("form .select").siblings(".error").remove();
			// });
			
			function validAge() {
				
				var age = $(this).val();
				// validAge = $("input").val().match(/^[0-9]{1,2}$/);
				if(bool==false){
					
				(!$(this).val().match(/^[0-9]{1,2}$/) && !($(this).val() == "") ) ? $(this).css("border", "1px solid red").after("<span class='error'>Enter age between 1-99</span>") : "";
				$("form").find(".error").css("color","red");
			}
			}
			
			function phoneNum() {
				var num = $(this).val();
				// phoneNum = $("input").val().match(/^[0-9]{10,10}$/);
				if(bool==false){
					
				(!$(this).val().match(/^[0-9]{10,10}$/) && !($(this).val() == "") ) ? $(this).css("border", "1px solid red").after("<span class='error'>Enter valid mobile number</span>") : "";
				$("form").find(".error").css("color","red");
			}
			}
			
			
			$("form .select").focusout(gender)
			function gender(){
				if (($(this).prop('selectedIndex') == 0)) {
					$(this).css("border", "1px solid red").after("<span class='error'>need to select one</span>");
					$("form").find(".error").css("color","red");
				}
			}
			
			function resetSelect(){
				$(this).css("border", "1px solid black").next(".error").remove();
			}
			
			
			
			// function submit() {
				// $("form").each(function(){})
// 					 
// 				
				// $("form .inputField").trigger("focusin");
				// $("form .select").next(".error").remove();			   	
				// $("form .inputField").trigger("focusout");
				  // $("form .select").trigger("focusout");
// 				 
// 				
				// if ($("form").find(".error").html()) {
// 				
			// $("form .inputField").css("border", "1px solid black").next(".error").remove();						  
					// $("form .inputField").trigger("focusout");
					// $("form .onlyString").trigger("focusout");
					// $("form .age").trigger("focusout");
					// $("form .phoneNum").trigger("focusout");
					// $("form .email").trigger("focusout");
					// $("form .select").trigger("focusout");
					// $("form .inputField").next(".error").remove();
					// $("form .select").next(".error").remove();
					// $("form").find(".error").css("color",options.errorColor);					
					// return false;
// 					
				// } 
			// };
			
			
			
		};
	}(jQuery));
