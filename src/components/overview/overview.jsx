import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessage } from '../../store/productSlice';

const Overview = () => {
  const { products } = useSelector((state) => state.text); // store.slice
  const dispatch = useDispatch();

  /* 
  useEffect(() => {
    // make axios
    dispatch(setMessage('Hello FEC!'))
    dispatch(setMessage('Hello FEC!'))
  }, [products])
  
  const clickHandler = () => {
    dispatch(setMessage('Hello FEC!'))
  }

  */

  return (
    <div className='widget'>
      <h1>OVERVIEW</h1>
    </div>
  )
}

export default Overview;