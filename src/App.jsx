// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventsPage from "./pages/EventsPage";
import AddEventPage from "./pages/AddEventPage";
import EventPage from "./pages/EventPage";
import NewEventPage from "./pages/NewEvent";
import ChangeEventPage from "./pages/ChangeNewEvent";

return (
  <div className="app">
    <h1>{greeting}</h1>
    <EventButtons selectedEvent={setUserEvent} />
    {userEvent && <EventChoice event={userEvent} />}
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventsPage />} />
        <Route path="/" element={<EventPage />} />
        <Route path="/NewEvent" element={<NewEventPage />} />
        <Route path="/add-event" element={<AddEventPage />} />
        <Route path="/ChangeEvent" element={<ChangeEventPage />} />
      </Routes>
    </Router>
  );
}
export default App;
