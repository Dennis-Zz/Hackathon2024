// Automatically transition from #first-page to #app after 3 seconds
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("first-page").classList.add("hidden"); // Hide the first page
        document.getElementById("second-page").classList.remove("hidden"); // Show the second-page
    }, 2500); // 3-second delay
});

//Automatically transition from #second-page to #app after 3 seconds
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("second-page").classList.add("hidden"); // Hide the second-page
        document.getElementById("app").classList.remove("hidden"); // Show the app
    }, 5000); // 3-second delay after the second page appears
});
document.getElementById("fetchQuestionsBtn").addEventListener("click", () => {
    fetchQuestions();
    document.getElementById("first-page").classList.add("hidden");
    document.getElementById("app").classList.add("hidden");
    document.getElementById("question").classList.remove("hidden"); // Show the question div
});

async function fetchQuestions() {
    try {
        const response = await fetch("http://localhost:8080/api/questionbank/random5");
        if (!response.ok) throw new Error("Network response was not ok");

        const questions = await response.json();
        displayQuestions(questions);
    } catch (error) {
        console.error("Error fetching questions:", error);
        alert("Failed to fetch questions. Check console for details.");
    }
}

let currentQuestionIndex = 0; // Track the current question index

function displayQuestions(questions) {
    console.log("displayQuestions function started"); // Log to indicate function is running
    // const container = document.getElementById("questionsContainer");
   //  container.innerHTML = ""; // Clear previous content

    // Initial call to display the first question
    displayQuestion(questions, currentQuestionIndex);

    // Add the "Next Question" button if it doesn't exist already

}


let selectedOption = null; // Track the selected answer button
function displayQuestion(questions, index) {
    const question = questions[index];

    // Set the question text
    const questionText = document.getElementById("questionText");
    questionText.innerText = `Q${index + 1}: ${question.questionText}`;

    if (question.imagePath) {
        const questionImage = document.createElement("img");
        questionImage.src = question.imagePath;
        questionImage.alt = "Question Image";
        questionImage.classList.add("question-image");
        const codepic = document.getElementById("codepic");
        codepic.appendChild(questionImage);
    }

    // Set the answer options
    document.getElementById("optionA").innerText = `A. ${question.options[0]}`;
    document.getElementById("optionB").innerText = `B. ${question.options[1]}`;
    document.getElementById("optionC").innerText = `C. ${question.options[2]}`;
    document.getElementById("optionD").innerText = `D. ${question.options[3]}`;

    // Find and reset the submit button to remove previous listeners
    const submitButton = document.getElementById("submit");
    const newSubmitButton = submitButton.cloneNode(true); // Clone to remove previous listeners
    submitButton.parentNode.replaceChild(newSubmitButton, submitButton);

    // Attach the event listener to the new submit button
    newSubmitButton.addEventListener("click", () => {
        if (!selectedOption) {
            alert("Please select an answer before submitting!");
            return;
        }


        const codepic = document.getElementById("codepic");

        if (codepic && codepic.innerHTML.trim() !== "") {
            codepic.innerHTML = ""; // Clear the content if not empty
        }

        // Disable the submit button after the first click
        newSubmitButton.disabled = true;

        // Check if the selected answer is correct
        const correctAnswer = question.options[question.correctOptionIndex];
        if (selectedOption.innerText.includes(correctAnswer)) {
            selectedOption.classList.add("correct"); // Green for correct
        } else {
            selectedOption.classList.add("incorrect"); // Red for incorrect
        }

        if (!document.querySelector(".explanation")) {
            const explanation = document.createElement("p");
            explanation.classList.add("explanation");
            explanation.innerText = `Explanation: ${question.explain}`;

            console.log(explanation)
            document.getElementById("questionContainer").appendChild(explanation);
        }

        // Add Chat Box if not already present
        if (!document.querySelector(".chat-box")) {
            const chatBox = createChatBox();
            document.getElementById("questionContainer").appendChild(chatBox);
        }

        // Add "Next Question" button if it doesn't exist
        const nextContainer = document.getElementById("next");
        nextContainer.innerHTML = ""; // Clear any previous "Next Question" button
        const nextButton = document.createElement("button");
        nextButton.id = "nextQuestionBtn";
        nextButton.innerText = "Next Question";
        nextButton.classList.add("next-button");
        nextContainer.appendChild(nextButton);

        // Event listener for "Next Question" button
        nextButton.addEventListener("click", () => {
            currentQuestionIndex++;
            if (selectedOption) {
                selectedOption.classList.remove("selected"); // Optional: remove styling if necessary
                selectedOption = null;
            }
            newSubmitButton.disabled = false; // Re-enable submit button for the next question
            const questionsContainer = document.getElementById("questionContainer");
            questionsContainer.querySelectorAll(".explanation, .chat-box").forEach(element => element.remove());

            document.querySelectorAll('.answer-button').forEach(button => {
                button.classList.remove("correct", "incorrect", "selected"); // Remove all styles
            });
            nextButton.remove();


            if (currentQuestionIndex < questions.length) {
                displayQuestion(questions, currentQuestionIndex);
            } else {
                document.getElementById("app").classList.add("hidden");
                document.getElementById("question").classList.remove("hidden"); // Show the question div

                // Add a one-time event listener for the first transition
                document.getElementById("question").addEventListener("click", () => {
                    console.log("Transitioning from question to last2");
                    document.getElementById("question").classList.add("hidden");
                    document.getElementById("last2").classList.remove("hidden"); // Show the last2 div
                }, { once: true }); // This ensures the event listener is only called once

                // Add a one-time event listener for the second transition
                document.getElementById("last2").addEventListener("click", () => {
                    console.log("Transitioning from last2 to last");
                    document.getElementById("last2").classList.add("hidden");
                    document.getElementById("last").classList.remove("hidden"); // Show the last div
                }, { once: true }); // This ensures the event listener is only called once

                // Restart button to reset the view back to the start
                document.getElementById("RestartBtn").addEventListener("click", () => {
                    // Reset views
                    document.getElementById("last").classList.add("hidden");
                    document.getElementById("app").classList.remove("hidden"); // Show the initial app div
                    currentQuestionIndex = 0;
                    selectedOption = null;

                    // Reset any selected answer button styles
                    document.querySelectorAll('.answer-button').forEach(button => {
                        button.classList.remove("correct", "incorrect", "selected");
                    });
                });

                document.getElementById('QuitBtn').addEventListener('click', () => {
                    window.close();
                });

            }
        });
    });
}

function createChatBox() {
    const chatBox = document.createElement("div");
    chatBox.classList.add("chat-box");

    const chatMessages = document.createElement("div");
    chatMessages.classList.add("chat-messages");
    chatBox.appendChild(chatMessages);

    const chatInputContainer = document.createElement("div");
    chatInputContainer.classList.add("chat-input-container");

    const chatInput = document.createElement("input");
    chatInput.type = "text";
    chatInput.placeholder = "Ask ChatGPT...";
    chatInput.classList.add("chat-input");

    const sendChatBtn = document.createElement("button");
    sendChatBtn.innerText = "Send";
    sendChatBtn.classList.add("send-chat-btn");

    sendChatBtn.addEventListener("click", () => sendMessage(chatInput, chatMessages));

    chatInputContainer.appendChild(chatInput);
    chatInputContainer.appendChild(sendChatBtn);

    chatBox.appendChild(chatInputContainer);
    return chatBox;
}

async function sendMessage(chatInput, chatMessages) {
    const userMessage = chatInput.value.trim() + ", please answer in 20 words";
    if (userMessage === "") return;

    addChatMessage("User", chatInput.value.trim(), chatMessages);
    chatInput.value = "";

    try {
        const response = await fetch("http://localhost:8080/api/chat", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();
        addChatMessage("ChatGPT", data.message, chatMessages);
    } catch (error) {
        console.error("Error communicating with ChatGPT:", error);
        addChatMessage("Error", "Failed to fetch a response from ChatGPT.", chatMessages);
    }
}

function addChatMessage(sender, message, chatMessages) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("chat-message");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.querySelectorAll('.answer-button').forEach(button => {
    button.classList.remove("selected"); // Clear previous selection

    button.addEventListener('click', () => {
        // Deselect any previously selected button
        if (selectedOption) {
            selectedOption.classList.remove("selected");
        }
        // Mark the clicked button as selected
        button.classList.add("selected");
        selectedOption = button;
    });
});
