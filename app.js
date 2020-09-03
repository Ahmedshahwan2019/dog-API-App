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
  if (breed !== 'Choose from dog breed') {
    const response = await fetch(`https://dog.ceo/api/breed/${breed}/images`);
    const data = await response.json();
  }
}
