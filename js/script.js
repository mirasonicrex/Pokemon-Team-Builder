//alert('Js is working');

//Constants
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'; 


//Variables
let pokemonData, pokemonDetail; 
let pokemonTeam = []; 
let spritesArr = []; 

//Caches Element References
const $listEl = $('#pokemon-list'); 
const $sprite = $('#sprite');
const $cardsEl = $('#cards'); 
const $sprite2 = $('#sprite2');
const $sprite3 = $('#sprite3');
const $sprite4 = $('#sprite4');
const $sprite5 = $('#sprite5');
const $sprite6 = $('#sprite6');
//sprites have to be an array? 
//Event Listeners
$listEl.on('click', 'li', handleClick)
//Functions 

init(); 

function init() {
    getData();
}

function getData(detailURL) {
    const url = detailURL ? detailURL : BASE_URL;

    $.ajax(url) 
    .then(function(data) {
        if(detailURL) {
            pokemonDetail = data; 
            //console.log('Data: ', data);   
            render(true); 
        } else {
            pokemonData = data; 
            render(); 
            //console.log('Data: ', data);   
        }
    }, function(error) {
        console.log('Error: ', error); 
    });

}

function handleClick() {
    const url = this.dataset.url;
    getData(url); 
    //clicking on a name on the list turns it into the photo of the charater that was clicked and then stores the name in an array that will be called later when looking up the team types 
    
}


function generateList() {
    return pokemonData.results.map(function(pokemon) {
        return `
        <li data-url="${pokemon.url}">
            ${pokemon.name}
        </li>
        `; 
    }); 
}




function render(isDetail) {
    if(isDetail) {
        pokemonTeam.push(pokemonDetail.types); 
        console.log(pokemonTeam); 

        let pokeSprite = pokemonDetail.sprites.front_default; 
        spritesArr.push(pokeSprite); 
        console.log(spritesArr); 

        spritesArr.forEach(function(image){
            var img = document.createElement('img');
            img.src = image;
            $cardsEl.append(img);
            spritesArr = [];  
        })
   
     } else {
        $listEl.html(generateList())
       
    }
} 
 