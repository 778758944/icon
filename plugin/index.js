const getIcon = require("../src/resource/getIcon");
const path = require("path");
const { ConcatSource } = require("webpack-sources");
const walk = require("acorn-walk");


class IconLoaderPlugin {
    constructor(config) {
        this.config = Object.assign({}, config);
        this.name = "IconLoaderPlugin";
        this.configPath = "";
        this.iconType = new Set();

        this.getParser = this.getParser.bind(this);
        this.getIconType = this.getIconType.bind(this);
    }

    renderSvgContent(icons) {
        return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0" id="${IconLoaderPlugin.SVG_ID}">${this.renderIconContent(icons)}</svg>`
    }

    renderIconContent(icons) {
        return Object.keys(icons).map((key) => {
            return icons[key];
        }).join('');
    }

    generateScript(svgContent) {
        return `const svgEntry = document.getElementById('${IconLoaderPlugin.SVG_ID}');if (!svgEntry) document.body.insertAdjacentHTML("afterbegin", '${svgContent}');`
    }

    getDemandIcon() {
        let icons = [];
        icons = getIcon(Array.from(this.iconType), true);
        /*
        if (this.config.icons) {
            icons = getIcon(this.config.icons);
        } else {
            icons = getIcon(this.configPath);
        }
        */
        return icons;
    }

    getSvgContent() {
        const icons = this.getDemandIcon();
        return this.renderSvgContent(icons);
    }

    getParser(factory) {
        factory.hooks.parser.for("javascript/auto").tap(this.name, (parser) => {
            parser.hooks.program.tap(this.name, this.getIconType);
        });
    }

    getIconType(ast) {
        const self = this;
        walk.simple(ast, {
            CallExpression(expression) {
                if (
                    expression.callee && 
                    expression.callee.property && 
                    expression.callee.property.name === "createElement" &&
                    expression.arguments &&
                    expression.arguments.length > 1
                ) {
                    const arg1 = expression.arguments[0];
                    const arg2 = expression.arguments[1];

                    if (arg1.type === "Identifier" && arg1.name === "Icon") {
                        let type, style;
                        if (arg2.type === "ObjectExpression") {
                            arg2.properties.forEach((prop) => {
                                if (prop.type === "Property" && prop.key.name === "type") {
                                    type = prop.value.value;
                                } else if (prop.type === "Property" && prop.key.name === "theme") {
                                    style = prop.value.value;
                                }
                            })
                        }

                        if (type) {
                            if (style === "filled") {
                                type += "-filled";
                            }
                            self.iconType.add(type);
                        }
                    }
                }
            }
        })
    }



    apply(compiler) {
        this.configPath = path.resolve(compiler.context, "icon.config.json");
        if (!compiler.hooks) {
            console.error("Sorry, We just support Webpack4");
            return;
        }
        compiler.hooks.normalModuleFactory.tap(this.name, this.getParser);
        compiler.hooks.compilation.tap(this.name, (compilation) => {
            compilation.hooks.optimizeChunkAssets.tapAsync(this.name, (chunks, callback) => {
                if (!this.configPath) console.error("No config path");
                try {
                    chunks.forEach((chunk) => {
                        if (chunk.id === "main") {
                            const filename = chunk.files[0];
                            const svg_content = this.getSvgContent();
                            const script = this.generateScript(svg_content);
                            compilation.assets[filename] = new ConcatSource(compilation.assets[filename], "\n", script);
                        }
                    });
                } catch (e) {
                    console.error(e);
                }
                callback();
            })
        });
    }
}

IconLoaderPlugin.SVG_ID = "_ANTD_ICON_SVG_CONTAINER";

module.exports = IconLoaderPlugin;




