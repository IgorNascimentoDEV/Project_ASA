package com.api.stockhub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.stockhub.models.MovimentacaoModel;


@Repository
public interface MovimentacaoRepository extends JpaRepository<MovimentacaoModel, Long>{

}
