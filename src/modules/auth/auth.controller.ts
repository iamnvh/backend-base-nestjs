import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthRegisterInputDto } from './dtos/auth-register-input.dto';
import { MailService } from 'src/shared/mail/services/mail.service';
import { OptionAuthRegister } from 'src/shared/utils/types/options-auth-register.type';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailService: MailService,
  ) {}

  @Post('register')
  async register(
    @Body() data: AuthRegisterInputDto & OptionAuthRegister,
  ): Promise<{ stausCode: HttpStatus; message: string }> {
    const user = await this.authService.register(data);

    this.mailService.sendMailQueue(user.email, user.id, user.token);

    return {
      stausCode: HttpStatus.CREATED,
      message: 'Please verify mail',
    };
  }
}
