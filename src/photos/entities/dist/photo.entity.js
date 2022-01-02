"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Photo = void 0;
var swagger_1 = require("@nestjs/swagger");
var category_entity_1 = require("src/categories/entities/category.entity");
var user_entity_1 = require("src/users/entities/user.entity");
var typeorm_1 = require("typeorm");
var Photo = /** @class */ (function () {
    function Photo() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        swagger_1.ApiProperty()
    ], Photo.prototype, "id");
    __decorate([
        typeorm_1.Column(),
        swagger_1.ApiProperty()
    ], Photo.prototype, "name");
    __decorate([
        typeorm_1.Column(),
        swagger_1.ApiProperty()
    ], Photo.prototype, "description");
    __decorate([
        typeorm_1.Column(),
        swagger_1.ApiProperty()
    ], Photo.prototype, "url");
    __decorate([
        typeorm_1.ManyToOne(function () { return user_entity_1.User; }, function (user) { return user.photos; })
    ], Photo.prototype, "user");
    __decorate([
        typeorm_1.ManyToMany(function () { return category_entity_1.Category; }, function (category) { return category.photos; }, { cascade: true }),
        typeorm_1.JoinTable()
    ], Photo.prototype, "categories");
    Photo = __decorate([
        typeorm_1.Entity()
    ], Photo);
    return Photo;
}());
exports.Photo = Photo;
