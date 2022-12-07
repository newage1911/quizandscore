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
import Tabletop from 'tabletop';

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
    // console.log(cookies) //  { "quiz-number": 1 }

    const [sheetdata, setSheetData] = useState([])

    useEffect(() => {
        Tabletop.init({
            key: "1DJjWasHTRzr3RfNsvihrwwsO0tjrDJlg4hvAfWqzgP0",
            simpleSheet: true
        })
        .then((sheetdata) => setSheetData(sheetdata))
        .catch((err) => console.warn(err));
        console.log("googlesheetData", sheetdata)
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
            if(current === QuestionsData.length - 1) {
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
                    {QuestionsData[current].question}
                </Typography>
            </Box>
            
            <Grid container direction="column" alignItems="center" justify="center">
                <CardMedia
                component="img"
                sx={{ height: 100, width: 200, justify: 'center', alignItems: 'center', borderRadius: 2,}}
                src={QuestionsData[current].image}
                alt="picture">
                </CardMedia> 
            </Grid>

            {/* answer box */}
          <Grid container spacing={0} alignItems="center" justifyContent="center">
            <Box sx={{ width: '90%', mb: 1}}>
                <Stack spacing={2}>
                    <h1>Data from GoogleSheet</h1>
                    <ul>
                        {sheetdata.map((item, i) => (
                         <Fragment key={i}>
                        <li>URL -- {item.question}</li>
                        <li>Email - {item.choiceA}</li>
                        <li>Token - {item.choiceB}</li>
                        <br />
                        </Fragment>
                        ))}
                    </ul>
                    <Item variant="outlined" sx={{ borderLeft: 20, borderRight: 20, borderColor: 'blue', height: '40px', padding: 1.5}}>
                        <Typography color="black" sx={{ fontSize: 17}}>
                            {QuestionsData[current].A}
                        </Typography>
                    </Item>

                    <Item variant="outlined" sx={{ borderLeft: 20, borderRight: 20, borderColor: '#ffc107', height: '40px', padding: 1.5}}>
                        <Typography color="black" sx={{ fontSize: 17}}>
                            {QuestionsData[current].B}
                        </Typography>
                    </Item>

                    <Item variant="outlined" sx={{ borderLeft: 20, borderRight: 20, borderColor: 'red', height: '40px', padding: 1.5}}>
                        <Typography color="black" sx={{ fontSize: 17}}> 
                            {QuestionsData[current].C}
                        </Typography>
                    </Item>

                    <Item variant="outlined" sx={{ borderLeft: 20, borderRight: 20, borderColor: '#00c853', height: '40px', padding: 1.5}}>
                        <Typography color="black" sx={{ fontSize: 17}}> 
                            {QuestionsData[current].D}
                        </Typography>
                    </Item>
                </Stack>
            </Box>
            </Grid> 

            <Stack spacing={2} direction="row">
                <Button variant='outlined' disabled={current === 0} onClick={()=>prevQ()} color="primary" startIcon={<ArrowBackIosNewOutlinedIcon/>}></Button> 
                <Button variant='outlined' disabled={current === QuestionsData.length - 1} onClick={()=>nextQ()} color="primary" endIcon={<ArrowForwardIosOutlinedIcon/>}></Button> 
            </Stack>
                <Typography sx={{ textAlign: 'center', mt: 1}}>{`${current  + 1}`} / {`${QuestionsData.length}`}</Typography>   
        </Grid>
    );
}

export default Quiz;
