import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: '696772ce8e210d96fcbbc7395c487649', // Use a mesma variável de ambiente!
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}