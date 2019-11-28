import * as React from "react"
import { render } from "react-dom"
import Icon from "../lib"
// import Icon from "./icon"
import { default as AIcon } from "antd/lib/icon"


class TestIcon extends React.Component<{}, {}> {
    render() {
        return (
            <div>
                <Icon type="loading" fill="red"/>
                <Icon type="copy"/>
                <i style={{color: "red"}}>
                    <Icon type="wallet" />
                </i>
                <Icon type="wallet" theme={"filled"} />
                <div style={{fontSize: "14px"}}>
                    <Icon type="sync" spin={false} /> sync
                </div>
                <Icon type="thunderbolt" />
                <Icon type="search" />
                <Icon type="star" theme={"outlined"}/>
                <Icon type="star" theme={"filled"}/>
                <div>
                    <Icon type="right" rotate={90} />
                    <AIcon type="right" rotate={90} />
                </div>
                <Icon type="info-circle" theme={"filled"} />
            </div>
        )
    }
}


render(<TestIcon/>, document.getElementById("root"));

