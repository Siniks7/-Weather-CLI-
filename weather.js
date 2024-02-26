#!/usr/bin/env node
import { getWeather } from './services/api.service.js';
import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess, printError } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY } from './services/storage.service.js';



const saveToken = async (token) => {
    if (!token.length) {
        printError('Не передан token');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token);
        printSuccess('Токен сохранён');
    } catch (e) {
        printError(e.message);
    }
}

const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        printHelp();
    }
    if (args.s) {
        // Сохранить город
    }
    if (args.t) {
        return saveToken(args.t);
    }
    const city = Object.values(args);
    const data = getWeather(city[0]).then(res => { console.log(res); }); // 'krasnoyarsk'
    // Вывести погоду
};

initCLI();