import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Button } from "@mui/material";
export default function TranslateButton({ selectedRow }) {
  const [text, setText] = useState("");
  const [targetLang, setTargetLang] = useState("en");
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    if (text) {
      const translateText = async () => {
        try {
          const response = await axios.post(
            "http://127.0.0.1:5001/api/translate",
            {
              text: text,
              target_language: targetLang,
            },
            {
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          setTranslatedText(response.data.translated_text);
        } catch (error) {
          console.error("Error:", error);
          alert("Translation failed.");
        }
      };
      translateText();
    }
  }, [text, targetLang]); // when text or targetLang changes, call translateText

  const handleTranslate = () => {
    if (selectedRow) {
      switch (selectedRow.task_type) {
        case "classification":
          setText(selectedRow?.Prompt || "No data");
          break;
        case "generation":
          setText(
            `Prompt: ${selectedRow?.Prompt || "No data"}\nGenerated Text: ${
              selectedRow?.Generated_Text || "No data"
            }`
          );
          break;
        case "translation":
          setText(
            `Reference_Text: ${
              selectedRow?.Reference_Text || "No data"
            }\nSource_Text: ${
              selectedRow?.Source_Text || "No data"
            }\nTranslated_Text: ${selectedRow?.Translated_Text || "No data"}`
          );
          break;
        case "summarization":
          setText(
            `Document: ${selectedRow?.Document || "No data"}\nSummary: ${
              selectedRow?.Summary || "No data"
            }`
          );
          break;
        default:
          setText("Unknown task type");
      }
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
            Google Translate
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
