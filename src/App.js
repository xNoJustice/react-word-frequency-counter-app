import React, { useState } from "react";
import logo from "./styles/logo.svg";
import "./styles/logo.css";

function App() {
  const [words, setWords] = useState("");
  const [sortedWords, setSortedWords] = useState("");

  const calculate = () => {
    let input = words
      .replace(/[?.!,"]/g, "")
      .replace(/[ ]{2,}/g, "") //for empty spaces more than 2.
      .trim()
      .toLowerCase();
    let wordFreq = input.split(/\s/).reduce(
      (output, word) =>
        Object.assign(output, {
          [word]: output[word] ? output[word] + 1 : 1,
        }),
      {}
    );
    setSortedWords(
      Object.entries(wordFreq)
        .map((currentValue) => [currentValue[1], currentValue[0]])
        .sort((a, b) => parseInt(b) - parseInt(a))
        .map((currentValue, index) => [
          index + 1,
          currentValue[0],
          currentValue[1],
        ])
    );
  };

  return (
    <div className="w-full mx-auto p-6">
      <img src={logo} className="logo mx-auto" alt="logo" />
      <h1 className="text-2xl text-center mx-auto dark:text-white">
        Word Frequency Counter
      </h1>
      <div className="flex flex-col justify-center items-center mt-5">
        <textarea
          className="rounded-md border-none focus:outline-none text-lg"
          rows="8"
          cols="50"
          onChange={(e) => setWords(e.target.value)}
          value={words ? words : "Paste your text content here!"}
        ></textarea>
        <button
          onClick={() => calculate()}
          className="text-xl bg-indigo-500 p-2 mt-2 w-64 dark:text-white rounded-2xl"
        >
          Count Those Words
        </button>
        {sortedWords && (
          <table className="shadow-lg bg-white mt-3">
            <thead>
              <th className="bg-blue-100 border text-left px-6 py-3">Rank</th>
              <th className="bg-blue-100 border text-left px-6 py-3">Count</th>
              <th className="bg-blue-100 border text-left px-6 py-3">Word</th>
            </thead>
            <tbody className="text-center">
              {sortedWords.map((word) => (
                <tr>
                  <td className="border px-6 py-3">{`#${word[0]}`}</td>
                  <td className="border px-6 py-3">{word[1]}</td>
                  <td className="border px-6 py-3">{word[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default App;
