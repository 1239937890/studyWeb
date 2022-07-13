/*
 * @Author: zcj
 * @Autor: Seven
 * @Date: 2022-05-05 14:57:39
 * @LastEditors: Seven
 * @LastEditTime: 2022-06-28 09:51:40
 * @FilePath: \uniDemod:\studyWeb\vue\mvvm\js\observer.js
 * @Description: 
 * @Version: 2.0
 */
// Observer是一个数据监听器，其实现核心方法就是前文所说的Object.defineProperty( )。如果要对所有属性都进行监听的话，
// 那么可以通过递归方法遍历所有属性值，并对其进行Object.defineProperty( )处理。如下代码，实现了一个Observer

function Observe(data) {
    this.data = data;
    this.walk(data);
}

Observe.prototype = {
    walk: function (data) {
        var self = this;
        Object.keys(data).forEach(function (key) {
            self.defineReactive(data, key, data[key]);
        });
    },
    defineReactive: function (data, key, val) {
        observe(val); //递归遍历所有子属性
        var dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function () {
                if (Dep.target) { //判断是否添加订阅者
                    dep.addSub(Dep.target); //在这里添加一个订阅者
                }
                return val;
            },
            set: function (newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                dep.notify(); //如果数据变化，通知所有订阅者
            }
        })
    }
}

//数据监听器
function observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    };
    return new Observe(data);
};

//订阅器 存放订阅者的数组
function Dep() {
    this.subs = [];
}
Dep.prototype = {
    //添加 订阅
    addSub: function (sub) {
        this.subs.push(sub);
    },
    //通知 发布
    notify: function () {
        this.subs.forEach(function (sub) {
            //更新订阅者
            sub.update();
        })
    }
}
Dep.target = null;