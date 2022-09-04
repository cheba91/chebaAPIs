import {
   Typography,
   Button,
   CardActionArea,
   CardActions,
   Link,
   ButtonGroup,
   Box,
} from '@mui/material';
import { useEffect, useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
const AnimalCard = ({ data }) => {
   if (data) console.log('Have data', data);
   return (
      <Card sx={{ maxWidth: 500, margin: '3rem auto 0' }}>
         {data.imageSrc && (
            <CardMedia
               component="img"
               height="250"
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
                  {` Location: ${data.location}`}
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
                  <Button size="small" color="primary">
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

   // useEffect(() => {
   //    setIsLoading(true);
   //    // fetch('https://random-data-api.com/api/v2/users?size=2&is_xml=true')
   //    fetch(extinctApiUrl)
   //       .then((res) => res.json())
   //       .then((data) => {
   //          data.status == 'success'
   //             ? setApiData(data.data[0])
   //             : setIsError(true);
   //          // console.log(apiData);
   //          setIsLoading(false);
   //       });
   // }, []);

   // data.status == 'success'
   // ? setApiData(data.data[0])
   // : setIsError(true);
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
         <Typography>
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
         {/* Example API call */}
         <Box
            sx={{
               display: 'grid',
               gap: 1,
               gridTemplateColumns: 'repeat(2, 1fr)',
               marginTop: '3rem',
            }}
         >
            <Box>
               <Typography>Few stats</Typography>
               <ButtonGroup
                  disableElevation
                  variant="contained"
                  aria-label="Disabled elevation buttons"
                  sx={{
                     justifyContent: 'center',
                     width: '500px',
                  }}
               >
                  <Button
                     sx={{
                        textTransform: 'none',
                        padding: '1rem',
                        width: '350px',
                     }}
                     disabled
                  >
                     {extinctApiUrl}
                  </Button>
                  <Button
                     onClick={handleCall}
                     sx={{
                        textTransform: 'none',
                        padding: '1rem',
                        width: '150px',
                     }}
                  >
                     Get animal!
                  </Button>
               </ButtonGroup>
               {/* Display animal card data */}
               {apiData && !isLoading && !isError && (
                  <AnimalCard data={apiData} />
               )}
               {isError && (
                  <Typography>Error Occured while trying to fetch.</Typography>
               )}
            </Box>
            <Box>
               <Typography>Example response</Typography>
            </Box>
         </Box>
      </>
   );
}
