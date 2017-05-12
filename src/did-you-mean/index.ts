import { view, Events, Store, Tag } from '@storefront/core';

interface Opts {
  didYouMeans: Store.Linkable[];
}

interface DidYouMean extends Tag.Instance { }

@view('gb-did-you-mean', require('./index.html'), {
  didYouMeans: []
})
class DidYouMean {
  state: Opts;

  // constructor() {
  //   this.flux.on(Events.DID_YOU_MEANS_UPDATED, this.updateDidYouMeans);
  // }

  // onUpdate({ ui }: { ui: Opts }) { return ui; }
  //
  // updateDidYouMeans(didYouMeans: Store.Linkable[]) {
  //   this.update({ state: { ...this.state, didYouMeans } });
  // }
}

export default DidYouMean;
