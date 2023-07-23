package com.api.stockhub.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.api.stockhub.models.EquipamentoModel;

@Repository
public interface EquipamentoRepository extends JpaRepository<EquipamentoModel, Long>{

}
