"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import Editor from "@monaco-editor/react";

export default function CompilerApi() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  // Default code templates based on selected language
  const codeTemplates = {
    python: `# Write a Python function\ndef hello_world():\n    return "Hello, World!"\n\nprint(hello_world())`,
    cpp: `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, World!";\n    return 0;\n}`,
    c: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!");\n    return 0;\n}`,
    php: `<?php\nfunction hello_world() {\n    echo "Hello, World!";\n}\nhello_world();\n?>`,
    javascript: `function helloWorld() {\n    return "Hello, World!";\n}\nconsole.log(helloWorld());`,
  };

  // Populate code template when language is changed
  useEffect(() => {
    setCode(codeTemplates[language]);
  }, [language]);

  const handleRunCode = async () => {
    try {
      const response = await axios.post("http://192.168.18.20:8000/compiler-run", {
        language,
        code,
      });
      setOutput(response.data.stdout);
      setError(response.data.stderr);
    } catch (err) {
      console.error(err);
      setError("Failed to run code");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-[#1e1e1e] text-white">
      {/* Header */}
      <header className="bg-[#252526] p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">VSCode Online Compiler</h1>

        {/* Language Selector */}
        <div className="flex items-center">
          <label htmlFor="language" className="text-sm mr-2">
            Language:
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="text-black p-1 rounded"
          >
            <option value="python">Python</option>
            <option value="cpp">C++</option>
            <option value="c">C</option>
            <option value="php">PHP</option>
            <option value="javascript">JavaScript</option>
          </select>
        </div>

        {/* Run Button */}
        <button
          onClick={handleRunCode}
          className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded"
        >
          Run Code
        </button>
      </header>

      {/* Main Section */}
      <div className="flex-1 flex">
        {/* Code Editor */}
        <div className="flex-1">
          <Editor
            height="100%"
            theme="vs-dark"
            defaultLanguage={language}
            language={language === 'cpp' || language === 'c' ? 'cpp' : language}
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              fontSize: 16,
              minimap: { enabled: false },
              lineNumbers: "on",
              scrollBeyondLastLine: false,
            }}
          />
        </div>

        {/* Output Panel */}
        <div className="w-1/3 bg-[#1e1e1e] p-4 border-l border-[#252526]">
          <h2 className="text-lg font-semibold mb-2">Output</h2>
          <div className="h-1/2 bg-[#252526] p-3 rounded-md mb-4">
            {output ? (
              <pre className="text-green-400 whitespace-pre-wrap">{output}</pre>
            ) : (
              <p className="text-gray-500">Your output will be displayed here...</p>
            )}
          </div>

          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <div className="h-1/2 bg-[#252526] p-3 rounded-md">
            {error ? (
              <pre className="text-red-400 whitespace-pre-wrap">{error}</pre>
            ) : (
              <p className="text-gray-500">Errors will be displayed here...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
