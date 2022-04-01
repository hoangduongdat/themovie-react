import React from 'react';
import PropTypes from 'prop-types';
import './button.scss'

Button.propTypes = {
    onClick: PropTypes.func,
};

function Button(props) {
    return (
        <button 
            className={`btn ${props.className}`} 
            onClick={props.onClick ? ()=>props.onClick() : null}
        >
            {props.children}
        </button>
    )
}

export const OutlineButton = props => {
    return(
        <Button
            className={`btn-outline ${props.className}`} 
            onClick={props.onClick ? ()=>props.onClick() : null}
        >
            {props.children}
        </Button>
    )
} 
 

export default Button;