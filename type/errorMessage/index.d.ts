/// <reference types="react" />
import { Component } from '../baseComponent';
declare type Props = {};
declare type State = {
    error: string;
};
export declare class ErrorMessage extends Component<Props, State> {
    constructor(props: Props);
    setErrorMessage: (error: any) => void;
    render(): JSX.Element;
}
export {};
