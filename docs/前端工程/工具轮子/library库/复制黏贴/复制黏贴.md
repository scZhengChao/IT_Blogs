# 复制黏贴

## 目录

- [clipboard](#clipboard)
  - [copy](#copy)
  - [Cut](#Cut)
  - [Copy text from attribute](#Copy-text-from-attribute)
  - [Events](#Events)

# [clipboard](https://github.com/zenorocha/clipboard.js "clipboard")

```typescript 
npm install clipboard --save
<script src="dist/clipboard.min.js"></script>


new ClipboardJS('.btn');

```


## copy

```typescript 
<!-- Target -->
<input id="foo" value="https://github.com/zenorocha/clipboard.js.git" />

<!-- Trigger -->
<button class="btn" data-clipboard-target="#foo">
  <img src="assets/clippy.svg" alt="Copy to clipboard" />
</button>
```


## Cut

```typescript 
<!-- Target -->
<textarea id="bar">Mussum ipsum cacilds...</textarea>

<!-- Trigger -->
<button class="btn" data-clipboard-action="cut" data-clipboard-target="#bar">
  Cut to clipboard
</button>
```


## Copy text from attribute

```typescript 
<!-- Trigger -->
<button
  class="btn"
  data-clipboard-text="Just because you can doesn't mean you should — clipboard.js"
>
  Copy to clipboard
</button>
```


## Events

```typescript 
var clipboard = new ClipboardJS('.btn');

clipboard.on('success', function (e) {
  console.info('Action:', e.action);
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);

  e.clearSelection();
});

clipboard.on('error', function (e) {
  console.error('Action:', e.action);
  console.error('Trigger:', e.trigger);
});
```
