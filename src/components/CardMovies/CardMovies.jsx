import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export default function CardMovies({movies,favorites,toggleFavorite}) {
  return (
    <div className='row'>
       {movies.map((movie) => (
            <div key={movie.id} className='col-6 col-sm-4 col-md-3 col-lg-2'>
                {/* Card Wrapper */}
                <div className="movie-card position-relative">
                    {/* Heart Button */}
                    <button
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            position: 'absolute',
                            top: '10px',
                            right: '10px',
                        }}
                        onClick={() => toggleFavorite(movie)}
                    >
                        <FontAwesomeIcon
                            icon={faHeart}
                            color={favorites[movie.id] ? 'red' : 'white'}
                            size="2x"
                        />
                    </button>
                    {/* Movie Link */}
                    <Link className='nav-link' to={`/movie/${movie.id}`}>
                        <img
                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                            alt={movie.title || movie.name}
                            className='w-100'
                        />
                        <h1
                            className='text-truncate h4 text-center mt-2'
                            style={{ cursor: "pointer" }}
                            title={movie.title ? movie.title : movie.name}
                        >
                            {movie.title ? movie.title : movie.name}
                        </h1>
                        <p className='mt-1 movie-overview'>
                            {movie.overview}
                        </p>
                    </Link>
                </div>
            </div>
        ))}
    </div>
  )
}
