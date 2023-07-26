const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__image');
const pokemonForm = document.querySelector('.form');
const inputSearch = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');
const buttonInfo = document.querySelector('.btn-info');

const pokemonInfosAbilities = document.querySelector('.list-abilities');
const moreDetails = document.querySelector('.details');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
    );

    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Loading...';
    pokemonNumber.innerHTML = '';
    let data = await fetchPokemon(pokemon);

    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src =
            data['sprites']['versions']['generation-v']['black-white'][
                'animated'
            ]['front_default'];
        searchPokemon = data.id;
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
};

const detailPokemons = async (pokemon) => {
    let data = await fetchPokemon(pokemon);

    if (data) {
        createListDetailsAbilitiesPokemons(data);
    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'Not found :c';
        pokemonNumber.innerHTML = '';
    }
};

const createListDetailsAbilitiesPokemons = async (data) => {
    let mapDetails = data['abilities'];
    let createListDetailsAbilities;
    let detailsAbilities;

    mapDetails.map((element) => {
        createListDetailsAbilities = document.createElement('li');
        createListDetailsAbilities.classList.add('details__nameAbilities');
        detailsAbilities = document.createTextNode(element.ability.name);
        createListDetailsAbilities.appendChild(detailsAbilities);
        pokemonInfosAbilities.appendChild(createListDetailsAbilities);
    });
};

pokemonForm.addEventListener('submit', (evento) => {
    evento.preventDefault();
    renderPokemon(inputSearch.value.toLowerCase());
    inputSearch = '';
});

buttonPrev.addEventListener('click', (evento) => {
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', (evento) => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
});

buttonInfo.addEventListener('click', (evento) => {
    detailPokemons(searchPokemon);
});

renderPokemon(searchPokemon);
