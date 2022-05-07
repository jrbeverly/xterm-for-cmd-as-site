# XTerm for Terminal as Browser

Experimenting with the idea of a minimum environment for running terminal applications in browser. In essence, allowing a user to navigate to `example.com/terminal` to view a terminal version of the sites API. With the appropriate token & other bits provided from the browser session tokens.

## Notes

- WebAssembly for Golang can be used in combination with this
- Browser token can be used to authenticate with the service, allowing for commands to exec against it
- Using something like the `cobra` yaml export (or deriving actions from OpenAPI-like spec), the JS interface can be generated
- Validation would be performed within the cmd, although a common 'OpenAPI-like' spec would help reduce the complexity on this front (have better interacted with UIs)
- Leveraging other wrapper frameworks for xTerm.js would probably suit better for any syntax highlighting that would be desired / color schemas / etc
- Integration with local machine state for browsers would need to be something handled by the tool itself
- Better option might just be a browser "terminal" that understands an OpenAPI-like spec & appropriate JS/WASM bindings
