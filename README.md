<h1 align="center">
    BlazeLink
</h2>
<br>

<p align="center">
    <a href="https://blaze-link.vercel.app" target="_blank">
        <img src="https://i.imgur.com/9Fcol4t.png" alt="Landing Page Screenshot" width="600"/>
    </a>
</p>
<p align="center">A Linktree-like website for your social media links.</p>

## 介紹
一個簡易版的 [Linktree](https://linktr.ee/) Clone，有以下特點：
- 使用Google登入 / Email登入
- 新增 / 編輯 / 刪除連結
- 客製化個人頁面
- 透過網址 / QRCode分享個人連結
- 響應式設計

## Tech Stack
- [Nuxt](https://github.com/nuxt/nuxt) - Vue框架
- [Pinia](https://github.com/vuejs/pinia) - 狀態管理
- [Vue Router](https://github.com/vuejs/router) - 路由
- [VueUse](https://vueuse.org/) - 提供實用的Vue組合式函數
- [tailwindcss](https://github.com/tailwindlabs/tailwindcss) - CSS框架
- [UnoCSS](https://github.com/unocss/unocss) - 提供純CSS Icon
- [Headlees UI](https://github.com/tailwindlabs/headlessui) - 無樣式的UI元件
- [Supabase](https://github.com/supabase/supabase) - 開源後端平台，提供身分驗證/資料庫/RESTful API
- [node-qrcode](https://github.com/soldair/node-qrcode) - QRCode生成

## TODO

- [x] Add TailwindCSS Eslint plugin
- [x] Add Landing page
- [x] Fix user links order
- [x] RWD for mobile
- [x] Add 404 page
- [x] Add ESLint
- [x] Enable supabase RLS
- [x] Handle token refresh
- [x] Setup vercel deployment
- [x] Add footer in user link page
- [x] Disable some userID for preserved routes
- [x] Update user link title
- [x] Add share menu
- [x] Fix preview window on safari
- [x] Login / Register form validation
- [x] Add preview link
- [x] Generate QR code
