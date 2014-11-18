define(['jquery'], function() {
	function Widget() {
		this.boundingBox = null; //属性：最外层容器
		
	};

	Widget.prototype = {
		on: function(events, handler) {
			this.handlers[events] = this.handlers[events] || [];
			this.handlers[events].push(handler);

			return this;
		},
		fire: function(events, data) { //data为参数信息

			if (this.handlers[events] instanceof Array) {
				var handler = this.handlers[events];

				//这种循环就是传说中的“高效”循环方式？
				//45个使用Javascript技巧中有说到：
				//因为arrayNumbers.length每次循环的时候都会被计算
				for (var i = 0; len = handler.length, i < len; i++) {
					handler[i](data);
				}
			}

			return this;
		},
		render: function(container) { //方法：渲染组件
			this.handlers = {}; //事件库（如果放到widget方法体内会有问题，可以试试看）
			this.renderUI();
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.boundingBox);
		},
		destory: function() {
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		},
		renderUI: function() {}, //接口：添加dom节点
		bindUI: function() {}, //接口：监听事件
		syncUI: function() {}, //接口：初始化组件属性
		destructor: function() {} //
	};

	return {
		Widget: Widget
	};
});