import React from 'react';
import PropTypes from 'prop-types';
import Bfore from './Bfore.js';
import After from './After.js';

function Home(props){
    return(
        <div className="Home">
            This is Home component!
            <Bfore
                renderState={props.renderState}
                backPage = {props.backPage.bind(this)}
            />
            <After
                renderState={props.renderState}
                nextPage = {props.nextPage.bind(this)}
            />
        </div>
    )
}


Home.propTypes={
    renderState: PropTypes.number.isRequired,
    nextPage: PropTypes.func.isRequired,
    backPage: PropTypes.func.isRequired
  };

export default Home;