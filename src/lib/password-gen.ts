export function generatePassword(length = 12) {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  const allCharacters = lowercase + uppercase + numbers + symbols;

  let password = '';

  // Ensure password contains at least one character from each group
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  password += symbols[Math.floor(Math.random() * symbols.length)];

  // Fill the rest of the password length with random characters from all groups
  for (let i = 4; i < length; i++) {
    password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  // Shuffle the characters to avoid predictable patterns
  password = password
    .split('')
    .sort(() => 0.5 - Math.random())
    .join('');

  return password;
}

const randomPassword = generatePassword(16); // Generates a 16-character password
console.log(randomPassword);
