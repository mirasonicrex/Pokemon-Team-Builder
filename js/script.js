//alert('Js is working');

//Constants
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';


//Variables
let pokemonData, pokemonDetail;
let pokemonTeam = [];
let spritesArr = [];

//Caches Element References
const $listEl = $('#pokemon-list');
const $cardsEl = $('#cards');
const $typeEl = $('#type');
const $nextEl = $('#nxt-btn');

//Event Listeners
$listEl.on('click', 'li', handleClick)
$nextEl.on('click', handleNext); 
//Functions 

init();

function init() {
    getData();
}

function getData(detailURL) {
    const url = detailURL ? detailURL : BASE_URL;

    $.ajax(url)
        .then(function (data) {
            if (detailURL) {
                pokemonDetail = data;
                console.log('Data: ', data);   
                render(true);
            } else {
                pokemonData = data;
                render();
                //console.log('Data: ', data);   
            }
        }, function (error) {
            console.log('Error: ', error);
        });

}

function handleClick() {
    const url = this.dataset.url;
    
    getData(url);
    

}

function handleNext() {
    //const url = pokemonData.next; 
    console.log(pokemonData.next)
    //need to render the next list to the screen
}


function generateList() {
    return pokemonData.results.map(function (pokemon) {
        return `
        <li data-url="${pokemon.url}">
            ${pokemon.name}
        </li>
        `;
    });
}





function render(isDetail) {
    if (isDetail) {
        //save type data in an arary 
        if (pokemonTeam.length < 6) {
            pokemonTeam.push(pokemonDetail.types);
            //console.log(pokemonTeam);
        } else {
            return;
        }
        //Gather all of the type data in one array
        let allTypes = [];
        let renderArr = []; 
        pokemonTeam.forEach(function (pokemon) {
            pokemon.forEach(function (typeStat) { 
                allTypes.push(typeStat.type.name);
                console.log(allTypes);
                
                if (pokemonTeam.length === 6) {
                    $typeEl.append(`<br> ${allTypes.pop()} <br>`);
                }
                
            });

        });




        //save sprite data in an array
        let pokeSprite = pokemonDetail.sprites.front_default;
        spritesArr.push(pokeSprite);
        //console.log("spites Array", spritesArr);
        //render individual sprites to the screen 
        spritesArr.forEach(function (image) {
            if (pokemonTeam.length < 7) {
                var img = document.createElement('img');
                img.src = image;
                $cardsEl.append(img);
                spritesArr = [];
            } else {
                return;
            }
        })

    } else {
        $listEl.html(generateList())

    }
}