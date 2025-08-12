import { v4 as uuid } from "uuid";

export function generateSessionToken(): string {
  return uuid();
}
