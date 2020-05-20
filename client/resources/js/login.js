$(() => {
	var session = Math.floor(Math.random() * 1000000);
	$('.loginForm').on('submit', (e) => {
		e.preventDefault();
		var user = $('#username').val();
		var pwd = $('#password').val();
		$.post('/login', {username: user, password: pwd, session: session}, (username) => {
			if (username.isAuthenticated == true) {
				localStorage.setItem('key', username.key);
				console.log(username.isAuthenticated);
				window.location.href = '/profile';
			} else {
				$('#error').html(username.error);
			}
		})
	})
})