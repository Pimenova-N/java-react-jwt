package com.example.service;

import com.example.dto.BookDto;

import java.util.List;

public interface BookService {

    List<BookDto> getBookByAuthorId(long id);

    BookDto getBookById(long authorId, long bookId);

    BookDto createBook(long id, BookDto bookDto);

    BookDto updateBook(long authorId, long bookId, BookDto bookDto);

    void deleteBook(long authorId, long bookId);
}
