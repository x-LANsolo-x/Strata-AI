# 🚀 STRATA-AI

**AI-Powered Startup Survival & Strategy Assistant**

STRATA-AI helps early-stage founders make data-driven decisions by combining real-time financial tracking, survival prediction, AI-generated pivot strategies, and executable roadmaps.

---

## 🎯 Problem Statement

No existing tool combines:
- Real-time financial tracking
- Survival prediction (runway calculation)
- AI-generated pivot strategies
- Executable roadmaps

...specifically designed for early-stage startups operating under extreme uncertainty.

---

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **AI Runway Predictor** | Real-time runway calculation based on cash/burn rate |
| **Future Condition Simulator** | Project startup health on any future date |
| **What-If Scenario Analyzer** | Test impact of decisions (hiring, pricing, costs) |
| **AI Ideation & Pivot Engine** | LLM-generated pivot suggestions |
| **Smart Execution Roadmaps** | Convert strategies into milestone-based action plans |
| **Visualization Dashboard** | Charts for runway, cash flow, burn rate |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18 + Vite + TypeScript + Tailwind CSS |
| **Backend** | Python 3.11+ + FastAPI + Pydantic v2 |
| **Database** | MongoDB Atlas |
| **LLM** | Groq (default), Gemini, OpenAI, Ollama |
| **Hosting** | Vercel (frontend), Render (backend) |

---

## 📁 Project Structure

```
Strata-AI/
├── 06_SRC/
│   ├── backend/    # FastAPI backend (Python)
│   ├── frontend/   # React frontend (TypeScript)
│   └── ml/         # ML/AI components
├── 07_ARCHITECTURE/  # Architecture documentation
└── README.md
```

---

## 🚦 Branch Strategy

| Branch | Description | Owner |
|--------|-------------|-------|
| `main` | Production-ready merged code | Team |
| `backend` | FastAPI backend development | Backend Team |
| `frontend` | React frontend development | Frontend Team |
| `ml` | ML/AI model development | ML Team |

---

## 🏃 Quick Start

### Backend

```bash
cd 06_SRC/backend
python -m venv venv
.\venv\Scripts\activate  # Windows
pip install -r requirements.txt
cp .env.example .env
# Edit .env with your MongoDB URI
uvicorn app.main:app --reload
```

### Frontend

```bash
cd 06_SRC/frontend
npm install
npm run dev
```

---

## 👥 Target Users

1. **First-time founders** - Need financial guidance without CFO experience
2. **Serial entrepreneurs** - Need scenario planning for investor conversations
3. **Accelerator program managers** - Need portfolio monitoring

---

## 📄 License

MIT License

---

## 🤝 Contributing

1. Clone the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Built with ❤️ by the STRATA-AI Team**
