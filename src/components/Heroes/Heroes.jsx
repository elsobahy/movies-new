import React, {  useContext } from 'react';


import CardHeroes from '../CardMovies/CardHeroes';
import { MoviesContex } from '../Context/MoviesContext';

const Heroes = () => {
 
  let{heroes}= useContext(MoviesContex)
  return (
    <>
      <div className="container my-4">
        <h4>The Best Heroes Who Participated In The Movies</h4>
        <div style={{ height: '1px' }} className="w-50 m-auto bg-warning"></div>
        <CardHeroes heroes={heroes}/>
      </div>
    </>
  );
};

export default Heroes;
