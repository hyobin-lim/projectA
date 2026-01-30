
/**
 * form check
 * ?????? url ?????? ???
 * if(!validadteForm('form??????') return;
 *
 * */
function validateForm(form) {
	var ret  = true;
	$("#"+form).find("input, select, textarea, radio").each(function(i){
		var required = $(this).prop("required"); //true false
		var minLength = $(this).prop("minLength"); // undefined:-1
		var maxLength = $(this).prop("maxLength"); //
		var val = $.trim($(this).val()); //value
		var title=$(this).prop("title"); //title
		var type = $(this).attr("type"); // type
		var id   = $(this).prop("id");
		var nm   = $(this).prop("name");
		if(type != "hidden"){
			if(required){
				if(val == ""){
					alert(title + "(???)??? ???????????????????????????.");
					$(this).focus();
					ret = false;
					return false;
				}
			}
			if(minLength>0){ //ie X
				if(val.length<minLength){
					alert(title+"???(???) "+minLength+"??? ?????? ???????????? ?????????.");
					$(this).focus();
					ret = false;
					return false;
				}
			}
			if(maxLength>0){
				if(val.length>maxLength){
					alert(title+"???(???) "+maxLength+"??? ?????? ???????????? ????????????.");
					$(this).focus();
					ret = false;
					return false;
				}
			}
			if(type == "radio"){
				if(required){
					if(!$('input:radio[name='+nm+']').is(":checked")){
						alert(title + "(???)??? ???????????????????????????.");
						$(this).focus();
						ret = false;
						return false;
					}
				}
			}
			if(type == "checkbox"){
				if(required){
					if(!$('input:checkbox[name='+nm+']').is(":checked")){
						alert(title + "(???)??? ???????????????????????????.");
						$(this).focus();
						ret = false;
						return false;
					}
				}
			}
		}
	});
	if(ret) return true;
	else return false;
}

//?????? default setting
//input text - > id.datepicker({});
$.datepicker.setDefaults({
	dateFormat:'yy.mm.dd',
	showOn: 'button',
	buttonImage: '/images/ncmhp/cms/btn_calen.png',
	buttonImageOnly: true,
	showMonthAfterYear: true,
	showOtherMonths: true,
	selectOtherMonths: true,
	changeMonth: true,
	changeYear: true,
	showButtonPanel: true,
	dayNamesMin: [ "???", "???", "???", "???", "???", "???", "???" ],
	//buttonText:"??????",
	monthNamesShort:[ "1???", "2???", "3???", "4???", "5???", "6???", "7???", "8???", "9???", "10???", "11???", "12???" ],
	currentText:"??????",
	closeText:"??????",
});

//?????? ?????? ????????? validate
$(document).on('change' , '.hasDatepicker' , function(){
	var checkVal = $(this).val();
	if(checkVal == "" || typeof checkVal == "undefined"){
		return;
	}
	if(isDate(checkVal, '')){//????????? ?????? ????????? yy.mm.dd ????????????
		if(checkVal.length ==8){
			$(this).val(dateFormat(checkVal,"."));
		}
	}else{//?????? ??????????????? ''
		$(this).val("");
		$(this).focus();
	}
	if(checkVal.indexOf("-") != -1){
		if(checkVal.length == 10){
			checkVal = checkVal.replace(/-/gi , "");
			$(this).val(dateFormat(checkVal,"."));
		}
	}
});

function leadingZeros(n, digits) {
	var zero = '';
	n = n.toString();
	if(n.length < digits) {
		for(var i=0;i<digits - n.length;i++){
			zero += '0';
		}
	}
	return zero + n;
}

function getToday(){
	var today = new Date();
	var yyyy  = today.getFullYear();
	var mm	  = today.getMonth()+1;
	var dd	  = today.getDate();

	if(dd<10) {
		dd = '0' + dd;
	}

	if(mm<10) {
		mm = '0' + mm;
	}

	return yyyy+''+mm+''+dd;
}

function getTodayHms(){
	var ymdHms = new Date();
	var s =
		leadingZeros(ymdHms.getFullYear(),4) + "." +
		leadingZeros(ymdHms.getMonth()+1,2) + "." +
		leadingZeros(ymdHms.getDate(),2) + " " +
		leadingZeros(ymdHms.getHours(),2) + ":" +
		leadingZeros(ymdHms.getMinutes(),2) + ":" +
		leadingZeros(ymdHms.getSeconds(),2);

	return s;s
}

function getfirstDate(){
	var toDay = getToday();
	firstDay  = toDay.substring(0,6) + "01";
	return firstDay;
}

function dateFormat(date,char){
	var rtn = "";
	if(date.length ==8){
		rtn = date.substring(0,4) + char + date.substring(4,6) + char + date.substring(6,8);
	}

	return rtn;
}

/*
 * ???????????? ????????????
 */

// ???????????? isNumber('123','')
function isNumber(control, msg) {

	var val = control;
	var Num = "1234567890";
	for (i=0; i<val.length; i++) {
		if(Num.indexOf(val.substring(i,i+1))<0) {
			alert(msg+' ????????? ?????????????????????.');
			return false;
		}
	}
	return true;
}

// ???????????? isDate('20191010','');
function isDate(control, msg) {

	// '/'??? '-' ????????? ??????
	var val = getRemoveFormat(control);

	// ??????, length ??????
	if (isNumber(val, msg) && val.length == 8) {
		var year = val.substring(0,4);
		var month = val.substring(4,6);
		var day = val.substring(6,8);

		// ???????????? ??????
		if(checkDate(year,month,day,msg)){
			return true;
		} else {
			return false;
		}
	} else {
		alert(msg + " ???????????? ?????? ???,???,???(YYYYMMDD)?????????. ?????? ????????? ?????????!");
		return false;
	}
}

// ????????? ?????? (/ - , )
function getRemoveFormat(val) {
	if(val.length == 10) {
		var arrDate = new Array(3);
		arrDate = val.split("/");
		if(arrDate.length != 3) {
			arrDate = val.split("-");
		}
		if(arrDate.length != 3) {
			arrDate = val.split(".");
		}
		return arrDate[0] + arrDate[1] + arrDate[2];
	} else {
		return val;
	}
}

// ???????????? ??????
function checkDate(varCk1, varCk2, varCk3, msg) {
	if (varCk1>="0001" && varCk1<="9999" && varCk2>="01" && varCk2<="12") {
		febDays = "29";
		if ((parseInt(varCk1,10) % 4) == 0) {
			if ((parseInt(varCk1,10) % 100) == 0 && (parseInt(varCk1,10) % 400) != 0){
				febDays = "28";
			}
		}else{
			febDays = "28";
		}
		if (varCk2=="01" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="02" && varCk3>="01" && varCk3<=febDays) return true;
		if (varCk2=="03" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="04" && varCk3>="01" && varCk3<="30") return true;
		if (varCk2=="05" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="06" && varCk3>="01" && varCk3<="30") return true;
		if (varCk2=="07" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="08" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="09" && varCk3>="01" && varCk3<="30") return true;
		if (varCk2=="10" && varCk3>="01" && varCk3<="31") return true;
		if (varCk2=="11" && varCk3>="01" && varCk3<="30") return true;
		if (varCk2=="12" && varCk3>="01" && varCk3<="31") return true;
	}
	alert(msg + " ???????????? ?????? ???,???,???(YYYY.MM.DD)?????????. ?????? ????????? ?????????!");
	return false;
}

//3?????? ??????
function commaNum(num) {
	var len , point, str;
	num = num + "";
	point = num.length %3 ;
	len = num.length;

	str = num.substring(0,point);
	while(point<len) {
		if(str != "") str += ",";
		str += num.substring(point,point+3);
		point +=3;
	}
	return str;
}

/***********************************************************************************
 * ???????????? tag
 * codeId = (tc_cmmn_detail_code - codeid)
 * useAt  = ???????????? Y or N or ''
 * htmlId = jsp?????? append ?????? prepend ??? ?????? id
 * selId  = select id=''
 * selVal = selected ???
 * textType = codeNm or codeDc
 * append = Y or (N or '') append or prepend
 * disabled = Y or N
 * sort = code , codeNm , ''
 * ex) getCommCdSelectTag ( 'GENDER' , 'Y' , 'selId' , 'gender' , '${result.gender}' , 'codeDc' , 'append' ,'Y', '');
***********************************************************************************/
function getCommCdSelectListTag( codeId , useAt , htmlId ,selId , selVal, textType , append , disabled, sort){
	var rtnTag = "<select title='??????????????????' id='"+selId+"' name='"+selId+"'";
	if(disabled == 'Y'){
		rtnTag += " disabled='disabled'";
	}
	rtnTag += ">";
	var txtVal = "";
	$.ajax({
		type : "POST",
		url : "/common/commCd/getCodeDetailListAjax.do",
		data : { codeId : codeId , useAt : useAt , sort : sort} ,
		dataType : 'json',
		success : function(returnData, status) {
			rtnTag += "<option value=''>??????</option>";

			$.each(returnData['commCdList'], function(i) {
				txtVal = returnData['commCdList'][i].codeNm;
				if(textType == "codeDc") txtVal = returnData['commCdList'][i].codeDc;

				if(returnData['commCdList'][i].code == selVal)
					rtnTag += "<option selected value='"+returnData['commCdList'][i].code+"'>"+txtVal +"</option>";
				else
					rtnTag += "<option value='"+returnData['commCdList'][i].code+"'>"+txtVal +"</option>";

			});
			rtnTag += "</select>";
			$("#"+htmlId).find(selId).remove();
			if(append == 'Y')
				$("#"+htmlId).append(rtnTag);
			else
				$("#"+htmlId).prepend(rtnTag);
		}
	});
}

function getCommCdSelectOptTag( codeId , useAt , htmlId ,selVal, textType , append,firstNm,sort){
	var rtnTag = "";
	var txtVal = "";
	$.ajax({
		type : "POST",
		url : "/common/commCd/getCodeDetailListAjax.do",
		data : { codeId : codeId , useAt : useAt ,sort : sort} ,
		dataType : 'json',
		success : function(returnData, status) {
			if(firstNm != "" && typeof firstNm !="undefined"){
				rtnTag += "<option value=''>"+firstNm+"</option>";
			}else{
				rtnTag += "<option value=''>---??????---</option>";
			}

			$.each(returnData['commCdList'], function(i) {
				txtVal = returnData['commCdList'][i].codeNm;
				if(textType == "codeDc") txtVal = returnData['commCdList'][i].codeDc;

				if(returnData['commCdList'][i].code == selVal)
					rtnTag += "<option selected value='"+returnData['commCdList'][i].code+"'>"+txtVal +"</option>";
				else
					rtnTag += "<option value='"+returnData['commCdList'][i].code+"'>"+txtVal +"</option>";

			});
			$("#"+htmlId).empty();
			if(append == 'Y')
				$("#"+htmlId).append(rtnTag);
			else
				$("#"+htmlId).prepend(rtnTag);
		}
	});
}

function getCommCdRadioTag( codeId , useAt , htmlId ,selId , selVal, textType , append , disabled , sort){
	var rtnTag = "<select id='"+selId+"' name='"+selId+"'";
	if(disabled == 'Y'){
		rtnTag += " disabled='disabled'";
	}
	rtnTag += ">";
	var txtVal = "";
	$.ajax({
		type : "POST",
		url : "/common/commCd/getCodeDetailListAjax.do",
		data : { codeId : codeId , useAt : useAt , sort: sort} ,
		dataType : 'json',
		success : function(returnData, status) {
			rtnTag += "<option value=''>---??????---</option>";

			$.each(returnData['commCdList'], function(i) {
				txtVal = returnData['commCdList'][i].codeNm;
				if(textType == "codeDc") txtVal = returnData['commCdList'][i].codeDc;

				if(returnData['commCdList'][i].code == selVal)
					rtnTag += "<option selected value='"+returnData['commCdList'][i].code+"'>"+txtVal +"</option>";
				else
					rtnTag += "<option value='"+returnData['commCdList'][i].code+"'>"+txtVal +"</option>";

			});
			rtnTag += "</select>";
			$("#"+htmlId).find(selId).remove();
			if(append == 'Y')
				$("#"+htmlId).append(rtnTag);
			else
				$("#"+htmlId).prepend(rtnTag);
		}
	});
}

//????????????????????????
function getCateSelectListTag( cateId , htmlId ,selId , selVal, append , disabled){
	var rtnTag = "<select id='"+selId+"' name='"+selId+"'";
	if(disabled == 'Y'){
		rtnTag += " disabled='disabled'";
	}
	rtnTag += ">";
	var txtVal = "";
	$.ajax({
		type : "POST",
		url : "/common/category/getCategoryList.do",
		data : { categoryId : cateId } ,
		dataType : 'json',
		success : function(returnData, status) {
			rtnTag += "<option value=''>---??????---</option>";

			$.each(returnData['commCdList'], function(i) {
				txtVal = returnData['commCdList'][i].categoryNm;

				if(returnData['commCdList'][i].category == selVal)
					rtnTag += "<option selected value='"+returnData['commCdList'][i].category+"'>"+txtVal +"</option>";
				else
					rtnTag += "<option value='"+returnData['commCdList'][i].category+"'>"+txtVal +"</option>";

			});
			rtnTag += "</select>";
			$("#"+htmlId).find(selId).remove();
			if(append == 'Y')
				$("#"+htmlId).append(rtnTag);
			else
				$("#"+htmlId).prepend(rtnTag);
		}
	});
}

//????????? ??????
//ex) ????????????????????????
// if(isMobile.any()){ // ??????????????? true
// if(isMobile.Android()) { // ?????????????????? true ...
var isMobile = {
	Android: function(){
		return navigator.userAgent.match(/Android/i) ==null ? false :true;
	},
	BlackBerry: function(){
		return navigator.userAgent.match(/BlackBerry/i) ==null ? false :true;
	},
	IOS: function(){
		return navigator.userAgent.match(/iPhone|iPad|iPod/i) ==null ? false :true;
	},
	Opera: function(){
		return navigator.userAgent.match(/Opera Mini/i) ==null ? false :true;
	},
	Windows: function(){
		return navigator.userAgent.match(/IEMobile/i) ==null ? false :true;
	},
	any: function(){
		return (isMobile.Android() || isMobile.BlackBerry() || isMobile.IOS() || isMobile.Opera() || isMobile.Windows() );
	},
};

//byte size
function bytesToSize(bytes) {
	var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	if(bytes == 0 ) return '0';
	var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
	return Math.round(bytes / Math.pow(1024,i),2) + ' ' + sizes[i];
}

function bytesToMb(bytes) {
	if(bytes == 0 ) return '0';
	return Math.round(bytes / Math.pow(1024,2),2) + '';
}

fn_downFile = function(atchFileId, fileSn){
	//window.open("<c:url value='/cmm/fms/FileDown.do?atchFileId="+atchFileId+"&fileSn="+fileSn+"'/>");
	var newForm = document.createElement( 'form' );
	var fSn = document.createElement( 'input' );
	var atchF = document.createElement( 'input' );

	document.body.appendChild(newForm);

	fSn.setAttribute("name","fileSn");
	atchF.setAttribute("name","atchFileId");

	fSn.setAttribute("type","hidden");
	atchF.setAttribute("type","hidden");

	fSn.setAttribute("value",fileSn);
	atchF.setAttribute("value",atchFileId);

	newForm.appendChild( fSn );
	newForm.appendChild( atchF );

	newForm.method = "post";
	newForm.action = '/cmm/fms/FileDown.do';//"<c:url value='/cmm/fms/FileDown.do'/>";
	newForm.target = '_blank';//"if_fn_egov_downFile"
	newForm.submit();
}
