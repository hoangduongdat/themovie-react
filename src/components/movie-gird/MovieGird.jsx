import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './movie-gird.scss'

import MovieCard from '../movie-card/MovieCard'
import tmdbApi, { category, movieType, tvType} from './../../api/tmdbApi';
import { OutlineButton } from './../button/Button';

const MovieGird = (props) => {

    const [items, setItems] =useState([])

    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)

    const { keyword } = useParams()

    useEffect(() => {
        const getList= async () =>{
            let response=null
            if(keyword === undefined) {
                const params ={}
                switch(props.category) {
                    case category.movie:
                        response= await tmdbApi.getMoviesList(movieType.upcoming,{params})
                        break
                    default:
                        response= await tmdbApi.getTvList(tvType.popular,{params})
                }
            } else {
                const params ={
                    query: keyword
                }
                response= await tmdbApi.search(keyword,params)
            }
            setItems(response.results)
            setTotalPage(response.total_pages)
        }
        getList()
    }, [props.category,keyword])

    const loadMore = async () => {
        let response=null
            if(keyword === undefined) {
                const params ={
                    page: page + 1
                }
                switch(props.category) {
                    case category.movie:
                        response= await tmdbApi.getMoviesList(movieType.upcoming,{params})
                        break
                    default:
                        response= await tmdbApi.getTvList(tvType.popular,{params})
                }
            } else {
                const params ={
                    page: page + 1,
                    query: keyword
                }
                response= await tmdbApi.search(keyword,params)
            }
            
            setPage(page=>page+1)
            setItems([...items,...response.results])
          
    }
   console.log(items)

    return (
        <>       
            <div className="movie-gird">
                {
                    items.map((item,i) =><MovieCard category={props.category} item={item} key={i}/>)
                }
            </div>
            {
                page < totalPage ? (
                    <div className="movie-gird__loadmore">
                        <OutlineButton className="small" onClick={loadMore}>Load more</OutlineButton>
                    </div>
                ):null
            }
        </>
    );
};

export default MovieGird;