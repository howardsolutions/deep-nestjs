import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { map, Observable } from "rxjs";

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) { }

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run something before a reequest is handled by request handler 
        // console.log("Running BEFORE the handler", context)

        return handler.handle().pipe(
            map((data: any) => {
                // console.log("Running BEFORE the RESPONSE IS SENT OUTS", data)
                return plainToInstance(this.dto, data, {
                    excludeExtraneousValues: true
                })
            })
        )
    }
}

export function Serialize(dto: any) {
    return UseInterceptors(new SerializeInterceptor(dto));
}