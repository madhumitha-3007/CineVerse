const watchlistDiv = document.getElementById("watchlist");
const clearBtn = document.getElementById("clearBtn");

// Load watchlist on page load
function loadWatchlist() {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlistDiv.innerHTML = "";

  if (watchlist.length === 0) {
    watchlistDiv.innerHTML = "<p class='text-muted'>Your watchlist is empty.</p>";
    clearBtn.style.display = "none";
    return;
  }

  clearBtn.style.display = "block";

  watchlist.forEach((movie, index) => {
    const col = document.createElement("div");
    col.className = "col-md-3 mb-4";
    col.innerHTML = `
      <div class="card h-100">
        <img src="${movie.poster !== "N/A" ? movie.poster : 'img/placeholder.png'}" class="card-img-top" alt="${movie.title}">
        <div class="card-body">
          <h5 class="card-title">${movie.title}</h5>
          <p class="card-text">${movie.year}</p>
          <button class="btn btn-danger" onclick="removeFromWatchlist(${index})">Remove</button>
        </div>
      </div>`;
    watchlistDiv.appendChild(col);
  });
}

// Remove movie
function removeFromWatchlist(index) {
  let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  watchlist.splice(index, 1);
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  loadWatchlist();
}

// Clear watchlist
clearBtn.onclick = () => {
  if (confirm("Are you sure you want to clear the watchlist?")) {
    localStorage.removeItem("watchlist");
    loadWatchlist();
  }
}

window.onload = loadWatchlist;
