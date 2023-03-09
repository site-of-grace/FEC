import React from 'react';
import Overview from './components/overview/overview.jsx';
import Rating from './components/rating/rating.jsx';
import Questions from './components/questions/questions.jsx';
import RelatedItems from './components/relatedItems/relatedItems.jsx';

const App = () => {

  return (
    <div>
      <h1>Hello FEC</h1>
      <Overview />
      <Rating />
      <Questions />
      <RelatedItems />
    </div>
    )
}

export default App