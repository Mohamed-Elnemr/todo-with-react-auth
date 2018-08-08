import React from 'react';
import classnames from 'classnames';

 const TextInputCell = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  showError = true,
  customErrorMsg
}) => (
    <div className="form-group">
      <input
        type={type}
        className={classnames('form-control form-control-lg', {
          'is-invalid': error
        })}
        name={name}
        placeholder= {placeholder}
        value={value}
        onChange={onChange}
      />
      {showError && error && (
        <div className="invalid-feedback">{customErrorMsg || error}</div>
      )}
    </div>
  )

export default TextInputCell