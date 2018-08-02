import React from 'react';
import classnames from 'classnames';

 const TextInputCell = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  HighlightFieldOnError = true,
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
      {HighlightFieldOnError && error && (
        <div className="invalid-feedback">{customErrorMsg || error}</div>
      )}
    </div>
  )

export default TextInputCell