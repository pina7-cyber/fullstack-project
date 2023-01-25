import { DeleteOutline, ThumbUpAltOutlined } from "@mui/icons-material"
import {
  IconButton,
  Stack,
  Box,
  Typography,
  Divider,
  Button,
} from "@mui/material"
import { useState } from "react"
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"

import { useMatch } from "react-router-dom"
const Topic = ({ topics }) => {
  const match = useMatch("/topics/:id")

  const topic = topics.find((t) => t.id === match.params.id)

  const comments = topic.comments
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = () => {
    console.log("like")
  }

  const remove = () => {
    console.log("remove")
  }

  const showWhenOwner = {
    display: "",
  }

  return (
    <div align='center'>
      <Box
        mt={4}
        sx={{
          width: { xs: "90%", sm: "540px" },
          p: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "grey.100",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
          textAlign: "center",
        }}
      >
        <Typography variant={"h5"}>
          {topic.content}
        </Typography>

        <Stack
          mb={4}
          mt={1}
          direction='row'
          divider={<Divider orientation='vertical' flexItem />}
          spacing={1}
        >
          <Box component={Typography} sx={{ flexGrow: 2 }}>
            {topic.content} likes
          </Box>
          <Box
            component={Typography}
            sx={{ cursor: "pointer", flexGrow: 1 }}
            onClick={toggleVisibility}
          >
            {comments.length} comments
          </Box>
          <Box
            component={Typography}
            sx={{ cursor: "pointer", flexGrow: 1 }}
            onClick={() => console.log("navigate to category")}
          >
            {topic.categories[0]}
          </Box>
        </Stack>
        <a
          style={{ textDecoration: "none" }}
          href={"www.google.de"}
          target='_blank'
          rel='noreferrer'
        >
          <Button variant={"standard"}>Download Material!</Button>
        </a>

        <Stack direction='row' mb={4} justifyContent='center'>
          <Box>
            <IconButton onClick={likeBlog}>
              <ThumbUpAltOutlined />
            </IconButton>
          </Box>
          <Box>
            <IconButton onClick={toggleVisibility}>
              <ChatBubbleOutlineOutlinedIcon />
            </IconButton>
          </Box>
          <Box style={showWhenOwner}>
            <IconButton onClick={remove}>
              <DeleteOutline />
            </IconButton>
          </Box>
        </Stack>
        <div
          style={{
            display: visible ? "" : "none",
          }}
        >{comments.join(",")}</div>
      </Box>
    </div>
  )
}

export default Topic
