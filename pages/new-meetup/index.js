import NewMeetupForm from "../../components/meetups/NewMeetupForm";
import { useRouter } from "next/router";
const NewMeetup = () => {
  const router = useRouter();
  const addNewMeet = async (meetDetail) => {
    const response = await fetch("/api/new-meetup", {
      method: "POST",
      body: JSON.stringify(meetDetail),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    // router.push("/"); //here if we use router.push("/") then we can go back to new meetup page after redirecting/
    router.replace("/"); // but in case of router.replace("/") we can't go back
  };
  return <NewMeetupForm onAddMeetup={addNewMeet} />;
};

export default NewMeetup;
