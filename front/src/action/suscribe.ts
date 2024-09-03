'use server'
const subscribeAction = async (prevState: any, formData: FormData) => {
    const email = formData.get("email")
    return {
        message: "",
        error: "bad",

    }
}
export default subscribeAction