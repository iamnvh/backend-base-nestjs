import {
  ArrayNotEmpty,
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Length,
} from 'class-validator';
import { AUTH_PROVIDER } from 'src/modules/auth/constants/auth-provider.constants';
import { ROLE } from 'src/modules/auth/constants/role.constant';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string | null;

  @IsNotEmpty()
  @IsString()
  @Length(8, 255)
  password?: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsEnum(ROLE, { each: true })
  role: ROLE[];

  @IsBoolean()
  isVerified?: boolean;

  @IsBoolean()
  isAccountDisabled: boolean;

  @IsEnum(AUTH_PROVIDER)
  @IsString()
  provider: string;

  @IsString()
  socialId?: string;

  @IsString()
  firstName?: string;

  @IsString()
  lastName?: string;
}
