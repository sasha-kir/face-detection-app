import React from 'react';
import InfoIcon from './icons/InfoIcon';
import SuccessIcon from './icons/SuccessIcon';
import ErrorIcon from './icons/ErrorIcon';
import CloseIcon from './icons/CloseIcon';

const alertStyle = {
  backgroundColor: '#ffffff',
  color: '#151515',
  padding: '5px',
  paddingLeft: '10px',
  textTransform: 'uppercase',
  borderRadius: '3px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  boxShadow: '0px 2px 2px 2px rgba(0, 0, 0, 0.03)',
  fontFamily: 'Arial',
  fontWeight: 'bold',
  width: '500px',
  boxSizing: 'border-box'
}

const buttonStyle = {
  marginLeft: '20px',
  border: 'none',
  backgroundColor: 'white',
  cursor: 'pointer'
}

const AlertTemplate = ({ message, options, style, close }) => {
  return (
    <div style={{ ...alertStyle, ...style }}>
      {options.type === 'info' && <InfoIcon />}
      {options.type === 'success' && <SuccessIcon />}
      {options.type === 'error' && <ErrorIcon />}
      <span style={{ flex: 2 }}>{message}</span>
      <button onClick={close} style={buttonStyle}>
        <CloseIcon />
      </button>
    </div>
  )
}

export default AlertTemplate