import { Dimensions, Image } from 'react-native'

const checkImg = (link) => {
    // to check loading and diminsions of an image link
    return new Promise((resolve, reject) => {
        let types = ['png', 'jpg', 'gif']
        let pass = false 
        types = types.concat(types, types.map((t) => t.toUpperCase()))
        for (let i in types) {
            if (link.endsWith('.' + types[i]) || link.indexOf('.' + types[i]) !== -1) pass = true
        }
        if (!pass) reject('Error: wrong link ' + link)
        let dim = Dimensions.get('screen')
        Image.getSize(
            link,
            (width, height) => height > Math.round(dim.height) && width > Math.round(dim.width) ? resolve(true) : reject(undefined),
            (e) => reject('Error: ' + link)
        )
    })
}

const checkCon = (timeout=1000) => {
    // to check internet connection
    return new Promise((resolve, reject) => {
        let tm = setTimeout((e) => reject('timed out'), timeout)
        fetch('https://reddit.com/').then(
            (e) => resolve(true)
        ).catch((e) => reject(e))
    })
}

const Choice = (list) => {
    // to choose randomly from an Array
    let powerOfLength = Math.floor(list.length / 10)
    if (powerOfLength <= 0) powerOfLength = 1
    let toreturn = list[Math.floor(Math.random() * (10 * powerOfLength))]
    return toreturn ? toreturn : list[0]
}

const Shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

export {
    checkImg,
    checkCon,
    Choice,
    Shuffle
}