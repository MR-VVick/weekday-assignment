import React, { useEffect } from 'react';
import JobCard from '../../components/items/JobCard/JobCard';
import { Grid, CircularProgress, Box, Typography, TextField } from '@mui/material';
import styles from './home.module.css';
import {
  setLoading,
  setJobData,
  setStartIndex,
  setHasMore,
  setSelectedMinExp,
  setSelectedCompany,
  setSelectedLocation,
  setSelectedMinPay,
  setSelectedRole,
  setSelectedWorkMode
} from '../../service/actions/actions';
import { getExperienceData, getSampleJdJSON, getWorkModeData } from './data';
import Select from 'react-select';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const dispatch = useDispatch();

  // Selecting state from Redux store
  const { 
    jobData, 
    loading, 
    startIndex, 
    hasMore, 
    selectedMinExp,
    selectedMinPay,
    selectedCompany,
    selectedRole,
    selectedLocation,
    selectedWorkMode
  } = useSelector(state => state.job);

  const itemsPerPage = 9;
  const experienceData = getExperienceData();
  const workModeData = getWorkModeData();
  const allData = getSampleJdJSON();
  
  // Initialize data on component mount
  useEffect(() => {
    const initialDataSlice = allData.slice(0, itemsPerPage);
    dispatch(setJobData(initialDataSlice));
    dispatch(setStartIndex(itemsPerPage));
  }, []);

  // Handle infinite scroll
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [startIndex, loading, hasMore, selectedMinExp, selectedCompany, selectedLocation, selectedMinPay, selectedRole, selectedWorkMode]);

  // Fetch job data based on filter changes
  useEffect(() => {
    fetchJobData();
  }, [selectedMinExp, selectedCompany, selectedLocation, selectedMinPay, selectedRole, selectedWorkMode]);

  // Generate a list of minimum salary options
  const generateMinSalaryList = () => {
    const maxSalary = Math.max(...allData.map(item => item.maxJdSalary));
    let minSalary = 0;
    const minSalaryList = [];

    while (minSalary <= maxSalary) {
      minSalaryList.push({ value: minSalary, label: minSalary.toString() + 'L' });
      minSalary += 10;
    }

    return minSalaryList;
  };

  // Extract unique location names from job data
  const getUniqueLocationNames = () => {
    const locationNames = new Set();
    allData.forEach(job => {
      locationNames.add(job.location);
    });
    return Array.from(locationNames).map(location => ({
      value: location,
      label: location
    }));
  };

  // Extract unique job roles from job data
  const getUniqueRoles = () => {
    const roles = new Set();
    allData.forEach(job => {
      roles.add(job.jobRole);
    });
    return Array.from(roles).map(role => ({
      value: role,
      label: role
    }));
  };

  // Fetch job data based on current filters
  const fetchJobData = () => {
    if (loading || !hasMore) return;
    dispatch(setLoading(true));

    setTimeout(() => {
      let filteredData = allData;
      const filters = {
        minExp: selectedMinExp,
        companyName: selectedCompany,
        role: selectedRole,
        location: selectedLocation,
        minBasePay: selectedMinPay,
        remote: selectedWorkMode,
      };
      
      filteredData = applyFilters(filteredData, filters);

      const newDataSlice = filteredData.slice(startIndex, startIndex + itemsPerPage);

      if (newDataSlice.length > 0) {
        dispatch(setJobData([...jobData, ...newDataSlice]));
        dispatch(setStartIndex(startIndex + itemsPerPage));
      } else {
        dispatch(setHasMore(false));
      }

      dispatch(setLoading(false));
    }, 1000);
  };

  // Handle scroll event for infinite scrolling
  const handleScroll = () => {
    const scrollHeight = window.innerHeight + document.documentElement.scrollTop;
    const totalHeight = document.documentElement.offsetHeight;
    const tolerance = 1;
    if (Math.abs(scrollHeight - totalHeight) <= tolerance) {
      fetchJobData();
    }
  };

  // Handle filter changes and update Redux state
  const handleFilterChange = (key, selectedOptions) => {
    let values = null;

    if (selectedOptions) {
      if (Array.isArray(selectedOptions)) {
        values = selectedOptions.map(option => option.value);
      } else {
        values = selectedOptions.value;
      }
    }
  
    if (Array.isArray(values) && values.length === 0) {
      values = null;
    }

    switch (key) {
      case 'minExp':
        dispatch(setSelectedMinExp(values));
        break;
      case 'companyName':
        dispatch(setSelectedCompany(values));
        break;
      case 'role':
        dispatch(setSelectedRole(values));
        break;
      case 'location':
        dispatch(setSelectedLocation(values));
        break;
      case 'minBasePay':
        dispatch(setSelectedMinPay(values));
        break;
      case 'remote':
        dispatch(setSelectedWorkMode(values));
        break;
      default:
        break;
    }

    // Reset pagination and fetch new data
    dispatch(setJobData([]));
    dispatch(setStartIndex(0));
    dispatch(setHasMore(true));
  };

  // Apply filters to job data
  const applyFilters = (data, filters) => {
    return data.filter(item => {
      const meetsMinExp = !filters.minExp || item.minExp >= filters.minExp;
      const matchesCompanyName = !filters.companyName || item.companyName.toLowerCase().includes(filters.companyName.toLowerCase());
      const matchesRole = !filters.role || filters.role.some(role => item.jobRole.toLowerCase().includes(role.toLowerCase()));
      const matchesLocation = !filters.location || filters.location.some(loc => item.location.toLowerCase().includes(loc.toLowerCase()));
      const meetsMinBasePay = !filters.minBasePay ||  item.minJdSalary >= filters.minBasePay;
      const matchesRemote = !filters.remote || (
        filters.remote.includes('remote') && item.location === 'remote'
      ) || (
        filters.remote.includes('on-site') && item.location !== 'remote'
      );

      return (
        meetsMinExp &&
        matchesCompanyName &&
        matchesRole &&
        matchesLocation &&
        meetsMinBasePay &&
        matchesRemote
      );
    });
  };

  // Render the component
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 7,
        padding: '24px'
      }}
    >
      <Box display='flex' flexDirection='row' gap={2} flexWrap='wrap'>
        {/* Selectors for filtering */}
        <Select
          options={experienceData}
          placeholder="Experience"
          onChange={(selectedOption) => handleFilterChange('minExp', selectedOption)}
          isClearable
        />
        <TextField
          inputProps={{
            style: {
              height: '5px',
            },
          }}
          placeholder="Search Company Name"
          onChange={(event) => handleFilterChange('companyName', {value: event.target.value})}
          value={selectedCompany}
        />
        <Select
          options={getUniqueLocationNames()}
          placeholder="Location"
          onChange={(selectedOption) => handleFilterChange('location', selectedOption)}
          isClearable
          isMulti
        />
        <Select
          options={workModeData}
          placeholder="Remote"
          onChange={(selectedOption) => handleFilterChange('remote', selectedOption)}
          isClearable
          isMulti
        />
        <Select
          options={getUniqueRoles()}
          placeholder="Role"
          onChange={(selectedOption) => handleFilterChange('role', selectedOption)}
          isClearable
          isMulti
          styles={{
            option: (base) => ({
              ...base,
              textTransform: 'capitalize'
            }),
          }}
        />
        <Select
          options={generateMinSalaryList()}
          placeholder="Minimum Base Pay Salary"
          onChange={(selectedOption) => handleFilterChange('minBasePay', selectedOption)}
          isClearable
        />
      </Box>
      {/* Display job cards or no data message */}
      {
        jobData.length !== 0 ? (
          <Grid container spacing={4}>
            {jobData.map((item, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                lg={4}
                xl={4}
                key={index}
                className={styles.gridItem}
              >
                <JobCard
                  jdLink={item?.jdLink}
                  jobDetailsFromCompany={item?.jobDetailsFromCompany}
                  maxJdSalary={item?.maxJdSalary}
                  minJdSalary={item?.minJdSalary}
                  salaryCurrencyCode={item?.salaryCurrencyCode}
                  location={item?.location}
                  minExp={item?.minExp}
                  jobRole={item?.jobRole}
                  companyName={item?.companyName}
                  logoUrl={item?.logoUrl}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          // Display no jobs message if no data and not loading
          !loading && (
            <Box display='flex' flexDirection='column' alignItems='center' width='100%'>
              <img width={150} height={150} src="https://jobs.weekday.works/_next/static/media/nothing-found.4d8f334c.png" alt="image" />
              <Typography className={styles.noDataText} variant='body1'>No Jobs available for this category at the moment</Typography>
            </Box>
          )
        )
      }

      {/* Display loader if loading */}
      {loading && (
        <div className={styles.loaderContainer}>
          <CircularProgress />
        </div>
      )}
    </Box>
  );
};

export default Home;
