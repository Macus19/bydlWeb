# bydl

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
### 尚未解决的问题
+ 主控现场那一块，现在逻辑是这样的：
要先点击生成签到二维码-> 有人签到-> 点击开始典礼 -> 获取队列信息
（老感觉逻辑有点问题又说不出来，but不想开口问
+ 主控现场上下页接口已接未调试
+ 主控现场，回到当前位置未完成
+ 字符特征查询（就是搜索）未有接口
+ 典礼报名管理，数据导出接口未调试
+ 搜索栏在未登录的时候无法使用，这个功能尚未实现
+ 系统后台设置那里需要一些说明文档，到时可以问运营要
+ 主要就是主控现场管理那块的逻辑需要理清，接口倒是接上了，but不想跟人沟通了就交给冰心子了（dbq）

### 需要注意的事项
+ 获取数据函数请以get开头，设置数据函数请以set开头
+ 布尔型数据请以is开头
+ 公共数据在asset文件夹中的config文件夹中，里面有一个http.js是我封装的axios函数，剩下两个global
分别是公共css和公共js数据
+ 组件里面使用组件请在里面新建components文件夹，然后把子组件放到里面
+ Frame组件是整的一个框架，包括导航栏，可更换主体内容和页脚
+ 图片请放在asset文件夹中的image文件夹下，哪个组件使用图片就新建文件夹放到里面
+ 组件里面Login有个LoginDialog弹窗组件，就是登陆的那个弹窗，但是后来不用自己封装的了，改成修改element的
Dialog的样式就好了（暗示不用管它
+ 因为一开始我想重新封装Dialog组件但是发现工程量太大所以废弃了，所以页面中会有一个div类名为
mask，是原来想做遮罩的，但是现在不用就不用管它了
+ 有事联系