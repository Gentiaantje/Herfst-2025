import { useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { Button } from "@chakra-ui/react";
import { Grid, Center, Box, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import CategoryDropDown from "../components/CategoryDropDown";
import { ToastContainer } from "react-toastify";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  // console.log(selectedCategory);
  const navigate = useNavigate();

  // Fetch events on component mount
  useEffect(() => {
    fetch("https://my-json-server.typicode.com/Gentiaantje/Evenementen3000/events") // Replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch events");
        return response.json();
      })
      .then((data) => setEvents(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);
  const [alleCategories, setAlleCategories] = useState([]);
  console.log("alleCategories", alleCategories);

  useEffect(() => {
    fetch("https://my-json-server.typicode.com/Gentiaantje/Evenementen3000/categories") // Replace with your actual API endpoint
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch events");
        return response.json();
      })
      .then((data) => setAlleCategories(data))
      .catch((error) => console.error("Error fetching events:", error));
  }, []);

  const [zoekterm, setZoekterm] = useState("");
  
  const zoekFilter = (event) => {
    setZoekterm(event.target.value);
    console.log("ingetypte optie:", event.target.value);
    console.log("event", event);
  };

  const [IconButton, setIconButton] = useState("");
  const icon = [""];
  const zoekIcon = (event) => {
    setZoekterm(event.target.value);
    console.log("ingetypte icon:", event.target.value);
    console.log("icon", icon);
  };

  const gefilterdeItems = events.filter(
    (item) =>
      item.title.toLowerCase().includes(zoekterm.toLowerCase()) &&
      (!selectedCategory || item.categoryIds.includes(Number(selectedCategory)))
  );
  console.log(gefilterdeItems);

  return (
    <>
      <div style={{ padding: "10px", fontFamily: "cursive" }}>
        🔍
        <input
          type="text"
          placeholder="Zoek een event.."
          value={zoekterm}
          onChange={zoekFilter}
          style={{
            padding: "2px",
            width: "auto",
            borderRadius: "7px",
            border: "2px",
            color: "white",
            IconButton,
          }}
        />
        <CategoryDropDown value={setSelectedCategory} />
      </div>

      <Center
        flexDir="column"
        bg="lightgreen"
        minH="100vh"
        p={10}
        gap={4}
        color="black"
        fontFamily="cursive"
      >
        {gefilterdeItems.length === 0 && (
          <Box fontSize="20px" mb={4}>
            Geen evenementen gevonden
          </Box>
        )}
        <Button
          w="fit-content"
          backgroundColor="blue.100"
          color="black"
          border="2px"
          fontFamily="cursive"
          onClick={() => {
            navigate("/NewEvent");
          }}
        >
          New Event
        </Button>
        <Grid
          templateColumns="repeat(auto-fit, minmax(300px, 1fr)) "
          gap={4}
          w="100%"
        >
          {gefilterdeItems.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id}>
              <Box
                boxSize="300px"
                height="400px"
                bg="yellow.100"
                borderRadius="10"
                fontFamily="cursive"
              >
                <Image
                  src={event.image}
                  borderRadius="10px"
                  height="270px"
                  width="300px"
                  border="2px"
                  color="violet"
                />

                {event.title}
                {/* <Link to={`/events/${events.id}`}>{events.title}</Link> */}
                <p>{event.description}</p>
                <p>{event.startTime}</p>
                <p>{event.endTime}</p>

                <p>
                  {event.categoryIds
                    .map((catId) => {
                      const cat = alleCategories.find((c) => c.id === catId);
                      return cat ? cat.name : "onbekend";
                    })
                    .join(", ")}
                </p>
              </Box>
            </Link>
          ))}
        </Grid>
      </Center>
      <ToastContainer />
    </>
  );
};

function CategoryFilter() {
  const CategoryFilter = (categories) => {
    const [selectedCategoryIds, setSelectedCategoryIds] = useState("");

    const filteredItems = selectedCategoryIds
      ? items.filter(
          (item) => item.categoryIds === parseInt(selectedCategoryIds)
        )
      : items;

    return (
      <div className="p-4 max-w-md mx-auto">
        <select
          value={selectedCategoryIds}
          onChange={(e) => setSelectedCategoryIds(e.target.value)}
          className="w-full px-3 py-2 border rounded shadow-sm"
        >
          <option value="">-- Alle categorieën --</option>
          {categories.map((category) => (
            <option key={category.ids} value={category.ids}>
              {category.name}
            </option>
          ))}
        </select>

        <ul className="mt-4 list-disc list-inside">
          {filteredItems.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((optie) => optie !== value));
    }
  };
  console.log("alleCategories:", alleCategories);
  return (
    <div>
      <h3>Kies je voorkeuren:</h3>
      {opties.map((optie) => (
        <label key={optie}>
          <input
            type="checkbox"
            value={optie}
            checked={selectedOptions.includes(optie)}
            onChange={handleChange}
          />
          {optie}
        </label>
      ))}
      <p>Geselecteerd: {selectedOptions.join(", ")}</p>
    </div>
  );
}

export default EventsPage;
