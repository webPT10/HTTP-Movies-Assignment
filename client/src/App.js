import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import UpdateMovieForm from "./Forms/UpdateMovieForm";
import axios from "axios";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [ initialMovies, setInitialMovies ] = useState([]);
        // [.then() response data set to useEffect, setInitialMovies]

useEffect(() => {
  axios
    .get(`http"//localhost:5000/api/movies`)
    .then(response => {
      console.log('GET', response);
      setInitialMovies(response.data)
    })
    .catch(error => console.log(error))
})

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  return (
    <>
      <SavedList list={savedList} />
      <Route exact path="/" component={MovieList} />
      <Route
        path="/movies/:id"
        render={props => {
          return <Movie {...props} addToSavedList={addToSavedList} />;
        }}
      />
      <Route path="/update-movie/:id" render={props => {
        return <UpdateMovieForm {...props} initialMovies={initialMovies} setInitialMovies={setInitialMovies} />
      }} />
    </>
  );
};

export default App;
