# 2020 12 -22
1.热更新原理

```启动阶段```
+ 代码文件通过 webpack  进行打包 
+ 将打包好的文件传输给 Bundle Server
+ Bundle Server让文件以服务器的方式让浏览器可以访问到
+ 代码展示


``` 更新阶段```
+ 变更后的代码同样会通过 webpack 进行打包编译
+ 编译好之后会发送给 HMR Server
+ 然后通过websorket 通知 HMR Runtime
+ HMR Runtime 在接收到文件变化后，就会更新代码,最终代码更新，且无需刷新浏览器

