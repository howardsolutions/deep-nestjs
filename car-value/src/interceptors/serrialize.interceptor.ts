import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable } from "rxjs";


export class SerializeInterceptor implements NestInterceptor {

    intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
        // Run something before a reequest is handled by request handler 
        console.log("Running BEFORE the handler", context)

        return handler.handle().pipe(
            map((data: any) => {
                console.log("Running BEFORE the RESPONSE IS SENT OUTS", data)
            })
        )
    }
}