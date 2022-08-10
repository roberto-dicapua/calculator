import { useReducer, useState } from 'react';
import classes from './App.module.css';
import DigitButtons from './DigitButtons';
import OperationButton from './OperationButton';

const ACTIONS={
  ADD_DIGIT:'add-digit',
  CHOOSE_OPERATION:'choose-operation',
  CLEAR:'clear',
  DELETE_DIGIT:'delete-digit',
  EVALUATE:'evaluate',
}
function reducer(state, {type, payload}) {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
    console.log(state.currentOperand);
    if(payload.digit==='0' && state.currentOperand==='0') return state;
    if(payload.digit==='.' && state.currentOperand.includes('.') ) return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`
      }
    case ACTIONS.CLEAR:
      return {};
  }
}
function App() {
  const [{currentOperand, previousOperand, operation}, dispatch] = useReducer(reducer, {});
  
  return (
    <div className={classes['calculator-grid']}>
        <div className={classes.output}>
          <div className={classes['previus-operand']}>{previousOperand} {operation}</div>
          <div className={classes['current-operand']}>{currentOperand}</div>
        </div>
        <button onClick={()=>dispatch({type:ACTIONS.CLEAR})} className={classes['span-two']}>AC</button>
        <button>DEL</button>
        <OperationButton operation='÷' dispatch={dispatch}/>
        <DigitButtons digit={1} dispatch={dispatch}/>
        <DigitButtons digit={2} dispatch={dispatch}/>
        <DigitButtons digit={3} dispatch={dispatch}/>
        <OperationButton operation='*' dispatch={dispatch}/>
        <DigitButtons digit={4} dispatch={dispatch}/>
        <DigitButtons digit={5} dispatch={dispatch}/>
        <DigitButtons digit={6} dispatch={dispatch}/>
        <OperationButton operation='+' dispatch={dispatch}/>
        <DigitButtons digit={7} dispatch={dispatch}/>
        <DigitButtons digit={8} dispatch={dispatch}/>
        <DigitButtons digit={9} dispatch={dispatch}/>
        <OperationButton operation='-' dispatch={dispatch}/>
        <DigitButtons digit='.' dispatch={dispatch}/>
        <DigitButtons digit={0} dispatch={dispatch}/>
        <button className={classes['span-two']}>=</button>
    </div>
  );
}

export default App;
export {ACTIONS}