import React, { ReactNode } from 'react';
interface Props {
    type: 'primary' | 'secondary';
    children?: ReactNode;
}
export declare const Button: ({ children, type }: Props) => React.JSX.Element;
export {};
