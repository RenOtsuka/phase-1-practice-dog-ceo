console.log('%c HI', 'color: firebrick');
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

function fetchImages(){
    fetch(imgUrl)
    .then((resp) => resp.json())
    .then((obj) => renderImages(obj));
}

function renderImages(imgs){
     //console.log(imgs);

    const divImg = document.getElementById('dog-image-container');
    divImg.textContent = '';
    //console.log(divImg);

    let imgArr = Array.from(imgs['message']);
    //console.log(imgArr);

    for(let url of imgArr){
        //console.log(url);
        const img = document.createElement('img');
        img.setAttribute('src', url);
        divImg.appendChild(img);
    }
}

function fetchDogBreeds(option){
    fetch(breedUrl)
    .then((resp) => resp.json())
    .then((obj) => getDogs(obj, option));
}

function getDogs(dogBreedObj, option){
    //console.log(dogBreedObj);

    const ulDog = document.getElementById('dog-breeds');
    ulDog.textContent = '';
    //console.log(ulDog);
    
    for(let breed in dogBreedObj['message']){
        //console.log(breed);
        if(option !== null){
            if(breed[0] !== option){
                continue;
            }
        }
        const li = document.createElement('li');
        li.textContent = breed;
        li.id = breed;
        ulDog.appendChild(li);
        li.onclick = function(){
            li.style.color = 'blue';
        }
    }

    filterBreedSelect();

}


function filterBreedSelect(){
    let breedOption = document.getElementById('breed-dropdown');
    breedOption.addEventListener('click', () => {
        let option = breedOption.options[breedOption.selectedIndex].value;
        //console.log(option);
        fetchDogBreeds(option);
    })
   
}



let option = null;

document.addEventListener('DOMContentLoaded', function(){
    fetchImages();
    fetchDogBreeds(option);
});

