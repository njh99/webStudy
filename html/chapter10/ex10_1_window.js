function onLoad(){
    const btnopen = document.querySelector("#open");
    const btnclose = document.querySelector("#close");
    const idobj = document.querySelector("#Puserid");
    const pwd = document.querySelector("#Ppwd");
    //팝업윈도우 = win핸들변수
    let win = null;
    
    btnopen.addEventListener("click",()=>{
    win = window.open("./ex8_2_formname.html","_blank","width=400, height=400,left=30,right=30,top=30");
    setTimeout(()=>{

        win.document.querySelector("#userid").value = idobj.value;
        win.document.querySelector("#pwd").value = pwd.value;
    },100);
       
    });
    btnclose.addEventListener("click",()=>{
        win.close();
    });
}