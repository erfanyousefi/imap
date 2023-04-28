import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserEntity } from "../user/entity/user.entity";
import { AuthService } from "./auth.service";

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [AuthService],
    controllers: [],
    exports: []
})
export class AuthModule {}