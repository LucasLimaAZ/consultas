import Swal from "sweetalert2"

export const SuccessModal = (message) => {
    Swal.fire({
        title: "Sucesso!",
        text: message,
        icon: "success",
        confirmButtonColor: "#1492A5"
    })
}

export const ErrorModal = (message) => {
    Swal.fire({
        title: "Ooops!",
        text: message,
        icon: "warning",
        confirmButtonColor: "#1492A5"
    })
}