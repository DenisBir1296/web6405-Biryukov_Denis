
async function load() {
            try {
				// получаем список пользователей
                const response = await fetch('http://localhost:8000/userlist');
                const time = new Date();
                
                // проверяем что запрос прошел успешно
                if (!response.ok) {
					throw new Error(`Ошибка HTTP: ${response.status}`);
				}
				
				// получаем json
                const users = await response.json();
                
                // проверяем что json является массивом
                if (!Array.isArray(users)) {
					throw new Error('Данные не являются массивом' );
				}
                
                // формируем табличку
                let table = '<table>';
                table += '<tr><th>Логин</th><th>Email</th></tr>';
                
                users.forEach(user => {
					
					// проверяем элементы массива
					if (typeof user !== 'object' || user === null) {
						throw new Error(`Элемент не является объектом: ${user}`);
					}
					
					// проверяем наличие необходимых полей
					if (!(user.hasOwnProperty('login') && user.hasOwnProperty('email'))){
						throw new Error('Отсутствуют необходимые поля');
					}
					
					// проверяем типы полей
					if (typeof user.login !== 'string' || typeof user.email !== 'string'){
						throw new Error('Неправильный тип полей');
					}
					
                    table += `<tr>
                        <td>${user.login}</td>
                        <td>${user.email}</td>
                    </tr>`;
                });
                
                table += '</table>';
                table += `<p>Время обновления: ${time.toTimeString()}</p>`
                // добавляем табличку
                document.getElementById('result').innerHTML = table;
                
            } catch(error) {
                document.getElementById('result').innerHTML = `Ошибка: ${error.message}`;
            }
        }
        
        // Автообновление
        load()
        setInterval(load, 30*1000)
