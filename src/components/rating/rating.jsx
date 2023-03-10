import React, {useState, useEffect} from 'react';

import ReviewList  from './reviewList.jsx';
import axios from 'axios';

var stars = {
  unFilled: './icons/unfilledStar.png',
  quarter: './icons/quarterStar.png',
  half: './icons/quarterStar.png',
  threeFourths: './icons/threeFourthsStar.png'
}

const Rating = () => {
  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(null);

  var calculateAverage = (reviews) => {
    var total = 0;
    reviews.forEach((curReview) => {
        total += curReview.rating;
    });
    var longAverage = (total/reviews.length);
  //Rounds to nearest .25
    setAverage((Math.round(longAverage * 4) / 4));
  }

  const update = (reviews) => {
    calculateAverage(reviews);
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