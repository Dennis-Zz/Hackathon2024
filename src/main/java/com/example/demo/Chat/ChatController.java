package com.example.demo.Chat;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")

@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ChatController {

    @Value("${openai.api.key}")
    private String openAiApiKey;

    private final RestTemplate restTemplate = new RestTemplate();

    @PostMapping("/chat")
    public Map<String, String> chat(@RequestBody Map<String, String> request) {
        String userMessage = request.get("message");

        // OpenAI API URL
        String url = "https://api.openai.com/v1/chat/completions";

        // Headers
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + openAiApiKey);
        headers.set("Content-Type", "application/json");

        // Request Body
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "gpt-4o");
        requestBody.put("messages", new Object[] {
                new HashMap<String, String>() {{
                    put("role", "user");
                    put("content", userMessage);
                }}
        });

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

        try {
            ResponseEntity<Map> response = restTemplate.exchange(url, HttpMethod.POST, entity, Map.class);

            // Get the "choices" field from the response body as a List
            List<Map<String, Object>> choices = (List<Map<String, Object>>) response.getBody().get("choices");

            // Extract the assistant's message from the first choice
            Map<String, Object> firstChoice = choices.get(0);
            Map<String, String> message = (Map<String, String>) firstChoice.get("message");
            String assistantMessage = message.get("content");

            // Return the result
            Map<String, String> result = new HashMap<>();
            result.put("message", assistantMessage);
            return result;

        } catch (HttpClientErrorException e) {
            if (e.getStatusCode() == HttpStatus.TOO_MANY_REQUESTS) {
                Map<String, String> result = new HashMap<>();
                result.put("message", "You have exceeded your quota. Please check your OpenAI billing or try again later.");
                return result;
            }
            throw e;
        }
    }

}