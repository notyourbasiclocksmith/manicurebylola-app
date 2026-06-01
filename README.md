# Manicure by Lola

Sitio web profesional para un negocio de uñas: servicios y precios, galería,
reservas en línea con **depósito vía Stripe**, y un **panel de administración**
para que Lola gestione citas, precios, fotos y horarios.

- **Framework:** Next.js 14 (App Router) + TypeScript
- **Estilos:** Tailwind CSS v4 (paleta rosa nude / dorado / beige) — mobile-first
- **Base de datos:** PostgreSQL con Prisma
- **Pagos:** Stripe Checkout (tarjeta + Apple Pay / Google Pay automáticos)
- **Hosting:** Render (Web Service + PostgreSQL + disco para fotos)

---

## 1. Desarrollo local

```bash
npm install
cp .env.example .env        # y rellena los valores
npm run db:push             # crea las tablas en tu base de datos
npm run db:seed             # carga los 6 servicios y horarios iniciales
npm run dev                 # http://localhost:3000
```

> Necesitas una base de datos PostgreSQL. Para local puedes instalar Postgres,
> usar Docker, o apuntar `DATABASE_URL` a la *External Database URL* de tu base
> de datos de Render.

### Variables de entorno (ver `.env.example`)

| Variable | Para qué |
| --- | --- |
| `DATABASE_URL` | Conexión a PostgreSQL |
| `NEXT_PUBLIC_SITE_URL` | URL pública (ej. `https://manicurebylola.com`) |
| `STRIPE_SECRET_KEY` / `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Claves de Stripe |
| `STRIPE_WEBHOOK_SECRET` | Secreto del webhook de Stripe |
| `ADMIN_PASSWORD` | Contraseña del panel `/admin` |
| `SESSION_SECRET` | Secreto para firmar la sesión admin |
| `UPLOAD_DIR` | Carpeta donde se guardan las fotos subidas |

---

## 2. Personaliza el negocio

Edita **`src/lib/config.ts`** para cambiar teléfono, WhatsApp, Instagram,
ciudad, área de servicio, email y dirección. Es el único archivo que necesitas
tocar para los datos de contacto.

---

## 3. Despliegue en Render

El archivo **`render.yaml`** ya define todo (Web Service + base de datos +
disco persistente para las fotos).

1. Sube este proyecto a un repo de GitHub.
2. En Render: **New → Blueprint** y selecciona el repositorio. Render leerá
   `render.yaml` y creará el servicio web y la base de datos.
3. En **Environment**, rellena las variables marcadas como `sync: false`:
   - `NEXT_PUBLIC_SITE_URL` (tu dominio final)
   - `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`
   - `ADMIN_PASSWORD`
   (`DATABASE_URL`, `SESSION_SECRET` y `UPLOAD_DIR` se configuran solos.)
4. El build corre `prisma db push` automáticamente y crea las tablas en el
   primer deploy. Para cargar los servicios iniciales, abre el **Shell** del
   servicio en Render y ejecuta:
   ```bash
   npm run db:seed
   ```
5. Apunta el dominio `manicurebylola.com` a Render (Settings → Custom Domains).

---

## 4. Configurar Stripe

1. Crea tu cuenta en [stripe.com](https://stripe.com) y copia las claves API.
2. En **Developers → Webhooks**, agrega un endpoint:
   `https://TU-DOMINIO/api/stripe/webhook` y suscríbete al evento
   `checkout.session.completed`. Copia el *Signing secret* a
   `STRIPE_WEBHOOK_SECRET`.
3. Apple Pay / Google Pay aparecen automáticamente en el checkout cuando están
   habilitados en el Dashboard de Stripe y el dominio está verificado.
4. **Zelle / Cash App / efectivo:** son métodos manuales. El cliente envía la
   solicitud y coordina el depósito por WhatsApp; tú marcas la cita como
   confirmada desde el panel.

Mientras no haya claves de Stripe, el formulario de reserva sigue funcionando:
guarda la solicitud y le pide al cliente coordinar el depósito por WhatsApp.

---

## 5. Panel de administración

Entra en **`/admin`** con tu `ADMIN_PASSWORD`. Desde ahí Lola puede:

- **Citas:** ver, confirmar y cancelar; ver el total de depósitos cobrados.
- **Precios:** editar precio, depósito, duración y visibilidad de cada servicio.
- **Galería:** subir fotos (o agregarlas por URL) y clasificarlas por categoría.
- **Horarios:** definir días abiertos y horario de atención.

---

## Estructura

```
src/
  app/
    (site)/        páginas públicas (home, servicios, galería, políticas, contacto, reservar, gracias)
    admin/         login + panel protegido
    api/           bookings, stripe/webhook, admin/*, uploads
  components/      Header, Footer, ServiceCard, admin/*
  lib/             config, prisma, stripe, auth, data, validation
prisma/            schema.prisma + seed.ts
render.yaml        blueprint de despliegue
```
