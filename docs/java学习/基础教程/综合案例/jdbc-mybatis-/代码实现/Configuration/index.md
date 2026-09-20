# Configuration

- 作用：读取配置文件
  - 配置文件名称被固定了：config.xml

```java 
/*配置类
  1. 解析XML文件
  2. 创建C3P0连接池
*/
public class Configuration {
    /* 定义数据库连接对象相关属性 */
    private String driver;//驱动
    private String url;//连接地址
    private String username;//登录名
    private String password;//密码

    /* Mapper接口的全名称 */
    private String interName;

    /* 数据库连接池对象 */
    private DataSource dataSource;

    /* 映射类对象 */
    private Mapper mapper = new Mapper();


    //无参构造方法
    public Configuration() {
        try {
            //解析"config.xml"文件
            SAXReader reader = new SAXReader();
            InputStream is = Configuration.class.getClassLoader().getResourceAsStream("config.xml");
            Document doc = reader.read(is);

            //调用自定义方法： 将核心配置文件中的数据封装到Configuration类的属性中
            loadConfigXml(doc);

            //调用自定义方法： 初始化数据库连接池对象
            createDataSource();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    
    
    //初始化数据库连接池对象
    private void createDataSource() throws Exception {
        //创建c3p0核心类对象
        ComboPooledDataSource cpds = new ComboPooledDataSource();

        //使用对象调用方法将四大连接参数给数据库连接池
        cpds.setDriverClass(driver);
        cpds.setJdbcUrl(url);
        cpds.setUser(username);
        cpds.setPassword(password);

        //将cpds赋值给成员变量ds
        this.dataSource = cpds;//数据库连接池对象
    }


    //将核心配置文件中的数据封装到Configuration类属性中
    private void loadConfigXml(Document doc) {
        /*
        //使用document对象调用方法获取property标签：
        <property name="driver" value="com.mysql.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://127.0.01:3306/itheima"/>
        <property name="username" value="root"/>
        <property name="password" value="itheima"/>
        */
        List<Node> list = doc.selectNodes("//property");

        //遍历List集合
        for (Node node : list) {
            //强制转换
            Element e = (Element) node;
            //获取property标签的name属性值
            String name = e.attributeValue("name");//双引号中的name是property标签的name属性 driver
            //获取property标签的value属性值
            String value = e.attributeValue("value");//双引号中的value是property标签的value属性 com.mysql.jdbc.Driver

            //将value的值赋值给成员变量
            switch (name) {
                case "driver":
                    this.driver = value;//数据库驱动
                    break;
                case "url":
                    this.url = value;//连接url
                    break;
                case "username":
                    this.username = value;//登录名
                    break;
                case "password":
                    this.password = value;//密码
                    break;
            }
        }

        //<package name="xxx.xxx.UserMapper"></package>
        Node node = doc.selectSingleNode("//package");
        Element e = (Element) node;
        //Mapper接口的全名称
        this.interName = e.attributeValue("name");//"xxx.xxx.UserMapper"
    }

    
    public String getDriver() {
        return driver;
    }

    public void setDriver(String driver) {
        this.driver = driver;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getInterName() {
        return interName;
    }

    public void setInterName(String interName) {
        this.interName = interName;
    }

    public DataSource getDataSource() {
        return dataSource;
    }

    public void setDataSource(DataSource dataSource) {
        this.dataSource = dataSource;
    }

    public Mapper getMapper() {
        return mapper;
    }

    public void setMapper(Mapper mapper) {
        this.mapper = mapper;
    }
}


```
