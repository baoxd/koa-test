[![Build Status](https://travis-ci.org/baoxd/koa-test.svg?branch=master)](https://travis-ci.org/baoxd/koa-test)
[![Coverage Status](https://coveralls.io/repos/github/baoxd/koa-test/badge.svg)](https://coveralls.io/github/baoxd/koa-test)

# 说明
简单的koa2框架练习，koa2相比koa在中间件实现上有较大改变，koa中间件基于generator函数、co模块实现，koa2基于async函数实现中间件的异步编程。 koa2 兼容原koa的generator函数方法，原理在于koa2的use函数将gen函数使用koa-convert包转化。 其中koa-convert的原理也是基于co模块将gen转换为Promise对象。这符合async函数执行后返回Promise的特点，从而达到兼容的目的。

# 目标
通过此项目 熟悉koa框架使用、了解其原理。 添加简单测试用例、简单持续集成等内容。

# 内容
koa是一个web框架，所以这次练习用koa做一个原来做过的，基于express框架的后台管理系统

# 更新
## 添加react服务端渲染
 
react服务端渲染测试。服务端渲染有以下好处：
1. SEO，让搜索引擎更容易读取页面内容
2. 首屏渲染速度更快（重点），无需等待js文件下载执行的过程
3. 更易于维护，服务端和客户端可以共享某些代码

服务端渲染没有完美的解决方案，项目中的实际问题还需慢慢探索