import { useReducer } from 'react';
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
      if(state.overwrite) {
        return {
          ...state,
          currentOperand:payload.digit.toString(),
          overwrite: false
        }
      }
      if(payload.digit==='0' && state.currentOperand==='0') return state;
      if(payload.digit==='.' && state.currentOperand.includes('.') ) return state;
      
      return {
        ...state,
        currentOperand: `${state.currentOperand || ''}${payload.digit}`,
        overwrite:false
      }
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state
      }

      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand:state.currentOperand,
          currentOperand: null,
          overwrite:false
        }
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
        overwrite:false,
      }

    case ACTIONS.CLEAR:
      return {};

    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }
      if (state.currentOperand == null) return state
      if (state.currentOperand.lengh === 1) {
        return { ...state, currentOperand: null}
      }

      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1)
      }

    case ACTIONS.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      }
  }
  
}


function evaluate ({currentOperand, previousOperand, operation}) {
  const prev = parseFloat(previousOperand)
  const current = parseFloat(currentOperand)
  // if (isNaN(prev) || isNaN(current)) return ""
  let computation = ""
  switch (operation) {
    case "+":
      if (isNaN(current)) {
        computation = prev
        break
      }
      computation = prev + current
      break
    case "-":
      if (isNaN(current)) {
        computation = prev
        break
      }
        computation = prev - current
        break
    case "*":
      if (isNaN(current)) {
        computation = prev
        break
      }
        computation = prev * current
        break
    case "÷":
      if (isNaN(current)) {
        computation = prev
        break
      }
        computation = prev / current
        break
    }

  return computation.toString();
}

const INTEGER_FORMATTER= new Intl.NumberFormat("en-us", {
  maximumFractionDigits:0
})
function formatOperand (operand){
  if (operand == null) return
  // console.log(operand);
  const [integer, decimal] = operand.split('.')
  // console.log(integer,decimal);
    if (decimal == null){
      // console.log(decimal);
      return INTEGER_FORMATTER.format(integer)
    }
    // console.log('ciao');
    return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
    // return 10
}

function App() {
  const [{currentOperand, previousOperand, operation,overwrite}, dispatch] = useReducer(reducer, {});
  
  return (
    <div className={classes['calculator-grid']}>
        <div className={classes.output}>
          <div className={classes['previus-operand']}>{formatOperand(previousOperand)} {operation}</div>
          <div className={classes['current-operand']}>{formatOperand(currentOperand)}</div>
        </div>
        <button onClick={()=>dispatch({type:ACTIONS.CLEAR})} className={classes['span-two']}>AC</button>
        <button onClick={()=> dispatch({type: ACTIONS.DELETE_DIGIT})}>DEL</button>
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
        <button className={classes['span-two']}  onClick={()=> dispatch({type: ACTIONS.EVALUATE})}>=</button>
    </div>
  );
}

export default App;
export {ACTIONS}