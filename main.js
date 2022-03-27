
song="";
Status1="";
OBJECTS=[];


function preload(){
    song = loadSound("EMERGENCY ALARM RINGTONE _SOUND __  UNIK_BGMS.mp3");
}

function setup(){
 canvas=createCanvas(500,400);
 canvas.position(500,180);
 video=createCapture(VIDEO);
 video.hide();
 OD=ml5.objectDetector('cocossd', model_loaded);
 document.getElementById("status").innerHTML="status detecting people";
}



function model_loaded(){
 console.log("Model has loaded");
 Status1=true;
}

function got_results(error, results){
 if(error){
 console.error(error);
 }   
 else{
     console.log(results);
     OBJECTS=results;
    }
}

function draw(){
    image(video, 0, 0, 500, 500);

   
   
   if( Status1 !=""){
    OD.detect(video, got_results);
    for(i=0;i<OBJECTS.length;i++){
        if(OBJECTS[i].label=="person"){
            document.getElementById("status").innerHTML="Status:Baby detected";
            song.stop();
        }
        else{
        document.getElementById("status").innerHTML="Status: Baby not detected"
        song.play();
        }
    
    document.getElementById("status1").innerHTML="Number of objects detected" +  OBJECTS.length;
    percentage=floor(OBJECTS[i].confidence*100);
    fill("red");
    textSize(20);
    text(OBJECTS[i].label+" "+percentage+"%", OBJECTS[i].x, OBJECTS[i].y);
    noFill();
    R=Math.random()*255;
    G=Math.random()*255;
    B=Math.random()*255   
    stroke(R, G, B);
    rect(OBJECTS[i].x, OBJECTS[i].y, OBJECTS[i].width, OBJECTS[i].height);
    }
}
if(OBJECTS.length !=0){
document.getElementById("status").innerHTML="Baby not detected";
song.play();
}
}