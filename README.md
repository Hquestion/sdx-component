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
```

暂未设计utils组件的构建，可不构建直接发布，在应用中构建

