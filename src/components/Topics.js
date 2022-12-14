import { useNavigate } from "react-router-dom"

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Grid,
  Typography,
  TableHead,
} from "@mui/material"

const Topics = ({ topics }) => {
  const navigate = useNavigate()
  console.log(topics)

  return (
    <div>
      <Grid
        container
        direction='column'
        justifyContent='space-between'
        alignItems='center'
        spacing={4}
        wrap='nowrap'
      >
        <Grid
          item
          sx={{
            minWidth: { xs: "90%", sm: "540px" },
            maxWidth: { xs: "95%", sm: "95%" },
          }}
        >
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
                    onClick={() => navigate(`/topics/${topic.id}`)}
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
        </Grid>
      </Grid>
    </div>
  )
}

export default Topics
