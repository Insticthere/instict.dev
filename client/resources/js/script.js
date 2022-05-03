var overlay = document.querySelector(".overlay");
const para = document.getElementById("visi");

function click() {
    para.classList.remove("visibility");
    para.classList.add("fadein");
    document.querySelector('icon-list')
    overlay.remove();
    var aud = document.getElementsByTagName("audio")[0];
    aud.volume = 0.3;
    aud.play();
    new Typed("#typing", {
        strings: ["","professional online arguer", "bullying kids online ever since", "i dont create bugs i create features.", "Instict#0416"],
        typeSpeed: 35,
        backspeed: 25,
        showCursor: false
        
    });
    
    console.log("click")};
    overlay.addEventListener("click",click)