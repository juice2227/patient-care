import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = "YOUR_GOOGLE_API_KEY"; // Replace with your real API key
const BASE_URL = "https://translation.googleapis.com/language/translate/v2";

const useAutoTranslate = (text, targetLang) => {
  const [translatedText, setTranslatedText] = useState(text);

  useEffect(() => {
    if (!text) return;

    const fetchTranslation = async () => {
      try {
        const response = await axios.post(`${BASE_URL}?key=${API_KEY}`, {
          q: text,
          target: targetLang,
        });
        setTranslatedText(response.data.data.translations[0].translatedText);
      } catch (error) {
        console.error("Translation error:", error);
      }
    };

    fetchTranslation();
  }, [text, targetLang]);

  return translatedText;
};

export default useAutoTranslate;
