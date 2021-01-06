# 一、查找或者新建vue.json

通过文件=》首选项=》用户代码片段

# 二、输入模板

```js
{
	// Example:
	"Print to console": {
		"prefix": "vue",
		"body": [
			"<template>",
			"   <div>$0</div>",
			"</template>",
			"",
			"<script>",
			"//这里可以引入其他文件（比如组件，工具js，第三方插件js，json文件，图片文件等等）",
			"//列如：import <<组件名称>> from '《组件路径》';",
			"export default {",
			"//import引入的组件需要注入到对象中才能使用",
			"   components: {},",
			"   props: {},",
			"   data() {",
			"//这里存放数据",
			"       return {",
			"       };",
			"   },",
			"//监控data中的数据变化",
			"   watch: {},",
			"//计算属性，类似于data概念",
			"   computed: {},",
			"//方法集合",
			"   methods: {},",
			"//生命周期，创建完成（可以访问当前this实例）",
			"   created() {},",
			"//生命周期，挂载完成（可以访问dom元素）",
			"   mounted() {},",
			"   beforeCreate(){},//生命周期-创建之前",
			"   beforeMount(){}, //生命周期 - 挂载之前",
			"   beforeUpdate(){}, //生命周期 - 更新之后",
			"   updated(){}, //生命周期 - 更新之后",
			"   beforeDestroy(){}, //生命周期 - 销毁之前",
			"   destroy(){}, //生命周期 - 销毁完成",
			"   activated(){}, //如果页面有keep-alive缓存功能，这个函数会触发",
			"};",
			"</script>",
			"<style scoped>",
			"</style>"
		],
		"description": "A vue file template"
	}
}

```

# 三、测试下，新建一个vue页面输入vue，回车