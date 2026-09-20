# 我的配置

## 目录

- [.gitlab-ci.yml](#gitlab-ciyml)
- [Dockerfile](#Dockerfile)
- [docker-compose.yaml](#docker-composeyaml)
- [修正缓存](#修正缓存)
  - [.gitlab-ci.yml](#gitlab-ciyml)

# .gitlab-ci.yml

```bash 
stages:
  - test
  - install
  - build
  - deploy


# 缓存
cache:
  key: 'node_modules'
  paths:
    - node_modules/





before_script:
  - pwd


# 定义代码验证的 job
code-lint:
  stage: test
#  when: manual  #手动执行
  image: node:14-alpine
  script:
    - ls
    - echo Hello code-lint
    - ls
  allow_failure: true # 运行失败,代码验证失败后仍然会执行后续 job
  except:
    - /^main.*$/
  tags:
    - test
#  only:
#    - /^main.*$/
#  cache: {}   #不使用缓存

code-install:
  stage: install
  image: node:14-alpine
  cache:
    key: 'node_modules'
    paths:
      - node_modules
    policy: push
  script:
    - ls
    - echo 'begin install'
    - npm config set registry https://registry.npm.taobao.org/
    - npm config get registry
    - npm install
    - echo 'install success'
    - ls
  allow_failure: true # 运行失败,代码验证失败后仍然会执行后续 job
  tags:
    - test
#  only:
#    - /^main.*$/
  except:
    - /^main.*$/




code-build:
  stage: build
  image: node:14-alpine
  tags:
    - test
  cache:
    key: 'node_modules'
    policy: pull
    paths:
      - node_modules/
  script:
    - ls
    - echo 'begin build'
    - npm run build
    - echo 'build success'
    - ls
#  only:
#    - /^main.*$/
  except:
    - /^main.*$/
  allow_failure: true
  artifacts:
    name: "dist"
    paths:
      - dist/



job_deploy:
  stage: deploy
  image: docker
  #  when: always
  tags:
    - test # 指定运行的runner，因为不可指定全局的runner，所以在各个阶段都指定这个tags
  script:
    - ls
    - echo 'begin docker'
    - docker images
    - docker container ls
    - docker build -t docker-nginx-gitlab-runner-image -f Dockerfile . #产生这个镜像
    - docker images
    - if [ $(docker ps -aq --filter name==docker-nginx-gitlab-runner-container) ]; then docker rm -f docker-nginx-gitlab-runner-container;fi   # 判断当前有没有这个容器
    - docker container ls
    - docker run --rm -p 4000:80 --name docker-nginx-gitlab-runner-container -d docker-nginx-gitlab-runner-image
  only:
    - /^main.*$/
#    variables:   #提交信息 以deploy开头
#      - $CI_COMMIT_MESSAGE =~ /^deploy/
```


# Dockerfile

```bash 
FROM node:14-alpine as builder

WORKDIR /code
#ENV PUBLIC_URL https://shanyue-cra.oss-cn-beijing.aliyuncs.com/Ω
# 单独分离 package.json，是为了安装依赖可最大限度利用缓存
ADD package.json package-lock.json /code/
RUN npm i

ADD . /code
# 单独分离 public/src，是为了避免 ADD . /code 时，因为 Readme/nginx.conf 的更改避免缓存生效
# 也是为了 npm run build 可最大限度利用缓存
#ADD public /code/public
#ADD src /code/src

RUN npm run build


# 选择更小体积的基础镜像
FROM nginx:alpine
ADD nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder code/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

```


# docker-compose.yaml

```bash 
version: "3"
services:
  simple:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - 4000:80

```


**最后成功的运行了；太不容易了**

# 修正缓存

## .gitlab-ci.yml

```bash 
stages:
  - install
  - test
  - build
  - deploy

before_script:
  - pwd

# 缓存
#cache:
#  key: 'node_modules'
#  paths:
#    - node_modules/


code-install:
  stage: install
  image: node:14-alpine
  #  cache:
  #    key: 'node_modules'
  #    paths:
  #      - node_modules
  #    policy: push
  script:
    - ls
    - echo 'begin install'
    - npm config set registry https://registry.npm.taobao.org/
    - npm config get registry
    - npm install
    - echo 'install success'
    - ls
  allow_failure: true # 运行失败,代码验证失败后仍然会执行后续 job
  tags:
    - test
  cache:
    key:
      files:
        - package.json
        - package-lock.json
    paths:
      - node_modules/
  only:
    changes:
      - package.json
      - package-lock.json

#  except:
#    - /^main.*$/





# 定义代码验证的 job
code-lint:
  stage: test
#  when: manual  #手动执行
  image: node:14-alpine
  script:
    - ls
    - echo Hello code-lint
    - ls
  allow_failure: true # 运行失败,代码验证失败后仍然会执行后续 job
#  except:
#    - /^main.*$/
  tags:
    - test
  only:
    - /^main.*$/
#  cache: {}   #不使用缓存






code-build:
  stage: build
  image: node:14-alpine
  tags:
    - test
#  cache:
#    key: 'node_modules'
#    policy: pull
#    paths:
#      - node_modules/
  cache:
    key:
      files:
        - package.json
        - package-lock.json
    policy: pull
    paths:
      - node_modules/
  script:
    - ls
    - echo 'begin build'
    - npm run build
    - echo 'build success'
    - ls
  only:
    - /^main.*$/
#  except:
#    - /^main.*$/
  allow_failure: true
  artifacts:
    name: "dist"
    paths:
      - dist/



job_deploy:
  stage: deploy
  image: docker
  #  when: always
  tags:
    - test # 指定运行的runner，因为不可指定全局的runner，所以在各个阶段都指定这个tags
  script:
    - ls
    - echo 'begin docker'
    - docker images
    - docker container ls
    - docker build -t docker-nginx-gitlab-runner-image -f Dockerfile . #产生这个镜像
    - docker images
    - if [ $(docker ps -aq --filter name==docker-nginx-gitlab-runner-container) ]; then docker rm -f docker-nginx-gitlab-runner-container;fi   # 判断当前有没有这个容器
    - docker container ls
    - docker run --rm -p 4000:80 --name docker-nginx-gitlab-runner-container -d docker-nginx-gitlab-runner-image
#  only:
#    - /^main.*$/
  except:
    - /^main.*$/
#    variables:   #提交信息 以deploy开头
#      - $CI_COMMIT_MESSAGE =~ /^deploy/
```


**注意：这个files 放在全局缓存 处会失败；只能放在job里**
