import { useEffect } from "react";
import { json } from "@remix-run/cloudflare";
import { useLoaderData, useFetcher } from "@remix-run/react";
import {
  useBreakpoints,
  Page,
  Text,
  Card,
  BlockStack,
  Box,
  ButtonGroup,
  InlineGrid,
  List,
  InlineStack
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import {
  getIn,
  RenderBanner,
  RenderButton,
  RenderModal,
  showModal,
  showToast
} from "../api/components.jsx";

export const loader = async ({ request, context }) => {
  const shopify = context.shopify;
  const api = context.api;

  const { session } = await shopify.authenticate.admin(request);
  const data = await api.fetchRequest(request, session);

  // fixme: return response from API
  // return json(data);

  return {
    section_plan: {
      "list_items": [
        "Chat support initial response within 4 hours",
        "Chat support available 24/7",
        "Email support initial response within 4 hours",
        "Email support available 24/7"
      ],

      "buttons": [["button_id", 2]]
    },

    "button_id": {
      2: {
        "button_id": 2,
        "label": "Change the plan",
        submit: true,
        variant: "primary",
      }
    },
  }
};

export const action = async ({ request, context }) => {
  const shopify = context.shopify;
  const api = context.api;

  const { session } = await shopify.authenticate.admin(request);
  const data = await api.fetchRequest(request, session);

  // fixme: return response from API
  // return json(data);

  return json({
    toasts: [["toast_id", 1]],

    toast_id: {
      1: {
        toast_id: 1,
        message: "Plan changed."
      }
    }
  });
};

export default function Index() {
  const fetcher = useFetcher();
  const isLoading = ["loading", "submitting"].includes(fetcher.state) && fetcher.formMethod === "POST";

  const loaderData = useLoaderData() || {};
  const fetcherData = fetcher.data || {};

  const { smUp } = useBreakpoints();

  useEffect(() => {
    async function show() {
      if (!isLoading) {
        for (const item of getIn(fetcherData, ["modals"])) {
          await showModal(getIn(fetcherData, item));
        }

        for (const item of getIn(fetcherData, ["toasts"])) {
          await showToast(getIn(fetcherData, item));
        }
      }
    }

    show();

  }, [fetcher]);

  return (
    <Page>
      <TitleBar title="My APP">
      </TitleBar>
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: 400, sm: 0 }}
            paddingInlineEnd={{ xs: 400, sm: 0 }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Plan
              </Text>
              <Text as="p" variant="bodyMd">
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <fetcher.Form method="post">
              <BlockStack gap="400">

                {getIn(loaderData, ["section_plan", "banners"]).map((item, _index) =>
                  RenderBanner(getIn(loaderData, item))
                )}

                <div>
                  <Text as="p">
                    This plan includes:
                  </Text>
                  <List type="bullet">

                    {getIn(loaderData, ["section_plan", "list_items"]).map((item, index) =>
                      <List.Item key={"list_item_" + index}>{item}</List.Item>
                    )}

                  </List>
                </div>

                <InlineStack align="end">
                  <ButtonGroup>

                    {getIn(loaderData, ["section_plan", "buttons"]).map((item, _index) =>
                      RenderButton(getIn(loaderData, item))
                    )}

                  </ButtonGroup>
                </InlineStack>
              </BlockStack>
            </fetcher.Form>
          </Card>
        </InlineGrid>
      </BlockStack>

      {getIn(fetcherData, ["modals"]).map((item, _index) =>
        RenderModal(getIn(fetcherData, item))
      )}

    </Page>
  );
}
