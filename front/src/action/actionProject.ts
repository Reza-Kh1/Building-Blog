'use server'
import { fetchApi } from "./fetchApi";
const actionProject = async (prevState: any, formData: FormData) => {
    const images = formData.get("mediaArry")
    const formatImage = typeof images === "string" ? JSON.parse(images) : []
    const body = {
        name: JSON.parse(formData.get("nameValue") as string),
        phone: JSON.parse(formData.get("phoneValue") as string),
        price: JSON.parse(formData.get("priceValue") as string) || "",
        size: JSON.parse(formData.get("metraghValue") as string) || "",
        description: JSON.parse(formData.get("textValue") as string),
        subject: formData.get("subject"),
        images: formatImage,
    };
    const data = await fetchApi({ url: "onlineprice", method: "POST", body })
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
export default actionProject