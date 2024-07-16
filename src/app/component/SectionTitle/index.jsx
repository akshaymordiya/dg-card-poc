import React from 'react';
import styles from './styles.module.scss'

const SectionTitle = ({
    title = "",
    itemclass =""
}) => {
  return (
    <div className={` ${styles.section_wrapper}`}>
    <h2 className={`${styles.section_wrapper_title} special-title ${itemclass}`}>{title}</h2>
  </div>
  )
}

export default SectionTitle