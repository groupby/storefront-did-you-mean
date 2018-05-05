import { alias, configurable, origin, tag, utils, Events, Selectors, Store, Tag } from '@storefront/core';

@configurable
@alias('didYouMean')
@origin('dym')
@tag('gb-did-you-mean', require('./index.html'))
class DidYouMean {

  state: DidYouMean.State = {
    didYouMeans: []
  };

  init() {
    this.updateDidYouMeans(this.select(Selectors.didYouMean));
    this.subscribe(Events.DID_YOU_MEANS_UPDATED, this.updateDidYouMeans);
  }

  updateDidYouMeans = (didYouMeans: string[]) =>
    !(didYouMeans.length === 0 && this.state.didYouMeans.length === 0)
    && this.set({ didYouMeans: utils.mapToSearchActions(didYouMeans, <any>this.actions) })
}

interface DidYouMean extends Tag<any, DidYouMean.State> { }
namespace DidYouMean {
  export interface State {
    didYouMeans: Array<{ value: string, onClick: () => void }>;
  }
}

export default DidYouMean;
