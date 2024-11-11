// Automatically transition from #first-page to #app after 3 seconds
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.getElementById("first-page").classList.add("hidden"); // Hide the first page
        document.getElementById("app").classList.remove("hidden"); // Show the app
    }, 1000); // 3-second delay
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

function displayQuestion(questions, index) {
    const question = questions[index];

    // Set the question text
    const questionText = document.getElementById("questionText");
    questionText.innerText = `Q${index + 1}: ${question.questionText}`;

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
        // Disable the submit button after the first click
        newSubmitButton.disabled = true;

        // Display explanation if not already present
        console.log("console.log(question.explain)")
        console.log(question.explain)
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
            newSubmitButton.disabled = false; // Re-enable submit button for the next question
            const questionsContainer = document.getElementById("questionContainer");
            questionsContainer.querySelectorAll(".explanation, .chat-box").forEach(element => element.remove());

            nextButton.remove();


            if (currentQuestionIndex < questions.length) {
                displayQuestion(questions, currentQuestionIndex);
            } else {
                alert("No more questions available.");
                currentQuestionIndex = 0; // Reset to first question
                displayQuestion(questions, currentQuestionIndex);
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
    const userMessage = chatInput.value.trim();
    if (userMessage === "") return;

    addChatMessage("User", userMessage, chatMessages);
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