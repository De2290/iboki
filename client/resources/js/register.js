$(() => {
	$('.loginForm').on('submit', (e) => {
		e.preventDefault();
		var user = $('#username').val();
		var pwd = $('#password').val();
		$.post('/register', {username: user, password: pwd}, (user) => {
			if (user == true) {
				window.location.href = '/login';
			} else {
				console.log(user);
			}
		})
	})
})