//Constants
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';


//Variables
let pokemonData, pokemonDetail;
let pokemonTeam = [];
let spritesArr = [];
let allTypes = [];
let changeUrl = 0;

//Caches Element References
const $listEl = $('#pokemon-list');
const $cardsEl = $('#cards');
const $namesEl = $('#names');
const $typeEl = $('#type');
const $nextEl = $('#nxt-btn');
const $previousEl = $('#prev-btn');
const $resetEl = $('#reset-btn');
//const $input = $('input[type="text"]');

//Event Listeners
$listEl.on('click', 'li', handleClick)
$nextEl.on('click', handleNext);
$previousEl.on('click', handlePrevious);
$resetEl.on('click', handleReset);
//Functions 

init();

function init() {
    getData();
}

function getData(detailURL) {
    const url = detailURL ? detailURL : BASE_URL + '?offset=' + changeUrl;

    $.ajax(url)
        .then(function (data) {
            if (detailURL) {
                pokemonDetail = data;
                render(true);
            } else {
                pokemonData = data;
                render();
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
    changeUrl += 20;
    getData();
}

function handlePrevious() {
    if (changeUrl > 0) {
        changeUrl -= 20;
        getData();
    }
}

function handleReset() {
    $cardsEl.empty();
    $typeEl.empty();
    pokemonTeam = [];
    spritesArr = [];

    getData();

}

// function searchResult() { TO IMPLEMENT LATER
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

function handleTypes() {
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
            spritesArr = [];
        } else {
            return;
        }
    })
}


function render(isDetail) {
    if (isDetail) {

        handleTypes();

    } else {
        $listEl.html(generateList());
    }
}