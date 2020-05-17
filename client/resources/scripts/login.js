$(() => {
	$('.loginForm').on('submit', (e) => {
		e.preventDefault();
		var user = $('#username').val();
		var pwd = $('#password').val();
		// other things will be added after server code additions
	})
});