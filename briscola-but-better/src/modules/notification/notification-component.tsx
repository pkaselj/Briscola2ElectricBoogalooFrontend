import { Alert, AlertColor } from "@mui/material"

interface IProps {
    text : string
}

const ErrorNotification = ({text} : IProps) => (
    <Alert severity="error" onClose={() => {}}>{text}</Alert>
)

const WarnNotification = ({text} : IProps) => (
    <Alert severity="warning" onClose={() => {}}>{text}</Alert>
)

const InfoNotification = ({text} : IProps) => (
    <Alert severity="info" onClose={() => {}}>{text}</Alert>
)

const SuccessNotification = ({text} : IProps) => (
    <Alert severity="success" onClose={() => {}}>{text}</Alert>
)

export {ErrorNotification, WarnNotification, InfoNotification, SuccessNotification}