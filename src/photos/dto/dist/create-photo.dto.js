"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreatePhotoDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var CreatePhotoDto = /** @class */ (function () {
    function CreatePhotoDto() {
    }
    __decorate([
        swagger_1.ApiProperty({ example: 'Friendly frog', description: 'Name of the photo' })
    ], CreatePhotoDto.prototype, "name");
    __decorate([
        swagger_1.ApiProperty({ example: 'Picture of a frog in a pond', description: 'Description of the photo' })
    ], CreatePhotoDto.prototype, "description");
    __decorate([
        swagger_1.ApiProperty({ example: 'http://picturebank.com/frog.jpg', description: 'URL to picture' })
    ], CreatePhotoDto.prototype, "url");
    __decorate([
        swagger_1.ApiProperty({ example: 'user@gmail.com', description: 'Users email' })
    ], CreatePhotoDto.prototype, "user_email");
    __decorate([
        swagger_1.ApiProperty({ example: ['Turtle', 'Animal'], description: 'Categories where animal belongs' })
    ], CreatePhotoDto.prototype, "categories");
    return CreatePhotoDto;
}());
exports.CreatePhotoDto = CreatePhotoDto;
