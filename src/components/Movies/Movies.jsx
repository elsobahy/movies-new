import axios from 'axios';
import React, { useEffect, useState } from 'react'
import "./movies.css";
import CardMovies from '../CardMovies/CardMovies';
export default function Movies() {
    const [favorites, setFavorites] = useState(() => {
        // Retrieve favorite movies from localStorage when component mounts
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : {};
    });

    const[movies,setMovies]=useState([])
    const  api_key="c9fac173689f5f01ba1b0420f66d7093"
    const  total_pages=20
    useEffect(() => {
           const getAllMovies=async()=>{
           const allMovies=[]
           for(let page=1;page<total_pages;page++){
                await axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${api_key}&page=${page}`)
                .then((res)=>{
                    console.log(res.data.results)
                  allMovies.push(...res.data.results)
                })
                .catch((err)=>{
                   console.log(err)
                })
           }
           setMovies(allMovies)
          
           
           }
           getAllMovies()
        },[]);  
         // Toggle favorite movie
    const toggleFavorite = (movie) => {
        const newFavorites = { ...favorites };
        if (newFavorites[movie.id]) {
            delete newFavorites[movie.id]; // If already in favorites, remove it
        } else {
            newFavorites[movie.id] = movie; // Add to favorites
        }
        setFavorites(newFavorites);
        localStorage.setItem('favorites', JSON.stringify(newFavorites)); // Store in localStorage
        console.log(favorites)
    };
    
  return (
    <>
   <div className='container my-3'>
    
       <CardMovies movies={movies} favorites={favorites} toggleFavorite={toggleFavorite}/>
    </div>


    
    </>
  )
}
