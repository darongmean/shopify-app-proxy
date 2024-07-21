import { initShopify } from "./app/shopify.server";
import { initApi } from "./app/api.server";

function isBlank(str) {
    return str === undefined || str === null || str.trim() === '';
}

function validate(env) {
    if (isBlank(env.SHOPIFY_API_KEY)) {
        throw new Error("missing environment variable SHOPIFY_API_KEY");
    }

    if (isBlank(env.SHOPIFY_API_SECRET)) {
        throw new Error("missing environment variable SHOPIFY_API_SECRET");
    }

    if (isBlank(env.SHOPIFY_APP_URL)) {
        throw new Error("missing environment variable SHOPIFY_APP_URL");
    }

    if (isBlank(env.API_BASE_URL)) {
        throw new Error("missing environment variable API_BASE_URL");
    }

    if (isBlank(env.API_WEBHOOK_URL)) {
        throw new Error("missing environment variable API_WEBHOOK_URL");
    }

    if (env.SESSION === undefined || env.SESSION === null) {
        throw new Error("missing KV variable SESSION");
    }
}

export async function getLoadContext({ context }) {
    try {
        let env = context.cloudflare.env;

        if (typeof process !== 'undefined' && process.env) {
            env = { ...env, ...process.env };
        }

        validate(env);

        return {
            ...context,
            // see https://github.com/remix-run/remix/blob/bb2d7eeadc579c2c4162e9352cdd4e6c31e7c67f/packages/remix-cloudflare-pages/worker.ts#L64C38-L70C4
            cloudflare: {
                ...context.cloudflare,
                env,
                cf: context.cloudflare?.request?.cf,
            },
            shopify: initShopify(env),
            api: initApi(env),
        };
    } catch (error) {
        console.error({ error, context });
        throw error;
    }
}
