//ეს არის ერთი გვერდის ჩატვირთვისთვის

// გავამზადეთ აპი ინფორაციები რაებიც გვჭირდბეოდა
const IMG_PATH = "https://image.tmdb.org/t/p/w1280/";
const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
// აქ წამოვიღეთ ყველა ელემენტი რომელიც ჰტმლ ში იჯდა რომელზეც დამუშავება გვინდოდა რომ გაგვეკეთებინა
const main = document.getElementById("main");

const similar = document.getElementById("similar");

// აქ ლოკალურ მონაცეამთა ბაზიდან ამოვიღეთ ინორმაცია
const movie = localStorage.getItem("movie");
console.log(JSON.parse(movie));
// შემოსული ინფორმაცია თავიდან არის სტრქინგი და მაგის გამო json.parse მეთოდით გავხადეთ ობიექტად
const movieData = JSON.parse(movie);

// ახალი დივი შევქმენით
const movieDesc = document.createElement("div");
// კლასი რომლეიც არის bootstrap კლასი
movieDesc.classList.add("container");

// ამ ობქიეტის ქონის გამო პირდპაირ შემიძლია movieDAta.ნებისმიერი პარამტერი რაცაა მაგის გამახება
// და რადგანაც მასივი არაა არც foreach მჭირდება და არც map
// აქედან დავხატეთ უქვე ერტი ფილმის აღწერა
const clickBtn = () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || []; // Retrieve existing cart items or initialize an empty array
  cart.push(movieData); // Add the new item to the cart array
  localStorage.setItem("cart", JSON.stringify(cart)); // Store the updated cart back in local storage
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

// on btn click add item to localstorage

// main დივში შვილებად ჩავ უგდეთ დახატული იფორმაცია
main.appendChild(movieDesc);

// დამატებით მოგვინდა რო 3 ელემენტი გამოჩნდეს რომლებიც არის მსგავსი ფილმები

// // პარამეტრად გადავაწოდეთ აპი
getMovies(API_URL);
// ასიქნრონული ფუნქცია იმისთვის რომ აპის ფეჩინგი გავაკეთოთ
// ასიქნრონულობას ვიყენებთ იმისთვის როცა სხვა მსიამართიდან ვიღებთ რამე ინფორამციას
// დროი რო ჭირდება ჩასატვირთად მაგისთვის გვინდა რო დალოდება (await) გამოვიძახოთ
// იქამდე დაელოდოს სანამ ყველაფერს არ ჩატვირთავს
async function getMovies(url) {
  console.log(url);

  // მისამართიდან მოაქვს ინფორამცია
  const res = await fetch(url);
  console.log(res);

  // ამას გადაყავს წამოღებული დატა ჯსონ ფორმატში
  const data = await res.json();
  console.log(data.results);

  // აქ ვაწყვდით პარამეტრად ჯსონ ფორმატის ელემენტებს
  // ეს მოდის როგორც
  // [
  //   {
  //     adult: false,
  //     backdrop_path: "/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
  //     genre_ids: [28, 12, 53, 878],
  //     id: 460465,
  //   },
  //    {
  //     adult: false,
  //     backdrop_path: "/6MKr3KgOLmzOP6MSuZERO41Lpkt.jpg",
  //     genre_ids: [28, 12, 53, 878],
  //     id: 460465,
  //   },
  // ]
  showMovies(data.results);
}
function showMovies(movies) {
  similar.innerHTML = " ";

  // აქ ახალი ცვლდაით ჩვენ გამოვიყენეთ math.rand რომელიც მოცემული მასივიდან 0-20 მდე ინდექსებს
  // შემთხვევითობის მეთოდით ალაგებს (012345 => 234612)
  const smallMovies = (movies = movies
    .sort(() => Math.random() - Math.random())
    // აქ შმთხვევითობით გადაცვლილ ინდექსებიდან მხოლოდ 3 ელემენტს იღებს
    .slice(0, 3));
  // დაგვჭირდა რო შეგვეცვალა foreEach ელემენტის მასივი და მიგვეწოდებინა ახალი smallMovies მასივი
  smallMovies.forEach((movie) => {
    // წინასწარ რა ელემენტებიც იქნებოდა ობიექტში ჩასმული რაც მოდიოდა აპი დან
    // წინასწარ შევქმენით ცვლადები რო აღარ დაგვეწერა movie.title
    const { title, overview, original_language, vote_average, poster_path } =
      movie;
    // ეს ქმნის div ელემენტს
    const movieEl = document.createElement("div");
    // ეს div ელემენტს უქმნის class col-4 ს
    movieEl.classList.add("col-4");
    // აქედან ვახდენთ დახატვას რო თითოეული ელემენტი როგორ გამოვიდეს
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
    // ამით გამოძახებულ main დივს შიგნით შვილებად ვუმატებთ ყველა ელემენტს რომელიც ზემოით დავხატეთ
    similar.appendChild(movieEl);
    // დაჭერაზე ვქმნით ევენთს რომლეიც ბრაუზერის ლოკალურ მონაცემთა ბაზაში ამატებს ერთ ობიექტს
    // რომეზეც დაჭრას ვახდენთ
    movieEl.addEventListener("click", () => {
      // აქედან ჩაემატა
      localStorage.setItem("movie", JSON.stringify(movie));
      // ახალ გვერდზე გადაგიყვანოს
      window.location = "movie.html";
    });
  });
}

// ფუნქცია რომლეიც პარამეტრად იღებს vote_average რომ ფერების კონტროლი ქონდეს
function getClassByVote(vote) {
  if (vote >= 7) {
    return "green";
  } else if (vote >= 5) {
    return "yellow";
  } else {
    return "red";
  }
}

// აქ უნდა შექმნათ ახალი ობიექტი თქვნეი ხლეით დაახლოებით უნდა იყოს

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

  // from cart array get only vote_average and sum them
  const sum = cart.reduce((acc, item) => acc + item.vote_average, 0);
  console.log("sum", sum);
  const sumHTML = `<h1>ჯამი: ${sum}</h1>`;
  showSumItems.innerHTML = sumHTML;
  sumItems.appendChild(showSumItems);

  let cartContent = ""; // Initialize an empty string to accumulate the HTML content

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
      `; // Modify this line to display the desired information for each item
    });
  } else {
    cartContent = `<h1>კალათა ცარიელია</h1>`;
  }
  cartShowItems.innerHTML = cartContent; // Assign the accumulated HTML content to cartShowItems

  console.log("cartShowItems", cartShowItems);
  cartItems.appendChild(cartShowItems);

  // Add event listeners to the "Remove from cart" buttons
  const removeButtons = document.querySelectorAll(".remove-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = parseInt(button.getAttribute("data-index"));
      cart.splice(index, 1); // Remove the item from the cart array
      localStorage.setItem("cart", JSON.stringify(cart)); // Update the cart in localStorage

      // Refresh the cart display
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

      // Recalculate the sum
      const newSum = cart.reduce((acc, item) => acc + item.vote_average, 0);
      showSumItems.innerHTML = `<h1>ჯამი: ${newSum}</h1>`;
    });
  });
});