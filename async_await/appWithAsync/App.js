import React from 'react';
import {
  Text, View, Platform, TouchableOpacity, StyleSheet,
  Button, TextInput, ActivityIndicator
} from 'react-native';
import { Constants } from "expo";
import { StackNavigator } from 'react-navigation';
import SwapiFacade from './facades/SwapiFacade';

const Touchable = (props) => (
  <TouchableOpacity style={styles.button} onPress={props.onPress}>
    <Text style={styles.buttonText}>{props.title}</Text>
  </TouchableOpacity>)

class RandomPerson extends React.Component {
  static navigationOptions = { title: "Random Person" }
  constructor() {
    super();
    this.state = {
      randomPerson: { name: 'loading' },
    };
  }
  componentWillMount() {
    this.setState({
      interval:
        this.getRandomAtInterval(3000)
    })
  }
  componentWillUnmount() {
    if (this.state.interval) clearInterval(this.state.interval);
  }

  getRandomAtInterval = (ms) => {
    return setInterval(async () => {
      const randomPerson = await SwapiFacade.getRandomPerson();
      this.setState({ randomPerson });
    }, ms)
  }

  render() {
    return (
      <View style={{ margin: 10 }}>
        <Text>{JSON.stringify(this.state.randomPerson)}</Text>
      </View>
    );
  }
}

class FetchPerson extends React.Component {
  static navigationOptions = { title: "Get Person by id" }
  constructor() {
    super();
    this.state = {
      person: {},
      id: ''
    }
  }

  getPersonFromID = async (id) => {
    const person = await SwapiFacade.getPerson(id);
    this.setState({ person });
  }

  render() {
    return (
      <View style={{ margin: 10 }}>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          placeholder="Enter ID"
          keyboardType='numeric'
          onChangeText={(id) => this.setState({ id })}
          value={this.state.id}
        />
        <Touchable onPress={() => this.getPersonFromID(this.state.id)} title="Find Person" />
        <Text >{JSON.stringify(this.state.person)}</Text>
      </View>
    )
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = { title: 'Using async/await in Apps' };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={{ margin: 10 }}>
        <Text>Using the swapi.co API, fetch and async/await</Text>
        <Touchable onPress={() => navigate('randomperson')} title="Random Person" />
        <Touchable onPress={() => navigate('fetchperson')} title="Get person by id" />
      </View>
    )
  }
}

export default App = () => (
  <View style={{ marginTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight, flex: 1 }}>
    <RouteStack />
  </View>
)

const RouteStack = StackNavigator({
  Home: { screen: HomeScreen },
  randomperson: { screen: RandomPerson },
  fetchperson: { screen: FetchPerson },
});

const styles = StyleSheet.create({
  button: {
    margin: 3,
    alignItems: 'center',
    backgroundColor: '#2196F3'
  },
  buttonText: {
    padding: 7,
    fontSize: 18,
    fontWeight: "bold",
    color: 'white'
  }
})