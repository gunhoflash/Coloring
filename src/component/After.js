import React from 'react';
import PropTypes from 'prop-types';

function After(props){
    return (
        <div className="After">
            <input type="button" onClick={props.nextPage} value="▶"></input>
        </div>
    )
}

After.propTypes={
    renderState: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired
};

export default After;