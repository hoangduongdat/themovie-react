import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import tmdbApi from '../../api/tmdbApi';
import apiConfig from '../../api/apiConfig'

import './detail.scss'
import CastList from './CastList';
import VideoList from './VideoList';
import MovieList from './../../components/movie-list/MovieList';
import { OutlineButton } from './../../components/button/Button';

const Detail = () => {

    const {category, id} =useParams()
    const [item,setItem] = useState({})

    useEffect(() => {
        const getDetail = async () => {
            let response=null
            const params = {}
            response = await tmdbApi.detail(category, id,{params})
            setItem(response);

            window.scrollTo(0, 0)
        }
        getDetail()

    },[id,category])
   
    return (
        <>
            {
                item && (
                    <>
                        <div 
                            className="banner" 
                            style={{backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})`}}
                        ></div>

                        <div className="mb-3 movie-content container">
                            <div className="movie-content__poster">
                                <div className="movie-content__poster__img"
                                    style={{backgroundImage: `url(${apiConfig.w500Image(item.poster_path || item.backdrop_path)})`}}>

                                </div>
                            </div>
                            <div className="movie-content__info">
                                <h2 className="title">{item.title || item.name}</h2>        
                                <div className="genres">
                                    {
                                        item.genres && item.genres.slice(0,5).map((genre,i) => (
                                            <span key={i} className="genres__item">{genre.name}</span>
                                        ))
                                    }
                                </div>
                                <p className="overview">{item.overview}</p>   
                                <div className="cast">
                                    <div className="section__header">
                                        <h2>Casts</h2>
                                    </div>
                                    <div className="cast-list">
                                        <CastList id={id}/>
                                    </div>
                                </div>     
                            </div>
                        </div>
                        <div className="container">
                            <div className="section mb-3">
                                <VideoList id={id}/>
                            </div>
                            <div className="section mb-3">
                                <div className="section__header mb-2">
                                    <h2>Similar Movies</h2>
                                    <Link to="/movie">
                                        <OutlineButton className="small">View more</OutlineButton>
                                    </Link>
                                </div>
                                <MovieList category={category} type="similar" id={id} />
                            </div>
                        </div>
                    </>
                )
            }
        </>
    );
};

export default Detail;