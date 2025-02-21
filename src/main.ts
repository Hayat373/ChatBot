import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './users/users.service';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    const allowedOrigins = [
        'http://localhost:3000', // Local development
        'http://127.0.0.1:5501'
    ];
    app.enableCors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            if (allowedOrigins.includes(origin)) {
                return callback(null, true);
            } else {
                const msg = "The CORS policy for this site does not allow access from the specified Origin: ${origin};"
                return callback(new Error(msg), false);
            }
        },
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });

    
    // Get an instance of UserService
    const userService = app.get(UserService);
    
   

   

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();