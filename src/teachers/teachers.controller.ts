import { Body, Controller, Inject, Put } from "@nestjs/common";
import { TeachersService } from "./teachers.service";

@Controller('teacher')
export class TeachersController {
    constructor(private teacherService: TeachersService){}

    @Put('')
    async signPlan(@Body() dto) {
        const newSignature = await this.teacherService.signPlan(dto)
        return newSignature
    }
}