/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
	return n === (n | 0);
	}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
	let count = 10;
	let arr = new Array(count);
	for(let i = 0; i < count; i++){
		arr[i] = 2*i + 2;
	}
	return arr; 
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
	let summ = n;
	for(let i = 1; i < n; i++)	
	{
		summ += i;
	}
	return summ;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
	if (n > 1)
	{
		return n + recSumTo(n - 1);
	};
	return 1;
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
	let res = n;
	for(let i = 2; i < n; i++)
	{
		res *= i;
	}
	return res;
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
	if (n === 0) {return false;};
	return (n & (n - 1)) === 0;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
	let a0 = 0
	let a1 = 1
	while(n-- > 0)
	{
		a0 += a1;
		[a0, a1] = [a1, a0];
	};
	return a0;
		
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn= (a, b) => a) {
	
	let value = initialValue
	
	return function func(b)
	{
		value = operatorFn(value, b);
		return value;
	};
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
 
function sequence(start=0, step=1) {
	let val = start;
	return function generator()
	{	let buff = val;
		val += step;
		return buff;
	};
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
	
	// Проводим строгое сравнение
	if (firstObject === secondObject){
		return true;
	}
	
	// проверяем не являются ли оба числа NaN
	if (isNaN(firstObject) & isNaN(secondObject) & typeof firstObject == "number" & typeof secondObject == "number")
	{
		return true;
	}
	
	// Проверяем что firstObject и secondObject объекты
	if (typeof firstObject != "object" || typeof secondObject != "object")
	{
		return false;
	}
	
    // Получаем ключи
    let keysFrs = Object.keys(firstObject);
    let keysSec = Object.keys(secondObject);
    
    // Сравниваем их колличество
    if (keysFrs.length !== keysSec.length) return false;
    
    // Проверяем все ключи рекурсивно
    for (let key of keysFrs) {
		
        // проводим сравнение вложенных ключей
		if (!deepEqual(firstObject[key], secondObject[key])) {
            return false;
        }
    }
    
    return true;
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
