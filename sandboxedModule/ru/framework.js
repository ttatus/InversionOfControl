// Файл, демонстрирующий то, как фреймворк создает среду (песочницу) для
// исполнения приложения, загружает приложение, передает ему песочницу в
// качестве глобального контекста и получает ссылу на экспортируемый
// приложением интерфейс. Читайте README.md в нем задания.

// Фреймворк может явно зависеть от библиотек через dependency lookup
var fs = require('fs'),
    vm = require('vm');
	util = require('util');

// copy of console object with log wrapper
var my_console = util._extend({}, console);
my_console.log = log_wrapper;

// Чоздаем контекст-песочницу, которая станет глобальным контекстом приложения
var context = { module: {},
                console: my_console,
                setTimeout: setTimeout,
                setInterval: setInterval,
                clearInterval: clearInterval,
                util: util,
                print_dict: print_dict,
                require: require_wrapper};
context_copy = util._extend({}, context); //copy for comparison
context.global = context;
var sandbox = vm.createContext(context);


// Читаем исходный код приложения из файла
// task3 (should I read from command line one appname or more?)
var fileName = process.argv[2];

fs.readFile(fileName, function(err, src) {
  // Тут нужно обработать ошибки
    if (err) throw err;
  
  // Запускаем код приложения в песочнице
  var script = vm.createScript(src, fileName);
  script.runInNewContext(sandbox);
  
  // Забираем ссылку из sandbox.module.exports, можем ее исполнить,
  // сохранить в кеш, вывести на экран исходный код приложения и т.д.

    //task 7: print <key> <type of object> from application export
    exp = sandbox.module.exports;
    console.log('\nApplication exports content:');
    print_dict(exp);

    //task 8
    console.log('\nFunction source:\n' + exp.hello_function.toString());

    print_dict(context);

    compare_keys(context_copy, context);
 });

//print dict in format <key> : <value type>
function print_dict(dict) {
    for (key in dict) {
        console.log(key + ": " + typeof(dict[key]));
    }
}

//dicts comparison
function compare_keys(dict1, dict2) {
    console.log('Removed keys:');
    for (key1 in dict1) {
        if (dict2[key1] == undefined) console.log(key1)
    }

    console.log('Added keys:');
    for (key2 in dict2) {
        if (dict1[key2] == undefined) console.log(key2)
    }
}

//log file name
const log_file = 'console_log.txt'

// delete console_log file, if it exists
fs.access(log_file, fs.F_OK, function(err){
    if (!err) {
        fs.unlink(log_file, function(err) { if (err) throw err; });
    }
});

// print text in format <applicationName> <time> <text> into console and log-file
function log_wrapper(text) {
    var message = create_message(text);

    console.log(message);
    fs.appendFileSync(log_file, message+'\n');
    //os.EOL
}

// print message in format <applicationName> <time> <module_name> into log file
// and return required module
function require_wrapper(module_name) {
    var message = create_message(module_name);

    fs.appendFileSync(log_file, message+'\n');

    return require(module_name);
}

// create message in format <applicationName> <time> <text>
function create_message(text) {
    var date = new Date();
    var options = {hour:'numeric', minute: 'numeric', second: "numeric"};
    time = date.toLocaleString('ru', options);

    var message = [fileName, time, text].join(' ');
    return message;
}