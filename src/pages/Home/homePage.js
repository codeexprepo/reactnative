import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {
  Dependency,
  withDependenecyInjection,
} from '../../services/dependencyInjection';
import HomeForm from './homeForm';

/**
 * Represents the Home Page
 */

// Add the services you need in this page
const Dependencies = [Dependency.STORAGE_SERVICE, Dependency.HTTP_SERVICE];

class HomeContainer extends Component {
  storageService;
  httpService;

  constructor(props) {
    super(props);
    this.state = {person: {name: '', interest: ''}};
    this.storageService = this.props.storageService;
    this.httpService = this.props.httpService;
  }

  componentDidMount() {}

  onTextInputChange(newName) {
    this.setState({name: newName});
  }

  onFormUpdate(_name, _interest) {
    this.setState({person: {name: _name, interest: _interest}});
  }

  render() {
    return (
      <View style={Styles.pageContainer}>
        <Text>{this.httpService.name}</Text>
        <Text style={Styles.titleText}>Home Screen</Text>
        <Text>Add person to the group: </Text>
        <View styles={Styles.formGroup}>
          <HomeForm
            storageService={this.storageService}
            update={this.onFormUpdate.bind(this)}
          />
        </View>
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate('Details')}
        />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  titleText: {
    alignSelf: 'center',
    position: 'relative',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: '20%',
  },
  formGroup: {
    alignSelf: 'center',
  },
});

export default withDependenecyInjection(HomeContainer, Dependencies);
