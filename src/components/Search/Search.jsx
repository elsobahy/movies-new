// SearchPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./search.css"
import CardHome from '../CardMovies/CardHome';
const Search = () => {
    const [movies, setMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const apiKey = 'c9fac173689f5f01ba1b0420f66d7093';

    useEffect(() => {
        const fetchMovies = async () => {
            if (searchTerm) {
                try {
                    const response = await axios.get(
                        `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}`
                    );
                    setMovies(response.data.results);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            }
        };
        fetchMovies();
    }, [searchTerm, apiKey]);
   
    return (
        <div>
            
            <input
                type='text'
                placeholder="Search for a movie..."
               
                className='form-control w-75 m-auto  input-placeholder mt-4'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className='container my-5'>
               <div className='row'>
               <CardHome movies={movies}/>
               </div>
            </div>
        </div>
    );
};

export default Search;
