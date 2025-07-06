package com.BlogApp.BlogApp.repository;

import com.BlogApp.BlogApp.models.BlogPage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface BlogPageRepo extends JpaRepository<BlogPage,Integer> {

}
