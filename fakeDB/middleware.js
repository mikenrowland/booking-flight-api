const fs = require("fs");

const getAllFlights = () => {
    const flights = JSON.parse(fs.readFileSync("fakeDB/db.json"));
    return flights;
}

const getFlight = id => {
    const flights = getAllFlights();
    return flights.find(flight => flight.id == id);
}

const createFlight = flight => {
    const flights = getAllFlights();
    flights.push(flight);
    fs.writeFileSync("fakeDB/db.json", JSON.stringify(flights));
    return flight;
}

const updateFlight = (id, flight) => {
    const flights = getAllFlights();
    const index = flights.findIndex(f => f.id == id);
    if (index != -1) {
        flight.id = id;
        flights[index] = flight;
        fs.writeFileSync("fakeDB/db.json", JSON.stringify(flights));
        return flight;
    }
    return null;
}

const deleteFlight = id => {
    const flights = getAllFlights();
    const index = flights.findIndex(f => f.id == id);
    if (index != -1) {
        flights.splice(index, 1);
        fs.writeFileSync("fakeDB/db.json", JSON.stringify(flights));
        return true;
    }
    return null;
}

module.exports = {
    getAllFlights,
    getFlight,
    createFlight,
    updateFlight,
    deleteFlight
}