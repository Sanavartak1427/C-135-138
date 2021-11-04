function setup(){
    canvas = createCanvas(400, 400);
    canvas.position(350, 150);
    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();
    
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status:Detecting Object";
}
img = "";
status ="";
objects = [];

function preload(){
    img = loadImage("dog_cat.jpg");
}

function modelLoaded(){
    console.log("ModelLoaded!");
    status = true;
}

function gotresults(error, results){
    if (error){
    console.log("error");
    }
    else{
        console.log(results);
        objects = results;
        }
    

}

function draw() {
    image(video, 0, 0, 400, 400);
    if(status != ""){
        r = random(255);
        g = random(255);
        b = random(255);

        document.getElementById("status").innerHTML = "Status:Object Detected";
        document.getElementById("number_of_objects").innerHTML = "Number of objects detected are:"+ objects.length;
        objectDetector.detect(video, gotresults);
        for(i = 0; i < objects.length; i++){
        percentage = floor(objects[i].confidence * 100);
            fill(r,g,b);
            text(objects[i].label + " " + percentage + "%" , objects[i].x , objects[i].y );
            noFill();
            stroke(r,g,b);
            rect(objects[i].x - 35 , objects[i].y , objects[i].width , objects[i].height);
        }
    }
}
