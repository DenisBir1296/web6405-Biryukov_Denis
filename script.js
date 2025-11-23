
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

function sing_in(){
	
	let username = document.getElementById('username').value;
	let password = document.getElementById('password').value;
	let remember = document.getElementById('remember').checked;
	
	let d = new Data(username, password, remember);
	d.print();
	
}

document.getElementById('loginForm').addEventListener('submit', sing_in);
