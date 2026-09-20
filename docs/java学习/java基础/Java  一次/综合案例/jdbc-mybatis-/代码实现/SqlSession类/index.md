# SqlSession类

- 作用：
  1. 解析@Select、@ResultType注解
  2. 和数据库交互
  3. 把数据结果封装到指定的对象中

```java 
@SuppressWarnings("all")
public class SqlSession {
    /**
     * 动态代理
     */     
      //clazz = UserMapper.class
      //clazz = StudentMapper.class
    public <T> T getMapper( Class<T> clazz ) {

        //类加载器： 负责加载代理类到内存中
        ClassLoader classLoader = SqlSession.class.getClassLoader();
         
        //父接口
        Class[] interfaces = {clazz};
        
        T mapperProxy = (T) Proxy.newProxyInstance(classLoader, interfaces, new InvocationHandler() {

            //在调用方法时，代理对象执行invoke方法，返回List
            @Override
            public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
                //创建核心配置类对象
                Configuration config = new Configuration();


                /******** 解析 @Select、@ResultType *******/
                //config.getInterName() 获取接口的全路径名称  例：com.itheima.UserMapper
                Class clazz = Class.forName(config.getInterName());

                Method[] methods = clazz.getMethods();//获取到接口中所有的方法

                //遍历数组
                for (Method m : methods) {
                    //判断是否有注解
                    boolean boo = m.isAnnotationPresent(Select.class);

                    boolean boo2 = m.isAnnotationPresent(ResultType.class);

                    if (boo && boo2) {
                        //获取@Select注解对象
                        Select select = m.getAnnotation(Select.class);
                        
                        //获取属性值
                        String[] value = select.value();//{"select * from user"}
                        String sql = value[0];//select * from user
                        //给Mapper对象中的sql成员变量赋值
                        config.getMapper().setSql(sql);

                        //获取@ResultType注解对象
                        ResultType resultType = m.getAnnotation(ResultType.class);
                        String type = resultType.value();//获取属性值
                        config.getMapper().setResultType(type);
                    }
                }
                /*******************************/

                //获取映射对象
                Mapper mapper = config.getMapper();
                //利用映射对象，获取sql语句
                String sql = mapper.getSql();

                //利用映射对象，获取类型
                String resultType = mapper.getResultType();

                //通用型JDBC框架：考虑查询的结果类型是不同
                //为了保障结果类型统一， 把所有的结果类型当作Class对象
                Class cl = Class.forName(resultType);


                //获取数据库连接池对象
                DataSource ds = config.getDataSource();

                //利用连接池对象，获取Connection对象
                Connection conn = ds.getConnection();

                //调用自定义方法： 执行sql查询语句
                //参数1：Connection对象     
                //参数2：要执行的sql语句（select.....）
                //参数3：select查询语句的结果要封装到指定的类型对象中
                List list = queryForList(conn, sql, cl);

                return list;
            }
        });
                //代理对象返回给getMapper的调用者     UserMapper mapper = sqlSession.getMapper(UserMapper.class);//mapperProxy
        return mapperProxy;
    }

   public List queryForList(Connection conn, String sql, Class clazz) throws SQLException, NoSuchMethodException, IllegalAccessException, InvocationTargetException, InstantiationException {
        List userList = new ArrayList();

        //通过连接对象得到预编译的语句对象
        PreparedStatement ps = conn.prepareStatement(sql);

        //执行SQL语句，得到结果集
        ResultSet rs = ps.executeQuery();
        
        while (rs.next()) {
            //获取构造方法对象，并实例化
            Object user = clazz.getConstructor().newInstance();

            //获取所有的成员变量（包含私有成员变量）
            Field[] fields = clazz.getDeclaredFields();

            for (Field field : fields) { //field可以是：id name passwd age gender ...
                //得到成员变量的名字
                String name = field.getName();

                //暴力破解： 取消权限检查
                field.setAccessible(true);

                //rs.getObject(name) 表示根据数据表的列名取出数据表中的列值 因为User类中的成员变量名必须和数据表列名一致
                //例如： name 的值是birthday 那么这里 rs.getObject(name)---》rs.getObject("age")获取数据表的年龄20
                Object table_value = rs.getObject(name);

                //void set(Object obj, Object value)给成员变量赋值，参数1：对象名 参数2：要赋的值
                field.set(user, table_value);

            }
            //user对象添加到集合中
            userList.add(user);
        }

        //释放资源
        rs.close();
        ps.close();
        conn.close();

        //返回集合
        return userList;
    }
}



```
