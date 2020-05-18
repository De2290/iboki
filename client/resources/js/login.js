$(() => {
	$('.loginForm').on('submit', (e) => {
		e.preventDefault();
		var user = $('#username').val();
		var pwd = $('#password').val();
		$.post('/login', {username: user, password: pwd}, (user) => {
			if (user.isAuthenticated == true) {
				console.log(user.isAuthenticated);
				window.location.href = '/profile';
			} else {
				console.log("Invalid login");
			}
		})
	})
})