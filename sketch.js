//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;
var fedTime, lastFed;
var feed, addFoodCount;
var foodObj;

function preload()
{
  //load images here
  dogimg = loadImage("dogImg.png");
  happyDogimg = loadImage("dogImg1.png");
  //milkBottleimage = loadImage("Milk.png")
}

function setup() {
  createCanvas(800, 500);

  database=firebase.database();
    foodStock=database.ref('foodStock');
    foodStock.on("value",readStock);

  foodObj= new Food();

  dog=createSprite(500, 290, 10,10);
  dog.addImage(dogimg);
  dog.scale=0.2;

  feed=createButton("Feed the dog");
  feed.position(100,500);
  feed.mousePressed(feedDog);

 
}

function draw() {  
  background(46, 139, 87);

  addFoodCount=createButton("Add Food")
  addFoodCount.position(700,500);
  addFoodCount.mousePressed(addFood);
 
   foodObj.display();
    
    textSize(14);
    fill("white");
    text("Food remaining:"+foodS,250,170);
    if(lastFed>=12){
      text("Last Feed :" + lastFed%12+ "PM",350,30);
    }
    else if(lastFed==0){
      text("Last Fed : 12 AM", 350,30);
    }
    else{
      text("Last Feed :"+lastFed, 350,30)
    }
    

   drawSprites();  
}


//funtion to updatefood stock and last fedtime
  function feedDog(){
    dog.addImage(happyDogimg);
    lastFed=hour()
    foodObj.updateFoodStock(foodS);
    database.ref('/').update({
      //Food:foodObj.getFoodStock(),
      lastFed:lastFed
    })
  }
  //function to add food in stock
function addFood(){
  foodS++;
  console.log(foodS)
  database.ref('/').update({
  foodStock:foodS
  })
}

function readStock(data){
  foodS=data.val();
}
