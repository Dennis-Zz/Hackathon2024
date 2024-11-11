// Automatically transition from #first-page to #second-page after 3 seconds
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

// transition from #app to #question after clicking on the start button
document.getElementById("fetchQuestionsBtn").addEventListener("click", () => {
    fetchQuestions();
    document.getElementById("app").classList.add("hidden");
    document.getElementById("question").classList.remove("hidden"); // Show the question div
    document.addEventListener("click", () => {
        document.getElementById("question").classList.add("hidden");
        document.getElementById("last2").classList.remove("hidden"); // Show the question div

        document.addEventListener("click", () => {
      
        document.getElementById("last2").classList.add("hidden");
        document.getElementById('last').classList.remove('hidden');

        document.getElementById("RestartBtn").addEventListener("click", () => {
            document.getElementById("last").classList.add("hidden");
            document.getElementById("app").classList.remove("hidden"); // Show the question div
        });
        
      });
    });
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

function displayQuestions(questions) {
    console.log("displayQuestions function started"); // Log to indicate function is running
    const container = document.getElementById("questionsContainer");
    container.innerHTML = ""; // Clear previous content

    questions.forEach((question, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question");

        const questionText = document.createElement("h3");
        questionText.innerText = `Q${index + 1}: ${question.questionText}`;
        questionDiv.appendChild(questionText);

        if (question.imagePath) {
            const questionImage = document.createElement("img");
            questionImage.src = question.imagePath;
            questionImage.alt = "Question Image";
            questionImage.classList.add("question-image");
            questionDiv.appendChild(questionImage);
        }

        const optionsList = document.createElement("ul");
        optionsList.classList.add("options");

        question.options.forEach((option, i) => {
            const optionItem = document.createElement("li");
            optionItem.innerText = `${String.fromCharCode(65 + i)}. ${option}`;
            optionsList.appendChild(optionItem);
        });

        questionDiv.appendChild(optionsList);

        const explanation = document.createElement("p");
        explanation.classList.add("explanation");
        explanation.innerText = `Explanation: ${question.explain}`;
        questionDiv.appendChild(explanation);

        // Chat Box
        const chatBox = createChatBox();
        questionDiv.appendChild(chatBox);

        container.appendChild(questionDiv);
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