//alert('Js is working');

//Constants
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';


//Variables
let pokemonData, pokemonDetail;
let pokemonTeam = [];
let spritesArr = [];
let allTypes = [];
let nextUrl = 0;

//Caches Element References
const $listEl = $('#pokemon-list');
const $cardsEl = $('#cards');
const $namesEl = $('#names');
const $typeEl = $('#type');
const $nextEl = $('#nxt-btn');
const $previousEl = $('#prev-btn');
//const $input = $('input[type="text"]');

//Event Listeners
$listEl.on('click', 'li', handleClick)
$nextEl.on('click', handleNext); 
$previousEl.on('click', handlePrevious); 
//$('form').on('submit', searchResult); 
//Functions 

init();

function init() {
    getData();
}

function getData(detailURL) {
    const url = detailURL ? detailURL : BASE_URL + '?offset=' + nextUrl;

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
    console.log(url);
    getData(url);

}

function handleNext() {
    //const url = pokemonData.next; 
    
    nextUrl += 20;
    getData(); 
    console.log(nextUrl)
    //getData(url); 
    //need to render the next list to the screen
}

function handlePrevious() {
    if(nextUrl > 0) {
        nextUrl -= 20; 
        getData(); 
    }
}

// function searchResult() {
//     userInput = $input.val(); 
//     $.ajax({url: BASE_URL + userInput
//     }).then((data) => {
//         inputData = data; 
//     }
//     );
// }


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
        } else {
            return;
        }
        //Gather all of the type data in one array
        pokemonTeam.forEach(function (pokemon) {
            pokemon.forEach(function (typeStat) { 
                allTypes.push(typeStat.type.name);
                if (pokemonTeam.length === 6) {
                    $typeEl.append(`<br> ${allTypes.pop()} <br>`);
                }
                
            });

        });

        //save sprite data in an array
        let pokeSprite = pokemonDetail.sprites.front_default;
        spritesArr.push(pokeSprite);
        //render individual sprites to the screen 
        spritesArr.forEach(function (image) {
            if (pokemonTeam.length < 7) {
                var img = document.createElement('img');
                img.src = image;
                $cardsEl.append(img);
               
                $namesEl.text(`You just added: ${pokemonDetail.name}`);
                console.log($namesEl)
                spritesArr = [];
            } else {
                return;
            }
        })
    

    } else {
        $listEl.html(generateList());
       // $listEl.html(renderNext());
       
    }
}