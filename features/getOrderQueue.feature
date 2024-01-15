@orderQueue
Feature: Listar Fila De Pedidos
  
    This feature will list a queue of orders without ID
  
    Scenario: Listar fila de pedidos sem ID
    Given inicio a listagem de queue sem passar ID
    When eu busco pela informacao de pedidos sem passar o id
    Then o resultado deve ser de sucesso
