/* Source: common.js */
﻿
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
              // Exclude specific elements from the global alert
              const $this = $(this);
              if ($this.is('footer .ft-family > a') || $this.is('.all_menu > a') || $this.is('.top_area h1 a')) {
                  return; // Allow default behavior or other specific handlers for these elements
              }

              const href = $this.attr('href');
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

    // Add search button SVG animation on click
    $('#searchBtn').on('click', function(e) {
        e.preventDefault();

        // Re-added SMIL trigger
        document.getElementById('searchAnim1').beginElement();

        // Keep the delayed alert, which was the key fix
        setTimeout(() => {
            var searchKeyword = $("#searchData").val();
            if (searchKeyword.trim() !== "") {
                alert("'" + searchKeyword + "' 에 대한 검색 기능은 현재 포트폴리오에서 구현되지 않았습니다.");
            } else {
                alert("검색어를 입력해주세요.");
            }
        }, 350); // Delay matches animation duration (0.3s + buffer)
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



/* Source: portal_contents.js */
/* ?????? height 100% */
function heiEvt(){
	var $con = $("#container");
	var $conDiv = $("#container > div");
	var $footer = $("footer");

	if ($(window).width() > 960){
		var $footHei = 	$footer.height() + 1;
		//$con.css({"margin-bottom": "-" + $footHei + "px"})
		//$conDiv.css({"padding-bottom": $footHei + 70 + "px"})
	}else{
		var $footHei = 	$footer.height();
		//$con.css({"margin-bottom": "-" + $footHei + "px"})
		//$conDiv.css({"padding-bottom": $footHei + 30 + "px"})
	}
}

/* GNB Sticky Refactored */
function gnbMovEvt() {
    var $top_sticky = $(".gnb_area");
    var $path_top = $(".path_top");
    var $btn_home = $(".btn_home");
    var $path_h1 = $(".path_lnb h1");
    var $quick = $(".quick");
    var $top_area = $(".top_area");

    // Define the function to be executed on scroll and resize
    var scrollAndResizeAction = function() {
        var isDesktop = $(window).width() > 960;
        var isScrolled = $(window).scrollTop() > 93;

        if (isDesktop) {
            if (isScrolled) {
                $top_sticky.addClass("move");
                $path_top.addClass("move");
                $path_h1.addClass("move");
                $quick.addClass("move");
                $top_area.addClass("move");
                $btn_home.addClass("on");
            } else {
                $top_sticky.removeClass("move");
                $path_top.removeClass("move");
                $path_h1.removeClass("move");
                $quick.removeClass("move");
                $top_area.removeClass("move");
                $btn_home.removeClass("on");
            }
        } else {
            // For mobile, ensure classes are always removed
            $top_sticky.removeClass("move");
            $path_top.removeClass("move");
            $path_h1.removeClass("move");
            $quick.removeClass("move");
            $top_area.removeClass("move");
            $btn_home.removeClass("on");
        }
    };

    // Unbind any previous handlers to prevent duplicates
    $(window).off('scroll.gnb resize.gnb');
    
    // Bind the single handler to both scroll and resize events
    $(window).on('scroll.gnb resize.gnb', scrollAndResizeAction);

    // Run it once on load to set the initial state
    scrollAndResizeAction();
}


/* Mobile & PC GNB */
$(document).ready(function() {


	AOS.init({
		duration: 800,
	});

	var $gnb_nav = $(".gnb_nav");

	/* PC GNB */
	function gnbHoverEvent() {

		$gnb_nav.removeClass("m_nav").addClass("gnb_pc");
		$(function(){
			$gnb_pc = $(".gnb_pc #gnb"),
				$menu = $(".gnb_pc .th1"),
				$subList = $(".gnb_pc .th2"),

				/* reset */
				$gnb_pc.parent(".gnb_pc").removeClass("on");
			$(".gnb_pc .th1").off("click");
			$(".gnb_pc .th1 > a").off("click");
			$(".gnb_pc .th2>li>a").off("click");

			$(".gnb_pc").animate({"left":"0"}, 0);
			$(".gnb_pc #gnb").animate({"left":"0px"}, 0);
			$(".gnb_pc .th2").addClass("reset");
			$(".gnb_pc .th2").removeClass("on");
			$(".gnb_pc .th3").addClass("reset");
			/**/

			$gnb_pc.bind("mouseenter focusin", function() {
				//$(this).addClass("on").siblings().removeClass("on");			
				$subList.addClass("on");
				$gnb_pc.parent(".gnb_pc").addClass("on");
			});
			$gnb_pc.bind("mouseleave focusout", function() {
				//$(this).removeClass("on");				
				$subList.removeClass("on");
				$gnb_pc.parent(".gnb_pc").removeClass("on");
			});
		});
	}

	/* Mobile Menu */
	function gnbClickEvent() {
		$gnb_nav.removeClass("gnb_pc").addClass("m_nav");
		var $backdrop = $(".backdrop");

		/* reset */
		$(".m_nav").css({"left":"-1000px"});
		$(".m_nav #gnb").css({"left":"-1000px"});
		$(".backdrop").removeClass("in");

		/* ????????? ?????? */
		$(function(){
			$(".m_nav_btn").click(function(){
				$(".m_nav").animate({"left":"0px"}, 300);
				$(".m_nav #gnb").animate({"left":"0px"}, 300);
				$(".backdrop").addClass("in");
				$(".close").addClass("in");
				return false;
			});

			$(".close").on('click', function(e) {
				e.preventDefault();
				$(".m_nav").animate({"left":"-1000px"}, 300);
				$(".m_nav #gnb").animate({"left":"-1000px"}, 300);
				$(".backdrop").removeClass("in");
				$(".close").removeClass("in");
			});

			$backdrop.on('click', function() {
				$(".m_nav").animate({"left":"-1000px"}, 300);
				$(".m_nav #gnb").animate({"left":"-1000px"}, 300);
				$(".backdrop").removeClass("in");
				$(".close").removeClass("in");
			});
		});

		/* ????????? ???????????? */
		$(function(){
			$th1Group = $(".m_nav .th1"),
				$th1 = $(".m_nav .th1 > a"),
				$subList = $(".th2"),
				$th2 = $(".m_nav .th2>li>a"),
				$th3Group = $(".m_nav .th3");

			/* reset */
			$th1Group.unbind("mouseenter, focusin, mouseleave, focusout");
			$th2.unbind("mouseenter, focusin, mouseleave, focusout");
			$(".m_nav .th2").removeClass("reset");
			$th3Group.removeClass("reset");

			$th1.removeClass("active");
			$th2.removeClass("active");
			$(".m_nav .th2").slideUp();
			$th3Group.slideUp();
			/**/

			//$(".m_nav").find("#gnb > ul > li:first>a").toggleClass("active");
			//$(".m_nav").find("#gnb > ul > li:first>a").next($subList).show();			

			$th1.on('click', function(){
				$(this).toggleClass("active");
				$(this).next($subList).slideToggle();
				$(this).next($subList).removeClass("on");
				$(this).parent("li").siblings("li").children("a").removeClass("active");
				$(this).parent("li").siblings("li").find($subList).slideUp();
			});

			if ($(".m_nav .th3").length > 0 ) {
				$(".m_nav .th3").parent("li").addClass("under");
			};

			$th2.on('click', function() {
				$(this).next($th3Group).slideToggle();
				$(this).toggleClass("active");
				$(this).parent("li").siblings("li").children("a").removeClass("active");
				$(this).parent("li").siblings("li").find($th3Group).slideUp();
			});
		});
	}
	function gnbEventFunc(mql) {
		if (mql.matches) {
			gnbHoverEvent();
		} else {
			gnbClickEvent();
		}
	}
	var mql = window.matchMedia("(min-width:961px)");
	gnbEventFunc(mql);
	mql.addListener(gnbEventFunc);
});

/* ????????? Lnb */
function mLnb_Motion(){
	$btn_m_lnb = $(".btn_m_lnb");
	$lnb = $(".lnb");
	var lnbStates = true;
	$lnb.slideUp();

	if ($(window).width() < 961){
		$btn_m_lnb.on('click', function(e){
			e.preventDefault();

			if (lnbStates) {
				$lnb.slideDown();
				lnbStates = false;
			}else {
				$lnb.slideUp();
				lnbStates = true;
			}
		});

	}else{
		$lnb.css({"display":"none"});
		$lnb.slideUp();
		lnbStates = true;
	}

}

function mLnb(){
	if ( $(".lnb .lnb_th2 .lnb_th3").length > 0 ) {
		$(".lnb .lnb_th2 .lnb_th3").parent("li").addClass("up_over");
	};

	$(".lnb .lnb_th2>li.current .lnb_th3").slideDown();

	$(".lnb .lnb_th2>li>a").on("click",function(){
		$(this).parent("li").toggleClass("up");
		$(this).next(".lnb_th3").slideToggle();

	});
}

/* ????????? Top */
$(function(){
	$(".btn_top").fadeOut(300);
	$(window).scroll(function(){
		if ($(window).scrollTop() > 400){
			$(".btn_top").fadeIn(300);
		} else {
			$(".btn_top").fadeOut(300);
		};
	});
});

/* ?????? ???????????? */
function topSchArea(){
	var $btn_sch = $(".btn_sch");
	var $btn_sch_clo = $(".btn_sch_clo");
	var $sch_area = $(".sch_area");

	$btn_sch.click(function (e) {
		e.preventDefault();
		$(this).addClass("off");
		$btn_sch_clo.addClass("on");
		if ($(window).width() > 960){
			$sch_area.slideDown(500);
		}else{
			$sch_area.slideDown(0);
		}
		$(".gnb_nav").addClass("stop");
	});
	$btn_sch_clo.click(function (e) {
		e.preventDefault();
		$(this).removeClass("on");
		$btn_sch.removeClass("off");
		if ($(window).width() > 960){
			$sch_area.slideUp(500);
		}else{
			$sch_area.slideUp(0);
		}
		$(".gnb_nav").removeClass("stop");
	});

}

/* ???????????? ???????????? */
$(function(){
	var $sch_send = $(".sch_send");
	var $btn_sch_clo = $(".btn_sch_clo");

	$btn_sch_clo.focusout(function(e){
		e.preventDefault();
		$(".sch_wrap .sch_box select").focus();
	});
});

/* ???????????? */
function allMenu(){
	var $btn_all_menu = $(".all_menu > a");
	var $all_menu_area =$(".all_menu_area");
	var $btn_all_clo =$(".btn_all_clo");

	$btn_all_menu.click(function (e) {
		e.preventDefault();
		$all_menu_area.css({"display":"block"});
		$(".gnb_pc").addClass("stop");
        
        // Add class after a short delay to ensure element is visible and animation runs
        setTimeout(() => {
            $btn_all_clo.addClass('animating');
        }, 20);
	});

	$btn_all_clo.click(function(e) {
		e.preventDefault();
		$all_menu_area.css({"display":"none"});
		$btn_all_menu.focus();
        $(".gnb_pc").removeClass("stop");
        // Remove class to reset animation for next time
        $btn_all_clo.removeClass('animating');
	});
}

/* paging */
function pagingArea(){
	var $paging = $(".paging");

	if ($(window).width() < 481){
		$paging.addClass("mobile");
	}else{
		$paging.removeClass("mobile")
	}

}

/* ???????????? */
$(function(){
	$accordi = $(".accordi"),
		$accordi_li = $(".accordi  > li"),
		$accordi_tit = $(".accordi .tit > a"),
		$accordi_con = $(".accordi_con"),

		$(".accordi>li:first-child .tit>a").toggleClass("active");
	$(".accordi>li:first-child .tit>a").parent("div").next($accordi_con).show();
	$(".accordi>li:first-child .tit>a").parent("div").parent("li").toggleClass("trigger");
	/* 2020-12-10 ?????? */
	$(".accordi.faq>li:first-child .tit>a").parent("div").next($accordi_con).hide();
	$(".accordi.faq>li:first-child .tit>a").removeClass("active");

	/*$(".accordi>li:first-child .tit>a").attr("title", "?????? ??????");
	$(".accordi>li:not(:first-child) .tit>a").attr("title", "?????? ?????????");
	$(".accordi.faq>li:first-child .tit>a").attr("title", "?????? ?????????");*/
	
	$(".accordi>li:first-child .tit>a>.sr-only").text("?????? ??????");
	$(".accordi>li:not(:first-child) .tit>a>.sr-only").text("?????? ?????????");
	$(".accordi.faq>li:first-child .tit>a>.sr-only").text("?????? ?????????");
	
	$accordi_tit.on('click', function(e){
		e.preventDefault();

		$(this).toggleClass("active");
		
		if($(this).hasClass("active")){
			/*$(this).attr("title", "?????? ??????");*/
			$(this).find(".sr-only").text("?????? ??????");
		}else{
			/*$(this).attr("title", "?????? ?????????");*/
			$(this).find(".sr-only").text("?????? ?????????");
		}
		
		$(this).parent("div").next($accordi_con).slideToggle();
		$(this).parent("div").parent("li").toggleClass("trigger");
		//$(this).parent("p").parent("li").siblings("li").find(".tit > a").removeClass("active");
		//$(this).parent("p").parent("li").siblings("li").find($accordi_con).slideUp();
	});


	$(".tab_content").each(function () {
		var $open_all = $(this).find(".open_all");

		var accordiStats = true;

		$open_all.on('click', function(e){
			e.preventDefault();

			if (accordiStats) {
				$(this).addClass("on");
				$(this).next($accordi).find($accordi_tit).addClass("active");
				$(this).next($accordi).find($accordi_con).slideDown(100);
				$(this).next($accordi).children("li").addClass("trigger");
				$(this).find('span').text("?????? ?????? ?????? ??????");
				accordiStats = false;
				
				$(".accordi>li .tit>a>.sr-only").text("?????? ??????");
			}else {
				$(this).removeClass("on");
				$(this).next($accordi).find($accordi_tit).removeClass("active");
				$(this).next($accordi).find($accordi_con).slideUp(100);
				$(this).next($accordi).children("li").removeClass("trigger");
				$(this).find('span').text("?????? ?????? ?????? ?????????");
				accordiStats = true;
				
				$(".accordi>li .tit>a>.sr-only").text("?????? ?????????");
			}

		});
	});

});

/* ???????????? */
function selfMenu(){
	var $self_list = $(".self_list");
	var $self_btnOn = $(".self_list .on");
	var $self_none = $(".self_list .none");
	var $self_btnOff = $(".self_list .off");
	var $con = $(".self_list .con");

	if ($(window).width() > 767){
		$con.slideDown(0);
	}else{
		if ($self_none.length > 0) {
			$con.slideDown(0);
		}else{
			$con.slideUp(0);
		}
		$self_btnOn.click(function(e){
			e.preventDefault();
			$con.slideDown();
			$(this).addClass("none");
			$self_btnOff.addClass("view");
		});
		$self_btnOff.click(function(e){
			e.preventDefault();
			$con.slideUp();
			$(this).removeClass("view");
			$self_btnOn.removeClass("none");
		});
	}
}

/* ???????????? - ??????????????? */
function selfBtn(){
	var $self_arrow = $(".self_list > li > p");
	var $self_btn = $(".self_list .two");
	var $self_btnHei = $self_btn.height() + 32;

	$self_arrow.css({"top":$self_btnHei + "px"});
};

/* lineT ?????? */
$(function(){
	var $lineT = $(".lineT");
	var $lineT_td = $lineT.find("td");
	var $input_txt = $lineT.find("input[type=text]");
	var $input_pw = $lineT.find("input[type=password]");
	var $select = $lineT.find("select");
	var $textarea = $lineT.find("textarea");

	$lineT_td.each(function () {
		if ( $(this).find($input_txt).length > 0 ) {
			$(this).addClass("inputT");
		};
	});
	$lineT_td.each(function () {
		if ( $(this).find($input_pw).length > 0 ) {
			$(this).addClass("inputT");
		};
	});
	$lineT_td.each(function () {
		if ( $(this).find($select).length > 0 ) {
			$(this).addClass("inputT");
		};
	});
	$lineT_td.each(function () {
		if ( $(this).find($textarea).length > 0 ) {
			$(this).addClass("textareaT");
		};
	});
});


/* ???????????? - 04.28 */
function intgraSch(){
	var $open_sch = $(".open_sch");
	var $close_sch = $(".close_sch");
	var $sch_con = $(".sch_con");

	$open_sch.click(function (e) {
		e.preventDefault();
		$(this).addClass("off");
		$close_sch.addClass("on");
		$sch_con.slideDown(500);
	});
	$close_sch.click(function (e) {
		e.preventDefault();
		$(this).removeClass("on");
		$open_sch.removeClass("off");
		$sch_con.slideUp(500);
	});
}

$(function(){
	var $sch_date = $(".sch_date");
	var $sch_period = $(".sch_period");
	var schAllStats = true;

	$sch_date.click(function(e){
		e.preventDefault();

		if (schAllStats) {
			$sch_period.addClass("on");
			$(this).addClass("on");
			schAllStats = false;
		}else {
			$sch_period.removeClass("on");
			$(this).removeClass("on");
			schAllStats = true;
		}
	});

	/*$("a:last", ".sch_period").blur(function () {
		$sch_period.slideUp();
		$sch_date.removeClass("on");
		schAllStats = true;	
	});*/
});

/* tab - 04.28 */
$(function () {
	$(".tab_content").addClass("off");
	$(".tab_content:first").removeClass("off").addClass("on");

	$(".tab_tit").click(function (e) {
		e.preventDefault();

		$(".tab_tit").removeClass("active");
		$(this).addClass("active");
		$(".tab_content").removeClass("on").addClass("off");
		var activeTab = $(this).find("h3").attr("class");
		$("#" + activeTab).addClass("on").removeClass("off");
		
		/*???????????? ?????? ?????? ??????, 2025-06-30*/
		$(".sr-only").text("");
		$(this).find(".sr-only").text("?????????");
	});
});


/* ????????? ?????? */
$(function () {
	var $all_open = $(".all_open > a");
	var $part_two = $(".part_two");
	var $tab_order = $(".disease_part > ul:nth-of-type(1) > li:first-child > a");
	var diseaseStates = true;

	$all_open.on('click', function(e){
		e.preventDefault();

		if (diseaseStates) {
			$(this).addClass("on");
			$(this).text("???????????? ??????");
			$part_two.slideDown();
			$tab_order.focus();

			diseaseStates = false;
		}else {
			$(this).removeClass("on");
			$part_two.slideUp();
			$(this).text("???????????? ??????");
			diseaseStates = true;
		}

	});
});


/* ???????????????*/
$(function () {
	$(".case_tit").next("p").addClass("case_img2");
	$(".case_txt").next("p").addClass("case_img2");
});

/* ??????????????? - ?????? ????????? height */
$(document).ready(function(){
	resizeHeight();

	$(window).resize(function(){
		resizeHeight();
	});
})
function resizeHeight(){
	$height = $(".case_img > p:nth-of-type(2)").height();
	$(".case_img").height($height);
}

/* ??????????????? - &nbsp; ?????? */
$(function(){
	$(".case_img_txt > p").html(function(i,html){
		return html.replace(/&nbsp;/g,'');
	})
})

/* ??????  
function modalPop(){
	var $modal = $(".modal-content");	
	var $win = $(window).width();	
	var $modal_Wid = $win / 2;	
	var $modal_mar = $modal_Wid / 2;

	$modal.css({"margin-left":"-" + $modal_mar + "px"});
	
	console.log($modal_Wid);
};
*/

$(window).on('load', function(){
	showPopup();
	gnbMovEvt();
	allMenu();
	topSchArea();
	heiEvt();
	mLnb_Motion();
	mLnb();
	selfMenu();
	selfBtn();
	intgraSch();
	pagingArea();
	//modalPop();

});

$(window).resize(function(){
	// gnbMovEvt is now handled by the function itself
	allMenu();
	topSchArea();
	heiEvt();
	mLnb_Motion();
	selfMenu();
	selfBtn();
	pagingArea();
	//modalPop();
});






/* === */

/* Source: main.js */
$(document).ready(function () {
  var mainSwiper = new Swiper(".main_visual .swiper-container", {
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 500,
    loop: true,
    pagination: {
      el: ".main_visual .swiper-pagination",
      type: "custom",
      renderCustom: function (swiper, current, total) {
        return "<span>0" + current + "</span>" + '<span class="line">ㅡ</span>' + '<span class="swiper-pagination-total">0' + total + "</span>";
      },
    },
    navigation: {
      nextEl: ".main_visual .swiper-button-next",
      prevEl: ".main_visual .swiper-button-prev",
    },
    on: {
      slideChange: function () {
        if (this.slides[this.activeIndex]) {
            this.slides[this.activeIndex].focus();
        }
      },
    },
    a11y: {
      enabled: true,
    },
  });

  var puaseButton = document.getElementById("puase");
  if(puaseButton) {
    puaseButton.addEventListener("click", (event) => {
      mainSwiper.autoplay.stop();
      puaseButton.style.display = "none";
      playButton.style.display = "flex";
    });
  }

  var playButton = document.getElementById("play");
  if(playButton) {
    playButton.addEventListener("click", (event) => {
      mainSwiper.autoplay.start();
      playButton.style.display = "none";
      puaseButton.style.display = "flex";
    });
  }

  var newsSwiper = new Swiper(".news_slider .swiper-container", {
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    speed: 500,
    loop: true,
    navigation: {
      nextEl: ".news_slider .swiper-button-next",
      prevEl: ".news_slider .swiper-button-prev",
    },
    on: {
      slideChange: function () {
        if (this.slides[this.activeIndex]) {
            this.slides[this.activeIndex].focus();
        }
      },
    },
    a11y: {
      enabled: true,
    },
  });

  var puaseNewsButton = document.getElementById("puaseNews");
  var playNewsButton = document.getElementById("playNews");

  if(puaseNewsButton) {
    puaseNewsButton.addEventListener("click", (event) => {
      newsSwiper.autoplay.stop();
      puaseNewsButton.style.setProperty("display", "none", "important");
      if(playNewsButton) playNewsButton.style.setProperty("display", "flex", "important");
    });
  }

  if(playNewsButton) {
    playNewsButton.addEventListener("click", (event) => {
      newsSwiper.autoplay.start();
      playNewsButton.style.setProperty("display", "none", "important");
      if(puaseNewsButton) puaseNewsButton.style.setProperty("display", "flex", "important");
    });
    playNewsButton.style.setProperty("display", "none", "important");
  }

  $(".ft-family > a").click(function (event) {
    event.preventDefault();
    $(".ft-family > ul").stop().slideToggle();
    $(".ft-family").stop().toggleClass("on");
  });

  $(document).on("click", function (event) {
    if (!$(event.target).closest(".ft-family").length) {
      $(".ft-family > ul").stop().slideUp();
    }
  });

     // 검색 입력창에서 Enter 키 입력 시 동작
     $("#searchData").keypress(function (e) {
        if (e.keyCode == 13) {
          $("#searchBtn").click();
        }
     });
  });
// Custom slick slider initialization for .ban_list
$(function(){

    var VisualLength = $('.ban_list > div').length;
	if(VisualLength>1){
		$('.ban_btn .auto').addClass('play').text('');
	} else{
		$('.ban_btn .auto').addClass('pause').text('');
	};
	$('.ban_area .ban_list').slick({
		swipe : true,
		draggable : true,
		slidesToShow : 1,
		slidesToScroll: 1,
		vertical : false,
		autoplay : true,
		infinite: true,
		dots : true,
		appendDots: $('.ban_btn .dotbox'),
		prevArrow : false,
		nextArrow : false
	});

	$('.ban_area .slick-dots button').on('click', function(){
		$('.ban_area .ban_list').slick('slickPause');
		$('.ban_area .ban_btn button.auto').removeClass('play').addClass('pause').text('');
	});

	$('.ban_area .ban_list').on('swipe', function(event, slick, direction){
		$('.ban_area .ban_list').slick('slickPause');
		$('.ban_area .ban_btn button.auto').removeClass('play').addClass('pause').text('');
	});

	$('.ban_area .ban_btn button.auto').click(function(){
		var NowPlaying = $(this).is('.play');
		if(NowPlaying==true){
			$('.ban_area .ban_list').slick('slickPause');
			$(this).removeClass('play').addClass('pause').text('');
		} else if(NowPlaying==false){
			$('.ban_area .ban_list').slick('slickPlay');
			$(this).removeClass('pause').addClass('play').text('');
		};
	});

	var $VisualPopupList = $('.ban_list .slick-slide');
	$VisualPopupList.each(function(){
		var $VisualPopupLink = $(this).children('a'),
			VisualPopupHref = $VisualPopupLink.attr('href');
		$VisualPopupLink.on('click', function(){
			if(!VisualPopupHref){
				return false;
			};
		});
	});
});

// Custom slick slider initialization for .app_list
$(function(){	
	var VisualLength = $('.app_list > div').length;
	if(VisualLength>1){
		$('.app_btn .auto').addClass('play').text('');
	} else{
		$('.app_btn .auto').addClass('pause').text('');
	};
	$('.app_area .app_list').slick({
		swipe : true,
		draggable : true,
		slidesToShow : 1,
		slidesToScroll: 1,
		vertical : false,
		autoplay : true,
		infinite: true,
		dots : true,
		appendDots: $('.app_btn .dotbox'),
		prevArrow : false,
		nextArrow : false
	});

	$('.app_area .slick-dots button').on('click', function(){
		$('.app_area .app_list').slick('slickPause');
		$('.app_area .app_btn button.auto').removeClass('play').addClass('pause').text(''); // Corrected typo here
	});

	$('.app_area .app_list').on('swipe', function(event, slick, direction){
		$('.app_area .app_list').slick('slickPause');
		$('.app_area .app_btn button.auto').removeClass('play').addClass('pause').text('');
	});

	$('.app_area .app_btn button.auto').click(function(){
		var NowPlaying = $(this).is('.play');
		if(NowPlaying==true){
			$('.app_area .app_list').slick('slickPause');
			$(this).removeClass('play').addClass('pause').text('');
		} else if(NowPlaying==false){
			$('.app_area .app_list').slick('slickPlay');
			$(this).removeClass('pause').addClass('play').text('');
		};
	});

	var $VisualPopupList = $('.app_list .slick-slide');
	$VisualPopupList.each(function(){
		var $VisualPopupLink = $(this).children('a'),
			VisualPopupHref = $VisualPopupLink.attr('href');
		$VisualPopupLink.on('click', function(){
			if(!VisualPopupHref){
				return false;
			};
		});
	});
});

