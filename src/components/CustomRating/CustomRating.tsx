import { Rating } from '@mui/material'
import React from 'react'
import './_custom_rating.scss'

type RatingProps ={
    rating: number | null;
}

function CustomRating({rating}: RatingProps) {
    return (
        <div className='rating_wrapper flex_row_center'>
            <p className='rating_text'>{rating}</p>
            <Rating className='rating' name="half-rating-read" defaultValue={rating === null ? undefined : rating} precision={0.25} readOnly />
        </div>
    )
}

export default CustomRating
