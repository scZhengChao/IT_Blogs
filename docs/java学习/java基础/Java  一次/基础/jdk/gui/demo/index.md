# demo

## 目录

- [一](#一)

# 一

```javascript 
package com.gui;

import javax.swing.*;

public class Demo {
    public static void main(String[] args) {
        JFrame jf = new JFrame();
        jf.setSize(1000,400);
        jf.setTitle("Demo");
        jf.setLocationRelativeTo(null); // 程序的位置剧中
        jf.setDefaultCloseOperation(3); // 3 关闭时推出程序
        jf.setAlwaysOnTop(true);
        jf.setLayout(null); // 取消默认布局；

        JButton btn = new JButton("Click Me");
        btn.setBounds(100,100,100,50);
        JButton btn2 = new JButton("Click Me2");
        btn2.setBounds(200,100,100,50);
        jf.add(btn);
        jf.add(btn2);

        JLabel label = new JLabel("label1");
        label.setBounds(100,0,100,50);
        jf.add(label);
//        /Users/zhengchao/workSpace/JavaDeveloper/assets/touxiang.jpg
//        ImageIcon icon = new ImageIcon("/Users/zhengchao/workSpace/JavaDeveloper/assets/1.png");
        ImageIcon icon = new ImageIcon("assets/touxiang.jpg");
        JLabel label2 = new JLabel(icon);
        label2.setBounds(0,0,90,90);

        jf.add(label2);



        jf.setVisible(true);  // 设置窗体可见；写在最后；
    }
}

```
