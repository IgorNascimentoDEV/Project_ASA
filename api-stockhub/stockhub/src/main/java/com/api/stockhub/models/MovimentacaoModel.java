package com.api.stockhub.models;

import java.io.Serializable;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "TB_MOVIMENTACAO")
public class MovimentacaoModel implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idMovimentacao;

	private String dataMovimentacao;

	@ManyToOne
	@JoinColumn(name = "matricula")
	private ColaboradorModel colaborador;

	@ManyToOne
	@JoinColumn(name = "idEquipamento")
	private EquipamentoModel equipamento;

	private Long codigoColaborador;

	private Long codigoEquipamento;

	private String tipoEquipamento;

	private String tipo;

	private String nome;

	// Getters e setters

	public Long getIdMovimentacao() {
		return idMovimentacao;
	}

	public void setIdMovimentacao(Long idMovimentacao) {
		this.idMovimentacao = idMovimentacao;
	}

	public String getDataMovimentacao() {
		return dataMovimentacao;
	}

	public void setDataMovimentacao(String dataMovimentacao) {
		this.dataMovimentacao = dataMovimentacao;
	}

	public ColaboradorModel getColaborador() {
		return colaborador;
	}

	public void setColaborador(ColaboradorModel colaborador) {
		this.colaborador = colaborador;
	}

	public EquipamentoModel getEquipamento() {
		return equipamento;
	}

	public void setEquipamento(EquipamentoModel equipamento) {
		this.equipamento = equipamento;
	}

	public String getTipoEquipamento() {
		return tipoEquipamento;
	}

	public void setTipoEquipamento(String tipoEquipamento) {
		this.tipoEquipamento = tipoEquipamento;
	}

	public String getTipo() {
		return tipo;
	}

	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	public String getNome() {
		return nome;
	}

	public void setNome(String nome) {
		this.nome = nome;
	}
	
	public Long getCodigoColaborador() {
		return codigoColaborador;
	}

	public void setCodigoColaborador(Long codigoColaborador) {
		this.codigoColaborador = codigoColaborador;
	}

	public Long getCodigoEquipamento() {
		return codigoEquipamento;
	}

	public void setCodigoEquipamento(Long codigoEquipamento) {
		this.codigoEquipamento = codigoEquipamento;
	}
}