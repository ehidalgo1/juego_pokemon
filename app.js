
let ataques_pokemon_1 = new Array();
let ataques_pokemon_2 = new Array();


document.getElementById('btn-versus').onclick = function (event) {
    event.preventDefault();

    let contenedor_img_pokemon_1 = document.getElementById('contenedor_img_pokemon_1');
    let contenedor_img_pokemon_2 = document.getElementById('contenedor_img_pokemon_2');

    contenedor_img_pokemon_1.setAttribute('hidden', true);
    contenedor_img_pokemon_2.setAttribute('hidden', true);

    let div_pokemon_1 = document.getElementById('pokemon_1');
    let div_pokemon_2 = document.getElementById('pokemon_2');
    div_pokemon_1.className = 'col-md-4 text-right';
    div_pokemon_2.className = 'col-md-4 text-left';

    let nombre_ataque = document.getElementById('nombre_ataque');
    let poder_ataque = document.getElementById('poder_ataque');
    nombre_ataque.innerText = '';
    poder_ataque.innerText = ''


    let imagen_versus = document.querySelector('.imagen-versus');

    imagen_versus.setAttribute('width', 70);
    imagen_versus.setAttribute('height', 70);

    let random_1 = Math.floor(Math.random() * 150) + 1;
    let random_2 = Math.floor(Math.random() * 150) + 1;

    let btn_ataque_1 = document.getElementById('btn_ataque_pokemon_1');
    let btn_ataque_2 = document.getElementById('btn_ataque_pokemon_2');

    btn_ataque_1.disabled = false;
    btn_ataque_2.disabled = false;

    llamarPrimerPokemon(random_1);
    llamarSegundoPokemon(random_2);

    imagen_versus.setAttribute('width', 100);
    imagen_versus.setAttribute('height', 100);


};




function llamarPrimerPokemon(valor) {

    let div_pokemon_1 = document.querySelector('#pokemon_1');
    let preloader = document.createElement('div');
    preloader.setAttribute('class', 'preloader');

    showLoader1();

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

            let contenedor_img_pokemon_1 = document.getElementById('contenedor_img_pokemon_1');

            hideLoader1();

            contenedor_img_pokemon_1.removeAttribute('hidden');


            //datos pokemon
            let datosPokemon = document.getElementById('datos_pokemon_1');
            datosPokemon.hidden = false;



            document.getElementById('btn_ataque_pokemon_1').addEventListener('click', function (e) {

                //haciendo el random para los movimientos
                let lista_ataques = pokemon.moves;

                let index = Math.floor(Math.random() * lista_ataques.length);

                let nombre_ataque = document.getElementById('nombre_ataque');
                nombre_ataque.innerText = '';
                nombre_ataque.innerText = lista_ataques[index].move.name;

                //url de ataque
                let url = lista_ataques[index].move.url;
                poderDeAtaque(url, e);



            });

        })
        .catch();

};

function llamarSegundoPokemon(valor) {

    let div_pokemon_2 = document.querySelector('#pokemon_2');
    let preloader = document.createElement('div');
    preloader.setAttribute('class', 'preloader');

    showLoader2();

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



            imagen.setAttribute('src', url_img);

            imagen.setAttribute('width', 300);
            imagen.setAttribute('height', 300);

            let contenedor_img_pokemon_2 = document.getElementById('contenedor_img_pokemon_2');

            hideLoader2();

            contenedor_img_pokemon_2.removeAttribute('hidden');



            //ataques
            ataques_pokemon_2 = pokemon.moves;


            //datos pokemon
            let datosPokemon = document.getElementById('datos_pokemon_2');
            datosPokemon.hidden = false;



            document.getElementById('btn_ataque_pokemon_2').addEventListener('click', function (e) {

                //haciendo el random para los movimientos
                let lista_ataques = pokemon.moves;

                let index = Math.floor(Math.random() * lista_ataques.length);

                let nombre_ataque = document.getElementById('nombre_ataque');
                nombre_ataque.innerText = '';
                nombre_ataque.innerText = lista_ataques[index].move.name;

                //url de ataque
                let url = lista_ataques[index].move.url;
                poderDeAtaque(url, e);

            });


        })
        .catch();

};


function poderDeAtaque(url, e) {

    showSpinner();
    let poder_ataque = document.getElementById('poder_ataque');
    poder_ataque.innerText = '';

    fetch(url)
        .then(resp => resp.json())
        .then(ataque => {

            poder_ataque.innerText = ataque.pp;
            let vida_total = 0;

            if (e.target.id === 'btn_ataque_pokemon_1') {

                let vida_pokemon_2 = document.getElementById('healt_pokemon_2');
                vida_total = vida_pokemon_2.innerText - ataque.pp;

                if (vida_total <= 0) {
                    vida_total = 0;
                    let btn_ataque_pokemon_2 = document.getElementById('btn_ataque_pokemon_2');
                    btn_ataque_pokemon_2.setAttribute('disabled', true);
                    let div_pokemon_2 = document.getElementById('pokemon_2');
                    div_pokemon_2.className = 'col-md-4 text-left bg-danger';
                }

                vida_pokemon_2.innerText = vida_total;

                console.log(vida_total);


            } else if(e.target.id === 'btn_ataque_pokemon_2') {

                let vida_pokemon_1 = document.getElementById('healt_pokemon_1');

                vida_total = vida_pokemon_1.innerText - ataque.pp;

                if (vida_total <= 0) {
                    vida_total = 0;
                    let btn_ataque_pokemon_1 = document.getElementById('btn_ataque_pokemon_1');
                    let div_pokemon_1 = document.getElementById('pokemon_1');
                    div_pokemon_1.className = 'col-md-4 text-right bg-danger';
                    btn_ataque_pokemon_1.setAttribute('disabled', true);
                }

                vida_pokemon_1.innerText = vida_total;

                console.log(vida_total);


            }

            hideSpinner();
        })

};


const spinner = document.getElementById("loader");
const loader_1 = document.getElementById("loader_1");
const loader_2 = document.getElementById("loader_2");

function showLoader1() {
    loader_1.className = "show";
    setTimeout(() => {
        loader_1.className = loader_1.className.replace("show", "");
    }, 5000);
}



function showLoader2() {
    loader_2.className = "show";
    setTimeout(() => {
        loader_2.className = loader_2.className.replace("show", "");
    }, 5000);
}

function hideLoader1() {
    loader_1.className = loader_1.className.replace("show", "");
}

function hideLoader2() {
    loader_2.className = loader_2.className.replace("show", "");
}

function showSpinner() {
    spinner.className = "show";
    setTimeout(() => {
        spinner.className = spinner.className.replace("show", "");
    }, 5000);
}

function hideSpinner() {
    spinner.className = spinner.className.replace("show", "");
}

