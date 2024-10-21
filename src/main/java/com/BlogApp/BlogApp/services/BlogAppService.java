package com.BlogApp.BlogApp.services;

import com.BlogApp.BlogApp.models.BlogPage;
import com.BlogApp.BlogApp.repository.BlogPageRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class BlogAppService {

    @Autowired
    BlogPageRepo repo;

    public List<BlogPage> getBlogs() {

        return repo.findAll();
    }

    public BlogPage addBlog(BlogPage data,MultipartFile img)throws IOException{
        data.setImage(img.getBytes());
        data.setImageName(img.getOriginalFilename());
        data.setImageType(img.getContentType());
        data.setId(repo.max()+1);
        return repo.save(data);
    }

    public void deleteBlog(int id) {
        repo.deleteById(id);
    }

    public BlogPage getElement(int id) {
        return repo.findById(id).orElse(new BlogPage());
    }
}
