import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

import "./dashboard.css";

const API = process.env.REACT_APP_API_URL;

const Dashboard = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");

  const [activity, setActivity] = useState("");
  const [carbon, setCarbon] = useState("");
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  // ================= LOAD ACTIVITIES =================
  const loadActivities = async () => {
    try {
      const res = await axios.get(
        `${API}/api/activity/all`,
        {
          headers: {
            Authorization: token
          }
        }
      );
      setList(res.data);
    } catch (err) {
      console.log("LOAD ACTIVITY ERROR");
      console.log(err.response?.data);
      console.log(err.message);
    }
  };

  // ================= ADD ACTIVITY =================
  const addActivity = async () => {
    try {
      if (!activity.trim()) {
        alert("Enter activity name");
        return;
      }

      if (!carbon || isNaN(carbon)) {
        alert("Enter valid carbon value");
        return;
      }

      const res = await axios.post(
        `${API}/api/activity/add`,
        {
          activity: activity.trim(),
          carbon: Number(carbon)
        },
        {
          headers: {
            Authorization: token
          }
        }
      );

      console.log("SUCCESS:", res.data);

      setActivity("");
      setCarbon("");

      await loadActivities();

    } catch (err) {
      console.log("ADD ACTIVITY ERROR");
      console.log(err.response?.data);
      console.log(err.message);

      alert(
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Activity add failed"
      );
    }
  };

  // ================= LEADERBOARD =================
  const loadLeaderboard = async () => {
    try {
      const res = await axios.get(
        `${API}/api/users/leaderboard`
      );
      setUsers(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  // ================= LOGOUT =================
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  // ================= USE EFFECT =================
  useEffect(() => {
    loadActivities();
    loadLeaderboard();
  }, []);

  // ================= CALCULATIONS =================
  const totalCarbon = list.reduce(
    (sum, item) => sum + Number(item.carbon),
    0
  );

  const ecoScore = Math.max(100 - totalCarbon, 0);

  // ================= AI ADVISOR =================
  const getAIAdvice = () => {
    if (totalCarbon < 20) return "🌱 Amazing! Your lifestyle is eco-friendly";
    if (totalCarbon < 50) return "⚡ Try using less transport or electricity";
    return "🔥 High carbon usage! Reduce travel & energy consumption";
  };

  // ================= CHART DATA =================
  const chartData = list.map((item) => ({
    name: item.activity,
    carbon: Number(item.carbon)
  }));

  return (
    <div className="container">

      <div className="sidebar">
        <h2>🌿 EcoTrack</h2>
        <button onClick={() => setActive("dashboard")}>📊 Dashboard</button>
        <button onClick={() => setActive("activities")}>🌱 My Activities</button>
        <button onClick={() => setActive("leaderboard")}>🏆 Leaderboard</button>
        <button onClick={logout}>🚪 Logout</button>
      </div>

      <div className="content">

        {active === "dashboard" && (
          <>
            <h1>🌍 Eco Tracker Dashboard</h1>

            <div className="stats-container">
              <div className="stat-card">
                <h3>🌱 Activities</h3>
                <p>{list.length}</p>
              </div>
              <div className="stat-card">
                <h3>☁️ Carbon</h3>
                <p>{totalCarbon} kg</p>
              </div>
              <div className="stat-card">
                <h3>🏆 Eco Score</h3>
                <p>{ecoScore}</p>
              </div>
            </div>

            <input
              className="input"
              placeholder="Activity"
              value={activity}
              onChange={(e) => setActivity(e.target.value)}
            />
            <input
              className="input"
              type="number"
              placeholder="Carbon (kg)"
              value={carbon}
              onChange={(e) => setCarbon(e.target.value)}
            />
            <button className="btn" onClick={addActivity}>
              Add Activity
            </button>

            <div className="ai-card">
              <h3>🤖 AI Advisor</h3>
              <p>{getAIAdvice()}</p>
            </div>
          </>
        )}

        <h2>📊 Carbon Chart</h2>
        <div style={{ width: "100%", height: 300 }}>
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="carbon" stroke="#2e7d32" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {active === "activities" && (
          <>
            <h2>🌱 My Activities</h2>
            {list.map((item) => (
              <div key={item._id} className="list-item">
                {item.activity} - {item.carbon} kg CO₂
              </div>
            ))}
          </>
        )}

        {active === "leaderboard" && (
          <>
            <h2>🏆 Leaderboard</h2>
            {users.map((u, i) => (
              <div key={u._id || i} className="leader-card">
                <span>
                  {i === 0 && "🥇"}
                  {i === 1 && "🥈"}
                  {i === 2 && "🥉"}
                  {i > 2 && `#${i + 1}`}
                </span>
                <span>{u.name}</span>
                <span>{u.ecoScore} 🏆</span>
              </div>
            ))}
          </>
        )}

      </div>
    </div>
  );
};

export default Dashboard;