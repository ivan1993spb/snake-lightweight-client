
EXECUTABLES=git node yarn docker

_=$(foreach exec,$(EXECUTABLES), \
	$(if $(shell which $(exec)), ok, $(error "No $(exec) in PATH")))

DOCKER_IMAGE_TAG=ivan1993spb/snake-lightweight-client

VERSION=$(shell git describe --tags --abbrev=0)
BUILD=$(shell git rev-parse --short HEAD)

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

docker/build: build
	@docker build -t $(DOCKER_IMAGE_TAG):$(VERSION) .
	@docker tag $(DOCKER_IMAGE_TAG):$(VERSION) $(DOCKER_IMAGE_TAG):latest
	@echo "Build $(BUILD) tagged $(DOCKER_IMAGE_TAG):$(VERSION)"
	@echo "Build $(BUILD) tagged $(DOCKER_IMAGE_TAG):latest"

docker/push:
	@echo "Push build $(BUILD) with tag $(DOCKER_IMAGE_TAG):$(VERSION)"
	@docker push $(DOCKER_IMAGE_TAG):$(VERSION)
	@echo "Push build $(BUILD) with tag $(DOCKER_IMAGE_TAG):latest"
	@docker push $(DOCKER_IMAGE_TAG):latest
