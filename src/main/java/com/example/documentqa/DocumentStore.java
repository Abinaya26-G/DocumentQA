package com.example.documentqa;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component 
public class DocumentStore {

    private final Map<String, Document> documents = new HashMap<>();

    public void save(Document document) {
        documents.put(document.getId(), document);
    }

    public Document get(String id) {
        return documents.get(id);
    }

    
}