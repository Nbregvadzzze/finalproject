const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(API_URL);

async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = '';

  movies.forEach((movie) => {
    const { id, title, poster_path, vote_average, overview } = movie;
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}" data-movie-id="${id}">
      <div class="movie-info">
        <h3>${title}</h3>
        <span>${vote_average}</span>
      </div>
    `;

    const qwerty = document.querySelector("#qwerty")
    qwerty.style.display="none"
    const qw = document.querySelector("#qw")
    qw.style.display=""
  
    movieEl.addEventListener('click', () => {
      showMovieDetails(id, title, poster_path, overview, vote_average);
      qwerty.style.display=[]
      qw.style.display="none"
    });

    main.appendChild(movieEl);
  });
}

async function showMovieDetails(id, title, poster_path, overview, vote_average) {
  main.innerHTML = '';

  const movieDetailsEl = document.createElement('div');
  movieDetailsEl.classList.add('movie-details');

  const trailerURL = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=3fd2be6f0c70a2a598f084ddfb75487c`;
  const res = await fetch(trailerURL);
  const trailerData = await res.json();
  const trailers = trailerData.results;

  const officialTrailers = trailers.filter(trailer => trailer.type === 'Trailer' && trailer.site === 'YouTube');


  if (officialTrailers.length > 0) {
    const firstTrailer = officialTrailers[0];
    const trailerHTML = `
      <div class=videoSize>
        <iframe src="https://www.youtube.com/embed/${firstTrailer.key}" frameborder="0" autoplay allowfullscreen></iframe>
      </div>
    `;

    movieDetailsEl.innerHTML = `
      <div class="qwqw container justify-content-between d-flex">
        <div class="col-3">
          <img src="${IMG_PATH + poster_path}" alt="${title}">
        </div>
        <div class="col-8 movie-infotkt">
          <h2>${title}</h2>
          <span>IMDB: ${vote_average}</span>
          <p>${overview}</p>
        
          <h3>Trailer:</h3>
          ${trailerHTML}
        
        </div>
      </div>
    `;
  } else {
    movieDetailsEl.innerHTML = `
      <div class="qwqw container justify-content-between d-flex">
        <div class="col-3">
          <img src="${IMG_PATH + poster_path}" alt="${title}">
        </div>
        <div class="col-8 movie-infotkt">
          <h2>${title}</h2>
          <span>IMDB: ${vote_average}</span>
          <p>${overview}</p>
          <p>No official trailer found.</p>
        </div>
      </div>
    `;
  }
  const backButton = document.createElement('button');
  backButton.innerText = 'უკან დაბრუნება';
  backButton.classList.add('back-button');
  backButton.addEventListener('click', () => {
    getMovies(API_URL);
  });

  movieDetailsEl.appendChild(backButton);
  main.appendChild(movieDetailsEl);
}
const todayButton = document.getElementById('today-button');
const tomorrowButton = document.getElementById('tomorrow-button');

todayButton.addEventListener('click', () => {
  const todayAPI_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
  getMovies(todayAPI_URL);
});

tomorrowButton.addEventListener('click', () => {
  const tomorrowAPI_URL =  'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=2'
  getMovies(tomorrowAPI_URL);
});

