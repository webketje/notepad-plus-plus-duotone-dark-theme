.PHONY: dev test prod

##########################################################
# MAIN PARAMETERS, can all be set through env variables
APP_NAME ?= masterthesis
APP_DIR ?= $(shell pwd)
APP_GIT_TAG ?= master
APP_HOST_PORT ?=9800
USER_NAME ?=apache
USER_ID ?=$(shell id -u)
GROUP_NAME ?=apache
GROUP_ID ?=50649780
APP_VOLUME ?=$(APP_NAME)
#### END MAIN PARAMETERS##################################
SERVICE_NAME ?= test


APP_PORT ?= 80

PHPENV ?= test

DOCKER_HOST ?= prefix-kstest-2.ks.icts.org.be:4243


SERVICE_TAG=$(APP_NAME)
SERVICE_TAG_DEV=$(USER_NAME).$(APP_NAME)
DOCKER_TARGET=$(APP_NAME)-$(PHPENV)

check-env:
	@echo " "
	@echo "===== "
	@echo "Environment parameters for building $(APP_NAME) for version $(APP_GIT_TAG) on $(DOCKER_HOST)"
	@echo "Source: $(APP_DIR)"
	@echo "setting runtime env for PHP (Symfony/Laravel) to $(PHPENV)"
	@echo "reachable as $(SERVICE_TAG).$(SERVICE_NAME).service.qsvcd:$(APP_PORT)"
	@echo "Updating version info in templates"
	git log --date=iso-strict --pretty=format:"%ad %h %an %d" -1 > resources/views/includes/version.blade.php
	@echo "===== "

help: check-env
	@echo " "
	@echo "Usage"
	@echo "-----"
	@echo "Build interactive development/test image, specific for your user, (add your user with same uid and make home dir available)"
	@echo "    make app-test"
	@echo "       will build a test version, using your code living in $(APP_DIR)"
	@echo "    make app-dev"
	@echo "       will create an image but mounting $(APP_DIR) inside the container and with Apache running as your user id for development"
	@echo " "

build-archive:
	git archive --format=tar.gz $(APP_GIT_TAG) > archive.tar.gz
	@echo "NOTICE: non committed files in $(APP_GIT_TAG) are not copied into the container"

build-archive-wd:
	tar zcf /tmp/archive.tar.gz --exclude .git --exclude node_modules --exclude archive.tar.gz --exclude Dockerfile --exclude bootstrap/cache/* .
	mv /tmp/archive.tar.gz .

build-docker-dev:
	cat docker/Dockerfile.tmpl | sed -e "s/SERVICE_ID/$(APP_PORT)/" | sed -e "s/#RUNGROUPADD/RUN/" > Dockerfile


build-docker-standalone:
	cat docker/Dockerfile.tmpl | sed "s/SERVICE_ID/$(APP_PORT)/" > Dockerfile
	sed -i -e "s/#CREATEDIR=/RUN mkdir -p \/var\/www\/$(APP_NAME)/" Dockerfile
	sed -i -e "s/#COPYARCHIVE=/COPY archive.tar.gz \/tmp/" Dockerfile
	sed -i -e "s/#RUNEXTRACT=/RUN tar zxf \/tmp\/archive.tar.gz -C \/var\/www\/$(APP_NAME)/" Dockerfile
	sed -i -e "s/#COPYENV=/COPY docker\/env-$(PHPENV)  \/var\/www\/$(APP_NAME)\/.env/" Dockerfile

build-docker-image-dev:
	docker build --no-cache --build-arg SERVICE_NAME=$(SERVICE_NAME) \
	--build-arg SERVICE_TAG=$(SERVICE_TAG_DEV) \
	--build-arg PHPENV=$(PHPENV) \
	--build-arg USER_NAME=$(USER_NAME) \
	--build-arg USER_ID=$(id -u) \
	--build-arg SERVICE_PORT=$(APP_PORT) \
	--build-arg PROJECT=$(APP_NAME) \
	-t $(DOCKER_TARGET) .

build-docker-image-test:
	docker build --build-arg SERVICE_NAME=$(SERVICE_NAME) \
	--build-arg SERVICE_TAG=$(SERVICE_TAG) \
	--build-arg PHPENV=$(PHPENV) \
	--build-arg USER_NAME=$(USER_NAME) \
	--build-arg USER_ID=$(USER_ID) \
	--build-arg GROUP_NAME=$(GROUP_NAME) \
	--build-arg GROUP_ID=$(GROUP_ID) \
	--build-arg SERVICE_PORT=$(APP_PORT) \
	--build-arg PROJECT=$(APP_NAME) \
	-t $(DOCKER_TARGET) .

## Main target for interactive dev environment, mounting local directory inside the container
app-dev: check-env build-docker-dev build-docker-image-dev
	@echo "your service wil run on $(SERVICE_TAG_DEV).test-php72.service.qsvcd:$(APP_PORT)"
	docker run --rm -ti --expose $(APP_PORT) -v "$(APP_DIR):/var/www/$(APP_NAME)/htdocs" -v "/nasfs/groups/fii:/nasfs/groups/fii"  $(DOCKER_TARGET)

## Main target for test deployment, code is pushed inside the container
app-test: check-env build-archive build-docker-standalone build-docker-image-test
	@echo "Building a stand alone installation running on http://prefix-dev-$(USER_NAME)-$(APP_NAME).service.qsvcd"
	docker run --rm -ti --name $(APP_NAME) -v $(APP_VOLUME):/var/www/$(APP_NAME)/storage/app/public --expose $(APP_PORT) $(DOCKER_TARGET)

# using archive built from the current working directory
app-test-wd: check-env build-archive-wd build-docker-standalone build-docker-image-test
	@echo "Building a stand alone installation running on http://prefix-dev-$(USER_NAME)-$(APP_NAME).service.qsvcd"
	docker run --rm -ti --name $(APP_NAME) --expose $(APP_PORT) $(DOCKER_TARGET)



app-win-local: check-env build-archive build-docker-standalone build-docker-image-test
	@echo "Building a stand alone container running on http://localhost:$(APP_HOST_PORT) with PHP env set to $(PHPENV)"
	docker run --rm -ti -p $(APP_HOST_PORT):$(APP_PORT) --name $(APP_NAME) $(DOCKER_TARGET)

app-win-local-wd: check-env build-archive-wd build-docker-standalone build-docker-image-test
	@echo "Building a stand alone container running on http://localhost:$(APP_HOST_PORT) with PHP env set to $(PHPENV)"
	docker run --rm -ti -p $(APP_HOST_PORT):$(APP_PORT) --name $(APP_NAME) $(DOCKER_TARGET)

dev: check-env
	ls $(HOME)
	@echo " I am a developer, w00t"
	@echo "-----------------------"

test-dev: $(PHPENV)
	@echo "Making test ... finally"

service-tag:
	@echo "Service tag: $(SERVICE_TAG)"
	@echo "Service tag dev: $(SERVICE_TAG_DEV)"
