import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './movie-gird.scss'

import MovieCard from '../movie-card/MovieCard'
import tmdbApi, { category, movieType, tvType} from './../../api/tmdbApi';
import Button, { OutlineButton } from './../button/Button';
import Input from '../input/Input';

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
                console.log(keyword)
                const params ={
                    query: keyword
                }
                response= await tmdbApi.search(props.category,{params})
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
                response= await tmdbApi.search(props.category,{ params})
            }
            
            setPage(page=>page+1)
            setItems([...items,...response.results])         
    }

    return (
        <>  
            <div className="section mb-3">
                <MovieSearch keyword={keyword} category={props.category}/>
            </div>
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
    )
}

const MovieSearch = props => {

    const navigate = useNavigate()
    const [keyword,setKeyword] = useState(props.keyword ? props.keyword : '')

    const goToSearch = useCallback(() => {
        if(keyword.trim().length > 0) {
            navigate(`/${props.category}/search/${keyword}`)
        }
    },[keyword, props.category, navigate])

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault()
            if(e.keyCode === 13 ) {
                goToSearch()
            }
        }
        document.addEventListener('keyup' , enterEvent)

        return () => document.removeEventListener('keyup' , enterEvent)
    },[keyword, goToSearch])

    return (
        <div className="movie-search">
            <Input
                type="text"
                placeholder="Enter keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />
             <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGird;