export function createCode(): string {
  let code = '';
  for (let i = 0; i < 4; i++) {
    const randomNumber = Math.floor(Math.random() * 10);
    code += randomNumber.toString();
  }
  return code;
}
