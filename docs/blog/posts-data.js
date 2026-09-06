/**
 * ==============================================================================
 * SINGLE SOURCE OF TRUTH (BLOG POSTS DATA)
 * ==============================================================================
 * Yeni bir makale eklediğinizde sadece bu dosyaya yeni bir obje eklemeniz yeterlidir.
 * Anasayfa kartları, makale sayacı, arama indeksi ve etiket bulutu otomatik güncellenir.
 * 
 * Obje Yapısı:
 * {
 *     title: "Makale Başlığı",
 *     href: "./blog/page/<kategori>/<dosya_adi>.html",
 *     date: "Month Day, Year",
 *     readingTime: "X min read",
 *     excerpt: "Kısa özet metni...",
 *     category: "Systems" | "Architecture" | "DevOps & Cloud" | "Projects",
 *     tags: ["Tag1", "Tag2", ...]
 * }
 * ==============================================================================
 */

window.BLOG_POSTS = [
    {
        title: "Container Nedir? Linux Kernel'inin Sağladığı İzolasyonu Sıfırdan Anlamak",
        href: "./blog/page/systems/container_isolation_in_linux.html",
        date: "September 5, 2026",
        readingTime: "10 min read",
        excerpt: "Docker, Linux üzerinde kendi kaynakları için izolasyonu nasıl sağlıyor? Linux kernel'inin namespaces, cgroups v2, pivot_root ve veth/NAT gibi temel mekanizmalarını sıfırdan bir Go projesi geliştirerek inceliyoruz.",
        category: "Systems",
        tags: ["Linux Kernel", "Containers", "Docker", "Go", "Cgroups"]
    },
    {
        title: "SpendSync: Kurumsal Harcama Platformu Mimari Notları ve Trade-off'lar",
        href: "./blog/page/projects/spend_sync_trade_off.html",
        date: "August 26, 2026",
        readingTime: "15 min read",
        excerpt: "Kurumsal düzeyde Tedarik ve Harcama Yönetim Platformu SpendSync'in mimari kararları: Modüler monolith, ThreadLocal ile multi-tenant izolasyonu, Redis Sliding Window Rate Limiter, Pessimistic Lock ile double-spending önleme, 3-Way Matching ve Testcontainers.",
        category: "Projects",
        tags: ["Java", "Spring Boot", "Modular Monolith", "Redis", "PostgreSQL"]
    },
    {
        title: "TCP'den HTTP'ye: Bir Veri Paketinin Yolculuğu",
        href: "./blog/page/systems/tcp_to_http.html",
        date: "August 10, 2026",
        readingTime: "15 min read",
        excerpt: "Bir butona tıklıyoruz, yarım saniye sonra ekranda veri beliriyor. Ama o yarım saniyede tam olarak ne oluyor? TCP'nin three-way handshake'inden HTTP'nin request-response döngüsüne, bir veri paketinin internet üzerindeki yolculuğunu katman katman inceliyoruz.",
        category: "Systems",
        tags: ["TCP", "HTTP", "Networking", "Backend", "Go"]
    },
    {
        title: "Context Propagation in Go: What I Learned From a Missed PR",
        href: "./blog/page/systems/context_propagation_go.html",
        date: "April 30, 2026",
        readingTime: "6 min read",
        excerpt: "I picked up an open-source issue about adding Context propagation to a REST API, spent three weeks researching it and then missed the PR. Here's everything I learned anyway.",
        category: "Systems",
        tags: ["Go", "Context", "REST API", "Open Source", "Backend"]
    },
    {
        title: "The Ledger Project and What I Learned",
        href: "./blog/page/projects/the_ledger_project.html",
        date: "April 27, 2026",
        readingTime: "8 min read",
        excerpt: "The Ledger project is a modular monolithic financial ledger system designed for atomic transactions, consistent double-entry accounting, and high-concurrency reliability. By implementing double-entry bookkeeping and pessimistic locking, it ensures that not a single cent is lost.",
        category: "Projects",
        tags: ["Clean Architecture", "Fintech", "System Design", "Java"]
    },
    {
        title: "CQRS - gRPC - Design Patterns | Patient Management Feature",
        href: "./blog/page/architecture/cqrs_grpc_design_patterns.html",
        date: "April 20, 2026",
        readingTime: "20 min read",
        excerpt: "Transitioning from a monolithic mindset to microservices was a journey of solving real architectural challenges. This post explores my implementation of CQRS, gRPC, and the Outbox pattern in the Patient Management project.",
        category: "Architecture",
        tags: ["CQRS", "gRPC", "Saga Pattern", "Architecture"]
    },
    {
        title: "A Junior Perspective | Securepay",
        href: "./blog/page/projects/securepay-overview.html",
        date: "April 17, 2026",
        readingTime: "5 min read",
        excerpt: "Securepay project is a basic simulation of how to create a reliable, scalable and maintainable system from my perspective. I decided to publish a blog about what I've learned from this project.",
        category: "Projects",
        tags: ["Backend", "Architecture", "Microservices", "Security"]
    },
    {
        title: "HIS v1.0: A Deep System Design Overview",
        href: "./blog/page/projects/his_overview.html",
        date: "April 9, 2026",
        readingTime: "12 min read",
        excerpt: "A deep system design analysis of a production-grade, event-driven Hospital Information System. Covers the full microservices topology, schema isolation, Outbox Pattern, Dead Letter Queues, three-layer security, and the full observability stack.",
        category: "Projects",
        tags: ["Microservices", "Spring Boot", "Kafka", "Architecture"]
    },
    {
        title: "Strategy Pattern",
        href: "./blog/page/architecture/strategy_pattern.html",
        date: "April 7, 2026",
        readingTime: "5 min read",
        excerpt: "If you have ever worked on a billing system, you know the nightmare: every insurance provider has different rules. Some cover 80%, some have fixed discounts, and some cover nothing at all.",
        category: "Architecture",
        tags: ["Microservices", "Strategy Pattern", "Algorithm", "Spring Boot"]
    },
    {
        title: "Why gRPC over REST",
        href: "./blog/page/architecture/why-grpc-over-rest.html",
        date: "April 7, 2026",
        readingTime: "5 min read",
        excerpt: "If you have spent more than five minutes in microservices development, your default answer for service-to-service communication is probably REST. It is simple, human-readable, and Postman makes it look easy. But as my Hospital Information System grew, I started asking whether easy to read is really more important than hard to break.",
        category: "Architecture",
        tags: ["Microservices", "gRPC", "REST", "Spring Boot"]
    },
    {
        title: "What is DLQ and How I Used It",
        href: "./blog/page/architecture/dlq_pattern.html",
        date: "April 7, 2026",
        readingTime: "5 min read",
        excerpt: "Have you ever seen resilience in any system design book? It's a shortcut to ask what happens to our system when things go wrong, and it is a good question because things will definitely go wrong.",
        category: "Architecture",
        tags: ["Microservices", "DLQ", "Kafka", "Spring Boot"]
    },
    {
        title: "What is Outbox Pattern and How I Used It",
        href: "./blog/page/architecture/outbox_pattern.html",
        date: "April 7, 2026",
        readingTime: "5 min read",
        excerpt: "A deep dive into the Transactional Outbox Pattern. What it is, when to use it, and how I applied it in my Hospital Information System to guarantee reliable, atomic messaging between microservices without the Dual Write Problem.",
        category: "Architecture",
        tags: ["Microservices", "Outbox Pattern", "Kafka", "Spring Boot"]
    },
    {
        title: "P95 Latency Explained: What It Is and Why It Matters",
        href: "./blog/page/architecture/p95_latency.html",
        date: "February 27, 2026",
        readingTime: "5 min read",
        excerpt: "Average latency is almost always a lie. P95 latency tells you a much more honest story. Learn what the 95th percentile means, why averages mislead you, and how to use percentile metrics to understand your system's real-world performance.",
        category: "Architecture",
        tags: ["Performance", "Observability", "Backend", "SRE"]
    },
    {
        title: "Lessons from the Trenches: What I Learned Implementing SPIFFE/SPIRE in SecurePay",
        href: "./blog/page/devops-cloud/spiffe_spire_deep_dive.html",
        date: "February 18, 2026",
        readingTime: "15 min read",
        excerpt: "Zero-Trust isn't just a buzzword. Here's a brief explanation of what I've learned about workload identity, SPIFFE/SPIRE architecture, and handling mTLS at scale while building the SecurePay project.",
        category: "DevOps & Cloud",
        tags: ["Security", "Zero Trust", "SPIFFE", "Cloud Native"]
    },
    {
        title: "Engineering SecurePay: A Deep Dive into Zero-Trust, Event-Driven Fintech Architecture",
        href: "./blog/page/projects/securepay_architecture.html",
        date: "February 18, 2026",
        readingTime: "10 min read",
        excerpt: "Pulling back the curtain on the architectural journey of building SecurePay, a high-performance, polyglot payment platform. Explore Zero-Trust security with SPIFFE/SPIRE, event-driven orchestration with Kafka, and cloud-native infrastructure on AWS.",
        category: "Projects",
        tags: ["Go", "Zero Trust", "Kafka", "AWS"]
    },
    {
        title: "Cloudflare Tunnel: Secure Infrastructure Connectivity Without Public IP",
        href: "./blog/page/devops-cloud/cloudflare_tunnel.html",
        date: "February 15, 2026",
        readingTime: "7 min read",
        excerpt: "Discover how Cloudflare Tunnel provides a secure way to connect your resources to Cloudflare without exposing public IP addresses. Learn about outbound-only connections, attack surface reduction, and why it's essential for modern infrastructure security.",
        category: "DevOps & Cloud",
        tags: ["Cloudflare", "Security", "DevOps", "Zero Trust"]
    },
    {
        title: "PostgreSQL Internals: Understanding Database Architecture & MVCC",
        href: "./blog/page/systems/postgresql_internals.html",
        date: "February 14, 2026",
        readingTime: "15 min read",
        excerpt: "Deep dive into PostgreSQL's internal architecture covering PGDATA, database clusters, system catalogs, schemas, tablespaces, and the Postmaster process. Explore MVCC, transaction IDs, isolation levels, and high concurrency without blocking readers.",
        category: "Systems",
        tags: ["PostgreSQL", "Database Internals", "MVCC", "Transaction Isolation"]
    },
    {
        title: "Kubernetes Internals: Resource Management & Kernel Interaction",
        href: "./blog/page/devops-cloud/kubernetes_internals.html",
        date: "February 11, 2026",
        readingTime: "12 min read",
        excerpt: "Deep dive into how Kubernetes translates YAML definitions into Linux kernel instructions. Explore the OOM killer mechanism, CPU throttling with CFS, scheduler filtering and scoring logic, and kubelet eviction policies.",
        category: "DevOps & Cloud",
        tags: ["Kubernetes", "Linux Kernel", "Container Orchestration", "DevOps"]
    },
    {
        title: "Kubernetes Resource Management: Hands-On Practice",
        href: "./blog/page/devops-cloud/kubernetes_resource_management_hands_on.html",
        date: "February 11, 2026",
        readingTime: "6 min read",
        excerpt: "Ready to get your hands dirty? This practical guide walks you through simple exercises to understand how resource requests and limits work in real scenarios with beginner-friendly practice.",
        category: "DevOps & Cloud",
        tags: ["Kubernetes", "Hands-On", "Tutorial", "DevOps"]
    },
    {
        title: "AWS Well-Architected Framework",
        href: "./blog/page/devops-cloud/aws_well_architected_framework.html",
        date: "February 6, 2026",
        readingTime: "8 min read",
        excerpt: "A comprehensive guide to AWS Well-Architected Framework covering all six pillars: Operational Excellence, Security, Reliability, Performance Efficiency, Cost Optimization, and Sustainability.",
        category: "DevOps & Cloud",
        tags: ["AWS", "Cloud Architecture", "DevOps", "Best Practices"]
    },
    {
        title: "Building a Microservices Architecture: My Patient Management Journey",
        href: "./blog/page/projects/patient_management_blog_0.html",
        date: "November 1, 2025",
        readingTime: "4 min read",
        excerpt: "The story behind designing and implementing a microservices-based patient management system using Spring Boot, PostgreSQL, Kafka and more.",
        category: "Projects",
        tags: ["Spring Boot", "Microservices", "PostgreSQL", "Kafka"]
    }
];
