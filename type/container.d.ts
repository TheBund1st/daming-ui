import * as React from 'react';
import { SmsvStore } from './smsvStore';
declare type Props = {
    onFetchCode: (phoneNumber: string) => Promise<string>;
    onVerifyCode: (params: {
        phoneNumber: string;
        code: string;
    }) => Promise<string>;
};
declare type State = {
    phoneNumber: string;
};
declare type ControlStatus = {
    isVerified: boolean;
    isCodeDependency: boolean;
};
export declare class Container extends React.Component<Props, State> {
    store: SmsvStore;
    smsvControlStatusCache: {
        [key: string]: ControlStatus;
    };
    children: any[];
    phoneNumber: string;
    constructor(props: Props);
    state: State;
    readonly smsvInfo: {
        code: string;
        phoneNumber: string;
    };
    generateChildren: () => void;
    onFetchCode: () => Promise<void>;
    onVerifyCode: () => Promise<void>;
    onSMSVStatusChange: (enable: boolean, componentKey: string) => void;
    updateCodeControlStatus: () => void;
    updateSubmitStatus: () => void;
    render(): JSX.Element;
}
export {};
