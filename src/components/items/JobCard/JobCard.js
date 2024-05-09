import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, Chip, Avatar, Box } from '@mui/material';
import styles from './jobCard.module.css';
import { Link } from 'react-router-dom';

const JobCard = ({
  jdLink,
  jobDetailsFromCompany,
  maxJdSalary,
  minJdSalary,
  salaryCurrencyCode,
  location,
  minExp,
  maxExp,
  jobRole,
  companyName,
  logoUrl
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Card className={styles.cardBody}>
      <Box className={styles.chipContainer}>
        <Chip 
          className={styles.chip} 
          sx={{
            '&.MuiChip-root': {
              height: 'fit-content'
            }
          }} 
          label="⏳ Posted 10 days ago"
        />
      </Box>
      <CardContent className={styles.cardContent}>
        <Box display='flex' gap={1.2}>
          <img
            className={styles.logo} 
            src={logoUrl} 
            alt="company_image"
          />
          <Box>
            <Typography variant='h3' className={styles.title}>
              {companyName}
            </Typography>
            <Typography variant='h2' className={styles.subTitle}>
              {jobRole}
            </Typography>
            <Typography className={styles.location}>
              {location}
            </Typography>
          </Box>
        </Box>  
        <Typography variant='body2' className={styles.salary}>
          Estimated Salary: {salaryCurrencyCode} {minJdSalary} {minJdSalary != null && maxJdSalary != null && '-'} {maxJdSalary} LPA ✅
        </Typography>
        <Box 
          className={styles.aboutContainer} 
          sx={{
            maskImage: !isVisible ? 'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0)) !important' : 'unset',
          }}
        >
          <Box>
            <Typography variant="body1" fontWeight={500}>
              About Company:
            </Typography>
            <Box 
              fontSize='14px' 
              whiteSpace='pre-wrap' 
              padding='0 20px 0 0'
            >
              <p><strong>About Us</strong></p>
              <p 
                className={styles.aboutDescription}
                style={{
                  height: !isVisible ? 'auto' : '167px',
                  overflow: !isVisible ? 'hidden' : 'auto'
                }}
              >
                <span style={{fontWeight: '400'}}>
                  {jobDetailsFromCompany}
                </span>
              </p>
            </Box>
          </Box>
        </Box>
        <Box 
          className={styles.viewButtonContainer} 
          sx={{
            top: !isVisible ? '-27px' : '0px',
            marginTop: !isVisible ? '0' : '20px'
          }}
        >
          <div className={styles.viewButton} onClick={() => setIsVisible(!isVisible)}>
            {
              isVisible ? 'Hide job' : 'View job'
            }
          </div>
        </Box>
        <Box>
          <Typography variant='h3' className={styles.title}>
            Minimum Experience:
          </Typography>
          <Typography variant='h2' className={styles.subTitle}>
            {minExp !== null? minExp: 0} years
          </Typography>
        </Box>
      </CardContent>
      <Box className={styles.cardActions}>
        <Button className={styles.cardActionsApplyButton} variant="contained">
          ⚡ Easy Apply
        </Button>
        <Button className={styles.cardActionsReferralButton} variant="contained">
          <Box display='flex' gap={.7} mr={1.2}>
            <Avatar 
              alt="Company Logo" 
              src={'https://blog.photofeeler.com/wp-content/uploads/2017/12/linkedin-profile-picture.jpg'} 
              className={styles.cardActionsButtonAvatar}
            /> 
            <Avatar 
              alt="Company Logo" 
              src={'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'} 
              className={styles.cardActionsButtonAvatar}
            /> 
          </Box>
          <span className={styles.cardActionsButtonSpan}>Unlock referral asks</span>    
        </Button>  
      </Box>
    </Card>
  );
};

export default JobCard;
