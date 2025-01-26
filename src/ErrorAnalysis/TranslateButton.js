import React, { useState } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
export default function TranslateButton({ selectedRow }) {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("en");
  const [translatedText, setTranslatedText] = useState("");

  const handleTranslate = async () => {
    const data = { text: selectedRow.text, target_lang: targetLang };

    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/translate",
        data
      );
      if (response.data.translated_text) {
        setTranslatedText(response.data.translated_text); // update the translated text state
      } else {
        alert("Translation failed.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to translate text.");
    }
  };

  return (
    <>
      <div>
        <Box style={{ display: "flex", alignItems: "left", gap: "10px" }}>
          <label>
            Target Language:
            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
            >
              <option value="en">English</option>
              <option value="zh">Chinese</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </label>
          <br />
          <Button
            variant="contained"
            color="primary"
            disabled={!selectedRow}
            onClick={handleTranslate}
          >
            Translate
          </Button>
        </Box>

        {translatedText && (
          <Box>
            <h3>Translated Text:</h3>
            <p>{translatedText}</p>
          </Box>
        )}
      </div>
    </>
  );
}
