import React from 'react';
import PropTypes from 'prop-types';
import { CSSTransitionGroup } from 'react-transition-group';

function Result(props) {
  console.log('00000000', props.animal);
  return (
    <CSSTransitionGroup
      className="container result"
      component="div"
      transitionName="fade"
      transitionEnterTimeout={800}
      transitionLeaveTimeout={500}
      transitionAppear
      transitionAppearTimeout={500}
    >
      <div>
        <p className="Text-center">{props.quizResult}</p>
      </div>
      <hr />
      <div>
        <p className="Text-center">
        <img src={props.image} height="250px" /><br />
        {props.fact}</p>
      </div>

    </CSSTransitionGroup>
  );
}

Result.propTypes = {
  quizResult: PropTypes.node.isRequired,
  image: PropTypes.string.isRequired,
  fact: PropTypes.node.isRequired
};

export default Result;
