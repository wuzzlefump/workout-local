import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';



export default function showToast(message:string, status:"success"|"error"|"info" ){

    if(status === "success"){
        return toast.success(message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }else if(status === "error"){
        return toast.error(message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
    else{
        return toast.info(message, {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }

}