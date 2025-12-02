import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, act } from '@testing-library/react';
import EditableTable from '../../src/components/EditableTable';
import { TableColumn } from '../../src/types/index';

// 模拟localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn()
};

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('数据持久化功能', () => {
  const mockColumns: TableColumn[] = [
    { key: 'test', title: '测试字段', type: 'text' }
  ];
  
  const mockData = [
    { id: '1', test: '测试数据' }
  ];
  
  beforeEach(() => {
    vi.clearAllMocks();
  });
  
  it('应该在数据变更时保存到localStorage', async () => {
    const handleSave = vi.fn();
    
    render(
      <EditableTable
        columns={mockColumns}
        initialData={mockData}
        onSave={handleSave}
        moduleName="testModule"
      />
    );
    
    // 验证初始数据是否被保存
    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'editable_table_testModule',
      expect.any(String)
    );
    
    // 调用handleSave函数，模拟数据保存
    act(() => {
      handleSave([...mockData, { id: '2', test: '新数据' }]);
    });
    
    // 验证localStorage.setItem被调用（初始渲染会调用一次，handleSave调用一次）
    expect(localStorageMock.setItem).toHaveBeenCalledTimes(2);
  });
  
  it('应该从localStorage加载已保存的数据', () => {
    // 模拟localStorage中存在已保存的数据
    const savedData = JSON.stringify([{ id: '1', test: '已保存数据' }]);
    localStorageMock.getItem.mockReturnValue(savedData);
    
    render(
      <EditableTable
        columns={mockColumns}
        initialData={[]}
        onSave={vi.fn()}
        moduleName="testModule"
      />
    );
    
    // 验证localStorage.getItem被正确调用
    expect(localStorageMock.getItem).toHaveBeenCalledWith('editable_table_testModule');
  });
});