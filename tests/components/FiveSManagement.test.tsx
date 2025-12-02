import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import FiveSManagement from '../../src/pages/FiveSManagement';

// 模拟EditableTable组件
vi.mock('../../src/components/EditableTable', () => ({
  default: ({ columns, initialData, onSave, moduleName }: any) => (
    <div className="editable-table" data-testid="editable-table">
      <div data-columns={columns.length} data-rows={initialData.length} />
    </div>
  )
}));

describe('FiveSManagement Page', () => {
  it('应该渲染页面标题和图表区域', () => {
    render(
      <MemoryRouter>
        <FiveSManagement />
      </MemoryRouter>
    );
    
    // 验证页面标题
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/5S管理/);
    
    // 验证图表区域存在 - 查找包含图表标题的元素
    expect(screen.getByText('各区域5S评分(%)')).toBeInTheDocument();
    expect(screen.getByText('5S各维度平均得分')).toBeInTheDocument();
  });
  
  it('应该包含可编辑表格组件', () => {
    render(
      <MemoryRouter>
        <FiveSManagement />
      </MemoryRouter>
    );
    
    // 验证可编辑表格存在
    const editableTable = screen.getByTestId('editable-table');
    expect(editableTable).toBeInTheDocument();
  });
});