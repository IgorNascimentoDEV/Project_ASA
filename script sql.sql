SELECT * FROM tb_equipamento

SELECT * FROM tb_movimentacao;

/*retorna o valor total de maquinas*/
SELECT COUNT(*) AS total_telefones
FROM tb_equipamento
WHERE tipo = 'Maquina';

/*retorna o valor total de telefones*/
SELECT COUNT(*) AS total_telefones
FROM tb_equipamento
WHERE tipo = 'Telefone';

	
/*retorna todas as maquinas*/
SELECT d.identificador, d.modelo, d.nome_maquina, d.office, f.nome AS nome_colaborador, f.setor, o.tipo_movimentacao, o.data_movimentacao
FROM 
	tb_equipamento d
LEFT JOIN 
	tb_movimentacao o ON d.id = o.id_equipamento
LEFT JOIN 
	tb_colaborador f ON o.id_colaborador = f.id
WHERE
	d.tipo = 'Maquina';
	






/*retorna todos os telefones estando eles emprestados ou não*/
SELECT 
    e.modelo, 
    e.identificador, 
    e.linha, 
    f.nome AS nome_colaborador, 
    f.setor, 
    o.tipo_movimentacao, 
    o.data_movimentacao
FROM 
    tb_equipamento e
LEFT JOIN 
    tb_movimentacao o ON e.id = o.id_equipamento
LEFT JOIN 
    tb_colaborador f ON o.id_colaborador = f.id
WHERE 
    e.tipo = 'Telefone'
    AND (o.tipo_movimentacao = 'SAIDA' OR o.tipo_movimentacao IS NULL)
    AND (o.data_movimentacao = (
            SELECT MAX(data_movimentacao)
            FROM tb_movimentacao
            WHERE id_equipamento = e.id
            AND tipo_movimentacao = 'SAIDA'
        )
        OR o.tipo_movimentacao IS NULL
    )
ORDER BY 
    e.identificador;
	
	
/*retorna todos as maquinas estando elas emprestadas ou não*/
SELECT 
	 e.identificador, 
	 e.modelo, 
	 e.nome_maquina, 
	 e.office, 
	 f.nome AS nome_colaborador, 
	 f.setor, 
	 o.tipo_movimentacao, 
	 o.data_movimentacao
FROM 
	tb_equipamento e
LEFT JOIN
	tb_movimentacao o ON e.id = o.id_equipamento
LEFT JOIN
	tb_colaborador f ON o.id_colaborador = f.id
WHERE
	e.tipo = 'Maquina'
	AND (o.tipo_movimentacao = 'SAIDA' OR o.tipo_movimentacao IS NULL)
	AND (o.data_movimentacao = (
			SELECT MAX(data_movimentacao)
			FROM tb_movimentacao 
			WHERE id_equipamento = e.id
			AND tipo_movimentacao = 'SAIDA'
		)
		 OR o.tipo_movimentacao IS NULL
	)
ORDER BY
	e.identificador;
		
		
SELECT * FROM tb_colaborador;

DELETE FROM tb_colaborador WHERE id = 11

DELETE FROM tb_equipamento WHERE id > 1;

DELETE FROM tb_movimentacao WHERE id > 1;

SELECT * FROM tb_equipamento

SELECT * FROM tb_movimentacao

UPDATE tb_equipamento
SET processador = 'null'
WHERE tipo = 'Telefone';

/*-------------------------*/

SELECT 
	 e.identificador, 
	 e.modelo, 
	 e.nome_maquina, 
	 e.office, 
	 f.nome AS nome_colaborador, 
	 f.setor, 
	 o.tipo_movimentacao, 
	 o.data_movimentacao,
	 e.emprestimo
FROM 
	tb_equipamento e
LEFT JOIN
	tb_movimentacao o ON e.id = o.id_equipamento
LEFT JOIN
	tb_colaborador f ON o.id_colaborador = f.id
WHERE
	e.tipo = 'Maquina'
	AND (o.tipo_movimentacao = 'SAIDA' OR o.tipo_movimentacao IS NULL)
	AND (o.data_movimentacao = (
			SELECT MAX(data_movimentacao)
			FROM tb_movimentacao 
			WHERE id_equipamento = e.id
			AND tipo_movimentacao = 'SAIDA'
		)
		 OR o.tipo_movimentacao IS NULL
	)
ORDER BY
	e.identificador;
	
SELECT * FROM tb_equipamento WHERE identificador = 'KSHA56'
