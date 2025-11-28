# **Smart-Prep — AI-Powered Study Summarizer & Test Generator**

Transform long PDFs and DOCX files into **concise summaries** and **exam-ready questions** instantly.

---

## 🚀 **Overview**

Smart-Prep is an AI-driven document-processing platform that turns dense study materials into **point-based or paragraph summaries**, **short-answer questions**, and **long-answer questions** with a single click.
Upload your academic PDFs/DOCs → pick options → get instant, structured learning outputs.

Built for **students, educators, and professionals**, the system automates laborious tasks like note-making, revision prep, and question creation.
(Reference: project documentation )

---

## ✨ **Key Features**

* 📄 **Upload PDF/DOC/DOCX**
* 🔍 **Page Range Selection** (e.g., 1–3, 5)
* 🧠 **AI/NLP-Based Summarization**

  * Point-based
  * Paragraph-based
* 📝 **Automated Question Generation**

  * Short-answer
  * Long-answer
  * Both
* ⚙️ **Configurable Question Counts**
* 💾 **Export & Copy Output**
* ⚡ **Fast, lightweight text extraction pipeline**

(Reference: detailed module breakdown )

---

## 🛠️ **Tech Stack**

### **Frontend**

* React + TypeScript
* TailwindCSS
* ShadCN/UI
* Lucide Icons

### **Backend**

* Supabase Edge Functions
* Node.js + Express (for file parsing logic)
* PDF-Parse & Mammoth.js for extraction 

### **AI/NLP**

* Summarization & question generation powered by LLM-based edge functions.

---

## 🧩 **System Architecture (High Level)**

1. **Upload Module** → Secure file handling via Multer
2. **Text Extraction Module** → PDF-Parse / Mammoth.js
3. **Page Range Processor** → Extracts only requested sections
4. **NLP Engine** → Summaries + Question Generation
5. **Results Module** → UI rendering + export options

(Architecture described in project report )

---

## 📂 **Project Structure**

```
/src
  /components
    FileUpload.tsx
    ProcessingOptions.tsx
    ResultsDisplay.tsx
  /pages
    Index.tsx
    NotFound.tsx
  /integrations
    /supabase
      client.ts
      types.ts
  App.tsx
  main.tsx
  index.css
```

---

## ▶️ **Running the App Locally**

### **Prerequisites**

* Node.js 18+
* Supabase project (+ Functions enabled)

### **Steps**

```bash
git clone https://github.com/Harshitha8117/generated
cd generated
npm install
npm run dev
```

Set environment variables:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

To run Supabase functions:

```bash
supabase functions serve
```

---

## 🎯 **How It Works (Flow)**

1. User uploads file
2. Client extracts text (simplified decoding + cleaning)
3. Text is truncated safely (memory-optimized)
4. Sent to Supabase function:

   * summaryType
   * questionType
   * questionCounts
   * pageRange
5. LLM processes and returns structured:

   * summary
   * questions
6. UI displays clean results with copy/export options

---

## 📸 **Screenshots**

Refer to the project documentation for full screenshot gallery.
(See Appendix B in the report for UI captures )

---

## 📌 **Future Enhancements**

* Multilingual summarization & Q-generation
* Advanced transformer-based summarizer
* Mobile-optimized UI
* PDF/Word export
* Collaborative real-time editing
* Highlighting + search inside document

(From the project's “Future Enhancements” section )

---

## 👩‍💻 **Team**

* Abinayashree J
* Charulatha K
* Harshitha K

Guided by:
Mr. Malarmannan A, M.E.
(As listed in official documents )

---

## 📜 **Academic References**

Full reference list included in project report (pages 51–52) .


Just tell me the style you want!
