import * as React from 'react';
import { Grid, Typography } from "@mui/material";
import ScoreList from './components/score';
import Quiz from './components/question';
import './App.css';


function App() {


  return (
      <Grid container spacing={1} alignItems="center" justifyContent="center" xs={12}>

      {/* question */}
      <Grid container spacing={0} direction="column" alignContent="flex-end" item xs={12} md={6}> 
        <Grid justifyContent="center" sx={{ width:700, height: 650, bgcolor: '#1565c0', mt:7, borderRadius: 2}}>
          <Typography sx={{ textAlign: 'center', fontSize: 40, fontWeight: 'bold', color: 'white'}}> Question </Typography>
            {/* quiz */}
            <Grid sx={{ width: 1, height: '89%', bgcolor: 'white', border: 10, borderRadius: 4, borderColor:'#1565c0'}}>
              <Quiz/>
            </Grid>   
        </Grid>
      </Grid>

    {/* score */}
    <Grid container spacing={0} direction="column" item xs={12} md={6}>
     <ScoreList/>
    </Grid>
      </Grid>
    
  );
}

export default App;