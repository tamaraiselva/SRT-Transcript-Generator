# Video to SRT Transcript Generator

This project processes a video file to generate a transcript in the **SRT (SubRip Subtitle)** format. The transcript is then translated into **Tamil** using Google Translate. The project is implemented in **Google Colab** and uses Python libraries for audio extraction, speech recognition, and translation.

---

## Features

1. **Extract Audio from Video**: Extract the audio track from a video file.
2. **Transcribe Audio to Text**: Convert the audio into text using Google’s Speech Recognition API.
3. **Generate SRT File**: Format the transcribed text into an SRT file.
4. **Translate SRT File**: Translate the English transcript into Tamil using Google Translate.
5. **Save and Verify**: Save both the English and Tamil SRT files in the Colab environment for verification.
6. **Download Files**: Download the generated SRT files to your local machine.

---

## Requirements

- Python 3.x
- Google Colab environment
- Internet connection (for Google Speech Recognition and Google Translate APIs)

---

## Libraries Used

- `moviepy`: For extracting audio from video files.
- `speech_recognition`: For transcribing audio to text.
- `pydub`: For splitting audio into smaller chunks.
- `googletrans`: For translating text from English to Tamil.

---

## Setup Instructions

1. Open a new Google Colab notebook.
2. Copy and paste the provided code into a code cell.
3. Run the code cell-by-cell or all at once.
4. Upload a video file when prompted (ensure the video is 10-15 minutes long and in English).
5. The English and Tamil SRT files will be generated, saved, and displayed for verification.
6. Both files will also be available for download.

---

## Usage

### Step 1: Install Required Libraries

Run the following command to install the required libraries:

```bash
!pip install moviepy speechrecognition pydub googletrans==4.0.0-rc1
```

## Step 2: Upload the Video File

Upload a video file using the following code:

```py
from google.colab import files

# Upload a video file
uploaded = files.upload()
video_file = list(uploaded.keys())[0]
print(f"Uploaded video file: {video_file}")
```

## Step 3: Extract Audio from the Video

Extract the audio from the video and save it as a WAV file:

```py
import moviepy.editor as mp

# Extract audio from the video
audio_file = "temp_audio.wav"
video = mp.VideoFileClip(video_file)
video.audio.write_audiofile(audio_file)
print(f"Audio extracted and saved as: {audio_file}")
```

## Step 4: Transcribe Audio to Text

Transcribe the audio into text using Google’s Speech Recognition API:

```py
import speech_recognition as sr

# Initialize recognizer
recognizer = sr.Recognizer()

# Transcribe audio to text
with sr.AudioFile(audio_file) as source:
    audio = recognizer.record(source)
    try:
        transcript = recognizer.recognize_google(audio)
        print("Transcription successful!")
    except sr.UnknownValueError:
        transcript = "Google Speech Recognition could not understand the audio."
    except sr.RequestError as e:
        transcript = f"Could not request results from Google Speech Recognition service; {e}"

print("\nTranscript:\n", transcript)
```

## Step 5: Generate English SRT File

Generate an SRT file from the transcribed text:

```py
def generate_srt(transcript, output_file):
    """Generate an SRT file from the transcript."""
    with open(output_file, 'w') as f:
        f.write("1\n")  # Subtitle index
        f.write("00:00:00,000 --> 00:00:05,000\n")  # Timestamp (hardcoded for simplicity)
        f.write(transcript + "\n")  # Transcript text

# Generate English SRT file
english_srt_file = "output_transcript.srt"
generate_srt(transcript, english_srt_file)
print(f"English SRT file generated: {english_srt_file}")
```

## Step 6: Translate SRT Content to Tamil

Translate the English transcript into Tamil:

```py
from googletrans import Translator

# Initialize translator
translator = Translator()

# Translate the SRT content to Tamil
translated = translator.translate(transcript, src='en', dest='ta')  # 'en' -> English, 'ta' -> Tamil
translated_srt_content = translated.text
print("\nTranslated SRT Content:\n", translated_srt_content)

# Generate Tamil SRT file
tamil_srt_file = "translated_transcript_ta.srt"
generate_srt(translated_srt_content, tamil_srt_file)
print(f"Tamil SRT file generated: {tamil_srt_file}")
```

## Step 7: Display Both SRT Files for Verification

Display the contents of both SRT files:

```py
# Display English SRT file
with open(english_srt_file, 'r') as f:
    english_content = f.read()
print("\nEnglish SRT File Content:\n", english_content)

# Display Tamil SRT file
with open(tamil_srt_file, 'r') as f:
    tamil_content = f.read()
print("\nTamil SRT File Content:\n", tamil_content)
```

## Step 8: Download Both SRT Files

Download the SRT files to your local machine:

```py
from google.colab import files

# Download English SRT file
files.download(english_srt_file)

# Download Tamil SRT file
files.download(tamil_srt_file)
```

## Step 9: Clean Up Temporary Files

Remove temporary files to free up space:

```py
import os

# Clean up temporary audio files
os.remove(audio_file)
print(f"Temporary file {audio_file} removed.")
```

## Example Output

## English SRT File Content

```bash
1
00:00:00,000 --> 00:00:05,000
Hello, how are you?
```

## Tamil SRT File Content

```bash
1
00:00:00,000 --> 00:00:05,000
ஹலோ, நீங்கள் எப்படி இருக்கிறீர்கள்?
```

---

## Limitations

1. **Accuracy:** The transcription and translation may not be 100% accurate, especially for complex audio or dialects.

2. **Timestamps:** The current implementation uses hardcoded timestamps. For more accurate timestamps, use a speech-to-text API that provides word-level timestamps.

3. **Language Support:** The `googletrans` library supports a wide range of languages, but for commercial use, consider using the official Google Cloud Translation API.

---

## Future Enhancements

1. **Word-Level Timestamps:** Use a more advanced API (e.g., Google Cloud Speech-to-Text) to generate accurate word-level timestamps.

2. **Batch Processing:** Process multiple videos in a batch.

3. **GUI:** Create a user-friendly interface for non-technical users.

# Reference

https://colab.research.google.com/drive/1aE-v4cgjGALp29AY3eg4ASAUrpEpV4B4#scrollTo=6zWurfhACMJi

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.
