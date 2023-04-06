//Remove console.logs!

import React, {useEffect, useState, useRef} from 'react';

import ReviewList  from './reviewList.jsx';
import Breakdown from './breakdown.jsx';
import AddReviewMod from './addReviewMod.jsx';

import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {setRatingMeta, setReviews, setReviewsRelevant, setReviewsRecent, setReviewsHelpful, setAverage, setRatingMetaTotal} from '../../store/ratingSlice';

import useClickTracking from '../../hooks/useClickTracking';

import orderBy from 'lodash/orderBy';

import styles from './cssModules/rating.module.css';

import 'intersection-observer';

var runObserverOccured = false;

const Rating = () => {
	const [uploadInProgress, setUploadInProgress] = useState(false);
  const [addReview, setAddReview] = useState(false);
  const [renderComponent, setRenderComponent] = useState(false);

  const ratingRef = useClickTracking();
  const observerRef = useRef(null); // Ref for the Intersection Observer

  var runObserver = (metaData, product_id) => {
    runObserverOccured = true;
    observerRef.current = new IntersectionObserver( (entries) => { //Function runs when component is in view
      entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Review list rendered!!!!!');
            setRenderComponent(true);
            fetchReviews(metaData, product_id);
            observerRef.current.unobserve(ratingRef.current);
          }
        });
      }, {
        threshold: .4
      });
      if (ratingRef.current) {
        observerRef.current.observe(ratingRef.current);
      }

  };

  useEffect(() => {
    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const dispatch = useDispatch();
  //current product ids = 71697, 71698, 71699, 71700, 71701
  const mainProduct  = useSelector((state) => state.overview.mainProduct);

  const sortRelevant = (reviews, onStart = true) => { //Sorts the reviews considering helpful and date
    var helpfulnessWeight = 4; //Make helpfulness a bit more important
    for (var i = 1; i <= reviews.length; i++) {
      var dateScore = reviews.length - i;
      var helpfulScore = Math.floor(reviews[i-1].helpfulness*helpfulnessWeight);
      reviews[i-1].score = dateScore + helpfulScore;
    }
    var relevantReviews = orderBy(reviews, 'score', 'desc');
    if (onStart) {
      dispatch(setReviewsRelevant(relevantReviews));
    }
    dispatch(setReviews(relevantReviews));
  };

  var calculateAverage = (metaData) => {
    var total = 0;
    var reviewAmount = 0;

    if (!metaData.rating) {
      dispatch(setAverage(0));
    }

    for (var i = 1; i <= 5; i++) {
      if (metaData.ratings[i]) {
        total += Number(metaData.ratings[i]) * i;
        reviewAmount += Number(metaData.ratings[i]);
      }
    }
    dispatch(setRatingMetaTotal(reviewAmount)); //Needed for rating breakdown

    var longAverage = reviewAmount > 0 ? (total/reviewAmount) : 0;
  //Rounds to nearest .25
    dispatch(setAverage((Math.round(longAverage * 4) / 4)));
  };


  var fetchReviews = (metaData, product_id) => {
    var options = {params: {product_id, metaData}};
		axios.get('/rating/reviews' , options)
		.then((serverData) => {
      //Reviews are sorted by recent to improve efficiency
			console.log('Reviews from server ==> ', serverData.data);

      sortRelevant(serverData.data.results);

      //Reviews are sorted by relevant so fill that in store
      dispatch(setReviewsRecent(serverData.data.results));
      //Sorts for recent
      dispatch(setReviewsHelpful([]));
		})
		.catch((err) => {
			console.log('Error from server ==> ', err);
		});
	};

  var fetchMetaData = (product_id) => {
    var options = {params: {product_id}};
    //Can't be trusted
    axios.get('/rating/meta', options)
    .then((serverData) => {
      calculateAverage(serverData.data);

      dispatch(setRatingMeta(serverData.data));

      if (!runObserverOccured && id) {runObserver(serverData.data, product_id);} //Run the checker to see if we can render reviews
    })
    .catch((err) => {
      console.log('Error from server ==> ', err);
    });
  };

  const { id } = mainProduct;

  useEffect(() => { if (id) { fetchMetaData(id);}}, [id]);

  return (
    <div className='widget' id={`${styles.rating}`} ref={ratingRef} data-widget="Rating">
      {renderComponent ?
      <>
        {addReview ? <div  id={`${styles['rating-overlay']}`} onClick={() => setAddReview(false)}></div> : null}
        {uploadInProgress ? <img className={`${styles['loading-img']}`} src='./icons/loading.gif' /> : null}
        <div id={`${styles['rating-main']}`}>
          <Breakdown />
          <ReviewList setAddReview={setAddReview} sortRelevant={sortRelevant}/>
          {addReview ? <AddReviewMod setUploadInProgress={setUploadInProgress} uploadInProgress={uploadInProgress}/> : null}
        </div>
      </>: null}
    </div>
  );
};
export default Rating;