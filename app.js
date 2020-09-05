// Old way to fetch data
// fetch('https://dog.ceo/api/breeds/list/all')
//   .then((response) => response.json())
//   .then((data) => console.log(data.message));

let timer
let deleteFirstPhotoDelay
async function start() {
  try{
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  createBreedList(data.message);
  } catch (e){
    console.log('Something went wrong' + e)
  }
}
start();

function createBreedList(breedList) {
  const mainDivEl = document.getElementById('breed');
  mainDivEl.innerHTML = ` 
      <select onchange = 'loadByBreed(this.value)'>
        <option>Choose from dog breed</option>
          ${Object.keys(breedList)
            .map((breed) => {
              return `<option>${breed}</option>`;
            })
            .join('')}
        </select>
  `;
}

async function loadByBreed(breed) {
  if (breed !== 'Choose dog breed') {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
    createSlideShow(data.message);
  }
}

function createSlideShow(images) {
  let currentPosition = 0

  clearInterval(timer)
  clearTimeout(deleteFirstPhotoDelay)
 let slideShow = document.getElementById('slide-show')

 if(images.length > 1){
 slideShow.innerHTML =`
  <div  class="slide"  style="background-image: url('${images[0]}') "></div>
  <div  class="slide"  style="background-image: url('${images[1]}') "></div>`
  currentPosition +=2
  if(images.length == 2 ) currentPosition=0
  //set new image every 3s
 timer = setInterval( nextSlide, 3000);
 }else{
slideShow.innerHTML =`
  <div  class="slide"  style="background-image: url('${images[0]}') "></div>
  <div  class="slide" ></div>
  `
 }
function nextSlide() {
  document.querySelector('.slide-show').insertAdjacentHTML("beforeend" , `<div class="slide"  style="background-image: url('${images[currentPosition]}') "></div>`)

 deleteFirstPhotoDelay= setTimeout(() => {
    document.querySelector('.slide').remove()
  }, 1000);

  if(currentPosition + 1 >= images.length){
    currentPosition = 0
  }else{
    currentPosition++
    }
  }
}

