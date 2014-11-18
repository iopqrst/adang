require.config({
	paths: {
		jquery: 'jquery-1.11.0'
	}
});

require(['jquery', 'window'], function($, w) {
	$("a:first").click(function() {
		new w.Window().alert({
			width: 500,
			height: 200,
			hasCloseBtn: true,
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