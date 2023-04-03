import React from 'react'

const Button = (props) => {
  return (
    <div style = {{marginBottom: '50px'}}>
        <a href={props.url}>
            <button className="btn btn-primary d-inline-flex flex-row align-items-center">
                {props.text}
            </button>
        </a>
    </div>
  )
}

export default Button