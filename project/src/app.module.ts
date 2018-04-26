import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {CasaController} from "./casa.controller";
import {LoggerService} from "./logger.service";

@Module({
    imports: [],
    controllers: [
        AppController,
        CasaController,
    ],
    components: [
        LoggerService
    ],
})
export class AppModule {
}
