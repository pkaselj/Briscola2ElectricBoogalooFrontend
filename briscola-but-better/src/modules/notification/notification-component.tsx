import { Alert, AlertColor } from "@mui/material"


interface INotificationProps {
    text : string
    onCloseAction? : () => void
}

const ErrorNotification = ({text, onCloseAction} : INotificationProps) => (
    <Alert severity="error" onClose={onCloseAction ?? (()=>{})}>{text}</Alert>
)

const WarnNotification = ({text, onCloseAction} : INotificationProps) => (
    <Alert severity="warning" onClose={onCloseAction ?? (()=>{})}>{text}</Alert>
)

const InfoNotification = ({text, onCloseAction} : INotificationProps) => (
    <Alert severity="info" onClose={onCloseAction ?? (()=>{})}>{text}</Alert>
)

const SuccessNotification = ({text, onCloseAction} : INotificationProps) => (
    <Alert severity="success" onClose={onCloseAction ?? (()=>{})}>{text}</Alert>
)

export {ErrorNotification, WarnNotification, InfoNotification, SuccessNotification}