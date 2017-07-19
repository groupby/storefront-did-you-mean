import { utils, Events } from '@storefront/core';
import DidYouMean from '../../src/did-you-mean';
import suite from './_suite';

suite('DidYouMean', ({ expect, spy, stub, itShouldBeConfigurable, itShouldHaveAlias }) => {
  let didYouMean: DidYouMean;

  beforeEach(() => didYouMean = new DidYouMean());

  itShouldBeConfigurable(DidYouMean);
  itShouldHaveAlias(DidYouMean, 'didYouMean');

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

      expect(on).to.be.calledWith(Events.DID_YOU_MEANS_UPDATED, didYouMean.updateDidYouMeans);
    });
  });

  describe('updateDidYouMeans()', () => {
    it('should set didYouMeans', () => {
      const didYouMeans: any[] = ['a', 'b'];
      const actions = didYouMean.actions = <any>{ c: 'd' };
      const processed = ['e', 'f'];
      const set = didYouMean.set = spy();
      const mapToSearchActions = stub(utils, 'mapToSearchActions').returns(processed);

      didYouMean.updateDidYouMeans(didYouMeans);

      expect(mapToSearchActions).to.be.calledWith(didYouMeans, actions);
      expect(set).to.be.calledWith({ didYouMeans: processed });
    });

    it('should not set didYouMeans if both empty', () => {
      didYouMean.set = () => expect.fail();
      didYouMean.state = { didYouMeans: [] };

      didYouMean.updateDidYouMeans([]);
    });
  });
});
