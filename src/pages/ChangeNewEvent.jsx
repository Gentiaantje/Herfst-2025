import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link, useParams } from "react-router-dom";
import { Image } from "@chakra-ui/react";

const ChangeEventPage = () => {
  const [events, setEvents] = useState([]);
  const { changeeventId } = useParams();
  console.log(changeeventId);

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/Gentiaantje/Evenementen3000/users`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch events");
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Event</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-4 p-4 border rounded">
            {/* <h2 className="text-xl font-semibold">{event.title}</h2> */}
            <p>{event.Image}</p>
            <img src={event.image} height={90} width={150} />
            <Link to={`/ChangeEvent/${event.id}`}>{event.title}</Link>
            <p>{event.discription}</p>
            <p>{event.startTime}</p>
            <p>{event.endTime}</p>
            <p>{event.categoryIds}</p>
            {/* <button onclick="myFunction()">Checkbox</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const ChangeEvent = () => {
  const [eventImage, setEventImage] = useState("");
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    function SelectInput() {
      const [selectedOption, setSelectedOption] = useState("bowling");

      const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
      };

      return (
        <select value={selectedOption} onChange={handleSelectChange}>
          <option value="sports">Sports</option>
          <option value="games">Games</option>
          <option value="relaxation">Relaxation</option>
        </select>
      );
    }

    const nieuweGebeurtenis = {
      title: eventTitle,
      description: eventDescription,
      location: eventLocation,
      startDate: eventStartDate,
      endDate: eventEndDate,
      image: eventImage,
      categoryIds: [Number(selectedCategory)],
    };
    console.log(nieuweGebeurtenis.categoryIds);
    console.log(selectedCategory);
    voegGebeurtenisToe(nieuweGebeurtenis);
  }

  async function voegGebeurtenisToe(event) {
    console.log(event);
    const response = await fetch("https://my-json-server.typicode.com/Gentiaantje/Evenementen3000/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
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
    }
  };
  const inputStyle = {
    backgroundColor: "lightblue",
    color: "black",
    border: "1px red",
    padding: "8px",
    borderRadius: "4px",
    width: "100%",
    outline: "none",
  };

  return (
    <form onSubmit={handleSubmit}>
      <Image
        src={recipe.image}
        objectFit={"cover"}
        borderradius="lg"
        border="2px"
        height={100}
        width={190}
      />

      <label>Image</label>
      <input
        backgroundColor="yellow"
        name="image"
        type="text"
        value={eventImage}
        onChange={handleChange}
        style={inputStyle}
        border="2px"
      />

      <label>Title:</label>
      <input
        name="title"
        type="text"
        value={eventTitle}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Description:</label>
      <input
        name="description"
        type="text"
        value={eventDescription}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Location:</label>
      <input
        name="location"
        type="text"
        value={eventLocation}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>StartDate:</label>
      <input
        name="startDate"
        type="text"
        value={eventStartDate}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>EndDate:</label>
      <input
        name="endDate"
        type="text"
        value={eventEndDate}
        onChange={handleChange}
        style={inputStyle}
      />

      <Center>
        <button type="submit" colorScheme="red" border="white">
          Verzenden
        </button>
      </Center>
    </form>
  );
};

export default ChangeEventPage;
