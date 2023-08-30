using iTextSharp.text.pdf;
using iTextSharp.text;
using System.IO;

namespace Api.Servico
{
    public class GeradorTermos
    {
        public byte[] GenerateTermoResponsabilidade(string nomeColaborador, string tipoEquipamento, string tipoMovimentacao)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                Document document = new Document(PageSize.A4);
                PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);

                document.Open();

                Paragraph titulo = new Paragraph("Teste Termo\n\n", new Font(Font.FontFamily.COURIER, 40));
                titulo.Alignment = Element.ALIGN_CENTER;
                document.Add(titulo);

                string conteudo = $"Nome do Colaborador: {nomeColaborador}\nTipo de Equipamento: {tipoEquipamento}\nTipo de Movimentação: {tipoMovimentacao}\n";
                Paragraph paragrafo = new Paragraph(conteudo, new Font(Font.NORMAL, 12));
                document.Add(paragrafo);

                document.Close();

                return memoryStream.ToArray();
            }
        }
    }
}