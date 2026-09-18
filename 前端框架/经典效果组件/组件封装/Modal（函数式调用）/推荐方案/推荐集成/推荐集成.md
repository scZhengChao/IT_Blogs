# 推荐集成

## 目录

- [支持拖拽](#支持拖拽)

* umi的useModel
* react 的 context；然后把context 改成 hooks

# 支持拖拽

```typescript title="useModalHooks"
import React, { useContext } from 'react';
import type { SafeAny } from '../types/models/base.model';
import type {
  ComposeConfigOptions,
  EbeeModalInstance,
} from '../components/EbeeModal/hooks/useModalHook';
export interface ModalStoreState {
  openModal: <T = SafeAny, K = SafeAny>(props: ComposeConfigOptions) => EbeeModalInstance<T, K>;
  openDrawer: <T = SafeAny, K = SafeAny>(props: ComposeConfigOptions) => EbeeModalInstance<T, K>;
}
export const CustomModalContext = React.createContext<ModalStoreState | undefined>(undefined);
export const useEbeeModal = (): ModalStoreState => {
  const modalContext = useContext(CustomModalContext);
  return modalContext as ModalStoreState;
};
```


```typescript title="app.tsx"
export function rootContainer(container: ReactNode) {
  return <CustomModalProvider>{container}</CustomModalProvider>;
}
```


```typescript title="CustomModalProvider"
import type React from 'react';
import useModalHook, {
  ComposeConfigOptions,
  PatchModalTypeEnums,
} from '@ebee/common/components/EbeeModal/hooks/useModalHook';
import { CustomModalContext } from '@ebee/common/hooks/useModalHook';
import { useRef } from 'react';
import Draggable, { DraggableProps } from 'react-draggable';
import { v4 } from 'uuid';

const CustomModalProvider: React.FC<React.PropsWithChildren> = (props) => {
  const { children } = props;
  const [showModal, contextHolder] = useModalHook();
  const contextHolderValue = useRef(contextHolder);
  const providerValue = useRef({
    openDrawer: (props: ComposeConfigOptions) => showModal(PatchModalTypeEnums.抽屉, props),
    openModal: <T, K>(modalProps: ComposeConfigOptions) =>
      showModal<T, K>(PatchModalTypeEnums.弹框, modalProps),
    openDragModal: <T, K>(modalProps: ComposeConfigOptions, dragProps: DraggableProps) => {
      const dragClass = `drag-${v4()}`;
      return showModal<T, K>(PatchModalTypeEnums.弹框, {
        ...modalProps,
        wrapClassName: `${dragClass} ${modalProps?.wrapClassName ?? ''}`,
        modalRender: (modal: React.ReactNode) => (
          <Draggable handle={`.${dragClass} .ant-modal-header`} {...dragProps}>
            {modal}
          </Draggable>
        ),
      });
    },
  });
  return (
    <CustomModalContext.Provider value={providerValue.current}>
      {children}
      {contextHolderValue.current}
    </CustomModalContext.Provider>
  );
};
export default CustomModalProvider;
```
