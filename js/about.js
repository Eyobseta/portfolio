let education=document.querySelector(".education");
let experiance=document.querySelector(".experience");
let life=document.querySelector(".life");
let expBtn=document.querySelector('#expBtn');
let eduBtn=document.querySelector("#eduBtn");
let lifeBtn=document.querySelector("#lifeBtn");
let aboutMeContent=document.querySelector('.about-content h1');

expBtn.addEventListener("click",()=>{
    education.style.display="none";
    life.style.display="none";
    experiance.style.display="block";
    document.querySelector('#aboutBtn li #expBtn').style.backgroundColor='cyan';
    document.querySelector('#aboutBtn li #lifeBtn').style.backgroundColor='#000';
     document.querySelector('#aboutBtn li #eduBtn').style.backgroundColor='#000';
     document.querySelector('#aboutBtn li #expBtn').style.color='#0e0404ff';
     document.querySelector('#aboutBtn li #eduBtn').style.color='cyan';
     document.querySelector('#aboutBtn li #lifeBtn').style.color='cyan';
     aboutMeContent.textContent="My Experiance ?";
     setTimeout(()=>{
        aboutMeContent.textContent="About Me?"
     },10000)
})

eduBtn.addEventListener("click",()=>{
    education.style.display="block";
    life.style.display="none";
    experiance.style.display="none";
     document.querySelector('#aboutBtn li #expBtn').style.backgroundColor='#000';
     document.querySelector('#aboutBtn li #lifeBtn').style.backgroundColor='#000';
     document.querySelector('#aboutBtn li #eduBtn').style.backgroundColor='cyan';
      document.querySelector('#aboutBtn li #expBtn').style.color='cyan';document.querySelector('#aboutBtn li #expBtn').style.backgroundColor='#000';
     document.querySelector('#aboutBtn li #eduBtn').style.color='#0e0404ff';
     document.querySelector('#aboutBtn li #lifeBtn').style.color='cyan';
     aboutMeContent.textContent="My Education Status ?";
      setTimeout(()=>{
        aboutMeContent.textContent="About Me?"
     },10000)
})

lifeBtn.addEventListener("click",()=>{
    education.style.display="none";
    life.style.display="block";
    experiance.style.display="none";
     document.querySelector('#aboutBtn li #expBtn').style.backgroundColor='#000';
     document.querySelector('#aboutBtn li #lifeBtn').style.backgroundColor='cyan';
     document.querySelector('#aboutBtn li #eduBtn').style.backgroundColor='#000';
          document.querySelector('#aboutBtn li #expBtn').style.color='cyan';
     document.querySelector('#aboutBtn li #eduBtn').style.color='cyan';
     document.querySelector('#aboutBtn li #lifeBtn').style.color='#000';
     aboutMeContent.textContent="My Life ?";
     setTimeout(()=>{
        aboutMeContent.textContent="About Me?"
     },10000)
})


