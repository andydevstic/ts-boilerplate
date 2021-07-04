import { spy, stub } from 'sinon';

import { UserRemoteFacade } from '@src/presentation/facades/user';
import { appContainer } from '@src/presentation/core/ioc/app-container';
import { expect } from 'chai';
import { LruCache } from '@src/datasource';

const lruCache = new LruCache({
  debug: () => {},
  error: () => {},
  info: () => {},
  warn: () => {},
});

const spiedLruCache = spy(lruCache);

const fakeLruCacheRegistry = {
  getInstance: () => spiedLruCache,
};

const stubbedContainer = stub(appContainer, 'getNamed').returns(fakeLruCacheRegistry);

const mockPostgresAdapter = {
  getConnection: () => {},
  getRepository: () => ({
    findOne: () => ({
      id: '1',
    }),
  }),
}

const userRemoteFacade = new UserRemoteFacade(mockPostgresAdapter);

describe('User remote facade', () => {
  it('Calls to lru cache when findById is called', async () => {
    await userRemoteFacade.findById('1');

    expect(spiedLruCache.get.callCount).to.be.equal(1, "Cache must be checked");
    expect(spiedLruCache.set.callCount).to.be.equal(1, "Lru cache must be set");

    const cachedUser = await userRemoteFacade.findById('1');

    expect(spiedLruCache.get.callCount).to.be.equal(2, "Cache must be checked");
    expect(spiedLruCache.set.callCount).to.be.equal(1, "Lru cache must be set only once");

    expect(cachedUser.id).to.be.equal('1', "Cached user must be returned correctly");
  });

  after(() => {
    stubbedContainer.restore();
  })
});