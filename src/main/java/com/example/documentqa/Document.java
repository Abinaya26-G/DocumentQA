package com.example.documentqa;

public class Document {

    private String id;
    private String text;

    public Document(String id, String text) {
        this.id = id;
        this.text = text;
    }

    public String getId() {
        return id;
    }

    public String getText() {
        return text;
    }
}