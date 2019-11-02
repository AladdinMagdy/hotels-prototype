import React, { useState } from 'react'
import useFetch from '../../utils/useFetch'
import usePagination from '../../utils/usePagination'

import Loading from '../Loading'
import Carousel from '../Carousel'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';


import './ViewSection.css'

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 25,
  },
}));

const ViewSection = (props) => {
  const classes = useStyles();
  const [sortBy, setSortBy] = useState('highest')

  const { loading, data: hotel, error } = useFetch(
    `http://my-json-server.typicode.com/fly365com/code-challenge/hotelDetails/${props.hotel}`
  )

  const { numberOfPages, pageContent, currentPage, dispatch } = usePagination(hotel, 3, 'reviews', sortBy)

  if (loading) {
    return (
      <div className='hotel-viewport'>
        <Loading>Loading your hotel</Loading>
      </div>
    )
  }

  if (error) {
    return <p>{error}</p>
  }

  const {
    id,
    name,
    pictures
  } = hotel

  return (
    <div className='hotel-viewport'>
      <div className='hotel-viewport__title'>{name}</div>
      <div className='hotel-viewport__days'>
        For
        <TextField
          id="date"
          type="number"
          defaultValue="1"
          className={classes.textField}
          onChange={(e) => {
            console.log(e)
            props.nightsChange(e.target.value)
          }}
        />
        nights
      </div>
      <Carousel photosIndices={pictures.length} photos={pictures} />
      <div className="review-container">
        {pageContent.length > 0 &&
          <button onClick={(e) => { sortBy === 'highest' ? setSortBy('lowest') : setSortBy('highest') }}>
            sort by {sortBy === 'highest' ? 'lowest' : 'highest'} score
            </button>
        }
        {pageContent.length > 0 && pageContent.map(({ review, score }, index) => (
          <div className='review-container__item' key={score + index}>
            <div className='review-container__score'>{score}</div>
            <div className='review-container__text'>
              {review}
            </div>
          </div>
        ))}
        <div>
          {[...new Array(Number(numberOfPages))].map((elem, index) => (
            <button key={index} disabled={currentPage === index + 1} onClick={(e) => dispatch({
              type: 'step',
              count: parseInt(e.target.innerText)
            })}>{index + 1}</button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ViewSection