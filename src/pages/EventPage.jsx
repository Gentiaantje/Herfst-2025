import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import CategoryDropDown from "../components/CategoryDropDown";
import { Center, Image, Flex, Button, Box } from "@chakra-ui/react";

export default function EventPage() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState("");
  const [categoryIds, setCategoryIds] = useState("");
  const [location, setLocation] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    createUser = { title, description, startDate, endDate };

    setTitle("");
    setDescription("");
    setStartDate("");
    setEndDate("");
    setImage("");
  };

  useEffect(() => {
    axios
      .get(`https://my-json-server.typicode.com/mkrdoob/events-static-api/events/${eventId}`)
      .then((res) => {
        setEvent(res.data);
        setFormData(res.data);
        setDescription(res.data.description);
        setTitle(res.data.title);
        setLocation(res.data.location);
        setImage(res.data.image);
        setCategoryIds(res.data.categoryIds);
        setStartDate(res.data.startDate);
        setEndDate(res.data.endDate);
        console.log(res.data);
      })

      .catch((err) => {
        // console.error("Error loading event:", err);
        // console.log(res.data)
        toast.error("Failed to load event");
      });
  }, [eventId]);

  const [alleCategories, setAlleCategories] = useState([]);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/Gentiaantje/Evenementen3000/categories") // Replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch events");
        return response.json();
      })
      .then((data) => setAlleCategories(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  // const handleEditChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  const handleSave = () => {
    if (new Date(startDate) >= new Date(endDate)) {
      toast.error("End date must be after start date");
      return;
    }

    console.log(eventId);
    console.log(formData);
    console.log(title);
    const aangepastEvent = {
      title,
      description,
      startDate,
      endDate,
      image,
      categoryIds: [Number(categoryIds)],
      location,
    };
    console.log("aangepastEvent;", aangepastEvent);
    console.log("aangepastEvent.categoryIds;", aangepastEvent.categoryIds);

    axios
      .put(`https://my-json-server.typicode.com/mrkdoob/events-static-api/events/${eventId}`, aangepastEvent)

      .then((res) => {
        setEvent(res.data);
        setIsEditing(false);
        toast.success("Event updated successfully");
      })
      .catch(() => toast.error("Failed to update event"));
  };

  const handleDelete = () => {
    if (
      window.confirm(
        "Are you sure you want to delete this event? This action cannot be undone."
      )
    ) {
      axios
        .delete(`https://my-json-server.typicode.com/mrkdoob/events-static-api/events/${eventId}`)
        .then(() => {
          toast.success("Event deleted successfully");
          navigate("/");
        })
        .catch(() => toast.error("Failed to delete event"));
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div>
      <ToastContainer />
      <Center
        bgColor="green.100"
        minH="100vh"
        flexDirection="column"
        borderRadius="lg"
        fontFamily="cursive"
        padding="20px"
      >
        {!isEditing ? (
          <div>
            {console.log(event)}
            <Button
              w="fit-content"
              backgroundColor="purple"
              border="2px"
              color="white"
              fontFamily="cursive"
              borderColor="white"
              onClick={() => {
                navigate("/");
              }}
            >
              Back to overview
            </Button>
            <br></br>
            <br></br>
            <Image
              src={event.image}
              objectFit={"cover"}
              borderRadius="lg"
              border="2px"
              borderColor="blue.300"
              height={240}
              width={300}
            />

            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            {/* <img src={event.image} alt="Event" className="w-full h-64 object-cover rounded mb-4" />
             */}
            <p className="mb-2">{event.description}</p>
            <p className="mb-2 font-semibold">
              Start: {new Date(event.startDate).toLocaleString()}
            </p>
            <p className="mb-2 font-semibold">
              End: {new Date(event.endDate).toLocaleString()}
            </p>
            <p className="mb-2">
              Categories:{" "}
              {event.categoryIds
                .map((catId) => {
                  const cat = alleCategories.find((c) => c.id === catId);
                  return cat ? cat.name : "onbekend";
                })
                .join(", ")}
            </p>
            <div className="flex items-center mt-4">
              {/* <img src={event.createdBy.image} alt="Creator" className="w-10 h-10 rounded-full mr-2" /> */}
              <span>{event.createdBy}</span>
            </div>

            <div className="mt-6 flex gap-2">
              <Button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                w="fit-content"
                backgroundColor="yellow.300"
                color="black"
                fontFamily="cursive"
                border="2px"
                borderColor="white"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>

              <br></br>

              <br></br>
              <Button
                className="bg-red-500 text-white px-4 py-2 rounded"
                w="fit-content"
                backgroundColor="red.300"
                border="2px"
                fontFamily="cursive"
                borderColor="white"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <Flex direction="column" gap={4}>
              <Box>
                <label style={{ display: "block" }}>title</label>
                <input
                  type="text"
                  required="required"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </Box>
              <Box>
                <label style={{ display: "block" }}>description</label>
                <input
                  type="description"
                  required="required"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />
              </Box>
              <Box>
                <label style={{ display: "block" }}>location</label>
                <input
                  type="location"
                  required="required"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                />
              </Box>

              <Box>
                <label style={{ display: "block" }}>image</label>
                <input
                  name="image"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="border p-2 rounded"
                />
              </Box>

              <Box>
                <label style={{ display: "block" }}>startDate</label>
                <input
                  name="startDate"
                  type="datetime-local"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="border p-2 rounded"
                />
              </Box>

              <Box>
                <label style={{ display: "block" }}>endDate</label>
                <input
                  name="endDate"
                  type="datetime-local"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="border p-2 rounded"
                />
              </Box>

              <Box>
                <label>Category:</label>

                <CategoryDropDown value={setCategoryIds} />
              </Box>

              <Box>
                <h1 className="text-2xl font-bold mb-4">Edit Event</h1>
                <Button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                  w="fit-content"
                  backgroundColor="blue.300"
                  border="2px"
                  borderColor="white"
                >
                  Save
                </Button>
                <br></br>

                <br></br>
                <h1 className="text-2xl font-bold mb-4">Cancel Event</h1>
                <Button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-400 text-white px-4 py-2 rounded"
                  w="fit-content"
                  backgroundColor="orange.300"
                  border="2px"
                  borderColor="white"
                >
                  Cancel
                </Button>
              </Box>
            </Flex>
          </form>
        )}
      </Center>
    </div>
  );
}
