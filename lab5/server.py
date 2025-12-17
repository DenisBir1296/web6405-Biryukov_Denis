# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # ← Разрешаем все CORS запросы


userlist = [{'login': 'user', 'email': 'user@mail.ru'},
			{'login': 'ivanivan', 'email': 'ivan@gmail.ru'},
			{'login': 'cat124', 'email': 'catcat@mail.ru'}]


@app.route('/post', methods=['POST'])
def handle_post():
    """Обработчик POST запросов"""
    
    # Получаем данные из запроса
    data = request.get_json()
    print("📨 Получен JSON:", data)
        
    isExist = False
    status = True
    global userlist
	
    try:

        isExist = data['login'] in [i['login'] for i in userlist]
        
        if not isExist:
            userlist += [{'login': data['login'], 'email': ''}]
			
    except Exception as e:
        status = False
        print(e)
    
    # Всегда возвращаем JSON ответ
    return jsonify({
        'status': status,
        'isExist': isExist
    })


@app.route('/userlist', methods=['GET'])
def handle_get():
	return jsonify(userlist)


if __name__ == '__main__':
    print("✅ Сервер запущен: http://localhost:8000")
    print("📤 Отправляйте POST запросы на /post")
    print("📤 Запрос на получение списка пользователей на /userlist")
    app.run(debug=True, port=8000)
