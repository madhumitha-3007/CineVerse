const apiKey = "f5863e8d"; // your API key

const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const moviesDiv = document.getElementById("movies");
const infoText = document.getElementById("infoText");

// Search on button click
searchBtn.onclick = searchMovies;

// Search on Enter key
searchInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchMovies();
  }
});

function searchMovies() {
  const query = searchInput.value.trim();
  if (query === "") {
    alert("Please enter a movie name");
    return;
  }

  moviesDiv.innerHTML = "";
  infoText.textContent = "Loading movies...";

  fetch(`https://www.omdbapi.com/?s=${query}&apikey=${apiKey}`)
    .then(res => res.json())
    .then(data => {
      if (data.Search) {
        infoText.textContent = `Found ${data.Search.length} movies`;
        displayMovies(data.Search);
      } else {
        infoText.textContent = "No movies found.";
      }
    })
    .catch(() => {
      infoText.textContent = "Error fetching data!";
    });
}

function displayMovies(movies) {
  moviesDiv.innerHTML = "";
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  movies.forEach(movie => {
    const alreadyAdded = watchlist.some(m => m.id === movie.imdbID);

    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'img/placeholder.png'}"
             class="card-img-top" alt="${movie.Title}">
        <div class="card-body">
          <h5 class="card-title">${movie.Title}</h5>
          <p class="card-text">${movie.Year}</p>
          <button class="btn ${alreadyAdded ? 'btn-secondary' : 'btn-success'}"
                  ${alreadyAdded ? 'disabled' : ''}
                  onclick="addToWatchlist('${movie.imdbID}','${movie.Title}','${movie.Year}','${movie.Poster}')">
            ${alreadyAdded ? 'Added ✓' : 'Add to Watchlist'}
          </button>
        </div>
      </div>`;
    moviesDiv.appendChild(col);
  });
}

function addToWatchlist(id, title, year, poster) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

  if (!watchlist.some(m => m.id === id)) {
    watchlist.push({ id, title, year, poster });
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    searchMovies(); // refresh buttons
  }
}
