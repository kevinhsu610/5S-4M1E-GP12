import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useTheme } from '../../src/hooks/useTheme';

// 模拟localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

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
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('应该默认使用light主题', () => {
    const { container } = render(<ThemeToggleTest />);
    const div = container.querySelector('[data-theme]');
    expect(div?.getAttribute('data-theme')).toBe('light');
  });
  
  it('应该正确切换主题并保存到localStorage', () => {
    const { container, getByTestId } = render(<ThemeToggleTest />);
    
    // 初始状态应为light
    let div = container.querySelector('[data-theme]');
    expect(div?.getAttribute('data-theme')).toBe('light');
    
    // 点击切换按钮
    const toggleButton = getByTestId('theme-toggle');
    fireEvent.click(toggleButton);
    
    // 验证主题已切换为dark
    div = container.querySelector('[data-theme]');
    expect(div?.getAttribute('data-theme')).toBe('dark');
    
    // 验证localStorage已保存
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    
    // 再次点击切换
    fireEvent.click(toggleButton);
    
    // 验证主题已切换回light
    div = container.querySelector('[data-theme]');
    expect(div?.getAttribute('data-theme')).toBe('light');
    
    // 验证localStorage已更新
    expect(localStorageMock.setItem).toHaveBeenCalledWith('theme', 'light');
  });
  
  it('应该从localStorage加载已保存的主题', () => {
    // 模拟localStorage中已保存dark主题
    localStorageMock.getItem.mockReturnValue('dark');
    
    const { container } = render(<ThemeToggleTest />);
    
    // 验证从localStorage加载主题
    expect(localStorageMock.getItem).toHaveBeenCalledWith('theme');
    
    // 验证主题已设置为dark
    const div = container.querySelector('[data-theme]');
    expect(div?.getAttribute('data-theme')).toBe('dark');
  });
});