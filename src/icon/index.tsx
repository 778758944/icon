import * as React from "react"
import "./index.css"
import icons from "../resource/icon.json"

interface IconDefine { [key: string]: string; }

export type ThemeType = "filled" | "outlined" | "twoTone";

interface IIocnProps {
    type: string;
    width?: number | string;
    height?: number | string;
    fill?: string;
    className?: string;
    style?: any;
    spin?: boolean;
    theme?: ThemeType;
    rotate?: number; 
    [key: string]: any;
}

class Icon extends React.Component<IIocnProps, {}> {
    public static defaultProps = {
        width: "1em",
        height: "1em",
        fill: "currentColor"
    }

    public componentDidMount() {
        Icon.loadSvg(icons, "_ANTD_WHITELIST_ICON_SVG_CONTAINER");
    }

    private static renderSvgContent(content: string, containerId: string) {
        return `
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="position: absolute; width: 0; height: 0"
                    id="${containerId}"
                >
                ${content}
                </svg>
                `
    }

    private static renderIconContent(icons: IconDefine) {
        return Object.keys(icons).map((key: string) => {
            return icons[key];
        }).join('');
    }

    public static loadSvg(icons: IconDefine, containerId: string) {
        const svgEntry = document.getElementById(containerId);
        if (!svgEntry) {
            const svgContent = this.renderSvgContent(this.renderIconContent(icons), containerId);
            document.body.insertAdjacentHTML("afterbegin", svgContent);
        }
    }

    public render() {
        const { width, height, style, type, fill, spin, theme, className, rotate, ...rest } = this.props;
        let className_ = className;
        let iconType = type;
        if (theme && theme === "filled") {
            iconType += `-${theme}`;
        }

        let rotateClass: string | undefined = undefined;
        if (type === "loading" || spin) {
            rotateClass = "anticon-spin";
        }
        return (
            <i className={`anticon anticon-${type} ${className_ ? className_ : ""}`} style={style} {...rest}>
                <svg
                    width={width}
                    height={height}
                    fill = {fill}
                    className = {`${rotateClass ? rotateClass : ''}`}
                    style={rotate ? {
                        transform: `rotate(${rotate}deg)`
                    } : {}}
                >
                        <use xlinkHref={`#${iconType}`} />
                </svg>
           </i>
        )
    }
}

export default Icon