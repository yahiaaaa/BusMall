'use strict'

let ImagArr = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'water-can.jpg', 'wine-glass.jpg'];
let counter = 0;
let numberOfRound = 25;
let r1, r2, r3;
const imageSection = document.getElementById('imageSection');
let img1 = document.getElementById('img1');
let img2 = document.getElementById('img2');
let img3 = document.getElementById('img3');
let im1 = document.getElementById('im1');
let im2 = document.getElementById('im2');
let im3 = document.getElementById('im3');
let result = document.getElementById('Result');
let resultUl = document.getElementById('resultsUl');

let ctx = document.getElementById('showData').getContext('2d');


function BusMall(imageName, imageSrc) {

  this.imageName = imageName;
  this.imageSrc = imageSrc;
  this.numOfClick = 0;
  this.numOfShown = 0;
  BusMall.images.push(this);
}

BusMall.images = [];

//---------------------------------------------------------------------

for (let i = 0; i < ImagArr.length; i++) {
  new BusMall(ImagArr[i].split('.')[0], ImagArr[i]);
}
//---------------------------------------------------------------------
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


function render() {



  do {
    r1 = getRandom(0, ImagArr.length - 1);
    r2 = getRandom(0, ImagArr.length - 1);
    r3 = getRandom(0, ImagArr.length - 1);
  }
  while (r1 === r2 || r1 === r3 || r3 === r2);

  console.log(r1, r2, r3);
  img1.src = './img/' + BusMall.images[r1].imageSrc;
  img2.src = './img/' + BusMall.images[r2].imageSrc;
  img3.src = './img/' + BusMall.images[r3].imageSrc;

  im1.textContent = BusMall.images[r1].imageName;
  im2.textContent = BusMall.images[r2].imageName;
  im3.textContent = BusMall.images[r3].imageName;



  BusMall.images[r1].numOfShown++;
  BusMall.images[r2].numOfShown++;
  BusMall.images[r3].numOfShown++;

  // console.log(busmall.images[r1]);
}
render();

imageSection.addEventListener('click', showImage);

function showImage(event) {

  let arr1 = [r1, r2, r3];
  let arr2 = [];
  if ((event.target.id === 'img1' || event.target.id === 'img2' || event.target.id === 'img3') && counter < numberOfRound) {
    // event.preventDefault();
    if (event.target.id === 'img1') {
      BusMall.images[r1].numOfClick++;
    } else if (event.target.id === 'img2') {
      BusMall.images[r2].numOfClick++;
    } else if (event.target.id === 'img3') {
      BusMall.images[r3].numOfClick++;
    } 
    console.log(counter, numberOfRound);
    counter++;

    do {
      render();
      arr2 = [r1, r2, r3];
      console.log(arr1 + ' ,,,, ' + arr2);
    } while (!checkDublicate);

  } else if (counter >= numberOfRound) {
    result.style.visibility = 'visible';
  }
}
function showResult() {
  if (result.textContent === 'reset') {
    window.location.reload();
  }
  else {
    imageSection.removeEventListener('click', showImage);
    createMyChart(getName(), getShowData(), getClickData());

    for (let ii = 0; ii < BusMall.images.length; ii++) {
      let liE = document.createElement('li');
      liE.textContent = `${BusMall.images[ii].imageName} had ${BusMall.images[ii].numOfClick} votes, and was seen  ${BusMall.images[ii].numOfShown} times.`;
      resultUl.appendChild(liE);
    }

    result.textContent = 'reset';
  }



}



function checkDublicate(list1, list2) {
  for (let index = 0; index < list1.length; index++) {
    for (let index2 = 0; index2 < list2.length; index2++) {
      if (list1[index] === list2[index2]) {
        console.log("error");
        return false;
      }
    }
  }
  return true;
}
function createMyChart(names, clikData, showData) {

  let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: names,
      datasets: [{
        label: '# of Votes',
        data: showData,
        backgroundColor: [
          '#368B85'
        ],
      },
      {
        label: '# of Click time',
        data: clikData,
        backgroundColor: [
          '#9E7777'
        ],
      }
      ]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
      
        
    
    }
  });
  console.log(myChart.data);
}

function getName() {
  let arrayName = [];
  for (let index = 0; index < BusMall.images.length - 1; index++) {
    arrayName.push(BusMall.images[index].imageName);
  }
  return arrayName;
}


function getShowData() {
  let arrayShown = [];
  for (let index = 0; index < BusMall.images.length - 1; index++) {
    arrayShown.push(BusMall.images[index].numOfShown);
  }
  return arrayShown;
}

function getClickData() {
  let arrayClick = [];

  for (let index = 0; index < BusMall.images.length - 1; index++) {
    arrayClick.push(BusMall.images[index].numOfClick);
  }
  return arrayClick;
}