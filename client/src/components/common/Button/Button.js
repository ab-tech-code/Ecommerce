import React from 'react';
import './Button.css';

/**
 * A reusable button component with different visual styles.
 * @param {object} props
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {React.ReactNode} props.children - The content to display inside the button.
 * @param {'primary' | 'secondary' | 'danger'} [props.variant='primary'] - The visual style of the button.
 * @param {string} [props.type='button'] - The button's type (e.g., 'button', 'submit').
 * @param {boolean} [props.disabled=false] - Whether the button is disabled.
 * @param {string} [props.className] - Additional CSS classes to apply.
 */
const Button = ({
  children,
  onClick,
  variant = 'primary',
  type = 'button',
  disabled = false,
  className = ''
}) => {
  const buttonClasses = `btn btn-${variant} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
