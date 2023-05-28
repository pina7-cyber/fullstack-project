import { useNavigate } from "react-router-dom"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  TableHead,
} from "@mui/material"

const Topics = ({ topics, resetLoginTimeout }) => {
  const navigate = useNavigate()

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography variant='button'>Content</Typography>
            </TableCell>
            <TableCell align='right'>
              <Typography variant='button'>ID</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {topics.map((topic) => (
            <TableRow
              hover
              key={topic.id}
              onClick={() => {
                navigate(`/topics/${topic.id}`)
                resetLoginTimeout()
              }}
              sx={{ cursor: "pointer" }}
            >
              <TableCell>
                <Typography>{topic.content}</Typography>
              </TableCell>
              <TableCell align='right'>
                <Typography>{topic.id}</Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Topics
