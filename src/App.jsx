import React, { useEffect } from 'react';
import Overview from './components/overview/overview.jsx';
import Rating from './components/rating/rating.jsx';
import Questions from './components/questions/questions.jsx';
import RelatedItems from './components/relatedItems/relatedItems.jsx';

const App = () => {


  return (
    <div id='FEC'>
      <h1>Hello FEC</h1>
      <Overview />
      <RelatedItems />
      <Questions />
      <Rating />
    </div>
    );
};

export default App;