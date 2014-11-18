define(['widget', 'jquery', 'jquery_ui'], function(widget, $, $ui) { //$UI其实没有什么作用，仅仅为了require引入参数能对应上
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
			skinClassName: '',
			isDraggable: false
		};

		this.handlers = {};
	};

	Window.prototype = $.extend({}, new widget.Widget(), {
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
					that.fire('close');
					$boundingBox.remove();
					$mask && $mask.remove();
				});
			}

			var $btn = $boundingBox.find('.window_footer input');
			$btn.click(function() {
				//_cfg.fn4AlterBtn && _cfg.fn4AlterBtn(); //如果存在回调函数，则处理
				that.fire('alert');
				$boundingBox.remove();
				$mask && $mask.remove();
			});

			return this;
		},
		confirm: function() {},
		prompt: function() {}

	});

	return {
		Window: Window
	}
});