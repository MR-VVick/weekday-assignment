import React, { useState } from 'react';
import { Card, CardContent, Typography, Button, CardActions, Chip, Avatar, Box} from '@mui/material';
import styles from './jobCard.module.css';
import { Link } from 'react-router-dom';

const JobCard = () => {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <Card className={styles.cardBody}>
      <Box className={styles.chipContainer}>
        <Chip 
          className={styles.chip} 
          sx={{
            '&.MuiChip-root':{
              height: 'fit-content'
            }
          }} 
          label="⏳ Posted 10 days ago"/>
      </Box>
      <CardContent className={styles.cardContent}>
        <Box display='flex' gap={1.2}>
          <img
            className={styles.logo} 
            src="https://storage.googleapis.com/weekday-assets/airtableAttachment_1713598325603_7ico7.jpg" 
            alt="company_image"/>
          <Box>
            <Typography variant='h3' className={styles.title}>
              fampay
            </Typography>
            <Typography variant='h2' className={styles.subTitle}>
              Backend Engineer
            </Typography>
            <Typography className={styles.location}>
              Bangalore
            </Typography>
          </Box>
        </Box>  
        <Typography variant='body2' className={styles.salary}>
          Estimated Salary: ₹18 - 35 LPA ✅
        </Typography>
        <Box 
          className={styles.aboutContainer} 
          sx={{
            maskImage: !isVisible?'linear-gradient(rgb(255, 255, 255), rgb(255, 255, 255), rgba(255, 255, 255, 0)) !important':'unset',
          }}>
          <Box>
            <Typography variant="body1" fontWeight={500}>
              About Company:
            </Typography>
            <Box 
              fontSize='14px' 
              whiteSpace='pre-wrap' 
              padding='0 20px 0 0'>
              <p><strong>About Us</strong></p>
              <p 
                className={styles.aboutDescription}
                style={{
                    height: !isVisible?'auto':'167px',
                    overflow: !isVisible?'hidden':'auto'
                }}>
                <span style={{fontWeight: '400'}}>
                This is a sample job and you must have displayed it to understand that its not just some random lorem ipsum text but something which was manually written. Oh well, if random text is what you were looking for then here it is: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages and now in this assignment.
                </span>
              </p>
            </Box>
          </Box>
        </Box>
        <Box 
          className={styles.viewButtonContainer} 
          sx={{
            top: !isVisible?'-27px':'0px',
            marginTop: !isVisible?'0':'20px'
          }}>
          <div className={styles.viewButton} onClick={() => setIsVisible(!isVisible)}>
            {
              isVisible? 'Hide job': 'View job'
            }
          </div>
        </Box>
        <Box>
            <Typography variant='h3' className={styles.title}>
            Minimum Experience:
            </Typography>
            <Typography variant='h2' className={styles.subTitle}>2 years</Typography>
        </Box>
      </CardContent>
      <Box className={styles.cardActions}>
        <Button className={styles.cardActionsApplyButton} variant="contained">
        ⚡ Easy Apply
        </Button>
        {/* <Button className={styles.cardActionsReferralButton} variant="contained">
            <Avatar 
                alt="Remy Sharp" 
                src="/static/images/avatar/1.jpg" 
                className={styles.cardActionsButtonAvatar}/> 
            <span className={styles.cardActionsButtoSpan}>Unlock referral asks</span>    
        </Button> */}
      </Box>
    </Card>
  );
};

export default JobCard;
