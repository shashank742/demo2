// $.fn.greenify = function(params) {
// console.log(params)
// 
 // // this.color=(params.color==undefined)?"yellow":params.color;
// 
 // this.find(".setColor").css({ "color": this.color,"background-color":params.backgroundColor} );
  // alert()
// // 
// // 
// // 
// // // <!-- body.append(".overlay").css({"display:block"}); -->
 // // $("body").append( " <div class='overlay'><div class='popup'>POP UP<i class='close'></i></div></div>"); 	
	    	// // $("a").click(function(){
	    	// // ($(".overlay").css("display")=="block")?$(".overlay").css("display","none"):$(".overlay").css("display","block");
	    	// // })
	    	// // $(".close").click(function(){
	    		// // $(".overlay").css("display","none");
	    	// // })
// };

$.widget( "nmk.progressbar", {
 
    options: {
        value: 0
    },
 
    _create: function() {
        this.element.addClass( "progressbar" );
        this._update();
    },
 
    _setOption: function( key, value ) {
        this.options[ key ] = value;
        this._update();
    },
 
    _update: function() {
        var progress = this.options.value + "%";
        this.element.text( progress );
        if ( this.options.value == 100 ) {
            this._trigger( "complete", null, { value: 100 } );
        }
    }
 
});
