
let ataques_pokemon_1 = new Array();
let ataques_pokemon_2 = new Array();


document.getElementById('btn-versus').onclick = function (event) {
    event.preventDefault();

    let imagen_versus = document.querySelector('.imagen-versus');

    imagen_versus.setAttribute('width', 70);
    imagen_versus.setAttribute('height', 70);

    let random_1 = Math.floor(Math.random() * 150) + 1;
    let random_2 = Math.floor(Math.random() * 150) + 1;

    llamarPrimerPokemon(random_1);
    llamarSegundoPokemon(random_2);

    imagen_versus.setAttribute('width', 100);
    imagen_versus.setAttribute('height', 100);
    

};




function llamarPrimerPokemon(valor) {

    let div_pokemon_1 = document.querySelector('#pokemon_1');
    let preloader = document.createElement('div');
    preloader.setAttribute('class', 'preloader');

    fetch('https://pokeapi.co/api/v2/pokemon/' + valor + '/')
        .then(respuesta => respuesta.json())
        .then(pokemon => {


            //nombre pokemon
            let nombre = pokemon.name;
            let tituloNombre = document.getElementById('nombre-pokemon-1');
            tituloNombre.innerHTML = nombre.toUpperCase();

            //imagen pokemon
            let url_img = pokemon.sprites.front_default;

            //healt pokemon
            let healt = pokemon.stats[0].base_stat;
            let span_healt = document.getElementById('healt_pokemon_1');

            span_healt.innerText = healt;

            let imagen = document.querySelector('#img-pokemon-1')

            imagen.setAttribute('src', url_img);

            imagen.setAttribute('width', 300);
            imagen.setAttribute('height', 300);

            //datos pokemon
            let datosPokemon = document.getElementById('datos_pokemon_1');
            datosPokemon.hidden = false;

            document.getElementById('btn_ataque_pokemon_1').onclick = function(){

                //haciendo el random para los movimientos
                let lista_ataques = pokemon.moves;

                let index = Math.floor(Math.random() * lista_ataques.length);

                let nombre_ataque = document.getElementById('nombre_ataque');
                nombre_ataque.innerText = '';
                nombre_ataque.innerText = lista_ataques[index].move.name;

                //url de ataque
                let url = lista_ataques[index].move.url;
                poderDeAtaque(url);

            };

        })
        .catch();

};

function llamarSegundoPokemon(valor) {

    let div_pokemon_2 = document.querySelector('#pokemon_2');
    let preloader = document.createElement('div');
    preloader.setAttribute('class', 'preloader');


    fetch('https://pokeapi.co/api/v2/pokemon/' + valor + '/')
        .then(respuesta => respuesta.json())
        .then(pokemon => {

            //nombre pokemon
            let nombre = pokemon.name;
            let tituloNombre = document.getElementById('nombre-pokemon-2');
            tituloNombre.innerHTML = nombre.toUpperCase();

            //imagen pokemon
            let url_img = pokemon.sprites.front_default;

            //healt pokemon
            let healt = pokemon.stats[0].base_stat;
            let span_healt = document.getElementById('healt_pokemon_2');
            let span_attack = document.getElementById('attack_pokemon_2');
            span_healt.innerText = healt;

            let imagen = document.querySelector('#img-pokemon-2')

            //ataques
            ataques_pokemon_2 = pokemon.moves;

            imagen.setAttribute('src', url_img);

            imagen.setAttribute('width', 300);
            imagen.setAttribute('height', 300);

            //datos pokemon
            let datosPokemon = document.getElementById('datos_pokemon_2');
            datosPokemon.hidden = false;

            document.getElementById('btn_ataque_pokemon_2').onclick = function(){

                //haciendo el random para los movimientos
                let lista_ataques = pokemon.moves;

                let index = Math.floor(Math.random() * lista_ataques.length);

                let nombre_ataque = document.getElementById('nombre_ataque');
                nombre_ataque.innerText = '';
                nombre_ataque.innerText = lista_ataques[index].move.name;

                //url de ataque
                let url = lista_ataques[index].move.url;
                poderDeAtaque(url);

            };


        })
        .catch();

};


function poderDeAtaque(url){

    showSpinner();
    let poder_ataque = document.getElementById('poder_ataque');
    poder_ataque.innerText = '';

    fetch(url)
    .then(resp => resp.json())
    .then(ataque => {

        poder_ataque.innerText = ataque.pp;
        hideSpinner();
    })

};


const spinner = document.getElementById("loader");

function showSpinner() {
  spinner.className = "show";
  setTimeout(() => {
    spinner.className = spinner.className.replace("show", "");
  }, 5000);
}

function hideSpinner() {
  spinner.className = spinner.className.replace("show", "");
}

