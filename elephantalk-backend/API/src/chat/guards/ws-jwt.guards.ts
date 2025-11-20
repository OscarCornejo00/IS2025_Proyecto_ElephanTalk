import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

@Injectable()
export class WsJwtGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client: Socket = context.switchToWs().getClient<Socket>();
      const token = this.extractTokenFromHandshake(client);

      if (!token) {
        return false;
      }

      // Verificar el token (esto puede fallar si no tienes JWT_SECRET configurado)
      console.log('Verificando token:', token);
      console.log(process.env.JWT_SECRET);
      const payload = this.jwtService.verify(token);
      console.log('Payload del token:', payload);
      // Por ahora, solo verificamos que el token sea válido
      // Guardamos la info básica del payload
      client.data.user = {
        id: payload.sub,
        username: payload.username || 'Usuario',
        name: payload.name || 'Usuario',
      };
      //TODO: El payload no tiene el username ni el name, debes asegurarte de que el JWT lo incluya o investigar cómo hacerlo.
      return true;
    } catch (error) {
      console.log('Error en WsJwtGuard:', error.message);
      return false;
    }
  }

  private extractTokenFromHandshake(client: Socket): string | null {
    const tokenFromQuery = client.handshake.query.token as string;
    if (tokenFromQuery) return tokenFromQuery;

    const authHeader = client.handshake.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    const tokenFromAuth = client.handshake.auth?.token;
    if (tokenFromAuth) return tokenFromAuth;

    return null;
  }
}