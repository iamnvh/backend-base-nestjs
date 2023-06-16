import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './repositories/users.repository';
import { LoggerService } from '../../shared/logger/logger.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { BcryptService } from 'src/shared/bcrypt/bcrypt.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly logger: LoggerService,
    private readonly bcrypt: BcryptService,
  ) {
    this.logger.setContext(UsersService.name);
  }

  async createUser(data: CreateUserDto): Promise<User> {
    const { email, password } = data;

    const [user, hashPassword] = await Promise.all([
      this.userRepository.findOneUser({ email }),
      this.bcrypt.hash(password),
    ]);

    if (user) {
      this.logger.error('User already exist');
      throw new HttpException('User already exist', HttpStatus.FOUND);
    }

    const newData = {
      ...data,
      email: email,
      password: hashPassword,
    };

    return this.userRepository.createUser(newData);
  }
}
