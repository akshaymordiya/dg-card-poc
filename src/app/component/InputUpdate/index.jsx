import React from 'react'

const InputUpdate = ({
  placeholder = "",
  type = "",
  label = "",
  onChange = () => {},
  id,
  value = "",
  ...props
}) => {
  if(type === "text"){  
    console.log("value", value);
  }
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        value={value}
        placeholder={placeholder} 
        onChange={onChange}
        id={id}
        {...props}
      />
    </div>
  )
}

export default InputUpdate