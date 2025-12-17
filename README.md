# Leaflet Product Extraction Application

## Purpose

This project demonstrates an end-to-end data extraction pipeline that processes a user-uploaded leaflet image, extracts product information, structures the data, and presents it through a simple web interface and JSON output.

The focus is on **problem-solving, data structuring, and system design**, rather than UI complexity.

---

## High-Level Architecture

### Client (Browser)
- HTML form for leaflet upload
- Vanilla JavaScript for API calls and table rendering

### Backend (Python / Flask)
- Receives uploaded image
- Performs OCR and text parsing
- Returns structured product data as JSON

---

## Technology Stack

- **Python 3**
- **Flask** – backend web server
- **Tesseract OCR (pytesseract)** – text extraction
- **OpenCV** – image preprocessing
- **HTML / CSS**
- **Vanilla JavaScript** – frontend logic

No JavaScript frameworks or build tools are required.

> **Note:** In headless environments (like GitHub Codespaces), the standard `opencv-python` may fail with `ImportError: libGL.so.1`. Use `opencv-python-headless` instead.

---

## Project Structure

```text
leaflet_project/
│
├── app.py                 # Flask backend and OCR logic
├── templates/
│   └── index.html         # Upload UI and table layout
├── static/
│   ├── main.js            # Frontend logic (Vanilla JS)
│   └── style.css          # Basic styling
└── uploads/               # Optional temporary storage
