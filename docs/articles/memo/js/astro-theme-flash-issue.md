# 如何解決 Astro 套用主題切換時，畫面抖動瞬閃問題

## 問題
製作 Astro 的主題切換功能時，因為是直接透過 a 連結 reload page，如果上次記憶的主題是 dark 模式，那進入畫面後，切換加上 html 的 class "dark" 後，畫面會有一個從白轉黑的抖動，影響使用體驗


## 解決方式
這邊主要是為了解決初始畫面渲染 darkMode 時，由白轉黑的瞬閃問題，類似問題也發生在 Nextjs 裡，可[參考這篇](https://github.com/tailwindlabs/tailwindcss/discussions/3095)

利用瀏覽器的 render 原理，會將整個畫面變動的過程裡面，最後的一個畫面一次性 rerender，當畫面進入時

1. 預先把主畫面內容用 class "hidden" 隱藏，等 darkMode 的判斷結束後再移除，避免畫面抖動
2. 判斷是否使用 darkMode，在 html 加上 class "dark"，這裡加入第一個 rerender 事件
3. 加上 html 的 class "dark" 之後，移除主畫面內容的 class "hidden"，這裡加入第二個 rerender 事件

結果. 因為 2, 3 的動作都會造成 rerender，且都在同一個 event task 裡觸發，瀏覽器只會做最後一個結果來套用 rerender 動作，也就解決了 body 由白轉黑，導致畫面抖動的問題

實際測試後效果非常好，即使在 client side 判斷 theme 後切換也不會導致畫面發生抖動了

```html
<!doctype html>
<html lang={site.lang}>
	<head>
		<meta charset="UTF-8" />
		<meta name="description" content={description} />
		<meta name="viewport" content="width=device-width" />
		<link rel="icon" type="image/svg+xml" href={site.favicon} />
		<meta name="generator" content={Astro.generator} />
		<title>{title}</title>
	</head>
	<body>
		<main id="main-content" class="hidden">
			<Header client:load />
			<slot />
		</main>
	</body>
</html>

<script>
import getDefaultTheme from '@/src/lib/getDefaultTheme';
import { LocalStorageKeys } from '@/src/lib/storage';

const lastTheme =
	localStorage.getItem(LocalStorageKeys.Theme) || getDefaultTheme();

document.documentElement.classList.toggle("dark", lastTheme === 'dark');
document.getElementById('main-content')?.classList.remove('hidden');
</script>
```