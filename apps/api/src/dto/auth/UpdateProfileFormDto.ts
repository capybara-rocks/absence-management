import { PartialType } from '@nestjs/mapped-types';
import { SignUpFormDto } from './SignUpFormDto';

export class UpdateProfileFormDto extends PartialType(SignUpFormDto) {}
