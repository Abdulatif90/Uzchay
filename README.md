  Uzchay Backend – Restaurant Platform uzchay.uz

  Project Overview
Uzchay Backend is the server-side application for the  Uzchay Restaurant platform , handling:

- User and member management  
- Product and order management  
- Restaurant operations  
- Real-time notifications and chat  
- Admin functionalities  

This backend is built with  Node.js, TypeScript, Express, MongoDB , and  Socket.io , designed for scalability, maintainability, and high performance.

---

  Tech Stack

 Frameworks & Libraries 
- Node.js + TypeScript – backend language & type safety  
- Express – server and routing  
- MongoDB + Mongoose – database & ODM  
- Socket.io – real-time communication  
- EJS – server-side templating  
- Moment.js – date/time handling  
- Bcryptjs – password hashing  
- JSON Web Token (JWT) – authentication  
- Multer – file uploads  
- UUID – unique identifiers  
- FS-extra – file system utilities  

 Dev & Tools 
- Nodemon – live reloading during development  
- Cross-env – environment management  
- Docker + Docker Compose – containerized deployment  
- Nginx – reverse proxy  
- PM2 – process manager  
- Firewall – production security 


---

  Main Features

-  Authentication & Authorization 
  - JWT-based login and registration  
  - Role-based access control (Admin/User)  

-  Product & Order Management 
  - CRUD operations for products  
  - Orders with multiple items and total calculation  
  - Basket management  

-  Member & User Management 
  - Member profiles, roles, and permissions  
  - Admin user management  

-  Restaurant Management 
  - Restaurant info management  
  - Menu management  

-  Real-Time Communication 
  - Socket.io for live order updates and notifications  

-  File Uploads & Media 
  - Multer for images, documents, and media files  

-  Logging & Error Handling 
  - Morgan for request logging  
  - Centralized error handling with custom Error classes  

---

  Architecture & Data Flow

   1️⃣ Request Flow
Client → Express Router → Controller → Service → Database → Response
- Controllers handle request validation and routing  
- Services contain business logic and database interaction  
- MongoDB with Mongoose handles data storage and relations  

   2️⃣ Real-Time Flow

Client Socket → Socket.io → Server → Emit Updates → Clients

- Real-time notifications for orders, status changes, and chat  

   3️⃣ Error & Logging Flow
- All errors handled in `libs/utils/Errors.ts`  
- Logging with Morgan for monitoring requests  

---

  Key Decisions

| Decision | Reason |
|----------|--------|
| Node.js + TypeScript | Scalable, maintainable backend with type safety |
| Express | Simple, modular routing and middleware support |
| MongoDB + Mongoose | Flexible document-based DB with schema validation |
| Socket.io | Real-time features like notifications and chat |
| EJS Templates | Server-side rendering for some pages |
| Docker + Docker Compose | Containerized deployment for production |
| PM2 | Process management, zero-downtime reload |
| Nginx & Firewall | Security, reverse proxy, SSL termination |

---

  Deployment & Infrastructure

- Dockerized backend with `docker-compose`  
- PM2 for process management  
- Nginx as reverse proxy with firewall rules  
- Ready for production load and real-time scaling  
- Environment variables via `.env` (dotenv & cross-env)  

---

  Future Improvements

- Migrate EJS views to React SSR or Next.js for SEO & performance  
- Full TypeScript typing for all services and models  
- Unit and integration testing coverage with Jest  
- Advanced caching for queries and responses  
- Improved logging and monitoring (Sentry / Winston)  
- API versioning and modular microservices support
