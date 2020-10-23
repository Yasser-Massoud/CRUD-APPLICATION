import React, { useState, useEffect } from "react";
 import axios from "axios";
import "./App.css";

function App() {
   const [movieName, setMovieName] = useState("");
   const [review, setReview] = useState("");
   const [movieReviewList, setMovieList] = useState([]);

   useEffect(() => {
     axios.get('http://localhost:3001/api/get').then((response) => {
       setMovieList(response.data);
     })

   })

  const submitReview = () => {
    axios.post("http://localhost:3001/api/insert", {
      movieName: movieName,
      movieReview: review,
    }).then(() => {
      setMovieList([...movieReviewList, {movieName: movieName, movieReview: review}])
    });
  };

  const deletReview = () =>{
    axios.delet(`http://localhost:3001/api/delet/${movieName}` );
  };

  return (
    <div className="App">
      <h1>CRUD APPLICATION</h1> 
      <div className="form">
        <label>Task</label>
        <input
          type="text"
          name="moviename"
           onChange={(e) => {
             setMovieName(e.target.value);
           }}
        />
        <label>Task Review</label>
        <input
          type="text"
          name="review"
           onChange={(e) => {
            setReview(e.target.value);
           }}
        />
        <button onClick={submitReview}>Submit</button>
        {movieReviewList.map((val)=>{
          return <div className='card'><h1>{val.movieName} </h1> <p>{val.movieReview}</p>
          <button onClick = {()=>{ deletReview(val.movieName)}}>Delet</button>
          <input type='text' id='updateInput' />
          <button>Update</button>
           </div>
        })}
      </div>
    </div>
  );
}

export default App;
