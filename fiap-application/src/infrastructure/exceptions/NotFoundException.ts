import { HttpException, HttpStatus } from "@nestjs/common";

export class NotFoundException extends HttpException {
    constructor(message) {
        super(message, HttpStatus.NOT_FOUND);
    }
}