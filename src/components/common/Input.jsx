import React from 'react';

const Input = ({ label, type = 'text', placeholder, value, onChange, error, id, name, ...props }) => {
  // derive name/id from label or placeholder when not provided
  const base = name || id || label || placeholder || 'input';
  const safe = String(base)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  const finalId = id || safe;
  const finalName = name || safe;

  return (
    <div className="input-group">
      {label && <label htmlFor={finalId} className="input-label">{label}</label>}
      <input
        id={finalId}
        name={finalName}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input ${error ? 'input-error' : ''}`}
        {...props}
      />
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};

export default Input;