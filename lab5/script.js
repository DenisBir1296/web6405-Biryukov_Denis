
class Data {
    constructor(login, passwd, remember) {
        this.login = login;
        this.passwd = passwd;
        this.remember = remember;
    }
    
    async send(url){
		const response = await fetch(url, {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(this)})
		
		if (!response.ok) {
			console.log('Ошибка при отправке данных: ' + error.message);
		}
	}
    
    print() {
		console.log(`Логин: ${this.login}`);
		console.log(`Пароль: ${this.passwd}`);
		console.log(`Запомнить: ${this.remember}`);
	}
}

const loginInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberInput = document.getElementById('remember');
const submitBtn = document.getElementById('submitBtn');


// Объект для отслеживания состояния полей
const fields = {
	username: false,
	password: false
};

// проверка для поля логина
loginInput.addEventListener('input', function() {
	const username = this.value;
	const hint = document.getElementById('usernameHint');
            
	if (username.length === 0) {
	// Поле пустое
		fields.username = false;
		this.className = 'bad';
		hint.textContent = 'Введите имя';
		hint.className = 'hint bad-hint';
	} else if (username.length < 3) {
	// Слишком короткое
		fields.username = false;
		this.className = 'bad';
		hint.textContent = 'Имя должно быть не менее 3 символов';
		hint.className = 'hint bad-hint';
	} else {
	// Все хорошо
		fields.username = true;
		this.className = 'good';
		hint.textContent = 'Имя подходит';
		hint.className = 'hint good-hint';
	}
            
	checkAllFields(); // Проверяем все поля
});

// проверка для поля пароля
passwordInput.addEventListener('input', function() {
	const password = this.value;
	const hint = document.getElementById('passwordHint');
            
            
	if (password.length === 0) {
		fields.password = false;
		this.className = 'bad';
		hint.textContent = 'Введите пароль';
		hint.className = 'hint bad-hint';
	} else if (password.length < 8) {
		fields.password = false;
		this.className = 'bad';
		hint.textContent = 'Пароль должен быть не менее 8 символов';
		hint.className = 'hint bad-hint';
	} else {
		fields.password = true;
		this.className = 'good';
		hint.textContent = 'Пароль подходит';
		hint.className = 'hint good-hint';
	}
            
	checkAllFields(); // Проверяем все поля
});

// Проверка всех полей для разрешения нажатия на кнопку
function checkAllFields() {
	// Проверяем, все ли поля заполнены правильно
	const allGood = (fields.username === true) && (fields.password === true)
            
	if (allGood) {
		submitBtn.disabled = false;
		
	} else {
		submitBtn.disabled = true;
	}
}

// Отправка данных
submitBtn.addEventListener('click', function(e){
	
	let username = loginInput.value;
	let password = passwordInput.value;
	let remember = rememberInput.checked;
	
	let d = new Data(username, password, remember);
	d.print()
	d.send('http://127.0.0.1:8000/home')
})


checkAllFields()
