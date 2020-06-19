import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import {API} from '../api_services'
import {useCookies} from 'react-cookie';


function MovieList(props){
    const movies = props.movies;
    const [token] = useCookies(['mrtoken']);


    const editClicked = movie => {
        props.editClicked(movie);
    }

    const removeClicked = movie =>{
        API.deleteMovie(movie.id, token['mrtoken'])
        .then(() => props.removeClicked(movie))
        .catch(error => console.log())   
    }
    return(
        <div>
            {movies && movies.map(movie=>{
                return(
                <div className="movie_item" key={movie.id}>
                    <h2 onClick={evt=>props.movieClicked(movie)} >{movie.title}  </h2>
                    <FontAwesomeIcon icon={faEdit} onClick={() =>editClicked(movie)}/>
                    <FontAwesomeIcon icon={faTrash} onClick={() =>removeClicked(movie)}/>
                </div>
                )
            })}
        </div>
    )
}

export default MovieList;