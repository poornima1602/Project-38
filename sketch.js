var database ,dog,dog1,dog2
var position
var feed,add
var foodobject
var Feedtime
var Lastfeed
var bgImg;
var dogImg1,bedRoomImg,gardenImg,dogimg2,livingRoomImg,washRoomImg,milkImg;

function preload(){
 bgImg=loadImage('BBenz.jpg')
 dogImg1=loadImage('images/Dog.png')
 bedRoomImg=loadImage('images/Bed Room.png')
 gardenImg=loadImage('images/Garden.png')
 dogimg2=loadImage('images/happydog.png')
 livingRoomImg=loadImage('images/Living Room.png')
 washRoomImg=loadImage('images/washroom.png')
 milkImg=loadImage('images/milk.png');
}


function setup() {
	createCanvas(500, 600);
  database = firebase.database();
  console.log(database);
 
  foodobject=new Food()

  dog=createSprite(420,420);
  dog.addImage(dogImg1)
  dog.scale=0.3;

  background(bgImg)

  var dogo = database.ref('Food');
  dogo.on("value", readPosition, showError);

  feed = createButton("FEED ME")
  feed.position(150,90)
  feed.mousePressed(FeedDog)
  add = createButton("ADD FOOD")
  add.position(400,90)
  add.mousePressed(AddFood)

  br=createButton("I am very sleepy")
  br.position(60,30);

  br.mousePressed(function(){
dog.visible=false;
background(bedRoomImg);
  })

t=createElement('h2');
t.html("I am your puppy Mario")
t.position(170,40)

  lr=createButton("Let's play")
  lr.position(180,30);

  lr.mousePressed(function(){
dog.visible=false;
background(livingRoomImg);
  })

  wr=createButton("I want to take bath")
  wr.position(260,30);

  wr.mousePressed(function(){
dog.visible=false;
background(washRoomImg);
  })

  g=createButton("Let's play in the park")
  g.position(400,30);

  g.mousePressed(function(){
dog.visible=false;
background(gardenImg);
  })

} 



function draw(){
  if(keyIsDown("space")){
 background(bgImg);
  }

 foodobject.display()
 
 drawSprites();
  
 fill(255,255,254);
 textSize(15);

drawSprites();
}


function readPosition(data){
  position = data.val();
  foodobject.updateFoodStock(position)
}


function showError(){
  console.log("Error in writing to the database");
}


function writePosition(x){
  if(x>0){
    x=x-1
  }
  else{
    x=0
  }
  database.ref('/').set({
    'Food': x
  })

}



function AddFood(){
position++
database.ref('/').update({
  Food:position
}

)
}


function FeedDog(){
  background(bgImg)
  dog.visible=true;
dog.addImage(dogimg2)
foodobject.updateFoodStock(foodobject.getFoodStock()-1)
 database.ref('/').update({
   Food:foodobject.getFoodStock(),
   FeedTime:hour ()
 })
}
