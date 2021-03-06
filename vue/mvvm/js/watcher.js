/*
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-05-05 14:57:33
 * @LastEditors: Seven
 * @LastEditTime: 2022-06-27 15:23:32
 * @FilePath: \uniDemod:\studyWeb\vue\mvvm\js\watcher.js
 * @Description: 
 * @Version: 2.0
 */
// 订阅者Watcher在初始化的时候需要将自己添加进订阅器Dep中，那该如何添加呢？
// 我们已经知道监听器Observer是在get函数执行了添加订阅者Wather的操作的，
// 所以我们只要在订阅者Watcher初始化的时候出发对应的get函数去执行添加订阅者操作即可，
// 那要如何触发get的函数，再简单不过了，只要获取对应的属性值就可以触发了，
// 核心原因就是因为我们使用了Object.defineProperty()进行数据监听。
// 这里还有一个细节点需要处理，我们只要在订阅者Watcher初始化的时候才需要添加订阅者，所以需要做一个判断操作，
// 因此可以在订阅器上做一下手脚：在Dep.target上缓存下订阅者，添加成功后再将其去掉就可以了。

function Watcher(vm, exp, cb) {
    this.cb = cb;
    this.vm = vm;
    this.exp = exp;
    this.value = this.get(); //将自己添加到订阅器的操作
}

Watcher.prototype = {
    update: function () {
        this.run();
    },
    run: function () {
        var value = this.vm.data[this.exp];
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    },
    get: function () {
        Dep.target = this; //缓存自己
        var value = this.vm.data[this.exp]; //强制执行监听器里的get函数
        Dep.target = null; //释放自己
        return value;
    }
};