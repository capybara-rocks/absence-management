import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaveFormDto } from './CreateLeaveFormDto';

export class EditLeaveFormDto extends PartialType(CreateLeaveFormDto) {}
