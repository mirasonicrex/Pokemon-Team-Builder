//alert('Js is working');

//Constants
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon'; 


//Variables
let pokemonData; 

//Caches Element References
const $list = $('#pokemon-list'); 

//Event Listeners

//Functions 

init(); 

function init() {
    getData();
}

function getData() {

    $.ajax(BASE_URL) 
    .then(function(data) {
        console.log('Data: ', data);   
    }, function(error) {
        console.log('Error: ', error); 
    });

}