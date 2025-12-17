
class Data {
    constructor(login, passwd, remember) {
        this.login = login;
        this.passwd = passwd;
        this.remember = remember;
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
            
    // Поле пустое      
	if (password.length === 0) {
		fields.password = false;
		this.className = 'bad';
		hint.textContent = 'Введите пароль';
		hint.className = 'hint bad-hint';
	// Слишком короткое
	} else if (password.length < 8) {
		fields.password = false;
		this.className = 'bad';
		hint.textContent = 'Пароль должен быть не менее 8 символов';
		hint.className = 'hint bad-hint';
	// Все хорошо
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
submitBtn.addEventListener('click', async function(e){
	
	try{
		let username = loginInput.value;
		let password = passwordInput.value;
		let remember = rememberInput.checked;
		
		let d = new Data(username, password, remember);
		d.print()
		
		// выполняем запрос 
		e.preventDefault()
		const response = await fetch('http://127.0.0.1:8000/post', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			//mode: 'no-cors', // Ограниченный режим
			body: JSON.stringify(d)
		});
		
		// выводим результаты ответа
		//console.log(response)
		
		// проверяем что запрос прошел успешно
		if (!response.ok) {
			throw new Error(`HTTP ошибка! Статус: ${response.status}`);
		}
		
		// получаем ответ от сервера
		resjson = await response.json()
		//console.log(resjson);
		
		// проверяем корректность обработки
		if (!resjson.status) {
			throw new Error('Ошибка на сервере');
		}
		
		// проверяем существует ли уже такой пользователь
		if(resjson.isExist){
			// выводим ошибку если существует
			const hint = document.getElementById('usernameHint');
			fields.username = false;
			loginInput.className = 'bad';
			hint.textContent = 'Пользователь уже существует';
			hint.className = 'hint bad-hint';
			
		} else {
			//перенаправляем
			window.location.href = 'account.html'
		}
		
	} catch (error) {
		alert('Ошибка!');
		console.log(error);
	}
})


checkAllFields()
