const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";

const main = document.getElementById("main");

const similar = document.getElementById("similar");


const movie = localStorage.getItem("movie");
console.log(JSON.parse(movie));

const movieData = JSON.parse(movie);


const movieDesc = document.createElement("div");

movieDesc.classList.add("container");

const clickBtn = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || []; 
  cart.push(movieData); 
  localStorage.setItem("cart", JSON.stringify(cart)); 
};

movieDesc.innerHTML = `
    <img src="${IMG_PATH + movieData.backdrop_path}">
      <div class="row mt-5">
        <div class="col-4">
          <img src="${IMG_PATH + movieData.poster_path}">
        </div>
        <div class="col-8">
          <h3 class="text-white">${movieData.title}</h3>
          <p class="text-white">${movieData.overview}</p>
          <p class="text-white">${movieData.original_language}</p>
          <p class="text-white">$ ${movieData.vote_average}</p>
          <button class="btn btn-primary" onclick=clickBtn() >add to cart</button>
        </div>
      </div>
`;

main.appendChild(movieDesc);


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
  similar.innerHTML = " ";

  const smallMovies = (movies = movies
    .sort(() => Math.random() - Math.random())

    .slice(0, 3));
  smallMovies.forEach((movie) => {
    
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
  
    similar.appendChild(movieEl);
    
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

const seats = [
  {
    id: 1,
    price: 10,
  },
  {
    id: 2,
    price: 10,
  },
  {
    id: 3,
    price: 10,
  },
  {
    id: 4,
    price: 10,
  },
  {
    id: 5,
    price: 10,
  },
  {
    id: 6,
    price: 10,
  },
  {
    id: 7,
    price: 10,
  },
  {
    id: 8,
    price: 10,
  },
  {
    id: 9,
    price: 10,
  },
];

// seat ზე დაფუძნებიტ უნდა გამოიტანო ვიზაულირად

// [ 1 ]  [ 2 ]  [ 3 ]
// [ 4 ]  [ 5 ]  [ 6 ]
// [ 7 ]  [ 8 ]  [ 9 ]

// დაჭერაზე უბრალოდ გადაიყვანეთ checkout გვერდზე რომელსაც ააწყობთ ადგილი ან იდ ს და ფასის შესაბამისად

/// დაჭრაზე ისევ localstraogeshი ჩააგდეთ ეგ ინფორმაცია და ააწყვეთ ახალი გვერდი checkout.html და იქ გამოიტანეთ ადგილი და ფილმის დასახელაბ

// 1) seats.forEach  და დახატე ყველა ადგილი

// 2)   movieEl.addEventListener("click", () => {
// აქედან ჩაემატა
//   localStorage.setItem("seats", JSON.stringify(seats));
//   // ახალ გვერდზე გადაგიყვანოს
//   window.location = "checkout.html";
// });

//3) /// რაც ამ გვერდში გვაქვს ეგ უნდა გამოიყენო უბრალოდ async function getMovies(url)  ესენი აღარ გამოიზძახოთ checkout ს გვერდზე

const cartBtn = document.querySelector("#cart");
const cartItems = document.querySelector("#cartItems");
const cartShowItems = document.createElement("div");
const sumItems = document.querySelector("#sumItem");
const showSumItems = document.createElement("div");

cartBtn.addEventListener("click", () => {
  cartItems.classList.toggle("active");
  console.log(cartBtn);
  const cart = JSON.parse(localStorage.getItem("cart"));

  const sum = cart.reduce((acc, item) => acc + item.vote_average, 0);
  console.log("sum", sum);
  const sumHTML = `<h1>ჯამი: ${sum}</h1>`;
  showSumItems.innerHTML = sumHTML;
  sumItems.appendChild(showSumItems);

  let cartContent = ""; 

  if (cart.length > 0) {
    cart.forEach((item, index) => {
      cartContent += `
        <div class="row">
          <div class="col-4">
            <img src="${IMG_PATH + item.poster_path}" alt="${item.title}" />
          </div>
          <div class="col-8">
            <h1>${item.title}</h1>
            <p>${item.vote_average}</p>
            <button class="btn btn-primary remove-btn" data-index="${index}">Remove from cart</button>
          </div>
        </div>
      `; 
    });
  } else {
    cartContent = `<h1>კალათა ცარიელია</h1>`;
  }
  cartShowItems.innerHTML = cartContent; 

  console.log("cartShowItems", cartShowItems);
  cartItems.appendChild(cartShowItems);

  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      cart.splice(index, 1); 
      localStorage.setItem("cart", JSON.stringify(cart)); 

    
      cartItems.removeChild(cartShowItems);
      cartShowItems.innerHTML = "";
      cart.forEach((item, index) => {
        cartShowItems.innerHTML += `
          <div class="row">
            <div class="col-4">
              <img src="${IMG_PATH + item.poster_path}" alt="${item.title}" />
            </div>
            <div class="col-8">
              <h1>${item.title}</h1>
              <p>${item.vote_average}</p>
              <button class="btn btn-primary remove-btn" data-index="${index}">Remove from cart</button>
            </div>
          </div>
        `;
      });
      cartItems.appendChild(cartShowItems);

     
      const newSum = cart.reduce((acc, item) => acc + item.vote_average, 0);
      showSumItems.innerHTML = `<h1>ჯამი: ${newSum}</h1>`;
    });
  });
});