function onLoad(){
    //패턴 검색 내용
    const idPattern = /^[\w]{3,}$/;//[\w]는 영문자, 숫자,_만 입력가능
    const pwdPattern =  /^[\w]{6,10}$/;//영문자 숫자 _까지 6~10
    const namePattern =  /^[가-힣]{2,4}|[A-Z]{1}[a-zA-Z\x20]{1,19}$/;//한글 2글자~4글자,영문자 2글지~20글자 첫글자는 대문자 공백가능
    const nicknamePattern =  /^[\w가-힣]{4,}$/;//공백없이 한글,영문,숫자,_만 입력 가능(4글자 이상)
    const emialPattern =  /^[a-z0-9_+.-]+@([a-z0-9-]+.)+[a-z0-9]{2,4}$/i;//공백없이 한글,영문,숫자,_만 입력 가능(4글자 이상)
    const telPattern =  /^\d{2,3}-\d{3,4}-\d{4}$/;
    const mobilePattern = /^010-(?:\d{3}|\d{4})-\d{4}$/;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    //객체 찾기
    const inputid = document.querySelector("#input-id");
    const inputpw1 = document.querySelector("#input-pw1");
    const inputpw2 = document.querySelector("#input-pw2");
    const inputname = document.querySelector("#input-name");
    const nickinputname = document.querySelector("#input-nickname");
    const emialinputname = document.querySelector("#input-email");
    const inputtel = document.querySelector("#input-tel");
    const inputmobile = document.querySelector("#input-mobile");
    const inputdate = document.querySelector('[type="date"]');
    
    //주소 객체
    const zipcode = document.querySelector("#zipcode");
    const addr1 = document.querySelector("#addr1");
    const addr2 = document.querySelector("#addr2");
    const btnsearch = document.querySelector("#btn-searchAddr");
    //폼 객체찾기
    const myform = document.querySelector(".myform");




    //이벤트 리스너 등록 및 처리
    inputid.addEventListener("blur",()=>validate(inputid, idPattern,"영문자, 숫자, _만 입력 가능."));
    inputpw1.addEventListener("blur",()=>validate(inputpw1, pwdPattern,"영문자 숫자 _까지 6~10 가능."));
    inputpw2.addEventListener("blur",()=>{
        validate(inputpw2, pwdPattern,"영문자 숫자 _까지 6~10 가능.");
        if(inputpw1.value !== inputpw2.value){
            inputpw2.nextSibling.textContent ="패스워드가 일치하지 않습니다"
            inputpw2.nextSibling.style.color = "red";
            inputpw1.value="";
            inputpw2.value="";
            inputpw1.focus();
            return;
        };
    });
    inputname.addEventListener("blur",()=>validate(inputname, namePattern,"한글 2글자~4글자,영문자 2글지~20글자 첫글자는 대문자 공백가능."));
    nickinputname.addEventListener("blur",()=>validate(nickinputname, nicknamePattern,"공백없이 한글,영문,숫자,_만 입력 가능(4글자 이상)"));
    emialinputname.addEventListener("blur",()=>validate(emialinputname, emialPattern,"이메일 양식에 맞지 않음"));
    inputtel.addEventListener("blur",()=>validate(inputtel, telPattern,"전화형식에 맞지 않음"));
    inputmobile.addEventListener("blur",()=>validate(inputmobile, mobilePattern,"전화형식에 맞지 않음"));
    inputdate.addEventListener("blur",()=>validate(inputdate, datePattern,"날짜 선택하세요"));
    btnsearch.addEventListener("click",()=>{
        new daum.Postcode({
            oncomplete: function(data) {
              // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드
              zipcode.value = data.zonecode;
              addr1.value = data.roadAddress;
            }
          }).open();
    });
    //폼 이벤트 등록 및 핸들러 처리
    myform.addEventListener("submit",(e)=>{
        e.preventDefault();//서버에 전송하는 기본기능을 막는다.
        validate(inputid, idPattern,"영문자, 숫자, _만 입력 가능.");
        validate(inputpw1, pwdPattern,"영문자 숫자 _까지 6~10 가능.");
        validate(inputpw2, pwdPattern,"영문자 숫자 _까지 6~10 가능.")
        if(inputpw1.value !== inputpw2.value){
            inputpw2.nextSibling.textContent ="패스워드가 일치하지 않습니다"
            inputpw2.nextSibling.style.color = "red";
            inputpw1.value="";
            inputpw2.value="";
            inputpw1.focus();
            return;
        }
        validate(inputname, namePattern,"한글 2글자~4글자,영문자 2글지~20글자 첫글자는 대문자 공백가능.");
        validate(nickinputname, nicknamePattern,"공백없이 한글,영문,숫자,_만 입력 가능(4글자 이상)");
        validate(emialinputname, emialPattern,"이메일 양식에 맞지 않음");
        validate(inputtel, telPattern,"전화형식에 맞지 않음");
        validate(inputmobile, mobilePattern,"전화형식에 맞지 않음");
        validate(inputdate, datePattern,"날짜 선택하세요");
        if(zipcode.value ===""||addr1.value ===""){
            zipcode.nextSibling.textContent = "주소선택해주세요";
            zipcode.focus();
            return;
        }
        alert("서버로 전송하겠습니다.");
        myform.submit();
        
    });

   
   //핸들러 처리기능
    function validate(userInput, pattern,message){
        if(userInput.value.match(pattern)){
            userInput.nextSibling.innerHTML = "성공";
            userInput.nextSibling.style.color = "blue";
        }else{
            userInput.nextSibling.innerHTML = message;
            userInput.nextSibling.style.color = "red";
            userInput.value = "";
            userInput.focus();
            return;
        }
    }
}
    