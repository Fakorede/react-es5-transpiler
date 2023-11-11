import React, { useState, useEffect, useRef } from 'react';
import * as babel from '@babel/standalone';
import _ from 'lodash';
import Input from './components/Input';
import Output from './components/Output';
import './styles.css';

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const ref = useRef();

  useEffect(() => {
    ref.current = _.debounce(generateResult, 1000);
  }, []);

  useEffect(() => {
    try {
      const value = localStorage.getItem('babel_code');
      setInput(JSON.parse(value));
    } catch (e) {
      setInput('');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('babel_code', JSON.stringify(input));
  }, [input]);

  function generateResult(value) {
    try {
      const result = babel.transform(value, {
        presets: ['env', 'react'],
        filename: '/App.js'
      }).code;

      setOutput(result);
      setErrorMsg('');
    } catch (e) {
      setErrorMsg(e.message);
    }
  }

  function handleInputChange(event) {
    const value = event.target.value;
    setInput(value);
    ref.current(value);
  }

  return (
    <div>
      <h1>React ES6 to ES5 Transpiler</h1>
      <Input
        input={input}
        handleInputChange={handleInputChange}
        errorMsg={errorMsg}
      />
      <Output output={output} hasError={!_.isEmpty(errorMsg)} />
    </div>
  );
}

export default App;
