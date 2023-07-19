/**
 * This file was generated from ChinaMap.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ListValue, ListAttributeValue } from "mendix";
import { Big } from "big.js";

export interface ChinaMapContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    provincesDatasource?: ListValue;
    provincesLabelAttribute?: ListAttributeValue<string>;
    provincesValueAttribute?: ListAttributeValue<Big>;
}

export interface ChinaMapPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    provincesDatasource: {} | { caption: string } | { type: string } | null;
    provincesLabelAttribute: string;
    provincesValueAttribute: string;
}
