import { AuthGuard } from '@nestjs/passport'

//это все пишется для того что бы удобнее писать после
//@JwtAuthGuard() - и все роут защищенный - только для авторизированных
export class JwtAuthGuard extends AuthGuard('jwt') {}
