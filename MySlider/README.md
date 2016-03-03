### 手机端和 pc 端图片切换插件

#### 目录结构

`TestDemo-old` 该目录下是旧版的 slider 代码

`testdemo_revaluation` 该目录下是新版重构后的代码文件，建议使用该文件下的 js 文件

----
**common** 库文件

**js**     编写逻辑文件

**css**    样式文件夹

**img**  图片文件夹

----
#### 特点：
- 自定义配置（动画切换时间，sweep 时间，自动播放等）
- 一个页面中多个 slider 可以共存
- 自动切换轮播图片
- 支持按钮点按切换图片
- 支持移动端触摸切换
- 支持移动端的 sweep

#### 使用方法：

**1.** 首先页面中引入**`testdemo_revaluation/js/zepto-slider.js`** 文件

示例代码：
```html
<script type="text/javascript" src="common/zepto.js"></script>
<script type="text/javascript" src="js/zepto-slider.js"></script>
```

**2.** 配置容器(图片和按钮)节点,添加自定义属性` node-type="slider-contenter" `和自定义配置属性`user-setting`

示例代码：
```html
<div id="slider-title" class="slider-title" node-type="slider-contenter" user-setting='{
"autoAnimate": true,
"btnShow": true,
"btnShow": true,
"changeTime": 4000,
"animateTime":500,
"sweepTime": 400
}'>

```
**3.** 图片容器配置属性`node-type="img-contenter"`，并且为图片的列表元素添加自定义属性`node-type="img-list"`

示例代码：
```html
<li node-type="img-list">
    <a class="li-href" href="#"><img src="img/1.jpg"></a>
</li>
```

**4.** 按钮容器配置属性`node-type="btn-contenter"`，并且为按钮所在列表添加自定义属性`node-type="btn-list"`

示例代码：
```html
<li node-type="btn-list"><a class="li-href" href="#">2</a></li>
```

**5.** 在插件所在的 html 页面初始化 slider

示例代码：

```javascript
$(function() {
    window.SliderImgFunc.init($('[node-type=slider-contenter]'));
});
```



##### 2016/03/03
- 重构代码

##### 2015/12/2更新内容
- 将滑动时间精确到500ms以内，如果从开始点按左右切换的时间小于500ms就会完成左右切换的动作
- 增加上下切换的动作，精确上下左右切换的动作。通过在100ms－200ms中手指的位移，确定竖直方向和水平方向的位移，计算夹角，确定移动方向

##### 2015/12/1更新内容
- 修复页面滑动超过屏幕一半的距离，松开手指，自动滑动，动画卡顿的问题
- 修复点击切换按钮，时间图片停顿时间不一致的问题  
- 修复左右连续滑动图片错位

##### 2015/11/27更新内容
- 动态给`li`添加 `value` 值

##### 2015/11/26更新内容
- 修复手动滑动时，图片抖动的问题

##### 2015/11/25更新内容
- 添加点按切换功能
- 添加移动端触摸切换功能
