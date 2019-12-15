import React, { useState, useEffect } from "react";
import axios from "axios";

export const UpdateMovie = props => {
  //   const [data, setData] = useState({});
  const [movie, setMovie] = useState({
    title: "",
    director: "",
    metascore: "",
    stars: []
  });
  const id = props.match.params.id;
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        setMovie(res.data);
        console.log("the stars!", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = e => {
    setMovie({
      ...movie,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res.data);
        setMovie({});
        props.history.push(`/movies/${movie.id}`);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={movie.title}
          onChange={handleChange}
        />
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movie.director}
          onChange={handleChange}
        />
        <input
          type="number"
          name="metascore"
          placeholder="Metascore"
          value={movie.metascore}
          onChange={handleChange}
        />

        <input
          type="text"
          name="stars"
          placeholder="Stars"
          value={movie.stars}
          onChange={handleChange}
        />
        <button type="submit">Update Movie</button>
      </form>
    </div>
  );
};
