import { SpringConfig } from '@react-spring/web';
import React, { CSSProperties, ReactNode } from 'react';
/**
 * LiftUpProps is the props interface for LiftUp.
 */
export type LiftUpProps = {
    /**
     * Whether or not the LiftUp component is active.
     */
    readonly active?: boolean | undefined;
    /**
     * The delay between each character.
     */
    readonly charDelay?: number | ((i: number) => number) | undefined;
    /**
     * The delay between each line.
     */
    readonly lineDelay?: number | ((i: number) => number) | undefined;
    /**
     * The spring config for the animation.
     */
    readonly springConfig?: SpringConfig | undefined;
    /**
     * The width of the space character.
     */
    readonly spaceWidth?: CSSProperties['width'] | ((char: string) => CSSProperties['width']) | undefined;
    /**
     * The children of the LiftUp component.
     */
    readonly children?: ReactNode | undefined;
    /**
     * The class name for the LiftUp component.
     */
    readonly className?: string | undefined;
    /**
     * The style for the LiftUp component.
     */
    readonly style?: CSSProperties | undefined;
};
/**
 * LiftUp is a component that animates its children in a way that resembles
 */
export declare const LiftUp: {
    ({ active, charDelay, lineDelay, springConfig, spaceWidth, children, className, style, }: LiftUpProps): React.JSX.Element;
    /**
     * LiftUpItem is a component that animates its children in a way that resembles
     */
    Item: ({ springConfig, spaceWidth, children, }: LiftUpItemProps) => React.JSX.Element;
};
/**
 * The props interface for LiftUpItem.
 */
export type LiftUpItemProps = {
    /**
     * The spring config for the animation.
     */
    readonly springConfig?: SpringConfig | undefined;
    /**
     * The width of the space character.
     */
    readonly spaceWidth?: CSSProperties['width'] | ((char: string) => CSSProperties['width']) | undefined;
    /**
     * The children of the LiftUpItem component.
     */
    readonly children?: ReactNode | undefined;
};
