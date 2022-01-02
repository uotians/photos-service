"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.UsersController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("src/auth/jwt-auth.guard");
var user_entity_1 = require("./entities/user.entity");
var UsersController = /** @class */ (function () {
    function UsersController(usersService) {
        this.usersService = usersService;
    }
    UsersController.prototype.createUser = function (createUserDto) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.insertUserWithProfile(createUserDto)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersController.prototype.createAdmin = function (createUserDto) {
        return __awaiter(this, void 0, Promise, function () {
            var isFirstUser;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.getUsers()];
                    case 1:
                        isFirstUser = _a.sent();
                        if (!(isFirstUser.length != 0)) return [3 /*break*/, 2];
                        throw new common_1.ForbiddenException;
                    case 2: return [4 /*yield*/, this.usersService.insertUserWithProfile(createUserDto)];
                    case 3: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersController.prototype.updateUser = function (id, createUserDto) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.updateUser(id, createUserDto)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersController.prototype.getUsers = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.getUsers()];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersController.prototype.getUser = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.getUserById(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    UsersController.prototype.deleteUser = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.deleteUser(id)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        common_1.Post(),
        swagger_1.ApiOperation({ summary: 'Create a new user' }),
        swagger_1.ApiResponse({ status: 401, description: 'Not logged in' }),
        swagger_1.ApiCreatedResponse({
            description: 'User has been succesfully created',
            type: user_entity_1.User
        }),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Body())
    ], UsersController.prototype, "createUser");
    __decorate([
        common_1.Post('/admin'),
        swagger_1.ApiOperation({ summary: 'Create an admin' }),
        swagger_1.ApiCreatedResponse({
            description: 'Admin has been succesfully created',
            type: user_entity_1.User
        }),
        __param(0, common_1.Body())
    ], UsersController.prototype, "createAdmin");
    __decorate([
        common_1.Patch(':id'),
        swagger_1.ApiOperation({ summary: 'Update an user' }),
        swagger_1.ApiResponse({ status: 401, description: 'Not logged in' }),
        swagger_1.ApiResponse({ status: 404, description: 'Could not found matching ID' }),
        swagger_1.ApiCreatedResponse({
            description: 'User has been succesfully updated',
            type: user_entity_1.User
        }),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Param('id')), __param(1, common_1.Body())
    ], UsersController.prototype, "updateUser");
    __decorate([
        common_1.Get(),
        swagger_1.ApiOperation({ summary: 'Get all users' }),
        swagger_1.ApiResponse({ status: 200, description: 'OK' })
    ], UsersController.prototype, "getUsers");
    __decorate([
        common_1.Get(':id'),
        swagger_1.ApiOperation({ summary: 'Get an users' }),
        swagger_1.ApiResponse({ status: 200, description: 'OK' }),
        swagger_1.ApiResponse({ status: 404, description: 'Could not found matching ID' }),
        __param(0, common_1.Param('id'))
    ], UsersController.prototype, "getUser");
    __decorate([
        common_1.Delete(':id'),
        swagger_1.ApiOperation({ summary: 'Delete an user' }),
        swagger_1.ApiResponse({ status: 200, description: 'Deleted' }),
        swagger_1.ApiResponse({ status: 401, description: 'Not logged in' }),
        swagger_1.ApiResponse({ status: 404, description: 'Could not found matching ID' }),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, common_1.Param('id'))
    ], UsersController.prototype, "deleteUser");
    UsersController = __decorate([
        common_1.Controller('users'),
        swagger_1.ApiTags('users')
    ], UsersController);
    return UsersController;
}());
exports.UsersController = UsersController;
