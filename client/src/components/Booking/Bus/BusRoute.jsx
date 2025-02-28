

import { Card, CardMedia, CardContent, Typography, Grid, Container } from "@mui/material";
import travelData from "../../Data/TravalData.json";

const BusRoute = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
      Top Bus Routes 
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {travelData.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.from}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Buses From {item.from} To:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.to.join(", ")}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default BusRoute;
