    // ==================== 内存管理系统 ====================
// 添加位置：JavaScript部分开头，在应用数据定义之前

class MemoryManager {
  constructor() {
    this.cache = new Map();
    this.maxCacheSize = 50;
    this.cleanupInterval = setInterval(() => this.cleanup(), 30000);
  }

  // 缓存应用数据
  cacheAppData(key, data) {
    if (this.cache.size >= this.maxCacheSize) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, data);
  }

  // 获取缓存数据
  getCachedAppData(key) {
    return this.cache.get(key);
  }

  // 清理过期缓存
  cleanup() {
    console.log('Memory cleanup performed, current cache size:', this.cache.size);
  }

  // 清理所有缓存
  clearAll() {
    this.cache.clear();
    if (window.gc) {
      window.gc();
    }
  }
}

// 初始化内存管理器
const memoryManager = new MemoryManager();

// 监听页面可见性变化，在页面隐藏时清理内存
document.addEventListener('visibilitychange', function() {
  if (document.hidden) {
    setTimeout(() => memoryManager.cleanup(), 1000);
  }
});

// 监听页面卸载
window.addEventListener('beforeunload', function() {
  memoryManager.clearAll();
  clearInterval(memoryManager.cleanupInterval);
});
        // 更新时间和日期
        function updateDateTime() {
            const now = new Date();
            const timeStr = now.toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
            const dateStr = now.toLocaleDateString('zh-CN', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric',
                weekday: 'long'
            });
            
            document.getElementById('currentTime').textContent = timeStr;
            document.getElementById('lockTime').textContent = timeStr;
            document.getElementById('lockDate').textContent = dateStr;
        }
        
        // 初始更新时间
        updateDateTime();
        setInterval(updateDateTime, 60000);
        
        // 应用数据 - 添加预览内容
        const appData = {
            messages: {
                title: "信息",
                content: `
                    <div class="page-title">信息</div>
                    <div class="page-subtitle">最近对话</div>
                    <div class="message-list">
                        <div class="notification">
                            <div class="notification-icon icon-messages"></div>
                            <div class="notification-content">
                                <div class="notification-title">张三</div>
                                <div class="notification-text">你好！今天下午的会议别忘了。</div>
                                <div class="notification-time">刚刚</div>
                            </div>
                        </div>
                        <div class="notification">
                            <div class="notification-icon icon-messages"></div>
                            <div class="notification-content">
                                <div class="notification-title">李四</div>
                                <div class="notification-text">项目文件已经发你邮箱了</div>
                                <div class="notification-time">昨天</div>
                            </div>
                        </div>
                        <div class="notification">
                            <div class="notification-icon icon-messages"></div>
                            <div class="notification-content">
                                <div class="notification-title">王五</div>
                                <div class="notification-text">周末一起吃饭吗？</div>
                                <div class="notification-time">周二</div>
                            </div>
                        </div>
                    </div>
                `,
                preview: `
                    <div class="preview-header">
                        <div class="preview-icon"><i class="fas fa-comment"></i></div>
                        <div class="preview-title">信息</div>
                    </div>
                    <div class="preview-content">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <div style="width: 8px; height: 8px; background: var(--primary); border-radius: 50%;"></div>
                            <div style="font-weight: 600;">张三</div>
                            <div style="font-size: 10px; color: var(--text-tertiary); margin-left: auto;">刚刚</div>
                        </div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
                            你好！今天下午的会议别忘了。
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <div style="width: 8px; height: 8px; background: var(--text-tertiary); border-radius: 50%;"></div>
                            <div style="font-weight: 600;">李四</div>
                            <div style="font-size: 10px; color: var(--text-tertiary); margin-left: auto;">昨天</div>
                        </div>
                        <div style="font-size: 11px; color: var(--text-secondary);">
                            项目文件已经发你邮箱了
                        </div>
                    </div>
                `
            },
            phone: {
                title: "电话",
                content: `
                    <div class="page-title">电话</div>
                    <div class="page-subtitle">最近通话</div>
                    <div class="message-list">
                        <div class="notification">
                            <div class="notification-icon icon-phone"></div>
                            <div class="notification-content">
                                <div class="notification-title">张三</div>
                                <div class="notification-text">手机 · 昨天</div>
                                <div class="notification-time">已拨电话</div>
                            </div>
                        </div>
                        <div class="notification">
                            <div class="notification-icon icon-phone"></div>
                            <div class="notification-content">
                                <div class="notification-title">李四</div>
                                <div class="notification-text">手机 · 周一</div>
                                <div class="notification-time">未接来电</div>
                            </div>
                        </div>
                    </div>
                    <div class="keypad" style="margin-top: 30px;">
                        <div class="keypad-row">
                            <button class="control-icon"><span style="font-size: 20px;">1</span></button>
                            <button class="control-icon"><span style="font-size: 20px;">2</span></button>
                            <button class="control-icon"><span style="font-size: 20px;">3</span></button>
                        </div>
                        <div class="keypad-row" style="margin-top: 15px;">
                            <button class="control-icon"><span style="font-size: 20px;">4</span></button>
                            <button class="control-icon"><span style="font-size: 20px;">5</span></button>
                            <button class="control-icon"><span style="font-size: 20px;">6</span></button>
                        </div>
                        <div class="keypad-row" style="margin-top: 15px;">
                            <button class="control-icon"><span style="font-size: 20px;">7</span></button>
                            <button class="control-icon"><span style="font-size: 20px;">8</span></button>
                            <button class="control-icon"><span style="font-size: 20px;">9</span></button>
                        </div>
                        <div class="keypad-row" style="margin-top: 15px;">
                            <button class="control-icon"><span style="font-size: 20px;">*</span></button>
                            <button class="control-icon"><span style="font-size: 20px;">0</span></button>
                            <button class="control-icon"><span style="font-size: 20px;">#</span></button>
                        </div>
                        <div class="keypad-row" style="margin-top: 15px; justify-content: center;">
                            <button class="control-icon" style="width: 150px; background: var(--primary); color: white;">
                                <i class="fas fa-phone" style="font-size: 20px;"></i>
                            </button>
                        </div>
                    </div>
                `,
                preview: `
                    <div class="preview-header">
                        <div class="preview-icon"><i class="fas fa-phone"></i></div>
                        <div class="preview-title">电话</div>
                    </div>
                    <div class="preview-content">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <div style="width: 8px; height: 8px; background: var(--primary); border-radius: 50%;"></div>
                            <div style="font-weight: 600;">张三</div>
                            <div style="font-size: 10px; color: var(--text-tertiary); margin-left: auto;">昨天</div>
                        </div>
                        <div style="font-size: 11px; color: var(--text-secondary); margin-bottom: 12px;">
                            已拨电话 · 手机
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <div style="width: 8px; height: 8px; background: #ff6b6b; border-radius: 50%;"></div>
                            <div style="font-weight: 600;">李四</div>
                            <div style="font-size: 10px; color: var(--text-tertiary); margin-left: auto;">周一</div>
                        </div>
                        <div style="font-size: 11px; color: var(--text-secondary);">
                            未接来电 · 手机
                        </div>
                    </div>
                `
            },
            camera: {
                title: "相机",
                content: `
                    <div class="page-title">相机</div>
                    <div class="page-subtitle">拍照和录像</div>
                    <div class="camera-view" style="width: 100%; height: 400px; background: #333; border-radius: var(--radius-medium); margin: 20px 0; display: flex; align-items: center; justify-content: center; color: white;">
                        <i class="fas fa-camera" style="font-size: 50px;"></i>
                    </div>
                    <div style="display: flex; justify-content: center; gap: 30px; margin-top: 20px;">
                        <div class="control-icon"><i class="fas fa-sync-alt"></i></div>
                        <div class="control-icon" style="width: 70px; height: 70px; background: white; border: 3px solid #ddd;"><i class="fas fa-circle" style="color: #ff4757;"></i></div>
                        <div class="control-icon"><i class="fas fa-images"></i></div>
                    </div>
                `,
                preview: `
                    <div class="preview-header">
                        <div class="preview-icon"><i class="fas fa-camera"></i></div>
                        <div class="preview-title">相机</div>
                    </div>
                    <div class="preview-content">
                        <div style="width: 100%; height: 120px; background: #333; border-radius: var(--radius-small); display: flex; align-items: center; justify-content: center; margin-bottom: 12px;">
                            <i class="fas fa-camera" style="font-size: 24px; color: white;"></i>
                        </div>
                        <div style="display: flex; justify-content: center; gap: 16px;">
                            <div style="width: 20px; height: 20px; background: var(--surface); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-sync-alt" style="font-size: 10px;"></i>
                            </div>
                            <div style="width: 30px; height: 30px; background: white; border: 2px solid #ddd; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <div style="width: 12px; height: 12px; background: #ff4757; border-radius: 50%;"></div>
                            </div>
                            <div style="width: 20px; height: 20px; background: var(--surface); border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                                <i class="fas fa-images" style="font-size: 10px;"></i>
                            </div>
                        </div>
                    </div>
                `
            },
            photos: {
                title: "相册",
                content: `
                    <div class="page-title">相册</div>
                    <div class="page-subtitle">所有照片</div>
                    
                    <div class="photo-grid" id="photoGrid">
                        <!-- 照片将动态生成 -->
                    </div>
                `,
                preview: `
                    <div class="preview-header">
                        <div class="preview-icon"><i class="fas fa-images"></i></div>
                        <div class="preview-title">相册</div>
                    </div>
                    <div class="preview-content">
                        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px;">
                            <div style="width: 100%; aspect-ratio: 1; background: linear-gradient(45deg, #ff6b6b, #feca57); border-radius: 4px;"></div>
                            <div style="width: 100%; aspect-ratio: 1; background: linear-gradient(45deg, #48dbfb, #0abde3); border-radius: 4px;"></div>
                            <div style="width: 100%; aspect-ratio: 1; background: linear-gradient(45deg, #1dd1a1, #10ac84); border-radius: 4px;"></div>
                            <div style="width: 100%; aspect-ratio: 1; background: linear-gradient(45deg, #f368e0, #ff9ff3); border-radius: 4px;"></div>
                            <div style="width: 100%; aspect-ratio: 1; background: linear-gradient(45deg, #ff9f43, #feca57); border-radius: 4px;"></div>
                            <div style="width: 100%; aspect-ratio: 1; background: linear-gradient(45deg, #54a0ff, #2e86de); border-radius: 4px;"></div>
                        </div>
                        <div style="margin-top: 8px; font-size: 11px; color: var(--text-secondary); text-align: center;">
                            最近照片 · 156张
                        </div>
                    </div>
                `
            },
            settings: {
                title: "设置",
                content: `
                    <div class="page-title">设置</div>
                    <div class="page-subtitle">系统设置</div>
                    <div class="message-list">
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-title">WLAN</div>
                                <div class="setting-desc">已连接至 Home-WiFi</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: var(--text-tertiary);"></i>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-title">蓝牙</div>
                                <div class="setting-desc">已开启</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: var(--text-tertiary);"></i>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-title">通知与状态栏</div>
                                <div class="setting-desc">管理通知显示</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: var(--text-tertiary);"></i>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-title">声音与振动</div>
                                <div class="setting-desc">铃声音量、振动模式</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: var(--text-tertiary);"></i>
                        </div>
                        <div class="setting-item" id="wallpaperSettingItem">
                            <div class="setting-info">
                                <div class="setting-title">壁纸与个性化</div>
                                <div class="setting-desc">壁纸、主题、字体</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: var(--text-tertiary);"></i>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-title">全屏模式</div>
                                <div class="setting-desc">开启全屏显示</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="fullscreenToggle">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-title">使用内置浏览器</div>
                                <div class="setting-desc">链接应用使用内置浏览器打开</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" id="useBuiltinBrowserToggle">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        <div class="setting-item" id="appManagementItem">
                            <div class="setting-info">
                                <div class="setting-title">应用管理</div>
                                <div class="setting-desc">管理已安装应用</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: var(--text-tertiary);"></i>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-title">添加链接应用</div>
                                <div class="setting-desc">添加网页应用到桌面</div>
                            </div>
                            <button class="add-app-btn" id="addAppBtn">
                                <i class="fas fa-plus"></i>
                                <span>添加</span>
                            </button>
                        </div>
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-title">密码与安全</div>
                                <div class="setting-desc">指纹、面部识别</div>
                            </div>
                            <i class="fas fa-chevron-right" style="color: var(--text-tertiary);"></i>
                        </div>
                    </div>
                `,
                preview: `
                    <div class="preview-header">
                        <div class="preview-icon"><i class="fas fa-cog"></i></div>
                        <div class="preview-title">设置</div>
                    </div>
                    <div class="preview-content">
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <div style="flex: 1;">
                                <div style="font-weight: 600; font-size: 12px;">WLAN</div>
                                <div style="font-size: 10px; color: var(--text-secondary);">已连接至 Home-WiFi</div>
                            </div>
                            <i class="fas fa-chevron-right" style="font-size: 10px; color: var(--text-tertiary);"></i>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px; margin-bottom: 8px;">
                            <div style="flex: 1;">
                                <div style="font-weight: 600; font-size: 12px;">蓝牙</div>
                                <div style="font-size: 10px; color: var(--text-secondary);">已开启</div>
                            </div>
                            <i class="fas fa-chevron-right" style="font-size: 10px; color: var(--text-tertiary);"></i>
                        </div>
                        <div style="display: flex; align-items: center; gap: 8px;">
                            <div style="flex: 1;">
                                <div style="font-weight: 600; font-size: 12px;">壁纸与个性化</div>
                                <div style="font-size: 10px; color: var(--text-secondary);">壁纸、主题、字体</div>
                            </div>
                            <i class="fas fa-chevron-right" style="font-size: 10px; color: var(--text-tertiary);"></i>
                        </div>
                    </div>
                `
            }
        };
        // ==================== 错误处理系统 ====================
// 添加位置：内存管理系统之后

class ErrorHandler {
  constructor() {
    this.initErrorHandling();
  }

  initErrorHandling() {
    // 全局错误捕获
    window.addEventListener('error', (e) => {
      this.logError('Global Error', e.error);
      this.showUserFriendlyError();
    });

    // Promise rejection 错误捕获
    window.addEventListener('unhandledrejection', (e) => {
      this.logError('Unhandled Promise Rejection', e.reason);
      this.showUserFriendlyError();
    });

    // 应用特定错误处理
    this.wrapAppFunctions();
  }

  logError(type, error) {
    console.error(`[${type}]`, error);
    
    // 这里可以添加错误上报逻辑
    if (navigator.onLine) {
      this.reportErrorToServer(type, error);
    }
  }

  reportErrorToServer(type, error) {
    // 模拟错误上报
    const errorData = {
      type: type,
      message: error?.message || 'Unknown error',
      stack: error?.stack,
      timestamp: new Date().toISOString(),
      url: window.location.href,
      userAgent: navigator.userAgent
    };
    
    console.log('Error reported:', errorData);
    // 实际使用时取消注释下面这行
    // fetch('/api/error-log', { method: 'POST', body: JSON.stringify(errorData) });
  }

  showUserFriendlyError() {
    // 只在没有正在显示的错误时显示
    if (!document.querySelector('.error-toast')) {
      const toast = document.createElement('div');
      toast.className = 'error-toast';
      toast.innerHTML = `
        <div style="position: fixed; top: 100px; left: 50%; transform: translateX(-50%); 
                   background: #ff4757; color: white; padding: 12px 20px; border-radius: 8px; 
                   z-index: 10000; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
          <i class="fas fa-exclamation-triangle"></i>
         出错
        </div>
      `;
      document.body.appendChild(toast);
      
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 3000);
    }
  }

  wrapAppFunctions() {
    // 包装关键应用函数，添加错误处理
    const originalLaunchApp = window.launchAppWithAnimation;
    if (originalLaunchApp) {
      window.launchAppWithAnimation = function(...args) {
        try {
          return originalLaunchApp.apply(this, args);
        } catch (error) {
          this.logError('App Launch Error', error);
          this.showUserFriendlyError();
        }
      };
    }
  }
}

// 初始化错误处理
const errorHandler = new ErrorHandler();
        // 链接应用存储
        let linkApps = JSON.parse(localStorage.getItem('linkApps')) || [];
        // ==================== 缓存优化系统 ====================
// 添加位置：localStorage相关代码之后

class CacheOptimizer {
  constructor() {
    this.cacheVersion = 'v1.2';
    this.initCachingStrategies();
  }

  initCachingStrategies() {
    // 预缓存关键资源
    this.preloadCriticalResources();
    
    // 设置缓存清理策略
    this.setupCacheCleanup();
  }

  preloadCriticalResources() {
    // 预加载关键图标和资源
    const criticalResources = [
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
    ];
    
    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource;
      link.as = 'style';
      document.head.appendChild(link);
    });
  }

  setupCacheCleanup() {
    // 定期清理过期缓存
    setInterval(() => {
      this.cleanExpiredCache();
    }, 24 * 60 * 60 * 1000); // 每天清理一次
  }

  cleanExpiredCache() {
    const now = Date.now();
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);
    
    // 清理过期的应用数据
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('cache_')) {
        try {
          const item = JSON.parse(localStorage.getItem(key));
          if (item && item.timestamp && item.timestamp < oneWeekAgo) {
            localStorage.removeItem(key);
          }
        } catch (e) {
          // 如果解析失败，直接删除
          localStorage.removeItem(key);
        }
      }
    }
  }

  // 智能缓存应用数据
  smartCacheAppData(appId, data) {
    const cacheKey = `cache_${this.cacheVersion}_${appId}`;
    const cacheData = {
      data: data,
      timestamp: Date.now(),
      size: JSON.stringify(data).length
    };
    
    // 检查缓存大小，避免存储过大
    if (cacheData.size < 1024 * 1024) { // 1MB限制
      localStorage.setItem(cacheKey, JSON.stringify(cacheData));
    }
  }

  // 获取智能缓存
  getSmartCachedAppData(appId) {
    const cacheKey = `cache_${this.cacheVersion}_${appId}`;
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const parsed = JSON.parse(cached);
        // 检查是否过期（1小时有效期）
        if (Date.now() - parsed.timestamp < 60 * 60 * 1000) {
          return parsed.data;
        }
      }
    } catch (e) {
      console.warn('Cache read error:', e);
    }
    return null;
  }
}

// 初始化缓存优化器
const cacheOptimizer = new CacheOptimizer();
        // 多任务应用堆栈
        let appStack = JSON.parse(localStorage.getItem('appStack')) || [];
        
        // 壁纸存储
        let currentWallpaper = localStorage.getItem('currentWallpaper') || '';
        let selectedWallpaper = currentWallpaper;
        
        // 应用启动动画系统
        let appLaunchAnimation = null;
        let appLaunchInterrupted = false;
        
        // 手势状态
        let gestureStartY = 0;
        let gestureStartX = 0;
        let gestureZoneStart = false;
        let multitaskGestureActive = false;
        let returnGestureActive = false;
        let homeGestureActive = false;
        
        // 系统设置
        let systemSettings = JSON.parse(localStorage.getItem('systemSettings')) || {
            useBuiltinBrowser: true,
            darkMode: false
        };

        // 暗色模式状态
        let isDarkMode = systemSettings.darkMode || false;
        
        // 小窗模式状态
        let floatingWindowActive = false;
        let floatingWindowApp = null;
        let floatingWindowHistory = [];
        let floatingWindowCurrentState = null;
        
        // 初始化链接应用
        function initLinkApps() {
            const appGrid = document.getElementById('appGrid');
            
            // 移除现有的链接应用
            document.querySelectorAll('.app-icon[data-app^="link-"]').forEach(icon => {
                icon.remove();
            });
            
            linkApps.forEach(app => {
                const appIcon = document.createElement('div');
                appIcon.className = 'app-icon';
                appIcon.setAttribute('data-app', `link-${app.id}`);
                
                const appIconBg = document.createElement('div');
                if (app.iconUrl) {
                    appIconBg.className = 'link-app-icon';
                    appIconBg.style.backgroundImage = `url(${app.iconUrl})`;
                } else {
                    appIconBg.className = 'app-icon-bg';
                    appIconBg.innerHTML = '<i class="fas fa-globe"></i>';
                }
                
                const appName = document.createElement('span');
                appName.className = 'app-name';
                appName.textContent = app.name;
                
                appIcon.appendChild(appIconBg);
                appIcon.appendChild(appName);
                appGrid.appendChild(appIcon);
                
                // 添加点击事件
                appIcon.addEventListener('click', function() {
                    launchLinkApp(app);
                });
            });
        }

        // 初始化应用管理页面
        function initAppManagement() {
            const appManagementGrid = document.getElementById('appManagementGrid');
            appManagementGrid.innerHTML = '';
            
            // 添加原生应用
            const nativeApps = [
                { id: 'messages', name: '信息', icon: 'icon-messages' },
                { id: 'phone', name: '电话', icon: 'icon-phone' },
                { id: 'camera', name: '相机', icon: 'icon-camera' },
                { id: 'photos', name: '相册', icon: 'icon-photos' },
                { id: 'weather', name: '天气', icon: 'icon-weather' },
                { id: 'maps', name: '地图', icon: 'icon-maps' },
                { id: 'calendar', name: '日历', icon: 'icon-calendar' },
                { id: 'notes', name: '笔记', icon: 'icon-notes' },
                { id: 'settings', name: '设置', icon: 'icon-settings' }
            ];
            
            nativeApps.forEach(app => {
                const appItem = document.createElement('div');
                appItem.className = 'app-management-item';
                
                const appIcon = document.createElement('div');
                appIcon.className = `app-icon-bg ${app.icon}`;
                
                const appName = document.createElement('span');
                appName.className = 'app-name';
                appName.textContent = app.name;
                
                const appActions = document.createElement('div');
                appActions.className = 'app-management-actions';
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'app-management-action';
                deleteBtn.textContent = '卸载';
                deleteBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    // 这里可以添加卸载逻辑
                    showHint('系统应用无法卸载');
                });
                
                appActions.appendChild(deleteBtn);
                
                appItem.appendChild(appIcon);
                appItem.appendChild(appName);
                appItem.appendChild(appActions);
                
                appManagementGrid.appendChild(appItem);
            });
            
            // 添加链接应用
            linkApps.forEach(app => {
                const appItem = document.createElement('div');
                appItem.className = 'app-management-item';
                
                const appIcon = document.createElement('div');
                if (app.iconUrl) {
                    appIcon.className = 'link-app-icon';
                    appIcon.style.backgroundImage = `url(${app.iconUrl})`;
                } else {
                    appIcon.className = 'app-icon-bg';
                    appIcon.innerHTML = '<i class="fas fa-globe"></i>';
                }
                
                const appName = document.createElement('span');
                appName.className = 'app-name';
                appName.textContent = app.name;
                
                const appActions = document.createElement('div');
                appActions.className = 'app-management-actions';
                
                const deleteBtn = document.createElement('button');
                deleteBtn.className = 'app-management-action';
                deleteBtn.textContent = '删除';
                deleteBtn.addEventListener('click', function(e) {
                    e.stopPropagation();
                    deleteLinkApp(app.id);
                });
                
                appActions.appendChild(deleteBtn);
                
                appItem.appendChild(appIcon);
                appItem.appendChild(appName);
                appItem.appendChild(appActions);
                
                appManagementGrid.appendChild(appItem);
            });
        }

        // 初始化新壁纸系统
        function initWallpaperSystem() {
            // 应用当前壁纸
            if (currentWallpaper) {
                document.body.classList.add('custom-wallpaper');
                document.body.style.backgroundImage = `url(${currentWallpaper})`;
            }
            
            // 初始化壁纸设置页面
            initWallpaperPage();
        }

        // 初始化新壁纸页面
        function initWallpaperPage() {
            const wallpaperGrid = document.getElementById('wallpaperGrid');
            const fileInput = document.getElementById('wallpaperFileInput');
            const uploadArea = document.getElementById('wallpaperUploadArea');
            const uploadBtn = document.getElementById('wallpaperUploadBtn');
            const setBtn = document.getElementById('wallpaperSetBtn');
            
            // 清空壁纸网格
            wallpaperGrid.innerHTML = '';
            
            // 添加默认壁纸选项
            const defaultWallpapers = [
                { name: '渐变蓝紫', color: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' },
                { name: '渐变粉红', color: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' },
                { name: '渐变青蓝', color: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)' },
                { name: '渐变绿青', color: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)' },
                { name: '渐变黄粉', color: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)' },
                { name: '渐变浅色', color: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)' }
            ];
            
            defaultWallpapers.forEach((wallpaper, index) => {
                const wallpaperItem = document.createElement('div');
                wallpaperItem.className = 'wallpaper-item';
                if (!currentWallpaper && index === 0) {
                    wallpaperItem.classList.add('selected');
                    selectedWallpaper = '';
                }
                
                wallpaperItem.style.background = wallpaper.color;
                
                wallpaperItem.addEventListener('click', function() {
                    // 移除其他选项的选中状态
                    document.querySelectorAll('.wallpaper-item').forEach(item => {
                        item.classList.remove('selected');
                    });
                    
                    // 设置当前选项为选中状态
                    this.classList.add('selected');
                    selectedWallpaper = '';
                });
                
                wallpaperGrid.appendChild(wallpaperItem);
            });
            
            // 添加上传功能
            uploadArea.addEventListener('click', function() {
                fileInput.click();
            });
            
            uploadBtn.addEventListener('click', function() {
                fileInput.click();
            });
            
            fileInput.addEventListener('change', function(e) {
                if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    const reader = new FileReader();
                    
                    reader.onload = function(e) {
                        // 移除其他选项的选中状态
                        document.querySelectorAll('.wallpaper-item').forEach(item => {
                            item.classList.remove('selected');
                        });
                        
                        // 创建新的壁纸选项
                        const wallpaperItem = document.createElement('div');
                        wallpaperItem.className = 'wallpaper-item selected';
                        
                        const wallpaperPreview = document.createElement('img');
                        wallpaperPreview.className = 'wallpaper-preview';
                        wallpaperPreview.src = e.target.result;
                        
                        wallpaperItem.appendChild(wallpaperPreview);
                        wallpaperItem.addEventListener('click', function() {
                            // 移除其他选项的选中状态
                            document.querySelectorAll('.wallpaper-item').forEach(item => {
                                item.classList.remove('selected');
                            });
                            
                            // 设置当前选项为选中状态
                            this.classList.add('selected');
                            selectedWallpaper = e.target.result;
                        });
                        
                        wallpaperGrid.appendChild(wallpaperItem);
                        selectedWallpaper = e.target.result;
                    };
                    
                    reader.readAsDataURL(file);
                }
            });
            
            setBtn.addEventListener('click', function() {
                setWallpaper(selectedWallpaper);
            });
        }

        // 设置壁纸
        function setWallpaper(url) {
            if (url) {
                currentWallpaper = url;
                document.body.classList.add('custom-wallpaper');
                document.body.style.backgroundImage = `url(${url})`;
            } else {
                currentWallpaper = '';
                document.body.classList.remove('custom-wallpaper');
                document.body.style.backgroundImage = '';
            }
            
            localStorage.setItem('currentWallpaper', currentWallpaper);
            document.getElementById('wallpaperWindow').classList.remove('active');
            showHint('壁纸设置成功');
        }

        // 删除链接应用
        function deleteLinkApp(appId) {
            linkApps = linkApps.filter(app => app.id !== appId);
            localStorage.setItem('linkApps', JSON.stringify(linkApps));
            
            // 同时从应用堆栈中移除
            appStack = appStack.filter(app => app.id !== `link-${appId}`);
            localStorage.setItem('appStack', JSON.stringify(appStack));
            
            // 更新UI
            initLinkApps();
            initAppManagement();
            updateMultitaskView();
            
            showHint('应用已删除');
        }
        
        // 启动链接应用
        function launchLinkApp(app) {
            document.getElementById('appTitle').textContent = app.name;
            
            if (systemSettings.useBuiltinBrowser) {
                // 使用内置浏览器
                document.getElementById('appContent').innerHTML = `
                    <div class="page-title">${app.name}</div>
                    <div class="page-subtitle">网页应用</div>
                    <iframe src="${app.url}" style="width: 100%; height: 100%; border: none; border-radius: var(--radius-medium);"></iframe>
                `;
            } else {
                // 使用外部浏览器
                document.getElementById('appContent').innerHTML = `
                    <div class="page-title">${app.name}</div>
                    <div class="page-subtitle">网页应用</div>
                    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 20px;">
                        <i class="fas fa-external-link-alt" style="font-size: 60px; color: var(--primary);"></i>
                        <h3>外部浏览器打开</h3>
                        <p>将在外部浏览器中打开: ${app.url}</p>
                        <button class="btn btn-primary" onclick="window.open('${app.url}', '_blank')">打开链接</button>
                    </div>
                `;
            }
            
            document.getElementById('appWindow').classList.add('active');
            
            // 添加到应用堆栈
            addToAppStack({
                id: `link-${app.id}`,
                title: app.name,
                type: 'link'
            });
        }
        
        // 添加到应用堆栈
        function addToAppStack(app) {
            // 如果应用已经在堆栈中，先移除
            appStack = appStack.filter(item => item.id !== app.id);
            appStack.push(app);
            
            // 保存到本地存储
            localStorage.setItem('appStack', JSON.stringify(appStack));
            
            // 更新多任务视图
            updateMultitaskView();
        }
        
        // 更新多任务视图 - 优化版：添加毛玻璃效果和内容预览
        function updateMultitaskView() {
            const multitaskCardStack = document.getElementById('multitaskCardStack');
            multitaskCardStack.innerHTML = '';
            
            // 显示所有应用，不只是最近3个
            const recentApps = [...appStack].reverse(); // 反转数组以显示最近打开的应用在前面
            
            recentApps.forEach((app, index) => {
                const appCard = document.createElement('div');
                appCard.className = 'stacked-card';
                appCard.setAttribute('data-app', app.id);
                if (index === 0) {
                    appCard.classList.add('active');
                }
                
                // 根据应用数量调整位置
                const totalApps = recentApps.length;
                const maxOffset = Math.min(120, (totalApps - 1) * 40);
                const offset = index * (maxOffset / (totalApps - 1)) - maxOffset / 2;
                
                if (index === 0) {
                    appCard.style.transform = 'translateX(0) rotateY(0deg) scale(1)';
                } else {
                    appCard.style.transform = `translateX(${offset}px) rotateY(${offset > 0 ? 10 : -10}deg) scale(0.9)`;
                }
                
                const appCardHeader = document.createElement('div');
                appCardHeader.className = 'stacked-card-header';
                
                // 创建预览内容区域
                const previewContent = document.createElement('div');
                previewContent.className = 'stacked-card-preview';
                
                // 根据应用类型设置预览内容
                if (app.type === 'link') {
                    previewContent.innerHTML = `
                        <div class="preview-header">
                            <div class="preview-icon"><i class="fas fa-globe"></i></div>
                            <div class="preview-title">${app.title}</div>
                        </div>
                        <div class="preview-content">
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px;">
                                <i class="fas fa-external-link-alt" style="font-size: 32px; color: var(--primary);"></i>
                                <div style="font-size: 14px; color: var(--text-secondary); text-align: center;">网页应用</div>
                                <div style="font-size: 12px; color: var(--text-tertiary); text-align: center;">点击打开</div>
                            </div>
                        </div>
                    `;
                } else {
                    // 使用应用的预览内容
                    if (appData[app.id] && appData[app.id].preview) {
                        previewContent.innerHTML = appData[app.id].preview;
                    } else {
                        previewContent.innerHTML = `
                            <div class="preview-header">
                                <div class="preview-icon"><i class="fas fa-mobile-alt"></i></div>
                                <div class="preview-title">${app.title}</div>
                            </div>
                            <div class="preview-content">
                                <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 12px;">
                                    <i class="fas fa-mobile-alt" style="font-size: 32px; color: var(--primary);"></i>
                                    <div style="font-size: 14px; color: var(--text-secondary); text-align: center;">应用预览</div>
                                </div>
                            </div>
                        `;
                    }
                }
                
                appCardHeader.appendChild(previewContent);
                
                const appCardFooter = document.createElement('div');
                appCardFooter.className = 'stacked-card-footer';
                appCardFooter.textContent = app.title;
                
                appCard.appendChild(appCardHeader);
                appCard.appendChild(appCardFooter);
                
                appCard.addEventListener('click', function() {
                    // 从多任务界面打开应用，带有过渡动画
                    openAppFromMultitask(app);
                });
                
                // 添加上滑删除功能
                initSwipeToDelete(appCard, app);
                
                // 添加拖拽到小窗区域功能
                initDragToFloatingWindow(appCard, app);
                
                multitaskCardStack.appendChild(appCard);
            });

            // 添加滑动事件
            initMultitaskSwipe();
        }

        // 初始化拖拽到小窗区域功能
        function initDragToFloatingWindow(appCard, app) {
            let startX = 0;
            let startY = 0;
            let isDragging = false;
            let floatingZone = document.getElementById('floatingWindowZone');
            let floatingHint = document.getElementById('floatingHint');
            
            appCard.addEventListener('touchstart', function(e) {
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                isDragging = true;
                
                // 添加拖动效果
                this.style.transition = 'transform 0.2s ease';
                this.style.transform = 'scale(1.05)';
            });
            
            appCard.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                
                // 计算移动距离
                const diffX = currentX - startX;
                const diffY = currentY - startY;
                
                // 移动卡片
                this.style.transform = `translate(${diffX}px, ${diffY}px) scale(1.05)`;
                
                // 检查是否进入小窗区域
                const cardRect = this.getBoundingClientRect();
                const zoneRect = floatingZone.getBoundingClientRect();
                
                if (cardRect.left < zoneRect.right && 
                    cardRect.right > zoneRect.left && 
                    cardRect.top < zoneRect.bottom && 
                    cardRect.bottom > zoneRect.top) {
                    // 进入小窗区域
                    floatingZone.classList.add('active');
                    floatingHint.classList.add('active');
                } else {
                    // 离开小窗区域
                    floatingZone.classList.remove('active');
                    floatingHint.classList.remove('active');
                }
            });
            
            appCard.addEventListener('touchend', function(e) {
                if (!isDragging) return;
                
                isDragging = false;
                
                // 检查是否在小窗区域内释放
                const cardRect = this.getBoundingClientRect();
                const zoneRect = floatingZone.getBoundingClientRect();
                
                if (cardRect.left < zoneRect.right && 
                    cardRect.right > zoneRect.left && 
                    cardRect.top < zoneRect.bottom && 
                    cardRect.bottom > zoneRect.top) {
                    // 在小窗区域内释放，打开小窗
                    openFloatingWindow(app);
                    showHint(`小﹉窗 ${app.title}`);
                }
                
                // 恢复卡片位置
                this.style.transform = '';
                this.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
                
                // 重置小窗区域状态
                floatingZone.classList.remove('active');
                floatingHint.classList.remove('active');
            });
        }

        // 打开小窗模式
        function openFloatingWindow(app) {
            const floatingWindow = document.getElementById('floatingWindow');
            const floatingWindowTitle = document.getElementById('floatingWindowTitle');
            const floatingWindowContent = document.getElementById('floatingWindowContent');
            
            // 设置小窗应用标识
            floatingWindow.setAttribute('data-app', app.id);
            
            // 设置小窗标题
            floatingWindowTitle.textContent = app.title;
            
            // 重置小窗历史记录
            floatingWindowHistory = [];
            floatingWindowCurrentState = null;
            
            // 设置小窗内容
            loadFloatingWindowContent(app);
            
            // 设置小窗位置（右上角）
            floatingWindow.style.top = '80px';
            floatingWindow.style.right = '20px';
            floatingWindow.style.left = 'auto';
            
            // 显示小窗
            floatingWindow.classList.add('active');
            floatingWindow.classList.remove('minimized');
            floatingWindowActive = true;
            floatingWindowApp = app;
            
            // 初始化小窗拖拽功能
            initFloatingWindowDrag();
            
            // 隐藏多任务界面
            document.getElementById('multitaskView').classList.remove('active');
        }

        // 加载小窗内容
        function loadFloatingWindowContent(app, specificContent = null) {
            const floatingWindowContent = document.getElementById('floatingWindowContent');
            
            if (specificContent) {
                floatingWindowContent.innerHTML = specificContent;
            } else if (app.type === 'link') {
                const linkApp = linkApps.find(link => `link-${link.id}` === app.id);
                if (linkApp) {
                    if (systemSettings.useBuiltinBrowser) {
                        floatingWindowContent.innerHTML = `
                            <div style="width: 100%; height: 100%;">
                                <iframe src="${linkApp.url}" style="width: 100%; height: 100%; border: none; border-radius: var(--radius-medium);"></iframe>
                            </div>
                        `;
                    } else {
                        floatingWindowContent.innerHTML = `
                            <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 20px;">
                                <i class="fas fa-external-link-alt" style="font-size: 40px; color: var(--primary);"></i>
                                <h3>外部浏览器打开</h3>
                                <p>将在外部浏览器中打开: ${linkApp.url}</p>
                                <button class="btn btn-primary" onclick="window.open('${linkApp.url}', '_blank')">打开链接</button>
                            </div>
                        `;
                    }
                }
            } else {
                if (appData[app.id]) {
                    floatingWindowContent.innerHTML = appData[app.id].content;
                    // 初始化小窗中的交互功能
                    initFloatingWindowInteractions(app.id);
                }
            }
            
            // 保存当前状态到历史记录
            if (floatingWindowCurrentState) {
                floatingWindowHistory.push(floatingWindowCurrentState);
            }
            floatingWindowCurrentState = {
                app: app,
                content: floatingWindowContent.innerHTML
            };
        }

        // 初始化小窗中的交互功能
        function initFloatingWindowInteractions(appId) {
            const floatingWindowContent = document.getElementById('floatingWindowContent');
            
            if (appId === 'settings') {
                // 初始化设置应用中的交互
                const fullscreenToggle = floatingWindowContent.querySelector('#fullscreenToggle');
                if (fullscreenToggle) {
                    fullscreenToggle.checked = document.body.classList.contains('fullscreen-mode');
                    fullscreenToggle.addEventListener('change', toggleFullscreenMode);
                }
                
                const builtinBrowserToggle = floatingWindowContent.querySelector('#useBuiltinBrowserToggle');
                if (builtinBrowserToggle) {
                    builtinBrowserToggle.checked = systemSettings.useBuiltinBrowser;
                    builtinBrowserToggle.addEventListener('change', toggleBuiltinBrowser);
                }
                
                // 初始化添加应用按钮
                const addAppBtn = floatingWindowContent.querySelector('#addAppBtn');
                if (addAppBtn) {
                    addAppBtn.addEventListener('click', showAddAppDialog);
                }

                // 初始化应用管理项
                const appManagementItem = floatingWindowContent.querySelector('#appManagementItem');
                if (appManagementItem) {
                    appManagementItem.addEventListener('click', function() {
                        openFloatingWindowContent({
                            title: '应用管理',
                            content: document.getElementById('appManagementWindow').querySelector('.app-content').innerHTML
                        });
                        initAppManagement();
                    });
                }
                
                // 初始化壁纸设置项
                const wallpaperSettingItem = floatingWindowContent.querySelector('#wallpaperSettingItem');
                if (wallpaperSettingItem) {
                    wallpaperSettingItem.addEventListener('click', function() {
                        openFloatingWindowContent({
                            title: '壁纸与个性化',
                            content: document.getElementById('wallpaperWindow').querySelector('.app-content').innerHTML
                        });
                        initWallpaperPage();
                    });
                }
            }
        }

        // 在小窗中打开新内容
        function openFloatingWindowContent(contentInfo) {
            const floatingWindowTitle = document.getElementById('floatingWindowTitle');
            const floatingWindowContent = document.getElementById('floatingWindowContent');
            
            // 更新标题
            floatingWindowTitle.textContent = contentInfo.title;
            
            // 加载内容
            loadFloatingWindowContent(floatingWindowApp, contentInfo.content);
        }

        // 小窗返回上一步
        function floatingWindowBack() {
            if (floatingWindowHistory.length > 0) {
                const previousState = floatingWindowHistory.pop();
                const floatingWindowTitle = document.getElementById('floatingWindowTitle');
                const floatingWindowContent = document.getElementById('floatingWindowContent');
                
                floatingWindowTitle.textContent = previousState.app.title;
                floatingWindowContent.innerHTML = previousState.content;
                floatingWindowCurrentState = previousState;
                
                // 重新初始化交互
                initFloatingWindowInteractions(previousState.app.id);
            } else {
                // 如果没有历史记录，恢复到初始状态
                loadFloatingWindowContent(floatingWindowApp);
            }
        }

        // 小窗最小化
        function minimizeFloatingWindow() {
            const floatingWindow = document.getElementById('floatingWindow');
            floatingWindow.classList.add('minimized');
        }

        // 恢复小窗
        function restoreFloatingWindow() {
            const floatingWindow = document.getElementById('floatingWindow');
            if (floatingWindow.classList.contains('minimized')) {
                floatingWindow.classList.remove('minimized');
            }
        }

        // 初始化小窗拖拽功能
        function initFloatingWindowDrag() {
            const floatingWindow = document.getElementById('floatingWindow');
            const floatingWindowHeader = document.getElementById('floatingWindowHeader');
            
            let isDragging = false;
            let startX, startY, initialX, initialY;
            
            floatingWindowHeader.addEventListener('touchstart', function(e) {
                if (floatingWindow.classList.contains('minimized')) {
                    restoreFloatingWindow();
                    return;
                }
                
                isDragging = true;
                startX = e.touches[0].clientX;
                startY = e.touches[0].clientY;
                
                // 获取初始位置
                const rect = floatingWindow.getBoundingClientRect();
                initialX = rect.left;
                initialY = rect.top;
                
                // 添加拖动效果
                floatingWindow.style.transition = 'none';
            });
            
            document.addEventListener('touchmove', function(e) {
                if (!isDragging) return;
                
                const currentX = e.touches[0].clientX;
                const currentY = e.touches[0].clientY;
                
                // 计算移动距离
                const diffX = currentX - startX;
                const diffY = currentY - startY;
                
                // 移动小窗
                floatingWindow.style.left = `${initialX + diffX}px`;
                floatingWindow.style.top = `${initialY + diffY}px`;
                floatingWindow.style.right = 'auto';
            });
            
            document.addEventListener('touchend', function() {
                isDragging = false;
                floatingWindow.style.transition = 'all 0.3s ease';
            });
            
            // 点击最小化的小窗恢复
            floatingWindow.addEventListener('click', function(e) {
                if (this.classList.contains('minimized')) {
                    restoreFloatingWindow();
                }
            });
        }

        // 关闭小窗
        function closeFloatingWindow() {
            const floatingWindow = document.getElementById('floatingWindow');
            floatingWindow.classList.remove('active');
            floatingWindowActive = false;
            floatingWindowApp = null;
            floatingWindowHistory = [];
            floatingWindowCurrentState = null;
        }

        // 初始化多任务滑动 - 优化：使滑动更流畅
        function initMultitaskSwipe() {
            const cards = document.querySelectorAll('.stacked-card');
            let startX = 0;
            let currentX = 0;
            let isSwiping = false;

            cards.forEach(card => {
                card.addEventListener('touchstart', function(e) {
                    startX = e.touches[0].clientX;
                    isSwiping = true;
                    // 添加流畅过渡效果
                    this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                });

                card.addEventListener('touchmove', function(e) {
                    if (!isSwiping) return;
                    
                    currentX = e.touches[0].clientX;
                    const diffX = currentX - startX;
                    
                    // 限制滑动范围
                    if (Math.abs(diffX) > 50) {
                        this.style.transform = `translateX(${diffX}px) rotateY(${diffX > 0 ? 10 : -10}deg)`;
                    }
                });

                card.addEventListener('touchend', function(e) {
                    if (!isSwiping) return;
                    
                    const diffX = currentX - startX;
                    
                    // 如果滑动距离足够，切换到下一个应用
                    if (Math.abs(diffX) > 100) {
                        const cards = Array.from(document.querySelectorAll('.stacked-card'));
                        const currentIndex = cards.indexOf(this);
                        const nextIndex = diffX > 0 ? 
                            (currentIndex + 1) % cards.length : 
                            (currentIndex - 1 + cards.length) % cards.length;
                        
                        // 移除当前激活状态
                        cards.forEach(card => card.classList.remove('active'));
                        // 激活下一个卡片
                        cards[nextIndex].classList.add('active');
                        
                        // 更新卡片位置
                        updateCardPositions(cards, nextIndex);
                    } else {
                        // 恢复原位
                        const currentIndex = cards.indexOf(this);
                        updateCardPositions(cards, currentIndex);
                    }
                    
                    isSwiping = false;
                    startX = 0;
                    currentX = 0;
                });
            });
        }

        // 初始化上滑删除功能
        function initSwipeToDelete(appCard, app) {
            let startY = 0;
            let currentY = 0;
            let isSwiping = false;
            let deleteHint = document.getElementById('deleteHint');

            appCard.addEventListener('touchstart', function(e) {
                startY = e.touches[0].clientY;
                isSwiping = true;
                deleteHint.classList.add('active');
                // 添加流畅过渡效果
                this.style.transition = 'transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease';
            });

            appCard.addEventListener('touchmove', function(e) {
                if (!isSwiping) return;
                
                currentY = e.touches[0].clientY;
                const diffY = startY - currentY; // 向上滑动为正值
                
                // 限制滑动范围
                if (diffY > 0) {
                    this.style.transform = `translateY(-${diffY}px) scale(${1 - diffY/500})`;
                    this.style.opacity = `${1 - diffY/300}`;
                }
            });

            appCard.addEventListener('touchend', function(e) {
                if (!isSwiping) return;
                
                const diffY = startY - currentY;
                
                // 如果上滑距离足够，删除应用
                if (diffY > 100) {
                    this.classList.add('deleting');
                    
                    setTimeout(() => {
                        removeFromAppStack(app.id);
                        showHint('应用已关闭');
                    }, 400);
                } else {
                    // 恢复原位
                    this.style.transform = '';
                    this.style.opacity = '';
                }
                
                isSwiping = false;
                startY = 0;
                currentY = 0;
                deleteHint.classList.remove('active');
            });
        }

        // 更新卡片位置
        function updateCardPositions(cards, activeIndex) {
            const totalApps = cards.length;
            const maxOffset = Math.min(120, (totalApps - 1) * 40);
            
            cards.forEach((card, index) => {
                const offset = (index - activeIndex) * (maxOffset / (totalApps - 1));
                
                if (index === activeIndex) {
                    card.style.transform = 'translateX(0) rotateY(0deg) scale(1)';
                } else {
                    card.style.transform = `translateX(${offset}px) rotateY(${offset > 0 ? 10 : -10}deg) scale(0.9)`;
                }
            });
        }
        
        // 从多任务界面打开应用
        function openAppFromMultitask(app) {
            // 显示过渡动画
            const transition = document.getElementById('appTransition');
            const transitionIcon = document.getElementById('appTransitionIcon');
            
            // 设置过渡动画图标
            if (app.type === 'link') {
                transitionIcon.innerHTML = '<i class="fas fa-globe"></i>';
            } else {
                const iconClass = `icon-${app.id}`;
                transitionIcon.className = `app-transition-icon ${iconClass}`;
            }
            
            transition.classList.add('active');
            
            // 隐藏多任务界面
            document.getElementById('multitaskView').classList.remove('active');
            
            // 短暂延迟后打开应用
            setTimeout(() => {
                if (app.type === 'link') {
                    const linkApp = linkApps.find(link => `link-${link.id}` === app.id);
                    if (linkApp) {
                        launchLinkApp(linkApp);
                    }
                } else {
                    launchAppFromStack(app.id);
                }
                
                // 隐藏过渡动画
                setTimeout(() => {
                    transition.classList.remove('active');
                }, 300);
            }, 500);
        }
        
        // 从应用堆栈移除应用
        function removeFromAppStack(appId) {
            appStack = appStack.filter(app => app.id !== appId);
            localStorage.setItem('appStack', JSON.stringify(appStack));
            updateMultitaskView();
            
            // 如果移除的是当前应用，关闭应用窗口
            if (appStack.length === 0 || appStack[appStack.length-1].id !== appId) {
                document.getElementById('appWindow').classList.remove('active');
            }
        }
        
        // 从堆栈启动应用
        function launchAppFromStack(appId) {
            if (appData[appId]) {
                document.getElementById('appTitle').textContent = appData[appId].title;
                document.getElementById('appContent').innerHTML = appData[appId].content;
                document.getElementById('appWindow').classList.add('active');
                
                // 初始化应用交互
                initAppInteractions(appId);
            }
        }

        // 初始化应用交互
        function initAppInteractions(appId) {
            if (appId === 'settings') {
                const fullscreenToggle = document.getElementById('fullscreenToggle');
                fullscreenToggle.checked = document.body.classList.contains('fullscreen-mode');
                fullscreenToggle.addEventListener('change', toggleFullscreenMode);
                
                const builtinBrowserToggle = document.getElementById('useBuiltinBrowserToggle');
                builtinBrowserToggle.checked = systemSettings.useBuiltinBrowser;
                builtinBrowserToggle.addEventListener('change', toggleBuiltinBrowser);
                
                // 初始化添加应用按钮
                document.getElementById('addAppBtn').addEventListener('click', showAddAppDialog);

                // 初始化应用管理项
                document.getElementById('appManagementItem').addEventListener('click', openAppManagement);
                
                // 初始化壁纸设置项
                document.getElementById('wallpaperSettingItem').addEventListener('click', openWallpaperSettings);
            }
        }

        // 打开应用管理
        function openAppManagement() {
            document.getElementById('appManagementWindow').classList.add('active');
            initAppManagement();
        }

        // 关闭应用管理
        function closeAppManagement() {
            document.getElementById('appManagementWindow').classList.remove('active');
        }

        // 打开壁纸设置
        function openWallpaperSettings() {
            document.getElementById('wallpaperWindow').classList.add('active');
            initWallpaperPage();
        }

        // 关闭壁纸设置
        function closeWallpaperSettings() {
            document.getElementById('wallpaperWindow').classList.remove('active');
        }

        // 清除所有应用
        document.getElementById('multitaskClearBtn').addEventListener('click', function() {
            appStack = [];
            localStorage.setItem('appStack', JSON.stringify(appStack));
            updateMultitaskView();
            showHint('已清除所有应用');
        });
        
        // 切换内置浏览器设置
        function toggleBuiltinBrowser() {
            systemSettings.useBuiltinBrowser = document.getElementById('useBuiltinBrowserToggle').checked;
            localStorage.setItem('systemSettings', JSON.stringify(systemSettings));
            
            // 显示提示
            showHint(systemSettings.useBuiltinBrowser ? '已启用内置浏览器' : '已禁用内置浏览器');
        }
        
        // 显示添加应用对话框
        function showAddAppDialog() {
            document.getElementById('addAppDialog').classList.add('active');
        }
        
        // 隐藏添加应用对话框
        function hideAddAppDialog() {
            document.getElementById('addAppDialog').classList.remove('active');
            // 清空表单
            document.getElementById('appNameInput').value = '';
            document.getElementById('appUrlInput').value = '';
            document.getElementById('appIconInput').value = '';
        }
        
        // 添加链接应用
        function addLinkApp() {
            const name = document.getElementById('appNameInput').value.trim();
            const url = document.getElementById('appUrlInput').value.trim();
            const iconUrl = document.getElementById('appIconInput').value.trim();
            
            if (!name || !url) {
                alert('请填写应用名称和链接');
                return;
            }
            
            // 验证URL格式
            try {
                new URL(url);
            } catch (e) {
                alert('请输入有效的URL');
                return;
            }
            
            const newApp = {
                id: Date.now().toString(),
                name: name,
                url: url,
                iconUrl: iconUrl || null
            };
            
            linkApps.push(newApp);
            localStorage.setItem('linkApps', JSON.stringify(linkApps));
            
            // 更新UI
            initLinkApps();
            hideAddAppDialog();
            
            // 显示成功提示
            showHint('应用已添加到桌面');
        }

        // 显示提示
        function showHint(message) {
            const hint = document.getElementById('fullscreenHint');
            hint.textContent = message;
            hint.style.display = 'block';
            setTimeout(() => {
                hint.style.display = 'none';
            }, 2000);
        }
        
        // 应用打开功能
        document.querySelectorAll('.app-icon, .dock-app').forEach(icon => {
            icon.addEventListener('click', function(e) {
                // 如果是文件夹，只打开文件夹不启动应用
                if (this.classList.contains('folder')) {
                    this.classList.toggle('open');
                    return;
                }
                
                const appId = this.getAttribute('data-app');
                if (appData[appId]) {
                    launchAppWithAnimation(this, appId);
                    
                    // 添加到应用堆栈
                    addToAppStack({
                        id: appId,
                        title: appData[appId].title,
                        type: 'native'
                    });
                }
            });
            
            // 长按交互
            let pressTimer;
            icon.addEventListener('touchstart', function(e) {
                pressTimer = setTimeout(() => {
                    showLongPressMenu(this, e);
                }, 500);
            });
            
            icon.addEventListener('touchend', function() {
                clearTimeout(pressTimer);
            });
            
            icon.addEventListener('touchmove', function() {
                clearTimeout(pressTimer);
            });
        });
        
        // 应用启动动画
        function launchAppWithAnimation(icon, appId) {
            if (appLaunchAnimation) {
                // 如果已经有动画在运行，中断它
                appLaunchInterrupted = true;
                clearTimeout(appLaunchAnimation);
            }
            
            const iconRect = icon.getBoundingClientRect();
            const iconClone = icon.querySelector('.app-icon-bg').cloneNode(true);
            
            // 设置克隆图标的位置和样式
            iconClone.classList.add('app-icon-clone');
            iconClone.style.position = 'fixed';
            iconClone.style.top = `${iconRect.top}px`;
            iconClone.style.left = `${iconRect.left}px`;
            iconClone.style.width = `${iconRect.width}px`;
            iconClone.style.height = `${iconRect.height}px`;
            iconClone.style.zIndex = '3000';
            iconClone.style.transition = 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            document.body.appendChild(iconClone);
            
            // 阶段1：图标放大 (0-150ms)
            setTimeout(() => {
                if (appLaunchInterrupted) return;
                
                iconClone.style.transform = 'scale(1.1)';
                iconClone.style.opacity = '0.8';
                
                // 周围图标轻微向外扩散
                const surroundingIcons = getSurroundingIcons(icon);
                surroundingIcons.forEach(surroundingIcon => {
                    surroundingIcon.style.transform = 'scale(0.95)';
                    surroundingIcon.style.transition = 'transform 0.2s ease';
                });
            }, 0);
            
            // 阶段2：全屏过渡 (150-300ms)
            setTimeout(() => {
                if (appLaunchInterrupted) return;
                
                const screenCenterX = window.innerWidth / 2;
                const screenCenterY = window.innerHeight / 2;
                
                iconClone.style.top = `${screenCenterY}px`;
                iconClone.style.left = `${screenCenterX}px`;
                iconClone.style.transform = 'translate(-50%, -50%) scale(1.5)';
                iconClone.style.opacity = '0';
                
                // 背景添加模糊蒙版效果
                document.getElementById('homeScreen').style.filter = 'blur(5px)';
                document.getElementById('homeScreen').style.transition = 'filter 0.3s ease';
            }, 150);
            
            // 阶段3：内容加载 (300-450ms)
            setTimeout(() => {
                if (appLaunchInterrupted) {
                    // 清理中断状态
                    appLaunchInterrupted = false;
                    if (iconClone.parentNode) {
                        iconClone.parentNode.removeChild(iconClone);
                    }
                    resetSurroundingIcons();
                    document.getElementById('homeScreen').style.filter = 'none';
                    return;
                }
                
                // 移除克隆图标
                if (iconClone.parentNode) {
                    iconClone.parentNode.removeChild(iconClone);
                }
                
                // 恢复周围图标
                resetSurroundingIcons();
                
                // 加载应用内容
                document.getElementById('appTitle').textContent = appData[appId].title;
                document.getElementById('appContent').innerHTML = appData[appId].content;
                
                // 显示应用窗口
                document.getElementById('appWindow').classList.add('active');
                
                // 恢复背景模糊
                document.getElementById('homeScreen').style.filter = 'none';
                
                // 初始化应用交互
                initAppInteractions(appId);
                
                appLaunchAnimation = null;
            }, 300);
        }
        
        // 获取周围图标
        function getSurroundingIcons(icon) {
            const allIcons = Array.from(document.querySelectorAll('.app-icon:not(.folder)'));
            const iconIndex = allIcons.indexOf(icon);
            const surroundingIcons = [];
            
            // 获取前后各两个图标
            for (let i = Math.max(0, iconIndex - 2); i <= Math.min(allIcons.length - 1, iconIndex + 2); i++) {
                if (i !== iconIndex) {
                    surroundingIcons.push(allIcons[i]);
                }
            }
            
            return surroundingIcons;
        }
        
        // 重置周围图标
        function resetSurroundingIcons() {
            document.querySelectorAll('.app-icon').forEach(icon => {
                icon.style.transform = '';
            });
        }
        
        // 显示长按菜单
        function showLongPressMenu(icon, event) {
            const menu = document.getElementById('longPressMenu');
            const rect = icon.getBoundingClientRect();
            
            menu.style.top = `${rect.top + rect.height / 2}px`;
            menu.style.left = `${rect.left + rect.width / 2}px`;
            menu.classList.add('active');
            
            // 点击其他地方关闭菜单
            const closeMenu = (e) => {
                if (!menu.contains(e.target)) {
                    menu.classList.remove('active');
                    document.removeEventListener('click', closeMenu);
                }
            };
            
            setTimeout(() => {
                document.addEventListener('click', closeMenu);
            }, 10);
        }
        
        // 关闭应用
        document.getElementById('closeApp').addEventListener('click', function() {
            document.getElementById('appWindow').classList.remove('active');
        });

        // 关闭应用管理
        document.getElementById('closeAppManagement').addEventListener('click', closeAppManagement);

        // 关闭壁纸设置
        document.getElementById('closeWallpaper').addEventListener('click', closeWallpaperSettings);
        
        // 小窗返回按钮
        document.getElementById('floatingWindowBack').addEventListener('click', floatingWindowBack);
        
        // 小窗最小化按钮
        document.getElementById('floatingWindowMinimize').addEventListener('click', minimizeFloatingWindow);
        
        // 关闭小窗
        document.getElementById('floatingWindowClose').addEventListener('click', closeFloatingWindow);
        
        // 控制中心显示/隐藏
        let startY = 0;
        let controlCenterVisible = false;
        
        document.addEventListener('touchstart', function(e) {
            startY = e.touches[0].clientY;
        });
        
        document.addEventListener('touchend', function(e) {
            if (!startY) return;
            
            const endY = e.changedTouches[0].clientY;
            const diffY = endY - startY;
            
            // 从屏幕顶部下滑显示控制中心
            if (startY < 100 && diffY > 50 && !controlCenterVisible) {
                document.getElementById('controlCenter').classList.add('active');
                controlCenterVisible = true;
            }
            
            // 从控制中心上滑隐藏
            if (controlCenterVisible && startY > 100 && startY < 200 && diffY < -50) {
                document.getElementById('controlCenter').classList.remove('active');
                controlCenterVisible = false;
            }
            
            startY = 0;
        });
        
        // 手势识别初始化
        function initGestureRecognition() {
            const gestureZoneLeft = document.getElementById('gestureZoneLeft');
            const gestureZoneCenter = document.getElementById('gestureZoneCenter');
            const gestureZoneRight = document.getElementById('gestureZoneRight');
            
            // 为所有界面添加手势支持
            document.addEventListener('touchstart', function(e) {
                // 检查触摸是否在底部区域
                const touchY = e.touches[0].clientY;
                if (touchY > window.innerHeight - 150) {
                    gestureStartY = touchY;
                    gestureStartX = e.touches[0].clientX;
                    
                    // 根据X坐标判断区域
                    const touchX = e.touches[0].clientX;
                    const screenWidth = window.innerWidth;
                    
                    if (touchX < screenWidth * 0.33) {
                        homeGestureActive = true;
                        showGestureHint('left');
                    } else if (touchX > screenWidth * 0.66) {
                        returnGestureActive = true;
                        showGestureHint('right');
                    } else {
                        gestureZoneStart = true;
                        showGestureHint('center');
                    }
                }
            });
            
            document.addEventListener('touchmove', function(e) {
                const touchY = e.touches[0].clientY;
                const diffY = touchY - gestureStartY;
                
                if (homeGestureActive && diffY < -30) {
                    showGestureFeedback('left');
                } else if (returnGestureActive && diffY < -30) {
                    showGestureFeedback('right');
                } else if (gestureZoneStart && diffY < -30) {
                    showGestureFeedback('center');
                }
            });
            
            document.addEventListener('touchend', function(e) {
                const touchY = e.changedTouches[0].clientY;
                const diffY = touchY - gestureStartY;
                
                // 只在滑动距离足够时触发手势
                if (Math.abs(diffY) > 50) {
                    if (homeGestureActive && diffY < -50) {
                        handleHomeGesture();
                    } else if (returnGestureActive && diffY < -50) {
                        handleReturnGesture();
                    } else if (gestureZoneStart && diffY < -50) {
                        document.getElementById('multitaskView').classList.add('active');
                    }
                }
                
                // 重置所有手势状态
                homeGestureActive = false;
                returnGestureActive = false;
                gestureZoneStart = false;
                
                // 隐藏所有反馈
                hideGestureFeedback('left');
                hideGestureFeedback('right');
                hideGestureFeedback('center');
                hideGestureHint('left');
                hideGestureHint('right');
                hideGestureHint('center');
            });
        }

        // 显示手势反馈
        function showGestureFeedback(type) {
            const feedback = document.getElementById(`gestureFeedback${type.charAt(0).toUpperCase() + type.slice(1)}`);
            feedback.classList.add('active');
        }

        // 隐藏手势反馈
        function hideGestureFeedback(type) {
            const feedback = document.getElementById(`gestureFeedback${type.charAt(0).toUpperCase() + type.slice(1)}`);
            feedback.classList.remove('active');
        }

        // 显示手势提示
        function showGestureHint(type) {
            const hint = document.getElementById(`gestureHint${type.charAt(0).toUpperCase() + type.slice(1)}`);
            hint.classList.add('active');
        }

        // 隐藏手势提示
        function hideGestureHint(type) {
            const hint = document.getElementById(`gestureHint${type.charAt(0).toUpperCase() + type.slice(1)}`);
            hint.classList.remove('active');
        }
        
        // 处理返回手势
        function handleReturnGesture() {
            // 如果应用窗口是打开的，关闭它
            if (document.getElementById('appWindow').classList.contains('active')) {
                document.getElementById('appWindow').classList.remove('active');
            }
            // 如果多任务视图是打开的，关闭它
            else if (document.getElementById('multitaskView').classList.contains('active')) {
                document.getElementById('multitaskView').classList.remove('active');
            }
            // 如果控制中心是打开的，关闭它
            else if (document.getElementById('controlCenter').classList.contains('active')) {
                document.getElementById('controlCenter').classList.remove('active');
                controlCenterVisible = false;
            }
            // 如果通知中心是打开的，关闭它
            else if (document.getElementById('notificationCenter').classList.contains('active')) {
                document.getElementById('notificationCenter').classList.remove('active');
            }
            // 如果应用管理是打开的，关闭它
            else if (document.getElementById('appManagementWindow').classList.contains('active')) {
                document.getElementById('appManagementWindow').classList.remove('active');
            }
            // 如果壁纸设置是打开的，关闭它
            else if (document.getElementById('wallpaperWindow').classList.contains('active')) {
                document.getElementById('wallpaperWindow').classList.remove('active');
            }
            // 如果小窗是打开的，关闭它
            else if (floatingWindowActive) {
                closeFloatingWindow();
            }
        }

        // 处理返回主界面手势
        function handleHomeGesture() {
            // 关闭所有打开的窗口
            document.getElementById('appWindow').classList.remove('active');
            document.getElementById('multitaskView').classList.remove('active');
            document.getElementById('controlCenter').classList.remove('active');
            document.getElementById('notificationCenter').classList.remove('active');
            document.getElementById('appManagementWindow').classList.remove('active');
            document.getElementById('wallpaperWindow').classList.remove('active');
            controlCenterVisible = false;
            
            // 关闭小窗
            if (floatingWindowActive) {
                closeFloatingWindow();
            }
        }
        
        // 锁屏/解锁功能
        let isLocked = true;
        let lockStartY = 0;
        
        document.getElementById('lockScreen').addEventListener('touchstart', function(e) {
            lockStartY = e.touches[0].clientY;
        });
        
        document.getElementById('lockScreen').addEventListener('touchend', function(e) {
            if (!lockStartY) return;
            
            const endY = e.changedTouches[0].clientY;
            const diffY = endY - lockStartY;
            
            if (isLocked && diffY < -50) {
                this.style.transform = 'translateY(-100%)';
                setTimeout(() => {
                    this.style.display = 'none';
                }, 300);
                isLocked = false;
            }
            
            lockStartY = 0;
        });
        
        // 点击控制中心外部关闭
        document.getElementById('controlCenter').addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
                controlCenterVisible = false;
            }
        });
        
        // 点击多任务视图外部关闭
        document.getElementById('multitaskView').addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('active');
            }
        });
        
        // 全屏模式切换功能
        function toggleFullscreenMode() {
            const isFullscreen = document.getElementById('fullscreenToggle').checked;
            
            if (isFullscreen) {
                // 进入全屏模式
                document.body.classList.add('fullscreen-mode');
                showHint('已进入全屏模式');
                
                // 尝试进入浏览器全屏模式
                if (document.documentElement.requestFullscreen) {
                    document.documentElement.requestFullscreen();
                } else if (document.documentElement.mozRequestFullScreen) {
                    document.documentElement.mozRequestFullScreen();
                } else if (document.documentElement.webkitRequestFullscreen) {
                    document.documentElement.webkitRequestfullscreen();
                } else if (document.documentElement.msRequestFullscreen) {
                    document.documentElement.msRequestFullscreen();
                }
            } else {
                // 退出全屏模式
                document.body.classList.remove('fullscreen-mode');
                
                // 退出浏览器全屏模式
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        }
        
        // 监听全屏变化事件
        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener('mozfullscreenchange', handleFullscreenChange);
        document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
        document.addEventListener('msfullscreenchange', handleFullscreenChange);
        
        function handleFullscreenChange() {
            const isFullscreen = !!(document.fullscreenElement || document.mozFullScreenElement || 
                                   document.webkitFullscreenElement || document.msFullscreenElement);
            
            // 更新全屏模式开关状态
            const fullscreenToggle = document.getElementById('fullscreenToggle');
            if (fullscreenToggle) {
                fullscreenToggle.checked = isFullscreen;
            }
            
            // 更新全屏模式样式
            if (isFullscreen) {
                document.body.classList.add('fullscreen-mode');
            } else {
                document.body.classList.remove('fullscreen-mode');
            }
        }

        // 暗色模式切换功能 - 修复：确保可以正常切换
        function toggleDarkMode() {
            isDarkMode = !isDarkMode;
            systemSettings.darkMode = isDarkMode;
            localStorage.setItem('systemSettings', JSON.stringify(systemSettings));
            
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
                showHint('已开启暗色模式');
            } else {
                document.body.classList.remove('dark-mode');
                showHint('已关闭暗色模式');
            }
        }
        
        // 添加应用对话框事件
        document.getElementById('dialogClose').addEventListener('click', hideAddAppDialog);
        document.getElementById('dialogCancel').addEventListener('click', hideAddAppDialog);
        document.getElementById('dialogConfirm').addEventListener('click', addLinkApp);
        
        // 初始化
        document.addEventListener('DOMContentLoaded', function() {
            initLinkApps();
            initGestureRecognition();
            updateMultitaskView(); // 初始化多任务视图
            initWallpaperSystem(); // 初始化壁纸系统
            
            // 初始化设置应用中的添加应用按钮
            if (document.getElementById('addAppBtn')) {
                document.getElementById('addAppBtn').addEventListener('click', showAddAppDialog);
            }

            // 初始化控制中心暗色模式按钮
            document.querySelectorAll('.dark-mode-toggle').forEach(btn => {
                btn.addEventListener('click', toggleDarkMode);
            });

            // 初始化暗色模式
            if (isDarkMode) {
                document.body.classList.add('dark-mode');
            }

            // 确保小白条在所有界面都显示
            const homeIndicator = document.querySelector('.home-indicator');
            homeIndicator.style.display = 'block';
        });
        
        // 添加一些样式到动态内容
        const style = document.createElement('style');
        style.textContent = `
            .message-list {
                margin-top: 10px;
            }
            
            .keypad {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .keypad-row {
                display: flex;
                justify-content: space-around;
            }
        `;
        document.head.appendChild(style);
   