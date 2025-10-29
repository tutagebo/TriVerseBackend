import { RowDataPacket } from "mysql2/promise";

export interface PlayerReturn extends RowDataPacket {
  id: Buffer; // BINARY(16)
  name: string; // VARCHAR(32)
  login_id: string; // VARCHAR(64)
  password_hash: Buffer; // VARBINARY(255)
  created_at: Date; // TIMESTAMP（dateStrings:trueなら string）
}

export interface PlayerRegister {
  id: Buffer; // BINARY(16)
  name: string; // VARCHAR(32)
  login_id: string; // VARCHAR(64)
  password_hash: Buffer; // VARBINARY(255)
}
