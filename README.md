<div align="center">

# 🏫 Escuela San Gerardo
### Landing Page Institucional · Ciudad Quesada, San Carlos

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Responsive](https://img.shields.io/badge/Responsive-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)
![Accessibility](https://img.shields.io/badge/Accesibilidad-0057b7?style=for-the-badge&logo=accessible-icon&logoColor=white)

---

> **🎁 Este proyecto es una Landing Page completamente donada a la Escuela San Gerardo,**
> **como contribución voluntaria a la comunidad educativa de Ciudad Quesada, San Carlos, Costa Rica.**

---

</div>

## 📋 Información del Laboratorio

| Campo | Detalle |
|---|---|
| 👨‍💻 **Autor** | Byron Bolaños Zamora |
| 📚 **Curso** | Ambiente Web I |
| 🔖 **Código** | ISW-521 |
| 🧪 **Tipo** | Laboratorio |
| 📅 **Año** | 2026 |
| 🎁 **Donación** | Landing page completamente donada |

---

## 🌐 Sobre el Proyecto

Landing page institucional desarrollada para la **Escuela San Gerardo**, centro educativo público ubicado en Ciudad Quesada, Circuito 14, con código institucional 1630.

El sitio fue construido desde cero con tecnologías web nativas — sin frameworks, sin dependencias externas — priorizando **rendimiento**, **accesibilidad** y **diseño profesional**.

---

## ✨ Características

### 🎨 Diseño y UX
- ✅ Diseño inspirado en Apple — tipografía limpia, espaciado generoso y jerarquía visual clara
- ✅ Gradientes y grilla de fondo en la sección hero al estilo glassmorphism
- ✅ Efecto **tilt 3D** en la imagen hero al pasar el cursor (solo en escritorio)
- ✅ Animaciones de entrada `reveal on scroll` con `IntersectionObserver`
- ✅ Header fijo con **efecto frosted glass** (`backdrop-filter`) al hacer scroll
- ✅ Transiciones suaves en todos los elementos interactivos

### 📱 Responsive
- ✅ Diseño completamente adaptable — mobile first
- ✅ Menú hamburguesa animado con apertura/cierre fluido en móvil
- ✅ Breakpoints en `780px` y `640px`
- ✅ Grid y Flexbox adaptativos en todas las secciones

### ♿ Accesibilidad (A11y)
- ✅ **Widget de accesibilidad flotante** — controles de tamaño de fuente (`A-` / `A` / `A+`)
- ✅ Escala de fuente persistente en `localStorage`
- ✅ Soporte completo para `prefers-reduced-motion`
- ✅ Atributos `aria-label`, `aria-expanded`, `aria-current` en toda la navegación
- ✅ Skip link "Saltar al contenido principal" para lectores de pantalla
- ✅ `focus-visible` con anillos de foco visibles en todos los controles

### 🔍 SEO & Metadatos
- ✅ Meta tags Open Graph (`og:title`, `og:description`, `og:image`)
- ✅ Datos estructurados **JSON-LD Schema.org** (`EducationalOrganization`)
- ✅ Meta `robots`, `author`, `canonical` y `description`
- ✅ `lang="es-CR"` para localización correcta

### 🗂️ Secciones
| # | Sección | Descripción |
|---|---|---|
| 1 | 🏠 **Inicio (Hero)** | Presentación principal con imagen 3D y CTA de contacto |
| 2 | ℹ️ **Información** | Datos institucionales, circuito y código MEP |
| 3 | 🎥 **Video** | Video institucional embebido con `autoplay` y `muted` |
| 4 | 📞 **Contacto** | Correo, teléfono y enlace a Google Maps |
| 5 | 🤝 **Comunidad** | Información sobre voluntariados y TCU |
| 6 | 🕒 **Horario** | Horario de atención de lunes a viernes |

---

## 🛠️ Stack Tecnológico

### Distribución por líneas de código

```
🟧 HTML5      ████████░░░░░░░░░░░░  23%  (191 líneas)
🟦 CSS3       ████████████████████  61%  (500 líneas)
🟨 JavaScript ██████░░░░░░░░░░░░░░  16%  (131 líneas)
```

### Distribución por peso (bytes)

```
🟧 HTML5      ██████████░░░░░░░░░░  31%  (8.65 KB)
🟦 CSS3       █████████████████░░░  53%  (14.9 KB)
🟨 JavaScript ██████░░░░░░░░░░░░░░  16%  (4.76 KB)
```

### Tecnologías y APIs nativas utilizadas

| Tecnología | Uso |
|---|---|
| **HTML5 Semántico** | `header`, `main`, `section`, `footer`, `nav`, `address` |
| **CSS Custom Properties** | Sistema de tokens de diseño (`--blue-800`, `--radius`, etc.) |
| **CSS Grid & Flexbox** | Layout principal y componentes |
| **CSS `clamp()`** | Tipografía fluida escalable |
| **CSS `backdrop-filter`** | Efecto frosted glass en header y panel |
| **`IntersectionObserver`** | Animaciones reveal on scroll + enlace activo |
| **`matchMedia`** | Detección de `prefers-reduced-motion` y `hover: hover` |
| **`localStorage`** | Persistencia de preferencias de tamaño de fuente |
| **JSON-LD (Schema.org)** | Datos estructurados para SEO |
| **Open Graph** | Meta tags para redes sociales |

---

## 📁 Estructura del Proyecto

```
isw521-Landing-Page-Laboratorio/
│
├── 📄 index.html              ← Estructura semántica HTML5
├── 🎨 styles.css              ← Estilos, tokens, responsive y animaciones
├── ⚙️  main.js                 ← Lógica: scroll, tilt 3D, accesibilidad, menú
│
└── 📂 assets/
    └── 📂 images/
        ├── 🖼️  logo/           ← Logotipo institucional
        ├── 🖼️  estudiantes.png ← Imagen del hero
        ├── 🖼️  logo3d.png      ← Logo 3D para sección comunidad
        ├── 📂 iconos/          ← Íconos de contacto (correo, teléfono, ubicación)
        └── 📂 video/           ← Video institucional (.mp4)
```

---

## 🚀 Cómo usar

No requiere instalación ni dependencias. Solo abre el archivo en tu navegador:

```bash
# Opción 1 — Abrir directamente
open index.html

# Opción 2 — Servidor local con Python
python3 -m http.server 3000

# Opción 3 — Live Server (VS Code)
# Click derecho en index.html → "Open with Live Server"
```

---

## 📜 Historial de versiones

| Commit | Descripción |
|---|---|
| `2509708` | fix: corrección de bugs de accesibilidad |
| `de1ef8d` | fix: mejoras de rendimiento en frames |
| `2e48239` | fix: corrección de bugs responsive |
| `600b83f` | feat: controles de accesibilidad y animaciones v2 |
| `773c6b1` | style: diseño visual responsive inspirado en Apple v2 |
| `4eb9101` | feat: estructura semántica HTML5 v2 |
| `a087836` | feat: estructura inicial de la landing page |
| `b80dd57` | Base: primer wireframe con mocks |

---

## 🎁 Nota de Donación

> Este sitio web fue **desarrollado y donado de forma voluntaria** a la Escuela San Gerardo
> como parte del laboratorio del curso **Ambiente Web I (ISW-521)**.
>
> El código es de uso libre para la institución. No se requiere atribución.

---

<div align="center">

Hecho por **Byron Bolaños Zamora** · ISW-521 Ambiente Web I

</div>
