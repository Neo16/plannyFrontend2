
import React from 'react';

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

export default If;