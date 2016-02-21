// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылку на экспортируемый
// приложением интерфейс

// Фреймворк может явно загрузить библиотеки
var fs = require('fs'),
    vm = require('vm');

// создаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = { module: {}, console: console };
context.global = context;
var sandbox = vm.createContext(context);

// читаем исходный код приложения из файла
var fileName = './application.js';
fs.readFile(fileName, function(err, src) {
  // Тут нужно обработать ошибки
  
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  
  // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  // сохранить в кеш, вывести на экран исходный код приложения и т.д.
});