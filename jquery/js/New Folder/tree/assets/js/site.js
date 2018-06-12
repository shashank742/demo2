$(document).ready(function(){	
	var removeIndex;
$.ajax({
  type: "GET",
  url: "assets/json/tree.json",
  success: function(data){ 
   var myData=JSON.stringify(data)
    console.log(data)
    $('#unique').empty();    
    demo(data,'unique')   
  },error:function(err){
  	console.log('err')
  	console.log(err)
  }  
});
var counter=0;
var uniqueID=undefined;
function demo(arr,unique){
	$.each(arr,function(key,val){
		console.log(counter++);
		console.log(val.name)
		uniqueID=(uniqueID==undefined)?unique:uniqueID;
		$('body').find('#'+uniqueID).append("<li><span>"+val.name+"</span></li>");
		if(val.subCategory==true){
			$('body').find('#'+uniqueID).children('li:last-child').append('<ul id='+val.id+'></ul>');
			$('body').find('#'+uniqueID).children('li:last-child').prepend('<span class=collapse>');
			uniqueID=val.id;
			if(arr.length==$('#'+uniqueID).children().length){
			uniqueID=$('body').find('#'+uniqueID).parent().parent('ul').attr('id');		
		}
			demo(val.category,uniqueID);
		}
		if(arr.length==$('body').find('#'+uniqueID).children().length){	
			uniqueID=$('body').find('#'+uniqueID).parent().parent('ul').attr('id');			
		}
	})
	$("body").find("#unique").find('ul').addClass("sub-categories");     
	$(".categories").find("span").not(".collapse").addClass("text");
	$("li:has(ul)").prepend("");
}

$("body").click(function(event){ 

	if(($(event.target).prop("tagName")=='BODY')||($(event.target).attr('class')==$(".form").parent().attr('class'))){

	$(".list").slideUp("slow");		
		$(".categories").slideUp("slow");	
	}
})
	$("body").on("click",".search-box",function(event){	
		event.stopPropagation()
		
		if($(event.target).attr('class')=='search-box'){
			$(".input").focus()
		}   
		
			if(($(event.target).attr('class')=='search-box')||($(event.target).attr('class')=='append-element')||($(event.target).attr('class')=='input')){	
				$(".list").slideUp("slow");		
		$(".categories").slideToggle("slow");			
	 }
	})		
$("body").on("click",".expand,.collapse",function(e){
	if($(e.target).attr('class')=='collapse'){
		$(this).removeClass("collapse");
		$(this).addClass("expand");
	}
	else{
		$(this).removeClass("expand");
		$(this).addClass("collapse");
	}
	
	e.stopPropagation()
	$(e.target).parent("li").children("ul").slideToggle("slow");
		
})	
$("body").on("click",".remove-element",function(){	
	$(this).parents(".append-category").remove()
})
	$(".search-box input").keyup(function(){
		$(".categories").css("display","none")
		$(".list").slideDown()
	var list=[];
	var flag= true;
	 $(".dropdown").remove()
	  $(".unavailable").remove()
	$(".text").each(function(){		
	console.log($(this).text())	
	 //if($(this).text().match($(".search-box input").val())){	 	
	 if($(this).text().match(new RegExp($(".search-box input").val(),'gi'))){	 	
	 	list.push($(this).text())	 		
	 	$(".list").append("<div class=dropdown>"+$(this).text()+"</div>")
	 	flag = false;	 
	 }	
	 
 });
 if(flag) {
 	$(".list").append("<div class=unavailable>Category is not Available</div>")
 }
 if($(this).val()==""){
 	$(".categories").css("display","block")
 	 $(".dropdown").remove()
 }
	});		
	$("body").on("click",".categories li .text",function(event){
	event.stopPropagation()		
	var text=$(this).text(); 
	 removeIndex=-1;
	if($(".append-element").length > 0){
	$(".append-element").each(function(key){
		if($(this).text()==text){			 
			removeIndex=key;			
		}
	})
	}
   if(removeIndex !=-1){
   	$(".append-element").eq(removeIndex).parents(".append-category").remove()
   }
  else
	$(".search-box").prepend("<span class=append-category><span class=append-element>"+ $( this ).text() +"<span class=remove-element></span></span></span>");			
})
$("body").on("click",".dropdown",function(){
	var text=$(this).text(); 
	 removeIndex=-1;
	if($(".append-element").length > 0){
	$(".append-element").each(function(key){
		if($(this).text()==text){			 
			removeIndex=key;			
		}
	})
	}
	 if(removeIndex !=-1){
   	$(".append-element").eq(removeIndex).parents(".append-category").remove()
   }
  else
	$(".search-box").prepend("<span class=append-category><span class=append-element>"+ $( this ).text() +"<span class=remove-element></span></span></span>");
})	

})
