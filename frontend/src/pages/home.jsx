import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';
import '../styles/home.css';

function HomeComponent() {
    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        if (!meetingCode.trim()) return;
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #75471cff 0%, #648ea3ff 100%)",
                padding: 0,
                margin: 0
            }}
        >
            <div className="navBar" style={{ background: "rgba(255,255,255,0.15)", boxShadow: "0 2px 8px #0001", height: "70px" }}>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <img src="/logo.png" alt="Logo" style={{ height: "7rem", width: "auto" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <IconButton onClick={() => navigate("/history")}>
                        <RestoreIcon />
                    </IconButton>
                    <p style={{ margin: "0 2.5rem 0 0.5rem" }}>History</p>
                    <Button
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                        variant="outlined"
                        color="secondary"
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="meetContainer">
                {/* Left Panel */}
                <div className="leftPanel">
                    <h2 style={{ color: "#FF9839", fontWeight: 700, marginBottom: 24, textAlign: "center" }}>
                        Providing Quality Video Call <br />Just Like Quality Education
                    </h2>
                    <p style={{ color: "#333", marginBottom: 32, textAlign: "center" }}>
                        Start or join a meeting instantly. Enter your meeting code below and connect with anyone, anywhere!
                    </p>
                    <div style={{ display: 'flex', gap: "10px", marginBottom: 24, width: "100%" }}>
                        <TextField
                            onChange={e => setMeetingCode(e.target.value)}
                            id="outlined-basic"
                            label="Meeting Code"
                            variant="outlined"
                            value={meetingCode}
                            onKeyDown={e => { if (e.key === "Enter") handleJoinVideoCall(); }}
                            sx={{ flex: 1, background: "#fff", borderRadius: 2 }}
                        />
                        <Button
                            onClick={handleJoinVideoCall}
                            variant='contained'
                            color="primary"
                            sx={{ fontWeight: 600, borderRadius: 2 }}
                        >
                            Join
                        </Button>
                    </div>
                    <div style={{ fontSize: 14, color: "#888", textAlign: "center" }}>
                        Don’t have a code? <span style={{ color: "#FF9839", cursor: "pointer" }} onClick={() => setMeetingCode(Math.random().toString(36).substring(2, 8).toUpperCase())}>Generate one</span>
                    </div>
                </div>

                {/* Right Panel */}
                <div className='rightPanel'>
                    <img
                        src='/videoconferencing1.jpg'
                        alt="Video Conferencing"
                    />
                </div>
            </div>
        </div>
    )
}

export default withAuth(HomeComponent)