/// <reference types="react" />
import { Component } from '../baseComponent';
declare type Props = {
    codeLength?: number;
};
declare type State = {
    verificationCode: string;
    drawImageText: string;
    errorTips: string;
    inputImageNumberErrorStatus: boolean;
    imageVerificationResult: boolean;
};
export declare class ImageVerification extends Component<Props, State> {
    state: State;
    static defaultProps: {
        codeLength: number;
    };
    componentDidMount(): void;
    canvasRef: any;
    getCanvasRef: (ref: any) => void;
    refreshImage: () => void;
    drawVerificationCode: () => void;
    onBlur(): void;
    onVerificationCodeChange: (event: any) => void;
    render(): JSX.Element;
}
export {};
