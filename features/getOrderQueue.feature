@orderQueue
Feature: Listar Fila De Pedidos

  @listarSemIdScenario
  Scenario: Listar fila de pedidos sem ID
    Given inicio a listagem de queue
    When eu busco pela informacao de pedidos sem passar o id
    Then o resultado deve ser de sucesso
    And deve retornar dois itens
  
  @listarComIdValidoScenario
  Scenario: Listar fila de pedidos passando um ID existente
    Given inicio a listagem de queue
    When eu busco pela informacao de pedidos passando o id 1 como parametro
    Then o resultado deve ser de sucesso
    And deve retornar um item

  @listarComIdInvalidoScenario
  Scenario: Listar fila de pedidos passando um ID inexistente
    Given inicio a listagem de queue
    When eu busco pela informacao de pedidos passando o id 3 não existente como parametro
    Then o resultado deve retornar erro

  @listarSimulandoErroScenario
  Scenario: Listar fila de pedidos simulando um erro
    Given inicio a listagem de queue
    When eu busco pela informacao de pedidos e existe erro na conexão com o banco de dados
    Then o resultado deve retornar erro