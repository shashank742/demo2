$.fn.gauge = function(options ) {
    // This is the easiest way to have default options.
    var $body=document.querySelector('body');
    console.log(this.attr('class'))
    var id=this.attr('class')
    var $element=document.getElementsByClassName(id)[0].querySelectorAll('.circle');
    var selectImg=['image1.png','image2.png','Meter_liner.png','image4.png','Lockerorange.png','Lockergreen.png']
     // These are the defaults.
    var settings = $.extend({
        currentVal: 120,// max current value is less than target value
         targetVal:150, // provide max target value
         
        colorRange:['#8bc53f','#86ae3f','#8bc53f']// this color code use when radius has max limit 150
    }, options);
    $('.left-digit').text(settings.targetVal);
    
    // if(settings.limit>150){
    	// settings.limit = 150;
    // }
    fillGauge=function (currentVal) {
        for(i=0;i<$element.length;i++){
            radius=$element[i].getAttribute('r')
            var cf = 2 * Math.PI * radius;
            var semi_cf = cf / 2;
            stockWidth=$element[i].getAttribute('stroke-width');
            var percent=(currentVal/(settings.targetVal/100));
            strokeDasharray= ((percent * semi_cf) / 100)+','+cf;
            $element[i].setAttribute('stroke-dasharray',strokeDasharray);
        }
       
 if(currentVal==settings.targetVal){
            for(i=0;i< document.getElementsByClassName(id)[0].querySelectorAll('.range').length;i++){
                document.getElementsByClassName(id)[0].querySelectorAll('.range')[i].setAttribute('stroke',settings.colorRange[i]);
            }
             document.getElementsByClassName(id)[0].querySelectorAll('.lock')[0].classList.add('unlock');

        }
        var meterLiner=450 - ((percent * 180) / 100);
        meterLiner=(meterLiner >439)?(settings.limit==0)?439:439:meterLiner;
        document.getElementsByClassName(id)[0].querySelectorAll('#meter_needle3')[0].style.transform = "rotate(" +
             ((meterLiner>282)?meterLiner+2:282) + "deg)";
            settings.currentVal
            setTimeout(function(){
            	if(settings.currentVal > currentVal)
            	fillGauge(currentVal+1)
            },10)
    }
    var obj={}
    function loadSrc(counter){
	img = new Image();
     img.onload = function(){
		counter++;
	if(counter < selectImg.length) {  
	loadSrc(counter)
	}else{
		if(settings.currentVal<=settings.targetVal){
		fillGauge(0);
		}else{
			alert("Please set target value is less or equals to current value")
		}
	}
  // image  has been loaded
};
img.src ="assets/img/"+selectImg[counter];
}
    loadSrc(0)
};