$(document).ready(function(){
	windowResize();
	responsive();
	ScrollVerticalNav();
	loadEditor();
	navbarResponsiveVertical();
});
var name;

function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function loadEditor(){
	name=getParameterByName("page");
	$( "#page" ).load( "pages/"+name+".html", function() {
		loadFunctions();
	});
}

function loadFunctions(){

	$("#page p, #page :header, #page img, #page div").click(function(ev){
		ev.stopPropagation();
		$(".selection").removeClass("selection");
		var div=$(this);
		$(this).addClass("selection");
		properties(div);
		$(document).mouseup(function()
			{
				$(div).removeClass("selection");
				$(".selection").removeClass("selection");
				$(".properties .tag").text("Tag");
				$("#properties .form").html("");
		});
		$(this).mouseup(function()
			{
				return false;
		});
		$(".navbar-vertical").mouseup(function()
			{
				return false;
		});
	});

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
	});

	$(".colors div").click(function(){
		$(".selection").addClass($(this).attr("class"));
	});

	prepareDrag();

	changeSrcImg();
}

function changeImg(){
	var link=$("#imgSrc").val();
	$(".selection").attr("src", link);
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
		'<select class="tag" onchange="tags(this)" onselect="tags(this)" data-target="inputid" data-removeOnSelect>'+
		'<option value=null selected="true">Elige opcion</option>'+
		'<option value="rounded">rounded</option>'+
		'<option value="thumbnail">thumbnail</option>'+
		'<option value="circle">circle</option>'+
		'</select>'+
		'<input type="hidden" id="inputid" >'+
		'</div>'+
		'</div>';
		$("#properties .form").append(html);
		var classList = $(div)[0].className;
		if(classList.indexOf("thumbnail") > -1){
			$('#properties .tag').val('thumbnail');
		}
		if(classList.indexOf("rounded") > -1){
			alert("thumb");
		}
		if(classList.indexOf("circle") > -1){
			alert("thumb");
		}

	}else if(tagName=="DIV"){
		if($(div).hasClass("row")){
			$(".properties .tag").text("Row");
			console.log($(div).children("div").length);
			$(div).children("div").each(function(index, child){
				console.log($(this).attr("class"));
			});
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

function prepareDrag(){
	var dropZone= document.querySelectorAll('#page *');
	var dragElements = document.querySelectorAll('#elements .element');
	var elementDragged = null;

	var elem;

	for (var i = 0; i < dragElements.length; i++) {

		// Event Listener for when the drag interaction starts.
		dragElements[i].addEventListener('dragstart', function(e) {
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

			}else if(type=="col"){

			}
		});

		// Event Listener for when the drag interaction finishes.
		dragElements[i].addEventListener('dragend', function(e) {
			//elementDragged.className="";
			elementDragged = null;
		});

	};

	for (var i = 0; i < dropZone.length; i++) {
		dropZone[i].addEventListener('dragover', function(e) {
			if (e.preventDefault) {
				e.preventDefault();
			}

			e.dataTransfer.dropEffect = 'move';
			$(this).addClass("over");
			if(!$(this).find(".elemento").length !=0){
				$(this).append(elem);
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
			if($(this).find(".elemento").length !=0){
				$(this).children(".elemento").remove();
			}
		});

		dropZone[i].addEventListener('drop', function(e) {
			if (e.preventDefault) e.preventDefault(); 
			if (e.stopPropagation) e.stopPropagation();
			if($(this).find(".elemento").length !=0){
				$(this).children(".elemento").remove();
			}
			//$(elem).insertBefore(this);
			$(this).append(elem);

			$(".over").removeClass("over");
			loadFunctions();
			return false;
		});
	}
}

function savePage(button){
	$("#spanSave").text("");
	$("#loaderSave").slideDown();
	$.ajax({
		type:"POST",
		url:"php/pagesRequests.php",
		data:{
			name:name,
			wth:'save',
			html:$("#page").html()
		},
		success:function(data){
			$("#spanSave").text("Saved");
			$("#loaderSave").slideUp();
			setTimeout(function(){$("#spanSave").text("Save");}, 5000);
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