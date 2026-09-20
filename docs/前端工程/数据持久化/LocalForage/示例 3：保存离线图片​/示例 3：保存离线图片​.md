# 示例 3：保存离线图片​

```typescript 
// 下载图片并存储
const response = await fetch('https://example.com/image.jpg');
const blob = await response.blob();

await localforage.setItem('profileImage', blob);

// 读取图片
const imageBlob = await localforage.getItem('profileImage');
const imageUrl = URL.createObjectURL(imageBlob);

// 在 <img> 中使用
document.getElementById('profile-img').src = imageUrl;
```
