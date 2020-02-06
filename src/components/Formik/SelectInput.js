import React from 'react';
import { useField } from 'formik';

export const SelectInput = ({ label, children, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="form-group">
        <label 
          className="form-label"
          htmlFor={props.id || props.name}>{label}</label>
        <select           
          className={
            meta.touched && meta.error ? 'form-control is-invalid' : 'form-control'
          }       
          {...field}
          {...props}
        >
          {children}
        </select>
        {meta.touched && meta.error ? (
          <div className="invalid-feedback">{meta.error}</div>
        ) : null}
      </div>  
    </>
  )
} 