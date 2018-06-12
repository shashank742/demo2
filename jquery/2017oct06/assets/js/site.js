$(document).ready(function(){
	var removeIndex;
	$(".selectedCategories, .append-element").click(function(event){
		//event.stopPropagation()
			if(($(event.target).attr('class')=='selectedCategories')||($(event.target).attr('class')=='append-element')){
				$(".form").slideToggle("slow");	
		$(".categories").slideToggle("slow");		
	
	 }
	})
		
	$("li:has(ul)").prepend("<span class='collapse expand'></span>");
$(".collapse,.expand").click(function(e){
	
	
	$(this).toggleClass("collapse")
	$(this).toggleClass("expand")
	e.stopPropagation()
	$(e.target).parent("li").children("ul").slideToggle("slow");
	
	
})	
$("body").on("click",".remove-element",function(){
	console.log("enter click event")
	$(this).parents(".append-category").toggle()
})
$(".categories span").addClass("text");



	$(".search-box input").keyup(function(){
		$(".categories").css("display","none")
	var list=[];
	 $(".dropdown").remove()
	$(".text").each(function(){		
	console.log($(this).text())	
	 if($(this).text().match($(".search-box input").val())){	 	
	 	list.push($(this).text())	 		
	 	$(".list").append("<div class=dropdown>"+$(this).text()+"</div>")	 
	 }	 
 })
 if($(this).val()==""){
 	$(".categories").css("display","block")
 	 $(".dropdown").remove()
 }
	})
	
	
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
	$(".selectedCategories").append("<span class=append-category><span class=append-element>"+ $( this ).text() +"<span class=remove-element></span></span></span>");
	
	
	
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
	$(".selectedCategories").append("<span class=append-category><span class=append-element>"+ $( this ).text() +"<span class=remove-element></span></span></span>");
})	

})
