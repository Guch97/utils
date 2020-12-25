# 2020 12 -22
### 1.热更新原理

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

# 2020 12 -24
### 1.防抖函数 
>触发高频函数事件后，n秒内函数只能执行一次，如果在n秒内这个事件再次被触发的话，那么会重新计算时间,频繁操作点赞和取消点赞，因此需要获取最后一次操作结果并发送给服务器
```
functin debounce(fn,time){
   let timer
   if(time){
      clearTimeout(timer)
   }
   timer = setTimeout(()=>{
      fn.apply(this,arguments)
   },time)
}
// 采用了防抖动
window.addEventListener('scroll',debounce(fn,500));
```

### 2. 节流函数
>单位时间只触发一次,window触发resize的时候，不断的调整浏览器窗口大小会不断的触发这个事件，用防抖来让其只触发一次
```
function throttle(fn,wait){
   let prev = new Date()
   return function (){
      const now =  new Date()
      if(now - prev > wait){
         fn.apply(this,arguments)
         prev = new Date()
      }
   }
}



function throttle(fn,wait){
   let valid = true
   if(!valid){
      return false
   }
    valid = false
   setTimeout(()=>{
      fn()
      valid = true
   },wait)
}
```
### 3. 深拷贝
```
function deepClone(obj){
   if(typeof obj==='object'){
      var result = obj.constructor == Array ? [] : {};
       for(let i in obj){
            result[i] = typeof obj[i] == "object" ? deepClone(obj[i]) : obj[i];
        }
   }else {
      var result = obj;
   }
   return result;
}
```
```http常用状态码:```
### 2XX——表明请求被正常处理了

 1、200 OK：请求已正常处理。


2、204 No Content：请求处理成功，但没有任何资源可以返回给客户端，一般在只需要从客户端往服务器发送信息，而对客户端不需要发送新信息内容的情况下使用。

3、206 Partial Content：是对资源某一部分的请求，该状态码表示客户端进行了范围请求，而服务器成功执行了这部分的GET请求。响应报文中包含由Content-Range指定范围的实体内容。
  

***

### 3XX——表明浏览器需要执行某些特殊的处理以正确处理请求

4、301 Moved Permanently：资源的uri已更新，你也更新下你的书签引用吧。永久性重定向，请求的资源已经被分配了新的URI，以后应使用资源现在所指的URI。

5、302 Found：资源的URI已临时定位到其他位置了，姑且算你已经知道了这个情况了。临时性重定向。和301相似，但302代表的资源不是永久性移动，只是临时性性质的。换句话说，已移动的资源对应的URI将来还有可能发生改变。

6、303 See Other：资源的URI已更新，你是否能临时按新的URI访问。该状态码表示由于请求对应的资源存在着另一个URL，应使用GET方法定向获取请求的资源。303状态码和302状态码有着相同的功能，但303状态码明确表示客户端应当采用GET方法获取资源，这点与302状态码有区别。

当301,302,303响应状态码返回时，几乎所有的浏览器都会把POST改成GET，并删除请求报文内的主体，之后请求会自动再次发送。

7、304 Not Modified：资源已找到，但未符合条件请求。该状态码表示客户端发送附带条件的请求时（采用GET方法的请求报文中包含If-Match，If-Modified-Since，If-None-Match，If-Range，If-Unmodified-Since中任一首部）服务端允许请求访问资源，但因发生请求未满足条件的情况后，直接返回304.。

8、307 Temporary Redirect：临时重定向。与302有相同的含义。  
***

### 4XX——表明客户端是发生错误的原因所在。

9、400 Bad Request：服务器端无法理解客户端发送的请求，请求报文中可能存在语法错误。

10、401 Unauthorized：该状态码表示发送的请求需要有通过HTTP认证（BASIC认证，DIGEST认证）的认证信息。

11、403 Forbidden：不允许访问那个资源。该状态码表明对请求资源的访问被服务器拒绝了。（权限，未授权IP等）

12、404 Not Found：服务器上没有请求的资源。路径错误等。

***
### 5XX——服务器本身发生错误

13、500 Internal Server Error：貌似内部资源出故障了。该状态码表明服务器端在执行请求时发生了错误。也有可能是web应用存在bug或某些临时故障。

14、503 Service Unavailable：抱歉，我现在正在忙着。该状态码表明服务器暂时处于超负载或正在停机维护，现在无法处理请求。

```call、apply、bind理解:```


```
1.fun.apply(thisArg,[params,params1])
2.fun.call(thisArg,params,params1,....)
3.fun.bind(thisArg,params,params1,....)
```
+  func的this指向thisArg对象
+  call/apply改变了函数的this的指向并马上执行该函数；
+  bind则是返回改变了this指向后的函数，不执行该函数
  
```闭包:```
+ 用处：1.读取函数内部的变量；  2.这些变量的值始终保持在内存中，不会在外层函数调用后被自动清除。
+ 优点：1:变量长期驻扎在内存中； 2:避免全局变量的污染； 3:私有成员的存在 ；
+ 缺点: 常驻内存 会增大内存的使用量 使用不当会造成内存泄露，（1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。（2）不会被垃圾回收机制回收（3）不能随意改变父函数内部的值。

        

          

    