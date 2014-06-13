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
	$( "#page" ).load( "pages/"+name+".html", function() {
		changeSrcImg();
		loadFunctions();
	});
}

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
		if(!$(this).hasClass("active")){

			if($(element).attr("contenteditable")=="true"){
				$(element).attr("contenteditable", false);
				$(".editorRtf").fadeOut();
				$(".active").removeClass("active");
			}		

			elem=element;
			$(this).addClass("active");			
			$(element).attr("draggable", true);
			element.addEventListener('dragstart', dragEvent);
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
	/*
	$("#page p, #page :header").dblclick(function(){
	var div=$(this);
	$(this).attr("contenteditable", "true");
	$(document).mouseup(function()
	{
	$(div).attr("contenteditable", "false");
	});
	$(this).mouseup(function()
	{
	return false;
	});
	$(".navbar-vertical").mouseup(function()
	{
	return false;
	});
	showRtf(this);
	});*/

	$(".colors div").click(function(){
		$(".selection").addClass($(this).attr("class"));
	});

	prepareDrag();

	//changeSrcImg();
}

function changeImg(){
	var link=$("#imgSrc").val();
	$(".selection").attr("src", link);
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

	//Reload Clicks
	loadFunctions();

}

//--Dragg Drop
var elem;

function dragEvent(e){

	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text', $(this).data("function"));
	elementDragged = this;
	var type=$(this).data("function");

	if(type=="header"){
		elem='<h3 class="elemento">Header</h3>'; 
	}else if(type=="img"){
		elem='<img class="elemento" src="images/angel.jpg">'; 
	}else if(type=="p"){
		elem='<p class="elemento">Text</h3>'; 
	}else if(type=="row"){
		elem='<div class="elemento row"><div class="col-4 elemento"><p>col-4</p></div><div class="col-4 elemento"><p>col-4</p></div><div class="col-4 elemento"><p>col-4</p></div></div>'; 
	}else if(type=="col"){
		elem='<div class="elemento col-4"></div>'; 
	}
}

function prepareDrag(){
	var dropZone= document.querySelectorAll('#page *');
	var dragElements = document.querySelectorAll('#elements .element');



	for (var i = 0; i < dragElements.length; i++) {
		// Event Listener for when the drag interaction starts.
		dragElements[i].addEventListener('dragstart', dragEvent);
		// Event Listener for when the drag interaction finishes.
		dragElements[i].addEventListener('dragend', function(e) {
			//elementDragged.className="";
		});

	};

	for (var i = 0; i < dropZone.length; i++) {
		dropZone[i].addEventListener('dragover', function(e) {
			if (e.preventDefault) e.preventDefault(); 
			if (e.stopPropagation) e.stopPropagation();

			e.dataTransfer.dropEffect = 'move';
			$(this).addClass("over");
			if(!$("#page").find(".elemento").length !=0){
				var x=e.clientX;
				var y=e.clientY;
				var posEl=findPos(this);
				var width=$(this).width();
				var height=$(this).height();
				if( (x<(posEl[0]+(width/4)))  || (y<(posEl[1]+(height/4)))){
					$(elem).insertBefore(this);
				}
				else if( (x>(posEl[0]+width-(width/4)))	||		(y>(posEl[1]+height-(height/4)))){
					$(elem).insertAfter(this);
				}
				else{
					$(this).append(elem);
				}

				//$(this).append(elem);
			}

			return false;
		});

		/*dropZone[i].addEventListener('dragenter', function(e) {
		$(this).addClass("over");
		if(!$(this).find(".elemento").length !=0){
		$(this).append(elem);
		}

		});*/

		// Event Listener for when the dragged element leaves the drop zone.
		dropZone[i].addEventListener('dragleave', function(e) {
			$(this).removeClass("over");
			if($("#page").find(".elemento").length !=0){
				$("#page").find(".elemento").remove();
			}
		});

		dropZone[i].addEventListener('drop', function(e) {
			if (e.preventDefault) e.preventDefault(); 
			if (e.stopPropagation) e.stopPropagation();


			if($("#page").find(".elemento").length !=0){
				$("#page").find(".elemento").remove();
			}

			var x=e.clientX;
			var y=e.clientY;
			var posEl=findPos(this);
			var width=$(this).width();
			var height=$(this).height();
			if( (x<(posEl[0]+(width/4)))  || (y<(posEl[1]+(height/4)))){
				$(elem).insertBefore(this);
			}
			else if( (x>(posEl[0]+width-(width/4)))	||		(y>(posEl[1]+height-(height/4)))){
				$(elem).insertAfter(this);
			}
			else{
				$(this).append(elem);
			}

			$(".over").removeClass("over");
			$(".elemento").removeClass("elemento");
			loadFunctions();
			return false;
		});
	}
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
	$(div).load("framework/rtf.html", function(){
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
