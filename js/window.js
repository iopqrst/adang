define(['jquery'], function($) {
	function Window() {
		this.cfg = {
			left: 0,
			top: 0,
			width: 500,
			height: 300,
			title: '提示',
			content: '',
			btn4Alert: '确定',
			hasCloseBtn: false,
			fn4AlterBtn: null,
			fn4CloseBtn: null
		};
	};

	Window.prototype = {
		alert: function(cfg) {
			var _cfg = $.extend(this.cfg, cfg);
			var box = '<div class="window_boundingBox">' + '<div class="window_header">' + _cfg.title + '</div>' + '<div class="window_body">' + _cfg.content + '</div>' + '<div class="window_footer">' + '<input type="button" class="window_alterBtn" value="' + _cfg.btn4Alert + '"/></div>' + '</div>';
			var $boundingBox = $(box);
			$boundingBox.appendTo("body");

			$boundingBox.css({
				width: _cfg.width + 'px',
				height: _cfg.height + 'px',
				left: (_cfg.left || ((window.innerWidth - _cfg.width) / 2)) + 'px',
				top: (_cfg.top || (window.innerHeight - _cfg.height) / 2) + 'px'
			});

			if (_cfg.hasCloseBtn) {
				var closeBtn = $('<span class="window_closeBtn">X</span>');
				//把关闭按钮添加到header中（其实添加在最外层的盒子中也行）
				closeBtn.appendTo($boundingBox.find('.window_header'));
				closeBtn.click(function() {
					_cfg.fn4CloseBtn && _cfg.fn4CloseBtn(); //如果存在回调函数，则处理
					$boundingBox.remove();
				});
			}

			var $btn = $boundingBox.find('.window_footer input');

			$btn.click(function() {
				_cfg.fn4AlterBtn && _cfg.fn4AlterBtn(); //如果存在回调函数，则处理
				$boundingBox.remove();
			});
		},
		confirm: function() {},
		prompt: function() {}
	};

	return {
		Window: Window
	}
});