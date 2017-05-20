import { utils, Component, Events } from '@storefront/core';
import DidYouMean from '../../src/did-you-mean';
import suite from './_suite';

suite('DidYouMean', ({ expect, spy, stub }) => {

  describe('constructor()', () => {
    afterEach(() => {
      delete Component.prototype.expose;
      delete Component.prototype.flux;
    });

    it('should have initial state', () => {
      Component.prototype.expose = () => null;
      Component.prototype.flux = <any>{ on: () => null };

      const didYouMean = new DidYouMean();

      expect(didYouMean.state).to.eql({ didYouMeans: [] });
    });

    it('should call expose()', () => {
      const expose = Component.prototype.expose = spy();
      Component.prototype.flux = <any>{ on: () => null };

      new DidYouMean();

      expect(expose.calledWith('didYouMean')).to.be.true;
    });

    it('should listen for DID_YOU_MEANS_UPDATED', () => {
      const on = spy();
      Component.prototype.flux = <any>{ on };
      Component.prototype.expose = () => null;

      const didYouMean = new DidYouMean();

      expect(on.calledWith(Events.DID_YOU_MEANS_UPDATED, didYouMean.updateDidYouMeans)).to.be.true;
    });
  });

  describe('actions', () => {
    let didYouMean: DidYouMean;

    beforeEach(() => {
      Component.prototype.expose = () => null;
      Component.prototype.flux = <any>{ on: () => null };
      didYouMean = new DidYouMean();
    });
    afterEach(() => {
      delete Component.prototype.expose;
      delete Component.prototype.flux;
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
});
