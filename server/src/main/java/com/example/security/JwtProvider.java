package com.example.security;

import com.example.exception.APIException;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;

@Component
public class JwtProvider {

    private final SecretKey secretKey;
    private final long jwtExpiration;

    public JwtProvider(
            @Value("${security.jwt.secret}") String jwtAccessSecret,
            @Value("${security.jwt.expiration}") long jwtExpiration
    ) {
        this.secretKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtAccessSecret));
        this.jwtExpiration = jwtExpiration;
    }

    public String generateAccessToken( Authentication authentication) {

        Date currentDate = new Date();

        Date expireDate = new Date(currentDate.getTime() + jwtExpiration);
        return Jwts.builder()
                .setSubject(authentication.getName())
                .setIssuedAt(new Date())
                .setExpiration(expireDate)
                .signWith(secretKey)
                .compact();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(secretKey).build().parse(token);
            return true;
        } catch (MalformedJwtException ex) {
            throw new APIException("Invalid JWT token", HttpStatus.UNAUTHORIZED);
        } catch (ExpiredJwtException ex) {
            throw new APIException("Expired JWT token", HttpStatus.UNAUTHORIZED);
        } catch (UnsupportedJwtException ex) {
            throw new APIException("Unsupported JWT token", HttpStatus.UNAUTHORIZED);
        } catch (IllegalArgumentException ex) {
            throw new APIException("JWT claims string is empty.", HttpStatus.UNAUTHORIZED);
        }
    }

    public String getUsername(String token) {
        Claims claims =
                Jwts.parserBuilder().setSigningKey(secretKey).build().parseClaimsJws(token).getBody();
        return claims.getSubject();
    }
}
