import React from 'react';
import '../index.css';
import PropTypes from 'prop-types';

function Bfore(props){
    return (
        <div className="Bfore">
            <input type="button" onClick={props.backPage} value="◀"></input>
        </div>
    )
}

Bfore.propTypes={
    renderState: PropTypes.number.isRequired,
    backPage: PropTypes.func.isRequired
};

export default Bfore;