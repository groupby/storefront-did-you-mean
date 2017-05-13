import { utils, view, Component, Events, Store } from '@storefront/core';

@view('gb-did-you-mean', require('./index.html'))
class DidYouMean extends Component {

  state: DidYouMean.State = {
    didYouMeans: []
  };

  constructor() {
    super();
    this.expose('didYouMean');

    this.flux.on(Events.DID_YOU_MEANS_UPDATED, this.updateDidYouMeans);
  }

  updateDidYouMeans = (didYouMeans: Store.Linkable[]) =>
    !(didYouMeans.length === 0 && this.state.didYouMeans.length === 0)
    && this.set({ didYouMeans: utils.mapToSearchActions(didYouMeans, this.flux) })
}

namespace DidYouMean {
  export interface State {
    didYouMeans: Store.Linkable[];
  }
}

export default DidYouMean;
