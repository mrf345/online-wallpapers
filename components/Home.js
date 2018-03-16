import React, { Component } from 'react'
import {View, Text, Button, TouchableHighlight,
  Image, AsyncStorage, Dimensions, Alert, Animated
} from 'react-native'
import Styles from './Styles'
import Icon from 'react-native-fa-icons'
import { checkImg, checkCon, Choice } from './../functions/core'
import Spinner from 'react-native-loading-spinner-overlay'
import WallPaperManager from 'react-native-wallpaper-manager'
import { conError, setSuc } from './../functions/alerts'
import { connect } from 'react-redux'

const settings = {
  timeout: 15000,
  durations: {
      30000: 'Every half a minute',
      60000: 'Every a minute',
      180000: 'Every 3 minutes',
      300000: 'Every 5 minutes',
      900000: 'Every 15 minutes',
      1800000: 'Every half an hours',
      3600000: 'Every 1 hour',
      7200000: 'Every 2 hours',
      14400000: 'Every 4 hours',
      28800000: 'Every 8 hours'
  }
}

@connect((store) => {
  return {
    ...store
  }
})
class Home extends Component {
  static navigationOptions = {
    title: 'Home',
    tabBarIcon: () => (
      <Icon name='home' style={Styles.tabIcon} /> 
    )
  }
  constructor() {
    super()
    this.state = {
      flexDirection: 'column',
      rotateEvent: false,
      width: Dimensions.get('window').width,
      olColor: 'rgba(0,0,0,0.7)',
      olContent: 'Loading online backgrounds ...',
      olStyle: {
        fontSize: 15,
        color: 'white'
      },
      eConnect: false,
      first: true,
      fadeAnim: new Animated.Value(0)
    }
  }
  componentWillMount() {
    this.toFetch()
  }
  componentDidMount() {
    Dimensions.addEventListener('change', (event) => {
      this.setState(
        {
          flexDirection: event.screen.width > event.screen.height ?  'row' : 'column',
          rotateEvent: true,
          width: event.window.width
        }
      )
    })
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 1000,
      }
    ).start()
  }
  
  toFetch() {
    this.props.dispatch({type: 'FETCHING'})
    let category = Choice(this.props.categories), after = ''
    if (this.props.after !== '' && this.props.index >= this.props.backgrounds.length - 1) after = ';after=' + this.props.after
    let link = 'https://www.reddit.com/r/' + category + '.json?limit=50' + after
    new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error('timed out')), settings.timeout)
      fetch(link).then(
        (r) => resolve(r.json())
      ).catch((e) => reject(e))
    }).then(
      j => {
        this.props.dispatch({type: 'FETCH_SUCCESS', payload: j.data.children})
        this.nextOne(false)
      }).catch((e) => {
        this.props.dispatch({type: 'FETCH_ERROR'})
        this.showError()
      })
  }

  nextOne(checkC=true) {
    this.props.dispatch({type: 'FETCHING'})
    const toDo = () => {
      let nextIndex = this.props.index + 1
      let img = this.props.backgrounds[nextIndex]
      img ? (img = img.data.url,
      checkImg(this.props.backgrounds[nextIndex].data.url).then(
        (resp) => this.props.dispatch({type: 'NEXT_WALL', payload: true})
      ).catch((err) => {
        this.props.dispatch({type: 'NEXT_WALL', payload: false})
        this.nextOne()
      })) : (this.props.dispatch({type: 'END_STUCK'}), this.toFetch())
    }
    if (this.props.refetch) {
      this.toFetch()
      this.props.dispatch({type: 'END_REFETCH'})
    } else if (checkC) checkCon(settings.timeout).then(
      toDo()
    ).catch((err) => {
      this.props.dispatch({type: 'FETCH_ERROR'})
      this.showError()
    })
    else toDo()
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
  render() {
    let { navigate } = this.props.navigation
    let toRend = [
      (<TouchableHighlight
        key={'firstIT'}
        style={Styles.link}
        onPress={(event) => {
          this.nextOne()
        }}
      >
        <Text style={this.state.flexDirection === 'column' ? Styles.text : Styles.textHor}>
          <Icon name='plus' style={this.state.flexDirection === 'column' ? Styles.icon : Styles.iconHor} />
         {"\n\n"}
         New wallpaper
        </Text>
      </TouchableHighlight>),
      (<TouchableHighlight
        key={'secondIT'}
        style={Styles.link}
        onPress={(event) => {
          if (this.props.store.length <= 1) alert('This is the last stored wallpaper')
          else this.props.dispatch({type: 'PREVIOUS_WALL'})
        }}
      >
        <Text style={this.state.flexDirection === 'column' ? Styles.text2 : Styles.textHor2}>
          <Icon name='undo' style={this.state.flexDirection === 'column' ? Styles.icon2 : Styles.iconHor2} />
         {"\n\n"}
         Previous wallpaper
        </Text>
      </TouchableHighlight>)
    ]
    return (
      <View 
        style={Styles.container}
      >
        <Spinner
          overlayColor={this.state.olColor}
          textStyle={this.state.olStyle}
          textContent={this.state.olContent}
          visible={this.props.fetching === undefined ? false : this.props.fetching}
          animation='fade'
        />
        {this.props.background ? <Image
            style={Styles.background}
            source={{uri: this.props.background}}
            resizeMode='stretch'
            onLoadEnd={() => this.props.dispatch({type: 'STOP_FETCHING'})}
        /> : undefined}
        <Animated.View
          style={{
            opacity: this.state.fadeAnim,
          }}
        >
        <View style={[Styles.box, {
          flexDirection: this.state.flexDirection,
          width: this.state.width,
        }]}>
        {this.state.flexDirection === 'column' ? toRend : toRend.reverse()}
          <TouchableHighlight
            style={Styles.link}
            onPress={() => {
              this.props.dispatch({type: 'FETCHING'})
              this.setState({
                olContent: 'Setting the wallpaper ...',
              })
              WallPaperManager.setWallpaper({uri: this.props.background}, (r) => {
                this.props.dispatch({type: 'STOP_FETCHING'})
                setSuc()
                this.setState({
                  olContent: 'Loading online backgrounds ...'
                })
              })
            }}
          >
            <Text style={this.state.flexDirection === 'column' ? Styles.text3 : Styles.textHor3}>
              <Icon name='paint-brush' style={this.state.flexDirection === 'column' ? Styles.icon3 : Styles.iconHor3} />
              {"\n\n"}
              Set current wallpaper
            </Text>
          </TouchableHighlight>
        </View>
        </Animated.View>
      </View>
    )
  }
}

export { Home, settings }