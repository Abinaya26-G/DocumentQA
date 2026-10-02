package com.example.documentqa.controller;

import com.example.documentqa.Document;
import com.example.documentqa.dto.UploadResponse;
import com.example.documentqa.DocumentStore;
import com.example.documentqa.dto.QuestionRequest;
import com.example.documentqa.dto.QuestionResponse;
import com.example.documentqa.service.OpenAIService;
import com.example.documentqa.service.PdfService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@CrossOrigin(origins = {"http://localhost:5173","https://documentqa-j8ny.onrender.com"})
@RestController
@RequestMapping("/api/documents")
public class DocumentController {

    private final PdfService pdfService;
    private final OpenAIService openAIService;
    private final DocumentStore documentStore;

    // Constructor
    public DocumentController(
            PdfService pdfService,
            OpenAIService openAIService,
            DocumentStore documentStore) {

        this.pdfService = pdfService;
        this.openAIService = openAIService;
        this.documentStore = documentStore;
    }

    @PostMapping("/upload")
    public ResponseEntity<UploadResponse> uploadPdf(
            @RequestParam("file") MultipartFile file) throws IOException {

        String documentText = pdfService.extractText(file);

        String documentId = java.util.UUID.randomUUID().toString();

        Document document = new Document(
                documentId,
                documentText
        );

        documentStore.save(document);

        UploadResponse response = new UploadResponse(
                documentId,
                "PDF uploaded successfully"
        );

        return ResponseEntity.ok(response);
    }

    @PostMapping("/ask")
    public ResponseEntity<QuestionResponse> askQuestion(
            @Valid @RequestBody QuestionRequest request) {

        Document document =
                documentStore.get(request.getDocumentId());

        if (document == null) {
            return ResponseEntity.notFound().build();
        }

        String answer = openAIService.askQuestion(
                request.getQuestion(),
                document.getText()
        );

        QuestionResponse response = new QuestionResponse(
                request.getDocumentId(),
                request.getQuestion(),
                answer
        );

        return ResponseEntity.ok(response);
    }
}