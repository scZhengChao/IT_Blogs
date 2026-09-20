# 模块化引入css/less不生效

原因是，webpack配置css/less文件的loader时，默认不开启模块化，这种模块化方式引入需要更改下webpack的loader配置， 如下图：

```javascript 
{
                    test: /\.less$/,
                     exclude: /(node_modules)|(\.module\.less)/, 
                    use: [
                        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                        },
                        {
                            loader: 'postcss-loader',
                        },
                        {
                            loader: 'px-to-rem-loader',
                            options: ConfigUtils.getCssRemOption(),
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                noIeCompat: true,
                                minimize: false, //css压缩
                            },
                        },
                    ],
                },
                {
                   test:/\.module\.less$/, 
                  exclude: /node_modules/,
                  use: [
                      devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
                      {
                           loader: 'css-loader',
                          options:{
                              modules:true,
                              localIdentName:'[local]_[hash:base64:8]'
                          } 
                      },
                      {
                          loader: 'postcss-loader',
                      },
                      {
                          loader: 'px-to-rem-loader',
                          options: ConfigUtils.getCssRemOption(),
                      },
                      {
                          loader: 'less-loader',
                          options: {
                              noIeCompat: true,
                              minimize: false, //css压缩
                          },
                      },
                  ]
                },
```


![](image_Zo74Agp4EF.png)
