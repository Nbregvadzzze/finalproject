let btnOpen = document.querySelector(".btnOpen");
let box = document.querySelector(".box");
let body = document.querySelector("body");
let close = document.querySelector(".close");

let registerHead = document.querySelector(".register-head");
let registerBody = document.querySelector(".register-body");
let slantLeft = document.querySelector(".slant-left");
let slantRight = document.querySelector(".slant-right");
let first_name = document.querySelector(".first_name");
let last_name = document.querySelector(".last_name");
let bodyText = document.querySelector(".body-text");
let btnClose = document.querySelector(".btnClose");

let registrationBox = document.querySelector(".registration-box");
let confirmationBox = document.querySelector(".confirmation-box");
let btnSubmit = document.querySelector(".btnSubmit");
let ss = document.querySelector(".ss")
let bb = document.querySelector(".bb")
let cc = document.querySelector(".cc")
let dd = document.querySelector(".dd")
let jj = document.querySelector(".jj")
let qq = document.querySelector(".qq")
let qq1 = document.querySelector(".qq1")
let qq2 = document.querySelector(".qq2")
let qq3 = document.querySelector(".qq3")
let mm = document.querySelector(".mm")
let tt = document.querySelector(".tt")




btnSubmit.addEventListener("click", ()=>{

    bodyText.innerHTML="გამარჯობათ, " + first_name.value + " თქვენ წარმატებით გაიარეთ რეგისტრაცია";
    
    registerHead.style.display="none";    
    registerBody.style.display="none";

    slantLeft.style.display="block";    
    slantRight.style.display="block";    
    
    registrationBox.style.display="none";
    confirmationBox.style.display="block";
});

btnOpen.addEventListener("click", ()=>{
    btnOpen.style.display="none";
    box.style.display="block";
    body.style.backgroundColor="#222";
    seatingArea.style.display = "none";
    ss.style.display = "none";
    bb.style.display = "none";
    cc.style.display = "none";
    dd.style.display = "none";
    jj.style.display = "none";
    qq.style.display = "none";
    qq1.style.display = "none";
    qq2.style.display = "none";
    qq3.style.display = "none";
    mm.style.display = "none";
    tt.style.display = "none";



});
close.addEventListener("click", ()=>{
    btnOpen.style.display="block";
    box.style.display="none";
    body.style.backgroundColor="";
    seatingArea.style.display = "";
    ss.style.display = "";
    bb.style.display = "";
    cc.style.display = "";
    dd.style.display = "";
    jj.style.display = "";
    qq.style.display = "";
    qq1.style.display = "";
    qq2.style.display = "";
    qq3.style.display = "";
    mm.style.display = "";
    tt.style.display = "none";
});
btnClose.addEventListener("click", ()=>{
    btnOpen.style.display="block";
    box.style.display="none";
    body.style.backgroundColor="";
    seatingArea.style.display = "";
    ss.style.display = "";
    bb.style.display = "";
    cc.style.display = "";
    dd.style.display = "";
    jj.style.display = "";
    qq.style.display = "";
    qq1.style.display = "";
    qq2.style.display = "";
    qq3.style.display = "";
    mm.style.display = "";
    tt.style.display = "none";
});