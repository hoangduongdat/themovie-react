import React, { useEffect } from 'react';

import { useParams } from 'react-router-dom';

import PageHeader from '../components/page-header/PageHeader';
import {category as cate} from '../api/tmdbApi'
import MovieGird from '../components/movie-gird/MovieGird';


const Catalog = () => {
    
    const { category } = useParams()
    useEffect(() => {
        window.scrollTo(0, 0)
    },[category])
    
    return (
        <>
            <PageHeader>{category === cate.movie ? 'Movies' : 'Tv Series'}</PageHeader>

            <div className="container">
                <div className="section mb-3">
                    <MovieGird category={category}/>
                </div>
            </div>
        </>
    );
};

export default Catalog;