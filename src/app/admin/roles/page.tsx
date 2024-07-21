'use client'
import React, { useState, useEffect } from 'react'
import { RoleRow } from '@/components'
import { RoleType } from '@/utils/allModelTypes';
import { getAllRoles, createRole, updateRole } from '@/utils/roleManagement';
import { showToast } from '@/utils/toast'
import "./_role_management.scss"

function RoleManagement() {
    const [roles, setRoles] = useState<RoleType[]>([]);
    const [newRoleName, setNewRoleName] = useState('');
    const [editingRole, setEditingRole] = useState<RoleType | null>(null);

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {
        try {
            const fetchedRoles = await getAllRoles();
            setRoles(fetchedRoles);
        } catch (error) {
            console.error('Failed to fetch roles:', error);
            showToast('error', 'Failed to load roles. Please try again.');
        }
    };

    const handleAddRole = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newRoleName.trim()) {
            showToast('error', 'Role name cannot be empty');
            return;
        }
        try {
            await createRole({ name: newRoleName });
            setNewRoleName('');
            fetchRoles();
            showToast('success', 'Role added successfully');
        } catch (error) {
            console.error('Failed to add role:', error);
            showToast('error', 'Failed to add role. Please try again.');
        }
    };

    const handleEditRole = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingRole || !editingRole.name.trim()) {
            showToast('error', 'Role name cannot be empty');
            return;
        }
        try {
            await updateRole(editingRole.id, { name: editingRole.name });
            setEditingRole(null);
            fetchRoles();
            showToast('success', 'Role updated successfully');
        } catch (error) {
            console.error('Failed to update role:', error);
            showToast('error', 'Failed to update role. Please try again.');
        }
    };

    return (
        <div className='role_management_wrapper'>
            <h3 className='section_subtitle section_title'>Role Management</h3>
            <form onSubmit={handleAddRole} className='add_role_form'>
                <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    placeholder="New role name"
                    className='new_role_input'
                />
                <button type="submit" className='add_role_button border_button_void'>ADD ROLE</button>
            </form>
            <table className="role_table">
                <thead>
                    <tr className="table_headers_wrapper">
                        <th className="p__inter table_header">NAME</th>
                        <th className="p__inter table_header">ACTIONS</th>
                    </tr>
                </thead>
                <tbody className='table_body'>
                    {roles.map((role) => (
                        <RoleRow
                            key={role.id}
                            role={role}
                            setRoles={setRoles}
                            editingRole={editingRole}
                            setEditingRole={setEditingRole}
                            handleEditRole={handleEditRole}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default RoleManagement