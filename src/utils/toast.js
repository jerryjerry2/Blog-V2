import router from "@/router";
import { toast } from "vue3-toastify";

export const notify = {
    success(msg, location){
        return toast.success(msg, { position: "bottom-left", autoClose: 1000, onClose: () => { router.push(location)}})
    },
    error(msg){
        return toast.error(msg, { position: "bottom-left", autoClose: 1000})
    },
}