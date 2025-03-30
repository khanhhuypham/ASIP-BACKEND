import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { BranchService } from './branch.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Controller('branch')
export class BranchController {
    constructor(private readonly branchService: BranchService) { }

    @Post()
    create(@Body() dto: CreateBranchDto) {
        return this.branchService.create(dto);
    }

    @Get()
    findAll(@Query() query?:{
        hotel_id:number
    }) {
        return this.branchService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.branchService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateBranchDto) {
        return this.branchService.update(+id, dto);
    }

    @Get('/:id/change-status')
    changeStatus(@Param('id') id: string) {
        return this.branchService.changeStatus(+id);
    }

  
}
