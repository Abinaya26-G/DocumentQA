package com.example.documentqa.dto;

public class UploadResponse {

    private String documentId;
    private String message;

    public UploadResponse(String documentId, String message) {
        this.documentId = documentId;
        this.message = message;
    }

    public String getDocumentId() {
        return documentId;
    }

    public String getMessage() {
        return message;
    }
}