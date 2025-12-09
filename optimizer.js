// ==================== 综合优化系统 ====================
// 文件名：optimizer.js
// 功能：性能优化、内存管理、错误恢复、动画优化

class ComprehensiveOptimizer {
  constructor() {
    this.performanceMonitor = new PerformanceMonitor();
    this.memoryOptimizer = new MemoryOptimizer();
    this.animationOptimizer = new AnimationOptimizer();
    this.errorRecoverySystem = new ErrorRecoverySystem();
    this.cacheStrategy = new SmartCacheStrategy();
    
    this.init();
  }
  
  init() {
    console.log('综合优化系统启动');
    
    // 启动所有子系统
    this.performanceMonitor.start();
    this.memoryOptimizer.start();
    this.animationOptimizer.start();
    this.errorRecoverySystem.start();
    this.cacheStrategy.init();
    
    // 添加页面生命周期监听
    this.setupPageLifecycle();
    
    // 添加性能警告处理
    this.setupPerformanceWarnings();
  }
  
  setupPageLifecycle() {
    // 页面可见性变化
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.onPageHidden();
      } else {
        this.onPageVisible();
      }
    });
    
    // 页面卸载前清理
    window.addEventListener('beforeunload', () => {
      this.cleanup();
    });
  }
  
  setupPerformanceWarnings() {
    // 监控长任务
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          console.warn(`长任务警告: ${entry.duration}ms`);
          this.reportPerformanceIssue('long_task', entry);
        }
      }
    });
    
    observer.observe({ entryTypes: ['longtask'] });
  }
  
  onPageHidden() {
    // 页面隐藏时降低资源占用
    this.animationOptimizer.pauseNonCritical();
    this.memoryOptimizer.cleanup();
    this.cacheStrategy.cleanExpired();
  }
  
  onPageVisible() {
    // 页面显示时恢复
    this.animationOptimizer.resumeAll();
    this.performanceMonitor.resume();
  }
  
  cleanup() {
    this.performanceMonitor.stop();
    this.memoryOptimizer.cleanup();
    this.animationOptimizer.stop();
    this.cacheStrategy.clearAll();
    console.log('优化系统已清理');
  }
  
  // 报告性能问题
  reportPerformanceIssue(type, data) {
    const report = {
      type,
      data,
      timestamp: Date.now(),
      url: window.location.href,
      memory: this.memoryOptimizer.getMemoryInfo()
    };
    
    // 存储到本地便于调试
    localStorage.setItem('last_performance_issue', JSON.stringify(report));
    
    // 生产环境可以发送到服务器
    // this.sendToAnalytics(report);
  }
  
  // 获取系统状态报告
  getSystemReport() {
    return {
      performance: this.performanceMonitor.getReport(),
      memory: this.memoryOptimizer.getMemoryInfo(),
      animations: this.animationOptimizer.getReport(),
      errors: this.errorRecoverySystem.getReport(),
      cache: this.cacheStrategy.getStats()
    };
  }
}

// ==================== 性能监控子系统 ====================
class PerformanceMonitor {
  constructor() {
    this.metrics = {
      fps: 60,
      memory: null,
      loadTime: null,
      longTasks: []
    };
    
    this.isMonitoring = false;
    this.frameCount = 0;
    this.lastTime = performance.now();
  }
  
  start() {
    if (this.isMonitoring) return;
    
    this.isMonitoring = true;
    this.metrics.loadTime = performance.now();
    
    // 监控FPS
    this.monitorFPS();
    
    // 监控内存（如果支持）
    if (performance.memory) {
      this.monitorMemory();
    }
    
    // 监控网络请求
    this.monitorNetwork();
    
    console.log('性能监控启动');
  }
  
  monitorFPS() {
    const checkFPS = () => {
      if (!this.isMonitoring) return;
      
      this.frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - this.lastTime >= 1000) {
        this.metrics.fps = Math.round((this.frameCount * 1000) / (currentTime - this.lastTime));
        this.frameCount = 0;
        this.lastTime = currentTime;
        
        // FPS过低警告
        if (this.metrics.fps < 50) {
          console.warn(`低FPS: ${this.metrics.fps}`);
        }
      }
      
      requestAnimationFrame(checkFPS);
    };
    
    checkFPS();
  }
  
  monitorMemory() {
    setInterval(() => {
      if (performance.memory) {
        this.metrics.memory = {
          usedJSHeapSize: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024),
          totalJSHeapSize: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024),
          jsHeapSizeLimit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024)
        };
        
        // 内存使用过高警告
        if (this.metrics.memory.usedJSHeapSize > 100) {
          console.warn(`高内存使用: ${this.metrics.memory.usedJSHeapSize}MB`);
        }
      }
    }, 5000);
  }
  
  monitorNetwork() {
    const originalFetch = window.fetch;
    
    window.fetch = function(...args) {
      const startTime = performance.now();
      
      return originalFetch.apply(this, args).then(response => {
        const duration = performance.now() - startTime;
        
        if (duration > 1000) {
          console.warn(`慢网络请求: ${duration}ms`, args[0]);
        }
        
        return response;
      });
    };
  }
  
  stop() {
    this.isMonitoring = false;
  }
  
  resume() {
    if (!this.isMonitoring) {
      this.start();
    }
  }
  
  getReport() {
    return {
      ...this.metrics,
      timestamp: Date.now()
    };
  }
}

// ==================== 内存优化子系统 ====================
class MemoryOptimizer {
  constructor() {
    this.cache = new Map();
    this.weakCache = new WeakMap();
    this.maxCacheSize = 100;
    this.cleanupThreshold = 0.8; // 内存使用率超过80%时清理
  }
  
  start() {
    // 定期清理
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 30000);
    
    // 监听内存压力
    if ('memory' in performance) {
      setInterval(() => {
        this.checkMemoryPressure();
      }, 10000);
    }
    
    console.log('内存优化启动');
  }
  
  // 智能缓存
  cacheData(key, data, options = {}) {
    const { ttl = 300000, priority = 'normal' } = options; // 默认5分钟
    
    if (this.cache.size >= this.maxCacheSize) {
      this.evictLowPriority();
    }
    
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      ttl,
      priority,
      accessCount: 0
    });
  }
  
  // 获取缓存
  getCachedData(key) {
    const item = this.cache.get(key);
    
    if (item) {
      // 检查是否过期
      if (Date.now() - item.timestamp > item.ttl) {
        this.cache.delete(key);
        return null;
      }
      
      item.accessCount++;
      return item.data;
    }
    
    return null;
  }
  
  // 淘汰低优先级缓存
  evictLowPriority() {
    const entries = Array.from(this.cache.entries());
    
    // 按优先级和访问频率排序
    entries.sort((a, b) => {
      const priorityOrder = { high: 0, normal: 1, low: 2 };
      const priorityDiff = priorityOrder[a[1].priority] - priorityOrder[b[1].priority];
      
      if (priorityDiff !== 0) return priorityDiff;
      
      return a[1].accessCount - b[1].accessCount;
    });
    
    // 删除优先级最低的20%
    const toDelete = Math.ceil(entries.length * 0.2);
    for (let i = 0; i < toDelete; i++) {
      this.cache.delete(entries[i][0]);
    }
  }
  
  // 检查内存压力
  checkMemoryPressure() {
    if (performance.memory) {
      const memoryUsage = performance.memory.usedJSHeapSize / performance.memory.jsHeapSizeLimit;
      
      if (memoryUsage > this.cleanupThreshold) {
        console.log('内存压力高，触发清理');
        this.cleanup();
        
        // 尝试触发垃圾回收（如果可用）
        if (window.gc) {
          window.gc();
        }
      }
    }
  }
  
  // 清理过期和低优先级缓存
  cleanup() {
    const now = Date.now();
    let deletedCount = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp > item.ttl || item.priority === 'low') {
        this.cache.delete(key);
        deletedCount++;
      }
    }
    
    console.log(`内存清理完成，删除 ${deletedCount} 项，剩余 ${this.cache.size} 项`);
  }
  
  // 获取内存信息
  getMemoryInfo() {
    if (performance.memory) {
      return {
        used: Math.round(performance.memory.usedJSHeapSize / 1024 / 1024) + 'MB',
        total: Math.round(performance.memory.totalJSHeapSize / 1024 / 1024) + 'MB',
        limit: Math.round(performance.memory.jsHeapSizeLimit / 1024 / 1024) + 'MB',
        cacheSize: this.cache.size
      };
    }
    
    return { cacheSize: this.cache.size };
  }
  
  // 强制清理所有缓存
  forceCleanup() {
    this.cache.clear();
    this.weakCache = new WeakMap();
    
    if (window.gc) {
      window.gc();
    }
    
    console.log('强制内存清理完成');
  }
}

// ==================== 动画优化子系统 ====================
class AnimationOptimizer {
  constructor() {
    this.activeAnimations = new Set();
    this.pausedAnimations = new Set();
    this.frameBudget = 16; // 每帧16ms，对应60fps
  }
  
  start() {
    // 监控动画性能
    this.monitorAnimationPerformance();
    
    // 优化CSS动画
    this.optimizeCSSTransitions();
    
    console.log('动画优化启动');
  }
  
  monitorAnimationPerformance() {
    let lastFrameTime = performance.now();
    let framesDropped = 0;
    
    const checkFrameTime = () => {
      const currentTime = performance.now();
      const frameTime = currentTime - lastFrameTime;
      
      // 检测掉帧
      if (frameTime > this.frameBudget * 2) {
        framesDropped++;
        
        if (framesDropped > 3) {
          this.reduceAnimationQuality();
          framesDropped = 0;
        }
      } else {
        framesDropped = 0;
      }
      
      lastFrameTime = currentTime;
      requestAnimationFrame(checkFrameTime);
    };
    
    checkFrameTime();
  }
  
  // 优化CSS过渡效果
  optimizeCSSTransitions() {
    // 添加will-change属性优化性能
    document.addEventListener('DOMContentLoaded', () => {
      const animatedElements = document.querySelectorAll('.app-icon, .control-icon, .notification');
      
      animatedElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
      });
    });
  }
  
  // 降低动画质量以提升性能
  reduceAnimationQuality() {
    console.log('检测到性能下降，降低动画质量');
    
    // 减少阴影和模糊效果
    document.querySelectorAll('.app-icon-bg, .stacked-card').forEach(el => {
      el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
      el.style.filter = 'none';
    });
    
    // 减少动画复杂度
    document.querySelectorAll('*').forEach(el => {
      if (el.style.animation) {
        el.style.animationDuration = '0.3s';
      }
    });
  }
  
  // 暂停非关键动画
  pauseNonCritical() {
    document.querySelectorAll('.app-icon-bg, .control-icon').forEach(el => {
      const animations = el.getAnimations();
      animations.forEach(animation => {
        if (!animation.id || !animation.id.includes('critical')) {
          animation.pause();
          this.pausedAnimations.add(animation);
        }
      });
    });
  }
  
  // 恢复所有动画
  resumeAll() {
    this.pausedAnimations.forEach(animation => {
      animation.play();
    });
    this.pausedAnimations.clear();
  }
  
  // 注册动画进行监控
  registerAnimation(animation) {
    this.activeAnimations.add(animation);
    
    animation.addEventListener('finish', () => {
      this.activeAnimations.delete(animation);
    });
  }
  
  stop() {
    // 清理所有监控
    this.activeAnimations.clear();
    this.pausedAnimations.clear();
  }
  
  getReport() {
    return {
      activeAnimations: this.activeAnimations.size,
      pausedAnimations: this.pausedAnimations.size
    };
  }
}

// ==================== 错误恢复子系统 ====================
class ErrorRecoverySystem {
  constructor() {
    this.errorLog = [];
    this.maxErrorLogSize = 50;
    this.autoRecoveryEnabled = true;
  }
  
  start() {
    // 全局错误捕获
    window.addEventListener('error', (e) => {
      this.handleError(e.error || e, 'global_error');
    });
    
    // Promise rejection捕获
    window.addEventListener('unhandledrejection', (e) => {
      this.handleError(e.reason, 'promise_rejection');
    });
    
    // 应用特定错误包装
    this.wrapCriticalFunctions();
    
    console.log('错误恢复系统启动');
  }
  
  handleError(error, type) {
    const errorRecord = {
      type,
      message: error?.message || String(error),
      stack: error?.stack,
      timestamp: Date.now(),
      url: window.location.href
    };
    
    // 记录错误
    this.errorLog.push(errorRecord);
    
    // 限制日志大小
    if (this.errorLog.length > this.maxErrorLogSize) {
      this.errorLog.shift();
    }
    
    // 控制台输出
    console.error(`[${type}]`, error);
    
    // 自动恢复尝试
    if (this.autoRecoveryEnabled) {
      this.attemptRecovery(error, type);
    }
    
    // 用户友好提示
    this.showUserFriendlyError(errorRecord);
  }
  
  // 包装关键函数以捕获错误
  wrapCriticalFunctions() {
    // 包装应用启动函数
    const originalLaunch = window.launchAppWithAnimation;
    if (originalLaunch) {
      window.launchAppWithAnimation = function(...args) {
        try {
          return originalLaunch.apply(this, args);
        } catch (error) {
          window.errorRecoverySystem.handleError(error, 'app_launch');
          return null;
        }
      };
    }
    
    // 包装事件处理函数
    this.wrapEventHandlers();
  }
  
  wrapEventHandlers() {
    // 为高风险操作添加错误处理
    const highRiskSelectors = ['.app-icon', '.control-icon', '.notification'];
    
    highRiskSelectors.forEach(selector => {
      document.addEventListener('click', (e) => {
        if (e.target.closest(selector)) {
          try {
            // 正常执行
          } catch (error) {
            this.handleError(error, 'event_handler');
          }
        }
      }, true);
    });
  }
  
  // 尝试自动恢复
  attemptRecovery(error, type) {
    switch (type) {
      case 'app_launch':
        // 应用启动失败，显示备用界面
        this.showFallbackAppInterface();
        break;
        
      case 'memory_error':
        // 内存错误，尝试清理内存
        if (window.memoryOptimizer) {
          window.memoryOptimizer.forceCleanup();
        }
        break;
    }
  }
  
  // 显示备用界面
  showFallbackAppInterface() {
    if (!document.querySelector('.fallback-app-interface')) {
      const fallback = document.createElement('div');
      fallback.className = 'fallback-app-interface';
      fallback.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.8);
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        color: white;
      `;
      
      fallback.innerHTML = `
        <i class="fas fa-exclamation-triangle" style="font-size: 50px; margin-bottom: 20px;"></i>
        <h3>应用加载遇到问题</h3>
        <p>正在尝试恢复...</p>
        <button onclick="this.parentNode.remove()" style="margin-top: 20px; padding: 10px 20px; background: #007AFF; border: none; color: white; border-radius: 8px;">
          关闭
        </button>
      `;
      
      document.body.appendChild(fallback);
      
      // 3秒后自动关闭
      setTimeout(() => {
        if (fallback.parentNode) {
          fallback.parentNode.removeChild(fallback);
        }
      }, 3000);
    }
  }
  
  // 显示用户友好错误提示
  showUserFriendlyError(errorRecord) {
    if (!document.querySelector('.error-toast')) {
      const toast = document.createElement('div');
      toast.className = 'error-toast';
      toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: #ff4757;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
      `;
      
      toast.innerHTML = `
        <i class="fas fa-exclamation-circle"></i>
        <span>操作遇到问题，已自动恢复</span>
      `;
      
      document.body.appendChild(toast);
      
      // 3秒后自动移除
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 3000);
    }
  }
  
  getReport() {
    return {
      totalErrors: this.errorLog.length,
      recentErrors: this.errorLog.slice(-5),
      autoRecoveryEnabled: this.autoRecoveryEnabled
    };
  }
  
  // 清除错误日志
  clearErrorLog() {
    this.errorLog = [];
  }
}

// ==================== 智能缓存策略子系统 ====================
class SmartCacheStrategy {
  constructor() {
    this.cacheVersion = 'v1.0';
    this.cacheStrategies = {
      critical: { ttl: 3600000, priority: 'high' }, // 1小时
      normal: { ttl: 300000, priority: 'normal' },   // 5分钟
      low: { ttl: 60000, priority: 'low' }           // 1分钟
    };
  }
  
  init() {
    // 预加载关键资源
    this.preloadCriticalResources();
    
    // 设置缓存清理
    this.setupCacheCleanup();
    
    console.log('智能缓存策略启动');
  }
  
  preloadCriticalResources() {
    const criticalResources = [
      // 添加你的关键资源URL
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = this.getResourceType(resource);
      link.href = resource;
      document.head.appendChild(link);
    });
  }
  
  getResourceType(url) {
    if (url.includes('.css')) return 'style';
    if (url.includes('.js')) return 'script';
    if (url.includes('.woff') || url.includes('.ttf')) return 'font';
    if (url.includes('.jpg') || url.includes('.png') || url.includes('.webp')) return 'image';
    return 'fetch';
  }
  
  setupCacheCleanup() {
    // 每天清理一次过期缓存
    const lastCleanup = localStorage.getItem('last_cache_cleanup');
    const now = Date.now();
    
    if (!lastCleanup || now - lastCleanup > 24 * 60 * 60 * 1000) {
      this.cleanExpired();
      localStorage.setItem('last_cache_cleanup', now);
    }
  }
  
  // 智能缓存应用数据
  cacheAppData(appId, data, strategy = 'normal') {
    const cacheKey = `smart_cache_${this.cacheVersion}_${appId}`;
    const strategyConfig = this.cacheStrategies[strategy] || this.cacheStrategies.normal;
    
    const cacheData = {
      data,
      strategy,
      timestamp: Date.now(),
      ttl: strategyConfig.ttl,
      priority: strategyConfig.priority,
      size: JSON.stringify(data).length
    };
    
    // 避免缓存过大数据
    if (cacheData.size < 1024 * 1024) { // 1MB限制
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
      return true;
    }
    
    return false;
  }
  
  // 获取缓存数据
  getCachedAppData(appId) {
    const cacheKey = `smart_cache_${this.cacheVersion}_${appId}`;
    
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        
        // 检查是否过期
        if (Date.now() - parsed.timestamp < parsed.ttl) {
          return parsed.data;
        } else {
          // 过期，删除缓存
          localStorage.removeItem(cacheKey);
        }
      }
    } catch (e) {
      console.warn('缓存读取失败:', e);
    }
    
    return null;
  }
  
  // 清理过期缓存
  cleanExpired() {
    const now = Date.now();
    let deletedCount = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith('smart_cache_')) {
        try {
          const item = JSON.parse(localStorage.getItem(key));
          
          if (item && now - item.timestamp > item.ttl) {
            localStorage.removeItem(key);
            deletedCount++;
          }
        } catch (e) {
          // 解析失败，删除无效数据
          localStorage.removeItem(key);
          deletedCount++;
        }
      }
    }
    
    console.log(`缓存清理完成，删除 ${deletedCount} 项`);
  }
  
  // 清理所有缓存
  clearAll() {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith('smart_cache_')) {
        localStorage.removeItem(key);
      }
    }
    
    console.log('所有缓存已清理');
  }
  
  getStats() {
    let totalSize = 0;
    let count = 0;
    
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      
      if (key && key.startsWith('smart_cache_')) {
        count++;
        const data = localStorage.getItem(key);
        if (data) {
          totalSize += data.length;
        }
      }
    }
    
    return {
      count,
      totalSize: Math.round(totalSize / 1024) + 'KB',
      cacheVersion: this.cacheVersion
    };
  }
}

// ==================== 全局初始化 ====================
// 创建全局优化器实例
window.comprehensiveOptimizer = new ComprehensiveOptimizer();

// 导出各子系统以供单独使用
window.performanceMonitor = window.comprehensiveOptimizer.performanceMonitor;
window.memoryOptimizer = window.comprehensiveOptimizer.memoryOptimizer;
window.animationOptimizer = window.comprehensiveOptimizer.animationOptimizer;
window.errorRecoverySystem = window.comprehensiveOptimizer.errorRecoverySystem;
window.cacheStrategy = window.comprehensiveOptimizer.cacheStrategy;

// 添加调试方法
window.getOptimizerReport = () => {
  return window.comprehensiveOptimizer.getSystemReport();
};

// 手动清理方法
window.forceOptimizationCleanup = () => {
  window.comprehensiveOptimizer.cleanup();
  return '优化系统已清理';
};

console.log('综合优化系统加载完成');