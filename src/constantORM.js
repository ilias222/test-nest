"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TYPEORM_ENTITIES = exports.TYPEORM_DRIVER_EXTRA = exports.TYPEORM_SYNCHRONIZE = exports.TYPEORM_PORT = exports.TYPEORM_DATABASE = exports.TYPEORM_PASSWORD = exports.TYPEORM_USERNAME = exports.TYPEORM_HOST = exports.TYPEORM_CONNECTION = void 0;
let configService;
exports.TYPEORM_CONNECTION = String(process.env.TYPEORM_CONNECTION);
exports.TYPEORM_HOST = Number(process.env.TYPEORM_HOST);
exports.TYPEORM_USERNAME = String(process.env.TYPEORM_USERNAME);
exports.TYPEORM_PASSWORD = String(process.env.TYPEORM_PASSWORD);
exports.TYPEORM_DATABASE = String(process.env.TYPEORM_DATABASE);
exports.TYPEORM_PORT = Number(process.env.TYPEORM_PORT);
exports.TYPEORM_SYNCHRONIZE = String(process.env.TYPEORM_SYNCHRONIZE);
exports.TYPEORM_DRIVER_EXTRA = String(process.env.TYPEORM_DRIVER_EXTRA);
exports.TYPEORM_ENTITIES = String(process.env.TYPEORM_ENTITIES);
//# sourceMappingURL=constantORM.js.map