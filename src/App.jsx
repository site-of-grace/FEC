import React, { useEffect } from 'react';
import Overview from './components/overview/overview.jsx';
import Rating from './components/rating/rating.jsx';
import Questions from './components/questions/questions.jsx';
import RelatedItems from './components/relatedItems/relatedItems.jsx';

const App = () => {


  return (
  <>
    <header id='banner'>
      <h1 id='bannerTitle'>GRACE OUTFITTERS</h1>
    </header>
     <div id='bannerMessage'>
      SITE-WIDE ANNOUNCEMENT MESSAGE! - SALE / DISCOUNT&nbsp;<b>OFFER</b>&nbsp;-&nbsp;<div style={{'text-decoration': 'underline'}}> NEW PRODUCT HIGHLIGHT</div></div>
    <div id='FEC'>
      <Overview />
      <RelatedItems />
      <Questions />
      <Rating />
    </div>
  </>


    );
};

export default App;