$(() => {
	$('.loginForm').on('submit', (e) => {
		e.preventDefault();
		var user = $('#username').val();
		var pwd = $('#password').val();
		user = user.replace(/\$/g, '&#36;');
		$.post('/register', {username: user, password: pwd}, (username) => {
			if (username.allowed == true) {
				window.location.href = '/login';
			} else {
				$('#error').html(username.error);
			}
		})
	})
})