import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableHighlight,
    TouchableNativeFeedback,
    AsyncStorage,
    Image,
    Picker,
    Dimensions,
    Alert,
    Animated
} from 'react-native'
import Styles from './Styles'
import Icon from 'react-native-fa-icons'
import Checkbox from 'react-native-checkbox'
import { connect } from 'react-redux'

@connect((store) => {
  return {
    ...store
  }
})
export default class Settings extends Component {
    constructor() {
        super()
        this.state = {
            categories: [
                {label: 'Earth and Landscapes', value: 'EarthPorn', status: true},
                {label: 'Space and Planet', value: 'SpacePorn', status: true},
                {label: 'Bridges and Buildings', value: 'BridgePorn', status: true},
                {label: 'The endless sky', value: 'SkyPorn', status: true},
                {label: 'Imaginary and Technology', value: 'ImaginaryTechnology', status: false},
                {label: 'Exposure photography', value: 'ExposurePorn', status: true},
                {label: 'Fractal geometric shapes', value: 'FractalPorn', status: false},
                {label: 'Generic wallpapers', value: 'Wallpapers', status: false}
            ],
            rotate: false,
            fadeAnim: new Animated.Value(0)
        }
    }
    static navigationOptions = {
        title: 'Settings',
        tabBarIcon: () => ( <Icon name='list-alt' style={Styles.tabIcon} /> )
    }
    componentDidMount() {
        Dimensions.addEventListener('change', (event) => {
            this.setState({rotate: event.screen.width > event.screen.height ? true : false})
        })
        Animated.timing(
          this.state.fadeAnim,
          {
            toValue: 1,
            duration: 1000,
          }
        ).start()
    }
    showError() {
      Alert.alert(
          'Connection failure',
          'Failed to connect to Reddit server, restore internet connection and try again.',
          [
              {text: 'Retry', onPress: () => {
                this.setState({eConnect: false})
                this.toFetch()
              }}
          ]
      )
    }
    render () {
        let { navigate } = this.props.navigation
        let choices = this.state.categories.map((cats, index) =>
            (
                <Checkbox
                    label={cats.label}
                    checked={cats.status}
                    labelStyle={[{color: 'white', fontStyle: 'italic', margin: 5}, this.state.rotate ? {fontSize: 10} : {}]}
                    checkboxStyle={{backgroundColor: 'white'}}
                    onChange={
                        (s) => {
                            let items = this.state.categories
                            if (index !== 0) items[index] = Object.assign(items[index], {status: s ? false : true})
                            let toReturn = []
                            items.forEach((item) => item.status && toReturn.push(item.value))
                            console.log(toReturn)
                            this.props.dispatch({type: 'UPDATE_CATEGORIES', payload: toReturn})
                        }
                    }
                    key={cats.label}
                />
            )
        )
        return (
            <View style={Styles.container}>
                {this.props.background === undefined ? undefined : <Image 
                    style={Styles.background}
                    source={{uri: this.props.background}}
                    onError={(e) => this.showError()}
                />}
                <Animated.View
                  style={{
                    opacity: this.state.fadeAnim,
                  }}
                >
                <View style={[Styles.box]}>
                    <View style={[Styles.link, {alignContent: 'center', justifyContent: 'space-around'}]}>
                        <Text style={[Styles.text, {
                            marginTop: 20, 
                            marginHorizontal: 20,
                            marginBottom: 15,
                            fontWeight: 'bold'}]}>
                            Categories to search for :
                        </Text>
                        {choices}
                    </View>
                </View>
                </Animated.View>
            </View>
        )
    }
}