import React, { useState, useEffect } from "react";
import axios from "axios";

// initialMovies & setInitialMovies i.e. initial DATA >> passed down as props from App.js

const UpdateMovieForm = props => {
  console.log(
    "Props from App.js-useEffect to UpdateMovieForm component",
    props
  );

  // STATE
  const newMovie = {
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: []
  };
  const [movie, setMovie] = useState(newMovie);

  useEffect(() => {
    const id = props.match.params.id;
    const movieToEdit = props.initialMovies.find(movie => `${movie.id}` === id);
    if (movieToEdit) {
      setMovie(movieToEdit);
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
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(response => {
        console.log('PUT', response);
        props.setInitialMovies([...props.initialMovies, response.data]);
        props.history.push("/update-movie/${movie.id}");
      })
      .catch(error => console.log("No", error));
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
