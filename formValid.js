
var regInputFields = ['fname', 'lname', 'email', 'gender', 'dob', 'country', 'state', 'contact', 'qualification', 'phoneNum', 'mobNum'];
var requires = {
	fname : {
			required : true,
			splited : false,
			type : "text"
		},
	lname : {
			required : true,
			splited : false,
			type : "text"
		},
	email : {
			required : true,
			splited : false,
			type : "email"
		},
	gender : {
			required : true,
			splited : false,
			type : "select"
		},
	dob : {
			required : true,
			splited : true,
			type : "select"
		},
	country : {
			required : true,
			splited : false,
			type : "select"
		},
	state : {
			required : true,
			splited : false,
			type : "select"
		},
	contact : {
			required : true,
			splited : false,
			type : "radio"
		},
	qualification : {
			required : true,
			splited : false,
			type : "checkbox"
		},
	phoneNum : {
			required : true,
			splited : true,
			type : "number"
		},
	mobNum : {
			required : true,
			splited : true,
			type : "number"
		},
}
var selectedDt = "Select";
var splitSeparator = "-";
function setSplitSeparator(symbol){
	splitSeparator = symbol.substring(0,1);
	for(i = 0; i < regInputFields.length; i++){
		if(requires[regInputFields[i]]["splited"] == "true" || requires[regInputFields[i]]["splited"]){
			document.getElementById(regInputFields[i]+'hfn1').innerHTML = splitSeparator;
			document.getElementById(regInputFields[i]+'hfn2').innerHTML = splitSeparator;
		}
	}
}
function isNumericKey(e, obj)
{
	if (window.event) { 
		var charCode = window.event.keyCode; 
	}
    else if (e) 
	{ 
		var charCode = e.which; 
	}
    else { 
		return true; 
	}
    if (charCode > 31 && (charCode < 48 || charCode > 57) ) { 
		return false; 
	}
	return true;
}
function loadEvents(){
	loadCalender();
	loadCountry();
	loadState();
	checkRequired();
	var dtElmnt = document.getElementById("dob1");
	var mnthElmnt = document.getElementById("dob2");
	var yrElmnt = document.getElementById("dob3");
	mnthElmnt.onchange = onChangeMonth;
	yrElmnt.onchange = onChangeYr;
	dtElmnt.onchange = onSelectDate;
	
	var countryElmnt = document.getElementById("country");
	var stateElmnt = document.getElementById("state");
	countryElmnt.onchange = loadState;
	
	var phoneNum1Elmnt = document.getElementById("phoneNum1");
	var phoneNum2Elmnt = document.getElementById("phoneNum2");
	var phoneNum3Elmnt = document.getElementById("phoneNum3");
	
	phoneNum1Elmnt.onkeypress = isNumericKey;
	phoneNum2Elmnt.onkeypress = isNumericKey;
	phoneNum3Elmnt.onkeypress = isNumericKey;
	
	phoneNum1Elmnt.onkeyup = function() {return moveToNextField("phoneNum1", "phoneNum2")};
	phoneNum2Elmnt.onkeyup = function() {return moveToNextField("phoneNum2", "phoneNum3")};
	splitTxtBoxInToThree("mobNumDiv", "mobNum", true);
}
function checkRequired(){
	for(i = 0; i < regInputFields.length; i++){
		if(requires[regInputFields[i]]["required"] == "true" || requires[regInputFields[i]]["required"]){
			labelTxtElmnt = document.getElementById(regInputFields[i]+"Lbl");
			LblTxt = labelTxtElmnt.innerHTML;
			labelTxtElmnt.innerHTML = LblTxt+"*";
		}
	}
}
function splitTxtBoxInToThree(targetDivId, sourceTxtId, numeric){

	sourceTxt = document.getElementById(sourceTxtId);
	targetDiv = document.getElementById(targetDivId);
	position = 0;
	for (i=0;i<targetDiv.childNodes.length;i++)
	{
		if(sourceTxtId == targetDiv.childNodes[i].id){
			position = i;
		}
	}
	targetDiv.removeChild(sourceTxt);
	
	var FirstText = document.createElement('input');
	FirstText.setAttribute('type','text');
	FirstText.setAttribute('id',sourceTxtId+"1");
	FirstText.setAttribute('maxlength','3');
	FirstText.setAttribute('size','3');
	targetDiv.appendChild(FirstText);
	
	
	var hfn1Lbl = document.createElement('label');
	hfn1Lbl.setAttribute('id',sourceTxtId+"hfn1");
	hfn1Lbl.innerHTML = '-';
	targetDiv.appendChild(hfn1Lbl);
	
	var SecondText = document.createElement('input');
	SecondText.setAttribute('type','text');
	SecondText.setAttribute('id',sourceTxtId+"2");
	SecondText.setAttribute('maxlength','3');
	SecondText.setAttribute('size','3');
	targetDiv.appendChild(SecondText);
	
	var hfn2Lbl = document.createElement('label');
	hfn2Lbl.setAttribute('id',sourceTxtId+"hfn2");
	hfn2Lbl.innerHTML = '-';
	targetDiv.appendChild(hfn2Lbl);
	
	var ThirdText = document.createElement('input');
	ThirdText.setAttribute('type','text');
	ThirdText.setAttribute('id',sourceTxtId+"3");
	ThirdText.setAttribute('maxlength','4');
	ThirdText.setAttribute('size','4');
	targetDiv.appendChild(ThirdText);
	if(numeric){
		FirstText.onkeypress = isNumericKey;
		SecondText.onkeypress = isNumericKey;
		ThirdText.onkeypress = isNumericKey;
	}
	FirstText.onkeyup = function() {return moveToNextField(sourceTxtId+"1", sourceTxtId+"2")};
	SecondText.onkeyup = function() {return moveToNextField(sourceTxtId+"2", sourceTxtId+"3")};
	
}
function moveToNextField(source, destn)
{
    if(document.getElementById(source).value.length == 3){
		document.getElementById(destn).focus();
	}
} 

var onChangeYr = function onChangeYr(){
	var dtElmnt = document.getElementById("dob1");
	var mnthElmnt = document.getElementById("dob2");
	var yrElmnt = document.getElementById("dob3");	
	var yrElmntVal = yrElmnt.value;
	var mnthVal = mnthElmnt.value;
	var today = new Date();
	var fullYr = today.getFullYear();
	var yrArr = new Array();
	for(i = fullYr; i > (fullYr - 60); i --){
		yrArr.push(i);
	}
	if(((yrElmntVal % 4) == 0) && (mnthVal == "February"))
	{
		dtElmnt.options.length = 0;
		dtElmnt.options[0] = new Option("Select", "Select");
		for(d = 1; d <= 29; d++)
		{
			dtElmnt.options[d] = new Option(d, d);
		}
	}
	else if(((yrElmntVal % 4) != 0) && (mnthVal == "February"))
	{
		dtElmnt.options.length = 0;
		dtElmnt.options[0] = new Option("Select", "Select");
		for(d = 1; d <= 28; d++)
		{
			dtElmnt.options[d] = new Option(d, d);
		}
	}
	else if(mnthVal == "April" || mnthVal == "June" || mnthVal == "September" || mnthVal == "November")
	{
		dtElmnt.options.length = 0;
		dtElmnt.options[0] = new Option("Select", "Select");
		for(d = 1; d <= 30; d++)
		{
			dtElmnt.options[d] = new Option(d, d);
		}
	}
	else{
		dtElmnt.options.length = 0;
		dtElmnt.options[0] = new Option("Select", "Select");
		for(d = 1; d <= 31; d++)
		{
			dtElmnt.options[d] = new Option(d, d);
		}
	}
	dtElmnt.value = selectedDt;
}
var onChangeMonth = function onChangeMonth(){

	var dtElmnt = document.getElementById("dob1");
	var mnthElmnt = document.getElementById("dob2");
	var yrElmnt = document.getElementById("dob3");
	var yrElmntVal = yrElmnt.value;
	var mnthVal = mnthElmnt.value;
	var today = new Date();
	var fullYr = today.getFullYear();
	var yrArr = new Array();
	for(i = fullYr; i > (fullYr - 60); i --){
		yrArr.push(i);
	}
	
	if(mnthVal == "April" || mnthVal == "June" || mnthVal == "September" || mnthVal == "November")
	{
		dtElmnt.options.length = 0;
		dtElmnt.options[0] = new Option("Select", "Select");
		for(d = 1; d <= 30; d++)
		{
			dtElmnt.options[d] = new Option(d, d);
		}
		for(y = 0; y < yrArr.length; y++)
		{
			yrElmnt.options[y] = new Option(yrArr[y], yrArr[y]);
		}
	}
	else if(mnthVal == "February"){
		if(selectedDt == 29){
			yrElmnt.options.length = 0;
			var LeapYrArr = new Array();
			for(y = 0; y < yrArr.length; y++)
			{
				if((yrArr[y] % 4) == 0){
					LeapYrArr.push(yrArr[y]);
				}
			}
			for(ly = 0; ly < LeapYrArr.length; ly++)
			{
				yrElmnt.options[ly] = new Option(LeapYrArr[ly], LeapYrArr[ly]);
			}
		}
	
		if((yrElmntVal % 4) == 0){
			dtElmnt.options.length = 0;
			dtElmnt.options[0] = new Option("Select", "Select");
			for(d = 1; d <= 29; d++)
			{
				dtElmnt.options[d] = new Option(d, d);
			}
		}
		else{
			dtElmnt.options.length = 0;
			dtElmnt.options[0] = new Option("Select", "Select");
			for(d = 1; d <= 28; d++)
			{
				dtElmnt.options[d] = new Option(d, d);
			}
		}
	}
	else{
		dtElmnt.options.length = 0;
		dtElmnt.options[0] = new Option("Select", "Select");
		for(d = 1; d <= 31; d++)
		{
			dtElmnt.options[d] = new Option(d, d);
		}
		
		for(y = 0; y < yrArr.length; y++)
		{
			yrElmnt.options[y] = new Option(yrArr[y], yrArr[y]);
		}
	}
	dtElmnt.value = selectedDt;
}
var onSelectDate = function onSelectDate(){
	var dtElmnt = document.getElementById("dob1");
	var mnthElmnt = document.getElementById("dob2");
	var yrElmnt = document.getElementById("dob3");
	var yrElmntVal = yrElmnt.value;
	var mnthVal = mnthElmnt.value;
	var dateVal = dtElmnt.value;
	
	
	var today = new Date();
	var fullYr = today.getFullYear();
	var yrArr = new Array();
	for(i = fullYr; i > (fullYr - 60); i --){
		yrArr.push(i);
	}
	var LeapYrArr = new Array();
	if(dateVal == 29 && mnthVal == "February"){
		yrElmnt.options.length = 0;
		
		for(y = 0; y < yrArr.length; y++)
		{
			if((yrArr[y] % 4) == 0){
				LeapYrArr.push(yrArr[y]);
			}
		}
		for(ly = 0; ly < LeapYrArr.length; ly++)
		{
			yrElmnt.options[ly] = new Option(LeapYrArr[ly], LeapYrArr[ly]);
		}
	}
	selectedDt = dateVal;
}
function loadCalender(){
	var dtElmnt = document.getElementById("dob1");
	var mnthElmnt = document.getElementById("dob2");
	var yrElmnt = document.getElementById("dob3");
	mnthElmnt.onchange = onChangeMonth;
	var today = new Date();
	var fullYr = today.getFullYear();
	var yrArr = new Array();
	for(i = fullYr; i > (fullYr - 60); i --){
		yrArr.push(i);
	}
	for(y = 0; y < yrArr.length; y++)
	{
		yrElmnt.options[y] = new Option(yrArr[y], yrArr[y]);
	}
	var monthsArr = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
	for(m = 0; m < monthsArr.length; m++)
	{
		mnthElmnt.options[m] = new Option(monthsArr[m], monthsArr[m]);
	}
	onChangeMonth();
	onChangeYr();
}
var country = ['India', 'Pakistan', 'Bangladesh'];
var countryState = {
	India : [ 'Andhra Pradesh' ,'Assam' ,'Bihar' ,'Chandigarh' ,'Chhatisgarh' ,'Delhi' ,'Gujarat' ,'Haryana' ,'Jammu and Kashmir' ,'Jharkhand' ,'Karnataka' ,'Kerala' ,'Madhya Pradesh' ,'Maharashtra' ,'Manipur' ,'Meghalaya' ,'Mizoram' ,'Orissa' ,'Pondicherry' ,'Punjab' ,'Rajasthan' ,'Tamil Nadu' ,'Tripura' ,'Uttar Pradesh' ,'Uttaranchal' ,'West Bengal' ],
	Pakistan : [ 'Baluchistan' , 'Islamabad', 'Punjab', 'Sindh' ],
	Bangladesh : [ 'Barisal', 'Chittagong', 'Dhaka', 'Khulna', 'Rajshahi', 'Sylhet' ]
 };
function loadCountry(){
	var countryElmnt = document.getElementById("country");
	var stateElmnt = document.getElementById("state");
	for(i = 0; i < country.length; i++)
	{
		countryElmnt.options[i] = new Option(country[i], country[i]);
	}
}
var loadState = function loadState(){
	var countryElmnt = document.getElementById("country");
	var stateElmnt = document.getElementById("state");
	var countryVal = countryElmnt.value;
	var allStatesArr = countryState[countryVal];
	stateElmnt.options.length = 0;
	for(i = 0; i < allStatesArr.length; i++)
	{
		stateElmnt.options[i] = new Option(allStatesArr[i], allStatesArr[i]);
	}
		
}
function Validate(){
	for(i = 0; i < regInputFields.length; i++){
		if(requires[regInputFields[i]]["type"] == "text" || requires[regInputFields[i]]["type"] == "number" || requires[regInputFields[i]]["type"] == "select"){
			if(requires[regInputFields[i]]["splited"] == "true" || requires[regInputFields[i]]["splited"]){
				var FirstElmnt = document.getElementById(regInputFields[i]+"1");
				var SecondElmnt = document.getElementById(regInputFields[i]+"2");
				var ThirdElmnt = document.getElementById(regInputFields[i]+"3");
				if(requires[regInputFields[i]]["type"] == "select"){
					if(FirstElmnt.value == "" || FirstElmnt.value == "Select" || SecondElmnt.value == "Select" || SecondElmnt.value == "" || ThirdElmnt.value == "Select" || ThirdElmnt.value == "")
					{
						showErrorMessage(regInputFields[i]);					
					}
					else{
						removeErrorMessage(regInputFields[i]);
					}
				}
				else{
					if(FirstElmnt.value.length != 3 || SecondElmnt.value.length != 3 || ThirdElmnt.value.length != 4)
					{
						showErrorMessage(regInputFields[i]);					
					}
					else{
						removeErrorMessage(regInputFields[i]);
					}
				}
			}
			else{
				var Elmnt = document.getElementById(regInputFields[i]);
				if(Elmnt.value == "" || Elmnt.value == "Select")
					{
						showErrorMessage(regInputFields[i]);						
					}
					else{
						removeErrorMessage(regInputFields[i]);
					}
			}
		}
		else if(requires[regInputFields[i]]["type"] == "email"){
			var Elmnt = document.getElementById(regInputFields[i]);
			fieldval = Elmnt.value;
			if(fieldval != "")
			{
				if(fieldval.indexOf("@") == -1 || fieldval.indexOf(".") == -1 || fieldval.split("@")[0].length== 0 || fieldval.split("@")[1].length== 0 || fieldval.split(".")[1].length== 0)
				{
					showErrorMessage(regInputFields[i]);	
				}
				else{
					removeErrorMessage(regInputFields[i]);
				}
			}
			else{
				showErrorMessage(regInputFields[i]);
			}
			
		}
		else if(requires[regInputFields[i]]["type"] == "radio")
		{
			var fieldVal = "";
			var inputs = document.getElementsByName(regInputFields[i]);
			for (var r = 0; r < inputs.length; r++) {
			  if (inputs[r].checked) {
				fieldVal = inputs[r].value;
			  }
			}
			if(fieldVal == ""){
				showErrorMessage(regInputFields[i]);
			}
			else{
				removeErrorMessage(regInputFields[i]);
			}
		}
		else if(requires[regInputFields[i]]["type"] == "checkbox"){
			var fieldValue = "";
			checkInput = document.getElementsByName(regInputFields[i]);
			for (var c = 0; c < checkInput.length; c++) {
			  if (checkInput[c].checked) {
				fieldValue = checkInput[c].value;
			  }
			}
			if(fieldValue == ""){
				showErrorMessage(regInputFields[i]);
			}
			else{
				removeErrorMessage(regInputFields[i]);
			}
		
		}
		else{
			fieldValue = document.getElementById(regInputFields[i]).value;
			if(fieldValue == ""){
				showErrorMessage(regInputFields[i]);
			}
			else{
				removeErrorMessage(regInputFields[i]);
			}
		}
	}
}
function showErrorMessage(fieldId){
	errorMsg = "   "+document.getElementById(fieldId+"Lbl").innerHTML.split("*")[0]+" is invalid.";
	targetDiv = document.getElementById(fieldId+"Div");
	if(document.getElementById(fieldId+"Req") != null)
	{	
		targetDiv.removeChild(document.getElementById(fieldId+"Req"));
	}
	var errorMsgSpan = document.createElement('span');
	errorMsgSpan.setAttribute('id',fieldId+"Req");
	errorMsgSpan.innerHTML = errorMsg;
	targetDiv.appendChild(errorMsgSpan);
}
function removeErrorMessage(fieldId){
	targetDiv = document.getElementById(fieldId+"Div");
	if(document.getElementById(fieldId+"Req") != null)
	{	
		targetDiv.removeChild(document.getElementById(fieldId+"Req"));
	}
}
 