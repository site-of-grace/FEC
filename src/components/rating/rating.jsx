import React, {useState, useEffect} from 'react';

import ReviewList  from './reviewList.jsx';
import axios from 'axios';
const Rating = () => {
  const [reviews, setReviews] = useState([]);
  const update = (reviews) => {
    setReviews(reviews);
  }

  var fetch = () => {
    axios.get('/reviews')
    .then((serverData) => {
      console.log('Reviews from server ==> ', serverData.data);
      update(serverData.data);
    })
    .catch((err) => {
      console.log('Error from server ==> ', err)
    })
  }

  useEffect(fetch, []);

  return (
    <div className='widget'>
      <h1>RATING</h1>
      <ReviewList reviews={reviews} />
    </div>
  )
}

export default Rating;