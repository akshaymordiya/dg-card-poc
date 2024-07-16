"use client";
import React from 'react'

import "./index.scss";

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
    input: `input_box_wrapper_input ${inputClass}`,
    textarea: `input_box_wrapper_textarea ${textareaClass}`
  } 
  
  return (
    <div className={`input_box ${containerClass}`}>
      <div className={`input_box_wrapper`}>
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
        <p className={`input_box_error_text`}>{error}</p>
      )}
    </div>
  )
}

export default Input
