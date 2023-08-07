package com.api.stockhub.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.api.stockhub.dtos.MovimentacaoRecordDto;
import com.api.stockhub.models.ColaboradorModel;
import com.api.stockhub.models.EquipamentoModel;
import com.api.stockhub.models.MovimentacaoModel;
import com.api.stockhub.repositories.ColaboradorRepository;
import com.api.stockhub.repositories.EquipamentoRepository;
import com.api.stockhub.repositories.MovimentacaoRepository;

import jakarta.validation.Valid;

@RestController
public class MovimentacaoController {

    @Autowired
    private MovimentacaoRepository movimentacaoRepository;

    @Autowired
    private ColaboradorRepository colaboradorRepository;

    @Autowired
    private EquipamentoRepository equipamentoRepository;

    @PostMapping("/movimentacoes")
    public ResponseEntity<Object> saveMovimentacao(@RequestBody @Valid MovimentacaoRecordDto movimentacaoRecordDto) {
        var movimentacaoModel = new MovimentacaoModel();
        BeanUtils.copyProperties(movimentacaoRecordDto, movimentacaoModel);

        // Buscar o colaborador pelo ID fornecido na requisição
        Optional<ColaboradorModel> colaboradorOptional = colaboradorRepository.findById(movimentacaoModel.getCodigoColaborador());
        if (colaboradorOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Colaborador não encontrado");
        }
        ColaboradorModel colaborador = colaboradorOptional.get();

        // Buscar o equipamento pelo ID fornecido na requisição
        Optional<EquipamentoModel> equipamentoOptional = equipamentoRepository.findById(movimentacaoModel.getCodigoEquipamento());
        if (equipamentoOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Equipamento não encontrado");
        }
        EquipamentoModel equipamento = equipamentoOptional.get();

        // Preencher os campos nome e tipoEquipamento na movimentação
        movimentacaoModel.setNome(colaborador.getNome());
        movimentacaoModel.setTipoEquipamento(equipamento.getTipo());
        
        movimentacaoModel.setColaborador(colaborador);
        movimentacaoModel.setEquipamento(equipamento);

        // Verificar o tipo de movimentação
        String tipoMovimentacao = movimentacaoRecordDto.tipo();
        boolean concluidaComSucesso = true; // Supondo que a movimentação foi concluída com sucesso

        if (tipoMovimentacao.equals("SAIDA") && concluidaComSucesso) {
            // Caso seja SAIDA e concluída com sucesso, definir emprestimo como true
            equipamento.setEmprestimo(true);
        } else if (tipoMovimentacao.equals("ENTRADA") && concluidaComSucesso) {
            // Caso seja ENTRADA e concluída com sucesso, definir emprestimo como false
            equipamento.setEmprestimo(false);
        }

        // Salvar a movimentação no banco de dados
        MovimentacaoModel savedMovimentacao = movimentacaoRepository.save(movimentacaoModel);

        // Restante do código...

        return ResponseEntity.status(HttpStatus.CREATED).body(savedMovimentacao);
    }

    @GetMapping("/movimentacoes")
    public ResponseEntity<List<MovimentacaoModel>> getAllMovimentacoes() {
        return ResponseEntity.status(HttpStatus.OK).body(movimentacaoRepository.findAll());
    }

    @GetMapping("/movimentacoes/{id}")
    public ResponseEntity<Object> movimentatacaoById(@PathVariable(value = "id") Long id){
        Optional<MovimentacaoModel> movimentacao0 = movimentacaoRepository.findById(id);

        if(movimentacao0.isEmpty()){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("movimentação não encontardo");
        }
        return ResponseEntity.status(HttpStatus.OK).body(movimentacao0.get());
    }
}