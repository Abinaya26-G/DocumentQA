package com.example.documentqa.service;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.stereotype.Service;

@Service
public class OpenAIService {

    private final ChatClient chatClient;

    public OpenAIService(ChatClient.Builder builder) {
        this.chatClient = builder.build();
    }

    public String askQuestion(String question, String documentText) {

        String prompt = """
                Answer the user's question using only the information
                provided in the document.

                Document:
                %s

                User Question:
                %s

                If the answer is not present in the document,
                say: "The answer is not available in the document."
                """.formatted(documentText, question);

        return chatClient.prompt()
                .user(prompt)
                .call()
                .content();
    }
}