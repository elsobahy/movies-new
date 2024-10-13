import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let MoviesContex=createContext([])

export default function MoviesContexProvider(props){
    const [movies, setMovies] = useState([]);
    const [heroes, setHeroes] = useState([]);
 
    // Fetch movies
    const getMovies = async (type, callback) => {
        try {
            const res = await axios.get(`https://api.themoviedb.org/3/trending/${type}/day?api_key=c9fac173689f5f01ba1b0420f66d7093`);
            callback(res.data.results);
            
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getMovies("movie", setMovies);
        getMovies("person",setHeroes)
        
    }, []);
    return (
        <MoviesContex.Provider value={{movies,heroes}}>
            {props.children}
        </MoviesContex.Provider>
    )
}