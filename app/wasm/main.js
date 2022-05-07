let wasm;

const wasmfile = require('./main.wasm')

export function subtract(firstNumber, secondNumber) {
    const ret = wasm.subtract(firstNumber, secondNumber);
    return ret;
}

export function add(firstNumber, secondNumber) {
    const ret = wasm.add(firstNumber, secondNumber);
    return ret;
}

async function load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

async function init(input) {
    if (typeof input === 'undefined') {
        input = wasmfile;
    }
    
    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }
    
    // Set `wasm` to be equal to global, allowing the 'wasm.add' model to work for this mapping
    wasm = globalThis;

    const go = new Go();
    const { instance, module } = await load(await input, go.importObject);

    go.run(instance);
    return wasm;
}

export default init;

