'use client'

import Image from 'next/image'
import React from 'react';
import styles from './styles.module.scss';

const IMG = ({
  src = "",
  alt = "",
  width = "",
  height = "",
  imageClasses = "",
  useContainer = false,
  useRawImgTag = false,
  containerClasses = ""
}) => {

  const mappedImage = useRawImgTag ? (
    <img
      src={src}
      className={`${styles.image} ${imageClasses}`}
      alt={alt}
    />
  ) : (
    <Image 
      src={src}
      width={width}
      height={height}
      className={`${styles.image} ${imageClasses}`}
      alt={alt}
    />
  )

  if(useContainer){
    return (
      <div className={`${styles.image}_container ${containerClasses}`}>
        {mappedImage}
      </div>
    )
  }

  return mappedImage
}

export default IMG