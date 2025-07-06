package com.BlogApp.BlogApp.repository;

import com.BlogApp.BlogApp.models.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepo extends JpaRepository<Roles,Long> {
    // Because the variable use in Roles.java is 'name'
    // that's why it is String name here rather than role
    Roles findByName(String name);
}
