define(function() {
	function Widget() {
		this.handlers = {};
	};

	Widget.prototype = {
		on: function(events, handler) {
			//上面的方式效果与以下相同，只不过下面的方式更好
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
		}
	};

	return {
		Widget: Widget
	};
});