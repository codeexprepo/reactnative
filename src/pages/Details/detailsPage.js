import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

import {
  Dependency,
  withDependenecyInjection,
} from '../../services/dependencyInjection';
import {Person} from './Person/Person';

/**
 * Represents the Details Page
 */

// Add service you need in this page
const Dependencies = [Dependency.STORAGE_SERVICE];

class DetailsContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {showPersons: false};
  }

  componentDidMount() {}

  getPersonList(state) {
    let list;
    if (state) {
      list = this.props.storageService.persons.map((person, index) => (
        <Person name={person.name} interest={person.interest} key={index} />
      ));
    } else {
      list = [];
    }
    return list;
  }

  render() {
    return (
      <View style={Styles.pageContainer}>
        <Text>Detail Screen</Text>
        <Text style={Styles.nameStyle}>
          Name: {this.props.storageService.name}
        </Text>
        <Button
          style={Styles.buttonStyle}
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
        <Button
          style={Styles.buttonStyle}
          title={this.state.showPersons ? 'Hide All' : 'Show All'}
          onPress={() => this.setState({showPersons: !this.state.showPersons})}
        />
        {this.getPersonList(this.state.showPersons)}
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameStyle: {
    margin: 10,
  },
  buttonStyle: {
    padding: 10,
  },
});

export default withDependenecyInjection(DetailsContainer, Dependencies);
