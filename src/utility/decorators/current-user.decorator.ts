import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { create } from "domain";

export const CurrentUser = createParamDecorator(
    (data: never, ctx: ExecutionContext)=>{
        const request = ctx.switchToHttp().getRequest();
        console.log(request.currentUser)
        return request.currentUser
    },
);