# 5S 4M1E GP12 系统自动化测试策略

本文档提供了系统自动化测试的建议和策略，包括组件测试、功能测试和端到端测试的具体实现方案。

## 目录

1. [测试框架选择](#测试框架选择)
2. [组件测试](#组件测试)
3. [功能测试](#功能测试)
4. [端到端测试](#端到端测试)
5. [测试覆盖率目标](#测试覆盖率目标)
6. [CI/CD集成](#cicd集成)

## 测试框架选择

建议使用以下测试框架组合：

- **Vitest**: 用于组件测试和单元测试，性能优秀，与Vite集成良好
- **Testing Library**: 用于组件测试，鼓励按照用户使用方式测试组件
- **Playwright**: 用于端到端测试，支持多浏览器

## 组件测试

### 1. EditableTable 组件测试

```typescript
// tests/components/EditableTable.test.tsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditableTable from '@/components/EditableTable';
import { FiveSData, TableColumn } from '@/types/index';

describe('EditableTable Component', () => {
  const mockColumns: TableColumn[] = [
    { key: 'test', title: '测试字段', type: 'text' }
  ];
  
  const mockData: FiveSData[] = [
    { id: '1', area: { label: '测试区域', value: 'test' }, checkDate: '2024-01-01' }
  ];
  
  it('应该正确渲染表格和数据', () => {
    render(
      <EditableTable
        columns={mockColumns}
        initialData={mockData}
        onSave={vi.fn()}
        moduleName="test"
      />
    );
    
    expect(screen.getByText('测试区域')).toBeInTheDocument();
  });
  
  it('应该正确处理添加行操作', () => {
    const handleSave = vi.fn();
    render(
      <EditableTable
        columns={mockColumns}
        initialData={mockData}
        onSave={handleSave}
        moduleName="test"
      />
    );
    
    fireEvent.click(screen.getByTestId('add-row-button'));
    // 验证是否添加了新行
    expect(screen.getAllByRole('row')).toHaveLength(3); // 表头 + 初始行 + 新行
  });
  
  it('应该正确处理删除行操作', () => {
    // 测试删除功能
  });
  
  it('应该正确导出CSV', () => {
    // 测试导出功能
  });
});
```

### 2. 页面组件测试示例

```typescript
// tests/pages/FiveSManagement.test.tsx
import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import FiveSManagement from '@/pages/FiveSManagement';

describe('FiveSManagement Page', () => {
  it('应该渲染页面标题和图表', () => {
    const { container } = render(<FiveSManagement />);
    expect(container.querySelector('h1')?.textContent).toContain('5S管理');
    expect(container.querySelector('.chart-container')).toBeTruthy();
  });
  
  it('应该包含可编辑表格', () => {
    const { container } = render(<FiveSManagement />);
    expect(container.querySelector('.editable-table')).toBeTruthy();
  });
});
```

## 功能测试

### 1. 数据持久化测试

```typescript
// tests/features/dataPersistence.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act, screen } from '@testing-library/react';
import EditableTable from '@/components/EditableTable';

// 模拟localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('数据持久化功能', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('应该在数据变更时保存到localStorage', async () => {
    // 测试数据保存到localStorage的逻辑
  });
  
  it('应该从localStorage加载已保存的数据', () => {
    // 测试从localStorage加载数据的逻辑
  });
});
```

### 2. 主题切换测试

```typescript
// tests/features/themeToggle.test.ts
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/hooks/useTheme';

// 测试主题切换组件
const ThemeToggleTest = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div data-theme={theme}>
      <button onClick={toggleTheme} data-testid="theme-toggle">
        Toggle Theme
      </button>
    </div>
  );
};

describe('主题切换功能', () => {
  it('应该正确切换主题并保存到localStorage', () => {
    render(
      <ThemeProvider>
        <ThemeToggleTest />
      </ThemeProvider>
    );
    
    // 测试主题切换逻辑
  });
});
```

## 端到端测试

### 1. 登录和导航测试

```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test';

test('用户应该能够登录并访问所有页面', async ({ page }) => {
  // 访问登录页面
  await page.goto('http://localhost:3000/');
  
  // 验证导航功能
  await page.click('text=5S管理');
  expect(await page.isVisible('h1:has-text("5S管理")')).toBeTruthy();
  
  await page.click('text=4M1E变更管理');
  expect(await page.isVisible('h1:has-text("4M1E变更管理")')).toBeTruthy();
  
  await page.click('text=GP12早期生产遏制');
  expect(await page.isVisible('h1:has-text("GP12早期生产遏制")')).toBeTruthy();
  
  await page.click('text=快速响应跟踪');
  expect(await page.isVisible('h1:has-text("快速响应跟踪")')).toBeTruthy();
});
```

### 2. 数据编辑和导出测试

```typescript
// tests/e2e/dataManagement.spec.ts
import { test, expect } from '@playwright/test';

test('用户应该能够编辑数据并导出CSV', async ({ page }) => {
  // 访问5S管理页面
  await page.goto('http://localhost:3000/5s');
  
  // 编辑数据
  await page.click('text=编辑');
  await page.fill('input[name="area"]', '新测试区域');
  await page.click('text=保存');
  
  // 验证数据已更新
  expect(await page.isVisible('text=新测试区域')).toBeTruthy();
  
  // 导出CSV
  await page.click('text=导出CSV');
  // 验证导出功能
});
```

## 测试覆盖率目标

建议设置以下测试覆盖率目标：

- **语句覆盖率**: ≥ 80%
- **分支覆盖率**: ≥ 70%
- **函数覆盖率**: ≥ 75%
- **行覆盖率**: ≥ 80%

## CI/CD集成

建议在项目的CI/CD流程中添加以下步骤：

```yaml
# .github/workflows/test.yml 示例
name: Run Tests

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Use Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm test
      - name: Upload coverage reports
        uses: actions/upload-artifact@v3
        with:
          name: coverage
          path: coverage/
```

## 安装测试依赖

运行以下命令安装必要的测试依赖：

```bash
npm install --save-dev vitest @vitest/coverage-c8 @testing-library/react @testing-library/jest-dom playwright
```

## 配置文件

创建 `vitest.config.ts` 文件：

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    coverage: {
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*'],
      exclude: ['src/main.tsx', 'src/types/*'],
    },
    globals: true,
    setupFiles: ['./tests/setup.ts'],
  },
});
```

创建测试设置文件：

```typescript
// tests/setup.ts
import '@testing-library/jest-dom';

// 模拟全局变量和函数
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// 模拟localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
  removeItem: vi.fn(),
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
```

## 执行测试

```bash
# 运行所有测试
npm test

# 运行测试并生成覆盖率报告
npm test -- --coverage

# 运行端到端测试
npx playwright test
```