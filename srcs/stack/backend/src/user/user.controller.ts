import {
  Controller,
  Get,
  Param,
  UseGuards,
  Patch,
  Body,
  Query,
  Delete,
  HttpCode,
  HttpStatus,
  Req,
  Res,
  Post,
  UploadedFile,
  UseInterceptors,
  UseFilters,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { SessionGuard } from '../auth/guards/session.guard';
import { CurrentUserId } from '../auth/decorators/current-user-id.decorator';
import { UpdateProfilDto } from './dto/update-profile.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { parseId } from '../common/pipes/parse-id.pipe';
import type { Request, Response } from 'express';
import { endSession } from '../auth/session.utils';
import { HttpAdapterHost } from '@nestjs/core';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageUploadOptions } from '../upload/upload.options';
import { UploadExceptionFilter } from '../upload/upload-exception.filter';

@UseGuards(SessionGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  search(@CurrentUserId() userId: string, @Query() query: SearchUserDto) {
    return this.userService.searchUsers(userId, query);
  }

  @Get('me')
  findMe(@CurrentUserId() userId: string) {
    return this.userService.findMyself(userId);
  }

  @Get(':id')
  findOne(@Param('id', parseId) id: string) {
    return this.userService.findOne(id);
  }

  @Patch('me')
  updateMe(@CurrentUserId() userId: string, @Body() dto: UpdateProfilDto) {
    return this.userService.updateProfile(userId, dto);
  }

  @Post('me/avatar')
  @HttpCode(HttpStatus.OK)
  @UseFilters(new UploadExceptionFilter('avatar'))
  @UseInterceptors(FileInterceptor('avatar', imageUploadOptions('avatar')))
  uploadAvatar(
    @CurrentUserId() userId: string,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    if (!file) {
      throw new BadRequestException({
        statusCode: 400,
        errors: [{ field: 'avatar', code: 'FILE_REQUIRED' }],
      });
    }
    return this.userService.updateAvatar(userId, file.buffer);
  }

  @Delete('me')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteMe(
    @CurrentUserId() userId: string,
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.userService.deleteAccount(userId);
    await endSession(req, res);
  }
}
