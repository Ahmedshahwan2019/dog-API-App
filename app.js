// Old way to fetch data
// fetch('https://dog.ceo/api/breeds/list/all')
//   .then((response) => response.json())
//   .then((data) => console.log(data.message));

async function start() {
  const response = await fetch('https://dog.ceo/api/breeds/list/all');
  const data = await response.json();
  createBreedList(data.message);
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
  let currentPosition = 0;
  const slideShow = document.getElementById('slide-show');
  slideShow.innerHTML = `
  <div  class="slide"  style="background-image: url('${images[0]}') "></div>
  <div  class="slide"  style="background-image: url('${images[1]}') "></div>
  `;
  currentPosition += 2;
  setInterval(nextSlide, 3000);
  function nextSlide() {
    slideShow.insertAdjacentElement(
      'beforeend',
      `  <div  class="slide"  style="background-image: url('${images[currentPosition]}') "></div>
    `,
    );
    setTimeout(function () {
      document.querySelector('.slide').remove();
    }, 1000);
    if (currentPosition + 1 >= images.length) {
      currentPosition = 0;
    } else {
      currentPosition++;
    }
  }
}
