'use server'
import { fetchApi } from "./fetchApi";
const actionContactUs = async (prevState: any, formData: FormData) => {
    const body = {
        name: formData.get("name"),
        phone: formData.get("phone"),
        subject: formData.get("subject"),
        text: formData.get("text"),
    };
    const data = await fetchApi({ url: "message", method: "POST", body })
    console.log(data);
    if (data.success) {
        return {
            msg: "ok",
            err: ""
        }
    }
    return {
        msg: "",
        err: "ok"
    }
}
export default actionContactUs