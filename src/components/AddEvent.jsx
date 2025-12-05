import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import EventItem from "./EventItem";

const NewEventPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`https://my-json-server.typicode.com/Gentiaantje/Evenementen3000/events`)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch events");
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">New Event2</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id} className="mb-4 p-4 border rounded">
            {/* <h2 className="text-xl font-semibold">{event.title}</h2> */}
            <Link to={`/newevent/${event.id}`}>{event.title}</Link>
            <p>{event.discription}</p>
            <p>{event.image}</p>
            <img src={event.image} height={120} width={190} />
            <p>{event.startTime}</p>
            <p>{event.endTime}</p>
            <p>{event.categories}</p>
            {/* <button onclick="myFunction()">Checkbox</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export const NewEvent = () => {
  // const [inputValue, setInputValue] = useState ('');
  const [eventTitle, setEventTitle] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventLocation, setEventLocation] = useState("");
  const [eventStartDate, setEventStartDate] = useState("");
  const [eventEndDate, setEventEndDate] = useState("");
  const [eventImage, setEventImage] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const nieuweGebeurtenis = {
      title: eventTitle,
      description: eventDescription,
      location: eventLocation,
      startDate: eventStartDate,
      endDate: eventEndDate,
      image: eventImage,
    };
    voegGebeurtenisToe(nieuweGebeurtenis);
  }

  async function voegGebeurtenisToe(event) {
    console.log("event", event);
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
    backgroundColor: "white",
    color: "black",
    border: "1px solid #ccc",
    padding: "8px",
    borderRadius: "10px",
    width: "100%",
    outline: "none",
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Image</label>
      <input
        name="image"
        type="text"
        value={eventImage}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Title:</label>
      <input
        name="title"
        type="text"
        value={eventTitle}
        onChange={handleChange}
        style={inputStyle}
      />

      <label>Description2:</label>
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

      <button type="submit">Verzenden</button>
    </form>
  );
};

function App() {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

  const handleEdit = (event) => {
    setSelectedEvent(event);
  };

  return (
    <div>
      {events.map((e) => (
        <EventItem key={e.id} event={e} onEdit={handleEdit} />
      ))}

      {selectedEvent && (
        <div>
          <h2>Pas event aan</h2>
          <form>
            <input defaultValue={selectedEvent.title} />
            <input type="date" defaultValue={selectedEvent.date} />
            <button type="submit">Opslaan</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default App;
