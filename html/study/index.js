function carousel(){
   //화면 객체를 가져온다.
   let slideshow = document.querySelector(".slideshow");
   let slideshow_slides = document.querySelector(".slideshow_slides");
   let slidesArray = document.querySelectorAll(".slideshow_slides a");
   let prev = document.querySelector(".prev");
   let next = document.querySelector(".next");
   let indicatorArray = document.querySelectorAll(".slideshow_indicator a");
   
   
   
   
   
   //현재 이미지 인덱스, 인터벌 아이디, 슬라이드 갯수
   let currentIndex = 0; 
   let timerID = null; 
   let slideCount = slidesArray.length;
    //현재이미지를 한줄로 정렬
    for(let i=0; i<slideCount; i++){
        let newLeft = `${i*100}%`;
        slidesArray[i].style.left = newLeft; 
       }

   //화면을 전환해주는 함수
   function gotoslide(index){
    currentIndex = index;
    let newLeft = `${index* -100}%`;
    slideshow_slides.style.left = newLeft;

    //indicator 위치를 가르켜줘야함
    for(let i=0;i<slideCount;i++){
        indicatorArray[i].classList.remove('active');
    };
    indicatorArray[index].classList.add('active');
   } //end of gotoslide

   gotoslide(0);
   //3초 마다 gotoslide()불저주자 index값을 0,1,2,3,0,1,2,3
   function startTimer(){
    timerID = setInterval(()=>{
        let index = (currentIndex + 1) % slideCount;
        currentIndex = index; 
        gotoslide(index);
    }, 3000); 
   }
   startTimer();
   //이벤트등록 핸들러기능
   slideshow_slides.addEventListener("mouseenter",(event)=>{
    clearInterval(timerID);
   });

   slideshow_slides.addEventListener("mouseleave",(event)=>{
    startTimer();
   });

   prev.addEventListener("mouseenter",(event)=>{
    clearInterval(timerID);
   });

   prev.addEventListener("mouseleave",(event)=>{
    startTimer();
   });

   next.addEventListener("mouseenter",(event)=>{
    clearInterval(timerID);
   });

   next.addEventListener("mouseleave",(event)=>{
    startTimer();
   });

   prev.addEventListener("click",(event)=>{
    event.preventDefault();//앵커 태그가 가지고있는 페이지이동 기본기능을 막아라
    currentIndex = currentIndex - 1;
    if(currentIndex<0){
        currentIndex = currentIndex - 1;
    };
    gotoslide(currentIndex);
   });

   next.addEventListener("click",(event)=>{
    event.preventDefault();//앵커 태그가 가지고있는 페이지이동 기본기능을 막아라
    currentIndex = currentIndex + 1;
    if(currentIndex > (slideCount-1)){
        currentIndex = 0;
    };
    gotoslide(currentIndex);
   });

   //indicator를 클릭하면 해당된 페이지 이동
   for(let i=0;i<slideCount;i++){
    indicatorArray[i].addEventListener("mouseleave",(event)=>{
       
       startTimer();
    });
   }

   for(let i=0;i<slideCount;i++){
    indicatorArray[i].addEventListener("mouseenter",(event)=>{
        clearInterval(timerID);
    })
   }

   for(let i=0;i<slideCount;i++){
    indicatorArray[i].addEventListener("click",(event)=>{
        event.preventDefault();
        gotoslide(i);
    });
   }
};//end of carousel


// 패턴 검색
function onLoad(){
    //패턴 검색 내용
    const idPattern = /^[\w]{3,}$/;//[\w]는 영문자, 숫자,_만 입력가능
    const pwdPattern =  /^[\w]{6,10}$/;//영문자 숫자 _까지 6~10
    const namePattern =  /^[가-힣]{2,4}|[A-Z]{1}[a-zA-Z\x20]{1,19}$/;//한글 2글자~4글자,영문자 2글지~20글자 첫글자는 대문자 공백가능
    const emialPattern =  /^[a-z0-9_+.-]+@([a-z0-9-]+.)+[a-z0-9]{2,4}$/i;//공백없이 한글,영문,숫자,_만 입력 가능(4글자 이상)
    const mobilePattern = /^010-(?:\d{3}|\d{4})-\d{4}$/;
    const datePattern = /^\d{4}-\d{2}-\d{2}$/; 
    //객체찾기
    const id = document.querySelector("#userid");
    const inputuserid = document.querySelector(".id");
    const inputpwd1 = document.querySelector("#pwd");
    const inputpwd2 = document.querySelector("#pwd2");
    const inputname = document.querySelector("#name");
    const emialinputname = document.querySelector("#email");
    const inputmobile = document.querySelector("#phone");
    const inputdate = document.querySelector("#birthday");
    //폼객체
    const myform = document.querySelector(".myform");

     //이벤트 리스너 등록 및 처리
     
    inputuserid.addEventListener("blur",()=>validate(inputuserid, idPattern,"영문자, 숫자, _만 입력 가능."));
    inputpwd1.addEventListener("blur",()=>validate(inputpwd1, pwdPattern,"영문자 숫자 _까지 6~10 가능."));
    inputpwd2.addEventListener("blur",()=>{
        validate(inputpwd2, pwdPattern,"영문자 숫자 _까지 6~10 가능.");
        if(inputpwd1.value !== inputpwd2.value){
            inputpwd2.nextSibling.textContent ="패스워드가 일치하지 않습니다";
            inputpwd2.nextSibling.style.color = "red";
            inputpwd1.value="";
            inputpwd2.value="";
            inputpwd1.focus();
            return;
        };
    });
    inputname.addEventListener("blur",()=>validate(inputname, namePattern,"한글 2글자~4글자,영문자 2글지~20글자 첫글자는 대문자 공백가능."));
    emialinputname.addEventListener("blur",()=>validate(emialinputname, emialPattern,"이메일 양식에 맞지 않음"));
    inputmobile.addEventListener("blur",()=>validate(inputmobile, mobilePattern,"전화형식에 맞지 않음"));
    inputdate.addEventListener("blur",()=>validate(inputdate, datePattern,"날짜 선택하세요"));
   


     //폼 이벤트 등록 및 핸들러 처리
     myform.addEventListener("submit",(e)=>{
        e.preventDefault();//서버에 전송하는 기본기능을 막는다.
        validate(inputid, idPattern,"영문자, 숫자, _만 입력 가능.");
        validate(inputpwd1, pwdPattern,"영문자 숫자 _까지 6~10 가능.");
        validate(inputpwd2, pwdPattern,"영문자 숫자 _까지 6~10 가능.")
        if(inputpwd1.value !== inputpw2.value){
            inputpwd2.nextSibling.textContent ="패스워드가 일치하지 않습니다"
            inputpwd2.nextSibling.style.color = "red";
            inputpwd1.value="";
            inputpwd2.value="";
            inputpwd1.focus();
            return;
        };
        validate(inputname, namePattern,"한글 2글자~4글자,영문자 2글지~20글자 첫글자는 대문자 공백가능.");
        validate(emialinputname, emialPattern,"이메일 양식에 맞지 않음");
        validate(inputmobile, mobilePattern,"전화형식에 맞지 않음");
        validate(inputdate, datePattern,"날짜 선택하세요");
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
    };
};