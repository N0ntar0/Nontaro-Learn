import React from 'react';
import './Button.css';

type ButtonProps = {
  children: React.ReactNode;
  variant?: 'light' | 'dark';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
};

const CustomButton: React.FC<ButtonProps> = ({
  children,
  variant = 'light',
  onClick,
  type = 'button',
  disabled = false,
}) => {
  return (
    <button
      className={`custom-button ${variant}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default CustomButton;
