export const loader = async ({ request, context }) => {
  const shopify = context.shopify;

  await shopify.authenticate.admin(request);

  return null;
};
