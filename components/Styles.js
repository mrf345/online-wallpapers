import { StyleSheet, Dimensions } from 'react-native'

const text = {
  fontSize: 20,
  marginBottom: 5,
  marginHorizontal: 15,
  textAlign: 'center',
  color: 'white',
  fontWeight: '200',
}

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'gray'
  },
  box: {
    flex: 1,
    width: Dimensions.get('window').width,
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  boxHor: {
    flex: 1,
    alignItems: 'center'
  },
  text: text,
  text2: Object.assign(text, {fontSize: 15}),
  text3: Object.assign(text, {fontSize: 17}),
  textHor: text,
  textHor2: Object.assign(text, {fontSize: 12}),
  textHor3: Object.assign(text, {fontSize: 15}),
  icon: {
    fontWeight: 'normal',
    fontSize: 60,
    margin: 20
  },
  icon2: {
    fontWeight: 'normal',
    fontSize: 30,
    margin: 15
  },
  icon3: {
    fontWeight: 'normal',
    fontSize: 40,
    margin: 17
  },
  iconHor: {
    fontWeight: 'normal',
    fontSize: 50,
    margin: 20
  },
  iconHor2: {
    fontWeight: 'normal',
    fontSize: 20,
    margin: 15
  },
  iconHor3: {
    fontWeight: 'normal',
    fontSize: 30,
    margin: 17
  },
  link: {
    backgroundColor: 'rgba(0,0,0,0.65)',
    padding: 10,
    borderWidth: 2,
    borderRadius: 50,
    borderColor: 'gray',
  },
  tabIcon: {
    color: 'white',
    fontSize: 20
  },
  background: {
    flex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  }
})
