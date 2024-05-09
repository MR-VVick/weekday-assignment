import React, { useState, useEffect } from 'react';
import JobCard from '../../components/items/JobCard/JobCard';
import { Grid, CircularProgress } from '@mui/material';
import styles from './home.module.css';
import { getSampleJdJSON } from '../data';

const Home = () => {
  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 9;
  const [hasMore, setHasMore] = useState(true)

  const fetchJobData = () => {
    if (loading || !hasMore) return;
    setLoading(true);
    setTimeout(() => {
      const newDataSlice = getSampleJdJSON().slice(startIndex, startIndex + itemsPerPage);

      if (newDataSlice.length > 0) {
        setJobData(prevData => [...prevData, ...newDataSlice]);
        setStartIndex(prevIndex => prevIndex + itemsPerPage);
      } else {
        setHasMore(false);
      }

      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    const initialDataSlice = getSampleJdJSON().slice(0, itemsPerPage);
    setJobData(initialDataSlice);
    setStartIndex(itemsPerPage);
  }, []);

  const handleScroll = () => {
    const scrollHeight = window.innerHeight + document.documentElement.scrollTop;
    const totalHeight = document.documentElement.offsetHeight;
    const tolerance = 1;
    if (Math.abs(scrollHeight - totalHeight) <= tolerance) {
      fetchJobData();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startIndex, loading, hasMore]);

  return (
    <>
      <Grid container spacing={4} sx={{ padding: '24px' }}>
        {jobData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={4} xl={4} key={index} className={styles.gridItem}>
            <JobCard
              jdLink={item?.jdLink}
              jobDetailsFromCompany={item?.jobDetailsFromCompany}
              maxJdSalary={item?.maxJdSalary}
              minJdSalary={item?.minJdSalary}
              salaryCurrencyCode={item?.salaryCurrencyCode}
              location={item?.location}
              minExp={item?.minExp}
              maxExp={item?.maxExp}
              jobRole={item?.jobRole}
              companyName={item?.companyName}
              logoUrl={item?.logoUrl}
            />
          </Grid>
        ))}
      </Grid>
      {loading && (
        <div className={styles.loaderContainer}>
          <CircularProgress />
        </div>
      )}
      {!hasMore && <p>No more jobs to load.</p>}
    </>
  );
};

export default Home;
