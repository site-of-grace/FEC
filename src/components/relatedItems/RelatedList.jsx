import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
import { ChevronRight } from 'lucide-react';
import styles from './styles.module.css';
import Card from './Card.jsx';


const RelatedList = ({ products }) => {
  return (
    //   <Swiper
    //   spaceBetween={10}
    //   slidesPerView={6}
    //   onSlideChange={() => console.log('slide change')}
    //   onSwiper={(swiper) => console.log(swiper)}
    //   className={styles.row}
    //  >
    // <SwiperSlide key={product.id}>
    // <Card
    //   product={product}
    //   key={product.id}
    // />
    // </SwiperSlide>

    <div className={styles.row}>
      {products.map((product, i) => (
        <>
        <Card
          product={product}
          key={product.id}
        />
        {i === products.length - 1 && (
          <>
          <span className={`${styles.slider} ${styles['chevron-group']}`} />
          <span className={`${styles['chevron-hover']} ${styles['chevron-group']}`}>
          <ChevronRight className={`${styles['chevron-right']} `}/>

          </span>
          </>
        )}
        </>
      ))}

      {/* <div className={styles.overlayRow}>
      <span className={styles.slider} />
      </div> */}

    </div>
    // </Swiper>
  );
};

export default React.memo(RelatedList);
