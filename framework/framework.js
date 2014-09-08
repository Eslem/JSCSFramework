$(document).ready(function(){
	/*windowResize();
	slider();
	responsive();
	dropDown();
	modal();
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


	var ulHeight=$('.slides').css("height");

	if(ulHeight>imgHeight){
		ulHeight=$('.slider').css("height", imgHeight);
	}
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

//Nav Vertical
function navbarResponsiveVertical(){
	var ulWidth=$(".navbar-vertical ul").outerWidth(true);
	var divWidth=$(".navbar-vertical").outerWidth(true);
	var with2Resize;


	if(ulWidth > divWidth){
		with2Resize=ulWidth;
		$(".navbar-vertical").width(ulWidth);
	}
	else{
		with2Resize=divWidth;
	}
	//with2Resize+=2;

	var parentWidth = $('body').offsetParent().width();
	var percent = 100*divWidth/parentWidth;
	SetWidthVerticalNav(with2Resize);

	//responsive
	var responsive=$('.navbar-vertical').data("responsive");
	var maxWidth=$('.navbar-vertical').data("max-width");

	if($('.navbar-vertical').data("resizable")==true){
		var button='<button class="slideNavVertical bt" onclick="slideMenuVertical('+with2Resize+')"><i class="fa fa-bars"></i></button>';
		if(($(".slideNavVertical").length)==0){
			$("body").append(button);
		}
	}

	if((responsive==true) && (maxWidth=='none' || maxWidth==null)){
		if(screen.width<=480){
			var button='<button class="slideNavVertical bt" onclick="slideMenuVertical('+with2Resize+')"><i class="fa fa-bars"></i></button>';
			if(($(".slideNavVertical").length)==0){
				$("body").append(button);
			}
			$(".navbar-vertical").hide();
			SetWidthVerticalNav("0px");	
		}
	}
	else{		
		if((responsive==true) && (percent>maxWidth)){
			var button='<button class="slideNavVertical bt" onclick="slideMenuVertical('+with2Resize+')"><i class="fa fa-bars"></i></button>';
			if(($(".slideNavVertical").length)==0){
				$("body").append(button);
			}
			$(".navbar-vertical").hide();
			SetWidthVerticalNav("0px");	
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
		ScrollVerticalNav();
	}
}


function SetWidthVerticalNav(width){
	var fullWidth=$('body').width();

	if(width=="0px"){
		$(".bodyContent").width(screen.width+"px");
		if($(".navbar-vertical").hasClass("fixed")){
			$(".bodyContent").css("margin-left", width);
		}

	}else{
		if($(".navbar-vertical").hasClass("fixed")){
			$(".bodyContent").css("margin-left", width);
		}
		$(".bodyContent").width((fullWidth-width)+"px");
	}
}

function ScrollVerticalNav(){

	var ulHeight=$(".navbar-vertical ul").height();
	var divHeight=$(".navbar-vertical ").height();

	if( ulHeight > divHeight){
		$(".navbar-vertical").addClass("scroll");
	}
	else{
		if($(".navbar-vertical").hasClass("scroll")){
			$(".navbar-vertical").removeClass("scroll");
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
	$(".dropdown").unbind("click");
	$(".dropdown a").unbind("click");

	$(".dropdown>a").click(function(e){
		e.preventDefault();
		dropDownClick($(this).parent());
		}
	)

	$(".dropdown-menu").mouseup(function()
		{
			return false;
	});
	$(document).mouseup(function()
		{
			$(".dropdown-menu").hide();
	});

}

function dropDownClick(li){
	var ul=$(li).find("ul");

	if($(ul).hasClass("list")){
		if($(ul).hasClass("slided")){
			$(ul).slideUp();
			$(ul).removeClass("slided");	
		}
		else{
			$(ul).slideDown();		
			$(ul).addClass("slided");	
		}

	}
	else{
		$(li).find("ul").toggle();
	}

}

function modal(){
	$("[data-function='launchModal']").click(function(){
		showModal($(this).attr("data-modalId"));
		}
	)
	$("[data-function='closeModal']").click(function(){
		$(".modal").fadeOut();
		}
	)
	$(document).mouseup(function()
		{
			$(".modal").each(function(){
				var modal=$(this).attr('data-autoClose');
				if(modal != 'false')	$(this).fadeOut();
			});
	});
	$(".modal-content").mouseup(function()
		{
			return false;
	});
}

function showModal(id){
	$("#"+id).fadeIn();
}


/*Radial Progress		*/


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

	//console.log("Columns "+allowableColumns);

	var data_width=($(".grid").width() - width_offset)/allowableColumns;

	//console.log("data Width "+data_width);
	for(var i = 0 ; i < allowableColumns ; i++){
		column_content += '<div class="one_col">'
		$('.columns ul li').each(function(index) {
			if( index % allowableColumns == i ){ 
				column_content +=  $(this).html()  ;
				//console.log($(this).html());
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


//Functions not in Demo  
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

//--		Tags
function tags(select){
	var option = $(select).find("option:selected");
	var input= $("#"+$(select).data("target"));

	var inputVal=input.val();
	input.val(inputVal+option.val()+",");

	var span = document.createElement('span');
	var att= document.createAttribute("data-value");
	att.value=option.val();
	span.setAttributeNode(att);
	//span.data-value=option.val();
	span.innerHTML = option.html();
	span.className="tag";

	var remove = document.createElement('span')
	remove.className="fa fa-times-circle removeSpan";
	remove.onclick=function(){
		span.parentNode.removeChild(span);
		var inputVal=input.val();
		var value=$(span).attr("data-value");
		inputVal=inputVal.replace(value+",", "");
		input.val(inputVal);

		if($(select)[0].hasAttribute("data-removeOnSelect")){
			$(select).append("<option value='"+option.val()+"'>"+option.html()+"</option>");
		}

		$("#valueTag").html(input.val());
	}

	span.appendChild(remove);

	$(".tags .selection").append(span);

	if($(select)[0].hasAttribute("data-removeOnSelect")){
		$(select).find("option:selected").remove();
	}
	$("#valueTag").html(input.val());
}

function tagsFunction(select, funcion, funcionRemove){
	var option = $(select).find("option:selected");
	var input= $("#"+$(select).data("target"));
	funcion(option.val());

	var inputVal=input.val();
	input.val(inputVal+option.val()+",");

	var span = document.createElement('span');
	var att= document.createAttribute("data-value");
	att.value=option.val();
	span.setAttributeNode(att);
	//span.data-value=option.val();
	span.innerHTML = option.html();
	span.className="tag";

	var remove = document.createElement('span')
	remove.className="fa fa-times-circle removeSpan";
	remove.onclick=function(){
		span.parentNode.removeChild(span);
		var inputVal=input.val();
		var value=$(span).attr("data-value");
		inputVal=inputVal.replace(value+",", "");
		input.val(inputVal);

		if($(select)[0].hasAttribute("data-removeOnSelect")){
			$(select).append("<option value='"+option.val()+"'>"+option.html()+"</option>");
		}
		funcionRemove(value);

	}

	span.appendChild(remove);

	$(".tags .selection").append(span);

	if($(select)[0].hasAttribute("data-removeOnSelect")){
		$(select).find("option:selected").remove();
	}
	$("#valueTag").html(input.val());
}

function addSelectionTag(value, select, functionRemove){
	var option = $(select).find("option[value='"+ value +"']");
	if(option.length!=0){
		var input= $("#"+$(select).data("target"));
		//funcion(option.val());

		var inputVal=input.val();
		input.val(inputVal+option.val()+",");

		var span = document.createElement('span');
		var att= document.createAttribute("data-value");
		att.value=option.val();
		span.setAttributeNode(att);
		//span.data-value=option.val();
		span.innerHTML = option.html();
		span.className="tag";

		var remove = document.createElement('span')
		remove.className="fa fa-times-circle removeSpan";
		remove.onclick=function(){
			span.parentNode.removeChild(span);
			var inputVal=input.val();
			var value=$(span).attr("data-value");
			inputVal=inputVal.replace(value+",", "");
			input.val(inputVal);

			if($(select)[0].hasAttribute("data-removeOnSelect")){
				$(select).append("<option value='"+option.val()+"'>"+option.html()+"</option>");
			}
			functionRemove(value);

		}

		span.appendChild(remove);

		$(".tags .selection").append(span);

		if($(select)[0].hasAttribute("data-removeOnSelect")){
			$(select).find("option:selected").remove();
		}
		$("#valueTag").html(input.val());
	}
}

//--Image Zoom

function imageZoom(){
	$("img.imageZoom").each(function(){
		var img=this;
		createZoom(this);

	});

}


function createZoom(img){
	var prop=$(img).attr("data-proporcion");

	var imgWidth= $(img).width();
	var imgHeight= $(img).height();
	var position = $(img)[0].getBoundingClientRect();
	var parentPos = $(img).parent()[0].getBoundingClientRect();

	var widthHover = imgWidth/prop
	var heightHover = imgHeight/prop;

	var div = document.createElement("div");
	div.className="hoverDiv";
	div.style.display="none";
	div.style.width=widthHover+"px";
	div.style.height=heightHover+"px";
	$(img).parent().append(div);

	var imgBig= document.createElement("img");
	imgBig.src=$(img)[0].src;

	var widthBig=imgWidth*prop;
	var heightBig=imgHeight*prop;
	imgBig.style.width=widthBig*prop+"px";
	imgBig.style.height=heightBig*prop+"px";

	var target= document.createElement("div");
	target.className="imgTarget";
	$(img).parent().parent().append(target);
	target.style.left=position.right+20+"px";
	target.style.top=position.top+"px";
	$(target).height(heightBig);
	$(target).width(widthBig);
	$(target).append(imgBig);




	$(".imageNormal").mouseenter(function(e){
		$(".imageNormal").mousemove(function(event) {
			div.style.display="block";
			target.style.display="block";
			var mouseX = event.pageX- $(window).scrollLeft();
			var mouseY = event.pageY - $(window).scrollTop();

			var posX=(mouseX-position.left)-(widthHover/2);
			var posY=(mouseY-position.top)-(heightHover/2);

			var positionHover = div.getBoundingClientRect();

			if((mouseX >= (position.left+(widthHover/2)) )  && (mouseX <= (position.right-(widthHover/2)) )  ){
				div.style.left=posX+"px";
				var difX=positionHover.left-parentPos.left;
				imgBig.style.left = -difX*(prop*prop)+"px";
			}
			if((mouseY >= (position.top+(heightHover/2)) )   && (mouseY <= (position.bottom-(heightHover/2)) )  ){
				div.style.top=posY+"px";
				var difY=positionHover.top-parentPos.top;
				imgBig.style.top = -difY*(prop*prop)+"px";
			}
		});
	});

	$(".imageNormal").mouseleave(function(e){
		div.style.display="none";
		target.style.display="none";
	});

	$(window).scroll(function(){
		var positionHover = div.getBoundingClientRect();
		position = $(img)[0].getBoundingClientRect();
		parentPos = $(img).parent()[0].getBoundingClientRect();
		target.style.top=position.top+"px";
		difY=positionHover.top-parentPos.top;
	});

}

//--Position Helper functions

function findPos(obj){
	/*var curleft = 0;
	var curtop = 0;
	if(obj.offsetLeft) curleft += parseInt(obj.offsetLeft);
	if(obj.offsetTop) curtop += parseInt(obj.offsetTop);
	if(obj.scrollTop && obj.scrollTop > 0) curtop -= parseInt(obj.scrollTop);
	if(obj.offsetParent) {
	var pos = findPos(obj.offsetParent);
	curleft += pos[0];
	curtop += pos[1];
	} else if(obj.ownerDocument) {
	var thewindow = obj.ownerDocument.defaultView;
	if(!thewindow && obj.ownerDocument.parentWindow)
	thewindow = obj.ownerDocument.parentWindow;
	if(thewindow) {
	if(thewindow.frameElement) {
	var pos = findPos(thewindow.frameElement);
	curleft += pos[0];
	curtop += pos[1];
	}
	}
	}/*
	var off=$(obj).offset();
	curleft=off.left;
	curtop=off.top;*/


	if (typeof obj === 'string')
		obj = document.querySelector(obj);

	var curleft = 0;
	var curtop = 0;

	var findPos = function(obj) {
		curleft += obj.offsetLeft;
		curtop += obj.offsetTop;
		if(obj.offsetParent) {
			findPos(obj.offsetParent);
		}
	}
	findPos(obj);

	return [curleft, curtop];
}

function setPos(obj, position){
	var top=position[1];
	var left=position[0];
	obj.style.left=left+"px"; 
	obj.style.top=top+"px"; 
}


//--	Rtf Editor

function rtfEditor(elem){

	console.log(elem);
	$(elem).click(function(){
		var elem=this;
		$(this).attr("contenteditable", "true");
		showRtf(elem);
		return 
	});

	$(elem).mouseup(function(ev){
		return false;
	});

	$(document).mouseup(function()
		{
			if($(".editorRtf").length != 0){
				if($(".editorRtf").is(":visible")){
					$(".editorRtf").fadeOut();
				}
			}

	});
}

function rtfEditor(elem, dir){


	$(elem).click(function(){
		var elem=this;
		$(this).attr("contenteditable", "true");
		if(dir==null){
			showRtf(elem, "framework/rtf.html");
		}else{

		}
		showRtf(elem, dir);
		return 
	});

	$(elem).mouseup(function(ev){
		return false;
	});

	$(document).mouseup(function()
		{
			if($(".editorRtf").length != 0){
				if($(".editorRtf").is(":visible")){
					$(".editorRtf").fadeOut();
				}
				$(".editorRtf li.selected").removeClass("selected");
			}

	});
}

function loadRtf(elem){
	var div= document.createElement("div");
	div.className="parentRtf";

	$(div).load("framework/rtf.html", function(){
		$(".editorRtf ul li:not(#url)").click(function(ev){
			$("li.selected").removeClass("selected");
			$(this).addClass("selected");
			var formato=$(this).data("function");

			if(formato!=null){
				if(formato=='fontname') formatRtf(formato, elem, $(this).find("a").html());
				if(formato=='fontsize') formatRtf(formato, elem, $(this).data('size') );
				formatRtf(formato, elem)
			}else{
				if($(this).hasClass("dropdown")) dropDownClick(this);
			}	
		});
		$(".editorRtf").click(function(ev){
			ev.stopPropagation();
			ev.preventDefault();
		});

		//dont hide on click in editor

		$(".editorRtf").bind('click mousedown mouseup',function(){
			return false;
		});

		showRtf(elem);
	});
	document.body.appendChild(div);
}

function loadRtf(elem, dir){
	var div= document.createElement("div");
	div.className="parentRtf";

	$(div).load(dir, function(){
		$(".editorRtf ul li:not(#url)").click(function(ev){
			$("li.selected").removeClass("selected");
			$(this).addClass("selected");
			var formato=$(this).data("function");

			if(formato!=null){
				if(formato=='fontname'){ 
					formatRtf(formato, elem, $(this).find("a").html());
				}
				else if(formato=='fontsize') {
					formatRtf(formato, elem, $(this).data('size') );
				}
				else{				
					formatRtf(formato, elem);
				}
			}else{
				if($(this).hasClass("dropdown")) dropDownClick(this);
			}	
		});
		$(".editorRtf").click(function(ev){
			ev.stopPropagation();
			ev.preventDefault();
		});

		//dont hide on click in editor

		$(".editorRtf").bind('click mousedown mouseup',function(){
			return false;
		});

		showRtf(elem);
	});
	document.body.appendChild(div);
}

function showRtf(elem, dir){
	if($(".editorRtf").length == 0){
		loadRtf(elem, dir);
	}else{
		$(".editorRtf").fadeIn().css("display","inline-block");
		var pos=findPos(elem);
		var widthParent=$(elem).width()/2;
		var widthDiv=$(".editorRtf").width()/2;
		var heightDiv=$(".editorRtf").height();
		var heightElem=$(elem).height();
		var x=pos[0]+widthParent-widthDiv;
		var y=pos[1]-heightDiv-30;

		//var check=y-heightDiv;
		if(y<=0){
			y=pos[1]+30+heightElem;
			if($(".editorRtf").hasClass("top"))  $(".editorRtf").removeClass("top");
			if(!$(".editorRtf").hasClass("bottom"))  $(".editorRtf").addClass("bottom");
		}else{
			if(!$(".editorRtf").hasClass("top")) $(".editorRtf").addClass("top");
			if($(".editorRtf").hasClass("bottom")) $(".editorRtf").removeClass("bottom");
		}

		var newPos=[ x, y];
		setPos($(".editorRtf").parent()[0], newPos);
	}
}



function formatRtf(format, editor, value){

	if(format=="createlink"  || format=="insertImage"){
		value=prompt("Introduce el enlace");
	}
	document.execCommand(format, false, value);

	$(editor).focus();
}

function pxBackground(){
	//Need data-type=background	data-bgImage=image, [data-speed]
	$('section[data-type="background"]').each(function(){
		var $bgobj = $(this); 
		var img =$bgobj.attr("data-bgImage");
		$bgobj.css({background:" url('"+img+"') 50% 0 repeat fixed"});

		$(window).scroll(function() {
			var speed=null;
			speed=$bgobj.data('speed');
			if(speed==null) speed=15;
			var yPos = -($(window).scrollTop() /speed);

			var coords = '50% '+ yPos + 'px';

			$bgobj.css({ backgroundPosition: coords });
		});
	});   
}

function fadeOnScroll(){
	$(window).scroll(function() {
		$(".fadeOnScroll").each(function(){
			a = $(this).offset().top + $(this).height();
			b = $(window).scrollTop() + $(window).height();
			if (a < b) $(this).fadeTo(700,1);
		});
	});
}

function onScroll(elem, funcion){
	$(window).scroll(function() {
		$(elem).each(	function(){
			a = $(this).offset().top + $(this).height();
			b = $(window).scrollTop() + $(window).height();
			if (a < b) {
				funcion(this);
			}
		});
	});
}

function scrollToTop(){
	$("html, body").animate({ scrollTop: 0 }, "slow");
	return false;
}

function scrollToElement(elem){
	$('html, body').animate({
		scrollTop: $(elem).offset().top
		}, "slow");
	return false;
}

function scrollTo(){
	$(".scrollTo li a").click(function(e){
		e.preventDefault();
	})
	$(".scrollTo li").each(function(){
		$(this).click(function(){
			scrollToElement($(this).find("a").attr("href"));
		});
	});
}

//XSLT function
function loadXMLDoc(filename)
{
	if (window.ActiveXObject)
	{
		xhttp = new ActiveXObject("Msxml2.XMLHTTP");
	}
	else 
	{
		xhttp = new XMLHttpRequest();
	}
	xhttp.open("GET", filename, false);
	try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
	xhttp.send("");
	return xhttp.responseXML;
}

function XMLyXSL(xml, xslFile, elem){

	xsl = loadXMLDoc(xslFile);
	// code for IExpl
	if (window.ActiveXObject || xhttp.responseType == "msxml-document")
	{
		var content =transformXml(xml, xslFile);
		document.getElementById(elem).innerHTML = content;
	}
	// code for Chrome, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument)
	{
		xsltProcessor = new XSLTProcessor();
		xsltProcessor.importStylesheet(xsl);
		resultDocument = xsltProcessor.transformToFragment(xml, document);
		document.getElementById(elem).appendChild(resultDocument);
	}

	navbarResponsiveVertical();
}

function transformXml(xml, xslt)
{

	var loadedXslt = loadXSLTDocumentInIE(xslt);

	// Load the XML Document
	var xmlDoc = new ActiveXObject("Msxml2.DOMDocument.3.0");
	xmlDoc.async = false;
	xmlDoc.resolveExternals = false;
	xmlDoc.loadXML((new XMLSerializer()).serializeToString(xml));
	console.log(xmlDoc.parseError.reason); // for debugging, to make sure there is no errors after loading the document.

	// Load the XSL file
	var xslt = new ActiveXObject("Msxml2.XSLTemplate");
	var xslDoc = new ActiveXObject("Msxml2.FreeThreadedDOMDocument");
	xslDoc.async = false;
	xslDoc.loadXML(loadedXslt.responseText);
	xslt.stylesheet = xslDoc;

	var xslProc = xslt.createProcessor();
	xslProc.input = xmlDoc;
	xslProc.transform();
	return xslProc.output;

}

function loadXSLTDocumentInIE(fileName) {
	xhttp = new ActiveXObject("Microsoft.XMLHTTP");
	try {
		xhttp.responseType = "msxml-document";
	} catch (e) {
		//console.log("couldn't set the response type msxml in IE");
	}
	xhttp.open("GET", fileName, false);
	xhttp.send("");
	return xhttp; 
}


//Send data by URL

function getUrlVariable(variable)
{
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}

//AutoSlideUp
function slideAuto(elem, time){
	elem.slideDown();
	setTimeout(function(){
		elem.slideUp();
		}, time);

}

function fileExist(url){
	var http = new XMLHttpRequest();
	http.open('HEAD', url, false);
	http.send();
	return http.status!=404;
}

function createCanvasFromFile(file, canvas, max_width, max_height){
	var img = document.createElement("img");
	var reader = new FileReader();  
	reader.onload = function(e) {img.src = e.target.result}
	reader.readAsDataURL(file);

	img.onload = function () {
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0);

		var MAX_WIDTH = max_width;
		var MAX_HEIGHT = max_height;
		var width = img.width;
		var height = img.height;

		if (width > height) {
			if (width > MAX_WIDTH) {
				height *= MAX_WIDTH / width;
				width = MAX_WIDTH;
			}
		} else {
			if (height > MAX_HEIGHT) {
				width *= MAX_HEIGHT / height;
				height = MAX_HEIGHT;
			}
		}
		canvas.width = width;
		canvas.height = height;
		var ctx = canvas.getContext("2d");
		ctx.drawImage(img, 0, 0, width, height);

		var dataurl = canvas.toDataURL("image/png");
		thumbnail.push(dataurl);
	}
}