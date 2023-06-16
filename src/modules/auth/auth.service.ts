import { Injectable } from '@nestjs/common';
import { AuthRegisterInputDto } from './dtos/auth-register-input.dto';
import { OptionAuthRegister } from 'src/shared/utils/types/options-auth-register.type';
import { AUTH_PROVIDER } from './constants/auth-provider.constants';
import { ROLE } from './constants/role.constant';
import { v4 as uuid } from 'uuid';
import { UsersService } from '../users/users.service';
import { plainToClass } from 'class-transformer';
import { AuthRegisterOutputDto } from './dtos/auth-register-output.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async register(
    data: AuthRegisterInputDto & OptionAuthRegister,
  ): Promise<AuthRegisterOutputDto> {
    data.isAccountDisabled = false;
    data.isVerified = false;
    data.provider = AUTH_PROVIDER.EMAIL;
    data.role = [ROLE.USER];
    data.token = uuid();
    data.expireIn = (new Date().getTime() + 7 * 86400 * 60).toString();

    const registerUser: User = await this.usersService.createUser(data);

    return plainToClass(AuthRegisterOutputDto, registerUser, {
      excludeExtraneousValues: true,
    });
  }
}
