import React from 'react';
import PropTypes from 'prop-types';
import currency1 from '../svg/currency1.png';
import currency2 from '../svg/currency2.png';
import currency3 from '../svg/currency3.png';
import currency4 from '../svg/currency4.png';

const currencies = {
	'currency1': currency1,
	'currency2': currency2,
	'currency3': currency3,
	'currency4': currency4
}

function Question(props) {
  const currency = currencies[props.image];
  return <div>
  	<br />
  	<div className="App-header">
    	<img src={currency} className="App-logo" alt="logo" />
    </div>	
	<br />
	<h2 className="question">{props.content}</h2>
	</div>;
}

Question.propTypes = {
  content: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Question;
