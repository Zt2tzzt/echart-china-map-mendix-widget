import { Component, ReactNode, createElement } from "react";
import { HelloWorldSample } from "./components/HelloWorldSample";
import { ChinaMapPreviewProps } from "../typings/ChinaMapProps";

export class preview extends Component<ChinaMapPreviewProps> {
    render(): ReactNode {
        return <HelloWorldSample sampleText={this.props.sampleText} />;
    }
}

export function getPreviewCss(): string {
    return require("./ui/ChinaMap.css");
}
