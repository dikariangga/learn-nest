import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    if (!request.headers.authorization){
        return false;
    }

    request.user = await this.validateToken(request.headers.authorization)

    return true;
  }

  async validateToken(token: string){
    try{
        const decoded = await jwt.verify(token, process.env.SECRET);
        return decoded;
    }catch(e){
        const message = 'Token error: ' + (e.message || e.name);
        throw new HttpException(message, HttpStatus.FORBIDDEN);
    }
  }
}