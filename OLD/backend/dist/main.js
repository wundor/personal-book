"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        enableDebugMessages: true,
    }));
    app.enableCors();
    await app.listen(4001);
    common_1.Logger.log(`Thanks for using Personal Book! You're using version ${process.env.npm_package_version}`);
}
bootstrap();
//# sourceMappingURL=main.js.map