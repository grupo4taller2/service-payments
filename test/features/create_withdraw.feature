Feature: Creacion de un withdraw
  Como usuario quiero poder crear un withdraw
  para poder retirar todo mi dinero ganado.

  Scenario: Creacion exitosa de un withdraw
    Given Hay una wallet withdraw creada para el conductor 'new_driver'
        And Hay una wallet withdraw creada para el pasajero 'new_rider'
        And El conductor 'new_driver' recibe un payment de parte de 'new_rider'
    When Quiero crear un withdraw al usuario 'new_driver'
    Then Se crea un withdraw de manera exitosa y retire todos los fondos de 'new_driver'