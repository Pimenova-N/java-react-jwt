package com.example.controller;

import com.example.dto.BookDto;
import com.example.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/v1/authors")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PostMapping("/{authorId}/books")
    public ResponseEntity<BookDto> createBook(
            @PathVariable("authorId") long authorId, @Valid @RequestBody BookDto bookDto) {
        return new ResponseEntity<>(bookService.createBook(authorId, bookDto), HttpStatus.CREATED);
    }

    @GetMapping("/{authorId}/books")
    public ResponseEntity<List<BookDto>> getAllBooksByAuthorId(
            @PathVariable("authorId") long authorId) {
        return new ResponseEntity<>(bookService.getBookByAuthorId(authorId), HttpStatus.OK);
    }

    @GetMapping("/{authorId}/books/{id}")
    public ResponseEntity<BookDto> getBookById(
            @PathVariable(value = "authorId") long authorId,
            @PathVariable(value = "id") long bookId) {
        return new ResponseEntity<>(bookService.getBookById(authorId, bookId), HttpStatus.OK);
    }

    @PutMapping("/{authorId}/books/{id}")
    public ResponseEntity<BookDto> updateBook(
            @PathVariable(value = "authorId") long authorId,
            @PathVariable(value = "id") long bookId,
            @Valid @RequestBody BookDto bookDto) {
        BookDto updatedBook = bookService.updateBook(authorId, bookId, bookDto);
        return new ResponseEntity<>(updatedBook, HttpStatus.CREATED);
    }

    @DeleteMapping("/{authorId}/books/{id}")
    public ResponseEntity<String> deleteBook(
            @PathVariable("authorId") long authorId,
            @PathVariable("id") long bookId) {
        bookService.deleteBook(authorId, bookId);
        return new ResponseEntity<>("Book deleted successfully", HttpStatus.OK);
    }
}
