function fetchFn(targetBaseUrl) {
    return async function (request, session) {
        const { shop, scope, state, isOnline, expires, onlineAccessInfo, accessToken } = session;

        if (expires || onlineAccessInfo) {
            console.debug({ session, debug: "unexpected value of expires or onlineAccessInfo" });
        }

        const sessionHeaders = {
            "X-Session-Shop": shop,
            "X-Session-Scope": scope,
            "X-Session-State": state,
            "X-Session-Is-Online": isOnline,
            "X-Session-Access-Token": accessToken
        };

        const url = new URL(request.url);
        const targetUrl = new URL(targetBaseUrl + url.pathname + url.search);
        let newRequest = new Request(targetUrl.toString(), request);

        const newHeaders = new Headers(newRequest.headers);

        newHeaders.set('X-Proxy-By', url.hostname);
        for (const [key, value] of Object.entries(sessionHeaders)) {
            newHeaders.set(key, value);
        }

        newRequest = new Request(newRequest, { headers: newHeaders });

        const res = await fetch(newRequest);

        return res.json();
    }
}

export function initApi(env) {
    return {
        fetchRequest: fetchFn(env.API_BASE_URL),
        fetchWebhookRequest: fetchFn(env.API_WEBHOOK_URL),
    }
}
