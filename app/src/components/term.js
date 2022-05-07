import {Terminal} from 'xterm';
import init, { add, subtract } from 'wasm'

let term;
var command = '';

const ExecCmd = (term, text) => {
    const command = text.trim().split(' ')[0];
    if (command.length > 0) {
        term.writeln('');
        if (command in commands) {
            commands[command].f();
            return;
        }
        term.writeln(`${command}: command not found`);
    }
}

// Commands

const cmdClearText = () => {
    term.clear();
}

const cmdAdd = () => {
    var params = command.split(' ');
    if (params.length < 3) {
        term.writeln("Error: Missing parameters for function");
        return;
    }

    var firstNum = params[1];
    var secondNum = params[2];
    term.write(`result: ${add(firstNum, secondNum)}`);
}

const cmdSubtract = () => {
    var params = command.split(' ');
    if (params.length < 3) {
        term.writeln("Error: Missing parameters for function");
        return;
    }

    var firstNum = params[1];
    var secondNum = params[2];
    term.write(`result: ${subtract(firstNum, secondNum)}`);
}


var commands = {
    help: {
        f: () => {
            const highlightName = (text) => `\x1b[34m${text}\x1b[0m`
            const highlightHeader = (text) => `\x1b[36m${text}\x1b[0m`

            term.writeln([
                highlightHeader(' Print command list from Help.'),
                '',
                ...Object.keys(commands).map(e => `   ${highlightName(e.padEnd(10))} ${commands[e].description}`)
            ].join('\n\r'));
        },
        description: 'Prints this help message',
    },
    clear: {
        f: cmdClearText,
        description: 'Clears the text on the screen',
    },
    add: {
        f: cmdAdd,
        description: 'Add 2 numbers',
    },
    subtract: {
        f: cmdSubtract,
        description: 'Subtract 2 numbers',
    }
};


const Motd = (term) => {
    term.writeln([
        '',
        ' ── \x1b[1mCommands\x1b[0m ──────────────────────────────────────────────────────────────────',
    ].join('\n\r'));
    ExecCmd(term, 'help');
    term.writeln([
        '',
        ' ──────────────────────────────────────────────────────────────────────────────',
        ''
    ].join('\n\r'));

    term.writeln('Below is a simple emulated backend, try running `help`.');
}

//

const NewTerminal = (domTerminal, name) => {
    term = new Terminal({
        fontFamily: '"Cascadia Code", Menlo, monospace',
        cursorBlink: true
    });
    term.open(domTerminal, false);

    init();

    const shellprompt = '$ > ';
    term.prompt = function () {
        term.write('\r\n' + shellprompt);
    };

    Motd(term);
    term.prompt();

    // term.on('paste', function (data, ev) {
    //     term.write(data);
    // });

    term.onData(key => {
        switch (key) {
            case '\u0003': // Ctrl+C
                term.write('^C');
                term.prompt();
                break;
            case '\r': // Enter
                ExecCmd(term, command);
                command = '';
                term.prompt();
                break;
            case '\u007F': // Backspace (DEL)
                // Do not delete the prompt
                if (term._core.buffer.x > shellprompt.length) {
                    term.write('\b \b');
                    if (command.length > 0) {
                    command = command.substr(0, command.length - 1);
                    }
                }
                break;
            default:
                if ((key >= String.fromCharCode(0x20) && key <= String.fromCharCode(0x7E)) || key >= '\u00a0') {
                    command += key;
                    term.write(key);
                }
        }
    });

    return term;
}

export default NewTerminal;
