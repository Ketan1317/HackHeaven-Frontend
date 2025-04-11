import React, { useState, useEffect, useRef } from "react";
import Avatar from "../assets/dev.jpg";
import { CiPlay1 } from "react-icons/ci";
import { IoExitOutline } from "react-icons/io5";
import { FiFileText } from "react-icons/fi";
import Editor from "@monaco-editor/react";
import axios from "axios";

// Define language options and mappings
const LANGUAGES = [
  { value: "python", label: "Python" },
  { value: "javascript", label: "JavaScript" },
  { value: "java", label: "Java" },
  { value: "cpp", label: "C++" },
  { value: "csharp", label: "C#" },
  { value: "typescript", label: "TypeScript" },
  { value: "go", label: "Go" },
  { value: "rust", label: "Rust" },
];

const LANGUAGE_MAPPING = {
  python: "python",
  javascript: "javascript",
  java: "java",
  cpp: "cpp",
  csharp: "csharp",
  typescript: "typescript",
  go: "go",
  rust: "rust",
};

// Initial code templates
const CODE_TEMPLATES = {
  python:
    '# Welcome to Python\n\ndef greeting(name):\n    return f"Hello, {name}!"\n\n# Main program\nif __name__ == "__main__":\n    print(greeting("World"))\n    # Add your code here',
  javascript:
    '// Welcome to JavaScript\n\nfunction greeting(name) {\n    return `Hello, ${name}!`;\n}\n\n// Main program\nconsole.log(greeting("World"));\n// Add your code here',
  java: '// Welcome to Java\n\npublic class Main {\n    public static String greeting(String name) {\n        return "Hello, " + name + "!";\n    }\n    \n    public static void main(String[] args) {\n        System.out.println(greeting("World"));\n        // Add your code here\n    }\n}',
  cpp: '// Welcome to C++\n#include <iostream>\n#include <string>\n\nusing namespace std;\n\nstring greeting(const string& name) {\n    return "Hello, " + name + "!";\n}\n\nint main() {\n    cout << greeting("World") << endl;\n    // Add your code here\n    return 0;\n}',
  csharp:
    '// Welcome to C#\nusing System;\n\nclass Program {\n    static string Greeting(string name) {\n        return $"Hello, {name}!";\n    }\n    \n    static void Main() {\n        Console.WriteLine(Greeting("World"));\n        // Add your code here\n    }\n}',
  typescript:
    '// Welcome to TypeScript\n\nfunction greeting(name: string): string {\n    return `Hello, ${name}!`;\n}\n\n// Main program\nconsole.log(greeting("World"));\n// Add your code here',
  go: '// Welcome to Go\npackage main\n\nimport (\n    "fmt"\n)\n\nfunc greeting(name string) string {\n    return fmt.Sprintf("Hello, %s!", name)\n}\n\nfunc main() {\n    fmt.Println(greeting("World"))\n    // Add your code here\n}',
  rust: '// Welcome to Rust\n\nfn greeting(name: &str) -> String {\n    format!("Hello, {}!", name)\n}\n\nfn main() {\n    println!("{}", greeting("World"));\n    // Add your code here\n}',
};

// Language versions for Piston API
const LANGUAGE_VERSIONS = {
  python: "3.10.0",
  javascript: "18.15.0",
  java: "17.0.5",
  cpp: "13.2.0",
  csharp: "6.0.0",
  typescript: "4.9.4",
  go: "1.19.1",
  rust: "1.65.0",
};

// Test cases for the "Reverse a String" problem
const TEST_CASES = [
  { input: "", expected: "" },
  { input: "a", expected: "a" },
  { input: "hello", expected: "olleh" },
  { input: "racecar", expected: "racecar" },
];

// Questions for the challenge
const QUESTIONS = [
  "What is the time complexity of reversing a string?",
  "Can a string be reversed in-place? Why or why not?",
  "What data structure is most efficient for string reversal?",
  "How would you handle null or empty strings in this problem?",
  "What is the space complexity of your solution?",
];

const Custom1v1 = () => {
  const [opponent, setOpponent] = useState({
    name: "Devyansh",
    coins: 1200,
    avatar: Avatar,
  });
  const [user, setUser] = useState({
    name: "Ketan Goyal",
    coins: 900,
    avatar: Avatar,
  });
  const [data, setData] = useState({
    difficulty: "Easy",
    title: "Reverse a String",
    description:
      "Write a function that takes a string as input and returns a new string with the characters in reverse order. This is a common string manipulation problem that helps practice string operations and character manipulation.",
    examples: {
      sample_test: "hello",
      sample_output: "olleh",
      sample_description: "Reverse 'hello' to 'olleh'.",
    },
    test_cases: [
      { test1: "", output1: "" },
      { test2: "a", output2: "a" },
      { test3: "racecar", output3: "racecar" },
    ],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("python");
  const [code, setCode] = useState(CODE_TEMPLATES["python"]);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isExecuting, setIsExecuting] = useState(false);
  const [showTestResults, setShowTestResults] = useState(false);
  const [randomQuestion, setRandomQuestion] = useState("");
  const editorRef = useRef(null);

  // Handle editor mounting
  const handleEditorDidMount = (editor) => {
    editorRef.current = editor;
  };

  // Set random question on mount
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * QUESTIONS.length);
    setRandomQuestion(QUESTIONS[randomIndex]);
  }, []);

  // Update code template when language changes
  useEffect(() => {
    setCode(CODE_TEMPLATES[selectedLanguage]);
  }, [selectedLanguage]);

  const handleLanguageChange = (e) => {
    setSelectedLanguage(e.target.value);
  };

  const executeCode = async () => {
    setIsExecuting(true);
    setOutput("");
    setError("");
    setShowTestResults(false);

    try {
      const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
        language: selectedLanguage,
        version: LANGUAGE_VERSIONS[selectedLanguage],
        files: [{ content: code }],
      });

      if (response.data.run) {
        const executionOutput = response.data.run.output.trim();
        setOutput(executionOutput);
        if (response.data.run.stderr) {
          setError(response.data.run.stderr);
        } else {
          // Check if the code correctly reverses strings
          let allTestsPassed = true;
          const lines = executionOutput.split("\n").map(line => line.trim());
          TEST_CASES.forEach((test, index) => {
            const expectedOutput = test.expected;
            const actualOutput = lines[index] || "";
            if (actualOutput !== expectedOutput) {
              allTestsPassed = false;
            }
          });
          if (allTestsPassed && lines.length === TEST_CASES.length) {
            setShowTestResults(true);
          }
        }
      }
    } catch (err) {
      setError(err.response?.data?.error || "Failed to execute code");
    } finally {
      setIsExecuting(false);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Submission successful!");
    }, 2000);
  };

  const handleExit = () => {
    if (!showExitConfirm) {
      setShowExitConfirm(true);
      setTimeout(() => setShowExitConfirm(false), 3000);
    } else {
      window.history.back();
    }
  };

  return (
    <div className="bg-[#0B1226] text-white min-h-screen overflow-x-hidden relative font-sans">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl animate-blob" />
        <div className="absolute top-[40%] left-[60%] w-96 h-96 bg-blue-600/20 rounded-full blur-2xl animate-blob animation-delay-2000" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-purple-500/20 rounded-full blur-2xl animate-blob animation-delay-4000" />
      </div>

      {/* Header */}
      <header className="flex justify-between items-center px-6 h-20 shadow-md shadow-cyan-500/10 backdrop-blur-sm relative z-10">
        <div className="user flex items-center gap-4 transition-all duration-300 hover:scale-105">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full border-2 border-cyan-500/30 shadow-md"
          />
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <p>{user.name}</p>
              <p className="text-yellow-400">{user.coins} 🪙</p>
            </div>
            <div className="w-32 h-2 mt-1 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 animate-pulse-slow" />
          </div>
        </div>
        <div className="submit flex items-center gap-4 bg-gray-700/50 px-6 py-2 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/30">
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              isSubmitting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-l"
            } text-white font-semibold transition-all duration-300 hover:scale-105`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Submitting...
              </span>
            ) : (
              <>
                <CiPlay1 className="text-xl" />
                Submit
              </>
            )}
          </button>
          <div className="w-[1px] h-6 bg-gray-500" />
          <button
            onClick={handleExit}
            className={`text-lg transition-all duration-300 ${
              showExitConfirm ? "text-red-500 hover:text-red-700" : "text-white hover:text-gray-300"
            }`}
          >
            <IoExitOutline />
            {showExitConfirm && <span className="ml-1 text-sm">Confirm?</span>}
          </button>
          <button
            onClick={executeCode}
            disabled={isExecuting}
            className={`px-4 py-2 rounded-xl text-white font-bold transition-colors ${
              isExecuting
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600"
            }`}
          >
            {isExecuting ? "Executing..." : "Run Code"}
          </button>
          <select
            value={selectedLanguage}
            onChange={handleLanguageChange}
            className="px-4 py-2 bg-gray-700 border border-cyan-500/30 rounded-lg text-white text-sm font-medium hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all duration-200"
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.value} value={lang.value} className="bg-gray-800 text-white">
                {lang.label}
              </option>
            ))}
          </select>
        </div>
        <div className="opponent flex items-center gap-4 transition-all duration-300 hover:scale-105">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <p>{opponent.name}</p>
              <p className="text-yellow-400">{opponent.coins} 🪙</p>
            </div>
            <div className="w-32 h-2 mt-1 rounded-full bg-gradient-to-r from-red-600 to-pink-600 animate-pulse-slow" />
          </div>
          <img
            src={opponent.avatar}
            alt={opponent.name}
            className="w-12 h-12 rounded-full border-2 border-cyan-500/30 shadow-md"
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex justify-center gap-6 p-6 mt-6">
        <div className="left w-[48vw] min-h-[calc(100vh-10rem)] bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:shadow-xl">
          <div className="flex items-center gap-2 mb-6 bg-gray-700/50 px-4 py-2 rounded-xl text-white transition-all duration-300 hover:bg-gray-600/70">
            <FiFileText className="text-xl" />
            <h3 className="text-lg font-semibold">Problem Details</h3>
          </div>
          <h1 className="text-4xl font-extrabold mb-4 bg-gradient-to-r from-teal-400 to-cyan-500 bg-clip-text text-transparent transition-all duration-300 hover:text-teal-300">
            {data.title}
          </h1>
          <div
            className={`inline-block px-3 py-1 rounded-full font-semibold text-white text-center mb-4 transition-all duration-300 ${
              data.difficulty === "Easy"
                ? "bg-green-500 hover:bg-green-600"
                : data.difficulty === "Medium"
                ? "bg-yellow-600 hover:bg-yellow-700"
                : data.difficulty === "Hard"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-gray-500 hover:bg-gray-600"
            }`}
          >
            {data.difficulty}
          </div>
          <p className="text-lg text-gray-300 mb-6 leading-relaxed transition-opacity duration-300 hover:opacity-90">
            {data.description}
          </p>
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Example
          </h2>
          <div className="p-4 bg-gray-800/50 rounded-xl shadow-inner transition-all duration-300 hover:shadow-md">
            <p className="text-lg font-medium mb-2">Input: {data.examples.sample_test}</p>
            <p className="text-lg font-medium mb-2">Output: {data.examples.sample_output}</p>
            <p className="text-md text-gray-400">Explanation: {data.examples.sample_description}</p>
          </div>
          {randomQuestion && (
            <div className="mt-6">
              <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                Question
              </h2>
              <div className="p-4 bg-gray-800/50 rounded-xl shadow-inner transition-all duration-300 hover:shadow-md">
                <p className="text-lg text-white">{randomQuestion}</p>
              </div>
            </div>
          )}
        </div>
        <div className="right w-[48vw] min-h-[calc(100vh-10rem)] flex flex-col gap-4">
          <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:shadow-xl">
            <Editor
              height="calc(50vh - 7rem)"
              language={LANGUAGE_MAPPING[selectedLanguage]}
              value={code}
              onChange={(value) => setCode(value || "")}
              onMount={handleEditorDidMount}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                wordWrap: "on",
              }}
            />
          </div>
          <div className="flex-1 bg-white/5 backdrop-blur-lg border border-white/10 rounded-xl p-6 shadow-lg shadow-cyan-500/10 transition-all duration-300 hover:shadow-xl">
            <h3 className="text-lg font-mono font-bold text-emerald-400 mb-2">Output</h3>
            <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm h-32 overflow-auto border border-gray-700">
              {output && <div className="text-green-400">{output}</div>}
              {error && <div className="text-red-400">{error}</div>}
              {showTestResults && (
                <div
                  className="mt-2 text-sm transition-all duration-500 ease-in-out transform origin-top"
                  style={{ opacity: showTestResults ? 1 : 0, maxHeight: showTestResults ? "200px" : "0" }}
                >
                  <h4 className="font-bold text-emerald-400 mb-2">Test Cases</h4>
                  {TEST_CASES.map((test, index) => (
                    <div key={index} className="mb-2">
                      <p>Test {index + 1}: Input = "{test.input}"</p>
                      <p>Expected Output: "{test.expected}"</p>
                      <p>Actual Output: "{output.split("\n")[index] || 'N/A'}"</p>
                      <p className={output.split("\n")[index] === test.expected ? "text-green-400" : "text-red-400"}>
                        {output.split("\n")[index] === test.expected ? "Passed" : "Failed"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom1v1;