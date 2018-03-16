import { Alert } from 'react-native'

const conError = (retry=() => {}) => { 
    Alert.alert(
        'Connection failure',
        'Failed to connect to Reddit server, restore internet connection and try again.',
        [
            {text: 'OK'},
            
            retry !== false ? {text: 'Retry', onPress: () => {
                retry()
            }} : {}
        ]
    )
}

const setSuc = () => Alert.alert(
    'Wallpaper success', 
    'Online wallpaper been set successfully.',
    [{text: 'OK'}]
)

const startLoop = () => Alert.alert(
    'Auto resetter start',
    'Auto wallpaper resetter started successfully',
    [{text: 'OK'}]
)

const stopLoop = () => Alert.alert(
    'Auto resetter stop',
    'Auto wallpaper resetter stopped successfully',
    [{text: 'OK'}]
)

const cancelLoop = (cancel=() => {}) => Alert.alert(
    'Auto resetter cancel',
    'Auto resetter is still starting, do you wish to cancel it',
    [
        {text: 'Yes', onPress: cancel()},
        {text: 'No'}
    ]
)

export { 
    conError,
    setSuc,
    startLoop,
    stopLoop,
    cancelLoop
}