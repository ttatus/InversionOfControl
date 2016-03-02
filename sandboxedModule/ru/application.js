// Файл содержит маленький кусочек основного модуля демонстрационного
// прикладного приложения, загружаемого в песочницу демонстрационным
// кусочком фреймворка. Читайте README.md в нем задания.

var fs = require('fs');

// Вывод из глобального контекста модуля
console.log('From application global context');

// task1
interval = setInterval(function(){
		console.log('Hello with 1s interval');
}, 1000);

setTimeout(function(){
		clearInterval(interval);
		console.log('Stop interval spam');
		console.log('Hello from timer');
},5000);

// task2
console.log(util.format('Hello %s, I`m %s here', 'friend', 'learning Node.js'));


module.exports = function() {
  // Вывод из контекста экспортируемой функции
  console.log('From application exported function');
};
