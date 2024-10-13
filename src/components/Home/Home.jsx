import React, { useContext } from 'react';
import './home.css';
import { MoviesContex } from '../Context/MoviesContext';
import CardHome from '../CardMovies/CardHome';

const Home = () => {
    let { movies } = useContext(MoviesContex);

    return (
        <div className='container my-5'>
            {/* Content Section */}
            <div className='content-info text-start mb-4'>
                <div className='brdr bg-info w-25 mb-3 mt-2'></div>
                <h3 className='mt-2'>Trending Movies To Watch Right Now</h3>
                <p className='description-title'>Top Trending Movies By Day</p>
                <div className='brdr bg-info w-50'></div>
            </div>

            {/* Movie Cards Section */}
            <div className='row g-4'>
                <CardHome movies={movies} />
            </div>
        </div>
    );
};

export default Home;
