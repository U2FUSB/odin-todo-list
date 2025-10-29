# How to use
> npm run [script]

for any script in package.json

# To update npm dependencies
```bash
npm update --save
```

# For images added in html or javascript
```bash
npm install --save-dev html-loader
```
add the following to your webpack.common.js > module > rules:
```bash
{
    test: /\.html$/i,
    loader: "html-loader",
},
{
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource",
},
```
