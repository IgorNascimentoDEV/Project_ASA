using iTextSharp.text.pdf;
using iTextSharp.text;
using System.IO;

namespace Api.Servico
{
    public class GeradorTermos
    {
        public byte[] GenerateTermoResponsabilidade(string nome,
            long matricula,
            string identificador,
            string modelo,
            string linha,
            string observacao,
            string tipo)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                var valorAparelho = 1200.00;
                var foneOuvido = "Não";
                var carregador = "SIM";
                string dataAtual = DateTime.Now.ToString("dd/MM/yyyy");
                // Defina a fonte Arial com tamanho 7,5
                Font fonteArial75 = FontFactory.GetFont("Arial", 8.5f);

                Document document = new Document(PageSize.A4);
                PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);

                document.Open();

                // Título
                Paragraph titulo = new Paragraph("TERMO DE CONCESSÃO DE LINHA E APARELHO CELULAR CORPORATIVO\n\n", new Font(Font.FontFamily.COURIER, 16));
                titulo.Alignment = Element.ALIGN_CENTER;
                document.Add(titulo);

                // Seção de informações gerais
                string informacoesGerais = $"Tipo Termo: {tipo}\n" +
                    "INTRODUÇÃO:\n" +
                    "Esse Termo é referente a concessão de telefone celular e linha corporativa, denominado Kit Celular, de propriedade do Grupo ASA Indústria e Comércio Ltda., destinados aos funcionários que precisam ter mobilidade para executar as atividades profissionais. Tal equipamento é uma importante FERRAMENTA DE TRABALHO e como tal deverá ser recebida. Este termo foi elaborado com base nos princípios gerais que norteiam o comportamento profissional e política aplicada na empresa.\n\n";
                Paragraph informacoesGeraisParagrafo = new Paragraph(informacoesGerais, fonteArial75);
                document.Add(informacoesGeraisParagrafo);

                // Seção de concessão celular
                string concessaoCelular = $"CONCESSÃO  CELULAR\n\n" +
                    $"Nome: {nome}\t   |   Matrícula: {matricula}\n" +
                    $"IMEI Aparelho: {identificador}\t   |   Modelo: {modelo}\n" + 
                    $"Valor: R$ {valorAparelho}\t   |   Chip: {linha}\n" +
                    $"Carregador: {carregador}\t   |   Fone ouvido: {foneOuvido}\n" +
                    $"Obs: {observacao}\n\n";
                Paragraph concessaoCelularParagrafo = new Paragraph(concessaoCelular, fonteArial75);
                document.Add(concessaoCelularParagrafo);

                // Seção de utilização
                string utilizacao = $"DA UTILIZAÇÃO:\n\n" +
                    "É vedado ao usuário utilizar o equipamento, para qualquer outra finalidade que não seja aquela ligada diretamente às atividades da sua área de atuação ou da empresa.\n" +
                    "O funcionamento do equipamento será limitado ao horário inicial das 7h30min e final até as 19h30min. Fora destes horários o mesmo  JAMAIS deverá ser usado, seja para ligações ou mesmo para aplicativos de comunicação (a exemplo do Whatsapp). Ressalve-se apenas as estritas e previamente autorizadas exceções (Empregados que trabalhem nos horários noturnos ou em Plantões).\n\n";
                Paragraph utilizacaoParagrafo = new Paragraph(utilizacao, fonteArial75);
                document.Add(utilizacaoParagrafo);

                // Seção de manutenção
                string manutencao = $"MANUTENÇÃO\n\n" +
                    "O celular deverá ser mantido em perfeito estado de conservação e em condições normais de uso em todo período de sua utilização. A execução/acompanhamento dos serviços de manutenção será de responsabilidade do usuário, entretanto o pagamento das mesmas será de responsabilidade da empresa, desde que cumprido o procedimento abaixo e que não seja detectado pela autorizada mau uso do mesmo:\n\n" +
                    "Todas as revisões e reparos deverão ser sempre realizados em assistências técnicas autorizadas pelo fabricante. O orçamento deverá ser avaliado pelo Departamento de Informática e aprovado pela Diretoria Adm/Financeira diretamente no orçamento apresentado.\n" +
                    "Caso seja necessário, o funcionário poderá registrar chamado no service desk (suporte.asanet.com.br), no intuito de receber um  aparelho  de contingência temporário caso se tenha disponibilidade, conforme o prazo de devolução da assistência técnica autorizada. Para o recebimento do equipamento contingente será necessário enviar a cópia da ordem de serviço, destacando o prazo para devolução do equipamento pela assistência técnica, em atenção ao departamento de informática.\n\n";
                Paragraph manutencaoParagrafo = new Paragraph(manutencao, fonteArial75);
                document.Add(manutencaoParagrafo);

                // Seção de devolução / perda / roubo / furto
                string devolucaoPerda = $"DEVOLUÇÃO / PERDA / ROUBO / FURTO\n\n" +
                    "A não devolução, perda ou devolução do aparelho danificado (mau uso) ou faltando acessórios, será descontado em folha de pagamento o correspondente ao valor de mercado do equipamento, seus acessórios e dos softwares nele instalados ou da parte danificada ou faltante.\n" +
                    "Nos casos de roubo/furto deverá ser formalizado, de imediato, queixa no órgão público competente (delegacia de polícia mais próxima) apresentando à empresa, através do suporte informática da ASA, o Boletim de Ocorrência (BO) correspondente para que seja providenciado o bloqueio da referida linha, aparelho e iniciado o processo de substituição do equipamento. Neste caso, o funcionário não será responsável pela reposição do equipamento.\n\n";
                Paragraph devolucaoPerdaParagrafo = new Paragraph(devolucaoPerda, fonteArial75);
                document.Add(devolucaoPerdaParagrafo);

                // Seção de declaração
                string declaracao = "Declaro ter lido detidamente o texto acima e externo minha concordância às condições e termos nele constantes.\n\n";
                Paragraph declaracaoParagrafo = new Paragraph(declaracao, fonteArial75);
                document.Add(declaracaoParagrafo);

                // Crie o parágrafo com a data atual
                string dataAssinatura = $"Recife, {dataAtual} Ass: ________________________\n\n";
                Paragraph dataAssinaturaParagrafo = new Paragraph(dataAssinatura, fonteArial75);
                dataAssinaturaParagrafo.Alignment = Element.ALIGN_CENTER;
                document.Add(dataAssinaturaParagrafo);

                document.Close();

                return memoryStream.ToArray();
            }
        }
    }
}
