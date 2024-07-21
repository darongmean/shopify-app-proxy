# Shopify App on Cloudflare Pages

This is a minimal template to create a Shopify app and host it on Cloudflare Pages.

### How to use

Change the following configurations in `package.json`:

https://github.com/darongmean/shopify-on-cloudflare/blob/d2e4fae1b40437fa9f6b164369e2da433a146e95/package.json#L2

https://github.com/darongmean/shopify-on-cloudflare/blob/d2e4fae1b40437fa9f6b164369e2da433a146e95/package.json#L73

Change the following configurations in `shopify.app.toml`:

https://github.com/darongmean/shopify-on-cloudflare/blob/f07132677507924be09af47ae441df6435ac3bbc/shopify.app.toml#L3-L6

https://github.com/darongmean/shopify-on-cloudflare/blob/f07132677507924be09af47ae441df6435ac3bbc/shopify.app.toml#L9-L12

https://github.com/darongmean/shopify-on-cloudflare/blob/f07132677507924be09af47ae441df6435ac3bbc/shopify.app.toml#L14-L16

https://github.com/darongmean/shopify-on-cloudflare/blob/f07132677507924be09af47ae441df6435ac3bbc/shopify.app.toml#L18-L23

Change the following configurations in `wrangler.toml`:

https://github.com/darongmean/shopify-on-cloudflare/blob/d2e4fae1b40437fa9f6b164369e2da433a146e95/wrangler.toml#L2-L3

https://github.com/darongmean/shopify-on-cloudflare/blob/d2e4fae1b40437fa9f6b164369e2da433a146e95/wrangler.toml#L18-L24

https://github.com/darongmean/shopify-on-cloudflare/blob/d2e4fae1b40437fa9f6b164369e2da433a146e95/wrangler.toml#L48-L50

### What are the differences from other solutions?

##### Environment Variables are loaded from `process` in development environment

See:

https://github.com/darongmean/shopify-on-cloudflare/blob/f3bfcb0524a1e04fa64b151ecf652d2c2c6ce787/load-context.js#L36-L42

##### `shopify` object

`shopify` object is availble in `loader` and `action` functions as a field of the `context` object.

Here is an example of how to use it in `loader`:

https://github.com/darongmean/shopify-on-cloudflare/blob/f3bfcb0524a1e04fa64b151ecf652d2c2c6ce787/app/routes/app._index.jsx#L26-L30

Here is an example of how to use it in `action`:

https://github.com/darongmean/shopify-on-cloudflare/blob/f3bfcb0524a1e04fa64b151ecf652d2c2c6ce787/app/routes/app._index.jsx#L59-L63

To change the configuration of `shopify` object, there are 2 places to do it:

https://github.com/darongmean/shopify-on-cloudflare/blob/f3bfcb0524a1e04fa64b151ecf652d2c2c6ce787/load-context.js#L52

https://github.com/darongmean/shopify-on-cloudflare/blob/f3bfcb0524a1e04fa64b151ecf652d2c2c6ce787/app/shopify.server.js#L14-L36

##### Backend For Your Frontend

`api` object is available in `loader` and `action` functions as a field of the `context` object.

Here is an example of how to use it in `loader`:

https://github.com/darongmean/shopify-on-cloudflare/blob/f3bfcb0524a1e04fa64b151ecf652d2c2c6ce787/app/routes/app._index.jsx#L31-L34

Here is an example of how to use it in `action`:

https://github.com/darongmean/shopify-on-cloudflare/blob/f3bfcb0524a1e04fa64b151ecf652d2c2c6ce787/app/routes/app._index.jsx#L64-L67

Here is an example of how to use it in webhook `action`:

https://github.com/darongmean/shopify-on-cloudflare/blob/f3bfcb0524a1e04fa64b151ecf652d2c2c6ce787/app/routes/webhooks.jsx#L18-L20

To change the configuration of `api` object, there are 2 places to do it:

https://github.com/darongmean/shopify-on-cloudflare/blob/f3bfcb0524a1e04fa64b151ecf652d2c2c6ce787/load-context.js#L53

https://github.com/darongmean/shopify-on-cloudflare/blob/f3bfcb0524a1e04fa64b151ecf652d2c2c6ce787/app/api.server.js#L36-L41

### Development

Start the development server using the command `npm run dev`.
Hot Module Replacement (HMR) is enabled in the development server.

### Deploy

Deploy to Cloudflare Pages using the command `npm run deploy`.
