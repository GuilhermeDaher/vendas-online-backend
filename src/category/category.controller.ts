import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { returnCategory } from './dtos/returnCategory.dto';
import { CategoryService } from './category.service';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/userType.enum';
import { CategoryEntity } from './entities/category.entity';
import { CreateCategory } from './dtos/createCategory.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) { }

    @Roles(UserType.Admin, UserType.User)
    @Get()
    async findAllCategories(): Promise<returnCategory[]> {
        return (await this.categoryService.findAllCategories()).map(
            (category) => new returnCategory(category));
    }

    @UsePipes(ValidationPipe)
    @Post()
    async createCategory(
        @Body() createCategory: CreateCategory,
    ): Promise<CategoryEntity> {
        return this.categoryService.createCategory(createCategory)
    }

}
