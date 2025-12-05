import { Box, Flex, Center, Button } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import CategoryDropDown from "../components/CategoryDropDown";
import { useNavigate } from "react-router-dom";

const NewEventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/Gentiaantje/Evenementen3000/events`) // Replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch events");
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <>
      <Button w="fit-content" onClick={() => clickFn()}>
        Back to overview
      </Button>

      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">NewEvent</h1>
        <ul>
          {events.map((event) => (
            <li key={event.id} className="mb-4 p-4 border rounded">
              <Link to={`/newevent/${event.id}`}>{event.title}</Link>
              <p>{event.discription}</p>
              <p>{event.image}</p>
              <img src={event.image} height={90} width={140} />
              <p>{event.startTime}</p>
              <p>{event.endTime}</p>
              <p>{event.categories}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export const NewEvent = () => {
  const [inputValue, setInputValue] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventImage, setEventImage] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  console.log(selectedCategory);
  const navigate = useNavigate();
  function handleSubmit(event) {
    event.preventDefault();

    const nieuweGebeurtenis = {
      title: eventTitle,
      description: eventDescription,
      location: eventLocation,
      startDate: eventStartDate,
      endDate: eventEndDate,
      image: eventImage,
      categoryIds: [Number(selectedCategory)],
    };
    // console.log(nieuweGebeurtenis.categoryIds)
    // console.log(selectedCategory)
    voegGebeurtenisToe(nieuweGebeurtenis, navigate);
  }

  async function voegGebeurtenisToe(event, navigate) {
    console.log(event);
    const response = await fetch("https://my-json-server.typicode.com/Gentiaantje/Evenementen3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    if (response.ok) {
      console.log("Event opgeslagen");
      navigate("/");
    } else {
      console.error("Evenement niet opgeslagen");
    }
  }

  const handleChange = (event) => {
    console.log(event.target.value);

    const { name, value } = event.target;
    console.log("name", name);
    console.log("value", value);

    if (name === "title") {
      setEventTitle(value);
    } else if (name === "description") {
      setEventDescription(value);
    } else if (name === "location") {
      setEventLocation(value);
    } else if (name === "startDate") {
      setEventStartDate(value);
    } else if (name === "endDate") {
      setEventEndDate(value);
    } else if (name === "image") {
      setEventImage(value);
    } else if (name === "categoryIds") {
      setEventImage(value);
    }
  };
  const inputStyle = {
    backgroundColor: "lightyellow",
    color: "black",
    border: "2x solid #b54747ff",
    padding: "8px",
    borderRadius: "4px",
    width: "100%",
    outline: "none",
  };

  return (
    <>
      <Flex direction="column"></Flex>

      <form onSubmit={handleSubmit}>
        <Center minHeight="100vh" bg="lightblue" flexDirection="column">
          <Flex direction="column" gap={4} fontFamily="cursive">
            <Box>Make a choose</Box>
            <Button
              w="fit-content"
              backgroundColor="darkblue"
              border="2px"
              color="white"
              borderColor="white"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to homepage
            </Button>

            <Box>
              <label>Title:</label>
              <input
                border="2px"
                color="blue.300"
                name="title"
                type="text"
                value={eventTitle}
                onChange={handleChange}
                style={inputStyle}
              />
            </Box>
            <Box>
              <label>Description:</label>
              <input
                border="2px"
                color="blue.300"
                name="description"
                type="text"
                value={eventDescription}
                onChange={handleChange}
                style={inputStyle}
              />
            </Box>
            <Box>
              <label>Location:</label>
              <input
                name="location"
                type="text"
                value={eventLocation}
                onChange={handleChange}
                style={inputStyle}
              />
            </Box>
            <Box>
              <label>Image</label>
              <input
                borderradius="lg"
                name="image"
                type="text"
                value={eventImage}
                onChange={handleChange}
                style={inputStyle}
              />
            </Box>
            <Box>
              <label style={{ display: "block" }}>startDate</label>
              <input
                name="startDate"
                type="datetime-local"
                value={eventStartDate}
                onChange={(e) => setEventStartDate(e.target.value)}
                className="border p-2 rounded"
              />
            </Box>
            <Box>
              <label style={{ display: "block" }}>endDate</label>
              <input
                name="endDate"
                type="datetime-local"
                value={eventEndDate}
                onChange={(e) => setEventEndDate(e.target.value)}
                className="border p-2 rounded"
              />
            </Box>
            <Box>
              <label>Category:</label>

              <CategoryDropDown
                value={setSelectedCategory}
                onChange={handleChange}
              />
            </Box>

            <Button
              w="fit-content"
              backgroundColor="blue"
              color="white"
              border="2px"
              onClick={handleSubmit}
            >
              Verzenden
            </Button>
          </Flex>
        </Center>
      </form>
    </>
  );
};

export default NewEvent;
