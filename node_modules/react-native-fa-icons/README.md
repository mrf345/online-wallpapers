# react-native-fa-icons

[![NPM](https://nodei.co/npm/react-native-fa-icons.png)](https://npmjs.org/package/react-native-fa-icons)


Font Awesome Icons for React Native. Inspired from [react-native-fontawesome](https://github.com/entria/react-native-fontawesome). This module uses Font Awesome latest version [4.7.0](http://fontawesome.io/assets/font-awesome-4.7.0.zip).


# Benefits
- No bloatware, one package with one iconset, nothing more nothing less
- Full set of FontAwesome Icons properly updated
- Insanely fast with minimal memory footprint
- Uses the OS to render icons, for best in class performance (refer to performance note bellow)


# Installation

### Using npm
`npm i --save react-native-fa-icons`

### Using yarn

`yarn add react-native-fa-icons`

# Adding Font File

### Manually

[Adding Custom Fonts to A React Native Application for IOS](https://medium.com/@dabit3/adding-custom-fonts-to-react-native-b266b41bff7f)

[Adding Custom Fonts to A React Native Application for Android](https://medium.com/@gattermeier/custom-fonts-in-react-native-for-android-b8a331a7d2a7)

### Automatically

`react-native link react-native-fa-icons`

**Note:** There is no Java/ObjectiveC/swift binaries added using this command, it simply adds the font file to your android and ios projects.



# Usage
```javascript
import Icon from 'react-native-fa-icons';

<Icon name='address-book' style={{ fontSize: 45, color: 'green' }} />

// OR

<Text style={{ fontSize: 45, color: 'blue' }}>
  <Icon name='user' allowFontScaling />
</Text>
```

# Props
| prop | required | type | description |
| ---- | ---- | ----| ---- |
| name | Yes | string | Icon name from [here](http://fontawesome.io/icons/). |
| style | No | Style Object | react-native style object |
| allowFontScaling | No (Default: true) | boolean | Should Icon font scale based on user settings |
| onPress | No | Function | Function to execute on press event |


# Why this is fast, and uses almost no extra memory
This package uses the Text element to render Icons. The Text element delegates
to the OS the render process of the icons based on the Font file.
Both IOS and Android render fonts amazingly fast with little memory overhead. In essence  
FontAwesome.ttf will be used by the OS to render icons and will benefit of years
of native software improvement as well hardware acceleration.

# MIT License

Copyright (c) 2017 Muhammad Usman

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
