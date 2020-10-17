import React, {useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios'

import {LoggedContext} from './LoggedContext'

//components
import MovieList from './MovieList'

const ProfileComponent = (props) => {
  const [logged, setLogged] = useContext(LoggedContext)
  const history = useHistory()
  const [info, setInfo] = useState([]) //user info
  const [title, setTitle] = useState('')  //movie title
  const [category, setCategory] = useState('')  //movie category
  const [movies, setMovies] = useState([])  //all movies
  const [token, setToken] = useState()  //JWT
  const [msg, setMsg] = useState('') 


  const deleteMovie = (id) => {
    // console.log('movie id', id)
 
    axios.get(`http://localhost:4000/movies/delete/${id}`)
    .then(res => {
      if (res.data.msg) {
        // console.log(res.data.msg)
        setMsg(res.data.msg)
      }
      getMovieList()
    })
  } 

  const addMovie = (e) => {
    e.preventDefault()
    
    const user_id = info.id

   axios.post('http://localhost:4000/movies', {
      'title': title,
      'category': category,
      'user_id': user_id,
    })
    .then(res => {
      if (res.data) {
        // console.log(res.data)
        setTitle('')
        setCategory('')
        setMsg(res.data.msg)
      }
      getMovieList()
    })
  }


  const getMovieList = () => {
    axios.get('http://localhost:4000/movies', {
      headers: {
        'Access-Token': token,
        'Authorization': info.id
      }
    })
    .then(res => {
      if (res) {
        // console.log(res)
        setMovies(res.data.movies)
        if (res.data.movies.length < 1) {
          setMsg('Please add some movies :)')
        }
      } 
      
    })
  }

  useEffect(() => {
    
    if (props.location.state === undefined || null) {
      history.push('/signin')
    } else {
      
    setInfo(props.location.state.user)
    setToken(props.location.state.token)
    }
  }, [props.location.state, history])

  useEffect(() => {
    setLogged(true)
  })

  return (


    <div className="container">

      <h4 className="text-center my-4">Hello, {info.username} 
      <button
        className="btn btn-dark"
        onClick={getMovieList}>
          Get Movie List
        </button>
      </h4>

      {/* New Movie */}

    
      <div className="row">
          <div className="col-md-4 ">
    {msg ? <b><i>{msg}</i></b> : null}
    <form className="my-4">
      <div className="form-group">
        <label htmlFor="title">Title*</label>
        <input
        name="title" 
        value={title}
        type="text"
        className="form-control"
        onChange={e => setTitle(e.target.value)}/>
      </div>
      
      <div className="form-group">
        <label htmlFor="category">Category</label>
        <input
          name="category" 
          value={category}
          type="text"
          className="form-control"
          onChange={e => setCategory(e.target.value)}/>
      </div>

      <button
        className="btn btn-dark btn-block  mb-5"
        onClick={addMovie}>
          Add Movie
      </button>
    </form>

    </div>
    <div className="col-md-8">


        {movies.length !== 0  ? 
            <div>
              <div className="row">
            {movies.map((movie) => (

              <MovieList 
                key={movie.id}
                title={movie.title}
                category={movie.category}
                id={movie.id}
                selectedMovie={(id)=> deleteMovie(id)}
              />
              
            ))}
              </div>
            </div>
          : null}
    </div>
      </div>
 
    </div>
  )
}

export default ProfileComponent
