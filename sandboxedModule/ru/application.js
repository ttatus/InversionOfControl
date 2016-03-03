// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

var crypto = require('crypto');

// Вывод из глобального контекста модуля
console.log('From application global context');

// task1
var interval = setInterval(function(){
		console.log('Hello with 1s interval');
}, 1000);

setTimeout(function(){
		clearInterval(interval);
		console.log('Stop interval spam');
		console.log('Hello from timer');
},5000);

// task2
function hello_util(name, activity) {
    console.log(util.format('Hello %s, I`m %s here', name, activity));
}

hello_util('friend', 'learning Node.js');

console.log('Sandbox content from application:');
print_dict(global);

module.exports = {
    hello_function : hello_util,
    some_function: function () {
        // Вывод из контекста экспортируемой функции
        console.log('From application exported function');
    },
    some_variable : "string variable",
    other_variable : 3
}