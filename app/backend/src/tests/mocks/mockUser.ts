const user = {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: 'secret_admin'
      // senha: secret_admin
  }

const validLoginBody = {
    email: 'admin@admin.com',
    password: 'secret_admin'
};

const invalidEmailLogin = {
    email: 'admin@.com',
    password: 'min'
};

const loginUserNotRegistered = {
    email: 'testeteste@teste.com',
    password: 'testedoteste'
}

const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjg3NTMzMTY2fQ.YCc3Bvo3C_PrNzOt5WoaJXCAmeKK4HuPzXGgEOOyIHA'

const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

export {
    validLoginBody,
    userRegistered,
    invalidEmailLogin,
    loginUserNotRegistered,
    validToken
}