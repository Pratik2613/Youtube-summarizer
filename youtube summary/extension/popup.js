// document.addEventListener("DOMContentLoaded", function () {
//     const btnSummarise = document.getElementById("summarise");
//     const btnTranslateHindi = document.getElementById("translate-hindi");
//     const btnTranslateMarathi = document.getElementById("translate-marathi");
//     const btnReadSummary = document.getElementById("read-summary");
//     const btnReadSummaryHindi = document.getElementById("read-summary-hindi");
//     const btnReadSummaryMarathi = document.getElementById("read-summary-marathi");

//     btnSummarise.addEventListener("click", fetchAndDisplaySummary);
//     btnReadSummary.addEventListener("click", function() {
//         readSummary('en-US');
//     });
//     btnReadSummaryHindi.addEventListener("click", function() {
//         readSummaryWithGtts('hi-IN');
//     });
//     btnReadSummaryMarathi.addEventListener("click", function() {
//         readSummaryWithGtts('mr-IN');
//     });

//     function fetchAndDisplaySummary() {
//         const btn = document.getElementById("summarise");
//         const output = document.getElementById("output");
//         const translatedOutput = document.getElementById("translatedOutput");

//         btn.disabled = true;
//         btn.innerHTML = "Fetching Summary...";
//         output.innerHTML = ""; // Clear previous output
//         translatedOutput.innerHTML = ""; // Clear translated output

//         chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//             const url = tabs[0].url;

//             fetch(`http://127.0.0.1:5000/summary?url=${encodeURIComponent(url)}`)
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error("Failed to fetch summary.");
//                     }
//                     return response.json();
//                 })
//                 .then((data) => {
//                     if (data.error) {
//                         throw new Error(data.error);
//                     }
//                     const summary = data.summary;
//                     output.innerHTML = `Summary: ${summary}`;
//                     btn.disabled = false;
//                     btn.innerHTML = "Summarise";
//                     btnReadSummary.disabled = false;
//                     // Enable translate buttons
//                     btnTranslateHindi.disabled = false;
//                     btnTranslateMarathi.disabled = false;
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching summary:", error.message);
//                     output.innerHTML = "Error: " + error.message;
//                     btn.disabled = false;
//                     btn.innerHTML = "Summarise";
//                     btnReadSummary.disabled = true;
//                     // Disable translate buttons on error
//                     btnTranslateHindi.disabled = true;
//                     btnTranslateMarathi.disabled = true;
//                 });
//         });
//     }

//     function readSummary(lang) {
//         console.log("Reading summary in language:", lang); // Log the language to debug

//         const output = document.getElementById("output");
//         const summaryText = output.textContent.trim(); // Remove leading/trailing whitespace

//         // Mute the video's audio
//         const video = document.querySelector('video');
//         if (video) {
//             video.muted = true;
//         }

//         if ('speechSynthesis' in window) {
//             const speech = new SpeechSynthesisUtterance(summaryText);
//             speech.lang = lang;
//             speech.volume = 1;
//             speech.rate = 1;
//             speech.pitch = 1;
//             speech.onend = function(event) {
//                 // Unmute the video's audio after the summary has been read
//                 if (video) {
//                     video.muted = false;
//                 }
//             };
//             window.speechSynthesis.speak(speech);
//         } else {
//             alert('Text-to-speech is not supported in this browser.');
//         }
//     }

//     btnTranslateHindi.addEventListener("click", translateSummaryHindi);
//     btnTranslateMarathi.addEventListener("click", translateSummaryMarathi);

//     function translateSummaryHindi() {
//         translateSummary('hi');
//     }

//     function translateSummaryMarathi() {
//         translateSummary('mr');
//     }

//     function translateSummary(destLang) {
//         const output = document.getElementById("output");
//         const translatedOutput = document.getElementById("translatedOutput");
//         const summary = output.textContent;

//         translatedOutput.innerHTML = "Translating...";

//         fetch(`http://127.0.0.1:5000/translate?summary=${encodeURIComponent(summary)}&lang=${destLang}`)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Failed to translate summary.");
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 if (data.error) {
//                     throw new Error(data.error);
//                 }
//                 const translatedSummary = data.translated_summary;
//                 translatedOutput.innerHTML = `Translated Summary (${destLang}): ${translatedSummary}`;
//             })
//             .catch((error) => {
//                 console.error("Error translating summary:", error.message);
//                 translatedOutput.innerHTML = "Error: " + error.message;
//             });
//     }
// });



//Working in Eng,Hi //

// document.addEventListener("DOMContentLoaded", function () {
//     const btnSummarise = document.getElementById("summarise");
//     const btnTranslateHindi = document.getElementById("translate-hindi");
//     const btnTranslateMarathi = document.getElementById("translate-marathi");
//     const btnReadSummary = document.getElementById("read-summary");
//     const btnReadSummaryHindi = document.getElementById("read-summary-hindi");
//     const btnReadSummaryMarathi = document.getElementById("read-summary-marathi");

//     btnSummarise.addEventListener("click", fetchAndDisplaySummary);
//     btnReadSummary.addEventListener("click", function() {
//         readSummary('en-US');
//     });
//     btnReadSummaryHindi.addEventListener("click", function() {
//         readTranslatedSummary('hi-IN');
//     });
//     btnReadSummaryMarathi.addEventListener("click", function() {
//         readTranslatedSummary('mr-IN');
//     });

//     function fetchAndDisplaySummary() {
//         const btn = document.getElementById("summarise");
//         const output = document.getElementById("output");
//         const translatedOutput = document.getElementById("translatedOutput");

//         btn.disabled = true;
//         btn.innerHTML = "Fetching Summary...";
//         output.innerHTML = ""; // Clear previous output
//         translatedOutput.innerHTML = ""; // Clear translated output

//         chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
//             const url = tabs[0].url;

//             fetch(`http://127.0.0.1:5000/summary?url=${encodeURIComponent(url)}`)
//                 .then((response) => {
//                     if (!response.ok) {
//                         throw new Error("Failed to fetch summary.");
//                     }
//                     return response.json();
//                 })
//                 .then((data) => {
//                     if (data.error) {
//                         throw new Error(data.error);
//                     }
//                     const summary = data.summary;
//                     output.innerHTML = `Summary: ${summary}`;
//                     btn.disabled = false;
//                     btn.innerHTML = "Summarise";
//                     btnReadSummary.disabled = false;
//                     // Enable translate buttons
//                     btnTranslateHindi.disabled = false;
//                     btnTranslateMarathi.disabled = false;
//                 })
//                 .catch((error) => {
//                     console.error("Error fetching summary:", error.message);
//                     output.innerHTML = "Error: " + error.message;
//                     btn.disabled = false;
//                     btn.innerHTML = "Summarise";
//                     btnReadSummary.disabled = true;
//                     // Disable translate buttons on error
//                     btnTranslateHindi.disabled = true;
//                     btnTranslateMarathi.disabled = true;
//                 });
//         });
//     }

//     function readSummary(lang) {
//         console.log("Reading summary in language:", lang); // Log the language to debug

//         const output = document.getElementById("output");
//         const summaryText = output.textContent.trim(); // Remove leading/trailing whitespace

//         // Mute the video's audio
//         const video = document.querySelector('video');
//         if (video) {
//             video.muted = true;
//         }

//         if ('speechSynthesis' in window) {
//             const speech = new SpeechSynthesisUtterance(summaryText);
//             speech.lang = lang;
//             speech.volume = 1;
//             speech.rate = 1;
//             speech.pitch = 1;
//             speech.onend = function(event) {
//                 // Unmute the video's audio after the summary has been read
//                 if (video) {
//                     video.muted = false;
//                 }
//             };
//             window.speechSynthesis.speak(speech);
//         } else {
//             alert('Text-to-speech is not supported in this browser.');
//         }
//     }

//     function readTranslatedSummary(lang) {
//         console.log("Reading translated summary in language:", lang); // Log the language to debug

//         const translatedOutput = document.getElementById("translatedOutput");
//         const translatedSummaryText = translatedOutput.textContent.trim(); // Remove leading/trailing whitespace

//         if ('speechSynthesis' in window) {
//             const speech = new SpeechSynthesisUtterance(translatedSummaryText);
//             speech.lang = lang;
//             speech.volume = 1;
//             speech.rate = 1;
//             speech.pitch = 1;
//             window.speechSynthesis.speak(speech);
//         } else {
//             alert('Text-to-speech is not supported in this browser.');
//         }
//     }

//     btnTranslateHindi.addEventListener("click", translateSummaryHindi);
//     btnTranslateMarathi.addEventListener("click", translateSummaryMarathi);

//     function translateSummaryHindi() {
//         translateSummary('hi');
//     }

//     function translateSummaryMarathi() {
//         translateSummary('mr');
//     }

//     function translateSummary(destLang) {
//         const output = document.getElementById("output");
//         const translatedOutput = document.getElementById("translatedOutput");
//         const summary = output.textContent;

//         translatedOutput.innerHTML = "Translating...";

//         fetch(`http://127.0.0.1:5000/translate?summary=${encodeURIComponent(summary)}&lang=${destLang}`)
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error("Failed to translate summary.");
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 if (data.error) {
//                     throw new Error(data.error);
//                 }
//                 const translatedSummary = data.translated_summary;
//                 translatedOutput.innerHTML = `Translated Summary (${destLang}): ${translatedSummary}`;
//             })
//             .catch((error) => {
//                 console.error("Error translating summary:", error.message);
//                 translatedOutput.innerHTML = "Error: " + error.message;
//             });
//     }
// });


document.addEventListener("DOMContentLoaded", function () {
    const btnSummarise = document.getElementById("summarise");
    const btnTranslateHindi = document.getElementById("translate-hindi");
    const btnTranslateMarathi = document.getElementById("translate-marathi");
    const btnReadSummary = document.getElementById("read-summary");
    const btnReadSummaryHindi = document.getElementById("read-summary-hindi");
    const btnReadSummaryMarathi = document.getElementById("read-summary-marathi");

    btnSummarise.addEventListener("click", fetchAndDisplaySummary);
    btnReadSummary.addEventListener("click", function() {
        readSummary('en-US');
    });
    btnReadSummaryHindi.addEventListener("click", function() {
        readTranslatedSummary('hi-IN');
    });
    btnReadSummaryMarathi.addEventListener("click", function() {
        readTranslatedSummary('mr-IN');
    });

    function fetchAndDisplaySummary() {
        const btn = document.getElementById("summarise");
        const output = document.getElementById("output");
        const translatedOutput = document.getElementById("translatedOutput");

        btn.disabled = true;
        btn.innerHTML = "Fetching Summary...";
        output.innerHTML = ""; // Clear previous output
        translatedOutput.innerHTML = ""; // Clear translated output

        chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            const url = tabs[0].url;

            fetch(`http://127.0.0.1:5000/summary?url=${encodeURIComponent(url)}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch summary.");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    const summary = data.summary;
                    output.innerHTML = `Summary: ${summary}`;
                    btn.disabled = false;
                    btn.innerHTML = "Summarise";
                    btnReadSummary.disabled = false;
                    // Enable translate buttons
                    btnTranslateHindi.disabled = false;
                    btnTranslateMarathi.disabled = false;
                })
                .catch((error) => {
                    console.error("Error fetching summary:", error.message);
                    output.innerHTML = "Error: " + error.message;
                    btn.disabled = false;
                    btn.innerHTML = "Summarise";
                    btnReadSummary.disabled = true;
                    // Disable translate buttons on error
                    btnTranslateHindi.disabled = true;
                    btnTranslateMarathi.disabled = true;
                });
        });
    }

    function readSummary(lang) {
        console.log("Reading summary in language:", lang); // Log the language to debug

        const output = document.getElementById("output");
        const summaryText = output.textContent.trim(); // Remove leading/trailing whitespace

        // Mute the video's audio
        const video = document.querySelector('video');
        if (video) {
            video.muted = true;
        }

        if ('speechSynthesis' in window) {
            const speech = new SpeechSynthesisUtterance(summaryText);
            speech.lang = lang;
            speech.volume = 1;
            speech.rate = 1;
            speech.pitch = 1;
            speech.onend = function(event) {
                // Unmute the video's audio after the summary has been read
                if (video) {
                    video.muted = false;
                }
            };
            window.speechSynthesis.speak(speech);
        } else {
            alert('Text-to-speech is not supported in this browser.');
        }
    }

    function readTranslatedSummary(lang) {
        console.log("Reading translated summary in language:", lang); // Log the language to debug

        const translatedOutput = document.getElementById("translatedOutput");
        
        if (!translatedOutput.textContent.trim()) {
            // If translated output is empty, fetch the translation
            const output = document.getElementById("output");
            const summary = output.textContent.trim();

            if (!summary) {
                alert('No summary to translate.');
                return;
            }

            translatedOutput.innerHTML = "Translating...";

            fetch(`http://127.0.0.1:5000/translate?summary=${encodeURIComponent(summary)}&lang=${lang}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to translate summary.");
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.error) {
                        throw new Error(data.error);
                    }
                    const translatedSummary = data.translated_summary;
                    translatedOutput.innerHTML = translatedSummary;
                    readTranslatedSummary(lang); // Read the translated summary recursively
                })
                .catch((error) => {
                    console.error("Error translating summary:", error.message);
                    translatedOutput.innerHTML = "Error: " + error.message;
                });
        } else {
            // Read the already translated summary
            if ('speechSynthesis' in window) {
                const speechChunks = splitTextIntoChunks(translatedOutput.textContent.trim());
                speakChunks(speechChunks, lang);
            } else {
                alert('Text-to-speech is not supported in this browser.');
            }
        }
    }

    function splitTextIntoChunks(text) {
        const chunkSize = 200; // Adjust this value based on the speech synthesis system's limitations
        const chunks = [];
        for (let i = 0; i < text.length; i += chunkSize) {
            chunks.push(text.slice(i, i + chunkSize));
        }
        return chunks;
    }

    function speakChunks(chunks, lang) {
        if (!chunks || chunks.length === 0) {
            return;
        }

        const speech = new SpeechSynthesisUtterance();
        speech.lang = lang;
        speech.volume = 1;
        speech.rate = 1;
        speech.pitch = 1;
        speech.onend = function() {
            speakChunks(chunks.slice(1), lang);
        };
        speech.text = chunks[0];
        window.speechSynthesis.speak(speech);
    }

    btnTranslateHindi.addEventListener("click", translateSummaryHindi);
    btnTranslateMarathi.addEventListener("click", translateSummaryMarathi);

    function translateSummaryHindi() {
        translateSummary('hi');
    }

    function translateSummaryMarathi() {
        translateSummary('mr');
    }

    function translateSummary(destLang) {
        const output = document.getElementById("output");
        const translatedOutput = document.getElementById("translatedOutput");
        const summary = output.textContent;

        translatedOutput.innerHTML = "Translating...";

        fetch(`http://127.0.0.1:5000/translate?summary=${encodeURIComponent(summary)}&lang=${destLang}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to translate summary.");
                }
                return response.json();
            })
            .then((data) => {
                if (data.error) {
                    throw new Error(data.error);
                }
                const translatedSummary = data.translated_summary;
                translatedOutput.innerHTML = translatedSummary;
            })
            .catch((error) => {
                console.error("Error translating summary:", error.message);
                translatedOutput.innerHTML = "Error: " + error.message;
            });
    }
});
