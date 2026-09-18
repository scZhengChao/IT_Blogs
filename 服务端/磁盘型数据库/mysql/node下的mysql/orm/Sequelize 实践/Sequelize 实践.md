# Sequelize 实践

**项目工程化；结构设计；更加优雅**

**具体的可以看Node 的orm操作数据库；和class2中mysql相关内容**

\*\* ；值得反复理解透彻\*\*​

```纯文本 
 (async () => { 
     const Sequelize = require("sequelize"); 
 
     // 建立连接 
     const sequelize = new Sequelize("kaikeba", "root", "example", { 
         host: "localhost", 
         dialect: "mysql", 
         operatorsAliases: false 
     }); 
 
     // 定义模型 
     const Fruit = sequelize.define("Fruit", { 
         name: { 
             type: Sequelize.STRING(20), 
             allowNull: false, 
             // get() { 
             //     const fname = this.getDataValue("name"); 
             //     const price = this.getDataValue("price"); 
             //     const stock = this.getDataValue("stock"); 
             //     return `${fname}(价格：￥${price} 库存：${stock}kg)`; 
             // } 
         }, 
         price: { 
             type: Sequelize.FLOAT, 
             allowNull: false, 
             validate: { 
                 isFloat: { msg: "价格字段请输入数字" }, 
                 min: { args: [0], msg: "价格字段必须大于0" } 
             } 
         }, 
         stock: { type: Sequelize.INTEGER, defaultValue: 0 }, 
 
 
     }, 
         { 
             timestamps: false, 
             getterMethods: { 
                 amount() { 
                     return this.getDataValue("stock") + "kg"; 
                 } 
             }, 
             setterMethods: { 
                 amount(val) { 
                     const idx = val.indexOf('kg'); 
                     const v = val.slice(0, idx); 
                     this.setDataValue('stock', v); 
                 } 
             } 
         }); 
 
     Fruit.classify = function (name) { 
         const tropicFruits = ['香蕉', '芒果', '椰子']; // 热带水果 
         return tropicFruits.includes(name) ? '热带水果' : '其他水果'; 
     }; 
     Fruit.prototype.totalPrice = function (count) { 
         return (this.price * count).toFixed(2); 
     }; 
 
     ['香蕉', '草莓'].forEach(f => console.log(f + '是' + Fruit.classify(f))); 
 
     // 同步数据库，force: true则会删除已存在表 
     let ret = await Fruit.sync({ force: false }) 
     // console.log('sync', ret) 
     ret = await Fruit.create({ 
         name: "香蕉", 
         price: 3.5 
     }) 
     // console.log('create', ret) 
     // ret = await Fruit.findAll() 
 
     // 使用实例方法 
     // Fruit.findAll().then(fruits => { 
     //     const [f1] = fruits; 
     //     console.log(`买5kg${f1.name}需要￥${f1.totalPrice(5)}`);       
     // }); 
 
     // Fruit.findOne({ where: { name: "香蕉" } }).then(fruit => { 
     //     // fruit是首个匹配项，若没有则为null 
     //     console.log(fruit.get()); 
     // }); 
 
     // console.log('findAll', ret.amount, JSON.stringify(ret)) 
 
     // Fruit.findAll().then(fruits => { 
     //     console.log(JSON.stringify(fruits)); 
     //     // 修改amount，触发setterMethods 
     //     fruits[0].amount = '150kg'; 
     //     fruits[0].save(); 
     // }); 
 
     // Fruit.findOne({ attributes: ['name'] }).then(fruit => { 
     //     // fruit是首个匹配项，若没有则为null 
     //     console.log(fruit.get()); 
     // }); 
 
     // ret = await Fruit.findAll({ 
     //     offset: 3, 
     //     limit: 3, 
     // }) 
     // console.log('ret:', JSON.stringify(ret)) 
 
     const Op = Sequelize.Op; 
     Fruit.findAll({ 
         // where: { price: { [Op.lt]:4 }, stock: { [Op.gte]: 100 } } 
         where: { id: { [Op.lt]: 4, [Op.gt]: 2 } } 
     }).then(fruits => { 
         console.log(JSON.stringify(fruits)) 
         console.log(fruits.length); 
     }); 
 
     // Fruit.destroy({ where: { id: 1 } }).then(r => console.log(r)); 
 })()
```


```纯文本 
 (async () => { 
 
     // 1:N关系 
     const Sequelize = require("sequelize"); 
 
     // 建立连接 
     const sequelize = new Sequelize("kaikeba", "root", "example", { 
         host: "localhost", 
         dialect: "mysql", 
         operatorsAliases: false 
     }); 
     const Player = sequelize.define('player', { name: Sequelize.STRING }); 
     const Team = sequelize.define('team', { name: Sequelize.STRING }); 
     Player.belongsTo(Team); // 1端建立关系 
     Team.hasMany(Player); // N端建立关系 
 
     // 同步数据库，force: true则会删除已存在表 
     sequelize.sync({ force: true }).then(async () => { 
         await Team.create({ name: '火箭' }); 
         await Player.bulkCreate([{ name: '哈登', teamId: 1 }, { name: '保罗', teamId: 1 }]); 
 
         // 1端关联查询   
         const players = await Player.findAll({ include: [Team] }); 
         console.log(JSON.stringify(players, null, 2)); 
 
         // N端关联查询 
         const team = await Team.findOne({ where: { name: '火箭' }, include: [Player] }); 
         console.log(JSON.stringify(team, null, 2)); 
     }); 
 
 })()
```


```纯文本 
 (async () => { 
     // 1:N关系 
     const Sequelize = require("sequelize"); 
 
     // 建立连接 
     const sequelize = new Sequelize("kaikeba", "root", "example", { 
         host: "localhost", 
         dialect: "mysql", 
     }); 
 
     const Fruit = sequelize.define("fruit", { name: Sequelize.STRING }); 
     const Category = sequelize.define("category", { name: Sequelize.STRING }); 
     Fruit.FruitCategory = Fruit.belongsToMany(Category, { 
         through: "FruitCategory" 
     }); 
     // 插入测试数据 
     sequelize.sync({ force: true }).then(async () => { 
         await Fruit.create( 
             { 
                 name: "香蕉", 
                 categories: [{ id: 1, name: "热带" }, { id: 2, name: "温带" }] 
             }, 
             { 
                 include: [Fruit.FruitCategory] 
             } 
         ); 
         // 多对多联合查询 
         const fruit = await Fruit.findOne({ 
             where: { name: "香蕉" }, // 通过through指定条件、字段等 
             include: [{ model: Category, through: { attributes: ['id', 'name'] } }] 
         }); 
     }) 
 })()
```


```纯文本 
 //index.js  or  app.js 
 
 const Koa = require('koa') 
 const app = new Koa() 
 const bodyParser = require('koa-bodyparser') 
 app.use(require('koa-static')(__dirname + '/')) 
 app.use(bodyParser()) 
 
 
 // 初始化数据库 
 const sequelize = require('./util/database'); 
 const Product = require('./models/product'); 
 const User = require('./models/user'); 
 const Cart = require('./models/cart'); 
 const CartItem = require('./models/cart-item'); 
 const Order = require('./models/order'); 
 const OrderItem = require('./models/order-item'); 
 
 
 
 
 // 加载用户 - 代替鉴权 
 app.use(async (ctx, next) => { 
     const user = await User.findByPk(1) 
     ctx.user = user; 
     await next(); 
 }); 
 
 
 const router = require('koa-router')() 
 router.get('/admin/products', async (ctx, next) => { 
     // const products = await ctx.user.getProducts() 
     const products = await Product.findAll() 
     ctx.body = { prods: products } 
 }) 
 
 
 router.post('/admin/product', async ctx => { 
     const body = ctx.request.body 
     const res = await ctx.user.createProduct(body) 
     ctx.body = { success: true } 
 }) 
 
 
 router.delete('/admin/product/:id', async (ctx, next) => { 
     const id = ctx.params.id 
     const res = await Product.destroy({ 
         where: { 
             id 
         } 
     }) 
     ctx.body = { success: true } 
 }) 
 
 
 router.get('/cart', async ctx => { 
     const cart = await ctx.user.getCart() 
     const products = await cart.getProducts() 
     ctx.body = { products } 
 }) 
 /** 
 * 添加购物车 
 */ 
 router.post('/cart', async ctx => { 
     const body = ctx.request.body 
     console.log('ctx.body', ctx.request.body) 
     const prodId = body.id; 
     let fetchedCart; 
     let newQty = 1; 
 
 
     // 获取购物车 
     const cart = await ctx.user.getCart() 
     console.log('cart', cart) 
     fetchedCart = cart; 
     const products = await cart.getProducts({ 
         where: { 
             id: prodId 
         } 
     }); 
 
 
     let product; 
     // 判断购物车数量 
     if (products.length > 0) { 
         product = products[0]; 
     } 
     if (product) { 
         const oldQty = product.cartItem.quantity; 
         newQty = oldQty + 1; 
         console.log("newQty", newQty); 
     } else { 
         product = await Product.findByPk(prodId); 
     } 
 
 
     await fetchedCart.addProduct(product, { 
         through: { 
             quantity: newQty 
         } 
     }); 
     ctx.body = { success: true } 
 }) 
 
 
 router.post('/orders', async ctx => { 
     let fetchedCart; 
     const cart = await ctx.user.getCart(); 
     fetchedCart = cart; 
     const products = await cart.getProducts(); 
     const order = await ctx.user.createOrder(); 
     const result = await order.addProducts( 
         products.map(p => { 
             p.orderItem = { 
                 quantity: p.cartItem.quantity 
             }; 
             return p; 
         }) 
     ); 
     await fetchedCart.setProducts(null); 
     ctx.body = { success: true } 
 }) 
 router.delete('/cartItem/:id', async ctx => { 
     const id = ctx.params.id 
     const cart = await ctx.user.getCart() 
     const products = await cart.getProducts({ 
         where: { id } 
     }) 
     const product = products[0] 
     await product.cartItem.destroy() 
     ctx.body = { success: true } 
 }) 
 router.get('/orders', async ctx => { 
     const orders = await ctx.user.getOrders({ include: ['products'], order: [['id', 'DESC']] }) 
     ctx.body = { orders } 
 }) 
 
 
 
 
 app.use(router.routes()) 
 
 
 // app.use('/admin', adminRoutes.routes); 
 // app.use(shopRoutes); 
 
 
 
 
 Product.belongsTo(User, { 
     constraints: true, 
     onDelete: 'CASCADE' 
 }); 
 User.hasMany(Product); 
 User.hasOne(Cart); 
 Cart.belongsTo(User); 
 Cart.belongsToMany(Product, { 
     through: CartItem 
 }); 
 Product.belongsToMany(Cart, { 
     through: CartItem 
 }); 
 Order.belongsTo(User); 
 User.hasMany(Order); 
 Order.belongsToMany(Product, { 
     through: OrderItem 
 }); 
 Product.belongsToMany(Order, { 
     through: OrderItem 
 }); 
 
 
 sequelize.sync().then( 
     async result => { 
         let user = await User.findByPk(1) 
         if (!user) { 
             user = await User.create({ 
                 name: 'Sourav', 
                 email: 'sourav.dey9@gmail.com' 
             }) 
             await user.createCart(); 
         } 
         app.listen(3000, () => console.log("Listening to port 3000")); 
     }) 
 

```
