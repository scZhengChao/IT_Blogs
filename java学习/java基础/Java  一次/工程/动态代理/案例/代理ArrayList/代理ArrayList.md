# 代理ArrayList

对`Collection`接口的子类`ArrayList`进行代理，以前的`remove(Object obj)`方法是删除集合中第一次出现的元素(比如集合中有多个“`abc`”,调用`remove`(“abc”)后只会删除一个元素)。代理后，要求在调用remove(Object obj)方法后，能够删除集合中所有匹配的元素【动态代理】

```java 
list.add("abc");
list.add("nba");
list.add("abc");

list.remove("abc");//只会删除第一个"abc"
//动态代理：代理remove方法， 实现删除所有的"abc"


/////////////////////////////////////////////////////////////////////////////////////
ArrayList<String> list = new ArrayList<>(); //被代理对象

//创建list的代理对象
List proxyList = Proxy.newProxyInstance( 
                    //类加载器
                    ArrayList.class.getClassLoader(),

                    //父接口（ArrayList类所有的父接口）
                    list.getClass().getInterfaces(),

                    //处理器 ： 拦截所执行方法 （如：add方法、remove方法）
                    new InvocationHandler(){
                        public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                        //Object proxy    代理对象 （不使用）
                        //Method method   所的执行方法对象   
                        //Object[] args   方法中的参数 


                            //记录返回值
                            Object returnValue = null;

                            //先执行原有的方法
                            returnValue = method.invoke( list ,  args );

                            //获取方法的名字，判断是：remove方法，才进行增强
                            String methodName = method.getName();

                            if(methodName.equals("remove")){

                                //使用迭代器，删除集合所有元素


                            }


                            //返回方法的执行结果
                            return returnValue;
                        }
                    }


                 );


//使用代理对象，向集合中添加元素
proxyList.add("abc");
proxyList.add("nba");
proxyList.add("abc");

//使用代理对象，从集合中删除所有的"abc"元素
proxyList.remove("abc");


```


```java 
public class Test1 {
    //要求在调用集合中的remove(Object obj)方法后，能够删除集合中所有匹配的元素【动态代理】
    public static void main(String[] args) {
        //集合对象（被代理类）
        ArrayList<String> list = new ArrayList<>();
        //传统ArrayList集合中的remove方法，只能删除一个元素

        //动态代理：代理ArrayList集合对象
        ClassLoader classLoader = ArrayList.class.getClassLoader();//类加载器
        Class[] interfaces = ArrayList.class.getInterfaces();//被代理类(ArrayList)的父接口的Class类型数组
        //处理器对象（拦截代理对象所调用的方法）
        InvocationHandler handler = new InvocationHandler() {
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                //Object  proxy : 代理对象本身
                //Method  method : 执行的方法对象
                //Object[] args : 所执行方法中的参数
                //System.out.println("方法中传递的参数："+Arrays.toString(args));

                //第1步：执行原有方法功能
                Object returnResult = method.invoke(list, args);

                //后增强：执行完原有方法后在进行功能扩展增强
                //第2步：判断是否为remove方法（增强方法）
                if ("remove".equals(method.getName())) {
                    //第3步：使用迭代器遍历删除集合中的元素
                    Iterator<String> it = list.iterator();
                    while (it.hasNext()) {
                        String str = it.next();
                        //args[0] ： 就是remove("abc")中的"abc"
                        if (args[0].equals(str)) {
                            it.remove();
                        }
                    }
                }
                return returnResult;
            }
        };
        List proxyList = (List) Proxy.newProxyInstance(classLoader, interfaces, handler);

        //使用集合代理对象，调用方法
        proxyList.add("abc");
        proxyList.add("cba");
        proxyList.add("abc");
        proxyList.add("abc");
        proxyList.add("cba");

 //使用集合代理对象，调用remove方法，删除集合中所有的"abc"元素
        proxyList.remove("abc");


        System.out.println(list);
    }
}

```
