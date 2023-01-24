import * as React from "react"
import Dialog from "@mui/material/Dialog"
import Slide from "@mui/material/Slide"
import { Alert } from "@mui/material"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function Notification({ message, removeNotification }) {
  console.log("noti", message.available)
  if (!message.available) {
    return null
  }

  let open = message.available
  console.log("open?", open)

  const handleClose = () => {
    removeNotification()
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <Alert severity={message.severity}>{message.content}</Alert>
      </Dialog>
    </div>
  )
}
