import React, { useEffect, useMemo } from 'react';

import { Checkbox, Form } from 'antd';

import { CommonTable } from '@/shared/components/common/Table';
import { MODULES_BY_ROLE } from '@/shared/constants';

interface Module {
  key: string;
  label: string;
  actions: string[];
}

const PermissionTab: React.FC<any> = ({ role, form, id, permission, isDisabled, initialRef }) => {
  const modules = useMemo(() => MODULES_BY_ROLE[role] || [], [role]);

  useEffect(() => {
    if (!role) return;

    const allowedModules = MODULES_BY_ROLE[role] || [];
    const initialPermissions: Record<string, string[]> = {};

    if (id && permission && !initialRef.current) {
      // Edit mode with permissions
      for (const [moduleKey, actions] of Object.entries(permission) as any) {
        initialPermissions[moduleKey] = Object.entries(actions)
          .filter(([, allowed]) => allowed)
          .map(([action]) => action);
      }

      form.setFieldsValue({ permissions: initialPermissions });

      if (!isDisabled) {
        initialRef.current = true;
      }
    } else if (!id || !initialRef.current) {
      // Add mode or role changed
      allowedModules.forEach(({ key }) => {
        initialPermissions[key] = [];
      });

      form.setFieldsValue({ permissions: initialPermissions });

      if (!isDisabled && !id) {
        initialRef.current = true;
      }
    }
  }, [role, id, permission, form, initialRef, isDisabled]);

  const handleCheckboxChange = (moduleKey: string, action: string, checked: boolean) => {
    const current = form.getFieldValue(['permissions', moduleKey]) || [];
    let updated = [...current];

    if (checked) {
      // Add permission
      if (action === 'add') {
        // Ensure 'add' and 'view' are selected
        updated = [...new Set([...current, 'add', 'view'])];
      } else if (action === 'edit') {
        // Ensure 'edit' and 'view' are selected
        updated = [...new Set([...current, 'edit', 'view'])];
      } else if (action === 'toggleStatus') {
        // Ensure 'toggleStatus' and 'view' are selected
        updated = [...new Set([...current, 'toggleStatus', 'view'])];
      } else if (action === 'view') {
        updated = [...new Set([...current, 'view'])];
      } else {
        updated = [...new Set([...current, action])];
      }
    } else {
      // Remove permission
      if (action === 'view') {
        // Unchecking view removes all
        updated = [];
      } else {
        updated = current.filter((perm: any) => perm !== action);

        // If unchecking 'add' or 'edit', and the other one is not present, remove both
        if (['add', 'edit'].includes(action)) {
          const counterpart = action === 'add' ? 'edit' : 'add';
          if (!updated.includes(counterpart)) {
            updated = updated.filter((perm) => perm !== counterpart);
          }
        }
      }
    }

    form.setFieldsValue({
      permissions: {
        ...form.getFieldValue('permissions'),
        [moduleKey]: updated
      }
    });
  };

  const columns = useMemo(() => {
    const actionKeys = ['view', 'add', 'edit', 'toggleStatus'];
    const actionLabels: Record<string, string> = {
      view: 'View',
      add: 'Add',
      edit: 'Edit',
      toggleStatus: 'Active / Inactive / Delete'
    };

    return [
      {
        title: 'Title',
        dataIndex: 'label',
        key: 'label',
        width: 220
      },
      {
        title: 'Select All',
        dataIndex: 'selectAll',
        key: 'selectAll',
        width: 150,
        render: (_: any, record: Module) => {
          const selected = form.getFieldValue(['permissions', record.key]) || [];
          const isAllSelected = record.actions.every((act) => selected.includes(act));

          const toggleSelectAll = (checked: boolean) => {
            form.setFieldsValue({
              permissions: {
                ...form.getFieldValue('permissions'),
                [record.key]: checked ? [...record.actions] : []
              }
            });
          };

          return (
            <Checkbox
              disabled={isDisabled}
              checked={isAllSelected}
              indeterminate={selected.length > 0 && selected.length < record.actions.length}
              onChange={(e) => toggleSelectAll(e.target.checked)}
            />
          );
        }
      },
      ...actionKeys.map((action) => ({
        title: actionLabels[action],
        dataIndex: action,
        key: action,
        width: 180,
        render: (_: any, record: Module) => {
          const isAllowed = record.actions.includes(action);
          const checked = (form.getFieldValue(['permissions', record.key]) || []).includes(action);
          return isAllowed ? (
            <Checkbox
              disabled={isDisabled}
              checked={checked}
              onChange={(e) => handleCheckboxChange(record.key, action, e.target.checked)}
            />
          ) : null;
        }
      }))
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form]);

  return (
    <Form.Item shouldUpdate noStyle>
      {() => (
        <CommonTable
          className="permission-table"
          columns={columns}
          dataSource={modules}
          rowKey={(record, index) => `${record.key || record.label || index}-${role}`}
          pagination={false}
        />
      )}
    </Form.Item>
  );
};

export default PermissionTab;
