import { RowDataPacket } from "mysql2/promise";

export interface PlayerReturn extends RowDataPacket {
  id: Buffer; // BINARY(16)
  name: string; // VARCHAR(32)
  loginId: string; // VARCHAR(64)
  passwordHash: Buffer; // VARBINARY(255)
  createdAt: Date; // TIMESTAMP（dateStrings:trueなら string）
}

export interface PlayerRegister {
  id: Buffer; // BINARY(16)
  name: string; // VARCHAR(32)
  loginId: string; // VARCHAR(64)
  passwordHash: Buffer; // VARBINARY(255)
}
