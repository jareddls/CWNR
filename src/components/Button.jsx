import React from 'react'

const Button = (props) => {
  if (props.url) {
    return (
      <div style={{ marginBottom: '50px' }}>
        <a href={props.url}>
          <button className="btn btn-primary d-inline-flex flex-row align-items-center">
            {props.text}
          </button>
        </a>
      </div>
    );
  } else {
    return (
      <div style={{ marginBottom: '50px' }}>
        <button
          className="btn btn-primary d-inline-flex flex-row align-items-center"
          onClick={props.onClick}
        >
          {props.text}
        </button>
      </div>
    );
  }
};

export default Button;