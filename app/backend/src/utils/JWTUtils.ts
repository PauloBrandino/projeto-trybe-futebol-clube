export const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
};

export const secret = process.env.JWT_SECRET || '123asd456qwe789zxc';