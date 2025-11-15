package com.example.post;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {

    @PostMapping("/posts")
    public String createPost(
            @RequestParam String title,
            @RequestParam String body) {

        return "Post submitted successfully!<br>" +
                "Title: " + title + "<br>" +
                "Body: " + body;
    }
}