import React, { useState, useEffect } from 'react';
import Navbar from "./navbar";
import "../styles/home.css";
import axios from 'axios';

function Home() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState('');
  const [sport, setSport] = useState('');
  const [numberOfPlayers, setNumberOfPlayers] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:3000/teams');
      setTeams(response.data);
    } catch (error) {
      console.error('Error fetching teams:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (teamName && sport && numberOfPlayers) {
      const newTeam = {
        name: teamName,
        sport: sport,
        players: numberOfPlayers,
      };
      if (editIndex !== null) {
        try {
          await axios.put(`http://localhost:3000/teams/${editIndex}`, newTeam);
          const updatedTeams = [...teams];
          updatedTeams[editIndex] = newTeam;
          setTeams(updatedTeams);
          setEditIndex(null);
        } catch (error) {
          console.error('Error updating team:', error);
        }
      } else {
        try {
          await axios.post('http://localhost:3000/teams', newTeam);
          setTeams([...teams, newTeam]);
        } catch (error) {
          console.error('Error creating team:', error);
        }
      }
      setTeamName('');
      setSport('');
      setNumberOfPlayers('');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleEdit = (index) => {
    const team = teams[index];
    setTeamName(team.name);
    setSport(team.sport);
    setNumberOfPlayers(team.players);
    setEditIndex(index);
  };

  const handleDelete = async (index) => {
    try {
      await axios.delete(`http://localhost:3000/teams/${index}`);
      const updatedTeams = [...teams];
      updatedTeams.splice(index, 1);
      setTeams(updatedTeams);
    } catch (error) {
      console.error('Error deleting team:', error);
    }
  };

  return (
    <div className="container">
      <Navbar />
      <h1>Sport League Tracker</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
        />
        <input
          type="text"
          value={sport}
          onChange={(e) => setSport(e.target.value)}
          placeholder="Sport"
        />
        <input
          type="number"
          value={numberOfPlayers}
          onChange={(e) => setNumberOfPlayers(e.target.value)}
          placeholder="Number of Players"
        />
        <button type="submit">{editIndex !== null ? 'Edit Team' : 'Add Team'}</button>
      </form>
      <ul>
        {teams.map((team, index) => (
          <li key={index}>
            <strong>{team.name}</strong> - Sport: {team.sport}, Players: {team.players}
            <button className='edit' onClick={() => handleEdit(index)}>Edit</button>
            <button className='delete' onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;

