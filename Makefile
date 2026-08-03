.DEFAULT_GOAL := help

DEV_HOST ?= 127.0.0.1
DEV_PORT ?= 4321

.PHONY: help dev build preview publish publish-dry-run

help:
	@echo "Available targets:"
	@echo "  make dev                         Start the local Astro development server"
	@echo "  make build                       Build the production site"
	@echo "  make preview                     Preview the production build locally"
	@echo "  make publish                     Build, create the next release tag, and push"
	@echo "  make publish VERSION=1.2.0       Publish an explicit semantic version"
	@echo "  make publish-dry-run             Validate and show the next release tag"

dev:
	npm run dev -- --host $(DEV_HOST) --port $(DEV_PORT)

build:
	npm run build

preview:
	npm run preview -- --host $(DEV_HOST) --port $(DEV_PORT)

publish:
	./scripts/publish.sh $(if $(VERSION),--version $(VERSION),)

publish-dry-run:
	./scripts/publish.sh --dry-run $(if $(VERSION),--version $(VERSION),)
