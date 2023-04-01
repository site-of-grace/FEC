import React from 'react';
import { XCircle } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { removeOutfit } from '../../store/overviewSlice.js';
import { setIsOpen, setProductsToCompare } from '../../store/productSlice.js';
import styles from './card.module.css';

export default function ActionButton({ product, related = true }) {
  const dispatch = useDispatch();
  const { mainProduct } = useSelector(state => state.overview);

  const openModal = () => {
    dispatch(setProductsToCompare([mainProduct, product]));
    dispatch(setIsOpen(true));
    document.body.classList.add('modal-open');
  };

  const removeOutfitHandler = () => {
    const savedOutfits = localStorage.getItem('outfits');
    if (savedOutfits) {
      const outfits = JSON.parse(savedOutfits);
      const newOutfits = outfits.filter((item) => item.id !== product.id);
      localStorage.setItem('outfits', JSON.stringify(newOutfits));
    }
    dispatch(removeOutfit(product));
  };

  const clickHandler = related ? openModal : removeOutfitHandler;

  return (
    <>
    { related ? (
      <img
        className={styles['action-button']}
        src={'/icons/unfilledStar.png'}
        alt="Action Button"
        onClick={clickHandler}
      />) : (
        <XCircle className={styles['action-button-outfit']} onClick={clickHandler} />
      )}
    </>
  );
}
