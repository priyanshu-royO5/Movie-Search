const searchform = document.querySelector('form');
const movieCont = document.querySelector('.movie_cont');
const inputBox = document.querySelector('.inputBox');

//Function to fetch movie details using OMDb API
const getMovieInfo = async (movie)=>{

  try {
    const myApiKey = "7eb419c9"
    const url = `http://www.omdbapi.com/?apikey=${myApiKey}&t=${movie}`;

    const response = await fetch(url);
    if(!response.ok){
      throw new Error("Unable to fetch movie data");
    }
    const data = await response.json();
  
    showMovieData(data);
  } catch (error) {
    showErrorMsg("No Movie Found!!!");
  }

  
}

//Function to show movie data
const showMovieData = (data) =>{
  //This removes all the previous data shown on the desktop of the previous movies searched
  movieCont.innerHTML="";
  movieCont.classList.remove('noBackground');
  //All the required properties are extracted from the data object through destructuring
  const {Title, imdbRating,Genre,Released,Runtime,Actors,Plot,Poster} = data;

  const movieElement = document.createElement('div');
  movieElement.classList.add('movie_info');
  movieElement.innerHTML = 
  `
  <h2>${Title}</h2>
  <p><strong>Rating:<strong> ${imdbRating}&#11088</p>
  `

  const movieGenreElement = document.createElement('div');
  movieGenreElement.classList.add('movie_genre');
  Genre.split(",").forEach(element => {
    const p = document.createElement('p');
    p.innerText = element;
    movieGenreElement.appendChild(p)
  });

  movieElement.appendChild(movieGenreElement);

  movieElement.innerHTML += 
  `
  <p><strong>Released:<strong> ${Released}</p>
  <p><strong>Duration:<strong> ${Runtime}</p>
  <p><strong>Cast:<strong> ${Actors}</p>
  <p><strong>Plot:<strong> ${Plot}</p>
  `

  // Creating a div for movie poster
  const moviePosterElement = document.createElement('div');
  moviePosterElement.classList.add('movie_poster')
  moviePosterElement.innerHTML = `<img src="${Poster}"></img>`

  movieCont.appendChild(moviePosterElement);
  movieCont.appendChild(movieElement);
}
// Function to display error
const showErrorMsg = (message) =>{
  movieCont.innerHTML=`<h2>${message}</h2>`;
  movieCont.classList.add('noBackground');
}

// Funtion for form submission
const handleFormSubmission=(e)=>{
  e.preventDefault();
  const movieName = inputBox.value.trim();
  if (movieName !== "") {
    showErrorMsg("Fetching Information!!!")
    getMovieInfo(movieName);
  }
  else{
   showErrorMsg("Enter movie name first");
   movieCont.classList.remove('noBackground');
  }
}

searchform.addEventListener('submit',handleFormSubmission);