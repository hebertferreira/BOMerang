        
        const botaoAlterarTema = document.getElementById('alterarTema');
        const themeStyleSheet = document.getElementById('themeStyleSheet');
        
        let temaAtual = localStorage.getItem('theme') || 'hot';
        
        
        /* ALTERAR TEMA DA PAGINA */
        
        function mudarTema(){
            if (temaAtual === 'hot') {
                temaAtual = 'cold';
                themeStyleSheet.href = 'css/cold.css';

            } else if (temaAtual === 'cold') {
                temaAtual = 'darkness';
                themeStyleSheet.href = 'css/darkness.css';

            }else if(temaAtual === 'darkness'){
                temaAtual = '80';
                themeStyleSheet.href = 'css/80.css';

             }
             else {
                    temaAtual = 'hot';
                    themeStyleSheet.href = 'css/hot.css';

                 }

                 localStorage.setItem('theme', temaAtual);
        }

        
        // Aplica o tema salvo ao carregar a página
        themeStyleSheet.href = `css/${temaAtual}.css`;
        
        botaoAlterarTema.addEventListener('click', mudarTema);    
        
        
        const tituloProdutoPrincipal = document.getElementById('tituloProdutoPrincipal');
        const listaMateriais = document.getElementById('listaMateriais');
        const faseProducao = document.getElementById('faseProducao');
        const outrasDespesas = document.getElementById('outrasDespesas');
        const resultado = document.getElementById('resultado');
        const inputTextoProdutoPrincipal = document.getElementById('idNomeProdutoPai');
        inputTextoProdutoPrincipal.disabled = false;
        const inputbtnProdutoPai = document.getElementById('idBtnProdutoPai');
        inputbtnProdutoPai.disabled = false;
        
        let CustoTotal = 0;

        
        function preencherProdutoPai(){
            const nomeProdutoPai = document.getElementById('idNomeProdutoPai').value
            
            if(nomeProdutoPai){
                const item = document.createElement('div');
                
                item.className = 'tituloProdutoFabricado';
                item.innerHTML = `
                <span>${nomeProdutoPai}</span>
                `;
                
                tituloProdutoPrincipal.appendChild(item);
                inputTextoProdutoPrincipal.disabled = true;
                inputbtnProdutoPai.disabled = true;
            } else {
                alert('Preencha os campos corretamente.');
            }
        }
        
        function addComponente() {
            const selectUMComponente = document.getElementById('selectUMComponente').value;
            const nomeComponente = document.getElementById('idNomeComponente').value;
            const qtdeComponente = parseFloat(document.getElementById('idQtdeNecessaria').value);
            const custoComponente = parseFloat(document.getElementById('idPrecoComponente').value);
            const valorProporcao = qtdeComponente * custoComponente;
        
            if (nomeComponente && !isNaN(valorProporcao)) {
                // Esse codigo busca o <tbody> dentro da <table>, se existir, adiciona novos <tr> corretamente dentro dele. Esse operador lógico || ("OU"),
                // se não houver <tbody>, o codigo pega diretamente a <table> e faz um fallback para acertar o alinhamento junto a ultima  tabela.
                const tabelaComponente = document.querySelector("#listaMateriais table tbody") || document.querySelector("#listaMateriais table");
        
                // Cria uma nova linha (tr)
                const novaLinha = document.createElement("tr");
        
                // Adiciona as células (td) corretamente alinhadas
                novaLinha.innerHTML = `
                    <td>${nomeComponente}</td>
                    <td>${qtdeComponente.toFixed(3)} ${selectUMComponente}</td>
                    <td>R$ ${custoComponente.toFixed(2)}</td>
                    <td>R$ ${valorProporcao.toFixed(2)}</td>
                    <td><button class="botaoExcluirLinha"> X </td>
                `;
        
                // Adiciona a linha à tabela
                tabelaComponente.appendChild(novaLinha);

                novaLinha.querySelector(".botaoExcluirLinha").addEventListener("click", function excluirLinha(){
                    novaLinha.remove();

                CustoTotal -= valorProporcao;
                document.getElementById("resultado").textContent = `Custo Total: R$ ${CustoTotal.toFixed(2)}`;
                });
        
                // Atualiza o custo total
                CustoTotal += valorProporcao;
                document.getElementById("resultado").textContent = `Custo Total: R$ ${CustoTotal.toFixed(2)}`;
        
                // Limpa os campos de input
                document.getElementById('idNomeComponente').value = '';
                document.getElementById('idQtdeNecessaria').value = '';
                document.getElementById('idPrecoComponente').value = '';
        
            } else {
                alert('Preencha os campos corretamente.');
            }
        }
        

        function addEtapa(){

            const nomeEtapa = document.getElementById('idNomeEtapa').value;
            const tempoEtapaEmMinutos = parseFloat(document.getElementById('idTempoCicloProdutivo').value);
            const custoEtapa = parseFloat(document.getElementById('idValorHora').value);
            const valorProporcao = (custoEtapa * (tempoEtapaEmMinutos /60));

            if (nomeEtapa && !isNaN(valorProporcao)) {

                // Esse codigo busca o <tbody> dentro da <table>, se existir, adiciona novos <tr> corretamente dentro dele. Esse operador lógico || ("OU"),
                // se não houver <tbody>, o codigo pega diretamente a <table> e faz um fallback para acertar o alinhamento junto a ultima  tabela.
                const tabelaFaseProducao = document.querySelector("#faseProducao table tbody") || document.querySelector("#faseProducao table");

                const novaLinha = document.createElement("tr");

                // Adiciona as células (td) corretamente alinhadas
                novaLinha.innerHTML = `
                    <td>${nomeEtapa}</td>
                    <td>${tempoEtapaEmMinutos}min</td>
                    <td>R$ ${custoEtapa.toFixed(2)}</td>
                    <td>R$ ${valorProporcao.toFixed(2)}</td>
                    <td><button class="botaoExcluirLinha"> X </td>
                `;

                tabelaFaseProducao.appendChild(novaLinha);

                novaLinha.querySelector(".botaoExcluirLinha").addEventListener("click", function excluirLinha(){
                    novaLinha.remove();

                CustoTotal -= valorProporcao;
                document.getElementById("resultado").textContent = `Custo Total: R$ ${CustoTotal.toFixed(2)}`;
                    
                });

                CustoTotal += valorProporcao;
                document.getElementById("resultado").textContent = `Custo Total: R$ ${CustoTotal.toFixed(2)}`;

                document.getElementById('idNomeEtapa').value = '';
                document.getElementById('idTempoCicloProdutivo').value = '';
                document.getElementById('idValorHora').value = '';

            } else {
                alert('Preencha os campos corretamente.');
            }
        }

        function addDespesa() {
            const nomeDespesa = document.getElementById('idNomeDespesa').value;
            const valorDespesa = parseFloat(document.getElementById('idValorDespesa').value);
            const percentualRateioDespesa = parseFloat(document.getElementById('idPercentualRateioDespesa').value);
            const valorProporcao = (valorDespesa * (percentualRateioDespesa/100));
            
            if (nomeDespesa && !isNaN(valorProporcao)) {

                // Esse codigo busca o <tbody> dentro da <table>, se existir, adiciona novos <tr> corretamente dentro dele. Esse operador lógico || ("OU"),
                // se não houver <tbody>, o codigo pega diretamente a <table> e faz um fallback para acertar o alinhamento junto a ultima  tabela.
                const tabelaDespesa = document.querySelector("#outrasDespesas table tbody") || document.querySelector("outrasDespesas table");

                const novaLinha = document.createElement("tr");
                
                novaLinha.innerHTML = `
                <td>${nomeDespesa}</td>
                <td>R$ ${valorDespesa.toFixed(2)}</td>
                <td>${percentualRateioDespesa.toFixed(2)}%</td>
                <td>R$ ${valorProporcao.toFixed(2)}</td>
                <td><button class="botaoExcluirLinha"> X </td>
                `;
                
                tabelaDespesa.appendChild(novaLinha);
                
                novaLinha.querySelector(".botaoExcluirLinha").addEventListener("click", function excluirLinha(){
                    novaLinha.remove();

                CustoTotal -= valorProporcao;
                document.getElementById("resultado").textContent = `Custo Total: R$ ${CustoTotal.toFixed(2)}`;
            });
            
                CustoTotal += valorProporcao;
                document.getElementById("resultado").textContent = `Custo Total: R$ ${CustoTotal.toFixed(2)}`;
                
                document.getElementById('idNomeDespesa').value = '';
                document.getElementById('idValorDespesa').value = '';
                document.getElementById('idPercentualRateioDespesa').value = '';
                
            } else {
                alert('Preencha os campos corretamente.');
            }
        }
        
        function ExportarExcel(){
            const dadosSemFormatacao = document.getElementById('#');
            
    }