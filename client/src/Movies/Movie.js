import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import { Link, Route } from "react-router-dom";
import { UpdateMovie } from "./UpdateMovie";

export default class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  handleDelete = e => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        this.props.history.push("/");
      });
  };

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => {
        console.log(res.data);
        this.setState({ movie: res.data });
      })
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <div>
          <Link to={`/update-movie/${this.state.movie.id}`}>
            {console.log("form inside!", this.state.movie)}Update
          </Link>
          <button onClick={this.handleDelete}>Delete</button>
        </div>
        {/* <Route
          path="/update-movie/:id"
          render={props => (
            <UpdateMovie
              {...props}
              updateItems={this.setState}
              mov={this.movie}
            />
          )}
        /> */}
      </div>
    );
  }
}
