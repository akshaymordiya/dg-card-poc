"use client";
import React from 'react'
import styles from './styles.module.scss';

const Input = ({
  containerClass = "",
  inputClass = "",
  id = "",
  value,
  onChange = () => {},
  onBlur = () => {},
  error = "",
  type,
  textarea = false,
  textareaClass = "",
  ...props
}) => {

  const classNames = {
    input: `${styles.input_box_wrapper_input} ${inputClass}`,
    textarea: `${styles.input_box_wrapper_textarea} ${textareaClass}`
  } 
  
  return (
    <div className={`${styles.input_box} ${containerClass}`}>
      <div className={styles.input_box_wrapper}>
        {React.createElement(
          textarea ? "textarea" : "input",
          {
            id,
            className: `${classNames[textarea ? "textarea" : "input"]} ${value !== "" ? "filled" : ""}`,
            value,
            onChange,
            onBlur,
            type,
            ...props
          }
        )}
      </div>
      {error !== "" && (
        <p className={styles.input_box_error_text}>{error}</p>
      )}
    </div>
  )
}

export default Input
