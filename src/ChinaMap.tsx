import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";

import { ChinaMapContainerProps } from "../typings/ChinaMapProps";

import "./ui/ChinaMap.css";

export class ChinaMap extends Component<ChinaMapContainerProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText ? this.props.sampleText : "World"} />;
    }
}
