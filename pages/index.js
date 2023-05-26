// import { useEffect, useState } from "react";
import { MongoClient } from "mongodb";
import MeetupList from "../components/meetups/MeetupList";

const HomePage = (props) => {
  // the page source show the HTML that was render for the first time.And that time meetUp will be just am empty array.
  //Then even after changing due to useEffect. The HTML does not change.
  // The above problem is for search engines.

  // const [meetUp, setMeetups] = useState([]);
  // useEffect(() => {
  //   setMeetups(meets);
  // }, []);

  return <MeetupList meetups={props.meetups} />;
};

//revalidate: 10 => means our page will fetch data from database or api(update) in every 10sec after deploying.So the page
//remains static and keep hold the meaning of prerendering. Otherwise after deployment we will see older data.

export const getStaticProps = async () => {
  // fetch data from api or database (this code won't be shown on client side (Jab ki ye client side me h))
  //our credentials are secure in here. (this bundle won't be shown at client side or browser)
  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client.db();
  const meetUpsCollection = db.collection("meetups");
  const meetups = await meetUpsCollection.find().toArray();
  console.log("MEETS ARE", meetups);
  client.close();
  return {
    props: {
      meetups: (await meetups).map((meet) => ({
        title: meet.title,
        image: meet.image,
        address: meet.address,
        id: meet._id.toString(),
      })),
    },
    // props: {                                      //This is working too
    //   meetups: meetups.map((meet) => {
    //     return { ...meet, _id: meet._id.toString() };
    //   }),
    // },
    revalidate: 1,
  };
};

//2nd Solution
//This runs every time for a incoming request.Now the page is pregenerated for every request.
// export const getServerSideProps = async (context) => {
//   // const req=context.req;          ==> can play with incoming request
//   // const res=context.res;

//   //fetch data from api or DB
//   return {
//     props: {
//       meetups: meets,
//     },
//   };
// };

export default HomePage;
