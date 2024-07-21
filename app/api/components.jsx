import {
    Text,
    Button,
    TextField,
    Box,
    Banner,
} from "@shopify/polaris";
import { useState, useCallback, cloneElement } from "react";
import { Modal, TitleBar, useAppBridge } from "@shopify/app-bridge-react";

// ex: const result = getIn(obj, ['prop1', 'prop2', 'prop3'], defaultValue);
export function getIn(obj, path, defaultValue = []) {
    var v = path.reduce((acc, key) => (acc && acc[key] !== undefined) ? acc[key] : undefined, obj);

    if (v === undefined) {
        return defaultValue
    }

    return v
}

export function RenderButton(props) {
    const { label, name, value } = props;

    const b = Button({ key: "button_id_" + label, children: label, ...props });

    return cloneElement(b, { key: "button_id_" + label, name: name, value: value }, ...b.props.children);
}

export function RenderBanner(props) {
    const { banner_id, message } = props;

    return <Banner key={"banner_id_" + banner_id} {...props}>
        <p>{message}</p>
    </Banner>
}

export function RenderTextField(props) {
    const { text_field_id, value } = props;
    const [v, setValue] = useState(value);
    const handleChange = useCallback((newValue) => setValue(newValue), []);

    return <TextField
        key={"text_field_id" + text_field_id}
        {...props}
        value={v}
        onChange={handleChange} />
}

export function RenderModal({ modal_id, title, message }) {
    const shopify = useAppBridge();

    const id = "modal_id_" + modal_id;

    return <Modal key={id} id={id}>
        <Box padding={{ xs: 300 }}>
            <Text as="p">
                {message}
            </Text>
        </Box>
        <TitleBar title={title}>
            <button variant="primary" onClick={() => shopify.modal.hide(id)}>Close</button>
        </TitleBar>
    </Modal>
}

export async function showToast({ message }) {
    const shopify = useAppBridge();

    shopify.toast.show(message);
}

export async function showModal({ modal_id, open }) {
    const shopify = useAppBridge();

    const id = "modal_id_" + modal_id;

    if (open) {
        await shopify.modal.show(id);
    }
}
