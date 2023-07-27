"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const users_entity_1 = require("./users.entity/users.entity");
const role_enum_1 = require("../auth/role/role.enum");
const crypto_1 = require("../utils/crypto");
let use;
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async create(user) {
        const userEntity = new users_entity_1.UsersEntity();
        userEntity.firstName = user.firstName;
        userEntity.lastName = user.lastName;
        userEntity.email = user.email;
        userEntity.roles = user.roles;
        userEntity.password = await (0, crypto_1.hash)(user.password);
        await this.usersRepository.save(userEntity);
        use = await this.findByEmail(userEntity.email);
        return use.id;
    }
    async findById(id) {
        if (use.id === id) {
            return use;
        }
        return this.usersRepository.findOneBy({ id });
    }
    async findByEmail(email) {
        return this.usersRepository.findOneBy({ email });
    }
    async setModerator(idUser) {
        const _user = await this.findById(idUser);
        if (!_user) {
            throw new common_1.UnauthorizedException();
        }
        _user.roles = role_enum_1.Role.Moderator;
        return this.usersRepository.save(_user);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.UsersEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map