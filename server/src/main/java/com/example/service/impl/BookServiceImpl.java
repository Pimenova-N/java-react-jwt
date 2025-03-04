package com.example.service.impl;

import com.example.dto.BookDto;
import com.example.exception.APIException;
import com.example.model.Author;
import com.example.model.Book;
import com.example.repository.AuthorRepository;
import com.example.repository.BookRepository;
import com.example.service.BookService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class BookServiceImpl implements BookService {

    @Autowired
    private ModelMapper mapper;

    @Autowired
    private AuthorRepository authorRepository;

    @Autowired
    private BookRepository bookRepository;

    @Override
    public List<BookDto> getBookByAuthorId(long id) {
        List<Book> bookList = bookRepository.findByAuthorId(id);
        return bookList.stream().map(this::toDto).toList();
    }

    @Override
    public BookDto getBookById(long authorId, long bookId) {
        Author author = findAuthorById(authorId);
        Book book =
                bookRepository.findById(bookId)
                        .orElseThrow(() -> new APIException(String.format(
                                "Book not found with id : '%s'", bookId)
                                , HttpStatus.NOT_FOUND));

        if (!book.getAuthor().getId().equals(author.getId())) {
            throw new APIException(String.format(
                    "Book not found with id : '%s'", bookId)
                    , HttpStatus.NOT_FOUND);
        }

        return toDto(book);
    }

    @Override
    public BookDto createBook(long id, BookDto bookDto) {
        Book book = toEntity(bookDto);
        Author author = findAuthorById(id);
        book.setAuthor(author);
        Book newBook = bookRepository.save(book);
        return toDto(newBook);
    }

    @Override
    public BookDto updateBook(long authorId, long bookId, BookDto bookDto) {
        Author author = findAuthorById(authorId);
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new APIException(String.format(
                        "Book not found with id : '%s'", bookId)
                        , HttpStatus.NOT_FOUND));
        if (!book.getAuthor().getId().equals(author.getId())) {
            throw new APIException(String.format("Book not found with id : '%s'", bookId)
                    , HttpStatus.NOT_FOUND);
        }

        book.setTitle(bookDto.getTitle());
        book.setDescription(bookDto.getDescription());

        Book updatedBook = bookRepository.save(book);
        return toDto(updatedBook);
    }

    @Override
    public void deleteBook(long authorId, long bookId) {
        Author author = findAuthorById(authorId);
        Book book =
                bookRepository
                        .findById(bookId)
                        .orElseThrow(() -> new APIException(String.format(
                                "Book not found with id : '%s'", bookId)
                                , HttpStatus.NOT_FOUND));
        if (!book.getAuthor().getId().equals(author.getId())) {
            throw new APIException(String.format("Book not found with id : '%s'", bookId)
                    , HttpStatus.NOT_FOUND);
        }
        bookRepository.deleteById(bookId);
    }

    public Book toEntity(BookDto dto) {
        return Objects.isNull(dto) ? null : mapper.map(dto, Book.class);
    }

    public BookDto toDto(Book entity) {
        return Objects.isNull(entity) ? null : mapper.map(entity, BookDto.class);
    }

    private Author findAuthorById(long authorId) {
        return authorRepository
                .findById(authorId)
                .orElseThrow(() -> new APIException(String.format(
                        "Author not found with id : '%s'", authorId)
                        , HttpStatus.NOT_FOUND));
    }
}

