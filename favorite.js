const BASE_URL = 'https://webdev.alphacamp.io'
const INDEX_URL = BASE_URL + '/api/movies/'
const POSTER_URL = BASE_URL + '/posters/'

const movies = JSON.parse(localStorage.getItem('favoriteMovies')) || []

const dataPanel = document.querySelector('#data-panel')
const searchForm = document.querySelector('#search-form')
const searchInput = document.querySelector('#search-input')

function renderMovieList(data) {
  let rawHTML = ''

  data.forEach((item) => {
    // title, image, id
    rawHTML += `<div class="col-sm-3">
    <div class="mb-2">
      <div class="card">
        <img src="${POSTER_URL + item.image
      }" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">${item.title}</h5>
        </div>
        <div class="card-footer">
          <button class="btn btn-primary btn-show-movie" data-bs-toggle="modal" data-bs-target="#movie-modal" data-id="${item.id
      }">More</button>
          <button class="btn btn-danger btn-remove-favorite" data-id="${item.id
      }">x</button>
        </div>
      </div>
    </div>
  </div>`
  })

  dataPanel.innerHTML = rawHTML
}

function showMovieModle(id) {
  const movieTitle = document.querySelector('#movie-modal-title')
  const movieImage = document.querySelector('#movie-modal-image')
  const movieDate = document.querySelector('#movie-modal-date')
  const movieDescription = document.querySelector('#movie-modal-description')

  axios.get(INDEX_URL + id).then((response) => {
    const data = response.data.results
    movieTitle.innerText = data.title
    movieDate.innerText = 'Release date:' + data.release_date
    movieDescription.innerText = data.description
    movieImage.innerHTML = ` <img src="${POSTER_URL + data.image}" alt="movie-poster"
                class="img-fluid">`
  })
}

// function removeFromFavorite(id) {
//   const movieIndex = movies.findIndex((movie) => movie.id === id)
//   movies.splice(movieIndex, 1)
//   localStorage.setItem('favoriteMovies', JSON.stringify(movies))
//   renderMovieList(movies)
// }

function removeFromFavorite(id) {
  if (!movies || !movies.length) return
  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) return
  movies.splice(movieIndex, 1)
  localStorage.setItem('favoriteMovies', JSON.stringify(movies))
  renderMovieList(movies)
}

//listen to data panel
dataPanel.addEventListener('click', function onPanelClick(event) {
  if (event.target.matches('.btn-show-movie')) {
    showMovieModle(Number(event.target.dataset.id))
  } else if (event.target.matches('.btn-remove-favorite')) {
    removeFromFavorite(Number(event.target.dataset.id))
  }
})

renderMovieList(movies)