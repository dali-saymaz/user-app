import { notification } from "antd";

// export const Notification = ({ message, description, type }) => {

//     notification[type]({
//         message: message,
//         description: description,
//         placement: "topRight",
//         duration: 3
//     });

// }

export const SuccessNotification = ({ description }) => {
    notification.success({
        message: `Success`,
        description: description,
        placement: "topRight",
        duration: 3
    });
}

export const ErrorNotification = ({ description }) => {
    notification.error({
        message: `Error`,
        description: description,
        placement: "topRight",
        duration: 3
    });

}