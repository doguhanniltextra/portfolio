/**
 * Dynamic Universal Article Layout Engine (Experiment A1)
 * Transforms any legacy blog HTML file into the modern 3-column Sleek Dark Terminal layout.
 * Zero-config, zero-build. Just include: <script src="../../layout.js"></script>
 */

(function () {
    // Determine root URL directly from layout.js location (Bulletproof for file://, http:// and GitHub Pages)
    const currentScript = document.currentScript;
    let rootUrl = '../../../';
    if (currentScript && currentScript.src) {
        rootUrl = currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1);
    }

    const themeUrl = rootUrl + 'terminal-theme.css';
    const indexUrl = rootUrl + 'index.html';

    // Disable legacy stylesheets and inject terminal theme
    function injectStyles() {
        // Disable old light theme CSS files so they don't conflict
        const oldLinks = document.querySelectorAll('link[rel="stylesheet"]');
        oldLinks.forEach(link => {
            const h = link.href.toLowerCase();
            if (h.includes('main.css') || h.includes('blog.css') || h.includes('post.css')) {
                link.disabled = true;
                link.remove();
            }
        });

        // Inject terminal-theme.css
        let themeLink = document.querySelector(`link[href*="terminal-theme.css"]`);
        if (!themeLink) {
            themeLink = document.createElement('link');
            themeLink.rel = 'stylesheet';
            themeLink.href = themeUrl;
            document.head.appendChild(themeLink);
        }

        // Ensure FontAwesome
        const hasFA = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .some(l => l.href.includes('font-awesome'));
        if (!hasFA) {
            const fa = document.createElement('link');
            fa.rel = 'stylesheet';
            fa.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            document.head.appendChild(fa);
        }

        // Ensure Prism Tomorrow theme
        const hasPrism = Array.from(document.querySelectorAll('link[rel="stylesheet"]'))
            .some(l => l.href.includes('prism'));
        if (!hasPrism) {
            const prismCss = document.createElement('link');
            prismCss.rel = 'stylesheet';
            prismCss.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
            document.head.appendChild(prismCss);
        }
    }

    function initLayout() {
        injectStyles();

        // Check if layout already applied
        if (document.querySelector('.app-shell')) return;

        // 1. Extract Post Metadata and Content
        const titleEl = document.querySelector('.post-title-main') || document.querySelector('h1');
        const titleText = titleEl ? titleEl.textContent.trim() : document.title.split('-')[0].trim();

        const timeEl = document.querySelector('.post-meta-top time') || document.querySelector('time');
        const dateText = timeEl ? timeEl.textContent.trim().toLowerCase() : '';

        // Extract Tags
        const rawTags = Array.from(document.querySelectorAll('.post-tags-header .tag, .post-tags .tag, .article-tags .tag-badge'));
        const tags = rawTags.map(t => t.textContent.trim().toLowerCase());

        // Extract Main Article Body
        const rawContent = document.querySelector('.post-content') || document.querySelector('article') || document.querySelector('.blog-post');
        if (!rawContent) return; // Not an article page

        // Automatic Reading Time Calculation (Word count based on 200 wpm)
        const textContent = rawContent.innerText || rawContent.textContent || '';
        const wordCount = textContent.trim().split(/\s+/).filter(Boolean).length;
        const estimatedMinutes = Math.max(1, Math.ceil(wordCount / 200));

        const isTurkish = (document.documentElement.lang || '').toLowerCase().startsWith('tr');
        const readTimeText = isTurkish 
            ? `${estimatedMinutes} dk okuma` 
            : `${estimatedMinutes} min read`;

        // Clean legacy hardcoded inline backgrounds from tables and elements
        rawContent.querySelectorAll('table, tr, td, th, div, span').forEach(el => {
            if (el.style.backgroundColor || el.style.background) {
                el.style.backgroundColor = '';
                el.style.background = '';
            }
            if (el.style.color && (el.style.color.includes('1a1a1a') || el.style.color === '#000' || el.style.color === 'black')) {
                el.style.color = '';
            }
            if (el.style.borderColor) {
                el.style.borderColor = '';
            }
        });

        // Clone content to prevent reference issues
        const articleHTML = rawContent.innerHTML;

        // 2. Hide or remove legacy elements
        const legacyHeaders = document.querySelectorAll('header.header, nav.nav, footer.post-footer, .author-section');
        legacyHeaders.forEach(el => el.remove());

        // 3. Construct the 3-Column Shell
        const shell = document.createElement('div');
        shell.className = 'app-shell';

        shell.innerHTML = `
            <!-- Left Sidebar Navigation -->
            <aside class="site-sidebar">
                <div>
                    <a href="${indexUrl}" class="profile-card">
                        <div class="profile-avatar">D</div>
                        <div class="profile-info">
                            <span class="profile-name">Doguhan Ilter</span>
                            <span class="profile-role">Software Engineer</span>
                        </div>
                    </a>

                    <nav class="nav-menu" aria-label="Main Navigation">
                        <a href="${indexUrl}" class="nav-item active">
                            <i class="fas fa-home"></i>
                            <span>HOME</span>
                        </a>
                    </nav>
                </div>

                <div class="sidebar-footer">
                    <div class="social-links-list">
                        <a href="https://github.com/doguhanniltextra" target="_blank" rel="noopener noreferrer" class="social-link">
                            <span>GITHUB</span>
                            <span class="arrow">&rarr;</span>
                        </a>
                        <a href="https://www.linkedin.com/in/doguhan-ilter/" target="_blank" rel="noopener noreferrer" class="social-link">
                            <span>LINKEDIN</span>
                            <span class="arrow">&rarr;</span>
                        </a>
                        <a href="mailto:doguhannilt@email.com" class="social-link">
                            <span>EMAIL</span>
                            <span class="arrow">&rarr;</span>
                        </a>
                    </div>
                </div>
            </aside>

            <!-- Main Reading Column -->
            <main class="main-wrapper">
                <div class="content-container">
                    <!-- Article Header -->
                    <header class="article-header">
                        <!-- Zen Mode Hint Bar -->
                        <div class="zen-hint-bar" id="zenHintBar" title="Click or press Z to toggle Zen Mode">
                            <i class="fas fa-eye" style="font-size: 11px; opacity: 0.8;"></i>
                            <span class="zen-hint-text">
                                If you don't want to get distracted while reading this blog, press <kbd class="zen-kbd">Z</kbd> for Zen Mode
                            </span>
                        </div>

                        <span class="article-category">BLOG</span>
                        <h1 class="article-title">${titleText}</h1>

                        <div class="article-meta-row">
                            <div class="article-date-time">
                                ${dateText ? `<span>${dateText}</span>` : ''}
                                ${dateText && readTimeText ? `<span>&middot;</span>` : ''}
                                ${readTimeText ? `<span>${readTimeText}</span>` : ''}
                            </div>
                            <div class="article-tags">
                                ${tags.map(tag => `<span class="tag-badge">${tag}</span>`).join('')}
                            </div>
                        </div>
                    </header>

                    <!-- Article Body Content -->
                    <article class="prose" id="articleProse">
                        ${articleHTML}
                    </article>

                    <!-- Post Footer -->
                    <footer class="post-footer" style="margin-top: 50px; border-top: 1px solid var(--border-subtle); padding-top: 30px;">
                        <div class="share-section">
                            <h4 style="font-family: var(--font-mono); font-size: 11px; color: var(--text-muted); text-transform: uppercase; margin-bottom: 12px; letter-spacing: 0.08em;">Share this article</h4>
                            <div class="share-buttons" style="display: flex; gap: 10px;">
                                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}"
                                    class="tag-badge" target="_blank" rel="noopener noreferrer">
                                    <i class="fab fa-linkedin"></i> LinkedIn
                                </a>
                            </div>
                        </div>
                    </footer>
                </div>
            </main>

            <!-- Right Aside (On This Page / Dynamic TOC) -->
            <aside class="site-aside">
                <div class="aside-top">
                    <div class="toc-widget">
                        <span class="toc-title">ON THIS PAGE</span>
                        <ul class="toc-list" id="tocList"></ul>
                    </div>
                </div>

                <div class="aside-footer">
                    <a href="${indexUrl}" class="all-posts-link">
                        <span>ALL POSTS</span>
                        <span>&rarr;</span>
                    </a>
                </div>
            </aside>
        `;

        // Replace body content cleanly
        document.body.innerHTML = '';
        document.body.appendChild(shell);

        // Append floating Zen Mode exit button
        const exitBtn = document.createElement('button');
        exitBtn.type = 'button';
        exitBtn.className = 'zen-exit-floating-btn';
        exitBtn.id = 'zenExitBtn';
        exitBtn.innerHTML = '<i class="fas fa-compress"></i> <span>Exit Zen Mode (Z)</span>';
        document.body.appendChild(exitBtn);

        // 4. Activate Interactions
        setupTableOfContents();
        setupCodeCopyButtons();
        setupZenMode(shell);
        highlightSyntaxIfAvailable();

        // Load posts data if needed and render related posts
        if (typeof window.BLOG_POSTS !== 'undefined' && Array.isArray(window.BLOG_POSTS)) {
            setupRelatedPosts(titleText, tags);
        } else {
            const dataScript = document.createElement('script');
            dataScript.src = `${rootUrl}blog/posts-data.js?v=20261022`;
            dataScript.onload = () => setupRelatedPosts(titleText, tags);
            document.head.appendChild(dataScript);
        }
    }

    // Dynamic Related Posts (Only renders if 1 or more matching posts exist)
    function setupRelatedPosts(currentTitle, currentTags) {
        if (!window.BLOG_POSTS || !Array.isArray(window.BLOG_POSTS) || window.BLOG_POSTS.length === 0) {
            return;
        }

        const allPosts = window.BLOG_POSTS;
        const currentPath = window.location.pathname;

        // Identify current post
        const currentPost = allPosts.find(p => {
            if (p.title && currentTitle && p.title.toLowerCase().trim() === currentTitle.toLowerCase().trim()) return true;
            if (p.href && currentPath.includes(p.href.replace(/^\.\//, ''))) return true;
            return false;
        });

        const activeCategory = currentPost ? currentPost.category : '';
        const activeTags = (currentPost && currentPost.tags) || currentTags || [];

        // Score other candidates based on category and tags
        const candidates = allPosts.filter(p => {
            if (currentPost && p.title === currentPost.title) return false;
            if (currentTitle && p.title.toLowerCase().trim() === currentTitle.toLowerCase().trim()) return false;
            return true;
        }).map(p => {
            let score = 0;
            // Strong match on identical category
            if (activeCategory && p.category && p.category.toLowerCase() === activeCategory.toLowerCase()) {
                score += 10;
            }
            // Additional match on common tags
            if (Array.isArray(p.tags) && Array.isArray(activeTags)) {
                p.tags.forEach(t => {
                    if (activeTags.some(at => at.toLowerCase() === t.toLowerCase())) {
                        score += 5;
                    }
                });
            }
            return { post: p, score };
        }).filter(item => item.score > 0);

        // Strict condition: If no matches exist, DO NOT RENDER ANYTHING (completely absent from DOM)
        if (candidates.length === 0) {
            return;
        }

        // Sort descending by score and pick top 2
        candidates.sort((a, b) => b.score - a.score);
        const related = candidates.slice(0, 2).map(item => item.post);

        const container = document.querySelector('.content-container');
        if (!container) return;

        function safeText(str) {
            if (!str) return '';
            return String(str).replace(/[&<>'"]/g, 
                tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
            );
        }

        const section = document.createElement('section');
        section.className = 'related-posts-section';
        section.setAttribute('aria-label', 'Related articles');
        section.innerHTML = `
            <h3 class="related-posts-title">// RELATED WRITINGS</h3>
            <div class="related-posts-grid">
                ${related.map(p => {
                    const postUrl = p.href ? (rootUrl + p.href.replace(/^\.\//, '')) : '#';
                    return `
                        <a href="${postUrl}" class="related-post-card">
                            <div>
                                <div class="related-post-meta">
                                    <span>${p.date || ''}</span>
                                    ${p.date && p.readingTime ? ' &middot; ' : ''}
                                    <span>${p.readingTime || ''}</span>
                                </div>
                                <h4 class="related-post-headline">${safeText(p.title)}</h4>
                            </div>
                            <span class="related-post-cta">
                                Read article <span>&rarr;</span>
                            </span>
                        </a>
                    `;
                }).join('')}
            </div>
        `;

        container.appendChild(section);
    }

    // Zen Mode / Focus Mode Controller
    function setupZenMode(shell) {
        const hintBar = document.getElementById('zenHintBar');
        const exitBtn = document.getElementById('zenExitBtn');

        function toggleZen() {
            const isZen = shell.classList.toggle('zen-mode-active');
            if (isZen) {
                if (hintBar) {
                    hintBar.innerHTML = '<i class="fas fa-compress" style="font-size: 11px;"></i> <span class="zen-hint-text">Zen Mode Active &middot; Press <kbd class="zen-kbd">Z</kbd> or <kbd class="zen-kbd">Esc</kbd> to return</span>';
                }
            } else {
                if (hintBar) {
                    hintBar.innerHTML = '<i class="fas fa-eye" style="font-size: 11px; opacity: 0.8;"></i> <span class="zen-hint-text">If you don\'t want to get distracted while reading this blog, press <kbd class="zen-kbd">Z</kbd> for Zen Mode</span>';
                }
            }
        }

        if (hintBar) hintBar.addEventListener('click', toggleZen);
        if (exitBtn) exitBtn.addEventListener('click', toggleZen);

        window.addEventListener('keydown', (e) => {
            const tag = (document.activeElement && document.activeElement.tagName) || '';
            if (tag === 'INPUT' || tag === 'TEXTAREA' || (document.activeElement && document.activeElement.isContentEditable)) {
                return;
            }

            if (e.key === 'z' || e.key === 'Z') {
                e.preventDefault();
                toggleZen();
            } else if (e.key === 'Escape' && shell.classList.contains('zen-mode-active')) {
                toggleZen();
            }
        });
    }

    // Automatic Code Copy Button & Language Badge
    function setupCodeCopyButtons() {
        const preBlocks = document.querySelectorAll('.prose pre');
        preBlocks.forEach(pre => {
            if (pre.querySelector('.code-action-bar')) return;

            const codeEl = pre.querySelector('code');
            const codeClass = codeEl ? codeEl.className : '';
            const match = codeClass.match(/language-([a-zA-Z0-9_-]+)/);
            const lang = match ? match[1].toUpperCase() : 'CODE';

            const actionBar = document.createElement('div');
            actionBar.className = 'code-action-bar';

            const langLabel = document.createElement('span');
            langLabel.className = 'code-lang-label';
            langLabel.textContent = lang;

            const copyBtn = document.createElement('button');
            copyBtn.type = 'button';
            copyBtn.className = 'code-copy-btn';
            copyBtn.setAttribute('aria-label', 'Copy code to clipboard');
            copyBtn.innerHTML = '<i class="far fa-copy"></i> <span>Copy</span>';

            copyBtn.addEventListener('click', async () => {
                const textToCopy = codeEl ? codeEl.innerText : pre.innerText;
                try {
                    await navigator.clipboard.writeText(textToCopy);
                    copyBtn.classList.add('copied');
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                        copyBtn.innerHTML = '<i class="far fa-copy"></i> <span>Copy</span>';
                    }, 2000);
                } catch (err) {
                    // Fallback for older browsers
                    const textarea = document.createElement('textarea');
                    textarea.value = textToCopy;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    copyBtn.classList.add('copied');
                    copyBtn.innerHTML = '<i class="fas fa-check"></i> <span>Copied!</span>';
                    setTimeout(() => {
                        copyBtn.classList.remove('copied');
                        copyBtn.innerHTML = '<i class="far fa-copy"></i> <span>Copy</span>';
                    }, 2000);
                }
            });

            actionBar.appendChild(langLabel);
            actionBar.appendChild(copyBtn);
            pre.appendChild(actionBar);
        });
    }

    // Dynamic TOC & ScrollSpy
    function setupTableOfContents() {
        const tocList = document.getElementById('tocList');
        const prose = document.getElementById('articleProse');
        if (!tocList || !prose) return;

        const headings = prose.querySelectorAll('h2, h3');
        if (headings.length === 0) {
            const aside = document.querySelector('.site-aside');
            if (aside) aside.style.display = 'none';
            return;
        }

        tocList.innerHTML = '';
        const tocLinks = [];

        headings.forEach((heading, idx) => {
            if (!heading.id) {
                const slug = heading.textContent
                    .toLowerCase()
                    .trim()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/[\s_-]+/g, '-')
                    .replace(/^-+|-+$/g, '') || `heading-${idx + 1}`;
                heading.id = slug;
            }

            const isH3 = heading.tagName.toLowerCase() === 'h3';
            const li = document.createElement('li');
            li.className = `toc-item ${isH3 ? 'depth-3' : 'depth-2'}`;

            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.className = 'toc-link';
            a.textContent = heading.textContent.replace(/^[0-9.]+\s*/, '');

            a.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.getElementById(heading.id);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    history.pushState(null, null, `#${heading.id}`);
                }
            });

            li.appendChild(a);
            tocList.appendChild(li);
            tocLinks.push({ heading, link: a });
        });

        function updateScrollSpy() {
            const scrollPos = window.scrollY + 100;
            let current = null;

            for (let i = 0; i < tocLinks.length; i++) {
                if (scrollPos >= tocLinks[i].heading.offsetTop) {
                    current = tocLinks[i].link;
                } else {
                    break;
                }
            }

            if (!current && tocLinks.length > 0) current = tocLinks[0].link;

            tocLinks.forEach(({ link }) => {
                if (link === current) link.classList.add('active');
                else link.classList.remove('active');
            });
        }

        window.addEventListener('scroll', updateScrollSpy, { passive: true });
        updateScrollSpy();
    }

    function highlightSyntaxIfAvailable() {
        if (window.Prism && window.Prism.highlightAll) {
            window.Prism.highlightAll();
        }
    }

    // Auto-run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLayout);
    } else {
        initLayout();
    }
})();
