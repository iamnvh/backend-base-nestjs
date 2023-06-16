import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  constructor(private readonly configService: ConfigService) {}

  async hash(data: string): Promise<string> {
    const salt = await bcrypt.genSalt(
      Number.parseInt(this.configService.get('SALT_ROUNDS')),
    );
    return bcrypt.hash(data, salt);
  }

  async compare(plaintextData: string, hashData: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plaintextData, hashData);
    return isMatch;
  }
}
