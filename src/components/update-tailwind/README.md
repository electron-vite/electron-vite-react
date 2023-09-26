# electron-updater-tailwindcss

[tailwindcss docs](https://tailwindcss.com/).


## If you don't want to use tailwindcss, want to use the default css style:

[`<Update/>` Written entirely in CSS](../update/)

### remove dependencies:
```diff
- autoprefixer
- tailwindcss
```
### remove files:
```diff
- postcss.config.cjs
- tailwind.config.cjs
```
### remove import:
```diff
//src/main.tsx
- import "@/components/update-tailwind/tailwind.css";
```

