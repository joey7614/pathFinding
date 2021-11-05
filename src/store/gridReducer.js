//=============initial state ==============
const initialState = {
  grid: [],
  down: false,
  start: [10, 10],
  end: [10, 40],
  visited: 'white visited',
  green: 'white start',
  backing: 'white backing',
  red: 'white end',
  white: 'white',
  wall: 'white black',
};

//============= Action type ==============
const MOUSE_DOWN = 'MOUSE_DOWN';
const DRAG_START = 'DRAG_START';
const SET_GRID = 'SET_GRID'
//============= Action creator ==============
export const mouseDown = (down) => ({
  type: MOUSE_DOWN,
  down: down,
});
export const dragStart = (x, y) => ({
  type: DRAG_START,
  start:[x, y]
})

export const setGrid = (grid) => ({
  type: SET_GRID,
  grid
})
  
export default function gridReducer(state = initialState, action) {
  switch (action.type) {
    case MOUSE_DOWN:
      return { ...state, down: action.down };
    case DRAG_START:
      return { ...state, start: action.start };
    case SET_GRID:
      return { ...state, grid: action.grid }
    default:
      return state;
  }
}
