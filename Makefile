.DEFAULT_GOAL:=help
SHELL:=/bin/bash

.PHONY: help wasm build serve init

wasm: ## Build a copy of the application
	cp "$(shell go env GOROOT)/misc/wasm/wasm_exec.js" app/public/wasm_exec.js
	GO111MODULE=off GOOS=js GOARCH=wasm GOCACHE='/tmp' go build -o app/wasm/main.wasm cmd/wasm/main.go

init: wasm ## Initialize the application
	(cd app && npm install)

build: wasm ## Build and run a copy of the application
	(cd app && npm run build && npm run start)

serve: wasm ## Build and serve a copy of the application
	(cd app && npm run build && npm run start)

help: ## Display this help message
	@awk 'BEGIN {FS = ":.*##"; printf "\nUsage:\n  make \033[36m\033[0m\n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)