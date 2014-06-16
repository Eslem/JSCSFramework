$(document).ready(function(){
	windowResize();
	responsive();
	ScrollVerticalNav();
	loadEditor();
	navbarResponsiveVertical();
	modal();	

});
var name;

function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function loadEditor(){
	name=getParameterByName("page");
	$("#linkPage").attr("href", "pages/"+name+".html");
	$.ajax({
		url:"pages/"+name+".html",
		cache:false,
		success:function(data){
			$("#page").html(data);
			changeSrcImg();
			loadFunctions();
			prepareDrag();
		}
	});

	/*$( "#page" ).load( "pages/"+name+".html", function() {
	changeSrcImg();
	loadFunctions();
	prepareDrag();

	});*/
}

function loadFunctions(){

	$("#page p, #page :header, #page img, #page div").click(function(ev){
		ev.stopPropagation();
		$("body").find(".botonesElem").remove();
		$(".selection").removeClass("selection");
		var div=$(this);
		$(this).addClass("selection");
		properties(div);
		var pos=$(this).css("position");
		$(this).css("position", "relative");

		addBotones(this);

		//Handle Clicks
		$(document).mouseup(function()
			{
				$(div).removeClass("selection");
				$(this).css("position", pos);
				$(".selection").removeClass("selection");
				$(".properties .tag").text("Tag");
				$("#properties .form").html("");
				$("body").find(".botonesElem").remove();
				$(div).attr("draggable", false);
				$(div).attr("contenteditable", false);
		});
		$(this).mouseup(function()
			{
				return false;
		});
		$(".navbar-vertical").mouseup(function()
			{
				return false;
		});
		$(".botonesElem").bind('click mousedown mouseup',function(){
			return false;
		});
	});

	//--Show of TagName
	$("#page p, #page :header, #page img, #page div").mouseover(function(ev){
		ev.stopPropagation();
		var tag=$(this).prop("tagName");
		if(tag=="DIV"){
			if($(this).hasClass("row")) tag="row";
			if($(this).is('[class*="col-"]')) tag="col";
		}		
		var elem=document.getElementById("tagName");
		elem.innerHTML=tag;
		var pos=findPos(this);
		var width=$(this).width();
		var height=$(this).height();
		var x=pos[0];
		var y=pos[1]-$(elem).height()-5;

		var newPos=[x,y];

		setPos(elem,newPos);

	});

	$(".colors div").click(function(){
		$(".selection").addClass($(this).attr("class"));
	});
	//prepareDrag();
	//changeSrcImg();
}

function chageClass(elem){
	tags(elem, function(option){
		$(".selection").addClass(option);
		},
		function(option){
			$(".selection").removeClass(option);
		}
	);
}

//--Properties of the element in the left menu
function properties(div){
	var tagName=$(div).prop("tagName");
	var tag=$("#properties").attr("data-target", div);
	$(".properties .tag").text(tagName);
	$("#properties .form").html("");
	if(tagName=="IMG"){
		var html='<label class="label">Img Src</label>'+
		'<input type="text" placeholder="src" id="imgSrc">'+
		'<button class="bt xs" onclick="changeImg()">Change</button><button class="bt xs primary" onclick="changeImg()">Upload</button><hr>'+
		'<label class="label">Class</label>'+
		'<div class="tags tag-primary ">'+
		'<div class="selection sm">'+
		'</div>'+
		'<select id="clasesImg" class="tag" onchange="chageClass(this)" onselect="chageClass(this)" data-target="inputid" data-removeOnSelect>'+
		'<option value=null selected="true">Elige opcion</option>'+
		'<option value="rounded">rounded</option>'+
		'<option value="hover">hover</option>'+
		'<option value="border">border</option>'+
		'<option value="border-double">border-double</option>'+
		'<option value="border-grove">border-grove</option>'+
		'<option value="circle">circle</option>'+
		'</select>'+
		'<input type="hidden" id="inputid" >'+
		'</div>'+
		'</div>';
		$("#properties .form").append(html);
		var classList =$(div).attr('class').split(/\s+/);
		$.each( classList, function(index, item){
			addSelectionTag(item, "#clasesImg", function(option){
				$(".selection").removeClass(option);
			});
		});

	}else if(tagName=="DIV"){

		var html='<div class="tags tag-primary ">'+
		'<div class="selection sm">'+
		'</div>'+
		'<select id="clasesDiv" class="tag" onchange="chageClass(this)" onselect="chageClass(this)" data-target="inputid" data-removeOnSelect>'+
		'<option value=null selected="true">Elige opcion</option>'+
		'<option value="rounded">rounded</option>'+
		'<option value="hover">hover</option>'+
		'<option value="border">border</option>'+
		'<option value="border-double">border-double</option>'+
		'<option value="border-grove">border-grove</option>'+
		'<option value="circle">circle</option>'+
		'</select>'+
		'<input type="hidden" id="inputid" >'+
		'</div>';
		$("#properties .form").append(html);

		var classList =$(div).attr('class').split(/\s+/);
		$.each( classList, function(index, item){
			addSelectionTag(item, "#clasesDiv", function(option){
				$(".selection").removeClass(option);
			});
		});

		if($(div).hasClass("row")){
			$(".properties div.tag").text("Row");
		}
		if($(div).is('[class*="col-"]')){
			$(".properties div.tag").text("Col");
		}

	}
	else if(tagName=="H1" || tagName=="H2" || tagName=="H3" || tagName=="H4" || tagName=="H5" || tagName=="H6"){

		var html='<label class="label">Header Type</label>'+

		'<select class="tag" onchange="changeHeader()" onselect="changeHeader()" id="headerSelection">'+
		'	<option value=null selected="true">Elige opcion</option>'+
		'	<option value="h1">h1</option>'+
		'	<option value="h2">h2</option>'+
		'	<option value="h3">h3</option>'+
		'	<option value="h4">h4</option>'+
		'	<option value="h5">h5</option>'+
		'	<option value="h6">h6</option>'+
		'</select>'+

		'<div class="colors center-text">'+
		'	<div class="black">&nbsp;'+
		'	</div>'+
		'	<div class="primary">&nbsp;'+
		'	</div>'+
		'	<div class="error">&nbsp;'+
		'	</div>'+
		'	<div class="info">&nbsp;'+
		'	</div>'+
		'	<div class="white">&nbsp;'+
		'	</div>'+
		'	<div class="success">&nbsp;'+
		'	</div>'+
		'	<div class="event">&nbsp;'+
		'	</div>'+
		'</div>'+

		'</div>';
		$("#properties .form").append(html);

		//--Tag					

		$("#headerSelection option[value='"+tagName.toLowerCase()+"']").attr("selected", "true");

		//--colors
		var classList = $(div)[0].className;
		var color=classList.replace("selection","");
		if(color!=""){
			$(".colors ."+color).addClass("selected");
		}

		$(".colors div").click(function(){
			$(".colors .selected").removeClass("selected");
			var classList = $(div)[0].className;
			var color=classList.replace("selection", "");
			if(color!=""){
				$(".selection").removeClass(color);
			}
			var sel=$(this).attr("class").replace("selected", "");
			$(".selection").addClass(sel);
			$(".colors ."+sel).addClass("selected");
		});

	}
}

function changeHeader(){
	var header=$("#headerSelection").val();
	var clases=$(".selection")[0].className;
	$(".selection").replaceWith($('<'+header+' class="'+clases+'">' + $(".selection").html() + '</'+header+'>'));
	loadFunctions();
}

//--Dragg Drop
var elem;
var parent;
var html;
var dropped;
var where=null;

function addBotones(element){
	var div=document.createElement("div");
	div.className="botonesElem";

	var edit=document.createElement("button");
	edit.className="bt xs";
	edit.innerHTML="<i class='fa fa-edit'></i>";
	$(edit).click(function(){

		if($(element).attr("draggable")=="true"){
			$(element).attr("draggable", false);
			$(".active").removeClass("active");
		}

		if(!$(this).hasClass("active")){
			$(this).addClass("active")
			$(element).attr("contenteditable", true);
			showRtf(element);
		}
		else {
			$(this).removeClass("active")
			$(element).attr("contenteditable", false);
			$(".editorRtf").fadeOut();
		}

	});

	var remove=document.createElement("button");
	remove.className="bt xs";
	remove.innerHTML="<i class='fa fa-trash-o'></i>";
	$(remove).click(function(){
		$(".editorRtf").fadeOut();
		$(div).fadeOut();
		$(element).remove();
	});

	var move=document.createElement("button");
	move.className="bt xs";
	move.innerHTML="<i class='fa fa-arrows'></i>";
	$(move).click(function(){
		parent=$(element).parent();
		html=$("#page").html();
		if(!$(this).hasClass("active")){
			if($(element).attr("contenteditable")=="true"){
				$(element).attr("contenteditable", false);
				$(".editorRtf").fadeOut();
				$(".active").removeClass("active");
			}		

			elem=element;
			$(this).addClass("active");			
			$(element).attr("draggable", true);
			element.addEventListener('dragstart', dragStart);
		}
		else {
			$(this).removeClass("active");
		}
	});


	div.appendChild(edit);
	div.appendChild(move);
	div.appendChild(remove);
	document.body.appendChild(div);

	var pos=findPos(element);
	var width=$(element).width();
	var height=$(element).height();
	var x=pos[0]+width-$(div).width();
	var y=pos[1]+height;

	var newPos=[x,y];

	setPos(div,newPos);
}

function dragStart(e){
	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text', $(this).data("function"));

	dropped=false;
	elementDragged = this;
	var width=$(elementDragged).width();
	var height=$(elementDragged).height();

	if($(elementDragged).prop("tagName")=="IMG"){
		$(elementDragged).width(width);
		$(parent).width(width);
		$(parent).height(height); 
	}

	var type=$(this).data("function");

	if(type=="header"){
		elem='<h3 class="elemento">Header</h3>'; 
	}else if(type=="img"){
		elem='<img class="elemento" src="pages/images/angel.jpg">'; 
	}else if(type=="p"){
		elem='<p class="elemento">Text</h3>'; 
	}else if(type=="row"){
		elem='<div class="elemento row"><div class="col-4 elemento"><p>col-4</p></div><div class="col-4 elemento"><p>col-4</p></div><div class="col-4 elemento"><p>col-4</p></div></div>'; 
	}else if(type=="col"){
		elem='<div class="elemento col-4"></div>'; 
	}
}

function dragEnd(e){
	e.preventDefault(); 
	e.stopPropagation();

	$(".bordeBefore").removeClass("bordeBefore");	
	$(".bordeAfter").removeClass("bordeAfter");	

	if($("#page").find(".elemento").length !=0){
		$("#page").find(".elemento").remove();
	}
	if(!dropped){
		$("#page").html(html);
		loadFunctions();
	}
}

function dragOver(e){


	var tag=$(this).prop("tagName");
	if(tag=="DIV"){
		if($(this).hasClass("row")) tag="row";
		if($(this).is('[class*="col-"]')) tag="col";
	}		
	var tagElem=document.getElementById("tagName");
	tagElem.innerHTML=tag;
	var pos=findPos(this);
	var width=$(this).width();
	var height=$(this).height();
	var x=pos[0];
	var y=pos[1]-$(tagElem).height()-5;

	var newPos=[x,y];

	setPos(tagElem,newPos);

	e.preventDefault(); 
	e.stopPropagation();

	$(".bordeBefore").removeClass("bordeBefore");	
	$(".bordeAfter").removeClass("bordeAfter");	

	e.dataTransfer.dropEffect = 'move';
	$(this).addClass("over");
	if(!$("#page").find(".elemento").length !=0){
		var x=e.clientX;
		var y=e.clientY;
		var posEl=findPos(this);
		var width=$(this).width();
		var height=$(this).height();
		var partX=width/4;
		var partY=height/4;


		if( (x<(posEl[0]+partX)) && (y<(posEl[1]+(partY*2))))
		{
			//$(elem).insertBefore(this);
			$(this).addClass("bordeBefore");	
			where="before";				
		}
		else if( (x>(posEl[0]+width-partX))	||	(y>(posEl[1]+height-partY*2)))
		{
			$(this).addClass("bordeAfter");	
			where="after";
		}
		else{
			$(this).append(elem);
			where="in";
		}
	}

	return false;
}

function dragLeave(e){
	$(this).removeClass("over");
	if($("#page").find(".elemento").length !=0){
		$("#page").find(".elemento").remove();
	}
}

function dropEvent(e){
	e.preventDefault(); 
	e.stopPropagation();

	dropped=true;

	var x=e.clientX;
	var y=e.clientY;
	var posEl=findPos(this);
	var width=$(this).width();
	var height=$(this).height();

	if(where=="before"){
		$(elem).insertBefore(this);
	}
	else if( where=="after"){
		$(elem).insertAfter(this);
	}
	else{
		$(this).append(elem);
	}

	$(".over").removeClass("over");
	$(".elemento").removeClass("elemento");
	loadFunctions();

	$(elem)[0].addEventListener('dragstart', dragStart);
	$(elem)[0].addEventListener('dragend', dragEnd);
	$(elem)[0].addEventListener('dragover', dragOver);
	$(elem)[0].addEventListener('dragleave', dragLeave);
	$(elem)[0].addEventListener('drop', dropEvent);
}

function prepareDrag(){
	var dropZone= document.querySelectorAll('#page *');
	var dragElements = document.querySelectorAll('#elements .element, #page *');

	for (var i = 0; i < dragElements.length; i++) {
		dragElements[i].addEventListener('dragstart', dragStart);
		dragElements[i].addEventListener('dragend', dragEnd);
	};

	for (var i = 0; i < dropZone.length; i++) {
		dropZone[i].addEventListener('dragover', dragOver);
		dropZone[i].addEventListener('dragleave', dragLeave);
		dropZone[i].addEventListener('drop', dropEvent);
	}
}

//--Src Images

function changeSrcImg(){
	$("#page img").each(function(){
		var src=$(this).attr("src");
		src="pages/"+src;
		console.log(src);
		$(this).attr("src", src);
	});
}
function resetSrcImg(){
	$("#page img").each(function(){
		var src=$(this).attr("src");
		src=src.replace("pages/", "");
		console.log(src);
		$(this).attr("src", src);
	});
}


//--- Rtf SobreCarga

function loadRtf(elem){
	var div= document.createElement("div");
	div.className="parentRtf";
	document.body.appendChild(div);
	$(div).load("../WebFramework/framework/rtf.html", function(){
		$(".editorRtf ul li").click(function(ev){
			$("li.selected").removeClass("selected");
			$(this).addClass("selected");
			var formato=$(this).data("function");

			if(formato!=null){
				if(formato=='fontname') formatRtf(formato, elem, $(this).find("a").html());
				formatRtf(formato, elem)
			}else{
				if($(this).hasClass("dropdown")) dropDownClick(this);
			}	
		});
		$(".editorRtf").click(function(ev){
			ev.stopPropagation()
			ev.preventDefault()
		});

		//dont hide on click in editor

		$(".editorRtf").bind('click mousedown mouseup',function(){
			return false;
		});

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

		showRtf(elem);
	});
}

//--Save & Preview

function preview(){
	var iframe = document.getElementById('mobileIframe'),
	iframedoc = iframe.contentDocument || iframe.contentWindow.document;

	iframedoc.body.innerHTML = $("#page").html();
	showModal("responsivePrev");
}

function previewDesktop(){
	var iframe = document.getElementById('mobileIframeDesktop'),
	iframedoc = iframe.contentDocument || iframe.contentWindow.document;

	iframedoc.body.innerHTML = $("#page").html();
	showModal("responsivePrevDesktop");
}

function savePage(button){
	$("#spanSave").text("");
	$("#loaderSave").slideDown();
	$(".selection").removeClass("selection");
	var imagen="";
	html2canvas($("#page")[0], {
		onrendered: function(canvas) {
			imagen = canvas.toDataURL("image/png");
			resetSrcImg();
			$.ajax({
				type:"POST",
				url:"php/pagesRequests.php",
				data:{
					name:name,
					img:imagen,
					wth:'save',
					html:$("#page").html()
				},
				success:function(data){
					$("#spanSave").text("Saved");
					$("#loaderSave").slideUp();
					loadEditor();
					setTimeout(function(){$("#spanSave").text("Save");}, 5000);
				}
			});
		}
	});

}
