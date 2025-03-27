# VIDEO SUBTITLE GENERATOR AND PLAYER

This project allows users to:

- Upload a video
- Extract audio from the video
- Transcribe the speech using OpenAI Whisper
- Generate English subtitles (`.srt` file)
- Translate subtitles into Tamil
- Display the video with subtitles in a web player

---

## Project Structure

Video-Subtitle-Generator
│── srt_generator.ipynb    # Jupyter Notebook (Backend)

│── index.html             # Web page to play video with subtitles

│── subtitles.js           # JavaScript for displaying subtitles

│── styles.css             # CSS for styling (Optional)

│── README.md              # Project documentation (This file)

│── output_transcript.srt  # English Subtitle (Generated)

│── translated_transcript_ta.srt # Tamil Subtitle (Generated)

---

## Features

Extract audio from video

- Transcribe speech to text
- Generate subtitles in English (.srt)
- Translate subtitles to Tamil
- Play video with uploaded subtitles

---

## Setup Instructions

### Install Required Dependencies

Install necessary Python libraries:

```bash
pip install moviepy
pip install git+https://github.com/openai/whisper.git
pip install googletrans==3.1.0a0
```

---

### Run the Backend (Jupyter Notebook)

1. Open srt_generator.ipynb in Jupyter Notebook or Google Colab.
2. Run all the cells.
3. Upload a video file.
4. The script will:

- Extract audio
- Transcribe speech
- Generate English subtitles (`.srt`)
- Translate subtitles to Tamil
- Save the `.srt` files

5. Download `output_transcript.srt` (English) and `translated_transcript_ta.srt` (Tamil).

---

## How It Works

### Step 1: Extract Audio

1. The script extracts the audio from the uploaded video using `moviepy`.

2. Saves it as a `.wav` file.

## Step 2: Speech-to-Text (Transcription)

1. Uses Whisper AI to transcribe the extracted audio.

2. Generates a text transcript.

### Step 3: Generate English Subtitles (.srt)

1. Converts transcript into `.srt` format with timestamps.

### Step 4: Translate Subtitles to Tamil

1. Uses googletrans to translate each line to Tamil.

### Step 5: Play Video with Subtitles

1. Open `index.html`

2. Upload your video and subtitles

3. The player synchronizes subtitles with the video

## Technologies Used

- `Python` - Backend Processing
- `MoviePy` - Extracting Audio from Video
- `Whisper AI` - Speech-to-Text Transcription
- `Google Translate API` - Translating Subtitles
- `HTML + JavaScript` - Web-based Video Player

## License

This project is open-source under the MIT License.
