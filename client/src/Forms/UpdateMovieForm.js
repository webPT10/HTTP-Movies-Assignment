import React, { useState, useEffect } from "react";

// initialMovies & setInitialMovies passed down as props from App.js

const UpdateMovieForm = props => {
  console.log(
    "Props passed from App.js useEffect via UpdateMovieForm component",
    props
  );

  useEffect(() => {
    const id = props.match.params.id;
  });

  const handleSubmit = event => {
    event.preventDefault();
  };

  return (
    <div>
      <h4>Edit Movie</h4>
      <form onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder="Title" value={} />
        <input name="director" type="text" placeholder="Director" value={} />
        <input
          name="metascore"
          type="number"
          placeholder="Metascore"
          value={}
        />
        <input name="stars" type="text" placeholder="Stars" value={} />
        <button type="submit">Edit Movie</button>
      </form>
    </div>
  );
};

export default UpdateMovieForm;
