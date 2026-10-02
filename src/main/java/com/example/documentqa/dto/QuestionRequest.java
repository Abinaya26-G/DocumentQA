package com.example.documentqa.dto;

import jakarta.validation.constraints.NotBlank;

public class QuestionRequest {

    @NotBlank
    private String documentId;

    @NotBlank
    private String question;

    public String getDocumentId() {
        return documentId;
    }

    public void setDocumentId(String documentId) {
        this.documentId = documentId;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
}