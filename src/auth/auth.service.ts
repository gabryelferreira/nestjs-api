import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { IPayload } from 'src/models/payload.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  getAccessToken(user: User): string {
    const payload: IPayload = { username: user.username, id: user.id };
    return this.jwtService.sign(payload);
  }

  async hashPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err: Error, hash: string) => {
        if (err) reject(err);
        else resolve(hash);
      })
    })
  }

  async comparePasswords(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }

}