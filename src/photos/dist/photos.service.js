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
exports.PhotosService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var photo_entity_1 = require("./entities/photo.entity");
var PhotosService = /** @class */ (function () {
    function PhotosService(photosRepository, usersService, categoriesService) {
        this.photosRepository = photosRepository;
        this.usersService = usersService;
        this.categoriesService = categoriesService;
    }
    PhotosService.prototype.insertPhoto = function (createPhotoDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, categories, i, catName, category, photo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.usersService.findUserByUsername(createPhotoDto.user_email)];
                    case 1:
                        user = _a.sent();
                        categories = [];
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < createPhotoDto.categories.length)) return [3 /*break*/, 5];
                        catName = createPhotoDto.categories[i];
                        return [4 /*yield*/, this.categoriesService.findCategoryByName(catName)];
                    case 3:
                        category = _a.sent();
                        if (category) {
                            categories.push(category);
                        }
                        else {
                            console.log("Category " + catName + " not found!");
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        photo = new photo_entity_1.Photo();
                        photo.name = createPhotoDto.name;
                        photo.description = createPhotoDto.description;
                        photo.url = createPhotoDto.url;
                        photo.user = user;
                        photo.categories = categories;
                        return [4 /*yield*/, this.photosRepository.save(photo)];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PhotosService.prototype.getPhotos = function () {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.photosRepository.find({ relations: ["user", "categories"] })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PhotosService.prototype.deletePhoto = function (id) {
        return __awaiter(this, void 0, Promise, function () {
            var photos;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.photosRepository.findOneOrFail(id)];
                    case 1:
                        photos = _a.sent();
                        return [4 /*yield*/, this.photosRepository.remove(photos)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, photos];
                }
            });
        });
    };
    PhotosService.prototype.updatePhoto = function (id, createPhotoDto) {
        return __awaiter(this, void 0, Promise, function () {
            var patch;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.photosRepository.findOneOrFail(id, { relations: ['categories'] })];
                    case 1:
                        patch = _a.sent();
                        if (!createPhotoDto.name) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.photosRepository.update(id, { name: createPhotoDto.name })];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!createPhotoDto.description) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.photosRepository.update(id, { description: createPhotoDto.description })];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5:
                        if (!createPhotoDto.url) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.photosRepository.update(id, { url: createPhotoDto.url })];
                    case 6:
                        _a.sent();
                        _a.label = 7;
                    case 7: return [4 /*yield*/, this.photosRepository.findOneOrFail(id, { relations: ['categories'] })];
                    case 8: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PhotosService = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(photo_entity_1.Photo))
    ], PhotosService);
    return PhotosService;
}());
exports.PhotosService = PhotosService;
