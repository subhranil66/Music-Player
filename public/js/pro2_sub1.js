var audio = document.getElementById("audio-player");
var play = document.getElementById("play");
var replay = document.getElementById("replay");
var stop =  document.getElementById("stop");
var progress = document.getElementById("progress");
var box = document.getElementById("box");

play.onclick = function(){
    if(this.className == "fa fa-play-circle"){
        audio.play();
        this.className = "fa fa-pause-circle";
        this.title = "pause";
    }
    else{
        audio.pause();
        this.className = "fa fa-play-circle";
        this.title = "play";
    }
};

replay.onclick = function(){
    audio.currentTime=0;
    audio.play();
    play.className = "fa fa-pause-circle";
    play.title = "pause";
};

stop.onclick = function(){
    audio.currentTime=0;
    audio.pause();
    play.className = "fa fa-play-circle";
    play.title = "play";
};

audio.ontimeupdate = function(){
    var time = (100/audio.duration)*audio.currentTime;
    progress.style.width = time+"%";
    box.onclick = function(x){
        var p = x.offsetX / this.offsetWidth;
        audio.currentTime = p * audio.duration;
    }
    audio.onended = function(){
        if(this.currentTime == this.duration){
           play.className = "fa fa-play-circle";
           play.title = "play";
           progress.style.width = "0%"; 
        }
        else{
           play.className = "fa fa-pause-circle";
           play.title = "pause";
        }
    }
}