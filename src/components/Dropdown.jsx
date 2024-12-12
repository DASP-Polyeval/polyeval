import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./DropdownCSS.css"; // Ensure this import is correct
import CsvDisplay from "../CSVDisplay";
import Emma500llama27b from "./Emma500llama27b";
import Qwen27B from "./Qwen27B";
import Qwen157B from "./Qwen157B";
import MetaLlama3188 from "./MetaLlama3188";
import LlaMax27B from "./LLaMax27B";
import LLaMAX27BAlpaca from "./LLaMAX27BAlpaca";
import Yayi7bllama2 from "./Yayi7bllama2";
import MetaLlama38B from "./MetaLlama38B";
import Gemma29b from "./Gemma29b";
import TowerInstruct7Bv02 from "./TowerInstruct7Bv02";
import Occiglot7beu5 from "./occiglot7beu5";
import TowerBase7Bv01 from "./TowerBase7Bv01";
import MGPT13B from "./MGPT13B";
import Gemma7B from "./Gemma7B";
import MGPT from "./MGPT";
import CodeLlama7bhf from "./CodeLlama7bhf";
import Llama27bhf from "./Llama27bhf";
import Llama27bchathf from "./Llama27bchathf";
import Yayi7b from "./Yayi7b";
import Bloom7b1 from "./Bloom7b1";
import Occiglot7beu5instruct from "./Occiglot7beu5instruct";
import Mala50010bv2 from "./Mala50010bv2";
import Mala50010bv1 from "./Mala50010bv1";
import Bloomz7b1 from "./Bloomz7b1";

// import Emma500llama27b from "./Emma500llama27b";

// Import other child components as needed

const DropdownComponent = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [selectedComponent, setSelectedComponent] = useState(null);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleItemClick = (modelName, component) => {
    setSelectedModel(modelName);
    setSelectedComponent(component);
    setDropdownOpen(false); // Collapse the dropdown
  };

  return (
    <>
      <div className="dropdown dropdown-custom">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          onClick={toggleDropdown}
          aria-expanded={dropdownOpen ? "true" : "false"}
        >
          {selectedModel || "Select a Model"}
        </button>
        <ul className={`dropdown-menu ${dropdownOpen ? "show" : ""}`}>
          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("Emma500llama27b", <Emma500llama27b />);
                // <Emma500llama27b />);
              }}
            >
              Emma500llama27b
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("Qwen2-7B", <Qwen27B />);
                // <Emma500llama27b />);
              }}
            >
              Qwen2-7B
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("Qwen1.5-7B", <Qwen157B />);
                // <Emma500llama27b />);
              }}
            >
              Qwen1.5-7B
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("Meta-Llama-3.1-8B", <MetaLlama3188 />);
                // <Emma500llama27b />);
              }}
            >
              Meta-Llama-3.1-8B
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("LLaMAX2-7B", <LlaMax27B />);
                // <Emma500llama27b />);
              }}
            >
              LLaMAX2-7B
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("LLaMAX27BAlpaca", <LLaMAX27BAlpaca />);
                // <Emma500llama27b />);
              }}
            >
              LLaMAX27BAlpaca
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("yayi-7b-llama2", <Yayi7bllama2 />);
                // <Emma500llama27b />);
              }}
            >
              yayi-7b-llama2
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("Meta-Llama-3-8B", <MetaLlama38B />);
                // <Emma500llama27b />);
              }}
            >
              Meta-Llama-3-8B
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("gemma-2-9b", <Gemma29b />);
                // <Emma500llama27b />);
              }}
            >
              gemma-2-9b
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick(
                  "TowerInstruct-7B-v0.2	",
                  <TowerInstruct7Bv02 />
                );
                // <Emma500llama27b />);
              }}
            >
              TowerInstruct-7B-v0.2
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("occiglot-7b-eu5", <Occiglot7beu5 />);
                // <Emma500llama27b />);
              }}
            >
              occiglot-7b-eu5
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("TowerBase-7B-v0.1", <TowerBase7Bv01 />);
                // <Emma500llama27b />);
              }}
            >
              TowerBase-7B-v0.1
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("mGPT-13B", <MGPT13B />);
                // <Emma500llama27b />);
              }}
            >
              mGPT-13B
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("gemma-7b", <Gemma7B />);
                // <Emma500llama27b />);
              }}
            >
              gemma-7b
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("mGPT", <MGPT />);
                // <Emma500llama27b />);
              }}
            >
              mGPT
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("Llama-2-7b-hf", <Llama27bhf />);
                // <Emma500llama27b />);
              }}
            >
              Llama-2-7b-hf
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("CodeLlama-7b-hf", <CodeLlama7bhf />);
                // <Emma500llama27b />);
              }}
            >
              CodeLlama-7b-hf
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("Llama-2-7b-chat-hf", <Llama27bchathf />);
                // <Emma500llama27b />);
              }}
            >
              Llama-2-7b-chat-hf
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("yayi-7b", <Yayi7b />);
                // <Emma500llama27b />);
              }}
            >
              yayi-7b
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("bloom-7b1", <Bloom7b1 />);
                // <Emma500llama27b />);
              }}
            >
              bloom-7b1
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick(
                  "occiglot-7b-eu5-instruct",
                  <Occiglot7beu5instruct />
                );
                // <Emma500llama27b />);
              }}
            >
              occiglot-7b-eu5-instruct
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("mala-500-10b-v2", <Mala50010bv2 />);
                // <Emma500llama27b />);
              }}
            >
              mala-500-10b-v2
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("mala-500-10b-v1", <Mala50010bv1 />);
                // <Emma500llama27b />);
              }}
            >
              mala-500-10b-v1
            </a>
          </li>

          <li>
            <a
              className="dropdown-item"
              href="#"
              onClick={(e) => {
                e.preventDefault(); // Prevent default link behavior
                handleItemClick("bloomz-7b1", <Bloomz7b1 />);
                // <Emma500llama27b />);
              }}
            >
              bloomz-7b1
            </a>
          </li>

          {/* Add more <li> elements for other child components */}
        </ul>
      </div>
      {selectedModel && (
        <div className="mt-3">
          <h3 onClick={toggleDropdown}>{selectedModel}</h3>{" "}
          {/* Display the selected model on top and toggle dropdown on click */}
          {selectedComponent}
        </div>
      )}
    </>
  );
};

export default DropdownComponent;
