import React, { Component } from 'react'
import {
    View,
    Text,
    AsyncStorage,
    Image,
    Alert,
    Dimensions,
    Animated
} from 'react-native'
import Icon from 'react-native-fa-icons'
import Styles from './Styles'
import BackgroundTask from 'react-native-background-task'
import Checkbox from 'react-native-checkbox'
import { WheelPicker } from 'react-native-wheel-picker-android'
import BackgroundTimer from 'react-native-background-timer'
import { checkCon, checkImg, Choice } from './../functions/core'
import WallPaperManager from 'react-native-wallpaper-manager'
import { 
    conError,
    startLoop,
    stopLoop,
    cancelLoop
 } from './../functions/alerts'
import Spinner from 'react-native-loading-spinner-overlay'
import { connect } from 'react-redux'
import { settings } from './Home'

@connect((storage) => {
    return {
        ...storage
    }
})
export default class Autoer extends Component {
    constructor() {
        super()
        this.state = {
            duration: undefined,
            status: false,
            selected: 30000,
            position: 0,
            loops: undefined,
            backgrounds: [],
            after: '',
            index: -1,
            loops: [],
            visible: false,
            rotate: false,
            fadeAnim: new Animated.Value(0)
        }
    }
    static navigationOptions = {
        title: 'Autoloader',
        tabBarIcon: () => ( <Icon name='cogs' style={Styles.tabIcon} /> )
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

    toFetch() {
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

    nextOne(checkC=true, callback=() => {}, onError=() => {}) {
      const toDo = () => {
        let nextIndex = this.props.index + 1
        let img = this.props.backgrounds[nextIndex]
        img ? (img = img.data.url,
        checkImg(this.props.backgrounds[nextIndex].data.url).then(
          (resp) => {
              this.props.dispatch({type: 'NEXT_WALL', payload: true})
              callback()
          }
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
        onError()
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
    render () {
        let { navigate } = this.props.navigation
        return (
            <View style={Styles.container}>
                <Spinner
                  overlayColor={'rgba(0,0,0,0.65)'}
                  textStyle={{
                    fontSize: 15,
                    color: 'white'
                  }}
                  textContent={'Auto resetter starting ...'}
                  visible={this.state.visible}
                  animation='fade'
                />
                {this.props.background !== undefined ? <Image
                    style={Styles.background}
                    source={{uri: this.props.background}}
                /> : undefined}
                <Animated.View
                  style={{
                    opacity: this.state.fadeAnim,
                  }}
                >
                <View style={Styles.box}>
                    <View style={Styles.link}>
                        <Text style={[Styles.text, {fontWeight: 'bold'}, this.state.rotate ? {} : {
                        marginTop: 20,
                        marginHorizontal: 20,
                        marginBottom: 15
                        }]}>
                            Automaticlly reset wallpapers :
                        </Text>
                        <Checkbox
                            label={'Enable or Disable auto resetter'}
                            checked={this.state.status}
                            labelStyle={[{color: 'white', fontStyle: 'italic', margin: 5}]}
                            checkboxStyle={{backgroundColor: 'white'}}
                            onChange={
                                (s) => {
                                    let loops = this.state.loops
                                    // FIXME : work around to java.lang.String cannot java.lang.double BUG
                                    let timeOut = isNaN(parseInt(this.state.selected)) ? 30000 : parseInt(this.state.selected) 
                                    if (!s) {
                                        this.setState({visible: true})
                                        const toRun = (show=false) => {
                                            this.nextOne(true, () => {
                                                if (this.state.visible || show) startLoop()
                                                this.setState({
                                                   visible: false
                                                })
                                                WallPaperManager.setWallpaper({uri: this.props.background})
                                            }, () => {
                                                loops.forEach((l) => {
                                                    BackgroundTimer.clearInterval(l)
                                                })
                                                this.setState({status: false, visible: false, loops: []})
                                            })
                                        }
                                        loops.push(BackgroundTimer.setInterval(toRun, timeOut))
                                        toRun(false)
                                    } else {
                                        loops.forEach(
                                            (l) => {
                                                BackgroundTimer.clearInterval(l)
                                            }
                                        )
                                        loops = []
                                        stopLoop()
                                    }
                                    this.setState({loops: loops, status: s ? false : true})
                                }
                            }
                        />
                        <WheelPicker
                            isCurved={true}
                            isCyclic={true}
                            renderIndicator={true}
                            isAtmospheric={true}
                            indicatorColor={'gray'}
                            itemTextColor={'white'}
                            itemTextSize={50}
                            data={Object.values(settings.durations)}
                            style={this.state.rotate ? {
                                marginTop: 10,
                                marginHorizontal: 10,
                                marginBottom: 10,
                                width:250,
                                height: 150
                            } : {
                                marginTop: 20,
                                marginHorizontal: 20,
                                marginBottom: 15,
                                width:300,
                                height: 200
                            }}
                            onItemSelected={(e) => {
                                this.setState({
                                    selected: Object.keys(settings.durations)[e.position],
                                    position: e.position
                                })
                            }}
                            selectedItemPosition={this.state.position}
                        />
                    </View>
                
            </View>
            </Animated.View>
        </View>
        )
    }
}