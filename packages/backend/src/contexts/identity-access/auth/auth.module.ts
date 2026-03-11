import { Module } from '@nestjs/common';
import { AuthService } from './application/auth.service';
import { UsersModule } from '../users/users.module';
import { RolesModule } from '../roles/roles.module';

@Module({
  imports: [UsersModule, RolesModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
