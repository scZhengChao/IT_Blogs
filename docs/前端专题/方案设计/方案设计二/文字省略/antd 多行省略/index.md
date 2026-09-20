# antd 多行省略

学习antd； 支持禁用展开

```javascript 
import React, { useMemo, useRef, useState } from 'react';
import runes from 'runes2';
import assignWith from 'lodash/assignWith';
import classNames from 'classnames';
import { useIsomorphicLayoutEffect, useMemoizedFn } from 'ahooks';

function withNativeProps(props, element) {
    const p = Object.assign({}, element.props);
    if (props.className) {
        p.className = classNames(element.props.className, props.className);
    }
    if (props.style) {
        p.style = Object.assign(Object.assign({}, p.style), props.style);
    }
    if (props.tabIndex !== undefined) {
        p.tabIndex = props.tabIndex;
    }
    for (const key in props) {
        if (!props.hasOwnProperty(key)) continue;
        if (key.startsWith('data-') || key.startsWith('aria-')) {
            p[key] = props[key];
        }
    }
    return React.cloneElement(element, p);
}
function useResizeEffect(effect, targetRef) {
    const fn = useMemoizedFn(effect);
    useIsomorphicLayoutEffect(() => {
        const target = targetRef.current;
        if (!target) return;
        if (window.ResizeObserver) {
            let animationFrame;
            const observer = new ResizeObserver(() => {
                animationFrame = window.requestAnimationFrame(() => fn(target));
            });
            observer.observe(target);
            return () => {
                window.cancelAnimationFrame(animationFrame);
                observer.disconnect();
            };
        } else {
            fn(target);
        }
    }, [targetRef]);
}
const eventToPropRecord = {
    'click': 'onClick'
};
function withStopPropagation(events, element) {
    const props = Object.assign({}, element.props);
    for (const key of events) {
        const prop = eventToPropRecord[key];
        props[prop] = function (e) {
            var _a, _b;
            e.stopPropagation();
            (_b = (_a = element.props)[prop]) === null || _b === void 0 ? void 0 : _b.call(_a, e);
        };
    }
    return React.cloneElement(element, props);
}
const classPrefix = `adm-ellipsis`;
const defaultProps = {
    direction: 'end',
    rows: 1,
    expandText: '',
    content: '',
    collapseText: '',
    stopPropagationForActionButtons: [],
    onContentClick: () => {},
    defaultExpanded: false,
    disabledExpand: false,
    expandClass: '',
    alwaysShowExpandText: false
};
function mergeProps(...items) {
    function customizer(objValue, srcValue) {
        return srcValue === undefined ? objValue : srcValue;
    }
    let ret = Object.assign({}, items[0]);
    for (let i = 1; i < items.length; i++) {
        ret = assignWith(ret, items[i], customizer);
    }
    return ret;
}
export const Ellipsis = p => {
    const props = mergeProps(defaultProps, p);
    const rootRef = useRef(null);
    const expandElRef = useRef(null);
    const collapseElRef = useRef(null);
    const [ellipsised, setEllipsised] = useState({});
    const [expanded, setExpanded] = useState(props.defaultExpanded);
    const [exceeded, setExceeded] = useState(false);
    const chars = useMemo(() => runes(props.content), [props.content]);
    function getSubString(start, end) {
        return chars.slice(start, end).join('');
    }
    function calcEllipsised() {
        var _a, _b;
        const root = rootRef.current;
        if (!root) return;
        const originDisplay = root.style.display;
        root.style.display = 'block';
        const originStyle = window.getComputedStyle(root);
        const container = document.createElement('div');
        const styleNames = Array.prototype.slice.apply(originStyle);
        styleNames.forEach(name => {
            container.style.setProperty(name, originStyle.getPropertyValue(name));
        });
        root.style.display = originDisplay;
        container.style.height = 'auto';
        container.style.minHeight = 'auto';
        container.style.maxHeight = 'auto';
        container.style.textOverflow = 'clip';
        container.style.webkitLineClamp = 'unset';
        container.style.display = 'block';
        const lineHeight = pxToNumber(originStyle.lineHeight);
        const maxHeight = Math.floor(lineHeight * (props.rows + 0.5) + pxToNumber(originStyle.paddingTop) + pxToNumber(originStyle.paddingBottom));
        container.innerText = props.content;
        document.body.appendChild(container);
        if (container.offsetHeight <= maxHeight) {
            setExceeded(false);
        } else {
            setExceeded(true);
            const end = props.content.length;
            const collapseEl = typeof props.collapseText === 'string' ? props.collapseText : (_a = collapseElRef.current) === null || _a === void 0 ? void 0 : _a.innerHTML;
            const expandEl = typeof props.expandText === 'string' ? props.expandText : (_b = expandElRef.current) === null || _b === void 0 ? void 0 : _b.innerHTML;
            const actionText = expanded ? collapseEl : expandEl;
            function check(left, right) {
                if (right - left <= 1) {
                    if (props.direction === 'end') {
                        return {
                            leading: getSubString(0, left) + '...'
                        };
                    } else {
                        return {
                            tailing: '...' + getSubString(right, end)
                        };
                    }
                }
                const middle = Math.round((left + right) / 2);
                if (props.direction === 'end') {
                    container.innerHTML = getSubString(0, middle) + '...' + actionText;
                } else {
                    container.innerHTML = actionText + '...' + getSubString(middle, end);
                }
                if (container.offsetHeight <= maxHeight) {
                    if (props.direction === 'end') {
                        return check(middle, right);
                    } else {
                        return check(left, middle);
                    }
                } else {
                    if (props.direction === 'end') {
                        return check(left, middle);
                    } else {
                        return check(middle, right);
                    }
                }
            }
            function checkMiddle(leftPart, rightPart) {
                if (leftPart[1] - leftPart[0] <= 1 && rightPart[1] - rightPart[0] <= 1) {
                    return {
                        leading: getSubString(0, leftPart[0]) + '...',
                        tailing: '...' + getSubString(rightPart[1], end)
                    };
                }
                const leftPartMiddle = Math.floor((leftPart[0] + leftPart[1]) / 2);
                const rightPartMiddle = Math.ceil((rightPart[0] + rightPart[1]) / 2);
                container.innerHTML = getSubString(0, leftPartMiddle) + '...' + actionText + '...' + getSubString(rightPartMiddle, end);
                if (container.offsetHeight <= maxHeight) {
                    return checkMiddle([leftPartMiddle, leftPart[1]], [rightPart[0], rightPartMiddle]);
                } else {
                    return checkMiddle([leftPart[0], leftPartMiddle], [rightPartMiddle, rightPart[1]]);
                }
            }
            const middle = Math.floor((0 + end) / 2);
            const ellipsised = props.direction === 'middle' ? checkMiddle([0, middle], [middle, end]) : check(0, end);
            setEllipsised(ellipsised);
        }
        document.body.removeChild(container);
    }
    useResizeEffect(calcEllipsised, rootRef);
    useIsomorphicLayoutEffect(() => {
        calcEllipsised();
    }, [props.content, props.direction, props.rows, props.expandText, props.collapseText]);
    const expandActionElement = !!props.expandText && withStopPropagation(props.stopPropagationForActionButtons, React.createElement("a", {
        ref: expandElRef,
        onClick: () => {
            if(p.disabledExpand) return
            setExpanded(true);
        },
        className:p.expandClass ?? ''
    }, props.expandText));
    const collapseActionElement = !!props.collapseText && withStopPropagation(props.stopPropagationForActionButtons, React.createElement("a", {
        ref: collapseElRef,
        onClick: () => {
            setExpanded(false);
        }
    }, props.collapseText));
    const renderContent = () => {
        if (!exceeded) return p.alwaysShowExpandText ? React.createElement(React.Fragment ,null,props.content ,expandActionElement): props.content;
        if (expanded) return React.createElement(React.Fragment, null, props.content, collapseActionElement);
        return React.createElement(React.Fragment, null, ellipsised.leading, expandActionElement, ellipsised.tailing);
    };
    return withNativeProps(props, React.createElement("div", {
        ref: rootRef,
        className: classPrefix,
        onClick: e => {
            if (e.target === e.currentTarget) {
                props.onContentClick(e);
            }
        }
    }, renderContent()));
};
function pxToNumber(value) {
    if (!value) return 0;
    const match = value.match(/^\d*(\.\d*)?/);
    return match ? Number(match[0]) : 0;
}


```
