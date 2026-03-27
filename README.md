# 🎲 Generador y Analizador de Números Pseudoaleatorios

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

📖 **[Ver Manual de Usuario](https://docs.google.com/document/d/1iZHUzVeRkD2zG4jbmzTSvAfHUOksLigk/edit)** 

Una aplicación web moderna e interactiva diseñada para la generación, visualización y evaluación estadística de números pseudoaleatorios. Este proyecto de simulación permite a los usuarios experimentar con diferentes algoritmos de generación matemática y someter los resultados a rigurosas pruebas de uniformidad e independencia.

---

## 🎓 Información del Proyecto

**Asignatura:** SIMULACIÓN DE COMPUTADORES  
**Código:** 8108278 | **Grupo:** 2-0  
**Docente:** Ing. JOSE OSBALDO ROJAS MORENO  
**Fase:** Proyecto del 1er 50%  

### 👨‍💻 Integrantes
| Nombre | Código | Correo Institucional |
| :--- | :--- | :--- |
| **Camilo Andres Arias Tenjo** | 202210549 | camilo.arias@uptc.edu.co |
| **Jose Ortega Luis Castillo** | 202210773 | jose.ortega01@uptc.edu.co |

---

## ✨ Funcionalidades Principales

### ⚙️ Generadores de Números
* **Congruencial Lineal:** Generación mediante la relación de recurrencia lineal clásica.
* **Congruencial Multiplicativo:** Variante que utiliza un multiplicador puro para secuencias específicas.
* **Cuadrados Medios:** Método basado en extraer los dígitos centrales del cuadrado de un número semilla.

### 🧪 Pruebas Estadísticas Interactivas
Cada prueba incluye tooltips educativos informativos (condición de rechazo de $H_0$) y tablas de frecuencia dinámicas.
* **Prueba de Chi-Cuadrado ($\chi^2$):** Evaluación de la bondad de ajuste mediante conteo empírico por intervalos.
* **Kolmogorov-Smirnov (K-S):** Análisis de diferencias máximas entre la distribución teórica y la distribución de frecuencias reales.
* **Prueba de Póker:** Validación de independencia probabilística mediante el análisis de configuraciones de "manos".

### 📊 Panel Gráfico Interactivo (Carrusel)
Un carrusel animado de 5 dimensiones visuales impulsado por visualizaciones avanzadas en `recharts`:
1. **Gráfico de Dispersión (Scatter):** Evalúa visualmente la densidad estocástica básica.
2. **Lag Plot (Gráfico de Retraso):** Ayuda a detectar autocorrelaciones marcando $X_i$ frente a $X_{i+1}$.
3. **Histograma de Frecuencias:** Corrobora gráficamente la uniformidad esperada en los intervalos (aplanamiento).
4. **Línea de Tendencia:** Muestra las fluctuaciones macroscópicas a lo largo de las iteraciones.
5. **Media Acumulada:** Demuestra el teorema del límite central confirmando la convergencia asintótica del promedio hacia $0.5$.

### 🎨 UI/UX y Enfoque Educativo
* Diseño oscuro ("Dark Mode") elegante, utilizando temas condicionales y animaciones fluidas (`framer-motion`).
* Explicaciones informativas integradas sobre el concepto del **Periodo** de vida útil de un generador (Completos vs Incompletos).

---

## 🚀 Ejecución y Desarrollo

1. **Instalar dependencias necesarias:**
   ```bash
   npm install
   ```
2. **Ejecutar el entorno en modo desarrollo:**
   ```bash
   npm run dev
   ```

> [!NOTE]
> Este proyecto ha sido construido estructurando tecnologías modernas en el Frontend (React, Vite, Tailwind CSS 4) aplicado al cálculo algorítmico y estadístico.

