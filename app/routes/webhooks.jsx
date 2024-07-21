export const action = async ({ request, context }) => {
  const shopify = context.shopify; 
  const api = context.api;

  const { topic, session, admin } = await shopify.authenticate.webhook(request);

  if (!admin) {
    // The admin context isn't returned if the webhook fired after a shop was uninstalled.
    throw new Response();
  }

  // The topics handled here should be declared in the shopify.app.toml.
  // More info: https://shopify.dev/docs/apps/build/cli-for-apps/app-configuration
  if (topic === "APP_UNINSTALLED" && session) {
    await shopify.sessionStorage.deleteSession(session.id);
  }

  const data = await api.fetchWebhookRequest(request, session);

  return json(data);
};
