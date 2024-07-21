'use client'
import React, { useState } from 'react'
import { IconContext } from 'react-icons'
import { SlOptions } from 'react-icons/sl'
import { RoleType } from '@/utils/allModelTypes'
import { deleteRole } from '@/utils/roleManagement'
import { showToast } from '@/utils/toast'
import "./_role_row.scss"

interface RoleRowProps {
  role: RoleType
  setRoles: React.Dispatch<React.SetStateAction<RoleType[]>>;
  editingRole: RoleType | null;
  setEditingRole: React.Dispatch<React.SetStateAction<RoleType | null>>;
  handleEditRole: (e: React.FormEvent) => Promise<void>;
}

function RoleRow({ role, setRoles, editingRole, setEditingRole, handleEditRole }: RoleRowProps) {
  const [dropdownDisplay, setDropdownDisplay] = useState<string>("none")

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      try {
        await deleteRole(role.id);
        setRoles(prevRoles => prevRoles.filter(r => r.id !== role.id));
        showToast('success', 'Role deleted successfully');
      } catch (error) {
        console.error('Error deleting role:', error);
        showToast('error', 'Failed to delete role');
      }
    }
  };

  const isEditing = editingRole?.id === role.id;

  return (
    <tr className="row_wrapper">
      <td className="row_cell">
        {isEditing ? (
          <form onSubmit={handleEditRole} className="edit_role_form">
            <input
              type="text"
              value={editingRole.name}
              onChange={(e) => setEditingRole({ ...editingRole, name: e.target.value })}
              className="edit_role_input"
            />
            <button type="submit" className="save_role_button">Save</button>
            <button type="button" onClick={() => setEditingRole(null)} className="cancel_role_button">Cancel</button>
          </form>
        ) : (
          role.name
        )}
      </td>
      <td className="row_cell">
        <div className="dropdown">
          <IconContext.Provider value={{ size: '30px', className: "dropdown_icon" }}>
            <SlOptions onClick={() => setDropdownDisplay(prev => prev === "block" ? "none" : "block")} />
          </IconContext.Provider>
          <div className="dropdown_content" style={{ display: dropdownDisplay }}>
            <button className="dropdown_item" onClick={() => setEditingRole(role)}>EDIT</button>
            <button className="delete_btn" onClick={handleDelete}>DELETE</button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default RoleRow