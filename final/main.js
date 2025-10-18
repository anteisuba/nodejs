// abc
// 1->
// bcd
import { readFile, writeFile } from "node:fs/promises";

//1.Readfile
const data = await readFile("./data.txt", "utf8");

console.log(data);

const keychain = await readFile("./keychain.txt", "utf8");

//2.Decrypt data
//Move right side
// const rightMoveDecrypted = data
//   .split("")
//   .map((currentChar) => {
//     const decryptedCharCode = currentChar.charCodeAt(0) + keychain;
//     return String.fromCharCode(decryptedCharCode);
//   })
//   .join("");

// console.log(rightMoveDecrypted);

//Move left side
const leftMoveDecrypted = data
  .split("")
  .map((currentChar) => {
    const decryptedCharCode = currentChar.charCodeAt(0) - keychain;
    return String.fromCharCode(decryptedCharCode);
  })
  .join("");

console.log(leftMoveDecrypted);

//3.Write decrypted data
await writeFile("./decrypted-data.txt", leftMoveDecrypted, "utf8");
