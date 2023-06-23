export function verifyEmail(email: string): boolean {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regex.test(email);
}

export function verifyPassword(password: string): boolean {
  const maxLength = 6;
  return password.length >= maxLength;
}
