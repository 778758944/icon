## What is this
It is an icon library base on SVG and include all svg resource except Twotone in ant-design. Because antd will load all the svg resource once you using Icon or some other component which using Icon internally, it will make your js bundle 500kb bigger, but in most case, you just need only a few of svg in it.

## How to use

### Use independently
```jsx
import Icon from '@xwt/icon';

ReactDOM.render(
  <Icon type="loading" />,
  mountNode
);
```

### Use with ant-design
It is not necessary to change your code to replace the Icon. However, what you need to do is just add alias in your webpack.config.js as follows:
```js
    ...
    alias: {
        'antd/es/icon$': path.resolve(__dirname, './node_modules/\@xwt\/icon/lib'),
        '../icon$': path.resolve(__dirname, './node_modules/\@xwt\/icon/lib')
    }
```

## List of icons
These icons are loaded by default, you can use the type bellow directly
```js
    [
    "android", "apple", "appstore", "bar-chart", "bars", "calendar", "caret-down", "check", "check-circle", "clock-circle", "close", "close-circle", "delete", "desktop", "double-left", "double-right", "down", "edit", "ellipsis", "exclamation-circle", "file", "heart", "home", "inbox", "laptop", "left", "loading","lock", "mail", "meh", "message", "minus", "notification", "picture", "pie-chart", "plus", "redo", "right", "search", "setting", "shop", "smile", "solution", "star", "sync", "team", "up", "upload", "user","video-camera"
]
```

## Load icons on demand
We support the whole icons in ant-design except the Twotone. But in order to reduce the package size, we just include the icon above, if you want to use icons beyond this range, we support load icons on demand.  For more icons, please visit [https://ant.design/components/icon/](https://ant.design/components/icon/)


### Load icons with webpack
If you use webpack with "html-webpack-plugin", you can use a plugin called "IconHtmlWebpackLoaderPlugin", or you can use "IconLoadPlugin" in case you are not using "html-webpack-plugin".

For example:

webpack.config.js
```js
const IconLoadPlugin = require("@xwt/icon/plugin");
const IconHtmlWebpackLoaderPlugin = require("@xwt/icon/plugin/icon-html-loader-plugin");

module.exports = {
  ...
  plugins: [
    ...
    // if you are not using html-webpack-plugin
    new IconLoadPlugin(),

    // if you are using html-webpack-plugin
    new IconHtmlWebpackLoaderPlugin()
  ]

}
```

### No webpack
If you are not using webpack, we also support loading icon manually. You need to specific icon.config.json in the root directory of your project and run "generateicon" command to generate "icon.json" which just include the svg resource you need and then load the resource before you use it. (We highly recommend you to use it with webpack)

For example:
icon.config.json

```js
["step-backward", "step-forward", "edit-filled"]
```

index.jsx
```jsx
    import Icon from '@xwt/icon'
    import icons from "icon.json"
    Icon.loadSvg(icons);

    ReactDOM.render(
        <div>
            <Icon type="step-backward" />
            <Icon type="edit" theme="filled"/>
        </div>
        mountNode
    );

```

The following properties are available for the component:

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| className | The computed class name of the `svg` element | string | - |
| fill | Define the color used to paint the `svg` element | string | '#000' |
| height | The height of the `svg` element | string \| number | '1em' |
| style | The computed style of the `svg` element | CSSProperties | - |
| width | The width of the `svg` element | string \| number | '1em' |
| type | The name of icon | string | - |
| theme | The theme of icon | "filled" or "outline" | - |
| rotate | The rotate of icon | number | - |





