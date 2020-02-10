import React from 'react';

export const FileInput = ({ label, onChange, onBlur, ...props}) => {

  const handleChange = (value) => {
    let file = value.currentTarget.files[0]
    onChange(props.name, file);
  }

  const handleBlur = () => {
    onBlur(props.name, true);
  }

  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <input
        type="file"
        name={props.name}
        id={props.id}
        onChange={handleChange}
        onBlur={handleBlur}
        className={
          props.touched && props.error ? 'form-control is-invalid' : 'form-control'
        }
      />      
      {props.touched && props.error ? (
        <div className="invalid-feedback">{props.error}</div>
      ) : null}
    </div>  
  )
} 
