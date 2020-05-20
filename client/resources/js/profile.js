$(() => {
	var key = localStorage.getItem('key');
	$.post('/profile', {key: key}, (auth) => {
		if (auth == false) {
			window.location.href = '/login';
		}
	})
})