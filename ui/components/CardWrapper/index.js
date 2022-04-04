import React from 'react';
import { Card } from 'antd';
import styles from './style.module.scss';

function CardWrapper({ children }) {
  return (
    <div className={styles.card_wrapper}>
      <Card {...children} id="card">{children}</Card>
    </div>
  );
}

export default CardWrapper;
