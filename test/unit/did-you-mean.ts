import { utils, Events, Selectors } from '@storefront/core';
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
      didYouMean.select = spy();
      didYouMean.updateDidYouMeans = spy();

      didYouMean.init();

      expect(on).to.be.calledWith(Events.DID_YOU_MEANS_UPDATED, didYouMean.updateDidYouMeans);
    });

    it('should call updateDidYouMeans', () => {
      const didYouMeans = [1, 2, 3];
      const select = didYouMean.select = stub();
      const updateDidYouMeans = didYouMean.updateDidYouMeans = spy();
      const on = spy();
      didYouMean.flux = <any>{ on };
      didYouMean.expose = () => null;
      select.withArgs(Selectors.didYouMean).returns(didYouMeans);

      didYouMean.init();

      expect(select).to.be.calledWithExactly(Selectors.didYouMean);
      expect(updateDidYouMeans).to.be.calledWithExactly(didYouMeans);
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
