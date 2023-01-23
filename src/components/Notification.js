import * as React from "react"
import { useNotification } from "../hooks"
import Dialog from "@mui/material/Dialog"
import Slide from "@mui/material/Slide"
import { Alert } from "@mui/material"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction='up' ref={ref} {...props} />
})

export default function Notification() {

    
  const notification = useNotification()
  console.log("noti", !notification.message.available)
  if (!notification.message.available) {
    return null
  }

  let open = notification.message.available
  console.log("open?", open)

  const handleClose = () => {
    notification.removeNotification()
  }

  return (
    <div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
      >
        <Alert severity={notification.message.severity}>
          {notification.message.content}
        </Alert>
      </Dialog>
    </div>
  )
}
