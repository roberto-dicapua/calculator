import { useReducer, useState } from 'react';
import classes from './App.module.css';

function reducer(state, {type, payload}) {
  
}
function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});
  
  
  return (
    <div className={classes['calculator-grid']}>
        <div className={classes.output}>
          <div className={classes['previus-operand']}>{previousOperand} {operation}</div>
          <div className={classes['current-operand']}>{currentOperand}</div>
        </div>
        <button className={classes['span-two']}>AC</button>
        <button>DEL</button>
        <button>÷</button>
        <button>1</button>
        <button>2</button>
        <button>3</button>
        <button>*</button>
        <button>4</button>
        <button>5</button>
        <button>6</button>
        <button>+</button>
        <button>7</button>
        <button>8</button>
        <button>9</button>
        <button>-</button>
        <button>.</button>
        <button>0</button>
        <button className={classes['span-two']}>=</button>
    </div>
  );
}

export default App;
