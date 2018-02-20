'use strict';
var products = [];
var gameClicks=0;
var gameBox = document.getElementById('game');
function Product(name,filePath){
    this.name=name;
    this.filePath=filePath;
    this.imgClickTotal=0;
    this.imgShownTotal=0;
    products.push(this);
    this.previous = false;
}
Product.prototype.chosen = function(){
        this.imgClickTotal++;
}
//Images we will be showing
new Product('bag','img/bag.jpg','bag');
new Product('banana','img/banana.jpg','banana');
new Product('bathroom','img/bathroom.jpg','bathroom');
new Product('boots','img/boots.jpg','boots');
new Product('breakfast','img/breakfast.jpg','breakfast');
new Product('bubblegum','img/bubblegum.jpg','bubblegum');
new Product('chair','img/chair.jpg','chair');
new Product('cthulhu','img/cthulhu.jpg','cthulhu');
new Product('dog-duck','img/dog-duck.jpg','dog-duck');
new Product('dragon','img/dragon.jpg','dragon');
new Product('pen','img/pen.jpg','pen');
new Product('pet-sweep','img/pet-sweep.jpg','pet-sweep');
new Product('scissors','img/scissors.jpg','scissors');
new Product('shark','img/shark.jpg','shark');
new Product('sweep','img/sweep.png','sweep');
new Product('tauntaun','img/tauntaun.jpg','tauntaun');
new Product('unicorn','img/unicorn.jpg','unicorn');
new Product('usb','img/usb.gif','usb');
new Product('water-can','img/water-can.jpg','water-can');
new Product('wine-glass','img/wine-glass.jpg','wine-glass');

//After clear make 3 images show up
function createRandomImages(){
    var displayArray = []; //clear displaying images array
    game.innerHTML =''; // Clear images for new random images
    for (var i=0; i<3; i++){
        var temp = Math.floor(Math.random()*products.length); // create random number index
        //if product is in displayArray or it has a previous value of true, try again
        if(displayArray.includes(products[temp])|| products[temp].previous === true){ 
            i--;
            continue;
        }
        displayArray.push(products[temp]); //push random product[i] into displayArray
        products[temp].imgShownTotal++ //increment image display counter
        var imgEl = document.createElement('img'); //create image element for section
        imgEl.src = (products[temp].filePath); //create img src from object
        imgEl.id = (products[temp].name);
        gameBox.appendChild(imgEl); //append img to parent container
        //Change value of previous to true bc it has been used this round
        if (products[temp].previous === false){
            products[temp].previous = true;
        }
    }
    //After the table has been made reset all Previous Values not used in this round to false a.k.a. reset
    for (var j=0; j<products.length; j++){
        if (!(displayArray.includes(products[j]))){
            products[j].previous = false;
        }
    }
}

function eventHandler(event){
    event.preventDefault(); //prevent reset on refresh
    console.log(event.target.id);
    //Not refined enough to register a value, the idea is there.
    // console.log(event.target);
    for (var i=0; i<products.length; i++){
        // console.log(products[i].filePath);
        if (event.target.id === products[i].name){
            products[i].imgClickTotal++;
        } 
    }
    //(product contains event then add to click total)
    gameClicks++; //increment clicksTotal when clicked
    game.innerHTML =''; // Clear images for new random images
    // remove the event handler if the game is over
    if(gameClicks===25){
       gameBox.removeEventListener('click',eventHandler);
       //Maybe do something else too
    }
    createRandomImages();
}

//Operations
gameBox.addEventListener('click', eventHandler); //set event
createRandomImages(); //set initial images