#!/bin/bash

# Sistema de Gestión de Visitantes del Condominio - Script de Verificación

echo "=== Verificación del Sistema de Gestión de Visitantes del Condominio ==="
echo

# Verificar estructura de directorios
echo "1. Verificando estructura de directorios..."
REQUIRED_DIRS=(
    "src"
    "src/config"
    "src/controllers"
    "src/models"
    "src/routes"
    "src/middleware"
    "database"
    "wordpress-plugin"
    "wordpress-plugin/assets"
    "wordpress-plugin/assets/css"
    "wordpress-plugin/assets/js"
    "wordpress-plugin/templates"
)

for dir in "${REQUIRED_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        echo "  ✓ $dir"
    else
        echo "  ✗ $dir (FALTANTE)"
    fi
done

echo

# Verificar archivos requeridos
echo "2. Verificando archivos requeridos..."
REQUIRED_FILES=(
    "package.json"
    "src/index.js"
    "src/config/database.js"
    "src/config/swagger.js"
    "src/models/Visitor.js"
    "src/controllers/visitorController.js"
    "src/routes/visitorRoutes.js"
    "src/middleware/cors.js"
    "database/schema.sql"
    "README.md"
    "SUMMARY.md"
    ".env.example"
    "wordpress-plugin/condo-visitor-management.php"
    "wordpress-plugin/assets/css/style.css"
    "wordpress-plugin/assets/js/script.js"
    "wordpress-plugin/templates/resident-form.php"
    "wordpress-plugin/templates/security-dashboard.php"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo "  ✓ $file"
    else
        echo "  ✗ $file (FALTANTE)"
    fi
done

echo

# Verificar dependencias de Node.js
echo "3. Verificando dependencias de Node.js..."
if command -v npm &> /dev/null; then
    echo "  Versión de npm: $(npm --version)"
    
    # Verificar si existe package-lock.json
    if [ -f "package-lock.json" ]; then
        echo "  ✓ Dependencias instaladas"
    else
        echo "  ! Dependencias no instaladas (ejecute 'npm install')"
    fi
else
    echo "  ✗ npm no encontrado"
fi

echo

# Verificar si Node.js está instalado
if command -v node &> /dev/null; then
    echo "  Versión de Node.js: $(node --version)"
else
    echo "  ✗ Node.js no encontrado"
fi

echo

echo "=== Verificación Completa ==="
echo
echo "Próximos pasos:"
echo "1. Ejecute 'npm install' para instalar dependencias"
echo "2. Cree el archivo .env basado en .env.example"
echo "3. Configure las tablas de base de datos usando database/schema.sql"
echo "4. Inicie el servidor con 'npm start'"
echo "5. Acceda a la documentación de la API en http://localhost:3000/visit/api-docs"