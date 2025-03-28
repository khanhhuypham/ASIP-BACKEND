import { PartialType } from '@nestjs/mapped-types';
import { CreateGuestGroupDto } from './create-guest-group.dto';

export class UpdateGuestGroupDto extends PartialType(CreateGuestGroupDto) {}
