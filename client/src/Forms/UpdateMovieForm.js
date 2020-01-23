import React, { useState, useEffect } from "react";
import axios from "axios";

const newMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: []
};

const UpdateMovieForm = props => {
  // initialMovies & setInitialMovies >> passed as props from App.js
  console.log(props)

  const [movie, setMovie] = useState([newMovie])
  console.log(movie)
  console.log(props.initialMovies)
  console.log(props.match.params) // param should be called id

  useEffect(() => { 
    console.log(props)
    const editingMovie = props.initialMovies.find(movie => {
      return movie.id === Number(props.match.params.id)
    });
    if(editingMovie){
      setMovie(editingMovie);
    }
  }, [props.initialMovies, props.match.params]);

const handleChange = (event) => {
  event.persist();
  let value = event.target.value;
  setMovie({ ...movie, [event.target.name]: value})
}
  // has axios.put()
  const handleSubmit = event => {
    event.preventDefault();
    const id = Number(props.match.params.id)
    props.updateMovie(id, movie)
  };

  return (
    <div>
      <h4>Edit Movie</h4>
      <form onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Title" value={movie.title} onChange={handleChange} />
        <input name="director" type="text" placeholder="Director" value={movie.director} onChange={handleChange} />
        <input name="metascore" type="number" placeholder="Metascore" value={movie.metascore} onChange={handleChange} />
        <input name="stars" type="text" placeholder="Stars" value={movie.stars} onChange={handleChange} />
        <button type="submit">Edit Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
