package com.example.controller;

import com.example.dto.AuthorDto;
import com.example.dto.AuthorsDto;
import com.example.service.AuthorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/authors")
public class AuthorController {
    private final AuthorService authorService;

    public AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @GetMapping
    public ResponseEntity<AuthorsDto> getAllAuthors(
            @RequestParam( value = "page", defaultValue = "0", required = false) int page,
            @RequestParam( value = "size", defaultValue = "10", required = false) int size,
            @RequestParam( value = "sort", defaultValue = "firstName", required = false) String sortBy,
            @RequestParam( value = "direction", defaultValue = "ASC", required = false) String sortDirection) {
        return new ResponseEntity<>( authorService.getAllAuthors(page, size, sortBy, sortDirection)
                , HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuthorDto> getAuthor(@PathVariable Long id) {
        return new ResponseEntity<>(authorService.getAuthorById(id), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<AuthorDto> createAuthor(@Valid @RequestBody AuthorDto authorDto) {
        return new ResponseEntity<>(authorService.createAuthor(authorDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuthorDto> updateAuthor(@PathVariable("id") Long id
            , @Valid @RequestBody AuthorDto authorDto) {
        return new ResponseEntity<>(authorService.updateAuthor(id, authorDto), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAuthor(@PathVariable("id") Long id) {
        authorService.deleteAuthor(id);
        return new ResponseEntity<>("Author deleted successfully", HttpStatus.OK);
    }
}