import React, { useReducer, useEffect } from 'react';

import { validate } from '../util/validators';
import './Input.css';

const inputReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        value: action.val,
        isValid: action.validators ? validate(action.val, action.validators) : true
      };
    case 'TOUCH': {
      return {
        ...state,
        isTouched: true
      };
    }
    default:
      return state;
  }
};

const Input = props => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || '',
    isTouched: false,
    isValid: props.initialValid || false
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = event => {
    dispatch({
      type: 'CHANGE',
      val: event.target.value,
      validators: props.validators
    });
  };

  const touchHandler = () => {
    dispatch({
      type: 'TOUCH'
    });
  };

  const element =
    props.element === 'input' ? (
      <input
        id={props.id}
        type={props.type}
        min={props.min}
        max={props.max}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : props.element === 'select' ? (
      <select
        id={props.id}
        name={props.name}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      >
        <option value={''}>Wybierz</option>
        {props.options}
        </select>
      ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        'form-control--invalid'}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p style={(props.id === "zipCode_start" || props.id === "zipCode_end") ? {position:'absolute', left: '20%'} : {}}>{props.errorText}</p>}
    </div>
  );
};

export default Input;
