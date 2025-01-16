import { SetMetadata } from '@nestjs/common';

export const JwtOption_KEY = 'jwtOption';
export const JwtOption = (option: string) => SetMetadata(JwtOption_KEY, option);
