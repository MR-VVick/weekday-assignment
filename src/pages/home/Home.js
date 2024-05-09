import React from 'react';
import JobCard from '../../components/items/JobCard/JobCard';
import { Grid } from '@mui/material';
import styles from './home.module.css';

const Home = () => {
  return (
    <>
      <Grid container spacing={4} sx={{padding: '24px'}}>
        {Array.from({ length: 10 }, (_, index) => (
          <Grid item xs={12} md={4} key={index} className={styles.gridItem}>
            <JobCard/>
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default Home