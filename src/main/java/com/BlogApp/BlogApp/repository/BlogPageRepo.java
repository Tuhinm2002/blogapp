package com.BlogApp.BlogApp.repository;

import com.BlogApp.BlogApp.models.BlogPage;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogPageRepo extends MongoRepository<BlogPage,Integer> {

    @Aggregation(pipeline = {"{$group:{_id:'',total : {$max : $_id}}}"})
    public Integer max();
}
