# 第一个 Vue 项目 -- 开心

## 架构好项目结构，一步步来


## [了解主流开源协议](https://www.zhihu.com/question/19568896)

### 将项目推送到 github 上
1. `git init`

2. `git add .`

3. `git commit -m '首次提交'`

4. `git remote add origin git@github.com:romanticair/vue-cms.git`

5. `git push -u origin master`


## 开发过程
### Day 1
1. 写 TabBar 组件
2. 配置路由规则
3. 导入各种组件及其样式
4. 写底部 TabBar 样式,完成底部通栏
5. 为每个组件加 router-link
6. 写顶部 Header 通栏
7. 写中间内容 link-view 部分，处理底部路由激活高亮状态
  + 先去除 router-link 标签中的 mui-active 类
  + 我们知道覆盖默认的路由高亮类是 router-link-active
  + 因此在路由配置中添加 linkActiveClass: 'mui-active'
8. 为路由地址切换增加动画效果
  + 添加 transition 标签和 v-enter* v-leave* 几个类
9. 为 Home 组件添加内容，完成主页面
  + 六宫格制作，轮播图制作，npm mint-ui 模块
  + get 获取图源(本项目目前没有使用) v-for 生成，如果失败手动添加(记得 v-for 要给个:key)
  + 注意：使用 this.$http.* 方法需要安装 vue-resource 模块才能用(与后端数据交互)
  + 自定义轮播图样式，在 mint-ui 官网 swipe 组件页面看源码，即可看到编译后的类名
  + 使用 swipe 时发现组件样式没有直接生效(图片并排)，需安装 babel-plugin-component 插件支持
  + 安装后在 .babelrc.js 里配置插件
  + 结果惨不忍睹，安装了 babel-plugin-component  之后，服务器开启报错，重装两次仍不行，搞了大把时间，npm uninstall 不掉，手动卸载了，装 *@0，居然仍不行，一怒之下删了 node_modules 文件夹，把 package.json 里的 babel-plugin-component 行删掉，再 npm install 一下，一个 npm start，居然正常运行，而且预期的样式都有了，大跌眼镜啊。
10. 这种算 bug 吗，lowwwwwwwwwwwwwww，明天再 push 吧。
11. 总结一下，npm install * 下载的模块会对已存在的产生影响，也许是模块的版本乱用导致的，依赖关系和兼容太复杂。吸取教训，先确定版本再下载测试。

### Day 2
1. 新闻资讯页面制作，使用 Mui 中的 media-list.html
2. 通过 vue-resource 获取后台数据，进而交互渲染页面
3. 实现路由点击跳转到新闻详情，把列表每一项改成 router-link
4. 创建新闻详细的组件页面 NewsInfo.vue
5. 把路由地址和组件页面对应起来
6. 写新闻详细的页面布局和数据渲染
7. 单独封装一个 comment.vue 评论子组件
  + 创建 comment.vue 组件模板
  + 在使用该组件的页面中导入 comment 组件
  + `import comment from './comment.vue'`
  + 在父组件中使用 components 属性，将导入的组件注册为自己的子组件
  + 即可在页面上使用了
8. 获取所有评论数据并渲染
9. 实现点击加载更多评论功能
  + 为加载更多按钮绑定点击事件，其功能能够请求下一页的数据
  + 注意防止新数据覆盖旧数据的情况，适当拼接
  + 以上有涉及到子组件用到父组件的数据情况，需为其绑定数据，子组件 props 获取
  + 没有后台数据，想办法搞一个服务器，让其为我提供数据
  + o(╥﹏╥)o 先手动伪造几个看看效果

### Day 3
1. 发表评论
  + 为文本框做双向数据绑定
  + 为发表按钮绑定一个事件
  + 校验评论内容，不可为空。通过 vue-resource 发送一个post请求，将评论内容提交给服务器
  + 成功发表后，刷新列表(unshift 评论列表，使新的评论在首部)
2. 绘制图片列表，并美化样式
  + 制作顶部滑动条
  + 制作底部图片列表
  + 借助于 MUI 中的 tab-top-webview-main.html
  + 借助于 Mint-UI lazy-load 组件
  + 注意：li -> router-link 的改造需使用 tag 属性使其渲染为我们指定的元素
  + 顶部滑动列表事件要在 mounted 里加，以免 DOM 节点未生成就为其加事件
  + @tap 时移动端的触摸事件函数
3. 实现图片详情中缩略图的功能
  + 使用插件 vue-preview 缩略图插件
  + 获取所有的图片列表，使用 v-for 渲染页面
  + 渲染同时 img 标签上的类不能丢, 而且图片对象必须有 w 和 h 属性
  + 缩略图组件要求图为 {src:*, msrc:*, alt:*, title:*, w:*, h:*} 对象列表
  + 缩略图组件变得如此简洁 ^_^.
4. 商品页面只写了样式，方法也没写，全静态数据，慢慢欣赏吧。。。

### Day 4
1. 继续完善商品页面 goodslist 的数据交互
  + 这里其实可以用另外一种方式写页面路由代替 router-link
  + 也就是 this.$router.push 方法
2. 接着写个 goodsinfo 获取更详细的商品信息页面
  + 实现加入购物车时候，拿到选择的数量
  + 按钮属于 goodsinfo 页面， 数字属于 numberbox 组件
  + 涉及到了父子组件的嵌套，无法直接在 goodsinfo 页面zhong 中获取到选中的商品数量值
  + 父向子传递方法，子调用这个方法，同时把数据当作参数传递给这个方法
  + 同时在这里发现轮播图已经出现两次了，可以单独抽离出来，数字选择框组件也即将用到多次
  + 所以也抽离出来到 subcomponent, 抽离的过程中涉及到父传子调的方法和属性传值，别乱混啦
  + 也涉及到共同组件不同样式，:class=["": ""] 的灵活使用
  + 解决
3. 添加加入购物车小球
  + 为动画加上 cubic-bezier(.4,-0.3,1,.68) 曲线效果
  + 解决小球在不同布局和尺寸拉伸情况下的正常表现
  + 突然间发现切换触摸模式，底部栏无法切换，提示忽略一个注册为 ‘passive’ 的监听器的事件类型
  + 至今还不明白原理机制，也许是该组件内部对 tap 方法的触发受到了限制
  + 为 ‘touchstart’ 的‘preventDefault()’ 调用
  + 在此重新改了类名，对其原来的属性进行复制，但可以触发切换了，但提示还是存在


### 总结
+ 本项目主要以 es6 语法和 vue 框架搭建的，很粗略，后台也没写
+ 骑马观花似的敲出了这个项目，过程中了解了 vue 框架，学习到了项目结构的搭建和逻辑的抽离
+ 涉及到了 v-for v-show v-model v-bind | [:] v-click | [@] v-html
+ vue 框架类的使用 :class=["class1", "class2"] :class={"trueclass": "true"}
+ el data methods created mounted router components watch store render filter
+ router 的 router-link && :to="url" router-view
+ 组件的自定义以及 mint-ui mui 组件的使用，滑块，轮播图，底部通栏，数字组件等和许多对功能支持的一些必要模块
+ vuex 的 Store 支持跨组件全局访问对象等等
+ 还有 --- 再说吧。。。