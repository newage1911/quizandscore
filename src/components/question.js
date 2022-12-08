import * as React from 'react';
import { useState, useEffect, Fragment } from "react";
import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Grid, Typography, Box, CardMedia } from "@mui/material";
import { styled } from '@mui/material/styles';
import QuestionsData from "../data/Questions";
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { useCookies } from 'react-cookie';

const COOKIE_NAME = 'quiz-number'

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '35px',
    borderColor: 'black'
  }));

const Quiz = () => {
    const [cookies, setCookie, removeCookie] = useCookies([COOKIE_NAME]);
    const [data, setData] = useState([])
    const getQuestion = () => {
        return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SPREDSHEET_ID}/values/${process.env.REACT_APP_SHEET_NAME}!A1:Z1000?key=${process.env.REACT_APP_API_KEY}`)
        .then((respone) => respone.json())
        .then((data) => {
            setData(data)
            console.log(data)
        });
    }
    useEffect(() => {
        getQuestion()
    
    }, [])
    // cookies ? cookies[COOKIE_NAME] : undefined = cookies?.[COOKIE_NAME]
    const [current, setCurrent] = useState(cookies?.[COOKIE_NAME] ? Number(cookies?.[COOKIE_NAME]) : 0)
    // next question
    const nextQ = () => {
        setCurrent(current + 1);
        setCookie(COOKIE_NAME, current + 1)
    }
    // previous question
    const prevQ = () => {
        setCurrent(current - 1);
        setCookie(COOKIE_NAME, current - 1)
    }

    document.onkeydown = function(e) { 
        switch (e.keyCode) {
            case 37:
            if(current === 0) {
                this.onkeydown.preventDefault();
            }
            setCurrent(current - 1);
            break;

            case 39: 
            if(current === data.values.length - 1) {
                this.onkeydown.preventDefault();
            }
            setCurrent(current + 1);
            break;
        }
    }

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" sx={{ mt: 1 }}>
            <Box sx={{ width: '85%', height: '70px'}}>
                <Typography variant='h6' sx={{ textAlign: 'center'}}>
                    {}
                </Typography>
            </Box>
            
            <Grid container direction="column" alignItems="center" justify="center">
                <CardMedia
                component="img"
                sx={{ height: 100, width: 200, justify: 'center', alignItems: 'center', borderRadius: 2,}}
                alt="picture">
                </CardMedia> 
            </Grid>

            {/* answer box */}
          <Grid container spacing={0} alignItems="center" justifyContent="center">
            <Box sx={{ width: '90%', mb: 1}}>
                <Stack spacing={2}>
                    <Item variant="outlined" sx={{ borderLeft: 20, borderRight: 20, borderColor: 'blue', height: '40px', padding: 1.5}}>
                        <Typography color="black" sx={{ fontSize: 17}}>
                            {}
                        </Typography>
                    </Item>

                    <Item variant="outlined" sx={{ borderLeft: 20, borderRight: 20, borderColor: '#ffc107', height: '40px', padding: 1.5}}>
                        <Typography color="black" sx={{ fontSize: 17}}>
                            {}
                        </Typography>
                    </Item>

                    <Item variant="outlined" sx={{ borderLeft: 20, borderRight: 20, borderColor: 'red', height: '40px', padding: 1.5}}>
                        <Typography color="black" sx={{ fontSize: 17}}> 
                            {}
                        </Typography>
                    </Item>

                    <Item variant="outlined" sx={{ borderLeft: 20, borderRight: 20, borderColor: '#00c853', height: '40px', padding: 1.5}}>
                        <Typography color="black" sx={{ fontSize: 17}}> 
                            {}
                        </Typography>
                    </Item>
                </Stack>
            </Box>
            </Grid> 

            <Stack spacing={2} direction="row">
                <Button variant='outlined' disabled={current === 0} onClick={()=>prevQ()} color="primary" startIcon={<ArrowBackIosNewOutlinedIcon/>}></Button> 
                <Button variant='outlined' disabled={current === QuestionsData.length - 1} onClick={()=>nextQ()} color="primary" endIcon={<ArrowForwardIosOutlinedIcon/>}></Button> 
            </Stack>
                <Typography sx={{ textAlign: 'center', mt: 1}}>{`${current  + 1}`} / {`${data.values.length}`}</Typography>   
        </Grid>
    );
}

export default Quiz;
