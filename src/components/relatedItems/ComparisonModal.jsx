import React from 'react';
import styles from './modal.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setIsOpen } from '../../store/productSlice.js';

const TableRow = ({ name, value1, value2 }) => {
  // render different values
  const isTrue = value => value === true || value === 'true';
  const renderCheckmark = () => <div>✔️</div>;
  const renderBlank = () => <div></div>;

  // render a cell element based on above functions
  const renderCell = value => {
    if (isTrue(value)) {
      return renderCheckmark();
    } else if (value === undefined) {
      return renderBlank();
    } else {
      return value;
    }
  };

  return (
    <tr>
      <td className={`${styles.cell}`}>{renderCell(value1)}</td>
      <td className={`${styles.cell} ${styles.feature}`}>{renderCell(name)}</td>
      <td className={`${styles.cell} ${styles.compare}`}>{renderCell(value2)}</td>
    </tr>
  );
};

// The main component that renders the modal and the table
const ComparisonModal = () => {
  const dispatch = useDispatch();
  const { productsToCompare: products, modalIsOpen } = useSelector(state => state.products);
  if (!modalIsOpen) {
    return null;
  }

  const closeModal = () => {
    dispatch(setIsOpen(false));
    document.body.classList.remove('modal-open');
  };

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.overlay}
        onClick={closeModal}
      />
      <div className={styles.modal}>
        <h2>Comparing</h2>
        <table className={styles.table}>
          <thead>
            <tr>
              {products.map(({ name }, i) => (
                <>
                  {i === 1 && (
                    <th className={`${styles.header} ${styles.feature}`}>Features</th>
                  )}
                  <th
                    className={`${styles.header} ${styles.product}`}
                    key={name}
                  >
                    {name}
                  </th>
                </>
              ))}
            </tr>
          </thead>
          <tbody>
            {products[0].features.map(({ feature, value }) => (
              <TableRow
                key={feature}
                name={feature}
                value1={value}
                value2={products[1].features.find(f => f.feature === feature)?.value || ''}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ComparisonModal;
