import React from 'react';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import './HotelsCard.css'

export default function HotelsCard(props) {
  const {
    id,
    name,
    totalReviews,
    totalScore,
    pricePerNight,
    photo
  } = props.hotel

  return (
    <Card className='card' onClick={() => props.selectHotel(id)}>
      <div className="card__media">
        <CardMedia
          className='card__cover'
          image={photo}
          title={name}
        />
      </div>
      <div className='card__details'>
        <CardContent className='card__details__content'>
          <Typography style={{ fontSize: '0.8em' }} component="h5" variant="h5">
            {name}
          </Typography>
          <Typography style={{ fontSize: '0.7em' }} variant="subtitle1" color="textSecondary">
            {`${parseInt(pricePerNight) * parseInt(props.selectedNights)} for ${props.selectedNights} night${props.selectedNights > 1 ? 's' : ''}`}
          </Typography>
          <Typography style={{ fontSize: '0.8em' }} variant="subtitle1" color="textSecondary">
            {totalScore} Score
          </Typography>
          <Typography style={{ fontSize: '0.8em' }} variant="subtitle1" color="textSecondary">
            {totalReviews} Reviews
          </Typography>
        </CardContent>
        <div className='card__controls'>
          {/* <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton> */}
        </div>
      </div>

    </Card>
  );
}