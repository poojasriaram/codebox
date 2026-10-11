/**
 * Speech Service for AI Viva
 * Text-to-speech for AI question narration
 * Speech-to-text for student oral examination defense
 */

export const speechService = {
  isSynthesisSupported: () => typeof window !== 'undefined' && 'speechSynthesis' in window,
  isRecognitionSupported: () => typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window),

  speak: (text, onEnd = null) => {
    if (!speechService.isSynthesisSupported()) return;
    try {
      window.speechSynthesis.cancel(); // Stop any pending speech
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.05;
      
      const voices = window.speechSynthesis.getVoices();
      // Prefer English futuristic or clear natural voice
      const preferredVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha')));
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      if (onEnd) utterance.onend = onEnd;
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis failed:', e);
    }
  },

  stopSpeaking: () => {
    if (speechService.isSynthesisSupported()) {
      window.speechSynthesis.cancel();
    }
  },

  createRecognizer: (onResult, onError, onEnd) => {
    if (!speechService.isRecognitionSupported()) {
      return null;
    }

    try {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = true;
      recognizer.lang = 'en-US';

      recognizer.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          transcript += event.results[i][0].transcript;
        }
        if (onResult) onResult(transcript);
      };

      recognizer.onerror = (event) => {
        if (onError) onError(event.error);
      };

      recognizer.onend = () => {
        if (onEnd) onEnd();
      };

      return recognizer;
    } catch (e) {
      console.warn('Speech recognition creation error:', e);
      return null;
    }
  },
};
