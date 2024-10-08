package com.BlogApp.BlogApp.repository;

import com.BlogApp.BlogApp.models.BlogPage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogPageRepo extends MongoRepository<BlogPage,Integer> {
}
