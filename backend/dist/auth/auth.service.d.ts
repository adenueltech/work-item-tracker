import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService);
    register(email: string, password: string, name?: string): Promise<{
        createdAt: Date;
        updatedAt: Date;
        id: number;
        name: string | null;
        email: string;
    }>;
    login(email: string, password: string): Promise<{
        access_token: string;
        user: {
            id: number;
            email: string;
            name: string | null;
        };
    }>;
}
