package main

import (
	"strconv"
	"syscall/js"
)


// wasm: export
func add(this js.Value, i []js.Value) interface{} {
	int1, _ := strconv.Atoi(i[0].String())
	int2, _ := strconv.Atoi(i[1].String())
	
	return js.ValueOf(int1 + int2)
}

// wasm: export
func subtract(this js.Value, i []js.Value) interface{} {
	int1, _ := strconv.Atoi(i[0].String())
	int2, _ := strconv.Atoi(i[1].String())

	return js.ValueOf(int1 - int2)
}

func registerCallbacks() {
	js.Global().Set("add", js.FuncOf(add))
	js.Global().Set("subtract", js.FuncOf(subtract))
}

func main() {
	c := make(chan struct{}, 0)

	println("WASM Go Initialized")
	// register functions
	registerCallbacks()
	<-c
}