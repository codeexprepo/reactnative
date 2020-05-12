import React, {Component} from 'react';

import ConfirmModal from './ConfirmModal';
import ErrorModal from './ErrorModal';

export const ModalType = {
  WARNING: 'warning',
  CONFIRM: 'confirm',
};

export const ModalContext = React.createContext({
  visible: false,
  modalType: '',
  message: '',
  outputResolver: null,
});

export class ModalProvider extends Component {
  state = {
    visible: false,
    modalType: '',
    message: '',
    outputResolver: null,
  };

  toggleVisible() {
    this.setState({visible: !this.state.visible});
  }

  openModal(type, message) {
    return new Promise((resolve, reject) => {
      this.setState({
        visible: !this.state.visible,
        outputResolver: resolve,
        modalType: type,
        message: message,
      });
    });
  }

  getModelComponentFromType() {
    let modelComponet;
    switch (this.state.modalType) {
      case ModalType.WARNING:
        modelComponet = (
          <ErrorModal
            toggleVisible={this.toggleVisible.bind(this)}
            message={this.state.message}
            outputResolver={this.state.outputResolver}
          />
        );
        break;
      case ModalType.CONFIRM:
        modelComponet = (
          <ConfirmModal
            toggleVisible={this.toggleVisible.bind(this)}
            message={this.state.message}
            outputResolver={this.state.outputResolver}
          />
        );
        break;
      default:
        modelComponet = null;
    }
    return modelComponet;
  }

  render() {
    let modelComponet = null;

    if (this.state.visible) {
      modelComponet = this.getModelComponentFromType();
    }

    return (
      <ModalContext.Provider
        value={{
          ...this.state,
          toggleVisible: this.toggleVisible.bind(this),
          openModal: this.openModal.bind(this),
        }}>
        {modelComponet}
        {this.props.children}
      </ModalContext.Provider>
    );
  }
}

export const withModalProvider = ChildComponent => props => {
  return (
    <ModalProvider>
      <ModalContext.Consumer>
        {context => {
          const modalObject = {modal: context};
          return <ChildComponent {...props} {...modalObject} />;
        }}
      </ModalContext.Consumer>
    </ModalProvider>
  );
};
