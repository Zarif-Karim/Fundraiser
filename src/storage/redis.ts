import { IStorage } from "./types";
import { createClient } from "redis";

export class RedisStorage implements IStorage {
  constructor(
    private client: ReturnType<typeof createClient>,
    private logger: Console = console
  ) {}

  async get(key: string): Promise<string[]> {
    try {
      const values = await this.client.lRange(key, 0, -1);
      return values;
    } catch (error) {
      this.logger.error({
        error,
        operation: "RedisStorage.get",
      });
      return [];
    }
  }

  async add(key: string, value: string): Promise<boolean> {
    try {
      const successCount = await this.client.rPush(key, value);
      return successCount > 0;
    } catch (error) {
      this.logger.error({
        error,
        operation: "RedisStorage.add",
      });
      return false;
    }
  }

  async remove(key: string, value: string): Promise<boolean> {
    try {
      const successCount = await this.client.lRem(key, 0, value);
      return successCount > 0;
    } catch (error) {
      this.logger.error({
        error,
        operation: "RedisStorage.remove",
      });
      return false;
    }
  }
}
