/// <reference types="react" />
import { Component } from '../baseComponent';
declare type Props = {
    btnText: string;
};
declare type State = {
    isBtnEnable: boolean;
};
export declare class Submit extends Component<Props, State> {
    constructor(props: Props);
    setSubmitStatus: (enable: boolean) => void;
    onClick: () => void;
    render(): JSX.Element;
}
export {};
