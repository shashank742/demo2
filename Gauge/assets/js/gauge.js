$.fn.gauge = function(options ) {
    // This is the easiest way to have default options.
    var $body=document.querySelector('body');
    console.log(this.attr('class'))
    var id=this.attr('class')
    var $element=document.getElementsByClassName(id)[0].querySelectorAll('.circle');
    var selectImg=['image1.png','image2.png','Meter_liner.png','image4.png','Lockerorange.png','Lockergreen.png']
     // These are the defaults.
    var settings = $.extend({
        limit: 120,
        colorRange:['#8bc53f','#86ae3f','#8bc53f']// this color code use when radius has max limit 150
    }, options);
    
    if(settings.limit>150){
    	settings.limit = 150;
    }
    fillGauge=function (limit) {
        for(i=0;i<$element.length;i++){
            radius=$element[i].getAttribute('r')
            var cf = 2 * Math.PI * radius;
            var semi_cf = cf / 2;
            stockWidth=$element[i].getAttribute('stroke-width');
            var percent=(limit/1.5);
            strokeDasharray= ((percent * semi_cf) / 100)+','+cf;
            $element[i].setAttribute('stroke-dasharray',strokeDasharray);
        }
        if(limit==150){
            for(i=0;i< document.getElementsByClassName(id)[0].querySelectorAll('.range').length;i++){
                document.getElementsByClassName(id)[0].querySelectorAll('.range')[i].setAttribute('stroke',settings.colorRange[i]);
            }
             document.getElementsByClassName(id)[0].querySelectorAll('.lock')[0].classList.add('unlock');

        }        var meterLiner=450 - ((percent * 180) / 100);
        meterLiner=(meterLiner >439)?(settings.limit==0)?439:437:meterLiner;
        document.getElementsByClassName(id)[0].querySelectorAll('#meter_needle3')[0].style.transform = "rotate(" +
            ((meterLiner>282)?meterLiner:282) + "deg)";
            settings.limit
            setTimeout(function(){
            	if(settings.limit > limit)
            	fillGauge(limit+1)
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
		fillGauge(0);
	}
  // image  has been loaded
};img.src ="assets/img/"+selectImg[counter];
}
    loadSrc(0)
};