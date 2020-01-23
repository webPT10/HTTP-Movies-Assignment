import React, { useState, useEffect } from "react";
import { Route, withRouter } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Forms/UpdateMovieForm";
import axios from "axios";

const App = props => {
  const [savedList, setSavedList] = useState([]);
  const [initialMovies, setInitialMovies] = useState([]);
  // [.then() response data set to useEffect, setInitialMovies]

  // usEffect -- axios.get() for current Movies
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(response => {
        console.log("GET", response);
        setInitialMovies(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  // updateMovie -- axios.put()
  const updateMovie = (id, movie) => {
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movie)
      .then(response => {
        const updatedMovie = response.data;
        const updatedMovies = initialMovies.map(currentMovie => {
          if (currentMovie.id !== updatedMovie.id) {
            return currentMovie;
          }
          return updatedMovie;
        });
        setInitialMovies(updatedMovies);
        props.history.push(`/movies/${id}`);
      })
      .catch(error => console.log(error));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  // deleteMovie -- axios.delete()
  const deleteMovie = (id) => {
    axios 
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then(response => {
        setInitialMovies(response.data);
        props.history.replace(`/movies`)
      })
      .catch(error => console.log('DELETE > ', error))
  }

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} deleteMovie={deleteMovie} />;
        }}
      />
      <Route
        path="/update-movie/:id"
        render={props => {
          return (
            <UpdateMovieForm
              {...props}
              initialMovies={initialMovies}
              setInitialMovies={setInitialMovies}
              updateMovie={updateMovie}
            />
          );
        }}
      />
    </>
  );
};

export default withRouter(App);
