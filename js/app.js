'use strict';
var busRoad=document.getElementById('bus').getContext('2d');
var bus = new Image();
// bus.width = 200;
// bus.height = 116;
bus.src = 'img/bus.png';
var busState ={
    x: -500,
    y: -10
  };
var tableTitle = ['Item','Views','Clicks','%Clicked when Shown','Recommended'];
var table = document.getElementById('table'); 
Chart.defaults.global.defaultFontSize = 22;
document.getElementById("chart").hidden=true;
var products = [];
var imgClickData = [];
var imgShownData = [];//Save for tomorrow
var gameClicks=0;
var gameBox = document.getElementById('game');
var list = document.getElementById('list');
var productNames = ['bag','banana','bathroom','boots','breakfast','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','sweep','tauntaun','unicorn','usb','water-can','wine-glass'];
function Product(name,filePath){
    this.name=name;
    this.filePath=filePath;
    this.imgClickTotal=0;
    this.imgShownTotal=0;
    this.previous = false;
    products.push(this);
}
Product.prototype.pertcentClick = function(){
    var percent =  this.imgClickTotal/this.imgShownTotal *100;
    console.log(this.imgClickTotal/this.imgShownTotal *100);
    return Math.floor(this.percent);
}
// Product.prototype.renderRow= function(){
//     var trEl = document.createElement('tr');
//     trEl.textContent = this.name;
//     var tdEl = document.createElement('td');
//     tdEl.textContent = this.imgShownTotal;
//     trEl.appendChild(tdEl);
//     var tdEl = document.createElement('td');
//     tdEl.textContent = this.imgClickTotal;
//     trEl.appendChild(tdEl);
//     var tdEl = document.createElement('td');
//     tdEl.textContent = this.pertcentClick();
//     if(tdEl.textContent >70){
//         tdEl.textContent.fontcolor(0,0,0);
//     }
//     trEl.appendChild(tdEl);
//     table.appendChild(trEl);
    
// }

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
    // game.innerHTML =''; // Clear images for new random images
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
//Event Handler for click on picture
function eventHandler(event){
    event.preventDefault(); //prevent reset on refresh
    if(event.target.id==="game"){
        alert("Please Click an Image!");
    }
    else{
        for (var i=0; i<products.length; i++){ //for all interations of the images
            if (event.target.id === products[i].name){ //if selected id matches name
                products[i].imgClickTotal++; //increment click total for that name
                imgClickData[i] = products[i].imgClickTotal; //Assign values to data array
            } 
        }
        gameClicks++; //increment clicksTotal when clicked
        game.innerHTML =''; // Clear images for new random images
        if(gameClicks===25){ // remove the event handler if the game is over
            document.getElementById("chart").hidden=false;
            document.getElementById("game").hidden=true;
            gameBox.removeEventListener('click',eventHandler);
            storeData();
            renderList();
            renderClicksChart(); //set Click Data Chart
            // renderTable();

        }
        createRandomImages(); //call the images to the screen
    }
}
(function busRun(){
    setInterval(function(){
        busRoad.clearRect(0,0,900,500);
        busRoad.drawImage(bus, busState.x, busState.y);
        busState.x+=1;
        if (busState.x>1000){
            busState.x=0;
        }
},1)
})();
function renderList(){
    for (var i=0; i<productNames.length; i++){
        var pEl = document.createElement('p');
        pEl.textContent= products[i].name + 'was clicked '+products[i].imgClickTotal+'.';
        list.appendChild(pEl);
    }
}
function renderClicksChart(){
    var ctx = document.getElementById("chart");
    var clicksChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: productNames,
            datasets: [{
                label: 'Number of Clicks',
                data: imgClickData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive:false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero:true
                    }
                }]
            }
        }
    });
}
function storeData(){
    localStorage.imgClickData = JSON.stringify(imgClickData)
}
function retrieveData(){
    if(localStorage.imgClickData){
        localStorage.imgClickData;
        imgClickData = JSON.parse(localStorage.imgClickData)
    }
    createRandomImages();
}
// function renderTable(){
//     for(var i=0; i<tableTitle.length; i++){
//         var thEl=document.createElement('th');
//         thEl.textContent= tableTitle[i];
//         table.appendChild(thEl);
//     }
//     for(var i=0; i<products.length; i++){
//         products[i].renderRow();
//     }
    

// }
//Operations
gameBox.addEventListener('click', eventHandler); //set event
retrieveData(); //Local 