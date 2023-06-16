import { Exclude, Expose, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsEmail, IsEnum, IsString } from 'class-validator';
import { ROLE } from '../constants/role.constant';

export class AuthRegisterOutputDto {
  @Expose()
  id: number;

  @Expose()
  @IsString()
  @IsEmail()
  email: string;

  @Exclude()
  @IsString()
  password: string;

  @Expose()
  @IsBoolean()
  isVerified: boolean;

  @Expose()
  @IsArray()
  @IsEnum(ROLE)
  role: ROLE[];

  @Expose()
  @IsBoolean()
  provider: string;

  @Expose()
  @IsBoolean()
  isAccountDisabled: boolean;

  @Expose()
  @IsString()
  token: string;

  @Expose()
  @IsString()
  expireIn: string;

  @Expose()
  @Type(() => Date)
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  updatedAt: Date;
}
