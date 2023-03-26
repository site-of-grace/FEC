import React, { useState } from 'react';
import ComparisonModal from './ComparisonModal.jsx';
import { useSelector } from 'react-redux';
import styles from './card.module.css';

export default function ActionButton({ product, related = true }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { mainProduct } = useSelector(state => state.overview);

  const openModal = () => {
    setIsOpen(true);
    document.body.classList.add('modal-open');
  };
  const closeModal = () => {//
    setIsOpen(false);
    document.body.classList.remove('modal-open');
  };
  const icon = related ? '/icons/unfilledStar.png' : '/icons/filledStar.png';
  const clickHandler = related ? openModal : () => console.log('clicked');
  return (
    <>
      <img
        className={`${styles['action-button']}`}
        src={icon}
        alt="Action Button"
        onClick={clickHandler}
      />
      <ComparisonModal
        products={[mainProduct, product]}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      />
    </>
  );
}
