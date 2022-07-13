// vue-router 默认为hash模式 使用url中hash来模拟一个完整的URL，当URL发生改变时页面不会重新加载，
// URL中的#号就是哈希符号，#后面的是哈希值，hash模式是利用window.onhashchange来监听hash值的改变
//hash值是用指导浏览器动作的，对服务器没有影响，HTTP请求中也不会包括hash值，
//每一次改变hash的值都会在浏览器的访问历史中添加一个记录，使用浏览器后退按钮可以回到上一个位置
// 根据hash值发生改变，根据不同的值渲染指定dom位置不同的数据


//history模式