# cicd

如果想要把 `Docker` 的构建流程和 `CD/CI` 结合起来，以 `github action `为例，类似的 `gitlab ci`、`jenkins pipeline` 都是类似的，便不再赘述。整个流水线的流程还是按照文章开头给出的流程图，结合文章中给出的步骤，还是比较简单的。
首先创建一个工作流的 yaml 文件：

```yaml 
# This is a basic workflow to help you get started with Actions
name: Learning Route CI
# Controls when the workflow will run
on: [push]
# A workflow run is made up of one or more jobs that can run sequentially or in parallel
jobs:
  # This workflow contains a single job called "build"
  build:
    # The type of runner that the job will run on
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
      # Checks-out your repository under $GITHUB_WORKSPACE, so your job can access it
      - uses: actions/checkout@v3

      # Runs a single command using the runners shell
      - name: Build docker image
        run: docker build -t blog .

      # Runs a set of commands using the runners shell
      - name: Create container by image
        run: docker run -d -p 80:80 blog --name blog

      - name: Start container log
        run: docker container ls

```
