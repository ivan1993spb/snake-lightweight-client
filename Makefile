
EXECUTABLES=git node yarn

_=$(foreach exec,$(EXECUTABLES), \
	$(if $(shell which $(exec)), ok, $(error "No $(exec) in PATH")))

default: build

install:
	@yarn install

serve:
	@yarn serve

build:
	@yarn build

clean:
	@rm -fr dist

test:
	@yarn test:unit

lint:
	@yarn lint
