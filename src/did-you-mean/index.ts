import { tag, utils, Events, Store, Tag } from '@storefront/core';

@tag('gb-did-you-mean', require('./index.html'))
class DidYouMean {

  state: DidYouMean.State = {
    didYouMeans: []
  };

  init() {
    this.expose('didYouMean');
    this.flux.on(Events.DID_YOU_MEANS_UPDATED, this.updateDidYouMeans);
  }

  updateDidYouMeans = (didYouMeans: Store.Linkable[]) =>
    !(didYouMeans.length === 0 && this.state.didYouMeans.length === 0)
    && this.set({ didYouMeans: utils.mapToSearchActions(didYouMeans, this.flux) })
}

interface DidYouMean extends Tag<any, DidYouMean.State> { }
namespace DidYouMean {
  export interface State {
    didYouMeans: Store.Linkable[];
  }
}

export default DidYouMean;
