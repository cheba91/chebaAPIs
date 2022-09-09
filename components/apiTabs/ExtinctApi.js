import { Typography, Button, CardActions, Link, Grid } from '@mui/material';
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { data as jsonData } from '../../utils/extinctJSONdata';
import DisplayJson from '../ui/DisplayJson';

const AnimalCard = ({ data }) => {
   if (data) console.log('Have data', JSON.stringify(data));
   return (
      <Card sx={{ maxWidth: 500, margin: '2rem auto 0' }}>
         {data.imageSrc && (
            <CardMedia
               component="img"
               height="250"
               sx={{ objectFit: 'contain' }}
               image={data.imageSrc}
               alt={data.binomialName}
            />
         )}
         <CardContent>
            {/* Common name */}
            {data.commonName ? (
               <Typography gutterBottom variant="h5" component="div">
                  {data.commonName}
               </Typography>
            ) : (
               "Doesn't have common name"
            )}
            {/* Binomial name */}
            {data.binomialName && (
               <Typography
                  // gutterBottom
                  variant="p"
                  component="div"
                  sx={{ fontStyle: 'italic' }}
               >
                  {data.binomialName}
               </Typography>
            )}
            {/* Location */}
            {data.location && (
               <Typography gutterBottom variant="p" component="div">
                  {`🌎 ${data.location}`}
               </Typography>
            )}
            {/* Description */}
            {data.shortDesc ? (
               <Typography variant="body2" color="text.secondary">
                  {data.shortDesc}
               </Typography>
            ) : (
               'No animal nescription was found'
            )}
         </CardContent>
         {/* Wiki Link */}
         {data.wikiLink ? (
            <CardActions>
               <Link underline="none" href={data.wikiLink} target="_blank">
                  <Button
                     size="small"
                     color="primary"
                     variant="oulined"
                     sx={{
                        textTransform: 'none',
                     }}
                  >
                     Visit Wikipedia page
                  </Button>
               </Link>
            </CardActions>
         ) : (
            "Doesn't have dedicated Wikipedia page"
         )}
      </Card>
   );
};

export default function ExtinctApi() {
   const [apiData, setApiData] = useState(null);
   const [isError, setIsError] = useState(false);
   const [isLoading, setIsLoading] = useState(false);
   const extinctApiUrl = 'https://extinct-api.herokuapp.com/api/v1/animal/';

   const handleCall = async () => {
      setIsLoading(true);
      try {
         const res = await fetch(extinctApiUrl);
         const data = await res.json();
         data.status == 'success' ? setApiData(data.data[0]) : setIsError(true);
         setIsLoading(false);
      } catch (err) {
         setIsError(true);
      }
   };

   return (
      <>
         <Typography
            variant="h3"
            component="h1"
            sx={{ textAlign: 'center', marginBottom: '3rem' }}
         >
            {`Extinct API`}
         </Typography>
         {/* API description */}
         <Typography sx={{ marginBottom: '3rem', textAlign: 'center' }}>
            {`This API provides animals that are known to have become extinct in
            the last 11.650 years(Holocene). Data was gathered by scraping `}
            <Link
               href="https://en.wikipedia.org/wiki/Timeline_of_extinctions_in_the_Holocene"
               target="_blank"
            >
               this Wikipedia page
            </Link>
            {` and each animal's page individually.`}
         </Typography>
         {/* Flex items */}
         <Grid container sx={{ justifyContent: 'center' }}>
            {/* Left side */}
            <Grid item xs={12} lg={6}>
               <Typography sx={{ fontWeight: '600' }}>Few stats:</Typography>
               <Typography>- 804 animals in total</Typography>
               <Typography>- 220 are without image</Typography>
               <Typography>
                  - 6 are without description and their own Wiki page
               </Typography>
               <Typography>- 30 are without common name</Typography>
               <Typography>- they all have binomial name</Typography>
               <Typography
                  sx={{
                     fontWeight: '600',
                     marginTop: '2rem',
                     marginBottom: '1rem',
                  }}
               >
                  Method: GET
               </Typography>
               <Typography>
                  https://extinct-api.herokuapp.com/api/v1/animal/
               </Typography>
               <Typography>Returns one random animal.</Typography>
               <Typography
                  sx={{
                     marginTop: '1rem',
                  }}
               >
                  Optional parameter:
               </Typography>
               <Typography
                  sx={{
                     paddingBottom: '1rem',
                     borderBottom: '1px solid #ccc',
                  }}
               >{` &imageRequired={true/false} // default is true`}</Typography>
               <Typography
                  sx={{
                     fontWeight: '600',
                     marginTop: '2rem',
                     marginBottom: '1rem',
                  }}
               >
                  Method: GET
               </Typography>
               <Typography
                  sx={{
                     marginTop: '1rem',
                  }}
               >
                  {`https://extinct-api.herokuapp.com/api/v1/animal/{number}`}
               </Typography>
               <Typography>
                  Returns specified number of animals, accepts from 1 to 804.
               </Typography>
            </Grid>
            {/* Right Side */}
            <Grid
               item
               md={12}
               lg={6}
               sx={{
                  paddingLeft: { md: 0, lg: '2rem' },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
               }}
            >
               <Typography sx={{ marginBottom: '2rem', textAlign: 'center' }}>
                  {`API is hosted on Heroku and goes to sleep after 30 minutes of inactivity, so it might take some time the first time you call it.`}
               </Typography>

               {/* Example API call */}
               <Button
                  variant="contained"
                  onClick={handleCall}
                  sx={{
                     textTransform: 'none',
                     marginLeft: 'auto',
                     marginRight: 'auto',
                     textAlign: 'center',
                  }}
               >
                  Call API
               </Button>
               {/* Display animal card data */}
               {apiData && !isLoading && !isError && (
                  <AnimalCard data={apiData} />
               )}
               {isError && (
                  <Typography>Error Occured while trying to fetch.</Typography>
               )}
            </Grid>
         </Grid>
         <Typography sx={{ marginTop: '3rem' }}>Example response</Typography>
         <DisplayJson jsonData={jsonData} />
      </>
   );
}
