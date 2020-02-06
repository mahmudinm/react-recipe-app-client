import React from 'react';
import { useField } from 'formik';

export const TextAreaInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="form-group">
        <label 
          className="form-label"
          htmlFor={props.id || props.name}>{label}</label>
        <textarea  
          className={
            meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'
          }       
          {...field}
          {...props}
        >
          {props.values}
        </textarea>
        {meta.touched && meta.error ? (
          <div className="invalid-feedback">{meta.error}</div>
        ) : null}
      </div>  
    </>
  )
} 