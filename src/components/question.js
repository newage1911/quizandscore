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
import axios from 'axios';

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
    const [cookies, setCookie] = useCookies([COOKIE_NAME]);
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getQuestion = async () => {
            // return fetch(`https://sheets.googleapis.com/v4/spreadsheets/${process.env.REACT_APP_SPREDSHEET_ID}/values/${process.env.REACT_APP_SHEET_NAME}!A1:Z1000?key=${process.env.REACT_APP_API_KEY}`)
            return await fetch("https://script.googleusercontent.com/macros/echo?user_content_key=uFIrSePkOsIBBACUCR98iSvXD8FRMcsIWHZGj1XAf2wXNxwZqcUUr1wiWeYBajdkpPOPcYnbbLPX2HlVrgU5rdCaagxoymj7m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCwryv3w9MCuFla6DWAEU9PBdKyAdhtQY2QW8zMB4OoKiH2X3pqZUq6vD8GiUnv9Xcwjbg623AW6oU5220qs4YrSzjMKLFyKHw&lib=MF-k_scGN0lwc8LIgpOLi5jp7AesQ_qkZ")
            .then((respone) => respone.json())
            .then((data) => {
                setData(data)
                console.log(data)
            });
        }
        getQuestion()
    }, [])

    // useEffect(() => {
    //     const loadQuestion = async () => {

    //         setLoading(true);
    //         const response = await axios.get(
    //         "https://script.googleusercontent.com/macros/echo?user_content_key=uFIrSePkOsIBBACUCR98iSvXD8FRMcsIWHZGj1XAf2wXNxwZqcUUr1wiWeYBajdkpPOPcYnbbLPX2HlVrgU5rdCaagxoymj7m5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnCwryv3w9MCuFla6DWAEU9PBdKyAdhtQY2QW8zMB4OoKiH2X3pqZUq6vD8GiUnv9Xcwjbg623AW6oU5220qs4YrSzjMKLFyKHw&lib=MF-k_scGN0lwc8LIgpOLi5jp7AesQ_qkZ");
    //         setData(response.data);
    //         setLoading(false);
    //         console.log("this is a",data)
    //     }

    //     loadQuestion();
    // }, []);

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

    if(!data) {
        return null
    }

    return (
        <Grid container spacing={0} direction="column" alignItems="center" justify="center" sx={{ mt: 1 }}>
            <Box sx={{ width: '85%', height: '70px'}}>
                <Typography variant='h6' sx={{ textAlign: 'center'}}>
                {/* {loading ? (
                    <h4>Loading...</h4>) :
                    (data.map((item) =>
                        // Presently we only fetch 
                        // title from the API 
                        <h4>{item.question}</h4>)
                    )
                } */}
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

            {/* button next and prev page */}
            <Stack spacing={2} direction="row">
                <Button variant='outlined' disabled={current === 0} onClick={()=>prevQ()} color="primary" startIcon={<ArrowBackIosNewOutlinedIcon/>}></Button> 
                <Button variant='outlined' disabled={current === data.result.length - 1} onClick={()=>nextQ()} color="primary" endIcon={<ArrowForwardIosOutlinedIcon/>}></Button> 
            </Stack>

            {/* pagination */}
            <Typography sx={{ textAlign: 'center', mt: 1}}>{`${current  + 1}`} / {data.result.length}</Typography>   
        </Grid>
    );
}

export default Quiz;
