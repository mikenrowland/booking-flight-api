const middleware = require('../fakeDB/middleware');
const {v4: uuid} = require('uuid');

const getAllFlights = (req, res) => {
    try{
        const flights = middleware.getAllFlights();
        if (flights) res.status(200).json({message: "Success!", flights});
        else res.status(500).json({ error: "An unexpected error occurred" });
    }
    catch(err){
        res.status(500).json({ error: "Server Down! An unexpected error occured." });
    }
    
}

const getFlight = (req, res) => {
    try{
        const id = req.params.id;
        const flight = middleware.getFlight(id);
        if (flight) res.status(200).json({message: "Success!", flight});
        else res.status(404).json({ error: "Flight not found" });
    }
    catch {
        res.status(500).json({ error: "Server Down! An unexpected error occured." });
    }
    
}

const createFlight = (req, res) => {
    try{
        const { title, time, price } = req.body;
        const flight = {
            id: uuid(),
            title,
            price,
            time,
            date: new Date().toLocaleDateString()
        };
        const newFlight = middleware.createFlight(flight);
        if (newFlight) res.status(201).json({message: "Success! Flight created", newFlight});
        else res.status(500).json({ error: "An unexpected error occurred" });
    }
    catch(err){
        res.status(500).json({ error: "Server Down! An unexpected error occured." });
    }
    
}

const updateFlight = (req, res) => {
    try {
        const id = req.params.id;
        const { title, time, price } = req.body;
        const flight = {
            id,
            title,
            price,
            time,
            date: new Date().toLocaleDateString()
        };
        const updatedFlight = middleware.updateFlight(id, flight);
        if (updatedFlight) res.status(200).json({message: "Success! Flight updated", updatedFlight});
        else res.status(404).json({ error: "Flight not found" });
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: "Server Down! An unexpected error occured." });
    }
}

const deleteFlight = (req, res) => {
    try {
        const id = req.params.id;
        const deletedFlight = middleware.deleteFlight(id);
        if (deletedFlight) res.status(200).json({ message: "Flight deleted" });
        else res.status(404).json({ error: "Flight not found" });
    }
    catch(err){
        res.status(500).json({ error: "Server Down! An unexpected error occured." });
    }
    
}

module.exports = {
    getAllFlights,
    getFlight,
    createFlight,
    updateFlight,
    deleteFlight
}


