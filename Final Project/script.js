"use ctrict";
// const apikey = '';
let url = 'https://api.vokino.tv/v2/list?sort=rating&type=movie&page=1';
const cont = document.querySelector('.container');

async function fetchMovies() {
    const response = await fetch(url);
    const data = await response.json();
    displayMovies(data.channels);
}

// Функция для отображения списка фильмов
function displayMovies(movies) {
    const moviesElement = document.querySelector('.container');
    moviesElement.innerHTML = '';
    
    movies.forEach(movie => {
        const card = document.createElement('div');
        card.className = 'card';
        const movieImage = document.createElement('div');
        movieImage.className = 'movies';
        const img = document.createElement('img');
        img.src = movie.details.poster;
        img.alt = movie.title;
        movieImage.appendChild(img);

        const info = document.createElement('div');
        info.className = 'info';
        const title = document.createElement('span');
        title.className = 'title';
        title.innerHTML = `<p>Title:\t </p>${movie.details.name}`;

        const year = document.createElement('span');
        year.className = 'year';
        // year.innerHTML = `<p>Year: </p>${new Date(movie.details.release_date).getFullYear()}`;
        year.innerHTML = `<p>Year:\t </p>${movie.details.released}`;

        const renge = document.createElement('span');
        renge.className = 'renge';
        renge.innerHTML = `<p>Renge:\t </p>${movie.details.genre}`;

        const rating = document.createElement('span');
        rating.className = 'rating';
        rating.innerHTML = `<p>Rating:\t </p>${movie.details.rating_imdb}`;

        const id = document.createElement('span');
        id.className = 'id';
        id.innerHTML = `<p>IdMovies:\t </p>${movie.details.id}`;

        info.appendChild(title);
        info.appendChild(year);
        info.appendChild(renge);
        info.appendChild(rating);
        info.appendChild(id);
        card.appendChild(movieImage);
        card.appendChild(info);
        moviesElement.appendChild(card);

    });
}

// Функция для поиска фильмов
async function searchMovies(event) {
    const search = event.value;
    if(search.length>=3){
        url = 'https://api.vokino.tv/v2/list?sort=rating&type=movie&name='+search;
        await fetchMovies();
        document.querySelector('#searchID').value = "";
    }else{
        alert('Введите название для поиска, минимум 3 буквы!');
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const elem = document.getElementById('searchID');
    elem.addEventListener('keypress', (event) => {
        if (event.key === "Enter"){
            searchMovies(elem);
        }
    });
});

fetchMovies();