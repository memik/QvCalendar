// QV Calendar flex-selections
// Created by Mehmet Çaldak  mehmetcaldak@gmail.com
// simple javascript calendar as QlikView Extension (Qv11) 

// V1.1 WeekStart Option has been added on 04.Aug.2016  

// ---- Fixed  - Error : calendar disappearing after switching pages 03.01.2017 ---------------------------

var myDate = new Date();
var arDay = ["","","","","","",""];
var arMonth = ["","","","","","","","","","","",""];
var arDayColors = new Array("#646160","#a5a2a1","#fa534a");
var myYear = myDate.getFullYear();
var navYear = myYear;
var cFlag = true;
var wsSun = false;
var wsMon = true; 
var arSelectDates = [];

function setDaysMonths(){
	for (i = 1; i<8; i++) {
		d = new Date(myDate.setDate(i));
		dtext = d.toDateString();
		ar = dtext.split(" ");
		w = d.getDay();
		j = regDayOrders(cFlag,w);
		arDay[j] = ar[0];
	}
	for (i = 1; i<13; i++) {
		d = new Date(myDate.setMonth(i-1));
		dtext = d.toDateString();
		ar = dtext.split(" ");
		j = d.getMonth();
		arMonth[j] = ar[1];
	}
}
//--------------------------------- V1.1 -------------------------------------------------------------------	
function checkState(){
	if( document.getElementById('ws_Sunday').checked ) {
		cFlag =	false;
		wsSun = true;
		wsMon = false;
	} else if( document.getElementById('ws_Monday').checked ){
		cFlag =	true;
		wsSun = false;
		wsMon = true;
	}	
	return cFlag;
}
function regDayOrders(cFlag,weekDay){
	var i = weekDay; 
	if(cFlag){
		i = ( i + 6 ) % 7;
	}
	return i;
}

	

Date.prototype.getWeek = function() {
	var WeekOffset = 3;
	var	dayOffset = 4;
	if(cFlag){
		WeekOffset = 4;
		dayOffset = 3;
	}
		 var date = new Date(this.getTime());
		 var d = new Date(this.getTime());
		 date.setHours(0, 0, 0, 0);
		 date.setDate(date.getDate() + dayOffset - regDayOrders(cFlag,date.getDay()));
				 var week1 = new Date(date.getFullYear(), 0, WeekOffset);
		 week1.setDate(week1.getDate() + dayOffset - regDayOrders(cFlag,week1.getDay()));	
			 return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000 ) / 7);
		
	
}
 Array.prototype.pushUnique = function (item){
    if(this.indexOf(item) == -1) {
        this.push(item);
        return true;
    }
    return false;
}		
function buildCalendar(yy){
	setDaysMonths();
	var mm = 0;
	var yy = yy;
	var yCol = 0, yRow = 0; 
	var calendarHTML = "<table id = \"tblYear\" >";
	for (yRow = 1; yRow < 4; yRow++) {
		calendarHTML = calendarHTML 
					+ "<tr>";
		for (yCol = 1; yCol < 5; yCol++) {			
			calendarHTML = calendarHTML 
						+ '<td class = "outerCell">'
						+ monthCalendar(mm, yy)
						+ "</td>";
			mm++;
		}
		calendarHTML = calendarHTML 
					+ "</tr>";
	}	
	calendarHTML = calendarHTML 
				+ "</table>";					
	return calendarHTML;	
}

function setDayColor(cd) {
	if(cd.getDay() == 6){
		colorNo = 1;
	}
	else if(cd.getDay() == 0){
		colorNo = 2;
	}
	else{
		colorNo = 0;
	}
	return colorNo;
}
function monthCalendar(mm, yy){
	var monthHTML = "<table id = \"tblMonth\">";
	var cMonth = mm;
	var cYear = yy;
	var cDay = 1;
	var cDate = new Date(cYear,cMonth,cDay);
	var mCol = 0, mRow = 1;
	monthHTML = monthHTML
			+ "<caption class ='months'>"+arMonth[mm]+"</caption>";
	for (mRow = 0; mRow < 7; mRow++) {
		monthHTML = monthHTML 
				+ "<tr>"
				+ addWeek(mRow, cDate, cMonth);
		for (mCol = 0; mCol < 7; mCol++) {
			if (mRow == 0) {
				cellHTML = 	'<th class = "weekDays">' + arDay[mCol] + '</th>';
			}
			else {
				x = regDayOrders(cFlag,cDate.getDay()); 
				if (x == mCol && cDate <= dateValidate(cMonth,cYear)){
					cellHTML = 	'<td class = "innerCell"' 
							+ 'style="color: '+ arDayColors[setDayColor(cDate)] +'">' 
							+ '<span class = "hideCell">' + getSerialDateNumber(cDate) + '</span>'	
							+ cDate.getDate() + '</td>';
					cDay++;	
					cDate.setDate(cDay);
				}
				else {
					cellHTML ='<td>' + " " + '</td>';
				}	
			}	
			monthHTML = monthHTML + cellHTML;
		}	
		monthHTML = monthHTML
				+ "</tr>";	
	}
	monthHTML = monthHTML 
			+ "</table>";
return monthHTML;
}	
function dateValidate(m,y){
	return new Date(new Date(y, m+1, 1) -1);
}
function addWeek(r, wd, cM)
{
	var weekHTML ="";
	if (r == 0 || wd > dateValidate(cM,navYear))
	{
		weekHTML = '<th>' + " " + '</th>';
	}	
	else
	{
		weekHTML = '<th class = "innerCell">' + ((wd.getMonth() == cM) ? wd.getWeek() : " ") + '</th>';
	}	
	return weekHTML;
}

 //---- from formatted date to serial -------------------------
function getSerialDateNumber(d) {

    var baseDate = new Date(1900,0,1);
	baseDate.setUTCHours(00,00,00);
	var mydate=new Date(d);
	mydate.setUTCHours(23,59,59);
    var oneDay = 86400000;
    var dayDiff = Math.ceil(
			(mydate.getTime() - (baseDate.getTime()-oneDay)) / oneDay 
		);
    return dayDiff;
 }
 //---- from serial to formatted date -------------------------
 function getFormattedDate (dateNum) {
	var oneDay = 86400000;
	var baseDate = new Date(1900,0,1);
	baseDate.setUTCHours(00,00,00);
 	var mydate= new Date(baseDate.getTime() - oneDay + (dateNum -1)*oneDay);
    return mydate;
 }
 
function getSelectedDates(e) {
	$("td.hover").each(function(index) {
		txt = $(this).children(".hideCell").text();
		arSelectDates.pushUnique(txt);
		$(this).removeClass("hover");
		$(this).addClass("cover");
	});
}
function clrSelections(e) {	
	$("td.cover").each(function(index) {
		txt = $(this).children(".hideCell").text();		
		i =  arSelectDates.indexOf(txt);
		if (i > -1 ) {
			arSelectDates.splice(i,1);
		}
	});
}

QvaPath = Qva.Remote + "?public=only&name=Extensions/QvCalendar/"
Qva.LoadScript(QvaPath + "jquery-2.2.2.min.js");
 
var btnCheckFlag = false;
var btnUndoFlag = true;
var slctCount =0;

Qva.AddExtension("QvCalendar", function() { 
	Qva.LoadCSS(QvaPath + "Calendar.css");
	
		var n = this.Data.Rows.length -1;
		var QvDataFirst = this.Data.Rows[0][0].text;
		var QvDataLast = this.Data.Rows[n][0].text;
		var thisData = this.Data;

		var winW = window.innerWidth;
		var winH = window.innerHeight;	
		function createCalendar(yy){	
			var navHTML = navigationCal(yy);
			$("div#navigation").html(navigationCal(yy));
			$("div.calendar").html(buildCalendar(yy));
			loadJqEvents(); 				
		}
		function goPreviousYear(yy){
			var previousYear = navYear;
			previousYear--;
			navYear = previousYear;
			createCalendar(navYear);
		}
		function goNextYear(yy){
			var nextYear = navYear;
			nextYear++;
			navYear = nextYear; 
			createCalendar(navYear);
		}	
	
//--------------------------------- V1.1 -------------------------------------------------------------------
		var radioButtonsHTML = 
		'<div id = "radiobuttons">'
		+	'WeekStart Day :' + '<br/>' 
		+	'<input type="radio" name="weekStart" id="ws_Monday"  value="1" > Monday </input>'
		+	'<input type="radio" name="weekStart" id="ws_Sunday"  value="0" > Sunday </input>'
		+ '</div>'
		
		function navigationCal(yy){
			navYear = yy;
			var navigationHTML = '<input type="button" id="btnCheck" class="btnOpr" value= &#xE10B />'
				+ '<input type="button" id="btnClear" class="btnOpr" value= &#xE1C5 />'
				+ radioButtonsHTML
				+'<input type="button" id="btnPrev" class="btnCal" value=&lt />'
				+ '<span id="year">' + "&nbsp" + navYear + "&nbsp" + '</span>'
				+'<input type="button" id="btnNext" class="btnCal" value= &gt />'
				+ '<input type="button" id="btnUndo" class="btnOpr" value= &#xE10E />'		
				+ '<input type="button" id="btnQV" class="btnOpr" value= &#57710 />'
				;
				return navigationHTML;
		}	
		var errMsg = "";
		var arQvSelection =[];
// -------------- fixed part1 - error : object disapparing after page switch 01.03.2017 ---------------------------- 
		var sheetID, intSheetName, curSheetName;
		sheetID = document.getElementsByClassName("selectedtab");
		intSheetName = sheetID[0].querySelector("a").querySelector("span").innerHTML;
		function getSheetName(){
			sheetName = sheetID[0].querySelector("a").querySelector("span").innerHTML;
			return sheetName;		
		}
// ------------------ fixed part1 --------------------------------------------------------------------------------		

		function setSelectDatesOnQV(){
			var arrSelDt = arSelectDates;
			thisData.SelectTextsInColumn(0, false, arrSelDt);
		}				
			function rmvClass(f){
				$('.cover').removeClass('cover');
			} 

			function setClassAfterQVSelection(){
					$("td.innerCell").each(function(index) {
						var dValue = $(this).children(".hideCell").text();
						if(arSelectDates.indexOf(dValue) != -1) {
							 $(this).addClass("cover");
						}
					});	
			};			
		function undoSelectOnQV(){
			thisData.ClearSelections();
		}		
		if (!btnCheckFlag){		
			this.Element.innerHTML = '<div id = "navigation" class = "navigation">'
							+"</div>"
							+ '<p id = "gapNavCal"></p>'								
							+ '<div class = "calendar">'
							+ 'This is mydiv'
							+ '</div>';
			createCalendar(navYear);
		}


function loadJqEvents() {
	$(function() {
// -------------- fixed part2 - error: object disapparing after page switch 01.03.2017 ---------------------------- 		
		$("span").click(function(event) {
			setTimeout(function(){
				curSheetName = getSheetName();
				if ( intSheetName = curSheetName ) {
					clrSelections();
					rmvClass();
					btnCheckFlag = false;
				}
			}, 1);
		});
//---------------------------------- fixed part2------------------------------------------------------------------------		
		$("td.innerCell").click( function() {
			if ( $( this ).hasClass( "hover" )) { $(this).removeClass("hover");} else {if(!$( this ).hasClass( "cover" )) {$(this).addClass("hover");} };
		});
		$("th.innerCell").click( function() {
			that = $(this).closest("tr").children("td.innerCell").not(".cover");
			that.each(function(index, element) {
					if ( $(this).hasClass( "hover" )) {$(this).removeClass("hover");} else {$(this).addClass("hover");};
			})
		});	
		$("#tblMonth caption").click( function() {
			that = $(this).next().children().children("td.innerCell").not(".cover");
			that.each(function(index, element) {
					if ( $(this).hasClass( "hover" )) {$(this).removeClass("hover");} else {$(this).addClass("hover");};
			})
		});
		

		 $('.btnOpr').prop('disabled', true);
		 $("div.QvContent").click(function() {
			if ($('.hover').length > 0 ) {
				   $('#btnCheck').prop('disabled', false);
			} else {
					$('#btnCheck').prop('disabled', true);
			}
			if(arSelectDates.length > 0 ) {
			   $('#btnClear').prop('disabled', false);					
			   $('#btnQV').prop('disabled', false);
				   
			} else {
			   $('#btnClear').prop('disabled', true);					
			   $('#btnQV').prop('disabled', true);
			}
			
			$('#btnUndo').prop('disabled', btnUndoFlag);	

		 });

	});
	
	document.getElementById("btnNext").onclick =  function() {
		goNextYear();
		setClassAfterQVSelection();
	}	
	document.getElementById("btnPrev").onclick = function() {
		goPreviousYear();
		setClassAfterQVSelection();
	}
	document.getElementById("btnClear").onclick = function() {
		clrSelections();
		rmvClass();
				
	}

	document.getElementById("btnCheck").onclick = function() {
		getSelectedDates();
		btnCheckFlag = true;
	}
	document.getElementById("btnQV").onclick = function() {
		setSelectDatesOnQV();
		btnUndoFlag = false;						
	} 	
	document.getElementById("btnUndo").onclick = function() {
		undoSelectOnQV();
		btnUndoFlag = true;				
	} 
//--------------------------------- V1.1 -------------------------------------------------------------------
	document.getElementById("ws_Monday").onclick = function() {
		checkState();
		createCalendar(navYear);
		setClassAfterQVSelection();
	}
	document.getElementById("ws_Sunday").onclick = function() {
		checkState();
		createCalendar(navYear);
		setClassAfterQVSelection();
	}	

	radiobtnMon = document.getElementById("ws_Monday");
	radiobtnMon.checked = wsMon;
	radiobtnSun = document.getElementById("ws_Sunday");
	radiobtnSun.checked = wsSun;	
					
}

				
}); 
 
			