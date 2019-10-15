# SDX-Component

> SDX组件库项目，采用monorepo的开发方式，基于Lerna进行多项目的管理与协调。

## Start

- 准备

**!!! 开发请先阅读[组件库开发规范](./组件库开发规范.md)**

建议先将npm registry设置成公司的私有npm服务地址：[http://192.168.20.38:4873](http://192.168.20.38:4873)

关于npm的registry管理可以参考[NPM私有仓库.md](./NPM私有仓库.md)

- 安装依赖

在根目录下

```
npm install 
```
或
```
yarn
```

- lerna启动

```
lerna bootstrap
```
会在每个包下面执行npm install安装依赖，包括项目间的软连接，详情查看[Lerna项目管理.md](./Lerna项目管理.md)或Lerna官方文档。

- 开发环境

```
npm run dev
```

开发环境只是启动example项目，可以在example项目中引用组件库中的组件进行调试

- 提交代码

```
git add .
npm run cm
```

会启动一个交互式命令行，自动生成格式规范的commit comment

- 打包构建

```
npm run build
```

- 分包构建

```
npm run build:ui  // 构建ui组件
npm run build:widget // 构建widget组件
npm run build:view  // 构建view组件
npm run build:utils // 构建utils包
```

## 版本管理

```master``` 分支：用于维护发布稳定版本，当前稳定版本版本号为1.x.y。当稳定版本需要升级时，向master版本提pr，master版本发布1.x.(y+1)或1.x+1.0版本。

<br />

```next``` 分支：用于维护发布开发版本，当前开发版本号为2.x.y。当开发版本需要发布时，向next分支提pr，next版本发布2.x.y+1 或2.x+1.0版本。

例如：<br>
- 当前处于SDX-Full版本的开发阶段，Full版本开发阶段应向next分支提pr，发布时应该发布2.x.y的版本号。

- 而SDX_Base版本已经稳定准备发布，对SDX_Base版本的维护，应该向master分支提pr，同时向next分支提pr；master分支发布1.x.y的版本号。

- 当SDX-Full版本发布变更为稳定版本，SDX_Base已经不需要维护时，master分支更换为维护2.x.y的版本号，next分支用于维护开发版本3.x.y，以此类推。



