import React from 'react';
import { render } from 'react-dom';
import NewTerminal from './components/term';
import App from './App';
import 'xterm/css/xterm.css'

const domRoot = document.getElementById('root');
const domTerminal = document.getElementById('terminal');

render(<App />, domRoot);
NewTerminal(domTerminal, 'cobrago')