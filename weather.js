#!/usr/bin/env node
import { getWeather } from './services/api.service.js';
import { getArgs } from './helpers/args.js';
import { printHelp, printSuccess, printError, showWeather } from './services/log.service.js';
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue } from './services/storage.service.js';

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

const saveCity = async (city) => {
    if (!city.length) {
        printError('Не передан город');
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess('Город сохранён');
    } catch (e) {
        printError(e.message);
    }
}

const getForcast = async () => {
    try {
        const myCity = await getKeyValue(TOKEN_DICTIONARY.city);
        if (!myCity) {
            throw new Error('Не задан город, задайте его через команду -s [CITY]');
        }
        const weather = await getWeather(myCity);
        showWeather(weather);
        // Красивый вывод погоды
    } catch (e) {
        if (e?.response?.status == 404) {
            printError('Неверно указан город');
        } else if (e?.response?.status == 401) {
            printError('Неверно указан токен');
        } else {
            printError(e.message);
        }
    }
}

const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }
    if (args.s) {
        return saveCity(args.s);
    }
    if (args.t) {
        return saveToken(args.t);
    }
    return getForcast();


};

initCLI();