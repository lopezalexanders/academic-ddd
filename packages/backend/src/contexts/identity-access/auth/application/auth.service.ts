import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../users/domain/user.entity';
import { UserService } from '../../users/application/user.service';
import { RoleService } from '../../roles/application/role.service';

export type LoginResult = {
  id: string;
  username: string;
  email: string;
  role: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly roleService: RoleService,
  ) {}

  async login(username: string, password: string): Promise<LoginResult> {
    const user = await this.userService.findByUsername(username);
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    const valid = await this.userService.verifyPassword(password, user.password);
    if (!valid) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return await this.toLoginResult(user);
  }

  private async toLoginResult(user: User): Promise<LoginResult> {
    const role = await this.roleService.findById(user.roleId);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: role?.name ?? 'STUDENT',
    };
  }
}
