import React from 'react';
import PropTypes from 'prop-types';

function Bfore(props){
    return (
        <div className="Bfore">
            <button type="button" onClick={props.backPage}>◀</button>
        </div>
    )
}

Bfore.propTypes={
    renderState: PropTypes.number.isRequired,
    backPage: PropTypes.func.isRequired
};

export default Bfore;