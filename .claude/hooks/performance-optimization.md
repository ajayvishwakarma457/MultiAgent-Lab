---
name: "Performance Optimization"
description: "Enterprise-grade performance optimization with metrics, budgets, and monitoring"
trigger: "manual"
---

# Enterprise Performance Optimization

---

## 📊 Performance Targets & Metrics

### Core Web Vitals (CWV)
| Metric | Target | Status |
|--------|--------|--------|
| **LCP** (Largest Contentful Paint) | < 2.5s | ⚠️ |
| **FID** (First Input Delay) | < 100ms | ✅ |
| **CLS** (Cumulative Layout Shift) | < 0.1 | ⚠️ |
| **TTFB** (Time to First Byte) | < 600ms | ⚠️ |

### Performance Budgets
| Category | Budget | Current | Status |
|----------|--------|---------|--------|
| **JavaScript** | 150KB (gzipped) | — | ⏳ |
| **CSS** | 50KB (gzipped) | — | ⏳ |
| **Images** | 200KB total | — | ⏳ |
| **Fonts** | 100KB total | — | ⏳ |
| **Total Bundle** | 300KB (gzipped) | — | ⏳ |

### Page Performance
| Metric | Target | Tool |
|--------|--------|------|
| **Lighthouse Score** | ≥90 | Chrome DevTools |
| **First Contentful Paint** | < 1.5s | Lighthouse |
| **Time to Interactive** | < 3.5s | Lighthouse |
| **Speed Index** | < 3s | Lighthouse |

---

## 🎯 Phase 1: Bundle Size Optimization

### 1.1 Bundle Analysis
- [ ] **Baseline Measurement**: `npm run analyze` on every build
- [ ] **Dependency Audit**: Check for unused/duplicate packages
- [ ] **Bundle Visualization**: Use webpack-bundle-analyzer or similar
- [ ] **Trend Tracking**: Monitor bundle size over time; alert on +5% growth
- [ ] **Treemap Review**: Identify largest contributors; prioritize reductions

### 1.2 Code Splitting Strategy
- [ ] **Route-Based Splitting**: Each route lazy-loaded with React.lazy
- [ ] **Component Splitting**: Heavy components split if >50KB
- [ ] **Conditional Imports**: Heavy libraries imported only when needed
- [ ] **Dynamic Imports**: Use `import()` for features loaded on-demand
- [ ] **Suspense Boundaries**: Fallback UI for code-split chunks
- [ ] **Prefetching**: Preload likely-needed chunks on idle
- [ ] **Chunk Naming**: Named chunks for debugging; hash for caching

### 1.3 Dependency Optimization
- [ ] **Tree Shaking**: Ensure `sideEffects: false` in package.json
- [ ] **Unused Removal**: Audit dependencies; remove unused packages
- [ ] **Duplicate Detection**: Check for multiple versions of same package
- [ ] **Alternative Packages**: Consider lighter alternatives (e.g., date-fns vs moment)
- [ ] **Granular Imports**: Import specific exports, not entire modules
  ```javascript
  // ❌ Avoid
  import _ from 'lodash';
  
  // ✅ Prefer
  import { debounce } from 'lodash-es';
  ```

### 1.4 Build Optimization
- [ ] **Minification**: Enabled for JS/CSS/HTML
- [ ] **Compression**: gzip/brotli enabled on server
- [ ] **Source Maps**: Production builds use minimal source maps
- [ ] **Bundle Analysis**: Part of CI/CD; fails on budget breach

---

## ⚛️ Phase 2: React Performance Optimization

### 2.1 Render Optimization
- [ ] **React.memo**: Applied to list items; prevents re-renders on prop changes
  ```javascript
  const TodoItem = React.memo(({ todo, onDelete }) => {
    return <div>{todo.text}</div>;
  }, (prevProps, nextProps) => 
    prevProps.todo.id === nextProps.todo.id
  );
  ```
- [ ] **useMemo**: Expensive computations cached; used sparingly
- [ ] **useCallback**: Event handlers wrapped; passed to memoized components
- [ ] **Key Prop**: Stable, unique keys; never use array indices
- [ ] **Profiler Analysis**: React DevTools Profiler identifies slow renders

### 2.2 State Management
- [ ] **Local State**: State kept as close to usage as possible
- [ ] **State Splitting**: Related state grouped; unrelated state separate
- [ ] **Context Optimization**: Context split by update frequency (static vs dynamic)
- [ ] **Batched Updates**: Multiple state updates in single re-render
- [ ] **Controlled vs Uncontrolled**: Use uncontrolled inputs where appropriate

### 2.3 Component Structure
- [ ] **Component Size**: Components < 200 lines; complex logic extracted
- [ ] **Lazy Loading**: Heavy components lazy-loaded with React.lazy
- [ ] **Suspense**: Fallback UI provided for async components
- [ ] **Error Boundaries**: Catch rendering errors; prevent cascading failures
- [ ] **Fragment Usage**: Use `<>` for grouping without extra DOM nodes

### 2.4 Re-render Prevention
- [ ] **No Inline Objects**: Objects/functions created outside render
  ```javascript
  // ❌ Avoid - creates new object every render
  <Component style={{ color: 'red' }} />
  
  // ✅ Prefer - object created once
  const STYLE = { color: 'red' };
  <Component style={STYLE} />
  ```
- [ ] **No Arrow Functions in JSX**: Define handlers outside; use useCallback
- [ ] **Stable Refs**: useRef for DOM refs; doesn't trigger re-renders
- [ ] **Batching**: Event handlers naturally batched in React 18

---

## 🖼️ Phase 3: Asset Optimization

### 3.1 Image Optimization
- [ ] **Format Selection**: WebP for modern browsers; JPEG fallback
- [ ] **Compression**: Optimize with imagemin or similar; < 80KB per image
- [ ] **Responsive Images**: srcset for different screen sizes
- [ ] **Lazy Loading**: `loading="lazy"` for below-fold images
- [ ] **CDN Delivery**: Images served from CDN; cache headers set to 1 year
- [ ] **Next-Gen Formats**: AVIF tested; progressive enhancement
- [ ] **SVG Usage**: SVG for icons; inline or external with `<use>`

### 3.2 Font Optimization
- [ ] **Font Subsetting**: Only include used character sets
- [ ] **Variable Fonts**: Use single variable font instead of multiple weights
- [ ] **Font Display**: `font-display: swap` for non-blocking rendering
- [ ] **Preload**: Critical fonts preloaded with `<link rel="preload">`
- [ ] **Font Weight**: Limit weights to necessary ones (400, 600, 700)
- [ ] **System Fonts**: Consider system fonts for common text
- [ ] **Web Fonts**: Move non-critical fonts to async loading

### 3.3 CSS Optimization
- [ ] **Critical CSS**: Inline above-fold styles; defer rest
- [ ] **Unused CSS**: PurgeCSS removes unused styles
- [ ] **CSS Variables**: Used for theming; avoids duplicate values
- [ ] **Media Queries**: Mobile-first; desktop styles in media queries
- [ ] **Animations**: GPU-accelerated (transform, opacity)
- [ ] **Selector Specificity**: Avoid deep nesting; specificity issues
- [ ] **Print Styles**: Separate print stylesheet; excludes from main bundle

### 3.4 JavaScript Optimization
- [ ] **Polyfills**: Conditionally loaded; not in main bundle
- [ ] **Babel Config**: Targets modern browsers; not transpiling unneeded features
- [ ] **Tree Shaking**: CommonJS avoided; ES modules used
- [ ] **Dynamic Imports**: Heavy libraries imported on-demand
- [ ] **Code Stripping**: Dead code removed; build optimization enabled

---

## 🌐 Phase 4: Network & Caching Optimization

### 4.1 HTTP/Network
- [ ] **HTTP/2**: Enabled; allows multiplexing
- [ ] **Compression**: gzip/brotli enabled server-side
- [ ] **CDN**: Static assets served from CDN; global distribution
- [ ] **DNS Prefetch**: `<link rel="dns-prefetch">` for external domains
- [ ] **Preconnect**: `<link rel="preconnect">` for critical third-party domains
- [ ] **Connection Pooling**: Reuse connections; avoid multiple TCP handshakes
- [ ] **Service Worker**: Offline support; intelligent caching

### 4.2 Caching Strategy
- [ ] **Browser Cache**: Long expiry (1 year) for hashed assets
- [ ] **Cache Busting**: File hashing ensures fresh versions
- [ ] **API Cache**: Response caching with TTL; conditional requests (ETag)
- [ ] **Stale-While-Revalidate**: Serve stale; update in background
- [ ] **Cache Headers**: Proper Cache-Control, ETag, Last-Modified headers
- [ ] **CDN Caching**: Cache-Control optimized for CDN
- [ ] **LocalStorage**: Non-sensitive data cached locally; invalidated properly

### 4.3 API Optimization
- [ ] **Request Batching**: Multiple requests combined into single batch
- [ ] **Pagination**: Large datasets paginated; pagination links prefetched
- [ ] **Filtering**: Server-side filtering; client doesn't load unnecessary data
- [ ] **Selective Fields**: Only request needed fields; reduce response size
- [ ] **Compression**: API responses gzipped
- [ ] **Caching**: API responses cached with proper TTL
- [ ] **GraphQL**: Consider for reducing over-fetching (if applicable)

### 4.4 Third-Party Scripts
- [ ] **Async/Defer**: Non-critical scripts loaded async; don't block parsing
- [ ] **Minimal Third-Parties**: Evaluate each; justified by business value
- [ ] **Shadow DOM**: Third-party scripts isolated if possible
- [ ] **Monitoring**: Scripts monitored for performance impact
- [ ] **Removal**: Unused third-party scripts removed

---

## 💾 Phase 5: Runtime Performance

### 5.1 Memory Management
- [ ] **Memory Leaks**: No event listeners left dangling; cleanup in useEffect
- [ ] **Circular References**: Avoided; objects cleaned up properly
- [ ] **Large Objects**: Reference counting; objects freed when no longer needed
- [ ] **Memory Profiling**: DevTools Memory tab used to check for leaks
- [ ] **Garbage Collection**: GC pauses minimized; large object creation avoided in hot paths

### 5.2 Efficient Algorithms
- [ ] **Algorithm Complexity**: No O(n²) loops without justification
- [ ] **Sorting**: Efficient sorting algorithms used (native sort acceptable)
- [ ] **Searching**: Binary search for large sorted datasets
- [ ] **Filtering**: Optimized filters; heavy filtering server-side
- [ ] **Debouncing/Throttling**: Applied to frequent events (scroll, resize, input)

### 5.3 DOM Interactions
- [ ] **DOM Queries**: Minimized; results cached; not in loops
- [ ] **DOM Manipulation**: Batched; not one-by-one updates
- [ ] **Reflows/Repaints**: Avoided through batching; read before write
- [ ] **Virtual Scrolling**: Used for long lists; only visible items rendered
- [ ] **Display None**: Performance depends on content; visibility: hidden faster in some cases

### 5.4 Event Handling
- [ ] **Event Delegation**: Events delegated to parent when possible
- [ ] **Passive Listeners**: `{ passive: true }` for scroll/touch events
- [ ] **Event Cleanup**: Listeners removed when component unmounts
- [ ] **Debounce/Throttle**: High-frequency events controlled
- [ ] **Stop Propagation**: Used carefully; can hide issues

---

## 🔍 Phase 6: Performance Testing & Monitoring

### 6.1 Automated Performance Testing
- [ ] **Lighthouse CI**: Runs on every PR; fails on regression
- [ ] **Performance Budget**: CI fails if bundle exceeds budget
- [ ] **Speed Index Tracking**: Monitored over time; regression alerts
- [ ] **Custom Metrics**: Business-critical metrics tracked (e.g., "list load time")
- [ ] **Load Testing**: Simulates concurrent users; identifies bottlenecks

### 6.2 Profiling & Debugging
- [ ] **React DevTools Profiler**: Identifies slow components/renders
- [ ] **Chrome DevTools**: Performance tab used for flame charts
- [ ] **Network Tab**: Identifies slow requests; waterfall analysis
- [ ] **Memory Profiler**: Heap snapshots compared; memory leaks identified
- [ ] **Lighthouse Audit**: Full audit in Chrome DevTools; actionable recommendations

### 6.3 Production Monitoring
- [ ] **Real User Monitoring (RUM)**: Performance metrics from real users collected
- [ ] **Web Vitals**: LCP, FID, CLS measured from real traffic
- [ ] **Error Tracking**: JS errors monitored; sentry/similar configured
- [ ] **Performance Dashboards**: Grafana/similar shows trends; alerts on regression
- [ ] **Synthetic Monitoring**: Scheduled performance checks; alerts on degradation
- [ ] **Alerting**: Slack/PagerDuty alerts on Core Web Vitals breach

### 6.4 Performance Regression Testing
- [ ] **PR Comparison**: Performance metrics compared to main branch
- [ ] **Historical Tracking**: Performance tracked over time; trends visible
- [ ] **Budget Enforcement**: CI fails if bundle exceeds budget
- [ ] **Custom Thresholds**: Thresholds set per metric; failures trigger review
- [ ] **Post-Deployment**: Performance validated after deployment

---

## 🛠️ Tools & Configuration

### Build Tools
```bash
npm run analyze        # Bundle size analysis
npm run build          # Production build
npm run preview        # Preview build locally
npm run test           # Tests with coverage
npm run lighthouse     # Lighthouse audit (if configured)
```

### ESLint Performance Rules
```javascript
// .eslintrc.js
{
  "plugins": ["react", "react-hooks"],
  "rules": {
    "react/jsx-no-comment-textnodes": "error",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Vite Configuration
```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
}
```

### Performance Budget (package.json)
```json
{
  "bundlebudget": {
    "bundles": [
      {
        "name": "main",
        "maxSize": "150kb",
        "gzip": true
      }
    ]
  }
}
```

---

## 📋 Optimization Checklist

### Pre-Deployment
- [ ] Bundle size within budget (<300KB gzipped)
- [ ] Lighthouse score ≥90
- [ ] Core Web Vitals targets met
- [ ] No console.log or debugger statements
- [ ] Images optimized; CSS/JS minified
- [ ] Code splitting implemented; chunks prefetched
- [ ] No memory leaks; React DevTools Profiler clean
- [ ] API calls batched; caching implemented
- [ ] Third-party scripts async; impact minimized

### Post-Deployment
- [ ] Core Web Vitals monitored in production
- [ ] Error tracking configured; zero critical errors
- [ ] Performance dashboards show improvement
- [ ] Real user metrics collected; analyzed
- [ ] Alerts triggered on regression; escalation plan ready

---

## Performance Optimization Workflow

```
1. Measure
   ↓
2. Identify Bottleneck
   ↓
3. Optimize
   ↓
4. Measure Again
   ↓
5. Deploy & Monitor
   ↓
6. Repeat
```

## Key Principles

1. **Measure First**: Can't optimize what you don't measure
2. **Real Data**: Use real user data; lab data is helpful but not authoritative
3. **User-Centric**: Focus on user experience; Core Web Vitals matter
4. **Continuous**: Performance is not one-time; continuous monitoring and improvement
5. **Budgets**: Set performance budgets; enforce in CI/CD
6. **Trade-offs**: Some optimizations have trade-offs; evaluate carefully
7. **Progressive Enhancement**: Degrade gracefully; don't break for slow connections
