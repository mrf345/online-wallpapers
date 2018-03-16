import { StackNavigator, TabNavigator } from 'react-navigation'
import { Home } from './components/Home'
import Settings from './components/Settings'
import Autoer from './components/Autoer'

console.disableYellowBox = true

export default TabNavigator({
      Home: {screen: Home},
      Settings: {screen: Settings},
      Autoloader: {screen: Autoer}
    },
    {
      tabBarOptions: {
        showIcon: true,
        showLabel: false,
        upperCaseLabel: false,
        style: {
          backgroundColor: 'black'
        },
        indicatorStyle: {
          // color: 'gray',
          backgroundColor: 'gray'
        }
      },
      tabBarPosition: 'top'
})