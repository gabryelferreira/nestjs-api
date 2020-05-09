import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { IPayload } from 'src/models/payload.model';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService
  ) {}

  getAccessToken(user: User): string {
    const payload: IPayload = { username: user.username, id: user.id };
    return this.jwtService.sign(payload);
  }

}