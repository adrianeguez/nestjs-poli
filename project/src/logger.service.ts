import {Component} from '@nestjs/common';
import * as winston from "winston";

const {format} = require('winston');
const {combine, timestamp, printf, colorize} = format;
const myFormat = printf(info => {
    const formato = {
        timestamp: info.timestamp,
        level: info.level,
        message: info.message,
        esPrivado: info.esPrivado,
    };
    return JSON.stringify(formato);
});
const ignorePrivate = format((info, opts) => {
    if (info.esPrivado === true) {
        return false;
    }
    return info;
});
winston.configure({
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({filename: 'app-logs.log'})
    ],
    format: combine(
        timestamp(),
        ignorePrivate(),
        myFormat,
        format.json()
    ),
});

@Component()
export class LoggerService {
    private _logger;

    constructor() {

        this._logger = winston;
        this._logger.log({level: 'info', message: 'Bienvenidos'});
    }

    log(nivel: string, mensaje: string, esPrivado = false) {
        this._logger.log({level: nivel, message: mensaje});
    }
}
