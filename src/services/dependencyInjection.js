import React, { Component } from 'react';

import HttpService from './HttpService';
import StorageService from './StorageService';

export const Dependency = {
  STORAGE_SERVICE: 'storageService',
  HTTP_SERVICE: 'httpService',
};

export const GlobalDependencyInjection = React.createContext({});

export class GlobalDependencyInjectionProvider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      storageService: new StorageService(),
      httpService: new HttpService(),
      updateGlobalState: this.updateGlobalState.bind(this),
    };
  }

  updateGlobalState() {
    this.setState({...this.state});
  }

  render() {
    return (
      <GlobalDependencyInjection.Provider value={{...this.state}}>
        {this.props.children}
      </GlobalDependencyInjection.Provider>
    );
  }
}

export const withDependenecyInjection = (
  ChildComponent,
  dependencies,
) => props => {
  const context = React.useContext(GlobalDependencyInjection);
  let injectedDependencies = {updateGlobalState: context.updateGlobalState};
  dependencies.forEach(element => {
    injectedDependencies[element] = context[element];
  });
  return <ChildComponent {...props} {...injectedDependencies} />;
};
