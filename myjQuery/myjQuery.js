
(function(window, undefined) {
    /* 定义myjQuery函数对象 */
    var myjQuery = function(selector) {
        // 此处是为了方便使用, 直接$(selector)就可以创建myjQuery对象, 不用再先实例化, 再调用init方法了
        return new myjQuery.prototype.init(selector);
    };

    /* 替换myjQuery函数的原型对象 */
    myjQuery.prototype = {
        // 字面量覆盖了系统默认的原型对象, 所以要修正一下构造器属性
        constructor : myjQuery,
        // 初始化方法
        init : function(selector) {
            // 1. 如果参数为 '', null, undefined, false, 0, NaN, 返回一个空实例对象
            if (!selector) {
                return this;
            }
            // 2. 如果参数为字符串
            else if (myjQuery.isString(selector)) {
                // 去除字符串首尾的空格
                selector = myjQuery.trim(selector);
                // 2.1 如果参数为html代码片段形式的字符串
                if (myjQuery.isHtml(selector)) {
                    // 添加一个临时dom对象
                    var temp = document.createElement('div');
                    // 将html代码中的元素添加为dom节点的子元素
                    temp.innerHTML = selector;
                    // 通过 temp.children 获取dom对象的子对象集合(也就是代码片段中的第一级元素), 结果为一个数组
                    // 借用Array.prototype中的push方法, 将集合中的元素分别作为属性添加到实例对象上
                    [].push.apply(this, temp.children);
                } else {
                    // 2.2 如果参数为非html代码段形式的字符串
                    // 将字符串作为css选择器, 使用querySelectorAll查找所有满足条件的dom节点集合
                    var nodes = document.querySelectorAll(selector);
                    // 借用Array.prototype中的push方法, 将集合中的元素分别作为属性添加到实例对象上
                    [].push.apply(this, nodes);
                }
            }
            // 3. 如果参数为数组或者是伪数组
            else if (myjQuery.isArray(selector) || myjQuery.isLikeArray(selector)) {
                // 借用Array.prototype中的push方法, 将数组或伪数组中的元素分别作为属性添加到实例对象上
                [].push.apply(this, selector);
            }
            // 4. 如果参数为函数
            else if (myjQuery.isFunction(selector)) {
                this.ready(selector);
            }
            // 5. 如果以上情况都不满足, 就将参数作为一个属性添加到实例对象上, 并给实例对象添加一个length属性(属性值为1)
            else {
                this[0] = selector;
                this.length = 1;
            }
        },
        // 版本号
        jquery : '1.0.2beta',
        // 实例默认的selector参数取值
        selector : '',
        // 实例默认的长度
        length : 0,
        // 把实例转化为数组返回
        toArray : function() {
            return [].slice.call(this);
        },
        // 获取指定下标的元素, 结果为原生dom
        get : function(index) {
            return index >= 0 ? this.toArray()[index] : this.toArray()[this.length + index];
        },
        // 获取指定下标的元素, 结果jQuery对象
        eq : function(index) {
            return myjQuery(this.get(index));
        },
        // 获取第一个元素, 结果为jQuery对象
        first : function() {
            return this.eq(0);
        },
        // 获取最后一个元素, 结果为jQuery对象
        last : function() {
            return this.eq(-1);
        },
        // 按照指定下标删除指定数量的元素, 也可以替换删除的元素
        splice : function() {
            return [].splice.apply(this, arguments);
        },
        // 给jQuery对象添加新元素
        push : function() {
            return [].push.apply(this, arguments);
        },
        // 遍历实例, 把遍历到的数据传给回调函数使用
        each : function(fn) {
            myjQuery.each(this, fn);
        },
        // 入口函数, 判断dom结构是否加载完毕
        ready : function(fn) {
            if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', fn);
            } else {
                document.attachEvent('onreadystatechange', function() {
                    // readyState有四个状态, 每次改变都会触发该事件, 为了避免重复执行, 需要判断当前的状态是否已经加载完毕
                    if (document.readyState == 'complete') {
                        fn();
                    }
                })
            }
        }
    };

    /* 将myjQuery.prototype.init.prototype替换为myjQuery.prototype */
    myjQuery.prototype.init.prototype = myjQuery.prototype;

    /* 扩展myjQuery以及myjQuery原型对象的属性和方法 */
    myjQuery.extend = myjQuery.prototype.extend = function(obj) {
        for (var k in obj) {
            this[k] = obj[k];
        }
    };

    /* 给myjQuery扩展静态属性和方法 */
    myjQuery.extend({
        // 判断传入的参数是否为字符串
        isString : function(str) {
            return typeof str == 'string';
        },
        // 判断传入的参数是否为对象类型
        isObject : function(obj) {
            return typeof obj == 'object';
        },
        // 截取字符串开头和结尾的空格
        trim : function(str) {
            if (str.trim) {
                return str.trim();
            } else {
                return str.replace(/^\s+|s+\$/g, '');   // 兼容性处理, 通过正则表达式查找空格并替换为空
            }
        },
        // 判断传入的参数是否为代码片段
        isHtml : function(str) {
            return str.charAt(0) == '<'
            && str.charAt(str.length - 1) == '>'
            && str.length >= 3;
        },
        // 判断传入的参数是否为数组
        isArray : function(obj) {
            return Object.prototype.toString.call(obj) == '[object Array]';
        },
        // 判断传入的参数是否为伪数组
        isLikeArray : function(obj) {
            // 伪数组需要满足三个条件: 是一个对象; 拥有length属性; 拥有(obj.length - 1)属性
            return typeof obj == 'object'
                && 'length' in obj
                && (obj.length - 1) in obj;
        },
        // 判断传入的参数是否为window
        isWindow : function(obj) {
            return obj == window.window;
        },
        // 判断传入的参数是否为函数
        isFunction : function(obj) {
            return Object.prototype.toString.call(obj) == '[object Function]';
        },
        // 遍历传入的对象, 将遍历得到的数据传给回调函数使用
        each : function(obj, fn) {
            if (myjQuery.isLikeArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    // fn(i, obj[i]);   默认在回调函数中调用索引和元素
                    // fn.call(obj[i], i, obj[i]);  使回调函数在调用时内部的this指向元素
                    if (fn.call(obj[i], i, obj[i]) == false) {  // 增加自定义功能, 当回调函数返回false时, 结束整个循环
                        break;
                    }
                }
            } else {
                for (var k in obj) {
                    // fn(k, obj[k]);
                    // fn.call(obj[k], k, obj[k]);
                    if (fn.call(obj[k], k, obj[k]) == false) {
                        break;
                    }
                }
            }
        },
        // 遍历传入的对象, 将遍历到的数据传给回调函数使用, 然后把回调函数的返回值以数组的形式收集返回
        map : function(obj, fn) {
            var res = [];
            myjQuery.each(obj, function(index, value) {
                res.push(fn(value, index))
            });
            return res;
        },
        // 判断元素是否属于数组或伪数组
        inArray : function(arr, ele) {
            return [].indexOf.call(arr, ele) != -1;
        },
        // 用于将数据对象转化为符合条件的拼接字符串
        obj2str : function(obj) {
            obj = obj || {};
            // 添加随机因子属性
            obj.t = Math.random();

            var arr = [];
            for (var k in obj) {
                arr.push(k + '=' + encodeURIComponent(obj[k])); 
            }
            
            return arr.join('&');
        }
    });

    /* 给myjQuery扩展原型属性和方法-DOM相关 */
    myjQuery.prototype.extend({
        // 清空所有匹配的dom元素下的内容
        empty : function() {
            this.each(function(index, value) {
                value.innerHTML = '';
            });
            return this;
        },
        // 移除所有匹配到的dom元素; 如果加参数, 先进行过滤,再删除匹配的dom元素
        remove : function(selector) {
            var self = this;
            if (!selector) {
                this.each(function(index, value) {
                    value.parentNode.removeChild(value);
                })
            } else {
                myjQuery(selector).each(function(index, value) {
                    if ([].indexOf.call(self, value) != -1) {
                        value.parentNode.removeChild(value);
                    }
                });
            }
            return this;
        },
        // 如果有参数, 就将所有元素的内容替换为参数内容; 如果没有参数, 返回第一个元素的内容
        html : function() {
            if (arguments.length == 0) {
                return this[0].innerHTML;
            } else {
                var str = arguments[0];
                this.each(function(index, value) {
                    value.innerHTML = str;
                });
                return this;
            }
        },
        // 如果有参数, 就将所有元素的文本内容替换为参数内容; 如果没有参数, 返回所有元素的文本内容
        text : function() {
            if (arguments.length == 0) {
                var res = '';
                this.each(function(index, value) {
                    res += value.innerText;
                });
                return res;
            } else {
                var str = arguments[0];
                this.each(function(index, value) {
                    value.innerText = str;
                });
                return this;
            }
        },
        // 把调用方法的元素添加到所有匹配参数的元素的内容后面
        appendTo : function(selector) {
            var nodes = myjQuery(selector);
            var self = this;
            var res = [];
            nodes.each(function(index, node) {
                self.each(function(i, ele) {
                    if (index == 0) {
                        node.append(ele);
                        res.push(ele);
                    } else {
                        node.append(ele.cloneNode(true));
                        res.push(ele.cloneNode(true));
                    }
                })
            });
            return myjQuery(res);
        },
        // 把调用方法的元素添加到所有匹配参数的元素的内容前面
        prependTo : function(selector) {
            var nodes = myjQuery(selector);
            var self = this;
            var firstChild = null;
            var res = [];
            nodes.each(function(index, node) {
                firstChild = node.firstChild;
                self.each(function(i, ele) {
                    if (index == 0) {
                        node.insertBefore(ele, firstChild);
                        res.push(ele);
                    } else {
                        node.insertBefore(ele.cloneNode(true), firstChild);
                        res.push(ele.cloneNode(true));
                    }
                })
            });
            return myjQuery(res);
        },
        // 把所有匹配参数的元素都添加到调用方法的元素的内容后面
        append : function(selector) {
            var nodes = myjQuery(selector);
            if (!myjQuery.isObject(selector)) {
                this.each(function(index, value) {
                    value.innerHTML += selector;
                })
            } else {
                nodes.appendTo(this);
            }
            return this;
        },
        // 把所有匹配参数的元素都添加到调用方法的元素的内容前面
        prepend : function(selector) {
            var nodes = myjQuery(selector);
            if (!myjQuery.isObject(selector)) {
                this.each(function(index, value) {
                    value.innerHTML = selector + value.innerHTML;
                })
            } else {
                nodes.prependTo(this);
            }
            return this;
        }
    });

    /* 给myjQuery扩展原型属性和方法-CSS相关 */
    myjQuery.prototype.extend({
        // 设置或获取dom对象的value值
        val : function(content) {
            if (content == undefined) {
                return this[0].value;
            } else {
                this.each(function(index, dom) {
                    dom.value = content;
                });
                return this;
            }
        },
        // 设置或获取dom对象属性节点的值
        attr : function(name, value) {
            if (name == undefined) {
                throw 'error, a string is needed'
            } else if (value == undefined) {
                if (myjQuery.isString(name)) {
                    return this[0].getAttribute(name);
                } else if (myjQuery.isObject(name)) {
                    var obj = name;
                    this.each(function(index, dom) {
                        myjQuery.each(obj, function(k, val) {
                            dom.setAttribute(k, val);
                        })
                    })
                }
            } else {
                this.each(function(index, dom){
                    dom.setAttribute(name, value);
                });
            }
            return this;
        },
        // 设置或获取dom对象的属性值
        prop : function(name, value) {
            if (name == undefined) {
                throw 'error, a string is needed';
            } else if (value == undefined) {
                if (myjQuery.isString(name)) {
                    return this[0][name];
                } else if (myjQuery.isObject(name)) {
                    var obj = name;
                    this.each(function(index, dom) {
                        myjQuery.each(obj, function(k, val) {
                            dom[k] = val;
                        })
                    })
                }
            } else {
                this.each(function(index, dom) {
                    dom[name] = value;
                });
            }
            return this;
        },
        // 删除dom对象指定属性节点
        removeAttr : function(name) {
            if (myjQuery.isString(name)) {
                this.each(function(index, dom) {
                    dom.removeAttribute(name);
                })
            }
            return this;
        },
        // 删除dom对象的指定属性
        removeProp : function(name) {
            if (myjQuery.isString(name)) {
                this.each(function(index, dom) {
                    delete dom[name];
                })
            }
            return this;
        },
        // 判断dom元素是否拥有某个类名
        hasClass : function(name) {
            var isHas = false;
            name = ' ' + name + ' ';
            this.each(function(index, dom) {
                dom.className = ' ' + dom.className + ' ';
                if (dom.className.indexOf(name) != -1) {
                    isHas = true;
                    return false;
                }
            });
            return isHas;
        },
        // 给所有dom元素添加指定类名
        addClass : function(name) {
            var arr = name.split(' ');
            this.each(function(index, dom) {
                dom.className = ' ' + dom.className + ' ';
                myjQuery.each(arr, function(i, ele) {
                    ele = ' ' + ele + ' ';
                    if (dom.className.indexOf(ele) == -1) {
                        dom.className += myjQuery.trim(ele);
                    }
                });
                dom.className = myjQuery.trim(dom.className);
            });
            return this;
        },
        // 删除所有dom元素的指定类名
        removeClass : function(name) {
            if (name == undefined) {
                this.each(function(index, dom) {
                    dom.className = '';
                })
            } else {
                var arr = name.split(' ');
                this.each(function(index, dom) {
                    dom.className = ' ' + dom.className + ' ';
                    myjQuery.each(arr, function(i, ele) {
                        ele = ' ' + ele + ' ';
                        if (dom.className.indexOf(ele) != -1) {
                            dom.className = dom.className.replace(ele, ' ');
                        }
                    });
                    dom.className = myjQuery.trim(dom.className);
                })
            }
            return this;
        },
        // 使dom元素指定类名在有和无之间切换
        toggleClass : function(name) {
            if (name == undefined) {
                this.each(function(index, dom) {
                    dom.className = '';
                })
            } else {
                var arr = name.split(' ');
                this.each(function(index, dom) {
                    dom.className = ' ' + dom.className + ' ';
                    myjQuery.each(arr, function(i, ele) {
                        ele = ' ' + ele + ' ';
                        if (dom.className.indexOf(ele) == -1) {
                            dom.className += myjQuery.trim(ele);
                        } else {
                            dom.className = dom.className.replace(ele, ' ');
                        }
                    });
                    dom.className = myjQuery.trim(dom.className);
                })
            }
            return this;
        },
        // 设置或获取dom元素的样式
        css : function(para1, para2) {
            if (para1 == undefined) {
                throw 'error, a string is needed';
            } else if (para2 == undefined) {
                if (myjQuery.isObject(para1)) {
                    var classObj = para1;
                    this.each(function(index, dom) {
                        myjQuery.each(classObj, function(k, val) {
                            dom.style[k] = val;
                        })
                    });
                    return this;
                } else if (myjQuery.isString(para1)) {
                    return window.getComputedStyle ? window.getComputedStyle(this[0])[para1] : this[0].currentStyle[para1];
                }
            } else {
                this.each(function(index, dom) {
                    dom.style[para1] = para2;
                });
                return this;
            }
        }
    });

    /* 给myjQuery扩展原型属性和方法-事件处理 */
    myjQuery.prototype.extend({
        // 给dom对象添加事件
        on : function(name, fn) {
            this.each(function(index, dom) {
                // 检测是否拥有fnObj, 没有的话, 添加一个并赋值为空对象
                dom.fnObj = dom.fnObj || {};
                // 检测fnObj是否拥有名称为name的属性, 没有的话, 添加一个并赋值为空数组; 保证只注册一次相同类型的事件
                if (!dom.fnObj[name]) {
                    // 此处不可使用.语法, 因为name是一个字符串, 必须使用[]语法
                    dom.fnObj[name] = [];
                    // 检测运行环境是否支持addEventListener方法, 如果不支持使用addEvent(只适用于IE8)
                    if (dom.addEventListener) {
                        dom.addEventListener(name, function() {
                            // 调用回调函数时, 先进行判断, 如果不存在事件数组, 直接返回(不做判断的话, 解除事件后, 会报错)
                            if (!dom.fnObj[name]) {
                                return;
                            }
                            for (var i = 0; i < dom.fnObj[name].length; i++) {
                                dom.fnObj[name][i].call(dom);
                            }
                        })
                    } else {
                        dom.attachEvent('on' + name, function() {   // attachEvent方法中的事件名必须以on开头
                            if (!dom.fnObj[name]) {
                                return;
                            }
                            for (var i = 0; i < dom.fnObj[name].length; i++) {
                                dom.fnObj[name][i].call(dom);
                            }
                        })
                    }
                }
                // 将对应事件的回调函数添加到对应的事件数组中
                dom.fnObj[name].push(fn);
            });
            return this;
        },
        // 移除dom对象上的事件
        off : function(name, fn) {
            if (name == undefined) {
                this.each(function(index, dom) {
                    dom.fnObj = {};
                })
            } else if (fn == undefined) {
                this.each(function(index, dom) {
                    dom.fnObj[name] = [];
                })
            } else {
                this.each(function(index, dom) {
                    var i = dom.fnObj[name].indexOf(fn) == -1 ? undefined : dom.fnObj[name].indexOf(fn);
                    dom.fnObj[name].splice(i, 1);
                })
            }
            return this;
        }
    });

    /* 增加网络请求功能 */
    myjQuery.prototype.extend({
    	// Ajax请求
        ajax : function(option) {
            // 安全检测
            option = option || {};
            
            if (!option.url) {
                return;
            }
            
            option.method = option.method || 'get';
            option.timeout = option.timeout || 0;
            option.data = option.data || {};
            option.error = option.error || function(code) {console.log('请求失败, 错误码: ' + code);};

            // 将option.data转化为带有随机因子的拼接字符串
            var data = myjQuery.obj2str(option.data);

            var url = option.url;

            // 创建异步对象
            var xhr = window.XMLHttpRequest ? new window.XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

            // 判断请求数据的方式
            if (option.method == 'get') {
                // 创建get请求
                xhr.open('get', url + '?' + data);
                // 发送get请求
                xhr.send();
            } else if (option.method == 'post') {
                // 创建post请求
                xhr.open('post', url);
                // 设置post请求的请求头
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                // 发送post请求和数据
                xhr.send(data);
            }

            // 监听异步对象状态变化
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    // 如果请求在设置的超时时间内完成, 清除判断请求是否超时的定时器
                    clearTimeout(timer);
                    // 判断异步对象状态码是否正确, 请求是否成功
                    if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                        // 成功
                        option.success && option.success(xhr.responseText)
                    } else {
                        // 失败
                        option.error(xhr.status)
                    }
                }
            };

            // 超时处理
            if (option.timeout) {   
                var timer = setTimeout(function() {
                    xhr.abort();    // 如果达到超时时间请求还未完成, 中断请求
                }, option.timeout);
            }
            
        },
        // jsonp跨域请求
        jsonp : function(option) {
			// 安全检查
			if (!option.url) {
			    return;
			}
			name = option.name || 'callback';
			data = option.data || {};

			// 随机生成一个复杂的字符串
			var fnName = ('myFn_' + (new Date()).getTime() + Math.random()).replace('.', '');
			// 以复杂的字符串为属性名, 给window添加一个方法, 使其成为一个全局的方法
			// 判断是否存在回调函数, 如果存在, 在该全局方法中执行回调函数
			window[fnName] = function(result) {
			    // 调用回调函数, 操作返回结果
			    option.fn && option.fn(result);
			    // 操作执行完毕后, 删除用于动态获取数据的临时script标签
			    document.body.removeChild(oScript);
			};
			// 按照后台接口要求, 将回调函数相关参数以指定形式添加到参数对象中
			data[name] = fnName;
			// 将调整好的参数数据, 拼接成可以添加到URL中的字符串
			data = myjQuery.obj2str(data);

			// 创建script标签
			var oScript = document.createElement('script');
			// 将script标签的src路径设置为自定义的url
			oScript.src = option.url + '?' + data;
			// 将script标签添加到html文档中, 以动态加载资源, 实现跨域访问
			document.body.appendChild(oScript);
        }
    })


    /* 将myjQuery赋值为window的属性, 使我们能在外部通过$和myjQuery访问到它 */
    window.$ = window.myjQuery = myjQuery;

})(window);
