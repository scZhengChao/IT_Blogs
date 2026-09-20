# 扩展lombok

1、pom依赖：

```java 
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
</dependency>

```


2、实体类

```java 
@Data  // set/get/tostring ....
@AllArgsConstructor  // 全参
@NoArgsConstructor // 无参构造
@ToString // tostring
@Accessors(chain = true)  // 链式调用
@Builder  // 构建者模式创建对象
@Slf4j  // 日志注解支持
public class User {

    private Long id;
    private String userName;
    private Integer sex;
    private LocalDate birthday;
    private Date created;
    private Date modified;

}

```


3、测试

```java 
//        User user = new User();
        //user = user.setId(1L).setSex(1);
        User user1 = User
                .builder()

                .id(1L)
                .sex(1)
                .created(new Date())

                .build();
        System.out.println("user1: "+user1);

```
