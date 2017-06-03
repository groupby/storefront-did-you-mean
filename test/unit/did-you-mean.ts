import { utils, Events } from '@storefront/core';
import DidYouMean from '../../src/did-you-mean';
import suite from './_suite';

suite('DidYouMean', ({ expect, spy, stub }) => {
  let didYouMean: DidYouMean;

  beforeEach(() => didYouMean = new DidYouMean());

  describe('constructor()', () => {
    it('should have initial state', () => {
      expect(didYouMean.state).to.eql({ didYouMeans: [] });
    });
  });

  describe('init()', () => {
    it('should listen for DID_YOU_MEANS_UPDATED', () => {
      const on = spy();
      didYouMean.flux = <any>{ on };
      didYouMean.expose = () => null;

      didYouMean.init();

      expect(on.calledWith(Events.DID_YOU_MEANS_UPDATED, didYouMean.updateDidYouMeans)).to.be.true;
    });
  });

  describe('updateDidYouMeans()', () => {
    it('should set didYouMeans', () => {
      const didYouMeans: any[] = ['a', 'b'];
      const flux = didYouMean.flux = <any>{ c: 'd' };
      const processed = ['e', 'f'];
      const set = didYouMean.set = spy();
      const mapToSearchActions = stub(utils, 'mapToSearchActions').returns(processed);

      didYouMean.updateDidYouMeans(didYouMeans);

      expect(mapToSearchActions.calledWith(didYouMeans, flux)).to.be.true;
      expect(set.calledWith({ didYouMeans: processed })).to.be.true;
    });

    it('should not set didYouMeans if both empty', () => {
      didYouMean.set = () => expect.fail();
      didYouMean.state = { didYouMeans: [] };

      didYouMean.updateDidYouMeans([]);
    });
  });
});
