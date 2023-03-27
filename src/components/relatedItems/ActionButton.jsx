import React, { useState } from 'react';
import { XCircle } from 'lucide-react';
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

  const clickHandler = related ? openModal : () => console.log('clicked');
  return (
    <>
    { related ? (
      <img
        className={`${styles['action-button']}`}
        src={'/icons/unfilledStar.png'}
        alt="Action Button"
        onClick={clickHandler}
      />) : (
        <XCircle className={`${styles['action-button']}`} />
      )}
      <ComparisonModal
        products={[mainProduct, product]}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      />
    </>
  );
}
