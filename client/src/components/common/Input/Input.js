import React from 'react';
import './Input.css';

/**
 * A reusable input component for forms.
 * @param {object} props
 * @param {string} props.label - The label for the input field.
 * @param {string} props.type - The type of the input (e.g., 'text', 'email', 'password').
 * @param {string} props.name - The name of the input, used for form handling.
 * @param {string} props.value - The current value of the input.
 * @param {function} props.onChange - The function to call when the input value changes.
 * @param {string} [props.placeholder] - The placeholder text for the input.
 * @param {string} [props.error] - An error message to display below the input.
 * @param {boolean} [props.required=false] - Whether the input is required.
 */
const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  placeholder = '',
  error = '',
  required = false
}) => {
  const inputId = `input-${name}`;
  const formGroupClasses = `form-group ${error ? 'has-error' : ''}`;

  return (
    <div className={formGroupClasses}>
      <label htmlFor={inputId} className="form-label">
        {label}
        {required && <span className="required-asterisk">*</span>}
      </label>
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="form-control"
        required={required}
      />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default Input;
