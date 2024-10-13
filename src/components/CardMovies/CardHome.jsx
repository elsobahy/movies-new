import React from 'react';
import { Link } from 'react-router-dom';

export default function CardHome({ movies }) {
  return (
    <>
      {movies.slice(0, 15).map((movie) => (
        <div key={movie.id} className='col-6 col-sm-4 col-md-3 col-lg-2 mb-4'>
          <Link className='nav-link' to={`/movie/${movie.id}`}>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                 alt={movie.title || movie.name}
                 className='w-100 rounded' />
            <h1 className='text-truncate h4 text-center mt-1'
                style={{ cursor: "pointer" }}
                title={movie.title ? movie.title : movie.name}>
              {movie.title ? movie.title : movie.name}
            </h1>
          </Link>
        </div>
      ))}
    </>
  );
}
