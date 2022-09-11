import Head from 'next/head';

export default function MetaHead({
   title = 'chebaAPIs',
   keywords = "Frontend for my API's",
   description = `Frontend for my API's`,
   image = '/favicon.ico', // link to image of current page
   //    ogType = 'blog', // type of current page
}) {
   const staticData = {
      baseUrl: 'https://www.cheba.me',
      companyName: 'Cheba - Web developer',
      twitterHandle: '@BlazCheba',
   };
   return (
      <Head>
         {/* //basic metadata */}
         <title>{title}</title>
         <meta name="viewport" content="width=device-width, initial-scale=1" />
         <meta name="description" content={description} />
         <meta name="keywords" content={keywords} />
         {/* //twitter metadata */}
         <meta name="twitter:card" content="summary" />
         <meta name="twitter:site" content={staticData.twitterHandle} />
         <meta name="twitter:title" content={title} />
         <meta name="twitter:description" content={description} />
         <meta name="twitter:image" content={staticData.baseUrl + image} />
         {/* //canonical link */}
         <link rel="canonical" href={staticData.baseUrl} />
         {/* //open graph metadata */}
         <meta property="og:locale" content="en_US" />
         <meta property="og:site_name" content={staticData.companyName} />
         <meta property="og:type" content={ogType} />
         <meta property="og:title" content={title} />
         <meta property="og:description" content={description} />
         <meta property="og:image" content={staticData.baseUrl + image} />
         <meta property="og:url" content={staticData.baseUrl} />
      </Head>
   );
}
