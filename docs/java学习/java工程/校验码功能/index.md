# 校验码功能

## 目录

- [生成验证码](#生成验证码)
- [登录](#登录)

# 生成验证码

```java 
@Override
    public R<Map> getCaptchaCode() {
        //1.生成图片验证码
        /**
         * 宽度
         * 高度
         * 验证码长度
         * 干扰线的数量
         */
        LineCaptcha captcha = CaptchaUtil.createLineCaptcha(250, 40, 4, 5);
        // 生成背景颜色
        captcha.setBackground(Color.LIGHT_GRAY);
        // 生成校验规则
//        captcha.setGenerator(new CodeGenerator() {
//            @Override
//            public String generate() {
//                // 自定义生成逻辑
//                return "";
//            }
//
//            @Override
//            public boolean verify(String s, String s1) {
//                // 匹配校验码逻辑
//                return false;
//            }
//        }) ;
        // 获取校验码
        String checkCode = captcha.getCode();
        // 获取base64编码处理过的图片数据
        String imageBase64 = captcha.getImageBase64();
        //2.生成sessionid;转化成string；避免前端精度丢失；
        String sessionId = String.valueOf(idWorker.nextId());
        //3.将sessionId 作为key；code  为value ；保存在redis当中；并设置缓存中数据存活时间一分钟
        redisTemplate.opsForValue().set(StockConstant.CHECK_PREFIX + sessionId, checkCode, 5, TimeUnit.MINUTES);
        log.info("当前生成的图片验证码:{},会话id:{}", checkCode, sessionId);
        //4.组装数据
        HashMap<String, String> data = new HashMap();
        data.put("imageData", imageBase64);
        data.put("sessionId", sessionId);
        //5.响应数据
        return R.ok(data);
    }
```


# 登录

```java 
public R<LoginRespVo> login(LoginReqVo vo) {
        //1. 判断参数是否合法
        if (vo == null || StringUtils.isBlank(vo.getUsername()) || StringUtils.isBlank(vo.getPassword())) {
            return R.error(ResponseCode.DATA_ERROR);
        }
        // 判断验证码是否存在
        if (StringUtils.isBlank(vo.getCode()) || StringUtils.isBlank(vo.getSessionId())) {
            return R.error(ResponseCode.CHECK_CODE_ERROR);
        }
        // 判断redis 中保存的验证码 和输入的是否相同 （比较时忽略大小写）
        String redisCode = (String) redisTemplate.opsForValue().get( StockConstant.CHECK_PREFIX  + vo.getSessionId());
        if(StringUtils.isBlank(redisCode)){
            // 验证码过期
             return R.error(ResponseCode.CHECK_CODE_TIMEOUT);
        }
        if (!redisCode.equalsIgnoreCase(vo.getCode())) {
            // 验证码错误
             return R.error(ResponseCode.CHECK_CODE_ERROR);
        }

        //2.根据用户名；去数据库查询用户信息，获取密码的密文
        SysUser dbUser = sysUserMapper.findByUserName(vo.getUsername());
        if (dbUser == null) {
            return R.error(ResponseCode.ACCOUNT_NOT_EXISTS);
        }
        //3.调用密码匹配器；去匹配用户输入的明文密码 和 数据库的秘文密码
        if (!passwordEncoder.matches(vo.getPassword(), dbUser.getPassword())) {
            return R.error(ResponseCode.USERNAME_OR_PASSWORD_ERROR);
        }
        //4.响应
        LoginRespVo loginRespVo = new LoginRespVo();
        // 必须保证属性名称和类型一值；
        BeanUtils.copyProperties(dbUser, loginRespVo);
        return R.ok(loginRespVo);
    }
```
