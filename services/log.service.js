import chalk from 'chalk';
import dedent from 'dedent-js';

const printError = (error) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + error);
};

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message);
};

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
		Без параметров - вывод погоды
		-s [CITY] для установки города
		-h для вывода помощи
		-t [API_KEY] для сохранения токена
		`
    );
};

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



function showWeather(weather) {

    const description = chalk.bgGreen(' ' + capitalizeFirstLetter(weather.weather[0].description) + ' ');

    console.log(
        dedent`${chalk.bgBlueBright(' Погода ')}
🏙️      ${weather.name}        
⛅     Описание: ${description}               
🔥     Температура: ${weather.main.temp}       
🍃     Скорость ветра: ${weather.wind.speed}   	
	`
    );
}

export { printError, printSuccess, printHelp, showWeather };



