package com.BlogApp.BlogApp.controller;

import com.BlogApp.BlogApp.models.BlogPage;
import com.BlogApp.BlogApp.services.BlogAppService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/")
public class ProjectController {
    @Autowired
    BlogAppService appService;

    @RequestMapping("/home")
    public String Home(){
        return "Hello from Home";
    }

    @GetMapping("/blogs")
    public List<BlogPage> getBlogs(){
        return appService.getBlogs();
    }

    @PostMapping("/add")
    public ResponseEntity<?> addBlog(@RequestParam int id,@RequestParam String username,
                                     @RequestParam String text,
                                     @RequestParam(required = false)MultipartFile img){
        try {
            BlogPage blogPage = new BlogPage();
            blogPage.setId(id);
            blogPage.setUsername(username);
            blogPage.setText(text);
            blogPage =  appService.addBlog(blogPage,img);
//            BlogPage blogPage = appService.addBlog(data,img);
           return new ResponseEntity<>(blogPage,HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @DeleteMapping("/blogs/{id}")
    public ResponseEntity<BlogPage> deleteBlog(@PathVariable int id){
        BlogPage blogPage = appService.getElement(id);
        if(blogPage != null) {
            appService.deleteBlog(id);
            return new ResponseEntity<>(blogPage,HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>(new BlogPage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/blogs/{id}")
    public BlogPage getOneElement(@PathVariable int id){
        return appService.getElement(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateBlog(@PathVariable int id,@RequestParam String username,
                                     @RequestParam String text,
                                     @RequestParam(required = false)MultipartFile img){

        BlogPage blogPage = new BlogPage();

        try {
            blogPage.setId(id);
            blogPage.setUsername(username);
            blogPage.setText(text);
            blogPage =  appService.addBlog(blogPage,img);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        if(blogPage != null){
            return new ResponseEntity<>("Updated",HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Failed to update",HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
