$(document).ready(function(){
	/*windowResize();
	slider();
	responsive();
	dropDown();
	modal();
	RadioProgress();
	Tabs();
	//writeGridContent();
	ScrollVerticalNav();
	navbarResponsiveVertical();*/
});

function windowResize(){
	$( window ).resize(function() {
		resizeSlider();
		responsive();
		writeGridContent();
		ScrollVerticalNav();
		navbarResponsiveVertical();
	});
}


function slider(){
	var click=true;

	var speed = $('.slider').data("time")*1000;
	var run = setInterval('rotate()', speed);	

	var count=$('.slides').children().length;
	$('.slides').css({'width' : count*100+"%"});
	$('.slides li').css({'width' : 100/count+"%"});

	var item_width = $('.slides li').outerWidth(); 
	var left_value = item_width * (-1); 

	$('.slides li:first').before($('.slides li:last'));

	$('.slides').css({'left' : left_value});

	$('.slides').css({'visibility' : "visible"});


	$('.prev').click(function() {
		item_width = $('.slides li').outerWidth(); 
		left_value = item_width * (-1); 
		var left_indent = parseInt($('.slides').css('left')) + item_width;
		if(click){
			click=false;
			$('.slides').animate({'left' : left_indent}, 600, function () {
				$('.slides li').css("visibility", "hidden");
				$('.slides li:first').before($('.slides li:last'));     
				$('.slides').css({'left' : left_value});
				$('.slides li').css("visibility", "visible");
				click=true;
			});
		}
		return false;
	});  


	$('.next').click(function() {
		item_width = $('.slides li').outerWidth(); 
		var left_indent = parseInt($('.slides').css('left')) - item_width;
		left_value = item_width * (-1); 
		if(click){
			click=false;
			$('.slides').animate({'left' : left_indent}, 600, function () {
				$('.slides li').css("visibility", "hidden");
				$('.slides li:last').after($('.slides li:first'));     
				$('.slides').css({'left' : left_value});
				$('.slides li').css("visibility", "visible");
				click=true;
			});
		}
		return false;
	});    

	$('.slider').hover(
		function() {
			clearInterval(run);
		}, 
		function() {
			run = setInterval('rotate()', speed);	
		}
	); 
}

function resizeSlider(){

	var count=$('.slides').children().length;
	$('.slides').css({'width' : count*100+"%"});
	$('.slides li').css({'width' : 100/count+"%"});

	item_width = $('#slides li').outerWidth(); 
	var left_value = (item_width) * (-1); 
	$('.slides').css({'left' : left_value});
	
	var imgHeight=$('.slides li img').css("height");
	console.log(imgHeight);
	//$('.slides').css("height", imgHeight);

}

function rotate() {
	$('.next').click();
}

function responsive(){
	if($(".navbar.responsive").length != 0){
		if (document.documentElement.clientWidth <= 360) {
			if(needResz(360)){
				navbarResponsive();
			}

		}else if (document.documentElement.clientWidth <= 768) {
			removeResponsive();
			if(needResz(768)){
				navbarResponsive();
			}
		}else{
			removeResponsive()
		}
	}
}

function needResz(width){
	if(($(".navbar.responsive ul").width() <width) || ( $(".navbar.responsive ul").height() > $(".navbar.responsive ul li").height() )){
		return true
	}
	else{
		return false;
	}
}

function navbarResponsive(){
	var button='<button class="bt slideNavButton noStyle" onclick="slideMenu()"><i class="fa fa-bars"></i></button>';
	if($(".navbar.responsive").hasClass("navbar-vertical")){
		$(".slideNavButton").addClass("vertical");

		if($("body").children(".slideNavButton").length==0){
			$("body").append(button);
			$(".slideNavButton").fadeIn();
		}
	}else{
		$(".navbar.responsive").children("ul").hide();
		$(".navbar.responsive").addClass("condensed");
		if(($(".navbar.responsive").children(".slideNavButton").length)==0){
			$(".navbar.responsive").prepend(button);
		}
	}
}

function removeResponsive(){
	if(($(".slideNavButton").length)!=0){
		$(".slideNavButton").remove();
		$(".navbar.responsive").removeClass("condensed");
		$(".navbar.responsive ul").show();
	}

	/*if($(".navbar.responsive").hasClass("navbar-vertical")){
	$(".navbar-vertical").removeClass("navbar-vertical-responsive");
	$("body").remove(".slideNavButton");
	$(".bodyContent").removeClass("bodyContent-responsive");
	$(".navbar-vertical").fadeIn();
	}*/
}

function slideMenu(button){
	if($(".navbar.responsive").hasClass("navbar-vertical")){
		$(".navbar.responsive").fadeToggle();
		$(".slideNavButton").fadeToggle();
		detectMouseNav();
	}else{
		$(".navbar.responsive ul").slideToggle();
		if($(".slideNavButton i").hasClass("fa-rotate-90")){
			$(".slideNavButton i").removeClass("fa-rotate-90");
		}
		else{
			$(".slideNavButton i").addClass("fa-rotate-90");
		}

	}
}

function navbarResponsiveVertical(){
	var ulWidth=$(".navbar-vertical ul").width();
	var divWidth=$(".navbar-vertical").width();

	if(ulWidth > divWidth){
		console.log(ulWidth+" - "+divWidth);
		SetWidthVerticalNav(ulWidth);
	}

	var parentWidth = $('body').offsetParent().width();
	var percent = 100*divWidth/parentWidth;

	var maxWidth=$('.navbar-vertical').data("max-width");

	if(percent>maxWidth){
		SetWidthVerticalNav("0px");
		$(".navbar-vertical").hide();
		var button='<button class="slideNavVertical bt" onclick="slideMenuVertical('+ulWidth+')"><i class="fa fa-bars"></i></button>';
		if(($(".slideNavVertical").length)==0){
			$("body").append(button);
		}
	}
	else{
		SetWidthVerticalNav(ulWidth);
		$(".navbar-vertical").show();
		if(($(".slideNavVertical").length)!=0){
			$(".slideNavVertical").remove();
		}
	}

}

function slideMenuVertical(width){
	if($(".navbar-vertical").is(":visible")){
		SetWidthVerticalNav("0px");
		$(".navbar-vertical").hide();
	}
	else{
		SetWidthVerticalNav(width);
		$(".navbar-vertical").show();
	}
}


function SetWidthVerticalNav(width){
	$(".navbar-vertical").width(width);
	$(".bodyContent").css("margin-left", width);
}

function ScrollVerticalNav(){

	var ulHeight=$(".navbar-vertical ul").height();
	var divHeight=$(".navbar-vertical ").height();

	if( ulHeight > divHeight){
		$(".navbar-vertical").addClass("scroll");
	}
	else{
		if($(".navbar-vertical").hasClass("scroll")){
			$(".navbar-vertical").remoevClass("scroll");
		}
	}

}


function detectMouseNav(){
	$(document).mouseup(function()
		{
			$(".navbar.responsive.navbar-vertical-responsive").fadeOut();
			$(".slideNavButton").fadeIn();
	});
	$(".navbar").mouseup(function()
		{
			return false;
	});
	$(".slideNavButton").mouseup(function()
		{
			return false;
	});
}

function dropDown(){

	$(".dropdown").click(function(){
		dropDownClick(this);
		}
	)
	$(".dropdown a").click(function(e){
		e.preventDefault();
		dropDownClick(this);
		}
	)

	$(document).mouseup(function()
		{
			$(".dropdown-menu").hide();
	});

}

function dropDownClick(li){
	$(li).children("ul").toggle();
}

function modal(esconder){
	$("[data-function='launchModal']").click(function(){
		showModal($(this).attr("data-modalId"));
		}
	)
	$("[data-function='closeModal']").click(function(){
		$(".modal").fadeOut();
		}
	)
	if(esconder){
		$(document).mouseup(function()
			{
				$(".modal").fadeOut();
		});
		$(".modal-content").mouseup(function()
			{
				return false;
		});
	}
}

function showModal(id){
	$("#"+id).fadeIn();
}


/*Radial Progress		*/
function RadioProgress(){

}


function toggleSlide(div){
	var target=$(div).data("target");
	$(target).slideToggle();	
}

function showPopover(button){
	var data=$(button).data("popcontent");
	var position=$(button).data("popposition");
	var offset = $(button).offset();
	var height= $(button).outerHeight(true);


	var top=offset.top-height-10;
	var left=offset.left;
	d=document.createElement('div');
	$("body").append(d);
	$(d).html(data).offset({top:top, left:left}).addClass("popover").fadeIn();
}


function writeGridContent(){
	var column_content = "";
	var width_offset = 20; //the body padding left and right
	var allowableColumns =  $(".grid").data("columns");//Math.floor(($(".grid").width() - width_offset)/data_width);

	if (document.documentElement.clientWidth <= 768) {
		allowableColumns=Math.floor(allowableColumns/2);

	}if (document.documentElement.clientWidth <= 360) {
		allowableColumns=Math.floor(allowableColumns/2);
	}

	console.log("Columns "+allowableColumns);

	var data_width=($(".grid").width() - width_offset)/allowableColumns;

	console.log("data Width "+data_width);
	for(var i = 0 ; i < allowableColumns ; i++){
		column_content += '<div class="one_col">'
		$('.columns ul li').each(function(index) {
			if( index % allowableColumns == i ){ 
				column_content +=  $(this).html()  ;
				console.log($(this).html());
			}

		});
		column_content += '</div>';
	}
	$('.columns .content').html(column_content);

	$(".one_col").css("width", data_width);
	$(".columns ").fadeIn();

}


function Tabs(){
	$("ul.tabs li a").click(function(){
		removeClassActiveTab();
		$(this).addClass("active");

		var target=$(this).data("target");
		showTab(target);
		return false;
	});

}

function showTab(id){
	$("div.tabs div.active").hide();
	$("div.tabs div.active").removeClass("active");

	$(id).fadeIn();
	$(id).addClass("active");
}

function removeClassActiveTab(){
	$("ul.tabs li a.active").removeClass("active");
}


//Functions not in Framework  
function toggleDisabled(elem){
	if($(elem).is(":disabled")){
		$(elem).removeAttr("disabled");
	}else{
		$(elem).attr("disabled", "true");
	}
}

function ulpoadImage(idForm, url, img){
	var formData = new FormData($("#"+idForm)[0]);
	$.ajax({
		type:'POST',
		url:url,
		data:formData,
		cache:false,
		contentType: false,
		processData: false,
		success:function(data){
			if(data!=0){
				/*$("#uploadImage").hide();
				var dir=data.substring(3);
				$("#userImage").attr("src", dir);
				$("#imageDir").val(dir);*/
				$("#"+img).attr("src", data);
			}
		}
	});
}

