import { sql } from "../../db";
import type { RUser } from "../../types";
import bcrypt from "bcrypt";

class AtuhService {
  async createUser(user: RUser & { password: string }) {
    const { name, email, age, role, password } = user;

    const hash = await bcrypt.hash(password, 10);
    const res = await sql`
        INSERT INTO users(name,email,password_hash,age,role)
        VALUES (${name},${email},${hash},${age},COALESCE(${role},'user'))
        RETURNING id,name,age,role
        `;
    return res[0];
  }
}

export default new AtuhService