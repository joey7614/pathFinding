import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const TableCell = (props) => {
  let { row, col } = props
  const {green, red, visited, wall , white} = useSelector(
    (state) => state.grid
  );
  let subclass = white;
  if (props.isFinish) {
    subclass = red
  } else if (props.isStart) {
    subclass = green
  } else if (props.isWall) {
    subclass = wall
  } else if(props.isVisited){
    subclass = visited
  } 
  return (
    <td
      onMouseDown={() => props.handleDown(row, col)}
      onMouseUp={props.handleUp}
      onMouseEnter={() => props.handleDrag(row, col)}
      id = {`cell${row}-${col}`}
      className={subclass}
    ></td>
  );
}

export default TableCell