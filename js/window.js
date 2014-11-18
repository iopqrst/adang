/**
 * //$UI其实没有什么作用，仅仅为了require引入参数能对应上
 */
define(['widget', 'jquery', 'jquery_ui'], function(widget, $, $ui) {

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
			btn4Confirm: '确定',
			btn4Cancel: '取消',
			hasCloseBtn: false,
			skinClassName: '',
			isDraggable: false,
			fn4AlterBtn: function() {},
			fn4CloseBtn: function() {},
			fn4ConfirmBtn: function() {},
			fn4CancelBtn: function() {}
		}
	}

	Window.prototype = $.extend({}, new widget.Widget(), {
		renderUI: function() {

			var footerContent = '';
			switch (this.cfg.winType) {
				case "alert":
					footerContent = '<input type="button" value="' + this.cfg.btn4Alert + '" class="window_alterBtn"/>';
					break;
				case "confirm":
					footerContent = '<input type="button" value="' + this.cfg.btn4Confirm + '" class="window_confirmBtn"/><input type="button" value="' + this.cfg.btn4Cancel + '" class="window_cancelBtn"/>';
			}

			this.boundingBox = $('<div class="window_boundingBox">' + '<div class="window_header">' + this.cfg.title + '</div>' + '<div class="window_body">' + this.cfg.content + '</div>' + '<div class = "window_footer">' + footerContent + '</div></div>');

			if (this.cfg.hasMask) {
				this._mask = $('<div class = "window_mask"></div>');
				this._mask.appendTo("body");
			}

			if (this.cfg.hasCloseBtn) {
				var closeBtn = $('<span class="window_closeBtn">X</span > ');
				//把关闭按钮添加到header中（其实添加在最外层的盒子中也行）
				closeBtn.appendTo(this.boundingBox.find('.window_header '));
			}

			this.boundingBox.appendTo(document.body);
		},
		bindUI: function() {
			var that = this;

			this.boundingBox.delegate(".window_alterBtn", "click", function() {
				that.fire("alert");
				that.destory();
			}).delegate(".window_confirmBtn", "click", function() {
				that.fire("confirm");
				that.destory();
			}).delegate(".window_cancelBtn", "click", function() {
				that.fire("cancel");
				that.destory();
			}).delegate(".window_closeBtn", "click", function() {
				that.fire("close");
				that.destory();
			});

			//执行完成后回调函数
			if (this.cfg.fn4AlterBtn) {
				this.on("alter", this.cfg.fn4AlterBtn);
			}

			//关闭回调函数
			if (this.cfg.fn4CloseBtn) {
				this.on("close", this.cfg.fn4CloseBtn);
			}

			//confirm 确认函数
			if (this.cfg.fn4ConfirmBtn) {
				this.on("confirm", this.cfg.fn4ConfirmBtn);
			}

			//confirm 取消函数
			if (this.cfg.fn4CancelBtn) {
				this.on("cancel", this.cfg.fn4CancelBtn);
			}
		},
		syncUI: function() {
			this.boundingBox.css({
				"width": this.cfg.width + "px",
				"height": this.cfg.height + "px",
				"left": (this.cfg.left || ((window.innerWidth - this.cfg.width) / 2)) + "px",
				"top": (this.cfg.top || (window.innerHeight - this.cfg.height) / 2) + "px"
			});

			// 设置皮肤
			if (this.cfg.skinClassName) {
				this.boundingBox.addClass(this.cfg.skinClassName);
			}

			// 设置拖拽
			if (this.cfg.isDraggable) {
				if (this.cfg.draggableHandle) { //设置了拖拽目标
					this.boundingBox.draggable({
						handle: this.cfg.draggableHandle
					});
				} else { //没有设置为整体可拖拽
					this.boundingBox.draggable();
				}
			}
		},
		destructor: function() {
			this._mask && this._mask.remove();
		},
		alert: function(cfg) {
			$.extend(this.cfg, cfg, {winType:'alert'});
			this.render();
			return this;
		},
		confirm: function(cfg) {
			$.extend(this.cfg, cfg, {winType:'confirm'});
			this.render();
			return this;
		}

	});

	return {
		Window: Window
	}
});