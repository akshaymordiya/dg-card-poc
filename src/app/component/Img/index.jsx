'use client'

import Image from 'next/image'
import React from 'react';
import './index.scss';

const BASE_CLASSNAME = 'image'

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
      className={`${BASE_CLASSNAME} ${imageClasses}`}
      alt={alt}
    />
  ) : (
    <Image 
      src={src}
      width={width}
      height={height}
      className={`${BASE_CLASSNAME} ${imageClasses}`}
      alt={alt}
    />
  )

  if(useContainer){
    return (
      <div className={`${BASE_CLASSNAME}_container ${containerClasses}`}>
        {mappedImage}
      </div>
    )
  }

  return mappedImage
}

export default IMG