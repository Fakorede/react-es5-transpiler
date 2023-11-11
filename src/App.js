import React, { useState } from 'react';
import _ from 'lodash';
import Input from './components/Input';
import Output from './components/Output';
import './styles.css';
import * as babel from '@babel/standalone';

const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  function handleInputChange(event) {
    try {
      const value = event.target.value;
      setInput(value);
     
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

  return (
    <div>
      <h1>Babel Transpiler</h1>
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
