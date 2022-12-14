Feature: Creacion de un payment
  Como usuario quiero poder obtener las transacciones que he realizado

  Scenario: Creacion exitosa de un payment y obtner la transaccion realizada
    Given Se crea una wallet para el pasajero 'transaction_rider'
        And Se crea una wallet para el conductor 'transaction_driver'
    When Quiero crear un payment del pasajero 'transaction_rider' al conductor 'transaction_driver' de 0.1 ETH
    Then Obtengo la transaccion realizada por el pasajero 'transaction_rider' al conductor 'transaction_driver'