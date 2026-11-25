# Run inside the devcontainer (or `nix develop`), which installs the web app's packages once.
# `make dev` starts the engine, then the web app once the engine answers; Ctrl-C stops both. For a
# terminal each, run `make engine` and `make web`.
ENGINE_PORT ?= 47919
ENGINE_URL = http://127.0.0.1:$(ENGINE_PORT)

.PHONY: dev engine web check

dev:
	@trap 'trap - EXIT; kill 0' INT TERM EXIT; \
	$(MAKE) --no-print-directory engine & \
	ENGINE_PID=$$! $(MAKE) --no-print-directory web

engine:
	cargo run -p torrential -- engine run --http-port $(ENGINE_PORT)

# With ENGINE_PID set, `make dev` passes the engine's process, and the wait gives up if it exits.
web:
	@echo "Waiting for the engine at $(ENGINE_URL)"
	@until curl -s -o /dev/null $(ENGINE_URL)/api/version; do \
		if [ -n "$$ENGINE_PID" ] && ! kill -0 $$ENGINE_PID 2>/dev/null; then echo "The engine exited." >&2; exit 1; fi; \
		sleep 1; \
	done
	cd web && TORRENTIAL_ENGINE=$(ENGINE_URL) bun run dev

check:
	cd web && bun run check
