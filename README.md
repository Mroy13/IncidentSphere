# IncidentSphere  
### Real-time Incident Management, Coordination & Collaboration Platform

IncidentSphere is a distributed system designed to manage, coordinate, and resolve operational incidents in real time.  
It provides a unified environment where teams can collaborate, communicate, and debug issues using live streaming and real-time coordination tools.

The system is built around the idea of a **360° incident response ecosystem**, combining incident lifecycle management with real-time communication and interactive streaming.

---

## 🧠 System Overview

IncidentSphere is primarily designed for **software and operational incident management**, helping engineering teams respond to production issues through real-time coordination and collaboration.

Core use cases include:

- 🖥️ Software / Backend failures (API failures, server crashes, database issues)
- ⚙️ DevOps / Cloud incidents (deployment failures, infrastructure outages, performance degradation)
- 🌐 Distributed system failures (service downtime, network latency, cascading failures)

To accelerate incident resolution, IncidentSphere enables:

- Real-time incident coordination
- Interactive debugging sessions
- Live screen/video collaboration
- Cross-team incident war-room communication


Its architecture is also flexible enough to support other incident-heavy domains, such as:

- 🏭 Industrial / Factory incidents (equipment failures, assembly line breakdowns)
- 🚨 Operational response scenarios requiring real-time coordination

### Core Principles:
- **Management** → Incident lifecycle tracking and control  
- **Coordination** → Real-time response orchestration  
- **Collaboration** → Live communication between teams  

---

## 🏗️ System Architecture

The system is built using a modular distributed approach:

- **ASP.NET Core 8** → Backend API & control plane  
- **PostgreSQL + EF Core** → Data persistence layer  
- **SignalR** → Real-time signaling and event updates  
- **LiveKit (WebRTC SFU)** → Real-time media streaming  
- **RabbitMQ** → Async alerts & escalation workflows  
- **AWS EC2 + Nginx** → Production deployment & reverse proxy  

---

## 🚀 Implemented Features (StreamOps Focus)

### 🔴 StreamOps – Real-Time Incident Streaming Module

- Built incident-specific interactive streaming system using **LiveKit WebRTC SFU**
- Each incident can spawn a dedicated **real-time streaming room**
- Engineers can join using secure **JWT-based authentication tokens**
- Supports **multi-participant audio/video communication** for debugging incidents
- Low-latency streaming optimized for real-time collaboration

### 🧩 Backend Stream Management

- Implemented LiveKit Room lifecycle management (create/delete rooms)
- Integrated LiveKit Server SDK with ASP.NET Core services
- Designed stream-to-incident mapping for contextual debugging sessions
- Secure token generation with role-based access control

### ☁️ Deployment & Infrastructure

- Deployed LiveKit media server on **AWS EC2**
- Configured **Nginx reverse proxy** for WebSocket + Twirp routing
- Enabled scalable real-time communication infrastructure
- Configured secure HTTP → WebSocket upgrade handling

---

## 🔮 Coming Soon / Future Enhancements

- 📊 Incident dashboard with analytics & MTTR tracking  
- 🔔 Advanced escalation engine with SLA-based automation  
- 💬 Real-time chat system using SignalR channels  
- 🎥 Stream recording & playback for post-incident analysis  
- 👥 Role-based command center for incident management teams  
- 📡 Multi-region LiveKit scaling for global incident response  
- 📱 Mobile support for field engineers  

---

## ⚙️ Key Highlights

- Real-time incident-driven architecture  
- Low-latency interactive streaming using WebRTC  
- Scalable SFU-based media routing (LiveKit)  
- Event-driven backend with async processing  
- Cloud-ready deployment (AWS EC2 + Nginx)  

---

## 📌 Project Status

🚧 **Ongoing Development**

Core StreamOps module is implemented, with full incident lifecycle and collaboration features under active development.

---

# Tech Stack

## Backend
- ASP.NET Core 8
- Entity Framework Core
- PostgreSQL

## Realtime & Streaming
- WebRTC
- LiveKit SFU
- SignalR

## Frontend
- React
- Redux
- Material UI
- Tailwind CSS

## Infrastructure & DevOps
- AWS EC2
- Nginx
- Docker

## Async Communication (Coming Soon)
- RabbitMQ


## 💡 Concept

> "IncidentSphere is a 360° real-time incident response ecosystem where teams manage, coordinate, collaborate, and resolve incidents through live communication, interactive streaming, and structured incident workflows."

It not only enables real-time incident response but also maintains incident history, recordings, logs, and resolution records for:

- Audit trails  
- Post-incident analysis  
- Compliance requirements  
- Future debugging and knowledge sharing  



# 📚 Additional Documentation (Coming Soon)

The following documentation will be added as the project evolves:

- Setup & local development guidelines  
- API documentation  
- Full system architecture overview   
- StreamOps workflow documentation  