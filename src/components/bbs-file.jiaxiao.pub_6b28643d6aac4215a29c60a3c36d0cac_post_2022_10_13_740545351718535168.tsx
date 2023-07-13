import { Component, ReactNode, createElement } from "react";

// <<<<<<<<< 增加的代码
import china from "./china";
import * as echarts from "echarts/core";
import { MapChart, MapSeriesOption } from "echarts/charts";
import { TooltipComponent, TooltipComponentOption } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
type ECOption = echarts.ComposeOption<MapSeriesOption | TooltipComponentOption>;
echarts.use([MapChart, TooltipComponent, CanvasRenderer]);
interface DataItem {
    name: string;
    value: number;
}
// >>>>>>>>>>>>>>>>>>>

export interface HelloWorldSampleProps {
    sampleText?: string;
}

export class HelloWorldSample extends Component<HelloWorldSampleProps> {
    // <<<<<<<<< 增加的代码
    myChart: any;
    dataProvince: DataItem[] = [
        { name: "黑龙江", value: 9 },
        { name: "吉林", value: 12 },
        { name: "辽宁", value: 15 },
        { name: "上海", value: 25 },
        { name: "河北", value: 18 },
        { name: "河南", value: 21 },
        { name: "内蒙古", value: 23 },
        { name: "山东", value: 26 }
    ];
    componentDidMount(): void {
        this.myChart = echarts.init(document.getElementById("felixmap") as HTMLDivElement);
        echarts.registerMap("china", china);
        this.myChart.setOption(this.getOption());
    }
    componentDidUpdate() {
        this.myChart.setOption(this.getOption());
    }

    getOption() {
        const option: ECOption = {
            tooltip: {
                show: true,
                formatter: "{a}</br>{b}:{c}"
            },
            series: [
                {
                    name: "实时数量",
                    type: "map",
                    geoIndex: 0,
                    map: "china",
                    roam: true,
                    label: {
                        show: true
                    },
                    data: this.dataProvince
                }
            ]
        };
        return option;
    }
    // >>>>>>>>>>>>>>>>>>>

    render(): ReactNode {
        return (
            <div className="widget-hello-world">
                Hello {this.props.sampleText}
                <div id="felixmap" style={{ width: "100%", height: "400px" }} />
            </div>
        );
    }
}
