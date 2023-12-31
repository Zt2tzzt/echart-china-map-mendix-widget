import "./ui/ChinaMap.css";
import { Component, ReactNode, createElement, createRef } from "react";
import china_geojson from "./lib/china";
import * as echarts from "echarts/core";
import { MapChart, EffectScatterChart } from "echarts/charts";
import { TooltipComponent } from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import type { ChinaMapContainerProps } from "../typings/ChinaMapProps";
import debounce from "./utils/debounce";

echarts.use([MapChart, TooltipComponent, CanvasRenderer, EffectScatterChart]);
// type ECOption = echarts.ComposeOption<MapSeriesOption | TooltipComponentOption>;
interface DataItem {
    name: string;
    value: number;
}

interface GeoCoordMap {
    [cityname: string]: number[];
}
interface CoverData {
    name: string;
    value: number[];
}

export class ChinaMap extends Component<ChinaMapContainerProps> {
    mapName = "中国";
    echartInstance: any;
    echartResize = debounce(() => {
        this.echartInstance.resize();
    }, 300);
    dataProvince: DataItem[] = /* [
        { name: "黑龙江", value: 9 },
        { name: "吉林", value: 12 },
        { name: "辽宁", value: 15 },
        { name: "上海", value: 25 },
        { name: "河北", value: 18 },
        { name: "河南", value: 21 },
        { name: "内蒙古", value: 23 },
        { name: "山东", value: 26 }
    ] */ [
        { name: "北京", value: 199 },
        { name: "天津", value: 42 },
        { name: "河北", value: 102 },
        { name: "山西", value: 81 },
        { name: "内蒙古", value: 47 },
        { name: "辽宁", value: 67 },
        { name: "吉林", value: 82 },
        { name: "黑龙江", value: 123 },
        { name: "上海", value: 154 },
        { name: "江苏", value: 102 },
        { name: "浙江", value: 114 },
        { name: "安徽", value: 109 },
        { name: "福建", value: 116 },
        { name: "江西", value: 91 },
        { name: "山东", value: 119 },
        { name: "河南", value: 137 },
        { name: "湖北", value: 116 },
        { name: "湖南", value: 114 },
        { name: "重庆", value: 101 },
        { name: "四川", value: 125 },
        { name: "贵州", value: 62 },
        { name: "云南", value: 83 },
        { name: "西藏", value: 9 },
        { name: "陕西", value: 80 },
        { name: "甘肃", value: 56 },
        { name: "青海", value: 10 },
        { name: "宁夏", value: 18 },
        { name: "新疆", value: 120 },
        { name: "广东", value: 193 },
        { name: "广西", value: 59 },
        { name: "海南", value: 14 }
    ];
    // 1.先拿到地图的 geo json 对象
    geoCoordMap: GeoCoordMap = china_geojson.features.reduce((accumulate: any, currentValue) => {
        // 地区名称， 地区经纬度
        accumulate[currentValue.properties.name] = currentValue.properties.cp;
        return accumulate;
    }, {});
    ztmapRef = createRef<HTMLDivElement>();

    componentDidMount(): void {
        const chartDom = this.ztmapRef.current;
        console.log("chartDom:", chartDom);
        echarts.registerMap(this.mapName, china_geojson);

        this.echartInstance = echarts.getInstanceByDom(chartDom as HTMLDivElement);
        console.log("this.echartInstance:", this.echartInstance);
        if (!this.echartInstance) {
            this.echartInstance = echarts.init(chartDom as HTMLDivElement);
        }
        console.log("this.echartInstance:", this.echartInstance);

        // 获取地图数据
        console.log("geoCoordMap=>", this.geoCoordMap);

        // this.echartInstance.showLoading();
        this.echartInstance.setOption(this.getOption());
        // this.echartInstance.hideLoading();

        window.addEventListener("resize", this.echartResize);
    }

    componentDidUpdate(): void {
        console.log("componentDidUpdate provincesDatasource:", this.props.provincesDatasource);
        if (this.props.provincesDatasource?.status === "available") {
            this.dataProvince = this.props.provincesDatasource.items!.map(item => ({
                name: this.props.provincesLabelAttribute?.get(item).value,
                value: Number(this.props.provincesValueAttribute?.get(item).value)
            })) as DataItem[];
        }
        this.echartInstance.setOption(this.getOption());
    }

    componentWillUnmount(): void {
        console.log("componentWillUnmount~");
        window.removeEventListener("resize", this.echartResize);
        echarts.dispose(document.getElementById("ztmap") as HTMLDivElement);
    }

    coverData(data: DataItem[]): CoverData[] {
        return data
            .map(item => {
                const geoRecord = this.geoCoordMap[item.name];
                return geoRecord
                    ? {
                          name: item.name,
                          value: [...geoRecord, item.value]
                      }
                    : undefined;
            })
            .filter(item => !!item) as CoverData[];
    }

    getOption(): any {
        const option = {
            tooltip: {
                show: true,
                formatter: "{a}</br>{b}:{c}"
            },
            geo: {
                // 注册一个地理坐标系组件( 给散点图用 )
                map: this.mapName,
                roam: false,
                layoutCenter: ["50%", "50%"],
                layoutSize: "120%",
                label: { show: true, color: "#8a877e" },
                // aspectScale: 1.5, // 缩放地图
                itemStyle: {
                    areaColor: "#091220", // 地图区域的颜色。
                    borderColor: "#8a877e" // 图形的描边颜色。 #fa8c16
                },
                emphasis: {
                    itemStyle: { areaColor: "#373e4a" },
                    label: { color: "white" }
                }
            },
            series: [
                {
                    name: "中国地图",
                    type: "map",
                    map: this.mapName,
                    data: this.dataProvince,
                    geoIndex: 0,
                    // 地图样式
                    itemStyle: {
                        areaColor: "#091220",
                        borderColor: "#b6a873"
                    },
                    label: {
                        show: true,
                        color: "white"
                    },
                    emphasis: {
                        itemStyle: { areaColor: "#373e4a" },
                        label: { color: "white" }
                    },
                    select: {
                        itemStyle: { areaColor: "#373e4a" },
                        label: { color: "white" }
                    }
                },
                {
                    name: "散点图数据",
                    type: "effectScatter",
                    geoIndex: 0,
                    coordinateSystem: "geo",
                    data: this.coverData(this.dataProvince),
                    symbolSize(val: number[]) {
                        return val[2] / 10;
                    },
                    itemStyle: {
                        color: "#fa8c16",
                        shadowBlur: 10,
                        shadowColor: "#fa8c16"
                    },
                    tooltip: {
                        show: true,
                        trigger: "item",
                        formatter(params: { data: any; seriesName: any }) {
                            console.log("params:", params);
                            const data = params.data;
                            return `${params.seriesName} <div style="margin:5px 0px;"/> ${data.name} ${data.value[2]}`;
                        }
                    }
                }
            ]
        };
        return option;
    }

    render(): ReactNode {
        return (
            <div className="widget-hello-world" style={{ width: "100%", height: "100%" }}>
                {/* Hello {this.props.sampleText} */}
                <div id="ztmap" style={{ width: "100%", height: "100%" }} ref={this.ztmapRef}></div>
            </div>
        );
    }
}
