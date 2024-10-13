import React from 'react'
import { Link } from 'react-router-dom'

export default function CardHeroes({heroes}) {
  return (
    <div>

       <div className="row my-5">
          {heroes.map((hero) => (
            <div key={hero.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
              <Link className="nav-link card mb-4" to={`/hero/${hero.id}`}>
                <img
                  src={
                    hero.profile_path
                      ? `https://image.tmdb.org/t/p/w500${hero.profile_path}`
                      : 'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG.png'
                  }
                  alt={hero.name}
                  style={{
                    width: '100%',
                    height: '250px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                  }}
                />
                <h1
                  className="text-truncate h5 text-center text-black mt-1"
                  style={{ cursor: 'pointer' }}
                  data-toggle="tooltip"
                  data-placement="start"
                  title={hero.title ? hero.title : hero.name}
                >
                  {hero.title ? hero.title : hero.name}
                </h1>
                <p className="text-center">
                  <button className="btn btn-warning" onClick={() => {}}>
                  See All Movies
                  </button>
                </p>
              </Link>
            </div>
          ))}
        </div>
    </div>
  )
}
