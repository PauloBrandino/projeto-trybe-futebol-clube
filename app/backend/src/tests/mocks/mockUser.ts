const user = {
    id: 1,
    role: 'teste',
    email: 'test@test.com',
    password: 'password',
    username: 'fulano'
}

const validLoginBody = {
    email: 'test@test.com',
    password: 'password'
};

const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

export {
    validLoginBody,
    userRegistered
}