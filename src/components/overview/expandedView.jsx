import React from 'react';

var ExpandedView = (props) => {

  return (props.render ? (
    <div id='popup'>
      <div id='popUpBox'>
        <h1>EXPANDED VIEW</h1>
      </div>
    </div>
  ) : '');
};

export default ExpandedView;