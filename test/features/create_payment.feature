Feature: Creacion de un payment
  Como pasajero quiero poder crear un payment
  para poder pagarle al conductor.

  Scenario: Creacion exitosa de un payment
    Given Hay una wallet creada para el pasajero 'payment_rider'
        And Hay una wallet creada para el conductor 'payment_driver'
    When Quiero crear un payment del usuario 'payment_rider' al usuario 'payment_driver' de 0.1 ETH
    Then 'payment_driver' tiene un saldo por cobrar de 0.08 ETH