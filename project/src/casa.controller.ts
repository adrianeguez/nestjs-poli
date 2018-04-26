import {Get, Controller, HttpCode, Req, Res, HttpStatus} from '@nestjs/common';
import {LoggerService} from "./logger.service";
import {Request, Response} from "express";
import {HttpException} from "@nestjs/core";

@Controller('casa')
export class CasaController {
    constructor(private _loggerService: LoggerService) {

    }

    @Get('/saludoCasa')
    @HttpCode(200)
    saludoCasa(): string {
        this._loggerService.log('info', 'Hola desde la casa', true);
        return 'Hola casa!';
    }

    @Get('/cocina')
    saludoCocina() {
        return 'Hola cocina!';
    }

    @Get('/datos')
    mostrarDatosDelRequest(@Req() req: Request, @Res() res: Response) {
        this._loggerService.log('info', `BaseUrl: ${req.baseUrl}`, false);
        this._loggerService.log('info', `Hostname: ${req.hostname}`, false);
        this._loggerService.log('info', `Subdominios: ${req.subdomains}`, false);
        this._loggerService.log('info', `IP: ${req.ip}`, false);
        this._loggerService.log('info', `Metodo: ${req.method}`, false);
        this._loggerService.log('info', `Original url: ${req.originalUrl}`, false);
        this._loggerService.log('info', `Path: ${req.path}`, false);
        this._loggerService.log('info', `Protocolo: ${req.protocol}`, false);
        this._loggerService.log('info', `Query parameters: ${JSON.stringify(req.query)}`, false);

        if (req.cookies.nombre) {
            this._loggerService.log('info', `Cookie existe: ${req.cookies.nombre}`);
        } else {
            res.cookie('nombre', 'Adrian', {maxAge: 900000, httpOnly: true});
            this._loggerService.log('info', `Cookie seteada`);
        }

        if (req.signedCookies.nombreFirmado) {
            this._loggerService.log('info', `Cookie firmada existe: ${req.signedCookies.nombreFirmado}`);
        } else {
            res.cookie('nombreFirmado', 'Vicente Adrian Eguez Sarzosa', {
                signed: true,
            });
            this._loggerService.log('info', `Cookie seteada`);
        }
        if (req.accepts('image/png')) {
            return res.send();
        } else {
            throw new HttpException('No permitimos estos mime tipes', HttpStatus.BAD_REQUEST);
        }
    }
}
