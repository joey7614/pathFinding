import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TableCell from './TableCell';
import { mouseDown, setGrid } from '../store/gridReducer';
import { bfs } from '../Algorithms/bfs';
import { backTracking } from '../Algorithms/BackTracking';
let visualizeCells = [];
const Table = () => {
  const dispatch = useDispatch();
  const { down } = useSelector((state) => state.grid);
  const { start, end, grid, green, red, visited, backing, white, wall } =
    useSelector((state) => state.grid);
  const [clear, setClear] = useState(false);
  const [choose, setChoose] = useState('');
  const [clrPath, setClrPath] = useState(false);

  // mounting board
  useEffect(() => {
    const board = initGrid();
    dispatch(setGrid(board));
  }, [clear]);
  // clear all
  function clearCell() {
    setClear(!clear);
    visualizeCells = [];
  }
  // clear Path
  function clearPath() {
    if (visualizeCells.length > 0) {
      for (let i = 0; i < visualizeCells.length; i++) {
        const cell = visualizeCells[i];
        let current = document.getElementById(`cell${cell.row}-${cell.col}`);
        if (
          current.className !== green &&
          current.className !== red &&
          current.className !== wall
        ) {
          cell.isWall = false;
          current.className = white;
        }
        cell.isVisited = false;
        cell.isSeen = false;
        cell.previousCell = null;
      }
      visualizeCells = [];
      setClrPath(!clrPath);
    }
  }
  // drawing
  const handleDrag = (row, col) => {
    if (down) {
      getGridWithWall(grid, row, col);
    }
  };
  //click down
  function handleDown(row, col) {
    dispatch(mouseDown(true));
    getGridWithWall(grid, row, col);
  }
  function handleUp() {
    dispatch(mouseDown(false));
  }
  function createCell(row, col) {
    return {
      col,
      row,
      isStart: row === start[0] && col === start[1],
      isFinish: row === end[0] && col === end[1],
      distance: Infinity,
      isVisited: false,
      isWall: false,
      previousCell: null,
      isSeen: false,
    };
  }
  function initGrid() {
    const board = [];
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        let current = document.getElementById(`cell${row}-${col}`);
        if (current) {
          if (current.className !== green && current.className !== red) {
            current.className = white;
          }
        }
        currentRow.push(createCell(row, col));
      }
      board.push(currentRow);
    }
    return board;
  }
  function getGridWithWall(grid, row, col) {
    const newGrid = grid.slice(); //change it
    const cell = newGrid[row][col];
    const newCell = { ...cell, isWall: !cell.isWall, isSeen: !cell.isSeen };
    newGrid[row][col] = newCell;
    dispatch(setGrid(newGrid));
  }

  function chosenAlgo(str) {
    switch (str) {
      case 'BFS':
        if (visualizeCells.length === 0) {
          visualizeCells = bfs(
            grid,
            grid[start[0]][start[1]],
            grid[end[0]][end[1]]
          );
        }
        setChoose('BFS');
      default:
        break;
    }
  }
  function animateBackTracking(arr) {
    for (let j = 0; j < arr.length; j++) {
      let cell = arr[j];
      let current = document.getElementById(`cell${cell.row}-${cell.col}`);
      setTimeout(() => {
        if (current.className !== green && current.className !== red) {
          current.className = backing;
        }
      }, 30 * j);
    }
  }
  function startSearching() {
    clearPath();
    if (visualizeCells.length === 0) {
      chosenAlgo(choose);
    }
    if (visualizeCells.length > 0) {
      for (let i = 0; i <= visualizeCells.length; i++) {
        if (i === visualizeCells.length) {
          const backingUp = backTracking(grid[end[0]][end[1]]);
          setTimeout(() => {
            animateBackTracking(backingUp);
          }, 2 * i);
          return;
        }
        setTimeout(() => {
          const cell = visualizeCells[i];
          let current = document.getElementById(`cell${cell.row}-${cell.col}`);
          if (current.className !== green && current.className !== red) {
            current.className = visited;
          }
        }, 2 * i);
      }
    }
  }
  return (
    <div>
      <div>
        <button onClick={startSearching}> Start search</button>
        <button onClick={clearCell}> clear all</button>
        <button onClick={clearPath}> clear Path</button>
      </div>
      <div>
        <button onClick={(_) => chosenAlgo('BFS')}> BFS</button>
        <button onClick={(_) => chosenAlgo('Dijkstra')}> Dijkstra's Algorithms</button>
      </div>
      <table>
        <tbody>
          {grid.map((row, index) => (
            <tr key={index}>
              {row.map((cell, cellIndex) => {
                const { row, col, isFinish, isStart, isWall } = cell;
                return (
                  <TableCell
                    key={cellIndex}
                    isFinish={isFinish}
                    isStart={isStart}
                    isWall={isWall}
                    handleDown={(row, col) => handleDown(row, col)}
                    handleUp={handleUp}
                    handleDrag={(row, col) => handleDrag(row, col)}
                    row={row}
                    col={col}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
