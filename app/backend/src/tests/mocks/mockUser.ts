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

const userRegistered = { ...user, password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW' };

export {
    validLoginBody,
    userRegistered
}