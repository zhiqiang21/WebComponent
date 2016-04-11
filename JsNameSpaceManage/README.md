## JavaScript 命名空间管理 Demo

----
### JavaScript 作用域

因为 JavaScript 的弱语言的特性。只有`function`是唯一具有块级作用域的标识符。

在平时的开发过程中,我们不仅会声明自己的变量，而且还会引用别人的代码或者是第三方的库。因为 `JavaScript `代码是顺序执行的。后声明的变量会覆盖之前覆盖的变量。

所以在开发过程中对声明变量管理就成为一个非常重要的工作。

正因为这个原因，催生出了`AMD 规范`，`CMD 规范`，为模块化的 `JavaScript` 开发提供了很多的便利。


**这里的 demo 文件主要是通过对象的方式来管理 `JavaScript` 变量的作用域。**

![](http://ww3.sinaimg.cn/large/698e22a9jw1f2eqdse4m4j20es02s3yl.jpg)


代码运行结束以后，我们可以发现，将位于不同目录下的 js 文件 中包含的方法，管理在一个 js 对象中。

![执行结果](http://ww2.sinaimg.cn/large/698e22a9jw1f2dlm5pqlvj20ku09sgn6.jpg)


html 文件中这些单独引入的 js文件可以通过使用前端构建工具合并成一个 js 文件。这个 demo 仅仅是用于演示。

![js 文件列表](http://ww2.sinaimg.cn/large/698e22a9jw1f2dlmhovmfj20fg049q44.jpg)
