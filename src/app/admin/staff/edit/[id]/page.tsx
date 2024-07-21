"use client"
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Checkbox, Dropdown, FormInput } from '@/components'
import { UserType, RoleType } from '@/utils/allModelTypes'
import { getStaffById, updateStaff, getAllRoles } from '@/utils/staffManagement'
import { showToast } from '@/utils/toast'
import './_edit_staff.scss'

function EditStaff({ params }: { params: { id: string } }) {
  const [staff, setStaff] = useState<UserType | null>(null)
  const [roles, setRoles] = useState<RoleType[]>([])
  const [selectedRole, setSelectedRole] = useState<string | number>("")
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  useEffect(() => {
    const fetchStaffAndRoles = async () => {
      try {
        const [fetchedStaff, fetchedRoles] = await Promise.all([
          getStaffById(parseInt(params.id)),
          getAllRoles()
        ])
        setStaff(fetchedStaff)
        setRoles(fetchedRoles)
        setSelectedRole(fetchedStaff.role?.name || "")
      } catch (error) {
        console.error('Failed to fetch staff or roles:', error)
        showToast('error', 'Failed to load staff data. Please try again.')
      }
    }

    fetchStaffAndRoles()
  }, [params.id])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!staff) return
  
    setIsLoading(true)
    window.scrollTo(0, 0)
  
    try {
      // Create an object with only the fields we want to update
      const updatedData = {
        username: staff.username,
        email: staff.email,
        roleId: staff.roleId,
        active: staff.active
      }
  
      const updatedStaff = await updateStaff(staff.id, updatedData)
      showToast('success', `${updatedStaff.username} updated successfully!`)
      router.push('/admin/staff')
    } catch (error) {
      console.error('Failed to update staff:', error)
      showToast('error', 'Failed to update staff. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!staff) return <div>Loading...</div>

  return (
    <div className='edit_staff_wrapper'>
      <header className='edit_staff_header flex_row_center'>
        <h2 className='section_title edit_staff_header_title'>Edit Staff Member</h2>
        <Link href="/admin/staff" className='back_link border_button_void'>BACK</Link>
      </header>

      <form className='edit_staff_form' onSubmit={handleSubmit}>
        <div className='edit_staff_content flex_column_center'>
          <section className='form_inputs_section'>
            <FormInput
              label='Username'
              inputType='text'
              inputValue={staff.username}
              required={true}
              readonly={false}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setStaff({ ...staff, username: e.target.value })}
            />
            <FormInput
              label='Email'
              inputType='email'
              inputValue={staff.email}
              required={true}
              readonly={false}
              onChangeFunction={(e: React.ChangeEvent<HTMLInputElement>) => setStaff({ ...staff, email: e.target.value })}
            />
            <Dropdown
              label='Role'
              items={roles.map(role => role.name)}
              buttonText={selectedRole.toString() || "Select a role"}
              clickFunction={(item: string | number) => {
                const selectedRoleObject = roles.find(role => role.name === item);
                if (selectedRoleObject) {
                  setStaff({ ...staff, roleId: selectedRoleObject.id });
                }
                setSelectedRole(item);
              }}
              required={true}
            />
          </section>
        </div>

        <div className='submit_button_section flex_column_justify_center'>
          <button type="submit" className='custom_button edit_staff_form_button' disabled={isLoading}>
            {isLoading ? 'Saving...' : 'SAVE CHANGES'}
          </button>

          <Checkbox
            label="ACTIVE"
            isChecked={staff.active}
            onChange={(e) => setStaff({ ...staff, active: e.target.checked })}
          />
        </div>
      </form>
    </div>
  )
}

export default EditStaff