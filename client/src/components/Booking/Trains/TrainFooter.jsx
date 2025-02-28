
import { Container, Grid, Typography, IconButton } from '@mui/material';
import { Facebook, WhatsApp, YouTube, Instagram, LinkedIn, Telegram, Pinterest, Twitter } from '@mui/icons-material';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#212121', color: 'white', padding: '20px 0' ,marginTop:'32px'}}>
      <Container >
        <Grid container spacing={4} justifyContent="space-between">
          {/* Social Media Icons */}
          <Grid item xs={12} sm={6}>
            <div>
              <IconButton color="primary"> <Facebook /> </IconButton>
              <IconButton color="primary"> <WhatsApp /> </IconButton>
              <IconButton color="primary"> <YouTube /> </IconButton>
              <IconButton color="primary"> <Instagram /> </IconButton>
              <IconButton color="primary"> <LinkedIn /> </IconButton>
              <IconButton color="primary"> <Telegram /> </IconButton>
              <IconButton color="primary"> <Pinterest /> </IconButton>
              <IconButton color="primary"> <Twitter /> </IconButton>
            </div>
          </Grid>

          {/* Footer Links */}
          <Grid item xs={12} sm={6}>
            <Grid container spacing={2}>
              <Grid item xs={6} sm={3}>
                <Typography variant="h6">IRCTC Trains</Typography>
                <Typography variant="body2">General Info</Typography>
                <Typography variant="body2">Important Info</Typography>
                <Typography variant="body2">Agents</Typography>
                <Typography variant="body2">Enquiries</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h6">Services</Typography>
                <Typography variant="body2">IRCTC eWallet</Typography>
                <Typography variant="body2">IRCTC iPay</Typography>
                <Typography variant="body2">DMRC Ticket Booking</Typography>
                <Typography variant="body2">Refund Rules</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h6">Support</Typography>
                <Typography variant="body2">Help & Support</Typography>
                <Typography variant="body2">Policies</Typography>
                <Typography variant="body2">Mobile Zone</Typography>
                <Typography variant="body2">Ask Disha ChatBot</Typography>
              </Grid>
              <Grid item xs={6} sm={3}>
                <Typography variant="h6">About Us</Typography>
                <Typography variant="body2">Advertise with us</Typography>
                <Typography variant="body2">Person with Disability</Typography>
                <Typography variant="body2">IRCTC Zone</Typography>
                <Typography variant="body2">Newly Migrated Agents</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography align="center" style={{ marginTop: '20px', borderTop: '1px solid gray', paddingTop: '10px' }}>
          &copy; 2025 www.irctc.co.in. All Rights Reserved
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
