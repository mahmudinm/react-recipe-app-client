import React from 'react';
import Select from 'react-select';

export const ReactSelectInput = ({ options, label, onChange, onBlur, ...props}) => {

  const handleChange = (value) => {
    onChange(props.name, value);
  }

  const handleBlur = () => {
    onBlur(props.name, true);
  }

  return (
    <div className="form-group">
      <label htmlFor={props.id || props.name}>{label}</label>
      <Select
        isMulti
        id={props.id}
        options={options}
        onChange={handleChange}
        onBlur={handleBlur}
        value={props.value}
        styles={{
          control: styles => ({
            ...styles,
            borderColor: props.touched && props.error ? '#fb6340' : '#8898aa'
          })
        }} 
      />      
      {props.touched && props.error ? (
        <div style={{ color: '#fb6340', width: '100%', marginTop: '0.25rem', fontSize: '80%' }}>
          {props.error}
        </div>
      ) : null}
    </div>  
  )
} 