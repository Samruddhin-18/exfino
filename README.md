# Exfino — Personal Expense Tracker

Exfino is a clean, modern personal expense tracking web application built with **Flask** and **SQLite**, designed with a responsive pastel dashboard aesthetic.

---

## Features

- **Quick Expense Logging:** Log expenses with amount, category, date, and description.
- **Visual Analytics:** Breakdown of expenses by category with progress bars and summary cards.
- **Time Filtering:** Filter transactions by presets (*This Month*, *Last 3 Months*, *Last 6 Months*, *All Time*) or custom date ranges.
- **Secure Authentication:** Account creation and login with hashed passwords (`werkzeug.security`).
- **Responsive Pastel UI:** Clean typography using *Plus Jakarta Sans* and soft pastel design tokens.

---

## Getting Started on Localhost

Follow these step-by-step instructions to set up and run Exfino on your local machine.

### Prerequisites

- **Python 3.10+** (Python 3.12 recommended)
- **Git**

---

### 1. Clone the Repository

```bash
git clone https://github.com/Samruddhin-18/exfino.git
cd exfino
```

---

### 2. Create and Activate a Virtual Environment

#### On Windows (PowerShell):
```powershell
python -m venv venv
.\venv\Scripts\Activate.ps1
```

> *Note for Windows:* If script execution is restricted, run `Set-ExecutionPolicy -Scope Process -ExecutionPolicy RemoteSigned` in PowerShell before activating.

#### On Windows (Command Prompt):
```cmd
python -m venv venv
venv\Scripts\activate.bat
```

#### On macOS / Linux:
```bash
python3 -m venv venv
source venv/bin/activate
```

---

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

---

### 4. Configure Environment Variables

Copy `.env.example` to `.env`:

#### On Windows (PowerShell):
```powershell
Copy-Item .env.example .env
```

#### On macOS / Linux:
```bash
cp .env.example .env
```

*(Optional)* Generate and set a secure `SECRET_KEY` inside `.env`:
```bash
python -c "import secrets; print(secrets.token_hex(32))"
```

---

### 5. Start the Application

Run the Flask development server:

```bash
python app.py
```

The database (`exfino.db`) will be created and initialized automatically on first startup.

Open your browser and navigate to:
```
http://127.0.0.1:5001
```

---

### 6. Running Tests (Optional)

To run the automated test suite:

```bash
pytest
```

---

### 7. Production Run (Gunicorn)

To run the application with a production WSGI server:

```bash
gunicorn app:app
```

---

## Project Structure

```
exfino/
├── app.py                 # Main application routes & entrypoint
├── requirements.txt       # Python dependencies
├── Procfile               # Production process file (Heroku/Render)
├── .env.example           # Example environment configuration
├── database/
│   ├── db.py              # SQLite database initialization & connection
│   └── queries.py         # Database query helpers
├── static/
│   ├── css/style.css      # Custom styling & pastel theme
│   └── js/main.js         # Frontend interactivity
├── templates/             # Jinja2 HTML templates
│   ├── base.html          # Base layout template
│   ├── landing.html       # Landing page
│   ├── login.html         # Sign-in page
│   ├── register.html      # Registration page
│   ├── profile.html       # User dashboard & expense list
│   ├── add_expense.html   # Add expense form
│   ├── edit_expense.html  # Edit expense form
│   ├── delete_expense.html# Delete expense confirmation
│   ├── analytics.html     # Analytics coming soon page
│   ├── terms.html         # Terms and conditions
│   └── privacy.html       # Privacy policy
└── tests/                 # Automated test suite
```

---

## License

This project is licensed under the MIT License.
