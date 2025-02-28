
import { Container, Grid, Card, CardMedia, CardContent, Typography } from "@mui/material";
import countery from "../../Data/holidays.json";

const TrainHolidayPage = () => {
  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        HOLIDAYS
      </Typography>
      <Grid container spacing={3} justifyContent="center" sx={{ mt: 3 }}>
        {countery.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={item.key || index}>
            <Card>
              <CardMedia component="img" height="200" image={item.imageSrc} alt={item.title} />
              <CardContent>
                <Typography variant="h6">{item.name}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {item.title || "Discover more about this destination!"}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default TrainHolidayPage;
