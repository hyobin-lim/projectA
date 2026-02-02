
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

/**
 * 페이지 로드 시 실행될 jQuery 스크립트.
 * index.html의 <head> 태그에 인라인으로 있던 JavaScript 로직을 이관합니다.
 * 이 로직은 주로 페이지 초기화, 로그인/메뉴 이동 관련 함수 정의, 팝업 관련 처리를 담당합니다.
 */
$(document).ready(function () {
  // 회원 서비스 사용 여부 확인 및 페이지 이동 함수
  // '국가정신건강서비스포털 고도화('22)' 프로젝트에서 회원 서비스 중지 요구사항에 따라 재정의된 함수로 보입니다.
  moveCheckLoginMenu = function (url) {
    moveMenu(url); // 로그인 확인 없이 바로 moveMenu 함수를 호출합니다.
  };

  /**
   * 페이지 이동 함수
   * @param {string} url - 이동할 페이지의 URL
   * @param {string} id - 메뉴 ID (메뉴 클릭 수 집계를 위해 사용)
   */
  moveMenu = function (url, id) {
    // 메뉴 ID가 있으면, AJAX를 통해 메뉴 클릭 수를 서버에 전송합니다.
    if (typeof id != "undefined" && id != null && id != "") {
      $.ajax({
        type: "POST",
        url: "https://www.mentalhealth.go.kr/portal/menu/menuHit.do",
        data: {
          menuNo: id,
        },
        async: false, // 동기 방식으로 실행하여, 이 요청이 끝날 때까지 다음 코드가 실행되지 않습니다.
        dataType: "json",
        success: function (returnData, status) {
          // 성공 시 별도 처리 없음
        },
      });
    }

    // 새로운 링크 처리 로직 적용
    if (url) {
        const mentalHealthDomain = 'www.mentalhealth.go.kr';
        const isMentalHealthInternalPath = url.startsWith('https://' + mentalHealthDomain) || url.startsWith('http://' + mentalHealthDomain) || url.startsWith('/portal/');
        const isExternalDomain = url.startsWith('http://') || url.startsWith('https://');

        if (isMentalHealthInternalPath) {
            alert("이 기능은 포트폴리오 버전에서 지원되지 않습니다.");
        } else if (isExternalDomain) {
            try {
                const targetHostname = new URL(url).hostname;
                // mentalhealth.go.kr 도메인이라면 미구현으로 처리 (수정된 로직)
                if (targetHostname.includes(mentalHealthDomain)) {
                     alert("이 기능은 포트폴리오 버전에서 지원되지 않습니다.");
                } else { // mentalhealth.go.kr이 아닌 완전히 외부 도메인
                    if (confirm("이 링크는 외부 사이트(" + url + ")로 연결됩니다. 계속하시겠습니까?")) {
                        window.open(url, '_blank');
                    }
                }
            } catch (e) {
                // URL 파싱 오류 발생 시 (예: 유효하지 않은 URL), 미구현으로 처리
                console.error("URL 파싱 오류:", e);
                 alert("이 기능은 포트폴리오 버전에서 지원되지 않습니다.");
            }
        } else {
            // 기타 URL (예: #앵커, 상대 경로 등), 기본 동작 유지
            window.location.href = url;
        }
    }
  };

  /**
   * 로그아웃 함수
   */
  logout = function () {
    if (confirm("로그아웃 하시겠습니까?")) {
      window.location.href = "https://www.mentalhealth.go.kr/portal/login/actionLogout.do";
    }
  };

  // 임시 비밀번호 또는 비밀번호 유효기간 만료 여부 확인 및 팝업 처리
  var indvdlTmprPasswordAtVal = "null";
  var passwordValidDeVal = "null";
  // 임시 비밀번호로 로그인한 경우, 비밀번호 변경 팝업을 표시합니다.
  if (indvdlTmprPasswordAtVal == "Y") {
    var modal = document.getElementById("passwordChange");
    modal.style.display = "block";
    return;
  }
  // 비밀번호 유효기간이 만료된 경우, 비밀번호 변경 안내 팝업을 표시합니다.
  else if (passwordValidDeVal == "Y") {
    var modal2 = document.getElementById("passwordChange2");
    modal2.style.display = "block";
    return;
  }

  /*
    주석 처리된 세션 체크 관련 코드
    - 주기적으로(300초마다) 사용자의 세션이 유효한지 서버에 확인하는 기능으로 추정됩니다.
    - 세션이 만료되면 'sessInvalidModal' 함수를 호출하여 세션 만료 팝업을 띄웁니다.
  */

  // 세션 만료 팝업을 표시하는 함수
  sessInvalidModal = function () {
    var modal = document.getElementById("sessInvalid");
    modal.style.display = "block";
  };

  // 세션 만료 팝업을 닫고 메인 페이지로 이동하는 함수
  closeSessPop = function () {
    var modal = document.getElementById("sessInvalid");
    modal.style.display = "none";
    location.href = "https://www.mentalhealth.go.kr/portal/main/index.do";
  };

  // 상단 검색창에서 Enter 키를 눌렀을 때 검색을 실행하는 이벤트 핸들러
  $("#searchDataTop").keypress(function (e) {
    if (e.keyCode == 13) {
      // Enter 키의 keyCode는 13입니다.
                  fnSearchBtnTop();
              }
          });
          
          // New comprehensive link handling logic
          $(document).on('click', 'a', function(e) {
              const href = $(this).attr('href');
              if (!href) {
                  return; // href 속성이 없으면 아무것도 하지 않음
              }

              const mentalHealthDomain = 'www.mentalhealth.go.kr';
              const currentHostname = window.location.hostname;

              const isMentalHealthInternalOrPortal = (href.startsWith('https://' + mentalHealthDomain) || href.startsWith('http://' + mentalHealthDomain) || href.startsWith('/portal/')) && !href.startsWith('javascript:void(0)');
              const isJavascriptVoid = href === 'javascript:void(0)';

              let isTrulyExternalDomain = false;
              if (href.startsWith('http://') || href.startsWith('https://')) {
                  try {
                      const targetUrl = new URL(href);
                      if (!targetUrl.hostname.includes(mentalHealthDomain) && targetUrl.hostname !== currentHostname) {
                          isTrulyExternalDomain = true;
                      }
                  } catch (err) {
                      console.error("URL 파싱 오류 (a tag click):", err);
                      // 파싱 오류 발생 시 미구현으로 처리
                      alert("이 기능은 포트폴리오 버전에서 지원되지 않습니다.");
                      e.preventDefault();
                      return;
                  }
              }

              if (isJavascriptVoid || isMentalHealthInternalOrPortal) {
                  e.preventDefault();
                  alert("이 기능은 포트폴리오 버전에서 지원되지 않습니다.");
              } else if (isTrulyExternalDomain) {
                  e.preventDefault();
                  if (confirm("이 링크는 외부 사이트(" + href + ")로 연결됩니다. 계속하시겠습니까?")) {
                      window.open(href, '_blank');
                  }
              }
              // 그 외 링크 (예: #앵커, 현재 포트폴리오 도메인 내의 유효한 상대 경로 등)는 기본 동작 허용
          });

}); 
// 로딩 팝업을 표시하는 함수
function loadingPop() {
  var pop = document.getElementById("lodingPop");
  pop.style.display = "block";
}
//2022-12 국가정신건강서비스포털 고도화('22) 회원 서비스 중지

// '내 콘텐츠' (스크랩) 팝업을 닫는 함수
function myCtntPopClose() {
  var modal = document.getElementById("myCtntDiv");
  modal.style.display = "none";
  $(".scrap")[0].focus(); /* 웹접근성 webaccess_pub   */
}

// '내 콘텐츠' (스크랩)를 저장하는 함수
function myCtntSave() {
  var sendctntSj = $("#ctntSj").val(); // 페이지명 입력값 가져오기
  // 페이지명이 비어있는지 확인
  if (sendctntSj == null || sendctntSj.trim() == "") {
    alert("페이지명을 입력해 주세요.");
    return;
  }

  // 동적으로 form을 생성하여 서버에 데이터를 전송합니다.
  var myctntForm = $("<form></form>");
  myctntForm.attr("name", "myctntForm");
  myctntForm.attr("id", "myctntForm");
  myctntForm.attr("method", "post");
  myctntForm.append($("<input/>", { type: "hidden", name: "ctntSj", value: $("#ctntSj").val() })); // 페이지명
  myctntForm.append($("<input/>", { type: "hidden", name: "ctntUrl", value: $("#myctntUrl").text() })); // 페이지 URL
  myctntForm.appendTo("body");

  // FormData 객체를 사용하여 AJAX로 폼 데이터 전송
  var formData = new FormData($("#myctntForm")[0]);
  $.ajax({
    type: "POST",
    url: "https://www.mentalhealth.go.kr/portal/myctnt/executeMyCtnt.do",
    data: formData,
    dataType: "json",
    processData: false, // FormData 사용 시 필수 설정
    contentType: false, // FormData 사용 시 필수 설정
    success: function (returnData, status) {
      if (confirm(returnData.message)) {
        // 서버에서 받은 메시지를 confirm 창으로 보여줌
        if (returnData.result) {
          // 저장이 성공하면
          var modal = document.getElementById("myCtntDiv");
          modal.style.display = "none"; // 팝업 닫기
          location.href = "https://www.mentalhealth.go.kr/portal/mypage/myctnt/myctntList.do"; // '내 콘텐츠 목록' 페이지로 이동
        }
      } else {
        var modal = document.getElementById("myCtntDiv");
        modal.style.display = "none"; // 팝업 닫기
        $(".scrap")[0].focus(); /* 웹 접근성을 위해 포커스 이동 */
      }
    },
    error: function (request, status, error) {
      alert("입력오류가 발생하였습니다.");
    },
  });
}
////////////////////////////////////////////////////////

// 비밀번호 변경 팝업(임시 비밀번호)을 닫는 함수
function closePop1() {
  var modal1 = document.getElementById("passwordChange");
  modal1.style.display = "none";
}

// 비밀번호 변경 팝업(유효기간 만료)을 닫는 함수
function closePop2() {
  var modal2 = document.getElementById("passwordChange2");
  modal2.style.display = "none";
}

// 비밀번호 변경 페이지로 이동하는 함수
function goPassCg() {
  window.location.href = "https://www.mentalhealth.go.kr/portal/mypage/member/selectPassword.do";
}

// '다음에 변경하기' 선택 시 호출되는 함수
function goPassNext() {
  window.location.href = "https://www.mentalhealth.go.kr/portal/mypage/member/nextPassword.do";
}

// 상단 검색창에서 검색을 실행하는 함수
function fnSearchBtnTop() {
  alert("검색 기능은 포트폴리오 버전에서 지원되지 않습니다.");
  // var data = $("#searchDataTop").val();
  // var url = "https://www.mentalhealth.go.kr/search/front/Search.jsp?qt=" + encodeURI(data); // 검색어를 UTF-8로 인코딩하여 URL 생성
  // window.open(url); // 새 창에서 검색 결과 페이지를 엽니다.
}

// 디지털원패스 회원가입 팝업을 여는 함수
function onePassRegistPop() {
  var popUrl = "https://www.onepass.go.kr/regist/agree?redirectSiteSeq=950";
  var popOption = "width=700, height=800, resizable=no, scrollbars=yes, status=no, title=디지털원패스 회원가입, top=100, left=100, location=no";
  window.name = "hcmhp";
  var popupWindow = window.open(popUrl, "디지털원패스 회원가입", popOption);
  popupWindow.focus();
}

// 디지털원패스 로그인 팝업을 여는 함수
function onePassLoginPop() {
  var popUrl = "https://www.mentalhealth.go.kr/portal/digitalOnepass/loginout.do?serviceType=LOGIN";
  var popOption = "width=700, height=700, resizable=no, scrollbars=yes, status=no, title=디지털원패스 로그인, top=100, left=100, location=no";
  window.name = "hcmhp";
  var popupWindow = window.open(popUrl, "디지털원패스 로그인", popOption);
  popupWindow.focus();
}

// 인증 인터셉터에서 로그인 여부를 체크하여 원패스 로그인 창을 유도하는 함수
// (2022-12 고도화 프로젝트에서 회원 서비스 중지로 인해 항상 true를 반환하도록 수정됨)
function fnAuthOnePassLoginPop() {
  return true;
}

