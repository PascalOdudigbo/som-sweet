'use client'
import React, { useState, useMemo } from 'react'
import { IconContext } from 'react-icons'
import { SlOptions } from 'react-icons/sl'
import { RxDotFilled } from 'react-icons/rx'
import Link from 'next/link'
import { UserType } from '@/utils/allModelTypes'
import { deleteStaff, toggleStaffActiveStatus } from '@/utils/staffManagement'
import { showToast } from '@/utils/toast'
import "./_staff_row.scss"

interface StaffRowProps {
  staff: UserType
  setStaff: React.Dispatch<React.SetStateAction<UserType[]>>;
}

function StaffRow({ staff, setStaff }: StaffRowProps) {
  const [dropdownDisplay, setDropdownDisplay] = useState<string>("none")
  
  const iconStyles = useMemo(() => ({
    active: { marginRight: "3px", marginLeft: "6px", color: "green" },
    notActive: { marginRight: "3px", marginLeft: "6px", color: "red" },
    options: { size: '30px', className: "dropdown_icon" },
    status: { size: '30px' }
  }), []);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this staff member?')) {
      try {
        await deleteStaff(staff.id);
        setStaff(prevStaff => prevStaff.filter(s => s.id !== staff.id));
        showToast('success', 'Staff member deleted successfully');
      } catch (error) {
        console.error('Error deleting staff:', error);
        showToast('error', 'Failed to delete staff member');
      }
    }
  };

  const handleToggleActive = async () => {
    try {
      const updatedStaff = await toggleStaffActiveStatus(staff.id);
      setStaff(prevStaff => prevStaff.map(s => s.id === staff.id ? updatedStaff : s));
      showToast('success', `Staff member ${updatedStaff.active ? 'activated' : 'deactivated'} successfully`);
    } catch (error) {
      console.error('Error toggling staff status:', error);
      showToast('error', 'Failed to update staff status');
    }
  };

  return (
    <tr className="row_wrapper">
      <td className="row_cell">{staff.username}</td>
      <td className="row_cell">{staff.email}</td>
      <td className="row_cell">{staff.role?.name || 'N/A'}</td>
      <td className="row_cell">
        <div className='itemActiveIconAndText'>
          <IconContext.Provider value={iconStyles.status}>
            <RxDotFilled style={staff.active ? iconStyles.active : iconStyles.notActive} />
          </IconContext.Provider>
          <p className='staffActive'>{staff.active ? 'Active' : 'Inactive'}</p>
        </div>
      </td>
      <td className="row_cell">
        <div className="dropdown">
          <IconContext.Provider value={iconStyles.options}>
            <SlOptions onClick={() => setDropdownDisplay(prev => prev === "block" ? "none" : "block")} />
          </IconContext.Provider>
          <div className="dropdown_content" style={{ display: dropdownDisplay }}>
            <Link href={`/admin/staff/edit/${staff.id}`} className="dropdown_item">EDIT</Link>
            <button className="dropdown_item" onClick={handleToggleActive}>
              {staff.active ? 'DEACTIVATE' : 'ACTIVATE'}
            </button>
            <button className="delete_btn" onClick={handleDelete}>DELETE</button>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default StaffRow