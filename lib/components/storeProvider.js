import React from 'react';
import PropTypes from 'prop-types';

const storeProvider = (extraProps = () => ({})) => (Component) => {
  return class extends React.PureComponent {
    static displayName = `${Component.name}Container`;
    static contextTypes = {
      store: PropTypes.object,
    };
    componentDidMount() {
      this.subscriptionId = this.context.store.subscribe(this.onStoreChange);
    }
    componentWillUnmount() {
      this.context.store.unsubscribe(this.subscriptionId);
      this.subscriptionId = null;
    }
    onStoreChange = () => {
      if (this.subscriptionId) {
        this.forceUpdate();
      } else {
        console.log(this.displayName);
      }
    };
    render() {
      return (
        <Component
          {...extraProps(this.context.store, this.props)}
          {...this.props}
          store={this.context.store}
        />
      );
    }
  };
};

export default storeProvider;
