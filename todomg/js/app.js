(function(Vue) {

    const items = [{
        id: 1,
        content: "过错是暂时的遗憾，而错过则是永远的遗憾",
        completed: false,
    }, {
        id: 2,
        content: "每天给自己一个希望，试着不为明天而烦恼，不为昨天而叹息，只为今天更美好",
        completed: false,
    }, {
        id: 3,
        content: "别小看任何人，越不起眼的人、往往会做些让人想不到的事",
        completed: false,
    }]

    //本地存储 获取数据
    const STORAGE_KEY = "items-vue"
    const itemStorage = {
        fetch() {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]")
        },
        save(items) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
        }
    }

    //自定义全局指令  不需要加v-
    //el元素 binging表达式


    Vue.directive("app-focus", {
        inserted(el, binding) {
            el.focus()

        },
        update(el, binding) {
            //双击的元素获取焦点
            if (binding.value) {

                el.focus()
            }

        }
    })

    var vm = new Vue({
        el: "#tudoapp",
        data: {
            items: itemStorage.fetch(),
            currentEdit: "",
            filterStatus: "all", //接受状态值



        },
        //深度监听 对象中的属性值
        watch: {
            items: {
                deep: true,
                handler(newItems, oldItems) {
                    //数据保存到本地
                    itemStorage.save(newItems)
                }
            }
        },

        //计算属性
        computed: {
            //剩余未完成的任务数量
            remaining() {
                //通过filter过滤所有未完成的
                //unitems接受未完成的任务项
                const unitems = this.items.filter(function(item) {
                    return !item.completed
                })
                return unitems.length
            },
            toggleall: {
                //任务列表中的状态发送变化 更新复制框  属性值改变显示
                get() {
                    console.log("get", this.remaining)
                    return this.remaining === 0
                },
                //复制框更新，列表中的状态更新    更新之后的另外操作
                set(newValue) {
                    console.log("set")
                        //遍历所有任务项，复制框状态赋值给每一个
                    this.items.forEach((item) => {
                        item.completed = newValue
                    })
                }
            },
            //根据不同状态过滤出不同数据
            filterItems() {
                switch (this.filterStatus) {
                    case "active":
                        //过滤出未完成的
                        return this.items.filter(item =>
                            !item.completed
                        )
                        break;

                        //过滤出已完成的
                    case "completed":
                        return this.items.filter(item =>
                            item.completed
                        )
                        break;
                    default:
                        return this.items
                        break;


                }
            }
        },





        methods: {
            //完成编辑保存数据
            //1.获取当前输入框值 2.判断是否为空 不为空添加3.移除.editing
            finishEdit(event, index, item) {
                const content = event.target.value.trim()
                if (!content) {
                    this.removeClass(index)
                    return
                }
                item.content = content
                this.currentEdit = null
            },



            //取消编辑
            cancelEdit() {
                this.currentEdit = null
            },
            //进入编辑状态
            toEdit(item) {
                console.log(item)
                    //this.editing样式生效
                this.currentEdit = item
            },
            //清除所有已完成的任务  过滤出所有未完成的重新赋值给items
            clear() {

                this.items = this.items.filter((item) => {
                    return !item.completed
                })
            },
            additem(event) {
                //获取文本框内容
                //判断文本框数据是否为空
                //添加到数组中
                console.log(event)
                const content = event.target.value.trim()

                if (!content.length) {
                    return
                } else {
                    const id = this.items.length + 1
                    this.items.push({
                            id: id,
                            content: content,
                            completed: false,
                        }

                    )
                }
                //清空文本框
                event.target.value = ""
            },
            //移除索引对应的框
            removeClass(index) {
                this.items.splice(index, 1)
            }
        }


    })

    //hash值发生改变后，自动调用该函数
    window.onhashchange = function() {
            console.log(window.location.hash)
                //#/active 为空返回all
            const hash = window.location.hash.substr(2) || "all"
            vm.filterStatus = hash
        }
        //第一次访问页面时，调用一次状态值生效
    window.onhashchange()
})(Vue);