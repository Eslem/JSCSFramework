$(document).ready(function(){
	prepareDrag();
	loadFunctions();
});
//--------Buttons
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
			showRtf(element, "../framework/rtf.html");
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

	var dupli=document.createElement("button");
	dupli.className="bt xs";
	dupli.innerHTML="<i class='fa fa-copy'></i>";
	$(dupli).click(function(){
		if($(element).attr("draggable")=="true"){
			$(element).attr("draggable", false);
			$(".active").removeClass("active");
		}
		if($(element).attr("contenteditable")=="true"){
			$(element).attr("contenteditable", false);
			$(".editorRtf").fadeOut();
			$(".active").removeClass("active");
		}	

		$(element).clone().insertAfter(element);
		loadFunctions();

	});


	div.appendChild(edit);
	div.appendChild(move);
	div.appendChild(remove);
	div.appendChild(dupli);
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
	$(".tableRow").unbind("mouseover");
	$(".tableRow").unbind("click");
	$(document).unbind("mouseover");
	$(document).unbind("mouseup");

	$(".tableRow").click(function(ev){
		ev.stopPropagation();

		if($(".botonesElem").length!=0){
			$(".botonesElem").remove();
		}
		$(".selection").removeClass("selection");
		var div=$(this);
		$(this).addClass("selection");
		var pos=$(this).css("position");
		$(this).css("position", "relative");

		addBotones(this);
		$("#tipo").html($(this).data("type"));		

		//Handle Clicks

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

	$(document).mouseup(function()
		{
			$(".selection").attr("draggable", false);
			$(".selection").attr("contenteditable", false);
			$(".selection").removeClass("selection");
			if($(".botonesElem").length!=0){
				$(".botonesElem").remove();
			}
			if($(".editorRtf").is(":visible")){
				$(".editorRtf").fadeOut();
			}

	});

	$(".tableRow").mouseover(function(ev){
		ev.stopPropagation();
		$("#tagName").fadeIn('fast');
		var tag=$(this).data("type");

		var elem=document.getElementById("tagName");
		elem.innerHTML=tag;
		var pos=findPos(this);
		var width=$(this).width();
		var height=$(this).height();
		var x=pos[0];
		var y=pos[1]-$(elem).height()-5;

		var newPos=[x,y];

		setPos(elem,newPos);
		return false;
	});

	$(document).mouseover(function(){
		$("#tagName").fadeOut();
	});
}

//----------Drag&Drop
var elem;
var parent;
var html;
var dropped;
var where=null;

function prepareDrag(){
	var dropZone= document.querySelectorAll('#mailBody tr.tableRow');
	var dragElements = document.querySelectorAll('.element, .tr.tableRow');

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


function dragStart(e){

	$(".selection").removeClass("selection");
	e.dataTransfer.effectAllowed = 'move';
	var type=$(this).attr("id")
	e.dataTransfer.setData('text', type);

	dropped=false;
	elementDragged = this;


	if(type=="txtElem"){
		elem='<tr class="tableRow" data-type="Text"><td><table class="txtTable"><tbody><tr><td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget aliquet ante. Vivamus congue fringilla semper. Praesent rutrum neque tortor, eget convallis libero blandit sed. Aenean nec libero quis mauris lobortis sodales quis non tellus.</td></tr></tbody></table></td></tr>'; 
	}else if(type=="imgElem"){
		elem='<tr class="tableRow" data-type="img"><td><table class="imgTable"><tbody><tr><td><img src="images/cat.jpg"></img></td></tr></tbody></table></td></tr>'; 
	}else if(type=="buttonElem"){
		elem='<tr class="tableRow" data-type="button"><td><table class="buttonTable"><tbody><tr><td><button class="bt block default">Button</button></td></tr></tbody></table></td></tr>'; 
	}else if(type=="col2Elem"){
		elem='<tr class="tableRow" data-type="col"><td><table  border="0" cellpadding="0" cellspacing="0" align="left" width="49%">									<tbody>										<tr class="tableRow" data-type="Text">											<td><table class="txtTable prop" >													<tbody>														<tr>															<td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget aliquet ante. Vivamus congue fringilla semper.</td>														</tr>													</tbody>											</table>											</td>										</tr>									</tbody>								</table>								<table  border="0" cellpadding="0" cellspacing="0" align="left" width="49%">									<tbody>										<tr class="tableRow" data-type="Text">											<td><table class="txtTable prop ">													<tbody>														<tr>															<td>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi eget aliquet ante. Vivamus congue fringilla semper.</td>														</tr>													</tbody>											</table>											</td>										</tr>									</tbody>								</table></td></tr>'; 
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
	$(".divDrop").remove();
	e.preventDefault(); 
	e.stopPropagation();
	e.dataTransfer.dropEffect = 'move';
	var divDrop = document.createElement( 'tr' );
	divDrop.className="tableRow divDrop";
	divDrop.innerHTML='<td><table class="divDrop"><tbody><tr><td>Drop Here</td></tr></tbody></table></td>';
	var scroll=$(window).scrollTop();

	var x=e.clientX;
	var y=e.clientY+scroll;

	var posEl=findPos(this);
	var width=$(this).width();
	var height=$(this).height();
	var partX=width/4;
	var partY=height/2;

	//console.log("Height:"+partY+"  -pos"+posEl[0]);

	/*if(!$(".divDrop").length !=0){

	if( (x<(posEl[0]+partX)) && (y<(posEl[1]+(partY*2))))
	{
	//$(divDrop).insertBefore(this);	
	where="before";				
	$(this).addClass("bordeBefore");	
	}
	else if( (x>(posEl[0]+width-partX))	||	(y>(posEl[1]+height-partY)))
	{
	//$(divDrop).insertAfter(this);
	where="after";
	$(this).addClass("bordeAfter");	
	}
	}*/
	if(!$(".divDrop").length !=0){

		if( y<(posEl[1]+partY))
		{
			//$(divDrop).insertBefore(this);	
			where="before";				
			$(this).addClass("bordeBefore");	
		}
		else
		{
			//$(divDrop).insertAfter(this);
			where="after";
			$(this).addClass("bordeAfter");	
		}
	}

	return false;
}



function dragLeave(e){
	if($(".bordeBefore").length !=0){
		$(".bordeBefore").removeClass("bordeBefore");
	}

	if($(".bordeAfter").length !=0){
		$(".bordeAfter").removeClass("bordeAfter");
	}
}

function dropEvent(e){
	e.preventDefault(); 
	e.stopPropagation();
	if($(".divDrop").length !=0){
		$(".divDrop").remove();
	}

	dropped=true;
	if(where=="before"){
		$(elem).insertBefore(this);
	}
	else if( where=="after"){
		$(elem).insertAfter(this);
	}
	loadFunctions();
	prepareDrag();
}


//-----Propiedades

function padding(type){
	var padding=$(".selection").innerWidth() - $('.selection').width();	
	if(type=="up"){
		padding+=1;
	}else{
		padding-=1;
	}
	console.log(padding);
	$(".selection ").css("padding",padding+"px");
}
function margin(type){
	var margin=$(".selection td table").css("margin");
	console.log(margin);
	//console.log($(".selection td table").html());
	if(type=="up"){

	}
}

function preview(){
	var iframe = document.getElementById('mobileIframe'),
	iframedoc = iframe.contentDocument || iframe.contentWindow.document;

	iframedoc.body.innerHTML = $("#backMail").html();
	showModal("responsivePrev");
}

function previewDesktop(){
	var iframe = document.getElementById('mobileIframeDesktop'),
	iframedoc = iframe.contentDocument || iframe.contentWindow.document;

	iframedoc.body.innerHTML = $("#backMail").html();
	showModal("responsivePrevDesktop");
}