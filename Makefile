# local env, for example GOPATH could be setup here
include .env

# install air: go install github.com/cosmtrek/air@latest
default:
	@echo "==> start web"
	${GOPATH}/bin/air
.PHONY: default

db:
	@echo "==> start postgresql"
	sudo service postgresql start
.PHONY: db