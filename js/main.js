require.config({
	paths: {
		jquery: 'jquery-1.11.0',
		jquery_ui: 'jquery-ui-1.10.3.custom'
	}
});

require(['jquery', 'window'], function($, w) {
	$("a:first").click(function() {
		new w.Window().alert({
			width: 500,
			height: 200,
			btn4Alert: 'OK Beng!!',
			hasCloseBtn: true,
			skinClassName: '',
			hasMask: true,
			isDraggable: true,
			draggableHandle : '.window_header', //设置拖拽目标为标题部分（默认为整个框体）
			content: "Welcome my alert",
			fn4AlterBtn: function() {
				alert('oh fucking , you click me!');
			},
			fn4CloseBtn: function() {
				alert('you close the diaog!');
			}
		});
	});
});