import React, {useState, useEffect} from 'react';
import './App.css';
import MovieList from './components/movie_list'
import MovieDetails from './components/movie_details'
import MovieForm from './components/movie_form'
import {useCookies} from 'react-cookie';
import { faFilm } from '@fortawesome/free-solid-svg-icons'
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useFetch } from './hooks/useFetch'


function App(){
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [editedMovie, setEditedMovie] = useState(null);
  const [token, setToken, removeToken] = useCookies(['mrtoken']);
  const [data, loading, error] = useFetch();

  useEffect(()=>{
    setMovies(data);
  }, [data])

  useEffect(()=>{
    if(!token['mrtoken']) window.location.href='/'
  }, [token])
  
  const loadMovie = movie => {
    setSelectedMovie(movie);
    setEditedMovie(null);
  }

  const editClicked = movie => {
    setEditedMovie(movie);
    setSelectedMovie(null);
  }

  const removeClicked = movie => {
    const newMovies = movies.filter( mov => mov.id !== movie.id);
    setMovies(newMovies);
  }

  const updateMovie = movie => {
    const newMovies = movies.map( mov => {
      if(mov.id === movie.id){
        return movie
      }
      return mov;
    })
    setMovies(newMovies);
  }

  const newMovie = () => {
    setEditedMovie({title : '', description: ""});
    setSelectedMovie(null);
  }

  const movieCreated = movie => {
    const newMovies = [...movies, movie];
    setMovies(newMovies)
  }

  const logoutUser = () =>{
    console.log('remove');
    removeToken('mrtoken', {path: '/' });
}
  if(loading) return <h1>Loading...</h1>
  if(error) return <h1>Error loading movies: {error}</h1>
  
  return(
      <div className="App">
        <header className="App-header">
          <h1>
            <FontAwesomeIcon icon={faFilm}/>
            <span>Movie Rater</span>
          </h1>
        <FontAwesomeIcon icon={faSignOutAlt} onClick={logoutUser}/>
        </header>
        <div className="layout">
          <div>
            <MovieList 
            movies={movies} 
            movieClicked={loadMovie}
            editClicked={editClicked}
            removeClicked={removeClicked}
            selectedMovie={selectedMovie}
            />
            <button onClick={newMovie}> New Movie</button>
          </div>
          <MovieDetails movie={selectedMovie} updateMovie={loadMovie}>
            </MovieDetails>
          {editedMovie? <MovieForm movie={editedMovie} updateMovie={updateMovie} movieCreated={movieCreated}></MovieForm> : null}
        </div>
     </div>
    );
}



export default App;
