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
                Font fonteArial = FontFactory.GetFont("Arial", 16f);


                // Caminho da imagem da empresa
                string imagePath = @"C:\Api\Api\Servico\Asa-1.png";

                Document document = new Document(PageSize.A4);
                PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);

                document.Open();

                // Criar tabela para imagem e título
                PdfPTable tabelaCabecalho = new PdfPTable(2);
                tabelaCabecalho.WidthPercentage = 100;
                tabelaCabecalho.DefaultCell.Border = PdfPCell.NO_BORDER;

                float[] cabecalhoWidths = { 20f, 80f };
                tabelaCabecalho.SetWidths(cabecalhoWidths);

                // Adicionar a logo da empresa na primeira célula
                Image img = Image.GetInstance(imagePath);
                img.ScaleToFit(100f, 100f);
                PdfPCell imgCell = new PdfPCell(img);
                imgCell.Border = PdfPCell.NO_BORDER;
                tabelaCabecalho.AddCell(imgCell);

                // Adicionar o título na segunda célula
                PdfPCell tituloCell = new PdfPCell(new Phrase("TERMO DE CONCESSÃO DE LINHA E APARELHO CELULAR CORPORATIVO\n\n", fonteArial));
                tituloCell.HorizontalAlignment = Element.ALIGN_CENTER;
                tituloCell.VerticalAlignment = Element.ALIGN_MIDDLE;
                tituloCell.Border = PdfPCell.NO_BORDER;
                tabelaCabecalho.AddCell(tituloCell);

                document.Add(tabelaCabecalho);


                // Seção de informações gerais
                string informacoesGerais = $"Tipo Termo: {tipo}\n" +
                    "INTRODUÇÃO:\n" +
                    "Esse Termo é referente a concessão de telefone celular e linha corporativa, denominado Kit Celular, de propriedade do Grupo ASA Indústria e Comércio Ltda., destinados aos funcionários que precisam ter mobilidade para executar as atividades profissionais. Tal equipamento é uma importante FERRAMENTA DE TRABALHO e como tal deverá ser recebida. Este termo foi elaborado com base nos princípios gerais que norteiam o comportamento profissional e política aplicada na empresa.\n\n";
                Paragraph informacoesGeraisParagrafo = new Paragraph(informacoesGerais, fonteArial75);
                document.Add(informacoesGeraisParagrafo);

                // Seção de concessão celular
                PdfPTable tabelaConcessao = new PdfPTable(2);
                tabelaConcessao.WidthPercentage = 100; // 100% da largura da página
                tabelaConcessao.DefaultCell.Border = PdfPCell.NO_BORDER;

                // Definir largura das colunas
                float[] columnWidths = { 50f, 50f };
                tabelaConcessao.SetWidths(columnWidths);

                tabelaConcessao.AddCell("CONCESSÃO  CELULAR");
                tabelaConcessao.AddCell("");

                tabelaConcessao.AddCell($"Nome: {nome}");
                tabelaConcessao.AddCell($"Matrícula: {matricula}");

                tabelaConcessao.AddCell($"IMEI Aparelho: {identificador}");
                tabelaConcessao.AddCell($"Modelo: {modelo}");

                tabelaConcessao.AddCell($"Valor: R$ {valorAparelho}");
                tabelaConcessao.AddCell($"Chip: {linha}");

                tabelaConcessao.AddCell($"Carregador: {carregador}");
                tabelaConcessao.AddCell($"Fone ouvido: {foneOuvido}");

                tabelaConcessao.AddCell($"Obs: {observacao}");
                tabelaConcessao.AddCell("");

                document.Add(tabelaConcessao);

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

        public byte[] GenerateTermoResponsabilidadeMaquina(
            string nome,
            long matricula,
            string identificador,
            string modelo,
            string nomeMaquina,
            string observacao,
            string tipo)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                var carregador = "SIM";
                string dataAtual = DateTime.Now.ToString("dd/MM/yyyy");
                // Defina a fonte Arial com tamanho 7,5
                Font fonteArial75 = FontFactory.GetFont("Arial", 8.5f);
                Font fonteArial = FontFactory.GetFont("Arial", 16f);


                // Caminho da imagem da empresa
                string imagePath = @"C:\Api\Api\Servico\Asa-1.png";

                Document document = new Document(PageSize.A4);
                PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);

                document.Open();

                // Criar tabela para imagem e título
                PdfPTable tabelaCabecalho = new PdfPTable(2);
                tabelaCabecalho.WidthPercentage = 100;
                tabelaCabecalho.DefaultCell.Border = PdfPCell.NO_BORDER;

                float[] cabecalhoWidths = { 20f, 80f };
                tabelaCabecalho.SetWidths(cabecalhoWidths);

                // Adicionar a logo da empresa na primeira célula
                Image img = Image.GetInstance(imagePath);
                img.ScaleToFit(100f, 100f);
                PdfPCell imgCell = new PdfPCell(img);
                imgCell.Border = PdfPCell.NO_BORDER;
                tabelaCabecalho.AddCell(imgCell);

                // Adicionar o título na segunda célula
                PdfPCell tituloCell = new PdfPCell(new Phrase("TERMO DE CONCESSÃO TEMPORÁRIA DE EQUIPAMENTO DE INFORMÁTICA\n\n", fonteArial));
                tituloCell.HorizontalAlignment = Element.ALIGN_CENTER;
                tituloCell.VerticalAlignment = Element.ALIGN_MIDDLE;
                tituloCell.Border = PdfPCell.NO_BORDER;
                tabelaCabecalho.AddCell(tituloCell);

                document.Add(tabelaCabecalho);

                // Seção de informações gerais
                string informacoesGerais = $"Tipo Termo: {tipo}\n" +
                    "INTRODUÇÃO:\n" +
                    "Esse Termo é referente a concessão temporária de Equpamentos de Informática, de propriedade do Grupo ASA Indústria e Comércio Ltda., destinados aos funcionários que precisam ter mobilidade para executar as atividades profissionais. Tal equipamento é uma importante FERRAMENTA DE TRABALHO e como tal deverá ser recebida. Este termo foi elaborado com base nos princípios gerais que norteiam o comportamento profissional e política aplicada na empresa.\r\n\r\nA entrega do(s) Equipamento(s) de Informática ao usuário está vinculada ao preenchimento e assinatura deste Termo de Responsabilidade.  Confira todos os itens abaixo descritos.\n\n";
                Paragraph informacoesGeraisParagrafo = new Paragraph(informacoesGerais, fonteArial75);
                document.Add(informacoesGeraisParagrafo);

                // Seção de concessão máquina
                PdfPTable tabelaConcessaoMaquina = new PdfPTable(2);
                tabelaConcessaoMaquina.WidthPercentage = 100;
                tabelaConcessaoMaquina.DefaultCell.Border = PdfPCell.NO_BORDER;

                float[] colWidthsMaquina = { 50f, 50f };
                tabelaConcessaoMaquina.SetWidths(colWidthsMaquina);

                tabelaConcessaoMaquina.AddCell("CONCESSÃO  MÁQUINA");
                tabelaConcessaoMaquina.AddCell("");

                tabelaConcessaoMaquina.AddCell($"Nome: {nome}");
                tabelaConcessaoMaquina.AddCell($"Matrícula: {matricula}");

                tabelaConcessaoMaquina.AddCell($"Máquina: {identificador}");
                tabelaConcessaoMaquina.AddCell($"Modelo: {modelo}");

                tabelaConcessaoMaquina.AddCell($"Nome da máquina: {nomeMaquina}");
                tabelaConcessaoMaquina.AddCell($"Carregador: {carregador}");

                tabelaConcessaoMaquina.AddCell($"Obs: {observacao}");
                tabelaConcessaoMaquina.AddCell("");

                document.Add(tabelaConcessaoMaquina);

                // Seção de utilização
                string utilizacao = $"DA UTILIZAÇÃO:\n\n" +
                   "É vedado ao usuário utilizar o equipamento, para qualquer outra finalidade que não seja aquela ligada diretamente às atividades da sua área de atuação ou da empresa.\r\n\r\nA instalação e a atualização de qualquer software somente serão efetuadas pelo departamento de informática, o qual tem a responsabilidade de manter contratos de licença de utilização dos softwares. Assim, as instalações de softwares adicionais aos instalados no equipamento devem ser solicitadas diretamente ao departamento de informática via service desk (suporte.asanet.com.br).\r\n\r\nO usuário responsável pelo equipamento não poderá em qualquer hipótese: Realizar cópias dos softwares nele instalados, instalar ou permitir a instalação de softwares por terceiros.\r\n\r\nEsses atos são considerados ilegais e qualquer infração, danos financeiros, e outras implicações legais devido a essa prática são de inteira responsabilidade do usuário infrator – ficando sujeito às penalidades previstas na Lei Trabalhista.\n\n"; Paragraph utilizacaoParagrafo = new Paragraph(utilizacao, fonteArial75);
                document.Add(utilizacaoParagrafo);

                // Seção de manutenção
                string manutencao = $"MANUTENÇÃO\n\n" +
                   "O(s) Equipmento(s) deverá(ão) ser mantido(s) em perfeito estado de conservação e em condições normais de uso em todo período de sua utilização.\n\n" +
                   "O funcionário poderá registrar chamado no service desk (suporte.asanet.com.br), no intuito de receber um equipamento de contingência temporário caso se tenha disponibilidade. \n\n";
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



        public byte[] GenerateTermoDevolucaoAtivo(string nome,
          long matricula,
          string identificador,
          string modelo,
          string linha,
          string observacao,
          string tipo)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                // Defina a fonte Arial com tamanho 7,5
                Font fonteArial75 = FontFactory.GetFont("Arial", 8.5f);
                Font fonteArial = FontFactory.GetFont("Arial", 16f);


                // Caminho da imagem da empresa
                string imagePath = @"C:\Api\Api\Servico\Asa-1.png";

                Document document = new Document(PageSize.A4);
                PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);

                document.Open();

                // Criar tabela para imagem e título
                PdfPTable tabelaCabecalho = new PdfPTable(2);
                tabelaCabecalho.WidthPercentage = 100;
                tabelaCabecalho.DefaultCell.Border = PdfPCell.NO_BORDER;

                float[] cabecalhoWidths = { 20f, 80f };
                tabelaCabecalho.SetWidths(cabecalhoWidths);

                // Adicionar a logo da empresa na primeira célula
                Image img = Image.GetInstance(imagePath);
                img.ScaleToFit(100f, 100f);
                PdfPCell imgCell = new PdfPCell(img);
                imgCell.Border = PdfPCell.NO_BORDER;
                tabelaCabecalho.AddCell(imgCell);

                // Adicionar o título na segunda célula
                PdfPCell tituloCell = new PdfPCell(new Phrase("TERMO DE CONCESSÃO DE LINHA E APARELHO CELULAR CORPORATIVO\n\n", fonteArial));
                tituloCell.HorizontalAlignment = Element.ALIGN_CENTER;
                tituloCell.VerticalAlignment = Element.ALIGN_MIDDLE;
                tituloCell.Border = PdfPCell.NO_BORDER;
                tabelaCabecalho.AddCell(tituloCell);

                document.Add(tabelaCabecalho);

                // Seção de informações gerais
                string informacoesGerais = $"Tipo Termo: {tipo}\n" +
                    "INTRODUÇÃO:\n" +
                    "Esse Termo é referente à devolução de ativo da empresa, que foi previamente concedido ao funcionário. Este termo foi elaborado com base nos princípios gerais que norteiam o comportamento profissional e política aplicada na empresa.\n\n";
                Paragraph informacoesGeraisParagrafo = new Paragraph(informacoesGerais, fonteArial75);
                document.Add(informacoesGeraisParagrafo);

                // Seção de devolução de ativo
                PdfPTable tabelaConcessao = new PdfPTable(2);
                tabelaConcessao.WidthPercentage = 100; // 100% da largura da página
                tabelaConcessao.DefaultCell.Border = PdfPCell.NO_BORDER;

                // Definir largura das colunas
                float[] columnWidths = { 50f, 50f };
                tabelaConcessao.SetWidths(columnWidths);

                tabelaConcessao.AddCell("DEVOLUÇÃO CELULAR CORPORATIVO");
                tabelaConcessao.AddCell("");

                tabelaConcessao.AddCell($"Nome: {nome}");
                tabelaConcessao.AddCell($"Matrícula: {matricula}");

                tabelaConcessao.AddCell($"IMEI Aparelho: {identificador}");
                tabelaConcessao.AddCell($"Modelo: {modelo}");

                tabelaConcessao.AddCell($"Chip: {linha}");

                tabelaConcessao.AddCell($"Obs: {observacao}");
                tabelaConcessao.AddCell("");

                document.Add(tabelaConcessao);

                // Seção de condições de devolução
                string condicoesDevolucao = $"CONDIÇÕES DE DEVOLUÇÃO:\n\n" +
                    "O ativo deverá ser devolvido em perfeito estado de conservação e com todos os acessórios originalmente fornecidos.\n" +
                    "Caso haja danos ou acessórios faltantes, o funcionário será responsável pelo ressarcimento do valor correspondente.\n\n";
                Paragraph condicoesDevolucaoParagrafo = new Paragraph(condicoesDevolucao, fonteArial75);
                document.Add(condicoesDevolucaoParagrafo);

                // Seção de declaração
                string declaracao = "Declaro ter lido detidamente o texto acima e externo minha concordância às condições e termos nele constantes.\n\n";
                Paragraph declaracaoParagrafo = new Paragraph(declaracao, fonteArial75);
                document.Add(declaracaoParagrafo);

                // Crie o parágrafo com a data atual
                string dataAssinatura = $"Recife, {DateTime.Now.ToString("dd/MM/yyyy")} Ass: ________________________\n\n";
                Paragraph dataAssinaturaParagrafo = new Paragraph(dataAssinatura, fonteArial75);
                dataAssinaturaParagrafo.Alignment = Element.ALIGN_CENTER;
                document.Add(dataAssinaturaParagrafo);

                document.Close();

                return memoryStream.ToArray();
            }
        }

        public byte[] GenerateTermoDevolucaoMaquina(
             string nome,
             long matricula,
             string identificador,
             string modelo,
             string nomeMaquina,
             string observacao,
             string tipo)
        {
            using (MemoryStream memoryStream = new MemoryStream())
            {
                // Defina a fonte Arial com tamanho 7,5
                Font fonteArial75 = FontFactory.GetFont("Arial", 8.5f);
                Font fonteArial = FontFactory.GetFont("Arial", 16f);


                // Caminho da imagem da empresa
                string imagePath = @"C:\Api\Api\Servico\Asa-1.png";

                Document document = new Document(PageSize.A4);
                PdfWriter writer = PdfWriter.GetInstance(document, memoryStream);

                document.Open();

                // Criar tabela para imagem e título
                PdfPTable tabelaCabecalho = new PdfPTable(2);
                tabelaCabecalho.WidthPercentage = 100;
                tabelaCabecalho.DefaultCell.Border = PdfPCell.NO_BORDER;

                float[] cabecalhoWidths = { 20f, 80f };
                tabelaCabecalho.SetWidths(cabecalhoWidths);

                // Adicionar a logo da empresa na primeira célula
                Image img = Image.GetInstance(imagePath);
                img.ScaleToFit(100f, 100f);
                PdfPCell imgCell = new PdfPCell(img);
                imgCell.Border = PdfPCell.NO_BORDER;
                tabelaCabecalho.AddCell(imgCell);

                // Adicionar o título na segunda célula
                PdfPCell tituloCell = new PdfPCell(new Phrase("TERMO DE DEVOLUÇÃO DE LINHA E APARELHO CELULAR CORPORATIVO\n\n", fonteArial));
                tituloCell.HorizontalAlignment = Element.ALIGN_CENTER;
                tituloCell.VerticalAlignment = Element.ALIGN_MIDDLE;
                tituloCell.Border = PdfPCell.NO_BORDER;
                tabelaCabecalho.AddCell(tituloCell);

                document.Add(tabelaCabecalho);

                // Seção de informações gerais
                string informacoesGerais = $"Tipo Termo: {tipo}\n" +
                    "INTRODUÇÃO:\n" +
                    "Este Termo é referente à devolução do Equipamento de Informática, anteriormente concedido ao funcionário. Este termo foi elaborado com base nos princípios gerais que norteiam o comportamento profissional e política aplicada na empresa.\n\n";
                Paragraph informacoesGeraisParagrafo = new Paragraph(informacoesGerais, fonteArial75);
                document.Add(informacoesGeraisParagrafo);

                // Seção de devolução de máquina
                // Seção de concessão máquina
                PdfPTable tabelaConcessaoMaquina = new PdfPTable(2);
                tabelaConcessaoMaquina.WidthPercentage = 100;
                tabelaConcessaoMaquina.DefaultCell.Border = PdfPCell.NO_BORDER;

                float[] colWidthsMaquina = { 50f, 50f };
                tabelaConcessaoMaquina.SetWidths(colWidthsMaquina);

                tabelaConcessaoMaquina.AddCell("DEVOLUÇÃO DE MÁQUINA");
                tabelaConcessaoMaquina.AddCell("");

                tabelaConcessaoMaquina.AddCell($"Nome: {nome}");
                tabelaConcessaoMaquina.AddCell($"Matrícula: {matricula}");

                tabelaConcessaoMaquina.AddCell($"Máquina: {identificador}");
                tabelaConcessaoMaquina.AddCell($"Modelo: {modelo}");

                tabelaConcessaoMaquina.AddCell($"Nome da máquina: {nomeMaquina}");

                tabelaConcessaoMaquina.AddCell($"Obs: {observacao}");
                tabelaConcessaoMaquina.AddCell("");

                document.Add(tabelaConcessaoMaquina);

                // Seção de condições de devolução
                string condicoesDevolucao = $"CONDIÇÕES DE DEVOLUÇÃO:\n\n" +
                    "O equipamento deverá ser devolvido em perfeito estado de conservação e com todos os acessórios originalmente fornecidos.\n" +
                    "Caso haja danos ou acessórios faltantes, o funcionário será responsável pelo ressarcimento do valor correspondente.\n\n";
                Paragraph condicoesDevolucaoParagrafo = new Paragraph(condicoesDevolucao, fonteArial75);
                document.Add(condicoesDevolucaoParagrafo);

                // Seção de declaração
                string declaracao = "Declaro ter lido detidamente o texto acima e externo minha concordância às condições e termos nele constantes.\n\n";
                Paragraph declaracaoParagrafo = new Paragraph(declaracao, fonteArial75);
                document.Add(declaracaoParagrafo);

                // Crie o parágrafo com a data atual
                string dataAssinatura = $"Recife, {DateTime.Now.ToString("dd/MM/yyyy")} Ass: ________________________\n\n";
                Paragraph dataAssinaturaParagrafo = new Paragraph(dataAssinatura, fonteArial75);
                dataAssinaturaParagrafo.Alignment = Element.ALIGN_CENTER;
                document.Add(dataAssinaturaParagrafo);

                document.Close();

                return memoryStream.ToArray();
            }
        }

    }
}
