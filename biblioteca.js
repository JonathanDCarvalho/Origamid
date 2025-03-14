/**
 * Retorna o dados de um determinado dataset/fichÃ¡rio. <b><u>Usar no HTML de qualquer fichÃ¡rio</u></b>.<br>
 *<u>O arquivo vcXMLRPC.js precisa ser declarado</u><br>
 *&lt;script&gt; type="text/javascript" src="/webdesk/vcXMLRPC.js"&gt;&lt;/script&gt;
 * <pre>
 *Exemplo:
 *
 *  var filtro = new Object();
 *  filtro["colleaguePK.colleagueId"] = "adm";
 *  var colaboradores = getDatasetValues("colleague", filtro);
 *
 *  if(colaboradores.length > 0) {
 *    alert(colaboradores[0].colleagueName);
 *  }
 * <pre>
 * @memberOf Global
 * @param {String} nome Nome do dataset (para datasets padrÃµes do produto) ou cÃ³digo do fichÃ¡rio (para datasets de fichÃ¡rios)
 * @param {Object} filtro Filtro
 * @returns {Array} Array de Objetos representando os valores do dataset <code>nome</code>
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
getDatasetValues = function (nome, filtro) {
	return [];
};

/**
 * Propriedade que contÃ©m a versÃ£o do Workflow.<b><u>Usar somente em HTML de Processos</u></b>.<br>
 *<u>O arquivo vcXMLRPC.js precisa ser declarado</u><br>
 *&lt;script&gt; type="text/javascript" src="/webdesk/vcXMLRPC.js"&gt;&lt;/script&gt;
 * @type {String}
 * @memberOf Global
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
Global.prototype.WKVersDef = "";
/**
 * Propriedade que contÃ©m o ID (cÃ³digo) do Workflow corrente.<b><u>Usar somente em HTML de Processos</u></b>.<br>
 *<u>O arquivo vcXMLRPC.js precisa ser declarado</u><br>
 *&lt;script&gt; type="text/javascript" src="/webdesk/vcXMLRPC.js"&gt;&lt;/script&gt;
 * @type {String}
 * @memberOf Global
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
Global.prototype.WKNumProces = "";

/**
 * Propriedade que contÃ©m o ID da atividade atual do Workflow.<b><u>Usar somente em HTML de Processos</u></b>.<br>
 *<u>O arquivo vcXMLRPC.js precisa ser declarado</u><br>
 *&lt;script&gt; type="text/javascript" src="/webdesk/vcXMLRPC.js"&gt;&lt;/script&gt;
 * @type {String}
 * @memberOf Global
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
Global.prototype.WKNumState = "";

/**
 * Objeto que contÃ©m os valores dos tipos de Campo para um dataset. Usado na criaÃ§Ã£o os campos da funÃ§Ã£o <code>defineStructure</code>.
 *
 * @super Object
 * @memberOf DatasetFieldType
 * @since   fluig 1.5.5
 * @see    http://www.fluig.com
 */
DatasetFieldType.prototype = new Object();

/**
 * Determina que a coluna criada serÃ¡ do tipo Number
 * @memberOf DatasetFieldType
 * @since   fluig 1.5.5
 * @see    http://www.fluig.com
 */
DatasetFieldType.NUMBER = 0;

/**
 * Determina que a coluna criada serÃ¡ do tipo STRING (varchar2(255) no Oracle)
 * @memberOf DatasetFieldType
 * @since   fluig 1.5.5
 * @see    http://www.fluig.com
 */
DatasetFieldType.STRING = 0;

/**
 * Determina que a coluna criada serÃ¡ do tipo TEXT (varchar2(4000) no Oracle)
 * @memberOf DatasetFieldType
 * @since   fluig 1.5.5
 * @see    http://www.fluig.com
 */
DatasetFieldType.TEXT = 0;

/**
 * Determina que a coluna criada serÃ¡ do tipo Date
 * @memberOf DatasetFieldType
 * @since   fluig 1.5.5
 * @see    http://www.fluig.com
 */
DatasetFieldType.DATE = 0;

/**
 * Determina que a coluna criada serÃ¡ do tipo Boolean
 * @memberOf DatasetFieldType
 * @since   fluig 1.5.5
 * @see    http://www.fluig.com
 */
DatasetFieldType.BOOLEAN = 0;

/**
 * Objeto que contÃ©m os valores dos tipos de Constraint. Usado para criar constraints para a funÃ§Ãµo <code>getDataset</code>.
 * <b><u>Usar no HTML de qualquer fichÃ¡rio</u></b>.
 * @super Object
 * @memberOf ConstraintType
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
ConstraintType.prototype = new Object();

/**
 * Valor indicando que a constraint deve ser igual ao valor informado.
 * @memberOf ConstraintType
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
ConstraintType.MUST = 0;
/**
 * Valor indicando que a constraint pode ser igual ao valor informado (OR).
 * @memberOf ConstraintType
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
ConstraintType.SHOULD = 0;
/**
 * Valor indicando que a constraint deve ser diferente ao valor informado.
 * @memberOf ConstraintType
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
ConstraintType.MUST_NOT = 0;

/**
 * Objeto retornado pelo metodo <code>getDataset</code> da objeto <code>DatasetFactory</code>.
 * <b><u>Usar no HTML de qualquer fichÃ¡rio, dataset e eventos de processo</u></b>.
 * @super Object
 * @memberOf Dataset
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
Dataset.prototype = new Object();

/**
 * Informa a quantidade de registros retornados pela consulta do Dataset. <b><u>Usar no HTML de qualquer fichÃ¡rio</u></b>.<br>
 * @memberOf Dataset
 * @returns Number quantidade de registros retornados pela consulta
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
Dataset.rowsCount = 0;

/**
 * Retorna o valor de uma linha/coluna de um dataset.
 * @memberOf Dataset
 * @param {Number} linha linha
 * @param {String} coluna nome da coluna
 * @returns Object valor do objeto na linha/coluna especificado
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
Dataset.getValue = function (linha, coluna) {
	return new Object();
};

/**
 * Cria uma coluna em um dataset criado.
 *<pre>
 *Exemplo:
 *  var dataset =  DatasetBuilder.newDataset();
 *  dataset.addColumn("Coluna1");
 *  dataset.addColumn("Coluna2");
 *  dataset.addRow(new Array("Valor coluna 1", "Valor coluna 2"));
 *</pre>
 * @memberOf Dataset
 * @param {String} coluna nome da coluna
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
Dataset.addColumn = function (coluna) {};

/**
 * Adiciona uma linha em um dataset criado.
 *<pre>
 *Exemplo:
 *  var dataset =  DatasetBuilder.newDataset();
 *  dataset.addColumn("Coluna1");
 *  dataset.addColumn("Coluna2");
 *  dataset.addRow(new Array("Valor coluna 1", "Valor coluna 2"));
 *</pre>
 * @memberOf Dataset
 * @param {Array} valores Array contendo os valores de cada coluna
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
Dataset.addRow = function (valores) {};

/**
 * Adiciona uma linha a coleÃ§Ã£o que serÃ¡ persistido no cache de sincronizaÃ§Ã£o.
 * AtravÃ©s de dos campos da chave principal do dataset (setKey) os registros
 * serÃ£o localizados e alterados conforme dados enviados ao comando.
 *<pre>
 *Exemplo:
 *  var dataset =  DatasetBuilder.newDataset();
 *  dataset.addColumn("Coluna1");
 *  dataset.addColumn("Coluna2");
 *  dataset.updateRow(new Array("Valor coluna 1", "Valor coluna 2"));
 *</pre>
 * AtenÃ§Ã£o este mÃ©todo sÃ³ possui efeito se implementado na funÃ§Ã£o onSync
 * esta funÃ§Ã£o nÃ£o possui efeito em consultas online de datasets.
 * @memberOf Dataset
 * @param {Array} valores Array contendo os valores de cada coluna
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
Dataset.updateRow = function (valores) {};

/**
 * Adiciona registros para uma coleÃ§Ã£o aonde o fluig verifica se o registro existe na base.
 * Caso o registro exista ele farÃ¡ um update no registro caso contrÃ¡rio o registro serÃ¡ inserido na base.
 *<pre>
 *Exemplo:
 *  var dataset =  DatasetBuilder.newDataset();
 *  dataset.addOrUpdateRow(new Array("Valor coluna 1", "Valor coluna 2"));
 *</pre>
 * AtenÃ§Ã£o! Este mÃ©todo sÃ³ possui efeito se implementado na funÃ§Ã£o onSync
 * esta funÃ§Ã£o nÃ£o possui efeito em consultas online de datasets.
 * @memberOf Dataset
 * @param {Array} valores Array contendo os valores de cada coluna
 * @since  fluig 1.5.5
 * @see    http://www.fluig.com
 */
Dataset.addOrUpdateRow = function (valores) {};

/**
 * Adiciona uma linha a coleÃ§Ã£o que eliminarÃ¡ esses registros no cache de sincronizaÃ§Ã£o.
 * AtravÃ©s de dos campos definidos na chave principal do dataset (setKey) os registros
 * serÃ£o localizados e removidos.
 *<pre>
 *Exemplo:
 *  var dataset =  DatasetBuilder.newDataset();
 *  dataset.addColumn("Coluna1");
 *  dataset.addColumn("Coluna2");
 *  dataset.deleteRow(new Array("Valor coluna 1", "Valor coluna 2"));
 *</pre>
 * AtenÃ§Ã£o este mÃ©todo sÃ³ possui efeito se implementado na funÃ§Ã£o onSync
 * esta funÃ§Ã£o nÃ£o possui efeito em consultas online de datasets.
 * @memberOf Dataset
 * @param {Array} valores Array contendo os valores das colunas chaves para eliminaÃ§Ã£o.
 * @since  fluig 1.5.5
 * @see    http://www.fluig.com
 */
Dataset.deleteRow = function (valores) {};

/**
 * Cria um indice para maior performance na consulta do dataset
 *<pre>
 *Exemplo:
 *  var dataset =  DatasetBuilder.newDataset();
 *  dataset.addColumn("Coluna1");
 *  dataset.addColumn("Coluna2");
 *  dataset.addRow(new Array("Valor coluna 1", "Valor coluna 2"));
 *</pre>
 * NÃ£o tem efeito em consultas online do dataset
 * @memberOf Dataset
 * @param {Array} valores Lista de campos que farÃ£o parte da chave principal do dataset
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
Dataset.setKey = function (valores) {};

/**
 * Cria um ou mais indice para maior performance na consultas do dataset
 *<pre>
 *Exemplo:
 *  var dataset =  DatasetBuilder.newDataset();
 *  dataset.addColumn("Coluna1");
 *  dataset.addColumn("Coluna2");
 *  dataset.addIndex(new Array("Valor coluna 1", "Valor coluna 2"));
 *</pre>
 * NÃ£o tem efeito em consultas online do dataset
 * @memberOf Dataset
 * @param {Array} valores Array contendo os nomes das colunas que irÃ£o fazer parte do indice.
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
Dataset.addIndex = function (valores) {};

/**
 * Objeto que contÃ©m os valores dos tipos de Constraint. Usado para criar constraints para a funÃ§Ã£o <code>getDataset</code>.
 * <b><u>Usar no HTML de qualquer fichÃ¡rio</u></b>.
 * @super Object
 * @memberOf DatasetFactory
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
DatasetFactory.prototype = new Object();
/**
 * Retorna um Array com  os datasets disponÃ­veis. <b><u>Usar no HTML de qualquer fichÃ¡rio</u></b>.<br>
 *<u>O arquivo vcXMLRPC.js precisa ser declarado</u><br>
 *&lt;script&gt; type="text/javascript" src="/webdesk/vcXMLRPC.js"&gt;&lt;/script&gt;
 * @memberOf DatasetFactory
 * @returns {Array} Array o nome dos datasets disponÃ­veis
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
DatasetFactory.getAvailableDatasets = function () {
	return [];
};

/**
 * Retorna um Objeto representando uma constraint. Usado para criar constraints para a funÃ§Ã£o <code>getDataset</code>.  <b><u>Usar no HTML de qualquer fichÃ¡rio</u></b>.<br>
 *<u>O arquivo vcXMLRPC.js precisa ser declarado</u><br>
 *&lt;script&gt; type="text/javascript" src="/webdesk/vcXMLRPC.js"&gt;&lt;/script&gt;
 *<pre>
 *Exemplo:
 *  var c1 = DatasetFactory.createConstraint("colleagueName", "Alberto", "Claudio", ConstraintType.MUST);
 *  var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", "adm", "adm", ConstraintType.MUST);
 *  var c1 = DatasetFactory.createConstraint("valor", "100", "999", ConstraintType.MUST_NOT);
 *</pre>

 * @memberOf DatasetFactory
 * @param {String} campo Nome do campo
 * @param {String} valorInicial Valor inicial
 * @param {String} valorFinal Valor Final
 * @param {ConstraintType} tipo Tipo da constraint. ConstraintType.MUST, ConstraintType.SHOULD ou ConstraintType.MUST_NOT.
 * @returns {Object} Objecto representando a constraint com os parametros informados
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
DatasetFactory.createConstraint = function (campo, valorInicial, valorFinal, tipo) {
	return new Object();
};

/**
 * Pesquisa os dados de um dataset.<code>getDataset</code>.  <b><u>Usar no HTML de qualquer fichÃ¡rio</u></b>.<br>
 *<u>O arquivo vcXMLRPC.js precisa ser declarado</u><br>
 *&lt;script&gt; type="text/javascript" src="/webdesk/vcXMLRPC.js"&gt;&lt;/script&gt;
 *<pre>
 *Exemplo:
 *  var c1 = DatasetFactory.createConstraint("colleaguePK.colleagueId", "adm", "adm", ConstraintType.MUST);
 *  var filtro = new Array();
 *  filtro[0] = c1;
 *  var dataset = DatasetFactory.getDataset("colleague", new Array("colleagueName"), filtro, null);
 *</pre>
 * @memberOf DatasetFactory
 * @param {String} nomeDataset Nomde do dataset para efetuar a pesquisa
 * @param {Array} campos Array com a lista de campos a serem retornados. Passar <code>null</code> para retornar todos os campos.
 * @param {Array} constraints Array contendo as constrains ou <code>null</code> para retornar todos os registros.
 * @param {Array} ordem Array com campos para ordenar o resultado da pesquisa.
 * @returns {Dataset} Array de objetos representando o dataset consultado.
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
DatasetFactory.getDataset = function (nomeDataset, campos, constraints, ordem) {
	return new Dataset();
};

/**
 * Objeto que possibilita a criaÃ§Ã£o de datasets customizados.
 * <b><u>Usar somente em datasets customizados</u></b>.
 * @super DatasetBuilder
 * @memberOf DatasetBuilder
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
DatasetBuilder.prototype = new Object();

/**
 * Cria um novo Dataset.
 * <b><u>Usar somente em datasets customizados</u></b>.
 *<pre>
 *Exemplo:
 *  var dataset =  DatasetBuilder.newDataset();
 *  dataset.addColumn("Coluna1");
 *  dataset.addColumn("Coluna2");
 *  dataset.addRow(new Array("Valor coluna 1", "Valor coluna 2"));
 *</pre>
 * @memberOf DatasetBuilder
 * @returns {Dataset} Novo dataset
 * @since   Fluig 1.3
 * @see    http://www.fluig.com
 */
DatasetBuilder.newDataset = function () {
	return new Dataset();
};

/**
 * Cria um campo na estrutura do dataset.
 *<pre>
 *Exemplo:
 *  addColumn("Nome");
 *</pre>
 * @param {String} valor Nome da coluna.
 * @since   fluig 1.5.5
 * @see    http://www.fluig.com
 */
addColumn = function (nome) {};

/**
 * Cria um campo na estrutura do dataset definindo seu tipo.
 *<pre>
 *Exemplo:
 *  addColumn("Idade", DatasetFieldType.NUMBER );
 *</pre>
 * @param {String} valor Nome da coluna.
 * @param {DatasetFieldType} tipo Tipo da coluna
 * @since   fluig 1.5.5
 * @see    http://www.fluig.com
 */
addColumn = function (nome, tipo) {};

/**
 * Cria um ou mais indice para maior performance na consultas do dataset
 *<pre>
 *Exemplo:
 *  addIndex(new Array("Coluna1", "Coluna2"));
 *</pre>
 * @param {Array} valores Array contendo os nomes das colunas que irÃ£o fazer parte do indice.
 * @since   fluig 1.5.5
 * @see    http://www.fluig.com
 */
addIndex = function (valores) {};

/**
 * Cria a chave principal do dataset para uso das funÃ§Ãµes updateRecord deleteRecord addOrUpdate
 * do dataset sincronizado.
 *<pre>
 *Exemplo:
 *  setKey(new Array("Coluna1", "Coluna2"));
 *</pre>
 * @param {Array} valores Array contendo os nomes das colunas que irÃ£o fazer parte da chave princiopal.
 * @since   fluig 1.5.5
 * @see    http://www.fluig.com
 */
setKey = function (valores) {};
