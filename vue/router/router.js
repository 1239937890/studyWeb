// vue-router 默认为hash模式 使用url中hash来模拟一个完整的URL，当URL发生改变时页面不会重新加载，
// URL中的#号就是哈希符号，#后面的是哈希值，hash模式是利用window.onhashchange来监听hash值的改变
//hash值是用指导浏览器动作的，对服务器没有影响，HTTP请求中也不会包括hash值，
//每一次改变hash的值都会在浏览器的访问历史中添加一个记录，使用浏览器后退按钮可以回到上一个位置
// 根据hash值发生改变，根据不同的值渲染指定dom位置不同的数据
//所有的页面跳转都是客户端进行操作

//hash
// 有 # 号   
// 能够兼容到IE8        
// 实际的url之前使用哈希字符，这部分url不会发送到服务器，不需要在服务器层面上进行任何处理
// 刷新不会存在 404 问题
// 不需要服务器任何配置


//history模式 利用HTML5中新增的pushState()和replaceState()方法。
//pushState主要用于往历史记录堆栈顶部添加一条记录
//replaceState 更改当前的历史记录
//当它们执行修改的时候，虽然改变了当前的Url,但浏览器不会向后端发送请求

//history
// 没有 # 号
// 只能兼容到IE10
// 每访问一个页面都需要服务器进行路由匹配生成 html 文件再发送响应给浏览器消耗服务器大量资源
// 浏览器直接访问嵌套路由时，会报 404 问题。
// 需要在服务器配置一个回调路由

// 那为什么开发环境时就不会出现404呢？
// 因为在 vue-cli  中  webpack  帮我们做了处理
// historyApiFallback: true

//服务器
// location / {
//     try_files $uri $uri/ /index.html;
//   }