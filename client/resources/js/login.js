$(() => {
	$('.loginForm').on('submit', (e) => {
		e.preventDefault();
		var user = $('#username').val();
		var pwd = $('#password').val();
		$.post('/login', {username: user, password: pwd}, (username) => {
			if (username.isAuthenticated == true) {
				console.log(username.isAuthenticated);
				window.location.href = '/profile';
			} else {
				$('#error').html(username.error);
			}
		})
	})
})