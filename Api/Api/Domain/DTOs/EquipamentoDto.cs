﻿namespace Api.Domain.DTOs
{
    public class EquipamentoDto
    {
        public string Identificador { get; set; }
        public string Data { get; set; }
        public string Modelo { get; set; }
        public string Armazenamento { get; set; }
        public string MemoriaRam { get; set; }
        public string Processador { get; set; }
        public string Office { get; set; }
        public string NomeMaquina { get; set; }
        public string NumeroDeSerie { get; set; }
        public string Linha { get; set; }
        public bool Emprestimo { get; set; }
        public string Tipo { get; set; }
        public string Observacao { get; set; }
    }
}
