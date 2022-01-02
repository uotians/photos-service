"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var photo_entity_1 = require("src/photos/entities/photo.entity");
var profile_entity_1 = require("src/profiles/entities/profile.entity");
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn(),
        swagger_1.ApiProperty()
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({ unique: true }),
        class_validator_1.IsEmail(),
        swagger_1.ApiProperty()
    ], User.prototype, "username");
    __decorate([
        typeorm_1.Column(),
        swagger_1.ApiProperty()
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column(),
        swagger_1.ApiProperty()
    ], User.prototype, "name");
    __decorate([
        typeorm_1.OneToOne(function () { return profile_entity_1.Profile; }, function (profile) { return profile.user; }),
        typeorm_1.JoinColumn()
    ], User.prototype, "profile");
    __decorate([
        typeorm_1.OneToMany(function () { return photo_entity_1.Photo; }, function (photo) { return photo.user; })
    ], User.prototype, "photos");
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
