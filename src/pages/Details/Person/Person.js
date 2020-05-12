import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';

export const Person = props => {
  return (
    <View style={Styles.detailPerson}>
      <View style={Styles.row}>
        <Text>Name: </Text>
        <Text style={Styles.personName}>{props.name}</Text>
      </View>
      <View style={Styles.row}>
        <Text>Interest: </Text>
        <Text>{props.interest}</Text>
      </View>
    </View>
  );
};

const Styles = StyleSheet.create({
  detailPerson: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  personName: {
    fontStyle: 'italic',
  },
});
