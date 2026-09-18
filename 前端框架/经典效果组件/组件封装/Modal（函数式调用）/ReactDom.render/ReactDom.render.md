# ReactDom.render

**获取不到context 等上下文**

```react tsx 
import { Modal } from 'antd';
import type { MouseEvent, FunctionComponent } from 'react';
import { useEffect, useState, useCallback } from 'react';
import type { ModalProps } from 'antd';
import debounce from 'lodash/debounce';
// @ts-ignore
import { UmiContext } from '@@/plugin-model/helpers/constant';
import ReactDOM from 'react-dom';
import './index.less';

interface IShowModalOption extends Omit<ModalProps, 'onOk' | 'onCancel'> {
  /** 内容区 */
  content?: FunctionComponent<{ close?: () => void; onOk: () => void; onCancel: () => void }>;
  /** confirm的回调 */
  onOk?: (e?: MouseEvent<HTMLDivElement>) => void | Promise<void | boolean>;
  onCancel?: () => void;
  /** 上下文 */
  context?: Record<string, unknown> | unknown;
}

export function showModal(props: IShowModalOption) {
  const div = document.createElement('div');
  document.body.appendChild(div);
  const Wrapper = () => {
    const {
      width = 400,
      content: Component,
      okText = '确认',
      cancelText = '取消',
      // 默认居中显示
      centered = true,
      onOk,
      className = '',
      context,
      maskClosable = true,
      destroyOnClose = true,
      ...others
    } = props;
    const [open, setOpen] = useState<boolean>(false);
    const [confirmLoading, setConfirmLoading] = useState<boolean>(false);

    useEffect(() => {
      setOpen(true);
      setConfirmLoading(false);
    }, []);

    // 关闭
    const close = () => {
      props?.afterClose?.();
      setOpen(false);
      setTimeout(() => {
        div.parentNode.removeChild(div);
      }, 200);
    };

    const cancel = useCallback(() => {
      props?.onCancel?.();
      close();
    }, []);

    async function handleOk() {
      if (confirmLoading) {
        return;
      }
      if (onOk) {
        setConfirmLoading(true);
        try {
          const resp = await onOk();
          if (resp === false) {
            setConfirmLoading(false);
            return;
          }
          close();
        } catch (e) {
          console.log('e: ', e);
          setConfirmLoading(false);
        }
      } else {
        close();
      }
    }

    // 防双击
    const onConfirm = debounce(handleOk, 300);
    return (
      <Modal
        {...others}
        open={open}
        width={width}
        maskStyle={{ backgroundColor: 'rgba(0,0,0,0.25)' }}
        maskClosable={maskClosable}
        destroyOnClose={destroyOnClose}
        centered={centered}
        className={`estate-modal ${className}`}
        onCancel={close}
        onOk={onConfirm}
        okButtonProps={{ loading: confirmLoading }}
        okText={okText}
        cancelText={cancelText}
      >
        {Component &&
          (context ? (
            <UmiContext.Provider value={context}>
              <Component close={close} onOk={onOk || close} onCancel={cancel} />
            </UmiContext.Provider>
          ) : (
            <Component close={close} onOk={onOk || close} onCancel={cancel} />
          ))}
      </Modal>
    );
  };
  ReactDOM.render(<Wrapper />, div);
}

export default { show: showModal };

```
