import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtConfig } from 'src/config/jwt.config';
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class JwtService {
    constructor() { }

    generateJWT_OneSecretKey(payload: object, expiresIn: string | number): string {
        try {
            const token = jwt.sign(payload, JwtConfig.SECRET, { expiresIn });
            return token;
        } catch (error) {
            console.error('Error generating JWT:', error);
            throw new Error('Could not generate JWT');
        }
    };

    generateJWT_TwoPublicPrivateKey(payload: object, expiresIn: string | number): string {
        try {
            const privateKey = fs.readFileSync(join(process.cwd(), JwtConfig.PRIVATE_KEY_PATH)).toString();

            const token = jwt.sign(payload, privateKey, {
                algorithm: 'RS256',
                expiresIn,
            });
            return token;
        } catch (error) {
            console.error('Error generating JWT:', error);
            throw new Error('Could not generate JWT');
        }
    }

}
