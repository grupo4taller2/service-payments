Feature: Creacion de un payment
  Como usuario quiero poder obtener las transacciones realizadas en las
  ultimas 24 horas

  Scenario: Creacion exitosa de un payment y obtener la transaccion realizada en las ultimas 24 horas
    Given Se crea una nueva wallet para el pasajero 'transaction24_rider'
        And Se crea una nueva wallet para el conductor 'transaction24_driver'
    When Quiero crear un nuevo payment del pasajero 'transaction24_rider' al conductor 'transaction24_driver' de 0.1 ETH
    Then Obtengo la transaccion realizada en las ultimas 24 horas por el pasajero 'transaction24_rider' al conductor 'transaction24_driver'