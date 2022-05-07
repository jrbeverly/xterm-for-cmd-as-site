#!/usr/bin/env bash
cp "$(go env GOROOT)/misc/wasm/wasm_exec.js" wasm/wasm_exec.js

GO111MODULE=off GOOS=js GOARCH=wasm GOCACHE='/tmp' go build -o wasm/main.wasm ../cmd/wasm/main.go