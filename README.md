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
