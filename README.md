# SMH React Native Styles Cache (`smh-rn-styles-cache`)

A lightweight and efficient style caching system for **React Native**, using **LRU** + **MMKV** for performance and persistence.
Perfect for **JSON-driven UI engines**, dynamic theming, and production-ready rendering optimizations.

---

## 🔥 Features

* 🧠 **Memoized**: Caches styles using SHA-256 hashes
* ⚡️ **Fast**: Uses in-memory [LRU cache](https://github.com/isaacs/node-lru-cache)
* 💾 **Persistent**: Uses [MMKV storage](https://github.com/mrousavy/react-native-mmkv)
* 🌓 **Theme-aware**: Supports theme-based caching
* 🧩 **Platform-aware**: Supports `Platform.select()` blocks
* 🧱 **Flat + Array Support**: Handles arrays and deeply nested styles

---

## 📦 Installation

```bash
npm install smh-rn-styles-cache

# or

yarn add smh-rn-styles-cache
```

---

## 🚀 Usage

### 1. `getCachedStyle`

```ts
import { getCachedStyle } from 'smh-rn-styles-cache';

const style = getCachedStyle({ padding: 10 });

return <View style={style} />;
```

### 2. `getCachedStyles`

```ts
import { getCachedStyles } from 'smh-rn-styles-cache';

const styles = getCachedStyles({
  container: { flex: 1 },
  title: { fontSize: 18, color: 'blue' }
});

return <View style={styles.container}><Text style={styles.title}>Hello</Text></View>
```

### 3. `prewarmStyles`

Pre-load styles on app start to reduce cold-start render delays.

```ts
import { prewarmStyles } from 'smh-rn-styles-cache';

prewarmStyles([
  { padding: 10 },
  { backgroundColor: 'white' },
]);
```

### 4. `clearStyleCache`

Clear all in-memory + persistent caches.

```ts
import { clearStyleCache } from 'smh-rn-styles-cache';

clearStyleCache();
```

---

## 🧪 Advanced Features

### ✅ Platform Select Support

```ts
getCachedStyle({
  ...Platform.select({
    ios: { paddingTop: 20 },
    android: { paddingTop: 10 },
  })
});
```

### ✅ Style Arrays

```ts
getCachedStyle([
  { flex: 1 },
  { backgroundColor: 'red' }
]);
```

### ✅ Theme-based Caching

```ts
const style = getCachedStyle({ color: 'black' }, 'dark');
```

---

## 📂 File-based Structure (Optional)

You can wrap styles per component and use this as a drop-in for `StyleSheet.create()`:

```ts
const styles = getCachedStyles({
  wrapper: { padding: 16 },
  button: { backgroundColor: 'blue' }
});
```

---

## 🤔 Why?

> StyleSheet.create already caches styles. Why use this?

✅ To **persist across sessions** (MMKV)<br>
✅ To **share styles between JSON-driven UIs**<br>
✅ To **deduplicate runtime styles** dynamically built<br>
✅ To **avoid recreating identical styles across renders**

---

## 🤝 Contributing

Contributions are always welcome, no matter how large or small! 🙌

We want this community to be friendly and respectful to each other. Please follow this in all your interactions with the project.

Please feel free to drop me a mail — **S MUNI HARISH**

---

## 🙏 Acknowledgements

Thanks to the authors of these libraries for inspiration:

* [`react-native-mmkv`](https://github.com/mrousavy/react-native-mmkv)
* [`lru-cache`](https://github.com/isaacs/node-lru-cache)
* `react-native` team

---

## 💡 Sponsor & Support

To keep this library maintained and up-to-date, please consider sponsoring it on GitHub.

Or, if you're looking for private support or help in customizing the experience, reach out to me on **[LinkedIn @smuniharish](https://www.linkedin.com/in/smuniharish)**.

---

## 📄 License

Apache License 2.0

---

## 🔖 Keywords

`react-native` · `style-cache` · `dynamic-styles` · `json-ui` · `theme-aware` · `platform-aware` · `performance` · `mmkv` · `style-optimization` · `expo`

---

Made with ❤️
