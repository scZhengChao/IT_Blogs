# 推荐方案第二版

## 目录

- [customModal](#customModal)
  - [hooks](#hooks)
    - [useModalHook(tsx)](#useModalHooktsx)
    - [usePatchElementHook(tsx)](#usePatchElementHooktsx)
  - [global.less](#globalless)
  - [ModalPatch](#ModalPatch)
  - [DrawerPatch](#DrawerPatch)
- [models](#models)
  - [useCustomModal](#useCustomModal)

## customModal

### hooks

#### useModalHook(tsx)

```react tsx 
import * as React from 'react';
import usePatchElement from './usePatchElementHook';
import ModalPatch from '../ModalPatch';
import DrawerPatch from '../DrawerPatch';
import type { ModalPatchRef, ModalConfigOptions } from '../ModalPatch';
import type { DrawerPatchRef, DrawerConfigOptions } from '../DrawerPatch';
import type { SafeAny } from '../../../types/models/base.model';
import { _omit } from '../../../utils/lodash.util';

export type ComposeConfigOptions = ModalConfigOptions & DrawerConfigOptions;
type ComposeHookRef = DrawerPatchRef & ModalPatchRef;
let uuid = 0;
interface ElementsHolderRef {
  patchElement: ReturnType<typeof usePatchElement>[1];
}
export enum PatchModalTypeEnums {
  弹框 = 'modal',
  抽屉 = 'drawer',
}
const ElementsHolder = React.memo(
  React.forwardRef<ElementsHolderRef>((_props, ref) => {
    const [elements, patchElement] = usePatchElement();
    React.useImperativeHandle(
      ref,
      () => ({
        patchElement,
      }),
      [],
    );
    return <>{elements}</>;
  }),
);

export default function useModalHook() {
  const holderRef = React.useRef<ElementsHolderRef>();

  function showModal(type: PatchModalTypeEnums, config: ComposeConfigOptions) {
    uuid += 1;
    const modalRef = React.createRef<ComposeHookRef>();
    let promiseResolve: Function;
    let promiseReject: Function;
    let promise: Promise<SafeAny> = new Promise((resolve, reject) => {
      promiseResolve = resolve;
      promiseReject = reject;
    });
    let hasCatch: boolean = false;
    const responseObj = {
      then: <T, K = SafeAny>(resolve: (value: T) => SafeAny, reject?: (data?: K) => void) => {
        promise = promise.then(resolve, reject);
        return responseObj;
      },
      modalRef,
      finally: (fn: () => void) => {
        promise = promise.finally(fn);
        return responseObj;
      },
      catch: <K,>(reject: (data?: K) => SafeAny) => {
        promise = promise.catch(reject);
        return responseObj;
      },
    };
    const onOk = async (data?: SafeAny) => {
      await config?.onOk?.(data);
      promiseResolve(data);
    };
    const onCancel = (data?: SafeAny) => {
      config?.onCancel?.(data);
      if (hasCatch) {
        promiseReject(data);
        hasCatch = false;
      }
    };
    const closeFunc = holderRef.current?.patchElement(getNode());

    function getNode() {
      switch (type) {
        case PatchModalTypeEnums.弹框: {
          return (
            <ModalPatch
              key={`modal-${uuid}`}
              config={_omit(config, ['onOk', 'onCancel'])}
              ref={modalRef}
              onOk={onOk}
              onCancel={onCancel}
              afterClose={() => {
                config?.afterClose?.();
                closeFunc?.();
              }}
            />
          );
        }
        case PatchModalTypeEnums.抽屉: {
          return (
            <DrawerPatch
              key={`drawer-${uuid}`}
              config={_omit(config, ['onOk', 'onCancel'])}
              ref={modalRef}
              onCancel={onOk}
              afterOpenChange={(open: boolean) => {
                if (!open) {
                  config?.afterOpenChange?.(open);
                  closeFunc?.();
                }
              }}
            />
          );
        }
        default: {
          return null;
        }
      }
    }
    Object.defineProperty(responseObj, 'catch', {
      get: function getter() {
        hasCatch = true;
        return <K,>(reject: (data?: K) => void) => {
          promise = promise.catch(reject);
          return responseObj;
        };
      },
    });
    return responseObj;
  }
  return [showModal, <ElementsHolder ref={holderRef} />] as [typeof showModal, React.ReactNode];
}


```


#### usePatchElementHook(tsx)

```react tsx 
import * as React from 'react';
export default function usePatchElementHook(): [
  React.ReactElement[],
  (element: React.ReactElement) => Function,
] {
  const [elements, setElements] = React.useState<React.ReactElement[]>([]);

  const patchElement = React.useCallback((element: React.ReactElement) => {
    setElements((originElements) => [...originElements, element]);

    return () => {
      setElements((originElements) => originElements.filter((ele) => ele !== element));
    };
  }, []);

  return [elements, patchElement];
}

```


### global.less

```react tsx 
.common-context-modal {
  top: 60px !important;
  .ant-modal-content {
    border-radius: 8px;
    overflow: hidden;
    .common-context-modal-wrapper {
      overflow-y: auto;
    }

    .ant-modal-body {
      line-height: 1.5;
      min-height: 100px;
    }

    .ant-modal-footer {
      border: none;
      padding: 0 24px 24px;
    }
  }
}
.no-footer-line {
  :global {
    .ant-modal-footer {
      border: none !important;
      padding: 0 24px 24px;
    }
  }
}
.no-title-line {
  :global {
    .ant-modal-header {
      border: none !important;
    }
  }
}
.common-context-drawer {
  .ant-drawer-content {
    border-bottom-left-radius: 8px;
    border-top-left-radius: 8px;
    .ant-drawer-body {
      overflow: hidden;
      line-height: 1.5;
    }
    .common-context-drawer-wrapper {
      overflow-y: auto;
      height: 100%;
    }
  }
}
```


### ModalPatch

```react tsx 
import { useState, useImperativeHandle, forwardRef, cloneElement, useEffect, useRef } from 'react';
import type {
  ForwardRefRenderFunction,
  FunctionComponentElement,
  ReactElement,
  JSXElementConstructor,
  ForwardedRef,
} from 'react';
import { Modal } from 'antd';
import type { ModalProps } from 'antd';
import { useBoolean } from 'ahooks';
import type { SafeAny } from '@ebee/common/types/models/base.model';
export interface ModalConfigOptions extends Omit<ModalProps, 'onOk' | 'onCancel'> {
  content?:
  | FunctionComponentElement<{ ref: SafeAny }>
  | ReactElement<SafeAny, string | JSXElementConstructor<SafeAny>>;
  contentProps?: SafeAny;
  needRef?: boolean;
  onOk?: (data?: SafeAny) => Promise<SafeAny>;
  onCancel?: (data?: SafeAny) => void;
  onMounted?: (ref: ForwardedRef<ModalPatchRef>) => void;
  maxHeight?: number;
  noFooterLine?: boolean;
  className?: string;
  noTitleLine?: boolean;
  footer: ReactElement<SafeAny, string | JSXElementConstructor<SafeAny>>;
}

export interface ModalPatchProps {
  afterClose: () => void;
  config: ModalConfigOptions;
  onOk?: (data?: SafeAny) => Promise<SafeAny>;
  onCancel?: (data?: SafeAny) => void;
}

export interface ModalPatchRef {
  destroy: () => void;
  update: (config: ModalConfigOptions) => void;
}

const ModalPatch: ForwardRefRenderFunction<ModalPatchRef, ModalPatchProps> = (props, ref) => {
  const { afterClose, config, onOk, onCancel } = props;
  const [open, setOpen] = useState<boolean>(true);
  const [innerConfig, setInnerConfig] = useState<ModalConfigOptions>(config);
  const [confirmLoading, { setTrue, setFalse }] = useBoolean(false);
  const update = (newConfig: ModalConfigOptions) => {
    setInnerConfig((originConfig) => ({
      ...originConfig,
      ...newConfig,
    }));
  };

  const {
    content,
    okText,
    cancelText = '取消',
    destroyOnClose = true,
    width = 450,
    maxHeight = 400,
    title = '标题',
    centered = true,
    needRef = false,
    contentProps = {}, // 针对闭包带来的组件不更新的问题；注意：defaultvalue等类似属性是不行的
    footer,
    onMounted,
    noFooterLine = false,
    noTitleLine = false,
    className,
    ...rest
  } = innerConfig;

  const onClose = async () => {
    try {
      await onCancel?.();
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  };
  const componentRef = useRef();
  const contentRef = (content as FunctionComponentElement<{ ref: SafeAny }>)?.ref ?? componentRef;

  const onHandleOk = async (data?: SafeAny) => {
    try {
      setTrue();
      await onOk?.(data ?? contentRef.current);
      setOpen(false);
    } catch (e) {
      console.error(e);
    } finally {
      setFalse();
    }
  };
  useImperativeHandle(ref, () => ({
    destroy: onClose,
    update,
  }));
  useEffect(() => {
    onMounted?.(ref);
  }, []);
  return (
    <Modal
      className={cx(
        {
          'common-context-modal': true,
          'no-footer-line': noFooterLine,
          'no-title-line': noTitleLine,
        },
        className,
      )}
      title={title}
      width={width}
      destroyOnClose={destroyOnClose}
      open={open}
      afterClose={afterClose}
      okText={okText}
      centered={centered}
      cancelText={cancelText}
      onCancel={onClose}
      okButtonProps={{ loading: confirmLoading, disabled: confirmLoading }}
      onOk={() => onHandleOk()}
      footer={footer && cloneElement(footer,{
        onClose,
        update,
        onOk: onHandleOk,
        confirmLoading,
        contentRef:contentRef.current
      })}
      {...rest}
    >
     <div className={'common-context-modal-wrapper'} style={{ maxHeight }}>
      {cloneElement(content, {
        ...contentProps,
        onClose,
        update,
        onOk: onHandleOk,
        confirmLoading,
        ref: needRef ? contentRef : undefined,
      })}
      </div>
    </Modal>
  );
};

export default forwardRef(ModalPatch);


```


### DrawerPatch

```react tsx 
import {
  useState,
  useImperativeHandle,
  forwardRef,
  cloneElement,
  useEffect,
  ForwardedRef,
} from 'react';
import type { ForwardRefRenderFunction, ReactElement } from 'react';
import { Drawer } from 'antd';
import type { DrawerProps } from 'antd';
import type { SafeAny } from '@ebee/common/types/models/base.model';

export interface DrawerConfigOptions extends DrawerProps {
  content?: ReactElement;
  onCancel?: () => void;
  contentProps?: SafeAny;
  onMounted?: (ref: ForwardedRef<DrawerPatchRef>) => void;
}

export interface DrawerPatchProps {
  afterOpenChange?: (open: boolean) => void;
  config: DrawerConfigOptions;
  onCancel?: (data?: SafeAny) => void;
}

export interface DrawerPatchRef {
  destroy: () => void;
  update: (config: DrawerConfigOptions) => void;
}

const DrawerPatch: ForwardRefRenderFunction<DrawerPatchRef, DrawerPatchProps> = (props, ref) => {
  const { afterOpenChange, config, onCancel } = props;
  const [open, setOpen] = useState<boolean>(true);
  const [innerConfig, setInnerConfig] = useState<DrawerConfigOptions>(config);

  const update = (newConfig: DrawerConfigOptions) => {
    setInnerConfig((originConfig) => ({
      ...originConfig,
      ...newConfig,
    }));
  };

  const {
    content,
    destroyOnClose = true,
    width = 600,
    title = '标题',
    contentProps = {},
    onMounted,
    ...rest
  } = innerConfig;
  const onClose = async (data?: SafeAny) => {
    await onCancel?.(data);
    setOpen(false);
  };

  useImperativeHandle(ref, () => ({
    destroy: onClose,
    update,
  }));
  useEffect(() => {
    onMounted?.(ref);
  }, []);
  return (
    <Drawer
      className={'common-context-drawer'}
      title={title}
      width={width}
      destroyOnClose={destroyOnClose}
      open={open}
      afterOpenChange={afterOpenChange}
      onClose={onClose}
      {...rest}
    >
      <div className={'common-context-drawer-wrapper'}>
        {cloneElement(content, {
          ...contentProps,
          onClose,
          update,
        })}
      </div>
    </Drawer>
  );
};

export default forwardRef(DrawerPatch);


```


## models

#### useCustomModal

```react tsx 
import useModalHook, { PatchModalTypeEnums } from '@/components/EbeeModal/hooks/useModalHook';
import type { ComposeConfigOptions } from '@/components/EbeeModal/hooks/useModalHook';
import type { SafeAny } from '@ebee/common/types/models/base.model';

export default function useEbeeModal() {
  const [showModal, contextHolder] = useModalHook();
  const openModal = <T = SafeAny>(props: ComposeConfigOptions): Promise<T> =>
    showModal(PatchModalTypeEnums.弹框, props);
  const openDrawer = <T = SafeAny>(props: ComposeConfigOptions): Promise<T> =>
    showModal(PatchModalTypeEnums.抽屉, props);
  return {
    openModal,
    openDrawer,
    contextHolder,
  };
}

```
