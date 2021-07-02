import { ILogger, ILruCache } from '@src/shared/interfaces';
import * as LruCacheLib from 'lru-cache';

export class LruCache implements ILruCache {
  protected cacheInstance: any;

  constructor(
    protected logger: ILogger,
    config?: any,
  ) {
    this.cacheInstance = new LruCacheLib(config);
  }

  public set(key: string, value: string, maxAgeInMilliSecs?: number): void {
    this.logger.debug(`Cached data using LRU cache for key:`, key);
    this.cacheInstance.set(key, value, maxAgeInMilliSecs);
  }

  public get(key: string): string {
    this.logger.debug(`Served data using LRU cache for key:`, key);
    return this.cacheInstance.get(key);
  }

  public reset(): void {
    this.cacheInstance.reset();
  }

  public has(key: string): boolean {
    return this.cacheInstance.has(key);
  }
}