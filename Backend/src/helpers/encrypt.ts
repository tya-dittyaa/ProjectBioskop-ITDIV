import { compareSync, hashSync } from "bcrypt";
import "dotenv/config";

export class encrypt {
  static async encryptpass(password: string) {
    return hashSync(password, 12);
  }

  static async comparepassword(hashPassword: string, password: string) {
    return compareSync(password, hashPassword);
  }
}
