import React, { useState } from 'react';

function UpdateMovieForm() {
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: ''
    })

    return(
        <form>
            <input name='title' />
            <input name='director' />
            <input name='metascore' /> 
            <input name='stars' /> 
        </form>
    )
}

export default UpdateMovieForm;