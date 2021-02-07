import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultFooter extends Component {
  render() {
      return (
          <React.Fragment>
        <span>CoStats &copy;2020 <a href="http://www.inpt.ac.ma/">INPT</a>.</span>
        <span className="ml-auto">Powered by <a href="https://reactjs.org/">ReactJS</a></span>
      </React.Fragment>
    );
  }
}

DefaultFooter.propTypes = propTypes;
DefaultFooter.defaultProps = defaultProps;

export default DefaultFooter;
