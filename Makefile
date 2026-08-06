.DEFAULT_GOAL := help

DEV_HOST ?= 127.0.0.1
DEV_PORT ?= 4321

.PHONY: help dev build preview lighthouse

help:
	@echo "Available targets:"
	@echo "  make dev                         Start the local Astro development server"
	@echo "  make build                       Build the production site"
	@echo "  make preview                     Preview the production build locally"
	@echo "  make lighthouse                  Run Lighthouse CI on the production build (mobile)"

dev:
	npm run dev -- --host $(DEV_HOST) --port $(DEV_PORT)

build:
	npm run build

preview:
	npm run preview -- --host $(DEV_HOST) --port $(DEV_PORT)

lighthouse:
	npm run lighthouse
