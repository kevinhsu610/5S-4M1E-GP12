import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import EditableTable from '../../src/components/EditableTable';
import { TableColumn } from '../../src/types/index';

describe('EditableTable Component', () => {
  const mockColumns: TableColumn[] = [
    { key: 'test', title: '测试字段', type: 'text' }
  ];
  
  const mockData = [
    { id: '1', test: '测试数据' }
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
    
    expect(screen.getByText('测试数据')).toBeInTheDocument();
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
    
    // 模拟添加行按钮
    const addButton = screen.getByRole('button', { name: /添加行/i });
    fireEvent.click(addButton);
    
    // 验证是否添加了新行
    const rows = screen.getAllByRole('row');
    expect(rows.length).toBeGreaterThanOrEqual(3); // 表头 + 初始行 + 新行
  });
});