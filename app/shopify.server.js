import '@shopify/shopify-api/adapters/cf-worker';
import { KVSessionStorage } from "@shopify/shopify-app-session-storage-kv";
import { LogSeverity } from '@shopify/shopify-api';
import {
    ApiVersion,
    AppDistribution,
    shopifyApp,
} from "@shopify/shopify-app-remix/server";

import { restResources } from "@shopify/shopify-api/rest/admin/2024-07";


export function initShopify(env) {
    return shopifyApp({
        apiKey: env.SHOPIFY_API_KEY,
        apiSecretKey: env.SHOPIFY_API_SECRET,
        apiVersion: ApiVersion.July24,
        scopes: env.SCOPES?.split(","),
        appUrl: env.SHOPIFY_APP_URL,
        logger: {
            // log: defaultLogFunction,
            level: LogSeverity.Debug, // default level: LogServerity.Info
            httpRequests: true, // default httpRequests: false
            timestamps: true, // default timestamps: false
        },
        authPathPrefix: "/auth",
        sessionStorage: new KVSessionStorage(env.SESSION),
        distribution: AppDistribution.AppStore,
        restResources,
        future: {
            unstable_newEmbeddedAuthStrategy: true,
        },
        ...(env.SHOP_CUSTOM_DOMAIN
            ? { customShopDomains: [env.SHOP_CUSTOM_DOMAIN] }
            : {}),
    });
}
