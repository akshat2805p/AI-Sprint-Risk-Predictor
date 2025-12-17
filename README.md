
<div align="center">
  <a href="https://git.io/typing-svg">
    <img src="https://readme-typing-svg.herokuapp.com?font=Inter&weight=800&size=40&pause=1000&color=10B981&center=true&vCenter=true&width=500&lines=SprintGuard+AI;Predictive+Risk+Analysis;Jira+Integration+System" alt="Typing SVG" />
  </a>
</div>

<div align="center">
  <h3><i>Advanced Sprint Risk Prediction & Recovery System</i></h3>
</div>

<p align="center">
  <img src="https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/AI-Powered_Analysis-FF6B6B?style=for-the-badge&logo=openai&logoColor=white" alt="AI Powered" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=Jira&logoColor=white" alt="Jira" />
  <img src="https://img.shields.io/badge/Atlassian-0052CC?style=for-the-badge&logo=atlassian&logoColor=white" alt="Atlassian" />
  <img src="https://img.shields.io/badge/Confluence-172B4D?style=for-the-badge&logo=confluence&logoColor=white" alt="Confluence" />
  <img src="https://img.shields.io/badge/Trello-0052CC?style=for-the-badge&logo=trello&logoColor=white" alt="Trello" />
</p>


---

## 🚀 Overview


**SprintGuard AI** is a next-generation project management dashboard designed to predict sprint failures before they happen. Unlike traditional tools that just *track* what happened, SprintGuard uses a **simulated AI engine** to *predict* outcomes, identify bottlenecks, and generate actionable recovery plans.

It features a **Dynamic Data Generation Engine** that builds a unique, realistic sprint scenario based on your specific project inputs, simulating a live connection to Jira without requiring complex backend infrastructure.

---

## 📸 Visual Tour

<p align="center">
  <img src="./images/Screenshot 2025-12-17 210033.png" width="48%" alt="Dashboard Overview" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
  <img src="./images/Screenshot 2025-12-17 210058.png" width="48%" alt="Risk Analysis" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
</p>

<p align="center">
  <img src="./images/Screenshot 2025-12-17 210120.png" width="48%" alt="Recovery Plan" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
  <img src="./images/Screenshot 2025-12-17 210141.png" width="48%" alt="Settings" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
</p>

<p align="center">
  <img src="./images/Screenshot 2025-12-17 210217.png" width="80%" alt="Jira Integration" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);" />
</p>

---

## 🧠 Key Features

### 1. 🔮 AI Predictive Burndown
*   **Dynamic Forecasting**: Visualizes not just the "Ideal" vs "Actual" lines, but creates an "AI Prediction" line showing where the sprint is trending based on current velocity.
*   **Contextual Status**: Automatically flags "High Risk" or "On Track" statuses.

### 2. ⚡ The "Blocker Breaker"
*   **Stalled Ticket Detection**: Identifies tickets sitting in columns (e.g., "In Review") for too long.
*   **Rovo Analysis**: Provides AI-generated reasons for blocks (e.g., "Waiting on API Spec", "DB Migration Conflict").

### 3. 🛡️ Smart Recovery Plan
*   **One-Click Fixes**: Generates ready-to-send emails to stakeholders to address scope creep or delays.
*   **Scope Creep Timeline**: a visual timeline showing exactly when new work was injected into the sprint and how it impacted the deadline.
*   **Bus Factor Alert**: Warns you if too many critical tickets are assigned to a single developer.

### 4. 🔗 Dynamic Jira Integration Simulation
*   **Realistic Workflow**: User inputs a Project Name and Jira URL.
*   **Seeded Generator**: The app generates a consistent, unique dataset for that project.
*   **Persistence**: Teams, settings, and analysis data persist across reloads (Local Storage).

---

## 🎨 UI & Aesthetics

Built with a **Premium "Clean Emerald" Aesthetic**:
*   **Glassmorphism**: Subtle glass panels and blurs.
*   **Micro-Animations**: Powered by `framer-motion` for smooth entry, hover states, and transitions.
*   **Responsive**: Fully adaptive grid layout for desktop and tablet.
*   **Visual Logic**: Color-coded risk indicators (Emerald = Good, Amber = Warning, Red = Critical).

---

## 🛠️ Technology Stack

*   **Frontend**: React 19 (Vite)
*   **Styling**: Tailwind CSS v4, Lucide React (Icons)
*   **Visualization**: Recharts (Customized for predictive data)
*   **Animation**: Framer Motion
*   **State Management**: React Hooks + Local Storage Persistence

---

## 📦 Installation & Setup

1.  **Clone the repository**
    ```bash
    git clone https://github.com/yourusername/sprintguard-ai.git
    cd sprintguard-ai
    ```

2.  **Install Dependencies**
    ```bash
    npm install
    ```

3.  **Run the Development Server**
    ```bash
    npm run dev
    ```

4.  **Open in Browser**
    Visit `http://localhost:5173` to see the AI agent in action.

---

## 🤖 How to "Train" the Website

SprintGuard features a **Contextual Data Generator**. To see it in action:

1.  Go to the Dashboard.
2.  Click **"Add Project"**.
3.  Enter a Project Name (e.g., *"Orbital Launch System"*) and a Jira Link.
4.  Watch as the **Analysis Engine** generates a unique risk profile, burndown chart, and set of "stalled tickets" specifically tailored to mimic that project's complexity.

---

> *"The best way to manage risk is to predict it."* — **SprintGuard AI**
