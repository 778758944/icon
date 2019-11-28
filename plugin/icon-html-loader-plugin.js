const IconLoaderPlugin = require("./index");
const path = require("path");
const whiteIcons = require("../src/resource/icon.json");

class IconHtmlWebpackLoaderPlugin extends IconLoaderPlugin {
    constructor(config) {
        super(config);
        this.name = "IconHtmlWebpackLoaderPlugin";
        IconLoaderPlugin.SVG_ID = "_ANTD_WHITELIST_ICON_SVG_CONTAINER";
    }

    getSvgContent() {
        const demandIcons = this.getDemandIcon();
        
        return this.renderSvgContent({
            ...whiteIcons,
            ...demandIcons
        });
    }

    apply(compiler) {
        this.configPath = path.resolve(compiler.context, "icon.config.json");
        if (!compiler.hooks) {
            console.error("Sorry, We just support Webpack4");
            return;
        }
        compiler.hooks.normalModuleFactory.tap(this.name, this.getParser);
        compiler.hooks.compilation.tap(this.name, (compilation) => {
            compilation.hooks.htmlWebpackPluginAfterEmit.tapAsync(this.name, (data, cb) => {
                const svgHtml = data.html.source().replace("<body>", "<body>" + this.getSvgContent());
                const filename = data.outputName;
                compilation.assets[filename] = {
                    ...data.html,
                    source: () => svgHtml,
                    size: () => svgHtml.length
                }
                return typeof cb === "function" ? cb(null, data) : data;
            })
        });
    }
}

module.exports = IconHtmlWebpackLoaderPlugin;