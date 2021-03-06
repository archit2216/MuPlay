var playButton=document.querySelector(".pause");
var next=document.querySelector(".next");
var back=document.querySelector(".back");
var artimg=document.querySelector("img");
var heading=document.querySelector("h3");
var sound=document.querySelector(".sound");
var audio=document.querySelector("audio");
var progress=document.querySelector(".progresscheck");
var progressBar=document.querySelector(".progressBar");
var songbuttons=document.querySelectorAll(".btn-success");
for(var i=0;i<5;i++)
{
    var req=(songbuttons[i].classList)[2];
    songbuttons[i].addEventListener("click",playMySong);
}

sound.addEventListener("change",handlevol);
next.addEventListener("click",playNext);
back.addEventListener("click",playPrev);
playButton.addEventListener("click",changePlay);
audio.addEventListener("timeupdate",handleprogress);

var artists=["Alan Walker - Faded","Wake Up Call (feat. Trippie Redd)","Charlie Puth - Attention","O-Zone - Dragostea Din Tei","Coldplay - Hymn For The Weekend"];
var images=["alan walker.png","ksi.jpg","charlie puth.jfif","o-zone.jfif","Hymn for the Weekend.jpg"];
let index=0;

function playMySong(){
    index=parseInt((this.classList)[2]);
    artimg.src="images/"+images[index]+"";
    heading.innerHTML=artists[index];
    audio.src="songs/"+artists[index]+".mp3";
    audio.play();
}
function changePlay(){
    if(this.classList.contains("fa-pause")){
    this.classList.remove("fa-pause");
    this.classList.add("fa-play");
    audio.pause();
    }
    else
    {
    this.classList.remove("fa-play");
    this.classList.add("fa-pause");
    audio.play();
    }
}
function playNext(){
    index++;
    if(index==artists.length)
    {
        index=0;
    }
    artimg.src="images/"+images[index]+"";
    heading.innerHTML=artists[index];
    audio.src="songs/"+artists[index]+".mp3";
    if(playButton.classList.contains("fa-play"))
    {
        audio.pause();
    }
    else
    {
        audio.play();
    }
}
function playPrev(){
    index--;
    if(index<0)
    {
        index=artists.length-1;
    }
    heading.innerHTML=artists[index];
    artimg.src="images/"+images[index]+"";
    if(playButton.classList.contains("fa-pause")){
        playButton.classList.remove("fa-pause");
        playButton.classList.add("fa-play");
    }
    audio.pause();

    audio.src="songs/"+artists[index]+".mp3";
    if(playButton.classList.contains("fa-pause")){
    audio.play();
    }
}

function handlevol(){
    audio.volume=this.value;
}
function handleprogress(){
    var percent=(audio.currentTime/audio.duration)*100;
    progressBar.style.flexBasis=`${percent}%`;
}
function scrub(e){
    var scrubtime=(e.offsetX/progress.offsetWidth)*audio.duration;
    audio.currentTime=scrubtime;
}

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
