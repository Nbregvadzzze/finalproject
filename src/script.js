
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="';

const main = document.querySelector("#main");
const form = document.querySelector("#form");
const search = document.querySelector("#search");

getMovies(API_URL);

async function getMovies(url) {
  console.log(url);

  const res = await fetch(url);
  console.log(res);

  const data = await res.json();
  console.log(data.results);

  showMovies(data.results);
}

function showMovies(movies) {
  main.innerHTML = " ";

  movies.forEach((movie) => {
   
    const { title, overview, original_language, vote_average, poster_path } =
      movie;

    const movieEl = document.createElement("div");
 
    movieEl.classList.add("col-4");

    movieEl.innerHTML = `
                <div class="p-4">
                <div class="movies">
                  <img src="${IMG_PATH + poster_path}" >
                  <div class="movie_content_box">
                    <h3>${title}</h3>
                    <p>${overview}</p>
                    <p>${original_language}</p>
                    </div>
                    <span>
                      <p class="${getClassByVote(
                        vote_average
                      )}">${vote_average}</p>
                    </span>
                    </div>
                </div>
            `;

    main.appendChild(movieEl);

    movieEl.addEventListener("click", () => {
      localStorage.setItem("movie", JSON.stringify(movie));
      window.location = "movie.html";
    });
  });
}
function getClassByVote(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  console.log(searchTerm);

  if (searchTerm && searchTerm !== "") {
    getMovies(SEARCH_API + searchTerm);
    search.value = " ";
  } else {
    window.location.reload;
  }
});