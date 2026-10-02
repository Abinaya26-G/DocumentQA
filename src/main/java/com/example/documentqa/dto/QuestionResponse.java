package com.example.documentqa.dto;

public class QuestionResponse {

    private String documentId;
    private String question;
    private String answer;

    public QuestionResponse(String documentId, String question, String answer) {
        this.documentId = documentId;
        this.question = question;
        this.answer = answer;
    }

    public String getDocumentId() {
        return documentId;
    }

    public String getQuestion() {
        return question;
    }

    public String getAnswer() {
        return answer;
    }
}