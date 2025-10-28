import { RowDataPacket } from "mysql2/promise";

export interface Player extends RowDataPacket {
  id: Buffer;          // BINARY(16)
  name: string;        // VARCHAR(32)
  password_hash: Buffer; // VARBINARY(255)
  created_at: Date;    // TIMESTAMP（dateStrings:trueなら string）
}
