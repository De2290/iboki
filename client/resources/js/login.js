$(() => {
	$('.loginForm').on('submit', (e) => {
		e.preventDefault();
		var user = $('#username').val();
		var pwd = $('#password').val();
		user = user.replace(/\$/g, '&#36;');
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