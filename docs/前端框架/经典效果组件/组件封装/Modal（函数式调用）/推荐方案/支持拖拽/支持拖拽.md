# 支持拖拽

[ antd modal拖拽，自定义modal拖拽react-draggable\_antd modal react-draggable-CSDN博客 文章浏览阅读2.8k次。这篇博客介绍了如何在antd低版本（^3.26.16）中实现拖拽功能，由于该版本不支持拖拽，作者通过引入'react-draggable'库并编写自定义Modal组件来实现拖动效果。文章包含完整的代码示例，展示了如何创建一个可拖动的Modal，并提供了CSS样式以完善用户体验。 https://blog.csdn.net/qq\_37815596/article/details/113876514](https://blog.csdn.net/qq_37815596/article/details/113876514 " antd modal拖拽，自定义modal拖拽react-draggable_antd modal react-draggable-CSDN博客 文章浏览阅读2.8k次。这篇博客介绍了如何在antd低版本（^3.26.16）中实现拖拽功能，由于该版本不支持拖拽，作者通过引入'react-draggable'库并编写自定义Modal组件来实现拖动效果。文章包含完整的代码示例，展示了如何创建一个可拖动的Modal，并提供了CSS样式以完善用户体验。 https://blog.csdn.net/qq_37815596/article/details/113876514")

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


可以进一步用 `uuid` 生成唯一`class`，封装默认`handle`
