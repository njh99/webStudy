function onLoad(){
    const btnopen = document.querySelector("#open");
    const btnclose = document.querySelector("#close");
    let winhandle = null;
    
    btnopen.addEventListener("click",()=>{
       winhandle = window.open("https://www.nate.com","_blank","width=400, height=400,left=30,right=30,top=30");
    });
    btnclose.addEventListener("click",()=>{
        winhandle.close
    });
}