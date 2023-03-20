import React from 'react';
import styles from './styles.module.css';
import Card from './Card.jsx';

const RelatedList = ({ products }) => {
  return (
      <div className={styles.row}>
        {products.map((product) => (
          <Card
            product={product}
            key={product.id}
          />
        ))}
      </div>
  );
};

export default React.memo(RelatedList);
