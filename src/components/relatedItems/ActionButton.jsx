import React, { useState } from 'react';
import { XCircle } from 'lucide-react';
import ComparisonModal from './ComparisonModal.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { removeOutfit } from '../../store/overviewSlice.js';
import styles from './card.module.css';

export default function ActionButton({ product, related = true }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { mainProduct } = useSelector(state => state.overview);

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add('modal-open');
  };
  const closeModal = () => {//
    setIsOpen(false);
    document.body.classList.remove('modal-open');
  };

  const removeOutfitHandler = () => {
    dispatch(removeOutfit(product));
  };

  const clickHandler = related ? openModal : removeOutfitHandler;

  return (
    <>
    { related ? (
      <img
        className={related ? styles['action-button'] : styles['action-button-outfit'] }
        src={'/icons/unfilledStar.png'}
        alt="Action Button"
        onClick={clickHandler}
      />) : (
        <XCircle className={`${styles['action-button']}`} onClick={clickHandler} />
      )}
      <ComparisonModal
        products={[mainProduct, product]}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      />
    </>
  );
}
