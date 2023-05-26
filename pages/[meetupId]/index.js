import React from "react";
import MeetupDetail from "../../components/meetups/MeetupDetail";

const MeetupDetails = () => {
  return (
    <MeetupDetail
      image="https://images.unsplash.com/photo-1683727610671-646dbf56aedf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60"
      title="first meet"
      desc="this is our first meet"
      address="test address"
    />
  );
};

//we have to use getStaticPaths funtion in a Dynamic page if we are using getStaticProps function
export const getStaticPaths = async () => {
  return {
    fallback: false,
    paths: [
      {
        params: {
          meetupId: "m1",
        },
      },
      {
        params: {
          meetupId: "m2",
        },
      },
    ],
  };
};

// but here context does not hold req and res.That is only in getServerSideProps.
export const getStaticProps = async (context) => {
  //fetch data for 1 meet up
  const meetupId = context.params.meetupId; //property is same as folder name Ex: meetupId
  console.log(meetupId);
  return {
    props: {
      meetUpDetail: {
        image:
          "https://images.unsplash.com/photo-1683727610671-646dbf56aedf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60",
        id: meetupId,
        title: "first meet",
        desc: "this is our first meet",
        address: "test address",
      },
    },
    revalidate: 5,
  };
};
export default MeetupDetails;
