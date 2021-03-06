/*
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-05-05 14:57:16
 * @LastEditors: Seven
 * @LastEditTime: 2022-06-28 09:19:10
 * @FilePath: \uniDemod:\studyWeb\vue\mvvm\js\index.js
 * @Description: 
 * @Version: 2.0
 */
// 将Observer和Watcher和Compile关联起来
function SelfVue(options) {
    this.data = options.data;
    this.methods = options.methods;
    Object.keys(this.data).forEach(key => {
        this.proxyKeys(key)
    })
    observe(this.data);
    new Compile(options.el, this);
    options.mounted.call(this); //所有事情处理好后执行mounted函数
}

SelfVue.prototype = {
    proxyKeys: function (key) {
        var self = this;
        Object.defineProperty(this, key, {
            enumerable: false,
            configurable: true,
            get: function () {
                return self.data[key];
            },
            set: function (newVal) {
                self.data[key] = newVal;
            }
        })
    }
}