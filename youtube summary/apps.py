from flask import Flask, request, jsonify
from googletrans import Translator
from youtube_transcript_api import YouTubeTranscriptApi
from transformers import pipeline, AutoTokenizer, AutoModelForSeq2SeqLM
from urllib.parse import urlparse, parse_qs
from gtts import gTTS  # Import gTTS for text-to-speech
import os
import logging
import pygame

app = Flask(__name__)

# Initialize tokenizer and model for summary generation
tokenizer = AutoTokenizer.from_pretrained("t5-base", model_max_length=1000)
model = AutoModelForSeq2SeqLM.from_pretrained("t5-base")

# Set up logging
logging.basicConfig(filename='app.log', level=logging.ERROR)

# Define helper functions
def extract_video_id(url):
    video_id = None
    if url:
        query_params = urlparse(url)
        video_id = parse_qs(query_params.query).get("v")
        if video_id:
            video_id = video_id[0]
        elif query_params.path.startswith('/'):
            video_id = query_params.path.split('/')[-1]
    return video_id

def get_transcript(video_id):
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        text = ' '.join([segment['text'] for segment in transcript])
        length = len(text)
        return text, length
    except Exception as e:
        logging.error("Error fetching transcript: %s", e)
        return None, 0

def get_summary(transcript):
    try:
        if not transcript:
            return ''

        inputs = tokenizer(transcript, truncation=True, padding="longest", return_tensors="pt")
        outputs = model.generate(inputs['input_ids'], max_length=1000, num_beams=4, early_stopping=True)
        summary = tokenizer.decode(outputs[0], skip_special_tokens=True)

        return summary.strip()
    except Exception as e:
        logging.error("Error generating summary: %s", e)
        return None

def translate_text(text, dest_lang):
    try:
        translator = Translator()
        translation = translator.translate(text, dest=dest_lang)
        return translation.text
    except Exception as e:
        logging.error("Error translating text: %s", e)
        return None

def tts(text, lang):
    try:
        filename = f"{lang}_summary.mp3"
        tts = gTTS(text=text, lang=lang)
        tts.save(filename)
        play_audio(filename)
        os.remove(filename)  # Clean up the file after playing
    except Exception as e:
        logging.error("Error generating or playing audio: %s", e)

def play_audio(filename):
    try:
        pygame.mixer.init()
        pygame.mixer.music.load(filename)
        pygame.mixer.music.play()
        while pygame.mixer.music.get_busy():
            continue
        pygame.mixer.quit()
    except Exception as e:
        logging.error("Error playing audio: %s", e)

# Define routes and view functions
@app.route('/summary', methods=['GET'])
def get_summary_route():
    url = request.args.get('url')
    video_id = extract_video_id(url)
    if video_id:
        transcript, transcript_length = get_transcript(video_id)
        if transcript:
            summary = get_summary(transcript)
            if summary:
                # Return response
                return jsonify({'summary': summary}), 200
            else:
                return jsonify({'error': 'Failed to generate summary'}), 500
        else:
            return jsonify({'error': 'Failed to get transcript'}), 500
    else:
        return jsonify({'error': 'Invalid YouTube URL or video not found'}), 400

@app.route('/translate', methods=['GET'])
def translate_summary():
    summary = request.args.get('summary')
    dest_lang = request.args.get('lang')
    if summary and dest_lang:
        translated_summary = translate_text(summary, dest_lang)
        if translated_summary:
            return jsonify({'translated_summary': translated_summary}), 200
        else:
            return jsonify({'error': 'Failed to translate summary'}), 500
    else:
        return jsonify({'error': 'Invalid parameters'}), 400

if __name__ == "__main__":
    app.run(debug=True)
