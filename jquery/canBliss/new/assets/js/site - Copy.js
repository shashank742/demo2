
// variables for datamap
var bubbleRender,speciesTXT="",LocationTXT="",LightingTXT="",TrimmedTXT="",speciesTXT2="",LocationTXT2="",LightingTXT2="",TrimmedTXT2="";
var filteredArray=[],speciesobj={},locationobj={},lightObj={},trimmedobj={};
$(window).load(function() {
	$(".filter-list a").attr("href","javascript:void(0);");
	$(".text-right.filter-list-btn li a").attr("href","javascript:void(0);");
	speciesTXT2=$(".filter-species h3").text().trim();
	LocationTXT2=$(".filter-location h3").text().trim();
	LightingTXT2=$(".filter-lighting h3").text().trim();
	TrimmedTXT2=$(".filter-trimmed h3").text().trim();
	if ($('.chart-tab').length > 0) {
	$('.chart-tab-link li').on("click", function() {
		$(this).siblings('li').removeClass('active');
		$(this).addClass('active');
		var indx = $(this).index();
		$('.chart-tab-content > div').removeClass('active');
		$('.chart-tab-content > div').eq(indx).addClass('active');
	});
}
	if ($('.Platinum-wrap').length > 0) {
	    $('.zoom-img').zoom();
	}
	
	$('.merch-description').slick({
		infinite : true,
		slidesToShow : 3,
		slidesToScroll : 3,
		settings : "slick",
		responsive : [{
			breakpoint : 767

		}]
	});

	$('.approve-description').slick({
		infinite : true,
		slidesToShow : 3,
		slidesToScroll : 3,
		settings : "slick",
		responsive : [{
			breakpoint : 767
		}]

	});


	$('body').click(function() {
		$('.embed-responsive-item')[0].pause();
	});
});
$(".filter").click(function(){
	$(".filter-listWrap").slideToggle()
});

$(document).on('click touchstart', function(event) { 
          if (!$(event.target).closest('.filter-listWrap,.filter').length)  {
                $(".filter-listWrap").slideUp();
          }
       });

if ($('.address-tab-link').length > 0) {
	$('.address-tab-link li').on("click", function() {
		
		$(this).siblings('li').removeClass('active');
		$(this).addClass('active');
		// var indx = $(this).index();
		// $('.address-info').removeClass('active');
		// $('.address-info').eq(indx).addClass('active');
	});
}

if ($(window).width() > 767) {
	$('.subpage-strain-slider').slick({
		infinite : true,
		slidesToShow : 4,
		slidesToScroll : 4,
		settings : "slick",
		responsive : [{
			breakpoint : 767
		}]

	});
	}
	
	
	
	
		
		
	if ($(window).width() > 767) {
	$('.subpage-library .farm-description').slick({
		infinite : true,
		slidesToShow : 3,
		slidesToScroll : 3,
		settings : "slick",
		responsive : [{
			breakpoint : 767
		}]

	});
	
	
	if($(window).width() > 767){
	$('.subpage-silderWrap').slick({
		infinite : true,
		slidesToShow : 1,
		slidesToScroll : 1,
		settings : "slick",
		centerMode: true,
        centerPadding: '220px',
		responsive : [{
			breakpoint : 1024,
      settings: {
      	centerMode: true,
        centerPadding: '65px'
		}
		}
		]
   
     
	});
	}
	$('.subpage-silderWrap').on('setPosition', function() {
            $(this).find('.slick-slide').height('auto');
            var slickTrack = $(this).find('.slick-slide');
            var slickTrackHeight = $(slickTrack).height();
            $(this).find('.venus-slider-content video').css('height', + slickTrackHeight + 'px');
        });
	
	

	
	$(".video-player").click(function(){
		$('.subpage-banner video,.venus-slider-content video')[0].play(); 
		$(this).css("display","none");
	});
	$(".play-videobtn").click(function(){
		$('.testing-videoWrap video')[0].play(); 
		$(this).css("display","none");
	});
	
	
	
	
	}
$(document).ready(function(){
$("body").find("li.venusFilter").addClass("active");
	var counter = 10;

		var categoryCounter = 0;
		var categoryCounters = 0;
	var bool = false;
	var checkClass = "xyz";
	var countLoop = -1;
	var countLoops = -1;
	function loadData(count){
		
		$.ajax({
		url : "assets/json/farmersdata.json",
		data : count,
		type : "GET",
		crossDomain:true, 
		success : function(data) {
			farmerData(data,counter);					
		},
		error : function(e) {
		
		}				
	  });
	}
	loadData(counter);
	
	function farmerData(data,count){
		var holdactive = $("body").find(".available-btn").parent().prev().find(".active").attr("filterCan");	
		if(checkClass != holdactive){			
			 $(".available-content >ul").empty();						
		}else{
			
		}		
		checkClass = holdactive;	
			var counting = 0;		
		data.forEach(function(val,i){
if(val.category == holdactive && categoryCounter<counter && countLoops < i){
categoryCounter++;
countLoops = i;
			$(".available-content >ul").append("<li class = '"+val.category+"'><a href = 'javascript:void(0)'><img src = "+val.image+" alt = 'oval'><span class = 'venus-number'>"+val.venuNumber+" </span><span class = 'venus-farms'> "+val.venusFarms+"</span></a></li>")
	}	
	if(val.category == holdactive){
		counting++;				
	}
		})		
	
		if(counter>=counting){
		$("body").find(".available-btn").hide();
		}
	
		}
		$("body").on("click",".available-btn >.btn-default",function(e){
			e.preventDefault();			
			counter = counter+10;					
			loadData(counter);						
		})
		
	$("body").one("click",".available-btn >.btn-default",function(e){
		e.preventDefault();				
	})


	$("body").on("click",".available-link li",function(e){
		e.preventDefault();
		$(".available-content >ul").empty();
		$("body").find(".available-btn").show();
		counter = 10;
		categoryCounter= 0;
		countLoop = -1;
$(this).siblings('li').removeClass('active');
		$(this).addClass('active');	
		loadData(counter);	
	})
	
	
	
				
				var geocoder, map, infowindow, home;
			var markers = [];
			var distance_bounds = 24;
			$.getJSON("assets/json/mapdata.json", function(result){
 
   if($("#map").length>0){
   demo(result);
     } 
       
    });
    function demo(stores){
			initMap();
			function initMap() {
				infowindow = new google.maps.InfoWindow({
					content : ''
				});
				geocoder = new google.maps.Geocoder();
				map = new google.maps.Map(document.getElementById('map'), {
					center : {
						lat : 36.778261,
						lng : -119.417932
					},
					zoom : 6,
					styles : [ { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [ { "color": "#444444" } ] }, { "featureType": "landscape", "elementType": "all", "stylers": [ { "color": "#f2f2f2" } ] }, { "featureType": "poi", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "road", "elementType": "all", "stylers": [ { "saturation": "0" }, { "lightness": "0" }, { "hue": "#ffc000" }, { "gamma": "0.23" } ] }, { "featureType": "road.highway", "elementType": "all", "stylers": [ { "visibility": "simplified" } ] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [ { "hue": "#ffc000" } ] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [ { "hue": "#ffc000" } ] }, { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [ { "hue": "#ffc000" } ] }, { "featureType": "road.highway", "elementType": "labels.text.stroke", "stylers": [ { "hue": "#ffc000" } ] }, { "featureType": "road.arterial", "elementType": "labels.icon", "stylers": [ { "visibility": "off" } ] }, { "featureType": "transit", "elementType": "all", "stylers": [ { "visibility": "off" } ] }, { "featureType": "water", "elementType": "all", "stylers": [ { "color": "#46bcec" }, { "visibility": "on" } ] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "hue": "#ffc000" } ] }
]
				});
				var loc = {
					lat : 37.363632,
					lng : -121.881406
				};
				var stores_array = stores;
			
				for (var i = 0; i < stores_array.length; i++) {
					var info = '<h3 style="font-size: 1.6rem;font-weight: bold;margin: 0;">' + stores_array[i].name + '</h3>';
					info += '<p style="font-size: 1.2rem; margin: 0; padding-bottom: 5px;">' + stores_array[i].address + '<br />' + stores_array[i].city + ' ' + stores_array[i].zip;
					if (stores_array[i].tel != '') {
						info += '<br />Tel: ' + stores_array[i].tel;
					}
					info += '</p>';
					info += '<a style="text-decoration: none; font-weight: bold; color: #000000;" href="' + stores_array[i].web + '" target="_blank">WEBSITE &gt;</a>';
					var store = false, delivery = false, adult = false;
					if (stores_array[i].filter == 'store') {
						map_icon = 'assets/images/Location.png';
						info += '<p style="color: #4a4a4a;text-align: center;margin-bottom: 0px;margin-top: 6px;text-transform:uppercase;text-align:center;font-weight:600;">Medical</p>';
						store = true;
					}
					if (stores_array[i].filter == 'adult') {
							map_icon = 'assets/images/Location.png';
						info += '<p style="color: #4a4a4a;text-align: center;margin-bottom: 0px;margin-top: 6px;text-transform:uppercase;text-align:center;font-weight:600;">Adult Use</p>';
						adult = true;
					}
					if (stores_array[i].filter == 'delivery') {
							map_icon = 'assets/images/Location.png';
						info += '<p style="color: #4a4a4a;text-align: center;margin-bottom: 0px;margin-top: 6px;text-transform:uppercase;text-align:center;font-weight:600;">delivery</p>';
						delivery = true;
					}
					var marker = new google.maps.Marker({
						position : {
							lat : parseFloat(stores_array[i].lat),
							lng : parseFloat(stores_array[i].lng)
						},
						icon : map_icon,
						info : info,
						map : map,
						store : store,
						adult : adult,
						delivery : delivery

					});
					markers.push(marker);

				}

				for (var i = 0; i < markers.length; i++) {
					var marker = markers[i];
					google.maps.event.addListener(marker, 'click', function() {
						infowindow.setContent(this.info);
						infowindow.open(map, this);
					});
				}
				setTimeout(function() {

					$("body").find(".gm-fullscreen-control").parent().remove()

				}, 3000)

			}

			function hideMarkers() {
				for (var i = 0; i < markers.length; i++) {
					markers[i].setVisible(false);
				}
				infowindow.close();
			}

			function showMarkers() {

				for (var i = 0; i < markers.length; i++) {
					markers[i].setVisible(true);
				}
			}

			function showDosePenLocations() {
				infowindow.close();
				for (var i = 0; i < markers.length; i++) {
					if (markers[i].adult) {
					
						markers[i].setVisible(true);
					} else {
						markers[i].setVisible(false);
					}
				}
			}


		
				function getLocalStores(lat, lng) {
					var stores_array = stores;

					var html_rest = '';

					for (var i = 0; i < stores_array.length; i++) {
						value = stores_array[i];
						var d = parseInt(distanceBetweenLatLongPair(lat, lng, parseFloat(value.lat), parseFloat(value.lng)));
						if (d < distance_bounds) {
							html = '<li class="">';
							html += '<h5>' + value.name + '</h5>';
							html += '<address>' + value.address;
							if (value.tel != '') {
								html += '<br />Tel: ' + value.tel + '<br />';
							}
							if (value.web != '') {
								html += '<a href="' + value.web + '" target="_blank">Website &gt;</a><br />';
							}

							html += '</address></li>';
							html_rest += html;
						}

					}
					return html_rest
				}

				function deg2rad(deg) {
					return deg * (Math.PI / 180);
				}

				function distanceBetweenLatLongPair(lat1, lon1, lat2, lon2) {
					var R = 6371;
					// Radius of the earth in km
					var dLat = deg2rad(lat2 - lat1);
					// deg2rad below
					var dLon = deg2rad(lon2 - lon1);
					var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
					var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
					var d = R * c;
					// Distance in km
					return d;
				}

				function zip() {
				
					if ( typeof home !== "undefined") {
						home.setMap(null);
					}
					var zip = $('#zipcode').val();
					//var isValidZip = /(^\d{5}$)|(^\d{5}-\d{4}$)/.test(zip);
					if (zip) {
						$(".actual-area").mCustomScrollbar("destroy");
						$('#zipcode').removeClass('ziperror');
						geocoder.geocode({
							'address' : zip
						}, function(results, status) {
							if (status == 'OK') {
								map.setCenter(results[0].geometry.location);
								home = new google.maps.Marker({
									map : map,
									position : results[0].geometry.location
								});
								map.setZoom(11);
								map.panTo(home.position);

								var loc = getLocalStores(results[0].geometry.location.lat(), results[0].geometry.location.lng());
								if (loc == '') {
									$('#find-us-space-stores .actual-area').html('<p>No local stores found</p>');
								} else {

									$('#find-us-space-stores .actual-area').empty().append(loc);
									setTimeout(function() {

										$(".actual-area").mCustomScrollbar();
									}, 500)

								}

							} else {

							}
						});
					} else {
						$('#zipcode').addClass('ziperror');
					}
				}


				$('#zipbutton').on('click', function(e) {
					e.preventDefault()
					zip();
				});
				$('#zipcode').keypress(function(e) {
					if (e.which == 13)
						zip();
				});
				$('#clear').on('click', function() {
					$('#zipcode').val('');
					initMap();

					$('#find-us-space-stores .actual-area').html('<p>Please enter your zip code above to find your nearest stores.</p>');

					showMarkers();

				});

				$('#map-toggle-stores').on('click', function(e) {

					infowindow.close();
				
					e.preventDefault();

					for (var i = 0; i < markers.length; i++) {
						if (markers[i].store) {
						
							markers[i].setVisible(true);
						} else {
							markers[i].setVisible(false);
						}
					}

				});

				$('#map-toggle-delivery').on('click', function(e) {
					infowindow.close();
				
					e.preventDefault();
					for (var i = 0; i < markers.length; i++) {
						if (markers[i].delivery) {
						
							markers[i].setVisible(true);
						} else {
							markers[i].setVisible(false);
						}
					}

				});

				$('#map-toggle-dose-pen-50').on('click', function(e) {
				
					e.preventDefault();

					showDosePenLocations();
				});

			
}

       bubbleRender= function(){
       	
       	  $('.bliss-map-wrap').empty();
       	
       	
    		 var bubble_map = new Datamap({
            element: document.getElementById('bliss-map-wrap'),
            scope: 'usa',
            geographyConfig: {
                 popupOnHover: false,
                highlightOnHover: false,
                borderColor: '#444',
                borderWidth: 0.5,
                dataUrl: 'https://rawgit.com/Anujarya300/bubble_maps/master/data/geography-data/usa.topo.json'
                //dataJson: topoJsonData
            },
            fills: {
                  'MINOR': '#c7ad66',
                defaultFill: '#dedbd1',
                
            },
            data: {                
            }
        });
        
        
        var bubbles= [			  
			  {
			  	highlightFillColor: '#c7ad66',
			  	highlightBorderWidth: 0,
			  	fillOpacity:1,
			    borderWidth: 0,
			  	fillKey: "MINOR",
			    radius: 9,			
			    latitude: 46.497691,
			    longitude: -116.375794
			  },
			  {
			  	highlightFillColor: '#c7ad66',
			  	highlightBorderWidth: 0,
			  	fillOpacity:1,
			    borderWidth: 0,
			  	fillKey: "MINOR",
			    radius: 6,			
			    latitude: 42.195214,
			    longitude: -103.983217
			  },
			  {
			  	highlightFillColor: '#c7ad66',
			  	highlightBorderWidth: 0,
			  	fillOpacity:1,
			  	borderWidth: 0,
			  	fillKey: "MINOR",
			    radius: 22,			    
			    latitude: 39.026928,
			    longitude: -82.186343
			  },
			 
			]
			
			
		  setTimeout(function() { // only start drawing bubbles on the map when map has rendered completely.
            bubble_map.bubbles(bubbles, {
                popupTemplate: function (geo, data) {
                    return '';
                }
            });
        }, 500);
    	}
    	
     if($('#bliss-map-wrap').length>=1){
           bubbleRender();
      };
     
     
     var blisscounter = 16;
     
     $(".train-product-type >.container >.row").empty();	
     function blissData(blisscount){
		
		$.ajax({
		url : "assets/json/speciesdata.json",
		data : blisscount,
		type : "GET",
		crossDomain:true, 
		success : function(data) {
			//console.log(filteredArray);
			var speciesFiltered="";
			var dataLength = filteredArray.length;
			var content="";
			speciesFiltered= data;
			// setTimeout(function(){
				// console.log(content);
			// },5000);
			
			
			switch(dataLength) {
				
    			case 1:
    			
    			//console.log(filteredArray[0].JsonKey);
        			speciesFiltered = data.filter(function (entry) {    			
    			return entry[filteredArray[0].JsonKey].toLowerCase() === filteredArray[0].SelectedText 
    			
				});
        		break;
    			case 2:
        			speciesFiltered = data.filter(function (entry) {
    			return entry[filteredArray[0].JsonKey].toLowerCase() === filteredArray[0].SelectedText && entry[filteredArray[1].JsonKey].toLowerCase() === filteredArray[1].SelectedText 
				});
        		break;
        		case 3:
        			speciesFiltered = data.filter(function (entry) {
    			return entry[filteredArray[0].JsonKey].toLowerCase() === filteredArray[0].SelectedText && entry[filteredArray[1].JsonKey].toLowerCase() === filteredArray[1].SelectedText  && entry[filteredArray[2].JsonKey].toLowerCase() === filteredArray[2].SelectedText
				});
        		break;
        		case 4:
        			speciesFiltered = data.filter(function (entry) {
    			return entry[filteredArray[0].JsonKey].toLowerCase() === filteredArray[0].SelectedText && entry[filteredArray[1].JsonKey].toLowerCase() === filteredArray[1].SelectedText  && entry[filteredArray[2].JsonKey].toLowerCase() === filteredArray[2].SelectedText && entry[filteredArray[3].JsonKey].toLowerCase() === filteredArray[3].SelectedText;
				});
        		break;
    		
			}
			// $(".train-product-type >.container >.row").empty()
    		// $(".train-product-type >.container >.row").append(speciesFiltered)
			//console.log(speciesFiltered);
			speciesData(speciesFiltered,blisscounter);	
							
		},
		error : function(e) {
		console.log(e)
		}				
	  });
	}
 blissData(blisscounter);
 
 
 function speciesData(data,count){
		//var holdactive = $("body").find(".available-btn").parent().prev().find(".active").attr("filterCan");	
		// if(checkClass != holdactive){			
			 // $(".container .row").empty();						
		// }else{
// 			
		// }		
		//checkClass = holdactive;	
			var counting = 0;		
		data.forEach(function(val,i){
if(categoryCounters<blisscounter && countLoop < i){
categoryCounters++;
countLoop = i;

			$(".train-product-type >.container >.row").append("<div class = 'col-xs-6 col-sm-3'><div class = 'haze-info text-center'><figure><img src = "+val.image+" alt = 'oval'></figure><div class = 'star-wrap'><ul><li><em class = 'icon-star'></em></li><li><em class = 'icon-star'></em></li><li><em class = 'icon-star'></em></li><li><em class = 'icon-star'></em></li><li><em class = 'icon-star'></em></li></ul></div><strong>chocolate haze<em>1</em></strong><span>Indica Dominant Hybrid</span></div></div>")
	}	
	// if(val.category == holdactive){
		// counting++;				
	// }
		})		
	//console.log(data.length,categoryCounters);
		if(data.length<=categoryCounters){
		$("body").find(".text-center.product-show .btn").hide();
		}
	
		}
      
      
      $(".text-center.product-show .btn").click(function(e){
      	e.preventDefault();
      	blisscounter = blisscounter+8;
      	blissData(blisscounter);
      })
      
     // filter work start
    
   //  filteredArray=[],speciesobj={},locationobj={},lightObj={},trimmedobj={};
    
     $(".filter-species li").on("click",function(){
     	speciesTXT = $(this).text().trim().toLowerCase();
     	$(".filter-info .species").text($(this).text().trim());
     	speciesobj["SelectedText"]=speciesTXT;
     	speciesobj["JsonKey"]="filterSpecies";    	
     	$(this).closest('.filter-species').hasClass("active")? matchElement(filteredArray,"filterSpecies",speciesobj) :filteredArray.push(speciesobj)
     	$(this).closest('.filter-species').addClass("active");	
     	
     	
     });
     $(".filter-location li").on("click",function(){
     	LocationTXT = $(this).text().trim().toLowerCase();
     	$(".filter-info .anywhere").text($(this).text().trim());
     	locationobj["SelectedText"]= LocationTXT;
     	locationobj["JsonKey"]="filterLocation";
     	$(this).closest('.filter-location').hasClass("active")? matchElement(filteredArray,"filterLocation",locationobj) :filteredArray.push(locationobj)
     	$(this).closest('.filter-location').addClass("active");
     });
     $(".filter-lighting li").on("click",function(){
     	LightingTXT = $(this).text().trim().toLowerCase();
     	$(".filter-info .light").text($(this).text().trim());
     	lightObj["SelectedText"]= LightingTXT;
     	lightObj["JsonKey"]="filterLighting";
     	$(this).closest('.filter-lighting').hasClass("active")? matchElement(filteredArray,"filterLighting",lightObj) :filteredArray.push(lightObj)
     	$(this).closest('.filter-lighting').addClass("active");
     });
     $(".filter-trimmed li").on("click",function(){
     	TrimmedTXT = $(this).text().trim().toLowerCase();
     	$(".filter-info .however").text($(this).text().trim());    	
     	trimmedobj["SelectedText"]= TrimmedTXT;
     	trimmedobj["JsonKey"]="filterTrimmed";
     	$(this).closest('.filter-trimmed').hasClass("active")? matchElement(filteredArray,"filterTrimmed",trimmedobj) :filteredArray.push(trimmedobj)
     	$(this).closest('.filter-trimmed').addClass("active");
     })
     
     $(".filter-list-btn li a").on("click",function(){
     	$(".filter-listWrap").slideUp();
     	
     		if($(this).hasClass("reset")){
     			$("body").find(".text-center.product-show .btn").show();
     			$(".filter-info .species").text(speciesTXT2);
     			$(".filter-info .anywhere").text(LocationTXT2);
     			$(".filter-info .light").text(LightingTXT2);
     			$(".filter-info .however").text(TrimmedTXT2);
     			speciesTXT="",LocationTXT="",LightingTXT="",TrimmedTXT="";
     			filteredArray=[];
     		$('.filter-species,.filter-location,.filter-lighting,.filter-trimmed').removeClass("active");
     		 $(".train-product-type >.container >.row").empty();
     		 categoryCounters = 0;
     			 countLoop = -1;
     			blisscounter=16;
     			blissData(blisscounter); 
     		}else if($(this).hasClass("apply") && filteredArray.length){
     			$("body").find(".text-center.product-show .btn").show();
     			 $(".train-product-type >.container >.row").empty();
     			 categoryCounters = 0;
     			 countLoop = -1;
     			blisscounter=16;
     			blissData(blisscounter);     			
     		}
     		
     });
     
     
     // filter work end

})
     if($('#bliss-map-wrap').length>=1){
      window.onresize = function(event) {
      	bubbleRender();
    };
     };
     


function matchElement(filteredArray,keyName,wholeOBJ){
	if(filteredArray.length){
		for(i=0;i<filteredArray.length;i++){
			if(filteredArray[i].JsonKey == keyName){
				filteredArray[i]= wholeOBJ;
			}
		}
	}
}
