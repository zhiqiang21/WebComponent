## JavaScript 命名空间管理 Demo

----
### JavaScript 作用域

因为 JavaScript 的弱语言的特性。只有`function`是唯一具有块级作用域的标识符。
所以在平时的开发过程中对变量名的管理和对引入的第三方插件的管理，就成为了一个非常重要的工作。

正因为这个原因，催生出了`AMD 规范`，`CMD 规范`，和一些库文件比如：`require.js`等；


**这里的这里的 demo 文件主要是通过对象的方式来管理 JavaScript 变量的作用域。
**

代码运行结束以后，我们可以发现，将位于不同目录下的 js 文件 中包含的方法，管理在一个 js 对象中。

![执行结果](http://ww2.sinaimg.cn/large/698e22a9jw1f2dlm5pqlvj20ku09sgn6.jpg)



html 文件中这些单独引入的 js文件可以通过使用前端构建工具合并成一个 js 文件。这个 demo 仅仅是用于演示。

![js 文件列表](http://ww2.sinaimg.cn/large/698e22a9jw1f2dlmhovmfj20fg049q44.jpg)
