// 从浏览器中输入url地址到请求返回发生了什么？
// 1， 从输入的url中解析出协议， 主机， 端口， 路径， 并构造一个http请求， 强缓存， 协商缓存；
// 2， DNS域名解析；
// 3， TCP连接；(客户端和服务端要进行可靠传输， 那么就需要确认双方的接收和发送能力， 第一次握手可以确认客服端的发送能力， 第二次握手， 确认了服务端的发送能力和接收能力， 所以第三次握手才可以确认客户端的接收能力。 不然容易出现丢包的现象。)
// 4， http请求；
// 5， 服务端处理请求并返回Http报文；
// 6， 浏览器渲染页面



// 作用域分为全局作用域函数作用域
// 全局作用域在window下， 函数作用域在函数内部, 当查找一个值在函数作用域内没有找到就会向上查找, 这种层级寻找形成链式， 就是作用域链。-- >



// 原型和原型链的概念
// 每个对象都会在内部初始化一个属性， 就是prototype（ 原型）;
// 当我们访问一个对象的属性， 如果这个对象的内部没有这个属性，
// 就会去它的原型prototype上查找， 这个prototype又会有自己的prototype， 就这样一直寻找下去。