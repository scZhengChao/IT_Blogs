# pageHelper

## 目录

- [配置](#配置)
- [test](#test)
- [sql  map](#sql--map)
- [分页实体类](#分页实体类)

# 配置

```markdown title="application.yaml"

#配置分页插件
pagehelper:
  auto-dialect: mysql #p配置分页方言；数据库类型
  reasonable: true #开启合理查询； 比如总页数100；查询101页；会自动查询100页
```


# test

```java title="TestPageHelper"
package com.zc.stock;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.zc.stock.mapper.SysUserMapper;
import com.zc.stock.pojo.entity.SysUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class TestPageHelper {

    @Autowired
    private SysUserMapper sysUserMapper;

    @Test
    public void test(){
        Integer page = 2;
        Integer pageSize = 10;
        PageHelper.startPage(page,pageSize);
        List<SysUser> all = sysUserMapper.findAll();

        // 将查询的page对象；封装到pageInfo下面；就可以获取分页的各种数据
        PageInfo<SysUser> pageInfo = new PageInfo<>(all);

        // 获取分页的详情数据
        int pageNum = pageInfo.getPageNum(); // 获取当前页
        int pages = pageInfo.getPages(); // 总页数
        int pageSize1 = pageInfo.getPageSize(); // 每页大小
        int size = pageInfo.getSize(); // 当前页的记录数
        long total = pageInfo.getTotal();// 总记录数
        List<SysUser> list = pageInfo.getList(); // 获取当前页的具体内容

        System.out.println(all );
    }
}

```


# sql  map

```xml 
    <select id="findAll" resultMap="BaseResultMap">
        select
        <include refid="Base_Column_List"/>
        from sys_user
    </select>
```


# 分页实体类

```java 
package com.zc.stock.vo.resp;

import com.github.pagehelper.PageInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import java.io.Serializable;
import java.util.List;

/**
 * 分页实体类
 */
@ApiModel(description = "分页实体类")
@Data
public class PageResult<T> implements Serializable {
    /**
     * 总记录数
     */
    @ApiModelProperty("总记录数")
    private Long totalRows;

    /**
     * 总页数
     */
    @ApiModelProperty("总页数")
    private Integer totalPages;

    /**
     * 当前第几页
     */
    @ApiModelProperty("当前第几页")
    private Integer pageNum;
    /**
     * 每页记录数
     */
    @ApiModelProperty("每页记录数")
    private Integer pageSize;
    /**
     * 当前页记录数
     */
    @ApiModelProperty("当前页记录数")
    private Integer size;
    /**
     * 结果集
     */
    @ApiModelProperty("结果集")
    private List<T> rows;

    /**
     * 分页数据组装
     * @param pageInfo
     * @return
     */
    public PageResult(PageInfo<T> pageInfo) {
        totalRows = pageInfo.getTotal();
        totalPages = pageInfo.getPages();
        pageNum = pageInfo.getPageNum();
        pageSize = pageInfo.getPageSize();
        size = pageInfo.getSize();
        rows = pageInfo.getList();
    }
}
```
