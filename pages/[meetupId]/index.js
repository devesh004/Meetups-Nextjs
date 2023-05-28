// import React from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = (props) => {
  return (
    <>
      <Head>
        <title>{props.meetUpDetail.title} meet</title>
        <meta name="description" content={props.meetUpDetail.description} />
      </Head>
      <MeetupDetail
        image={props.meetUpDetail.image}
        title={props.meetUpDetail.title}
        desc={props.meetUpDetail.description}
        address={props.meetUpDetail.address}
      />
    </>
  );
};

//we have to use getStaticPaths funtion in a Dynamic page if we are using getStaticProps function
export const getStaticPaths = async () => {
  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client.db();
  const MeetupsCollection = db.collection("meetups");

  const data = await MeetupsCollection.find({}, { _id: 1 }).toArray(); //only fetching id
  client.close();
  return {
    //false->only pregenerated, true->if page not there first will render a empty then will generate new one
    //blocking-> page not there will stay then generate then show up
    fallback: "blocking",
    paths: data.map((meet) => ({
      params: {
        meetupId: meet._id.toString(),
      },
    })),
  };
};

// but here context does not hold req and res.That is only in getServerSideProps.
export const getStaticProps = async (context) => {
  //fetch data for 1 meet up
  const meetupId = context.params.meetupId; //property is same as folder name Ex: meetupId
  // console.log(meetupId);
  const client = await MongoClient.connect(process.env.DB_URL);
  const db = client.db();
  const meetupsCollection = db.collection("meetups");
  const obId = new ObjectId(meetupId);
  const meetup = await meetupsCollection.findOne({ _id: obId });

  // console.log("MEET", meetup);
  client.close();

  return {
    props: {
      meetUpDetail: {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        description: meetup.description,
        image: meetup.image,
      },
    },
    revalidate: 2,
  };
};
export default MeetupDetails;
