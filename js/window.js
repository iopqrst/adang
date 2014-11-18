define(['jquery', 'jquery_ui'], function($, $ui) { //$UI其实没有什么作用，仅仅为了require引入参数能对应上
	function Window() {
		this.cfg = {
			left: 0,
			top: 0,
			width: 500,
			height: 300,
			title: '提示',
			content: '',
			hasMask: true,
			btn4Alert: '确定',
			hasCloseBtn: false,
			fn4AlterBtn: null,
			fn4CloseBtn: null,
			skinClassName: '',
			isDraggable: false
		};

		this.handlers = {};
	};

	Window.prototype = {
		alert: function(cfg) {
			var _cfg = $.extend(this.cfg, cfg);
			var box = '<div class="window_boundingBox">' + '<div class="window_header">' + _cfg.title + '</div>' + '<div class="window_body">' + _cfg.content + '</div>' + '<div class="window_footer">' + '<input type="button" class="window_alterBtn" value="' + _cfg.btn4Alert + '"/></div>' + '</div>';

			var that = this;

			//添加遮罩
			var $mask = null;
			if (_cfg.hasMask) {
				$mask = $('<div class="window_mask"></div>');
				$mask.appendTo("body");
			}

			$boundingBox = $(box);
			$boundingBox.appendTo("body");
			$boundingBox.css({
				width: _cfg.width + 'px',
				height: _cfg.height + 'px',
				left: (_cfg.left || ((window.innerWidth - _cfg.width) / 2)) + 'px',
				top: (_cfg.top || (window.innerHeight - _cfg.height) / 2) + 'px'
			});

			// 设置皮肤
			if (_cfg.skinClassName) {
				$boundingBox.addClass(_cfg.skinClassName);
			}

			// 设置拖拽
			if (_cfg.isDraggable) {
				if (_cfg.draggableHandle) { //设置了拖拽目标
					$boundingBox.draggable({
						handle: _cfg.draggableHandle
					});
				} else { //没有设置为整体可拖拽
					$boundingBox.draggable();
				}
			}

			// 关闭按钮
			if (_cfg.hasCloseBtn) {
				var closeBtn = $('<span class="window_closeBtn">X</span>');
				//把关闭按钮添加到header中（其实添加在最外层的盒子中也行）
				closeBtn.appendTo($boundingBox.find('.window_header'));
				closeBtn.click(function() {
					//_cfg.fn4CloseBtn && _cfg.fn4CloseBtn(); //如果存在回调函数，则处理
					$boundingBox.remove();
					$mask && $mask.remove();
					that.fire('close');
				});
			}

			var $btn = $boundingBox.find('.window_footer input');
			$btn.click(function() {
				//_cfg.fn4AlterBtn && _cfg.fn4AlterBtn(); //如果存在回调函数，则处理
				$boundingBox.remove();
				$mask && $mask.remove();
				that.fire('alert');
			});
			
			//其实这两部分内容完全可以删除掉，因为自定义时间已经可以在cfg之外配置任何回调函数
			if(_cfg.fn4AlterBtn) {
				this.on('alert', _cfg.fn4AlterBtn);
			}
			
			if(_cfg.fn4CloseBtn) {
				this.on('close', _cfg.fn4CloseBtn);
			}
			
			return this;
		},
		confirm: function() {},
		prompt: function() {},
		on: function(events, handler) {
			//			if (typeof this.handlers[event] == "undefined") {
			//				this.handlers[event] = [];
			//			}
			//			this.handlers[event].push(handler);

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
		Window: Window
	}
});