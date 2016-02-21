## html5-qrcode 使用文档

----

### 功能：
**1.**h5页面在微博客户端中呼起摄像头扫描二维码并且解析。
**2.**h5页面在非微博客户端中（原生浏览器或者微信客户端）呼起系统拍照或者上传图片按钮，拍照二维码或者上传二维码并且解析

### demo演示地址：

[http://test.qrcode.weibo.com/zhiqiang/WebComponent/html5-Qrcode/](http://test.qrcode.weibo.com/zhiqiang/WebComponent/html5-Qrcode/)

需要配置 hosts :
`xx.xxx.xxx.233 test.qrcode.weibo.com`

### 说明：
此插件需要配合`zepto.js` 或者 `jQuery.js`使用


### 使用方法：
**1.**在需要使用的页面按照下面顺序引入`lib`目录下的 js 文件

```javascript
    <script src="lib/zepto.js"></script>
    <script src="lib/qrcode.lib.min.js"></script>
    <script src="lib/qrcode.js"></script>
```

**2.**自定义按钮的 html 样式
为自定义的按钮添加自定义属性，属性名称为`node-type`
为 input 按钮添加自定义的属性, 属性名称为`node-type`

>因为该插件需要使用`<input type="file" />` ，该 html 结构在网页上面是有固定的显示样式，为了能够自定义按钮样式，我们可以按照下面的示例代码结构嵌套代码

```html
    <div>
        <div class="qr-btn" node-type="qr-btn">扫描二维码1
            <input node-type="jsbridge" type="file" name="myPhoto" value="扫描二维码1" />
        </div>
    </div>
```

然后设置 `input` 按钮的 `css` 隐藏按钮，比如我使用的是属性选择器

```css
input[node-type=jsbridge]{
    display:none;
}
```

这里我们只需要按照自己的需要定义`class="qr-btn"`的样式即可。

**3.**在页面上初始化 Qrcode 对象

```javascript
    //初始化扫描二维码按钮，传入自定义的 node-type 属性
    $(function() {
        Qrcode.init($('[node-type=qr-btn]'));
    });
```
