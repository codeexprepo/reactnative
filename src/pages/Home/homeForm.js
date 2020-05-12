import React, {Component} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';

import {
  ModalType,
  withModalProvider,
} from '../../component/modal/ModalProvider';

class HomeFormContainer extends Component {
  form = [
    {type: 'input', description: 'Name', placeholder: 'Name', name: 'name'},
    {type: 'input', description: 'Group', placeholder: 'Group', name: 'group'},
    {
      type: 'input',
      description: 'Interest',
      placeholder: 'Interest',
      name: 'interest',
    },
  ];

  constructor(props) {
    super(props);
    const formState = [];
    this.form.forEach(element => {
      formState.push('');
    });
    this.state = {form: formState};
  }

  getFormList() {
    const list = this.form.map((element, key) => this.getForm(element, key));
    return list;
  }

  getForm(form, _key) {
    let field;
    switch (form.type) {
      case 'input':
        field = (
          <View style={Styles.row} key={_key}>
            <Text style={Styles.inputDescription}>{form.description}</Text>
            <TextInput
              style={Styles.textInputStyle}
              placeholder={form.placeholder}
              onChangeText={text => {
                const formState = this.state.form;
                formState[_key] = text;
                this.setState({form: formState});
              }}
              value={this.state.form[_key]}
            />
          </View>
        );
        break;
      default:
        field = null;
    }
    return field;
  }

  validateInput() {
    for (let formState of this.state.form) {
      if (formState.length === 0) {
        return false;
      }
    }
    return true;
  }

  onNameInputChange(text) {
    this.setState({name: text});
  }

  onInterestInputChange(text) {
    this.setState({interest: text});
  }

  async onSubmit() {
    if (!this.validateInput()) {
      this.props.modal.openModal(
        ModalType.WARNING,
        'Please enter a valid input',
      );
      return;
    } else {
      const confirm = await this.props.modal.openModal(
        ModalType.CONFIRM,
        'Are you sure you want to submit?',
      );
      if (confirm) {
        this.props.storageService.addPerson(
          this.state.form[0],
          this.state.form[2],
        );
        this.reset();
      } else {
        return;
      }
    }
  }

  reset() {
    const newForm = Array(this.state.form.length).fill('');
    this.setState({form: newForm});
  }

  render() {
    return (
      <View>
        {this.getFormList()}
        <View style={{margin: 10}}>
          <Button
            color="#008000"
            title="Submit"
            onPress={() => this.onSubmit()}
          />
        </View>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  textInputStyle: {
    height: 40,
    borderColor: 'grey',
    borderWidth: 1,
    margin: 10,
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    marginLeft: '5%',
  },
  inputDescription: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlignVertical: 'center',
    width: '20%',
  },
});

const HomeForm = withModalProvider(HomeFormContainer);
export default HomeForm;
