const Visitor = require('./src/models/Visitor');

async function testDatabase() {
  try {
    console.log('Probando conexión a la base de datos...');
    
    // Probar creación de visitante único
    const uniqueVisitorId = await Visitor.createUniqueVisitor({
      wp_user_id: 1,
      first_name: 'Juan',
      last_name: 'Pérez',
      id_card: '123456789',
      visit_date: '2023-10-15'
    });
    console.log('Creado visitante único con ID:', uniqueVisitorId);
    
    // Probar creación de visitante frecuente
    const frequentVisitorId = await Visitor.createFrequentVisitor({
      wp_user_id: 1,
      first_name: 'María',
      last_name: 'López',
      id_card: '987654321',
      frequent_visit_description: 'Familia'
    });
    console.log('Creado visitante frecuente con ID:', frequentVisitorId);
    
    // Probar obtención de historial de visitantes
    const history = await Visitor.getVisitorHistory(1);
    console.log('Historial de visitantes para el usuario 1:', history);
    
    // Probar validación de visitante
    const validVisitor = await Visitor.validateVisitor('123456789');
    console.log('Visitante validado:', validVisitor);
    
    // Probar registro de llegada de visitante
    const logId = await Visitor.logVisitorArrival(uniqueVisitorId);
    console.log('Registrada llegada de visitante con ID:', logId);
    
    console.log('¡Todas las pruebas pasaron exitosamente!');
  } catch (error) {
    console.error('Prueba fallida:', error);
  }
}

testDatabase();