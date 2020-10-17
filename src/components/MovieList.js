import React from 'react'

const MovieList = ({title, category, id, selectedMovie}) => {
  
 
  const show = (id) => {
    
    selectedMovie(id)
  }
  // console.log(props)
  return (
    <div className="col-md-4 my-4">
        
        <div className="card">
          <div className="card-body">
            <p>Title: </p><b>{title}</b>
            <p>Category: </p><b>{category}</b>
          </div>
          <div className="card-footer">
            <button className="btn btn-danger "
                    onClick={() => show(id)}>
                    X
            </button>
          </div>
        </div>
   
    </div>

  )
}

export default MovieList



