AOP案例

## 目录

- [测量业务层接口万次执行效率  ](#测量业务层接口万次执行效率)
- [AOP通知获取数据  ](#AOP通知获取数据)
- [AOP通知获取异常数据（了解）  ](#AOP通知获取异常数据了解)
- [案例：百度网盘密码数据兼容处理  ](#案例百度网盘密码数据兼容处理)

测量业务层接口万次执行效率

![](./assets/image/image_i0i_MkJB01.webp)

![](./assets/image/image_WPIT_D0I3D.webp)

![](./assets/image/image_P1OhfEnQrI.webp)

AOP通知获取数据

![](./assets/image/image_mlr-6cke2B.webp)

获取切入点方法的参数

- **JoinPoint：适用于前置、后置、返回后、抛出异常后通知**
- **ProceedJointPoint：适用于环绕通知**

获取切入点方法返回值
返回后通知
环绕通知
获取切入点方法运行异常信息
抛出异常后通知
环绕通知

![](./assets/image/image_fMXejuO1qV.webp)

![](./assets/image/image_ipU2S7I_ex.webp)

AOP通知获取异常数据（了解）

![](./assets/image/image_4aN6LZN7nV.webp)

![](./assets/image/image_Pb8U17Gi6y.webp)

案例：百度网盘密码数据兼容处理

![](./assets/image/image_p8tZTWHHLC.webp)
