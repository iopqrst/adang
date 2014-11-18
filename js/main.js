require.config({
	paths: {
		jquery: 'jquery-1.11.0',
		jquery_ui: 'jquery-ui-1.10.3.custom'
	}
});

require(['jquery', 'window'], function($, w) {
	$("a:first").click(function() {
		var win = new w.Window();
		win.alert({
			width: 500,
			height: 200,
			btn4Alert: 'OK Beng!!',
			hasCloseBtn: true,
			skinClassName: '',
			hasMask: true,
			isDraggable: true,
			draggableHandle: '.window_header', //设置拖拽目标为标题部分（默认为整个框体）
			content: "Welcome my alert",
			fn4AlertBtn: function() {
				alert('you click alert btn!');
			},
			fn4CloseBtn: function() {
				alert('you click close btn!');
			}
		});

		win.on('alert', function() {
			alert('alert-自定义事件的第1个方法');
		}).on('alert', function() {
			alert('alert-自定义事件的第2个方法');
		}).on('alert', function() {
			alert('alert-自定义事件的第3个方法');
		});

		win.on('close', function() {
			alert('close-自定义事件的第1个方法');
		});

		win.on('close', function() {
			alert('close-自定义事件的第2个方法');
		});
	});

	$("a:last").click(function() {
		var win = new w.Window();
		win.confirm({
			width: 500,
			height: 200,
			hasCloseBtn: true,
			skinClassName: '',
			btn4Confirm: '确定',
			btn4Cancel: '取消',
			hasMask: true,
			isDraggable: true,
			draggableHandle: '.window_header', //设置拖拽目标为标题部分（默认为整个框体）
			content: "Welcome my confirm",
			fn4ConfirmBtn: function() {
				alert('click confirm btn');
			},
			fn4CancelBtn: function() {
				alert('click cancel btn');
			}
		});

		win.on('confirm', function() {
			alert('confirm-自定义事件的第1个方法');
		}).on('confirm', function() {
			alert('confirm-自定义事件的第2个方法');
		}).on('confirm', function() {
			alert('confirm-自定义事件的第3个方法');
		});

		win.on('cancel', function() {
			alert('cancel-自定义事件的第1个方法');
		});

		win.on('cancel', function() {
			alert('cancel-自定义事件的第2个方法');
		});
	});
});