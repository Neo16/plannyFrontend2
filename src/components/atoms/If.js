
import React from 'react';

import PropTypes from 'prop-types';

const If = (props) => {
  if (props.condition) {
    return (
      <React.Fragment>
        { props.children }
      </React.Fragment>
    )
  }
  return null
}

If.propTypes = {
  condition: PropTypes.any.isRequired,
  children: PropTypes.any.isRequired,
}

export default If;