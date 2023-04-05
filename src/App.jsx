import React, { useState } from 'react';
import Overview from './components/overview/overview.jsx';
import Rating from './components/rating/rating.jsx';
import Questions from './components/questions/questions.jsx';
import RelatedItems from './components/relatedItems/relatedItems.jsx';
import { BsFillCartFill } from 'react-icons/bs';

const App = () => {

  const [cart, setCart] = useState(0);

  return (
  <>
    <header id='banner'>
      <h1 id='bannerTitle' onClick={()=>{console.log(cart)}}>GRACE OUTFITTERS</h1>
      <div id='cartIcon'>
        <BsFillCartFill size={'30'} color={'white'}/>
        <div id='cartCount'>
          <>{cart}</>
        </div>
      </div>
    </header>
     <div id='bannerMessage'>
      SITE-WIDE ANNOUNCEMENT MESSAGE! - SALE / DISCOUNT&nbsp;<b>OFFER</b>&nbsp;-&nbsp;<div style={{'text-decoration': 'underline'}}> NEW PRODUCT HIGHLIGHT</div></div>
    <div id='FEC'>
      <Overview setCart={setCart} cart={cart}/>
      <RelatedItems />
      <Questions />
      <Rating />
    </div>
  </>


    );
};

export default App;