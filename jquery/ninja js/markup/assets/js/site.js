$(function() {

	//multiselect start
	if ($('.multi-selectbox').length > 0) {
		$(".multi-selectbox").multipleSelect({
			selectAll : false
		});
	}
	//multiselect end

	//custom select start
	if ($('.select').length > 0) {
		$(".select").selectbox();
	}
	//custom select end

	//sticky header start
	$(window).scroll(function() {
		var scrl = $(window).scrollTop();
		if (scrl > 0) {
			$(".sticky-header").addClass("stick");
		} else {
			$(".sticky-header").removeClass("stick");
		}
	});
	//sticky header end

	// place-slider

	if ($('.place-content').length > 0) {
		$('.place-content').slick({
			slidesToShow : 5,
			slidesToScroll : 1,
			autoplay : true,
			responsive : [{
				breakpoint : 1920,
				settings : {
					slidesToShow : 4
				}
			}, {
				breakpoint : 1600,
				settings : {
					slidesToShow : 3
				}
			}, {
				breakpoint : 1024,
				settings : {
					slidesToShow : 2
				}
			}, {
				breakpoint : 768,
				settings : {
					slidesToShow : 1,
					centerMode : true,
					centerPadding : '25px',
					arrows : false
				}
			}]
		});
	}
	// place-slider end

	// listing-slider start
	if ($('.listing-slider').length > 0) {
		$('.listing-slider').slick({
			slidesToShow : 1,
			slidesToScroll : 1,
			infinite : false,
			responsive : [{
				breakpoint : 768,
				settings : {
					centerMode : true,
					centerPadding : '25px',
					infinite : true,
				}
			}]
		});
	}
	// listing-slider end
	// review-slider start
	if ($('.review-slider').length > 0) {
		$('.review-slider').slick({
			slidesToShow : 2,
			slidesToScroll : 1,
			dots : true,
			arrows : false,
			responsive : [{
				breakpoint : 1600,
				settings : {
					slidesToShow : 1
				}
			}]
		});
	}

	// .news-slider start
	if ($('.news-slider').length > 0) {
		$('.news-slider ul').slick({
			slidesToShow : 2,
			slidesToScroll : 1,
			responsive : [{
				breakpoint : 1600,
				settings : {
					slidesToShow : 1
				}
			}]
		});
	}

	// booking-slider start
	if ($('.booking-slider').length > 0) {
		$('.booking-slider').slick({
			slidesToShow : 4,
			slidesToScroll : 1,
			responsive : [{
				breakpoint : 1025,
				settings : {
					slidesToShow : 2
				}
			}, {
				breakpoint : 768,
				settings : {
					slidesToShow : 1,
					centerMode : true,
					centerPadding : '25px',
					arrows : false
				}
			}]
		});
	}

	// selectpicker start
	if ($('.selectpicker').length > 0) {
		$('.selectpicker').selectpicker();
	}

	// humberger-click start
	$(".menu-hamburger").click(function() {
		$(this).toggleClass("hamburger-active");
		$('.menu-wrap').toggleClass("menu-wrap-active");
		$('.animation-block').toggleClass("ani");
		$('.header').toggleClass("menu-stick");
		$("html").toggleClass("hidden");
	});

	// tree animation start
	$(window).scroll(function(event) {
		var scroll = $(window).scrollTop();
		$('.ani2').css('left', scroll + 1);
		$('.ani3').css('right', scroll + 1);
		$('.ani1').css('left', scroll + 1);
	});

	// tree animation start
	if ($('#sticky-add').length > 0) {
		var x = $(".header").outerHeight();
		var y = $("#sticky-add").offset().top;
		var stick = y - x;
		if ($(window).width() > 1024) {
			$(window).scroll(function() {
				if ($(this).scrollTop() >= stick) {
					$("#sticky-add").addClass("sticky");
				} else {
					$("#sticky-add").removeClass("sticky");
				}
			});
		}
	}

	if ($('.sticky-banner').length > 0) {
		var counter = 0;
		var x = $(".addvertise-one").outerHeight();
		var y = $(".addvertise-one").offset().top;
		var stick_banner = y + x - 100;
		$(window).scroll(function() {
			if ($(this).scrollTop() >= stick_banner && counter == 0) {
				$(".sticky-banner").addClass("sticky-add");
			} else {
				$(".sticky-banner").removeClass("sticky-add");
			}

		});
	}

	$(".close-banner").click(function() {
		$(".sticky-banner").removeClass("sticky-add");
		counter++;
	});

	if ($(window).width() >= 768 && $(window).width() <= 1024) {
		$(".email-content h4").click(function() {
			$(".email-form").slideToggle();
			$(this).toggleClass("active");
		});
	}

	//datepicker
	$(function() {
		if ($('#datepicker').length > 0) {
			$("#datepicker").datepicker({
				autoclose : true,
				todayHighlight : false
			}).datepicker('update', new Date());
		}
	});
	$("body").on("click", ".current-m", function() {
		$('#datepicker').datepicker('update', new Date());
	})
	//close btn
	$(".input-group-addon").click(function() {
		$('.date-picker-wrap strong').remove();
	});
	//ready
	$(".form-input .required").focusout(function() {
		var text = $(this).val();
		//alert()
		$(this).siblings(".red").remove();
		(($(this).val() == "")) ? $(this).addClass("error").after("<span class='red' >You need to fill it first</span>") : "";
	})
	$(".form-input .required").focusin(function() {
		$(this).removeClass("error").siblings(".red").remove();
		var text = $(this).val();
		$(this).next(".red").remove();
	})
	$(".form-input .required.text-only").focusout(function() {
		var check = $(this).val();
		var textt = $(this).val();
		var text = textt.replace(/\s/g, '');

		text.trim();

		(!text.match(/^[a-zA-Z]+$/) && !(text == "") || (check[0] == " ") ) ? $(this).addClass("error").after("<span class='red' >Please enter Valid Contact name.</span>") : "";
	})

	$(".btn-wrap .btn-primary").on("click", function(e) {
		e.preventDefault();
		$(".form-input input").trigger('focusout');
		$(".dropdown-toggle.error").siblings(".red").remove();
		for (var i = 0; i < $(".dropdown-toggle").length; i++) {
			//console.log($(".dropdown-toggle").eq(i).siblings(".dropdown-menu").find(".selected").index())
			if ($(".dropdown-toggle").eq(i).siblings(".dropdown-menu").find(".selected").index() == 0) {

				$(".dropdown-toggle").eq(i).addClass("error").after("<span class='red' >You need to fill it first</span>");
			}
		}

		if ($(".fileupload-buttonbar").find(".btn-warning cancel").length == 0) {
			$(".fileupload-buttonbar").removeClass("error").siblings(".red").remove();
			$(".fileupload-buttonbar").addClass("error").after("<span class='red' >You need to upload image</span>");
		}
if(!($("body").find("#check1").is(":checked"))){
	$(".checkbox-wrap").removeClass("error").siblings(".red").remove();
	$(".checkbox-wrap").addClass("error").after("<span class='red' >You need to Select It</span>");
}
	})
	
	$("#check1").click(function(e){
		
				e.stopPropagation()
				if(!($(this).is(":checked"))){
					$(".checkbox-wrap").addClass("error").after("<span class='red' >You need to Select It</span>");
				}else{
					$(".checkbox-wrap").removeClass("error").siblings(".red").remove();
				}
				// if ($(".check-condition").find('input[type=checkbox]').is(":checked")) {
					// $(".check-condition").toggleClass("error");
					// $(".check-condition .red").css("display","none")
//    
  // }
				
			})
	
	
	
	$("body").on("click", ".fileinput-button", function() {

		$(".fileupload-buttonbar").removeClass("error").siblings(".red").remove();
	})
	$(".dropdown-toggle").click(function() {
		$(this).removeClass("error").siblings(".red").remove();
	})






$(".agent-area >ul").empty()
	window.location = "#";
	var counter = 18;
	var categoryCounter = 0;
	
	var bool = false;
	
	
	var countLoops = -1;
	function loadData(count) {

		$.ajax({
			url : "assets/json/agent.json",
			data : count,
			type : "GET",
			crossDomain : true,
			success : function(data) {
				//console.log(data)
				agentData(data, counter);
			},
			error : function(e) {

			}
		});
	}

	loadData(counter);
	function agentData(data, count) {

		var counting = 0;
		data.forEach(function(val, i) {

			if (categoryCounter < counter && countLoops < i) {

				categoryCounter++;
				countLoops = i;

				$(".agent-area >ul").append("<li><div class='d-flex agent-card align-items-center'><div class = agent-img><a href= 'javascript:void(0)'><img src = " + val.image + "></a></div><div class = agent-detail><strong><a href = 'javascript:void(0)' class = agent-title>" + val.agentTitle + "<a/></strong><address><i class = icon-map></i>" + val.address + "</address></div><div class = agent-link><a href = 'javascript:void(0)' class = btn-secondary>" + val.agentlink + "</a></div></div></li>")

			}

			counting++;

		})
		if (counter >= counting) {
			$("body").find(".btn-primary").hide();
		}

	}

	var changeUrl = 0;
	$("body").on("click", ".agent-more .btn-primary", function(e) {
		changeUrl++;
		e.preventDefault();
		counter = counter + 18;
		loadData(counter);
		window.location = "#" + changeUrl;

		//window.location.replace("http://10.0.4.6/nikhil/ninja%20js/markup/agent.html#"+changeUrl+"","_self");
	});








$(".blog-area >ul").empty();
	//window.location = "#";
	var counter2 = 9;
	var addCounter = 0;
	var categoryCounter2 = 0;
	
	var bool2 = false;
	
	
	var countLoops2 = -1;
	function loadData2(count) {

		$.ajax({
			url : "assets/json/agent2.json",
			data : count,
			type : "GET",
			crossDomain : true,
			success : function(data) {
				//console.log(data.add)
				agentData2(data.data, counter2,data.add);
			},
			error : function(e) {

			}
		});
	}

	loadData2(counter2);
	function agentData2(data, count,advertise) {

		var counting2 = 0;
		data.forEach(function(val, i) {

			if (categoryCounter2 < counter2 && countLoops2 < i) {

				categoryCounter2++;
				countLoops2 = i;
				
if(categoryCounter2 % 6 == 0){
	addCounter++;
	//console.log(addCounter,advertise)
$(".blog-area >ul").append("<li class = 'grey-bg'><div class = blog-advertisement><figure><a href = 'javascript:void(0)'><img src = "+ advertise[addCounter].addimage+"></a></figure><i class = large-star><img src = 'assets/images/wheel-large.png'></i><i class = medium-star><img src = 'assets/images/wheel-one.png'></i><i class = small-star><img src = 'assets/images/wheel-small.png'></i></div></li>")
}else{
	$(".blog-area >ul").append("<li><div class = blog><figure><a href = 'javascript:void(0)'><img src = " + val.image + "><i><img src = " + val.logo + "></i></a></figure><div class = blog-body><span>" + val.blogTitle + "</span><strong><a href = 'javascript:void(0)'>" + val.blog + "</a></strong><span>" + val.date + "</span></div></div></li>")
}
if(categoryCounter2 % 3 == 0){
	
	$(".blog-area >ul li:last-child").addClass("mr-0")
}
if(categoryCounter2 % 6 == 0){
	
	$(".blog-area >ul >li:last-child").after("<li class = 'w-100 hidden-sm hidden-xs'><figure><img class = 'hidden-xs' src = "+ advertise[addCounter].addlogo+"></figure></li>")
}
				

			}

			counting2++;

		})
		if (counter2 >= counting2) {
			$("body").find(".blog-more .btn-more").hide();
		}

	}

	//var changeUrl = 0;
	$("body").on("click", ".blog-more .btn-more", function(e) {
		//changeUrl++;
		e.preventDefault();
		counter2 = counter2 + 6;
		loadData2(counter);
		//window.location = "#" + changeUrl;

		//window.location.replace("http://10.0.4.6/nikhil/ninja%20js/markup/agent.html#"+changeUrl+"","_self");
	});


});
