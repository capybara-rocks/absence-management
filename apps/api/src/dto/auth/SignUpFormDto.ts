import { Expose } from 'class-transformer';
import { IsEmail, Length } from 'class-validator';

export class SignUpFormDto {
  @Expose()
  @IsEmail()
  email: string;

  @Expose()
  @Length(8)
  password: string;

  @Expose()
  name: string;
}
