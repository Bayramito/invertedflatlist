function caesarCipherDecrypt(ciphertext, shift) {
  return ciphertext
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const charCode = char.charCodeAt(0);
        const isUpperCase = char === char.toUpperCase();
        const shiftedCode =
          ((((charCode - (isUpperCase ? 65 : 97) - shift) % 26) + 26) % 26) +
          (isUpperCase ? 65 : 97);
        return String.fromCharCode(shiftedCode);
      } else {
        return char;
      }
    })
    .join('');
}

// Given input
const ciphertext = 'Uifsf jt b tdifsu';
const shift = 1;

// Decrypting the ciphertext
const decryptedText = caesarCipherDecrypt(ciphertext, shift);
console.log('Decrypted message:', decryptedText);
