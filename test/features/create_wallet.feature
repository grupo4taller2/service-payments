Feature: W Creacion de una wallet
  Como usuario quiero poder crear una wallet
  para manejar los saldos.

  Scenario: Creacion exitosa de una wallet
    Given No hay una wallet creada para el usuario 'test_cucu'
    When Quiero crear una wallet para el usuario 'test_cucu'
    Then Una wallet es creada para el usuario 'test_cucu'