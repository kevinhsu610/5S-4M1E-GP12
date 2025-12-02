import React, { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { 
  PlusCircle, 
  Trash2, 
  Download, 
  RefreshCw 
} from "lucide-react";
import { TableColumn } from "../types/index";

interface EditableTableProps<T> {
  columns: TableColumn[];
  initialData: T[];
  onSave: (data: T[]) => void;
  moduleName: string;
}

// 防抖函数
const debounce = <F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): ((...args: Parameters<F>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
};

const EditableTable = <T extends Record<string, any>>({  
  columns,
  initialData,
  onSave: onSaveProp,
  moduleName
}: EditableTableProps<T>) => {
  const [data, setData] = useState<T[]>([]);
  const [isEditing, setIsEditing] = useState<{ [key: number]: boolean }>({});
  const [localStorageKey] = useState(`editable_table_${moduleName}`);

  // 创建防抖版本的onSave函数
  const debouncedOnSave = useCallback(
    debounce((data: T[]) => {
      onSaveProp(data);
    }, 300), // 300ms的防抖延迟
    [onSaveProp]
  );

  useEffect(() => {
    // 从localStorage加载数据
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      setData(JSON.parse(savedData));
    } else {
      setData(initialData);
    }
  }, [localStorageKey, initialData]);

  useEffect(() => {
    // 保存数据到localStorage
    localStorage.setItem(localStorageKey, JSON.stringify(data));
    // 使用防抖版本的保存函数，减少频繁更新
    debouncedOnSave(data);
  }, [data, localStorageKey, debouncedOnSave]);

  // 使用useCallback缓存处理函数，避免不必要的重新创建
  const handleInputChange = useCallback((
    index: number,
    key: string,
    value: any
  ) => {
    // 直接更新data数组中的特定项，避免不必要的数组复制
    setData(prevData => 
      prevData.map((row, i) => 
        i === index ? { ...row, [key]: value } : row
      )
    );
  }, []);

  const startEditing = useCallback((index: number) => {
    setIsEditing(prev => ({ ...prev, [index]: true }));
  }, []);

  const stopEditing = useCallback((index: number) => {
    setIsEditing(prev => ({ ...prev, [index]: false }));
  }, []);

  const addRow = useCallback(() => {
    const newRow: Partial<T> = {};
    columns.forEach((column) => {
      // 修复类型安全问题
      if (typeof column.key === 'string') {
        (newRow as any)[column.key] = "";
      }
    });
    const updatedData = [...data, newRow as T];
    setData(updatedData);
    setIsEditing(prev => ({ ...prev, [updatedData.length - 1]: true }));
  }, [columns, data]);

  const deleteRow = useCallback((index: number) => {
    if (window.confirm("确定要删除这一行数据吗？")) {
      setData(prev => prev.filter((_, i) => i !== index));
      // 更新编辑状态
      setIsEditing(prev => {
        const newIsEditing: { [key: number]: boolean } = {};
        Object.keys(prev).forEach((key) => {
          const numKey = parseInt(key);
          if (numKey < index) {
            newIsEditing[numKey] = prev[numKey];
          } else if (numKey > index) {
            newIsEditing[numKey - 1] = prev[numKey];
          }
        });
        return newIsEditing;
      });
      toast("已成功删除行数据");
    }
  }, []);

  const exportToCSV = useCallback(() => {
    if (data.length === 0) {
      toast.warning("没有数据可导出");
      return;
    }
    
    const headers = columns.map((column) => column.title).join(",");
    const rows = data.map((row) => 
      columns.map((column) => {
        const value = row[column.key];
        // 如果是对象，取label属性
        if (typeof value === "object" && value !== null) {
          return `"${value.label || ""}"`;
        }
        // 处理包含逗号的值
        return typeof value === "string" && value.includes(",") 
          ? `"${value}"` 
          : value;
      }).join(",")
    );
    
    const csvContent = `${headers}\n${rows.join("\n")}`;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `${moduleName}_${new Date().toISOString().split("T")[0]}.csv`);
    link.style.visibility = "hidden";
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("数据已成功导出为CSV文件");
  }, [data, columns, moduleName]);

  const resetTable = useCallback(() => {
    if (window.confirm("确定要重置表格数据吗？这将清除所有当前数据。")) {
      setData(initialData);
      setIsEditing({});
      toast("表格数据已重置");
    }
  }, [initialData]);

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">数据表格</h3>
        <div className="flex space-x-2">
          <button 
            onClick={addRow}
            className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            添加行
          </button>
          <button 
            onClick={exportToCSV}
            className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            导出CSV
          </button>
          <button 
            onClick={resetTable}
            className="flex items-center px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            重置
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider"
                >
                  {column.title}
                  {column.required && (
                    <span className="ml-1 text-red-500">*</span>
                  )}
                </th>
              ))}
              <th className="py-3 px-4 text-left text-sm font-medium text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                操作
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {data.length > 0 ? (
              data.map((row, index) => (
                <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  {columns.map((column) => (
                    <td key={column.key} className="py-3 px-4 text-sm text-gray-900 dark:text-gray-200">
                      {isEditing[index] ? (
                        column.type === "select" && column.options ? (
                          <select
                            value={row[column.key]?.value || ""}
                            onChange={(e) => {
                              const selectedOption = column.options?.find(
                                (option) => option.value === e.target.value
                              );
                              handleInputChange(
                                index,
                                column.key,
                                selectedOption || e.target.value
                              );
                            }}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="">请选择...</option>
                            {column.options.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                        ) : column.type === "date" ? (
                          <input
                            type="date"
                            value={row[column.key]}
                            onChange={(e) => handleInputChange(index, column.key, e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        ) : column.type === "checkbox" ? (
                          <input
                            type="checkbox"
                            checked={row[column.key] || false}
                            onChange={(e) => handleInputChange(index, column.key, e.target.checked)}
                            className="rounded text-blue-500 focus:ring-blue-500"
                          />
                        ) : (
                          <input
                            type="text"
                            value={row[column.key] || ""}
                            onChange={(e) => handleInputChange(index, column.key, e.target.value)}
                            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        )
                      ) : (
                        <div className="py-1">
                          {column.type === "select" && typeof row[column.key] === "object"
                            ? row[column.key].label
                            : column.type === "checkbox"
                            ? row[column.key]
                              ? "✓"
                              : "✗"
                            : row[column.key] || "-"}
                        </div>
                      )}
                    </td>
                  ))}
                  <td className="py-3 px-4 text-sm text-gray-900 dark:text-gray-200">
                    <div className="flex space-x-2">
                      {isEditing[index] ? (
                        <button
                          onClick={() => stopEditing(index)}
                          className="text-green-500 hover:text-green-700"
                          aria-label="保存"
                        >
                          ✓
                        </button>
                      ) : (
                        <button
                          onClick={() => startEditing(index)}
                          className="text-blue-500 hover:text-blue-700"
                          aria-label="编辑"
                        >
                          ✏️
                        </button>
                      )}
                      <button
                        onClick={() => deleteRow(index)}
                        className="text-red-500 hover:text-red-700"
                        aria-label="删除"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + 1}
                  className="py-8 px-4 text-center text-gray-500 dark:text-gray-400"
                >
                  暂无数据，请添加新行
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EditableTable;