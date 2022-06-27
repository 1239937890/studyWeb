// 实现一个解析器Compile来做解析和绑定工作。 解析器Compile实现步骤：
// 1. 解析模板指令， 并替换模板数据， 初始化视图
// 2. 将模板指令对应的节点绑定对应的更新函数， 初始化相应的订阅器
// 为了解析模板， 首先需要获取到dom元素， 然后对含有dom元素上含有指令的节点进行处理，
// 因此这个环节需要对dom操作比较频繁， 所有可以先建一个fragment片段， 将需要解析的dom节点存入fragment片段里再进行处理：
function Compile(el, vm) {
    this.vm = vm;
    this.el = document.querySelector(el);
    this.fragment = null;
    this.init();
}

Compile.prototype = {
    init: function () {
        if (this.el) {
            this.fragment = this.nodeToFragment(this.el);
            this.compileElement(this.fragment);
            this.el.appendChild(this.fragment); ////添加到当前节点中
        } else {
            console.log('Dom元素不存在');
        }
    },
    //创建虚拟的节点 赋值
    nodeToFragment: function (el) {
        var fragment = document.createDocumentFragment(),//存入文档碎片
            child;
        while (child = el.firstChild) {
            // 将Dom元素从el.childNodes中抽离移入fragment中 将原生节点拷贝到fragment
            fragment.appendChild(child);
        }
        return fragment;
    },
    //解析元素节点
    compileElement: function (el) {
        var childNodes = el.childNodes;
        var self = this;
        //[].slice.call(childNodes)截取（更重要的是获取，slice是得到子数组）函数的参数
        //然后让arguments等“伪数组”也可以使用数组的各种方法 这里的childNodes是伪数组要转下
        [].slice.call(childNodes).forEach(function (node) {
            var reg = /\{\{(.*)\}\}/; ///声明匹配大括号表达式的正则
            var text = node.textContent;
            if (self.isElementNode(node)) { //元素节点
                self.compile(node);
            } else if (self.isTextNode(node) && reg.test(text)) { //文本节点
                self.compileText(node, reg.exec(text)[1]);
            }
            ////如果当前节点还有子节点 那么就需要递归查找所有的子节点是否符合以上条件
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        });
    },
    compile: function (node) {
        var nodeAttrs = node.attributes;
        var self = this;
        [].slice.call(nodeAttrs).forEach(function (attr) {
            var attrName = attr.name;
            if (self.isDirective(attrName)) { ////判断当前属性名是否为指令 (根据是否有v-)
                var exp = attr.value;
                var dir = attrName.substring(2); //on:click //去掉v- 取出指令名
                if (self.isEventDirective(dir)) { // 判断当前指令是否为事件指令(是否有on)
                    self.compileEvent(node, self.vm, exp, dir); //为当前元素绑定事件
                } else { //普通指令
                    self.compileModel(node, self.vm, exp, dir);
                }
                node.removeAttribute(attrName); //移除解析完成的指令
            }
        });
    },
    //文本处理
    compileText: function (node, exp) {
        var self = this;
        var initText = this.vm[exp];
        this.updateText(node, initText);
        new Watcher(this.vm, exp, function (value) {
            self.updateText(node, value);
        });
    },
    //事件处理
    compileEvent: function (node, vm, exp, dir) {
        var eventType = dir.split(':')[1];
        var cb = vm.methods && vm.methods[exp];
        if (eventType && cb) {
            node.addEventListener(eventType, cb.bind(vm), false); ////给当前元素节点绑定指定的事件名和回调函数(指定this指向为vm)
        }
    },
    //处理v-model
    compileModel: function (node, vm, exp, dir) {
        var self = this;
        var val = this.vm[exp];
        this.modelUpdater(node, val);
        new Watcher(this.vm, exp, function (value) {
            self.modelUpdater(node, value);
        });

        node.addEventListener('input', function (e) {
            var newValue = e.target.value;
            if (val === newValue) {
                return;
            }
            self.vm[exp] = newValue;
            val = newValue;
            console.log(self)
        });
    },
    //更新节点的textContent属性
    updateText: function (node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    //更新节点的value属性
    modelUpdater: function (node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    },
    //判断拿过来的值中有没有v-是不是一个指令
    isDirective: function (attr) {
        return attr.indexOf('v-') == 0;
    },
    //判断拿过来的值中有没有on是不是一个事件
    isEventDirective: function (dir) {
        return dir.indexOf('on:') === 0;
    },
    //元素节点
    isElementNode: function (node) {
        return node.nodeType == 1;
    },
    //文本节点
    isTextNode: function (node) {
        return node.nodeType == 3;
    }
}