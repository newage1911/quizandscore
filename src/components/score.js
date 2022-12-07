import * as React from 'react';
import { pink, green, deepPurple } from '@mui/material/colors';
import { Avatar, Grid, Typography } from "@mui/material";
import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';

const StyledPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(5),
    maxWidth: 400,
    color: theme.palette.text.primary,
  }));

const ScoreList = () => {
    // const [datetime, setDatetime] = useState(new Date());
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const getData = () => { 
       return fetch("http://localhost:3000/api/quiz/score")
            .then((response) => response.json())
            .then((data) => {
              setData(data)
              // console.log("quizTeam",data[0]?.quiz_team)
              // console.log("score", data.score)
            });
    }
    useEffect(() => {
      getData()
      // const id = setInterval(() => setDatetime( new Date(), 1000));
      // return () => {
      //   clearInterval(id)
      // }
    }, [data])

    if(isLoading) {
      return <h1 style={{ textAlign: "center"}}>loading...</h1>
    }
  
    if(!data) {
      return <h1 style={{ textAlign: "center"}}>No data</h1>
    }
  
    return (
        <Box sx={{ width: 650, height: 650, borderRadius: 2 ,bgcolor: '#FF7E2F', overflow: 'hidden', px: 3, mt: 7 }}>
        <Typography sx={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', color: 'white'}}> Score </Typography>
      
      <Grid sx={{ mt: 7}}>
        <StyledPaper sx={{ my: 1, mx: 'auto', p: 2, bgcolor: 'primary.main'}}>
          <Grid container spacing={0} columns={16} >
            <Grid xs={8}>
              <Typography sx={{ width: 130, height: 55, fontSize: 30
              ,bgcolor: '#FF7E2F', borderRadius: 1, textAlign: 'center', color: 'white'}}>{data[0]?.quiz_team}</Typography>
              {/* <Avatar sx={{ width: 65, height: 65, fontSize: 40
              ,bgcolor: '#FF7E2F'}}>1</Avatar> */}
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ bgcolor: 'white', width: 1, height: 1, borderRadius: 1}}>
                <Typography noWrap sx={{ fontWeight: 'bold', fontSize: 45, textAlign: 'center'}}>{data[0]?.score}</Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>

        <StyledPaper sx={{ my: 1, mx: 'auto', p: 2, bgcolor: 'primary.main'}}>
          <Grid container spacing={0} columns={16} >
            <Grid xs={8}>
            <Typography sx={{ width: 130, height: 55, fontSize: 30
              ,bgcolor: green[500], borderRadius: 1, textAlign: 'center', color: 'white'}}>{data[1]?.quiz_team}</Typography>
              {/* <Avatar sx={{ width: 65, height: 65, fontSize: 40
              ,bgcolor: green[500]}}>2</Avatar> */}
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ bgcolor: 'white', width: 1, height: 1, borderRadius: 1}}>
                <Typography noWrap sx={{ fontWeight: 'bold', fontSize: 45, textAlign: 'center'}}>{data[1]?.score}</Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>

        <StyledPaper sx={{ my: 1, mx: 'auto', p: 2, bgcolor: 'primary.main'}}>
          <Grid container spacing={0} columns={16} >
            <Grid xs={8}>
            <Typography sx={{ width: 130, height: 55, fontSize: 30
              ,bgcolor: pink[300], borderRadius: 1, textAlign: 'center', color: 'white'}}>{data[2]?.quiz_team}</Typography>
              {/* <Avatar sx={{ width: 65, height: 65, fontSize: 40
              ,bgcolor: pink[500]}}>3</Avatar> */}
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ bgcolor: 'white', width: 1, height: 1, borderRadius: 1}}>
                <Typography noWrap sx={{ fontWeight: 'bold', fontSize: 45, textAlign: 'center'}}>{data[2]?.score}</Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>

        <StyledPaper sx={{ my: 1, mx: 'auto', p: 2, bgcolor: 'primary.main'}}>
          <Grid container spacing={0} columns={16} >
            <Grid xs={8}>
            <Typography sx={{ width: 130, height: 55, fontSize: 30
              ,bgcolor: deepPurple[300], borderRadius: 1, textAlign: 'center', color: 'white'}}>{data[3]?.quiz_team}</Typography>
              {/* <Avatar sx={{ width: 65, height: 65, fontSize: 40
              ,bgcolor: deepPurple[500]}}>4</Avatar> */}
            </Grid>
            <Grid item xs={8}>
              <Box sx={{ bgcolor: 'white', width: 1, height: 1, borderRadius: 1}}>
                <Typography noWrap sx={{ fontWeight: 'bold', fontSize: 45, textAlign: 'center'}}>{data[3]?.score}</Typography>
              </Box>
            </Grid>
          </Grid>
        </StyledPaper>
      </Grid>
      <Box textAlign='center'>
        <Button color="error" variant="contained">clear</Button>    
      </Box>
                {/* <Typography variant='h6' color='white' sx={{ textAlign: 'center'}}>{datetime.toLocaleString("en-GB")}</Typography> */}
      </Box>
    )
}

export default ScoreList;